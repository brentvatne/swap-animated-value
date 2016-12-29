import React from 'react';
import {
  Animated,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import FadeIn from '@exponent/react-native-fade-in-image';
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
  withNavigation,
} from '@exponent/ex-navigation';

import Colors from './constants/Colors';
import FakeCards from './FakeCards';

// Hardcoded for convenience, would need to be measured
const HEADER_HEIGHT = 159;
const USE_NATIVE_DRIVER = true;

export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Profile',
      renderRight: () => <SignOutButton />,
    },
  }

  _projectsScrollY = 0;
  _likesScrollY = 0;

  constructor(props, context) {
    super(props, context);

    let projectsScrollY = new Animated.Value(0);
    let likesScrollY = new Animated.Value(0);

    projectsScrollY.addListener(({value}) => {
      this._projectsScrollY = value;
    });

    likesScrollY.addListener(({value}) => {
      this._likesScrollY = value;
    });

    this.state = {
      projectsScrollY,
      likesScrollY,
      scrollY: projectsScrollY,
    }
  }

  _handleChangeTab = (targetTab) => {
    if (targetTab === 'projects') {
      let targetScroll = null;

      if (this._projectsScrollY <= HEADER_HEIGHT && this._likesScrollY <= HEADER_HEIGHT) {
        targetScroll = this._likesScrollY;
      } else if (this._likesScrollY > HEADER_HEIGHT && this._projectsScrollY < HEADER_HEIGHT) {
        targetScroll = HEADER_HEIGHT;
      }

      if (targetScroll !== null) {
        this._projectsScrollY = targetScroll;
        this.state.projectsScrollY.setValue(targetScroll);
        this._projectsScrollView.getNode().scrollTo({y: targetScroll, x: 0, animated: false});
      }

      this.setState({scrollY: this.state.projectsScrollY});
      this._likesScrollView.getNode().scrollTo({y: 0, animated: false});
    } else {
      let targetScroll = null;
      if (this._likesScrollY <= HEADER_HEIGHT && this._projectsScrollY <= HEADER_HEIGHT) {
        targetScroll = this._projectsScrollY;
      } else if (this._projectsScrollY > HEADER_HEIGHT && this._likesScrollY < HEADER_HEIGHT) {
        targetScroll = HEADER_HEIGHT;
      }

      if (targetScroll !== null) {
        this._likesScrollY = targetScroll;
        this.state.likesScrollY.setValue(targetScroll);
        this._likesScrollView.getNode().scrollTo({y: targetScroll, x: 0, animated: false});
      }

      this.setState({scrollY: this.state.likesScrollY});
      this._projectsScrollView.getNode().scrollTo({y: 0, animated: false});
    }
  }

  render() {
    let translateY = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
        {this._renderHeader()}

        <SlidingTabNavigation
          style={{height: 557}}
          lazy={false}
          initialTab="projects"
          onChangeTab={this._handleChangeTab}
          tabBarStyle={{
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: '#e7e7e7',
            paddingTop: 10,
            paddingBottom: 1,
          }}
          tabStyle={{
            flex: 0,
            paddingBottom: 12,
            paddingLeft: 12,
            paddingTop: 4,
            width: null,
          }}
          barBackgroundColor="#fff"
          position="top"
          getRenderLabel={this._getRenderLabel}
          pressColor="rgba(0,0,0,0.2)">

          <SlidingTabNavigationItem id="projects">
            {this._renderProjects()}
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="likes">
            {this._renderLikes()}
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>
      </Animated.View>
    );
  }

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <FadeIn>
          <Image
            style={styles.headerAvatar}
            source={{uri: 'http://url.brentvatne.ca/aIoC.png'}}
          />
        </FadeIn>
        <Text style={styles.headerFullNameText}>
          Christopher Chedeau
        </Text>
        <View style={styles.headerAccountsList}>
          <Text style={styles.headerAccountText}>
            @vjeux
          </Text>
          {this._maybeRenderGithubAccount()}
        </View>
      </View>
    );
  }

  _getRenderLabel = (props) => (scene) => {
    const { route, index } = scene;

    let title;
    if (route.key === 'projects') {
      title = 'Projects';
    } else if (route.key === 'likes') {
      title = 'Likes';
    }

    const selectedColor = '#0F73B6';
    const unselectedColor = '#232B3A';
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const outputRange = inputRange.map(inputIndex => inputIndex === index ? selectedColor : unselectedColor);
    const color = props.position.interpolate({
      inputRange,
      outputRange,
    });

    return (
      <Animated.Text style={{ color, fontSize: 14 }}>
        {title}
      </Animated.Text>
    );
  }

  _renderLikes = () => {
    let translateY = this.state.likesScrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, HEADER_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <Animated.ScrollView
        ref={view => { this._likesScrollView = view; }}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.likesScrollY } } }],
          { useNativeDriver: USE_NATIVE_DRIVER }
        )}
        contentContainerStyle={{paddingTop: 12}}>
          <Animated.View style={{paddingBottom: HEADER_HEIGHT, transform: [{translateY}]}}>
            <FakeCards />
          </Animated.View>
      </Animated.ScrollView>
    );
  }

  _renderProjects = () => {
    let translateY = this.state.projectsScrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, HEADER_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <Animated.ScrollView
        ref={view => { this._projectsScrollView = view; }}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.projectsScrollY } } }],
          { useNativeDriver: USE_NATIVE_DRIVER }
        )}
        contentContainerStyle={{paddingTop: 12}}>
          <Animated.View style={{paddingBottom: HEADER_HEIGHT, transform: [{translateY}]}}>
            <FakeCards />
          </Animated.View>
      </Animated.ScrollView>
    );
  }

  _maybeRenderGithubAccount() {

  }
}

class SignOutButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={{fontSize: 16, color: '#4E9BDE'}}>
          Sign out
        </Text>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: 716,
    backgroundColor: Colors.greyBackground,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.greyBackground,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerAvatar: {
    marginTop: 20,
    marginBottom: 12,
    height: 64,
    width: 64,
    borderRadius: 5,
  },
  headerAccountsList: {
    paddingBottom: 20,
  },
  headerAccountText: {
    color: 'rgba(36, 44, 58, 0.4)',
    fontSize: 14,
  },
  headerFullNameText: {
    color: '#232B3A',
    fontSize: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
  }
});
