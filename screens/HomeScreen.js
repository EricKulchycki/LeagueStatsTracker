import React from 'react';
import { AppRegistry, TextInput } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Constants, SQLite } from 'expo';
import TabBarIcon from '../components/TabBarIcon';

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



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "CTP & ACE",
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
      text: "",
      selected: "",
    };
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists people (id integer primary key not null, name text, ctp int, ace int, paid int);',[],()=>console.log("creeeated"),(a,b)=>console.log(b)
      );
    });
    this.update();

  }

  onListPress = () => {
    console.log(this.state.selected);
  }

  

  render() {

    let list;
    var peopleArray = this.state.people;
    if(peopleArray != null) {
      list = <ScrollView style={styles.playerscroll}>
      {
        peopleArray.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            leftElement={
            <Button onPress={this.onListPress}
            title='CTP'></Button>}
            rightElement={
              <Button onPress={this.onListPress}
              title='ACE'></Button>}
            contentContainerStyle={{
              alignItems: 'center'
            }}
            onPress={() => this.changeSelected(l.name) }
          />
        ))
      }
      </ScrollView>;
    }


    return (
      <LinearGradient
        colors={['#C9D6FF', '#E2E2E2']}
        style={{flex: 1}}>

        <View style={styles.container}>
          <Text style={styles.attendTitle}>Select Player to add CTP or ACE</Text>

          {list}

        </View>
      </LinearGradient>
    );
  }

  changeSelected(name) {
    console.log(name);
    this.setState({selected: name});
  }

  update(){
    db.transaction(tx => {
      tx.executeSql('select * from people', [], (_, { rows: {_array} }) =>
          this.setState({people: _array})
        );
    });
    console.log(this.state.people);
  }



  getPeople(db) {
    db.transaction(tx => {
      tx.executeSql(
        'select * from people',
        (_, { rows: { _array } }) => this.setState({ people: _array })
      );
      console.log(this.people);
    });
  }

  addCTP(){
    db.transaction(
      tx => {
        tx.executeSql(`update people set ctp = 1 where name = ?;`, [text]);
      },
      null,
      this.update
    );
    console.log("ADDING CTP");
  }

  addACE() {
    console.log("ADDING ACE");
  }

}


class View2 extends React.Component {
    render() {
        console.log('View2 props: ', this.props);

        return (
          <View style={{flexDirection:"row", justifyContent: 'center'}}>
          <View style={styles.ctp}>
            <Button 
              title="CTP"
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#3e7da0', '#3b64a5'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              onPress={this.addCTP}
            />
          </View>
          
          <View style={styles.ace}>
            <Button
              title="ACE"
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#3e7da0', '#3b64a5'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              onPress={this.addACE}
            />
          </View>
        </View>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  attendTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  ctp: {
    width: 50, 
    justifyContent: 'flex-start',
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 50
  },
  ace: {
    width: 50, 
    justifyContent: 'flex-end',
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 50
  },
  button: {
    color: '#3e7da0'
  },
  playerscroll: {
    marginTop: 15,
    
  }
});
