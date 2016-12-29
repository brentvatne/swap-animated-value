/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  NavigationProvider,
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
  createRouter,
} from '@exponent/ex-navigation';

import ProfileScreen from './ProfileScreen';

const router = createRouter(() => ({
  blank: () => Empty,
  root: () => RootNavigation,
  profile: () => ProfileScreen,
}));

import Colors from './constants/Colors';

const defaultRouteConfig = {
  navigationBar: {
    backgroundColor: '#fff',
    titleStyle: {
      fontWeight: '600',
    },
  },
}

class RootNavigation extends React.Component {
  render() {
    return (
      <TabNavigation
        tabBarColor={Colors.tabBar}
        tabBarStyle={{borderTopColor: '#f2f2f2'}}
        tabBarHeight={50}
        initialTab="profile">
        <TabNavigationItem
          id="projects"
          renderIcon={isSelected => this._renderIcon('', 'grid', 24, 'Projects', isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute="blank"
          />
        </TabNavigationItem>

        <TabNavigationItem
          id="explore"
          renderIcon={isSelected => this._renderIcon('', 'ios-search', 24, 'Explore', isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute="blank"
          />
        </TabNavigationItem>

        <TabNavigationItem
          id="profile"
          renderIcon={isSelected => this._renderIcon('', 'ios-person', 26, 'Profile', isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute="profile" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(IconComponent: ReactComponent, iconName: string, iconSize: number, title: string, isSelected: bool) {
    let color = isSelected ? Colors.tabIconSelected : Colors.tabIconDefault;

    return (
      <View style={styles.tabItemContainer}>
        <Text style={[styles.tabTitleText, {color}]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    );
  }
}

export default class FromMaster extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationProvider router={router}>
          <StackNavigation initialRoute='root' />
        </NavigationProvider>
      </View>
    );
  }
}


class Empty extends Component {
  static route = {
    navigationBar: {
      title: 'Hello there!',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FromMaster', () => FromMaster);
