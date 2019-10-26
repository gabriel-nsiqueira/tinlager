import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import App from './pages/App';
import Buy from './pages/Buy';

export default createAppContainer(
	createStackNavigator(
		{
			App,
			Buy
		},
		{
			defaultNavigationOptions: {
				header: null
			}
		}
	)
);
