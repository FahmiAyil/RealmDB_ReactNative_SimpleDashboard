//This is an example code for Navigator//
import React, { Component } from 'react';
//import react in our code.

//For react-navigation 3.0+
//import { createAppContainer, createStackNavigator } from 'react-navigation';
//For react-navigation 4.0+
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import User from './pages/User';
//import all the screens we are going to switch
const App = createStackNavigator({
  Home: { screen: Home },
  User: { screen: User },
}
);
export default createAppContainer(App);