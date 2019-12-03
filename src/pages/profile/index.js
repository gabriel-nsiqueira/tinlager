import React, { Component } from 'react';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';

import user from '../../images/user.png';

// import { Container } from './styles';
const style = StyleSheet.create({
  Container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Profile: {
    height: '45%',
    width: '90%',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    backgroundColor: 'white',
  },
  txt: {
    fontFamily: 'Solway',
    fontSize: 40
  }
});

export default class Profile extends Component {
  static navigationOptions = {
    header: props => (
      <View>
        <StatusBar hidden={true} />
        <View style={{ height: 60 }}>
          <View style={style.header}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('App')}
            >
              <Icon name="chevron-left" size={32} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
  };
  render() {
    return (
      <View style={style.Container}>
        <Image source={user} style={style.Profile} />
        <Text style={style.txt}>Admin</Text>
      </View>
    );
  }
}
