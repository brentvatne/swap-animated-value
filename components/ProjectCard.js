import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import TouchableNativeFeedbackSafe from '@exponent/react-native-touchable-native-feedback-safe';
import FadeIn from '@exponent/react-native-fade-in-image';

export default class ProjectCard extends React.Component {
  render() {
    let {
      description,
      iconUrl,
      projectName,
      projectUrl,
      username,
    } = this.props;

    return (
      <View style={styles.spacerContainer}>
        <TouchableNativeFeedbackSafe
          onPress={() => {}}
          fallback={TouchableHighlight}
          underlayColor="#b7b7b7"
          style={[styles.container, styles.bottomBorder]}>
          <View>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <FadeIn placeholderColor="#eee">
                  <Image
                    source={{uri: iconUrl}}
                    style={styles.icon}
                  />
                </FadeIn>
              </View>
              <View style={styles.infoContainer}>
                <Text
                  style={styles.projectNameText}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {projectName}
                </Text>
                <View style={styles.projectExtraInfoContainer}>
                  <Text
                    onPress={() => {}}
                    style={styles.projectExtraInfoText}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {username}
                  </Text>
                  <View style={styles.bullet} />
                  <Text
                    onPress={() => {}}
                    style={styles.projectExtraInfoText}>
                    12 likes
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <Text style={styles.descriptionText}>
                {description}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedbackSafe>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    borderBottomColor: Colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  spacerContainer: {
    marginBottom: 15,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 17,
  },
  iconContainer: {
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 10,
  },
  descriptionText: {
    color: 'rgba(36, 44, 58, 0.7)',
    lineHeight: 19,
  },
  icon: {
    width: 40,
    height: 40,
  },
  infoContainer: {
    paddingTop: 13,
    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingBottom: 10,
  },
  projectNameText: {
    color: Colors.blackText,
    fontSize: 15,
    marginRight: 70,
    fontWeight: '500',
    marginBottom: 2,
  },
  projectExtraInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 3.5,
    height: 3.5,
    borderRadius: 3.5/2,
    backgroundColor: 'rgba(36, 44, 58, 0.2)',
    marginHorizontal: 6,
  },
  projectExtraInfoText: {
    color: 'rgba(36, 44, 58, 0.4)',
    fontSize: 13,
    lineHeight: 16,
  },
});

