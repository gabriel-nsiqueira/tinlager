import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  PanResponder,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import PropTypes from 'prop-types';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Profile = [
  {
    id: '1',
    name: 'Rotten Teeth',
    uri: {
      uri:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbyebyedoctor.com%2Fwp-content%2Fuploads%2F2011%2F08%2Frotten-teeth.jpg&f=1&nofb=1',
    },
  },
  {
    id: '2',
    name: 'White Teeth',
    uri: {
      uri:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fscarlettlondon.com%2Fwp-content%2Fuploads%2F2012%2F05%2FIMG_5208.jpg&f=1&nofb=1',
    },
  },
  {
    id: '3',
    name: 'React Native',
    uri: {
      uri:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fteamairship.com%2Fwp-content%2Fuploads%2F2017%2F10%2Freact-native-workshop.jpg&f=1&nofb=1',
    },
  },
  {
    id: '4',
    name: 'JavaScript',
    uri: {
      uri:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F99%2FUnofficial_JavaScript_logo_2.svg%2F1200px-Unofficial_JavaScript_logo_2.svg.png&f=1&nofb=1',
    },
  },
  {
    id: '5',
    name: 'JQuery',
    uri: {
      uri:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzdnet4.cbsistatic.com%2Fhub%2Fi%2F2019%2F04%2F21%2F9d791bf2-9b20-476a-bba6-201e622d2a1f%2Fe842eb3c351d9c4cf358e7088923da14%2Fjquery-logo-blue.png&f=1&nofb=1',
    },
  },
  {
    id: '6',
    name: 'Pudim',
    uri: { uri: 'http://pudim.com.br/pudim.jpg' },
  },
];

export default class App extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          token: PropTypes.string,
        }),
      }),
    }).isRequired,
  };
  state = {
    isReady: false,
  };

  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      Profile: [],
    };
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };
    this.buyOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    this.nopeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          }).start(() => {
            this.setState(
              { currentIndex: this.state.currentIndex + 1 },
              () => {
                this.position.setValue({ x: 0, y: 0 });
              },
            );
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          }).start(() => {
            this.setState(
              { currentIndex: this.state.currentIndex + 1 },
              () => {
                this.position.setValue({ x: 0, y: 0 });
              },
            );
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });
  }

  async componentDidMount() {
    // try {
    // 	const response = await api.get('/profile', {});
    // 	this.setState({ profiles: response.data });
    // } catch (err) {
    // 	return err;
    // }
    this.setState({ Profile });
  }

  renderProfile = () => {
    return this.state.Profile.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute',
              },
            ]}
          >
            <Animated.View
              style={{
                opacity: this.buyOpacity,
                transform: [{ rotate: '-30deg' }],
                position: 'absolute',
                top: 50,
                left: 40,
                zIndex: 1000,
              }}
            >
              <Text
                style={{
                  borderWidth: 4,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}
              >
                BUY
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.nopeOpacity,
                transform: [{ rotate: '30deg' }],
                position: 'absolute',
                top: 50,
                right: 40,
                zIndex: 1000,
              }}
            >
              <Text
                style={{
                  borderWidth: 4,
                  borderColor: 'red',
                  color: 'red',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}
              >
                NOPE
              </Text>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
              source={item.uri}
            />
            <Text style={styles.name}>{item.name}</Text>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={[
              {
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }],
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute',
              },
            ]}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      }
    }).reverse();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: Platform.OS == 'ios' ? 10 : 0,
        }}
      >
        {/* tela */}
        <View style={{ flex: 1 }}>{this.renderProfile()}</View>
        {/* left */}
        <View style={{ height: 60 }}>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                Animated.spring(this.position, {
                  toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
                }).start(() => {
                  this.setState(
                    { currentIndex: this.state.currentIndex + 1 },
                    () => {
                      this.position.setValue({ x: 0, y: 0 });
                    },
                  );
                });
              }}
            >
              <View style={styles.circle}>
                <Icon name="x" size={32} color="#ec5288" />
              </View>
            </TouchableOpacity>
            {/* right */}
            <TouchableOpacity
              onPress={() => {
                Animated.spring(this.position, {
                  toValue: { x: SCREEN_WIDTH + 100, y: 0 },
                }).start(() => {
                  this.setState(
                    { currentIndex: this.state.currentIndex + 1 },
                    () => {
                      this.position.setValue({ x: 0, y: 0 });
                    },
                  );
                });
              }}
            >
              <View style={styles.circle}>
                <Icon
                  name="shopping-cart"
                  size={32}
                  color="#6ee3b4"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 0,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
  name: {
    color: 'white',
    fontSize: 32,
    position: 'absolute',
    padding: 20,
    fontWeight: 'bold',
  },
});
