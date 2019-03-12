import React from 'react';
import { AppRegistry, TextInput } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Constants, SQLite } from 'expo';

const db = SQLite.openDatabase('league.db');

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Players to the League',
    headerStyle: {
      backgroundColor: '#3b64a5',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
  };

  constructor(props) {
    super(props);
    this.state = { 
      people: [],
      text: ""
    };
    console.log("construct");
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists people (id integer primary key not null, name text, ctp int, ace int, paid int);',[],()=>console.log("creeeated"),(a,b)=>console.log(b)
      );
    });
    this.update();
  }

  render() {

    let list;
    var peopleArray = this.state.people;
    if(peopleArray != null) {
      list = <ScrollView>
      {
        peopleArray.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
          />
        ))
      }
      </ScrollView>;
    }


    return (
      <LinearGradient
        colors={['#C9D6FF', '#E2E2E2']}
        style={{flex: 1}}
      >
        <View style={styles.container}>
        <Text style={styles.attendTitle}>Enter New Players to the League</Text>
          <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: .4, margin: 20, backgroundColor: '#E2E2E2'}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
          <View style={styles.ace}>
          <Button
            title="Add Player"
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#3e7da0', '#3b64a5'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={this.addPlayer.bind(this)}
          />
        </View>

        {list}

      </View>
    </LinearGradient>
    );
  }

  addPlayer() {
    db.transaction(tx => {
      tx.executeSql('insert into people (name, ctp, ace, paid) values (?, 0, 0, 1)', [this.state.text],()=>console.log("success"),(a,b)=>console.log(b));
      console.log(this.state.text);
      this.update();
    });
    
  }

  update(){
    db.transaction(tx => {
      tx.executeSql('select * from people', [], (_, { rows: {_array} }) =>
          this.setState({people: _array})
        );
    });
    console.log(this.state.people);
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  attendTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  ace: {
    justifyContent: 'flex-end',
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 50
  }
});
