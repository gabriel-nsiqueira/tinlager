import React from 'react';

import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import jhow from './src/images/profile.png';
import emerald from './src/images/emerald.png';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import App from './src/pages/main/index';
import Buy from './src/pages/buy/index';
import SignUp from './src/pages/signUp/index';
import SignIn from './src/pages/signIn/index';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    backgroundColor: 'white',
  },
});

export default createAppContainer(
  createStackNavigator(
    {
      SignIn,
      App,
      Buy,
      SignUp,
    },
    {
      defaultNavigationOptions: {
        header: props => (
          <View>
            <StatusBar hidden={true} />
            <View style={{ height: 60 }}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('signIn')}
                >
                  <Image
                    source={jhow}
                    style={{
                      width: 32,
                      height: 40,
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Buy')}
                >
                  <Image
                    source={emerald}
                    style={{
                      width: 32,
                      height: 40,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),
      },
    },
  ),
);
