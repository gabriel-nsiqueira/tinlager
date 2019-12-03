import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Animated,
	Image,
	PanResponder,
	TouchableOpacity,
	StatusBar,
	Platform
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
		shadowColor: 'gray',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.18,
		shadowRadius: 2,
		backgroundColor: 'white'
	},
	Container: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		padding: 0
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
		shadowRadius: 2
	},
	name: {
		color: 'white',
		fontSize: 32,
		position: 'absolute',
		padding: 20,
		fontWeight: 'bold'
	},
	txt: {
		fontFamily: 'Solway'
	}
});

export default class Buy extends Component {
	constructor() {
		super();
	}

	renderBuy = () => {
		return (
			<View style={styles.Container}>
				<Text styles={styles.txt}>Você não precisa de esmeraldas, porque você é admin</Text>
			</View>
		);
	};

	static navigationOptions = {
		header: (props) => (
			<View>
				<StatusBar hidden={true} />
				<View style={{ height: 60 }}>
					<View style={styles.header}>
						<TouchableOpacity onPress={() => props.navigation.navigate('App')}>
							<Icon name="chevron-left" size={32} color="gray" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	};

	render() {
		return (
			<View style={{ flex: 1, marginBottom: Platform.OS == 'ios' ? 10 : 0 }}>
				<View style={{ flex: 1 }}>{this.renderBuy()}</View>
			</View>
		);
	}
}
