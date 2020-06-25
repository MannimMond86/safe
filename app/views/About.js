import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import packageJson from '../../package.json';
import fontFamily from './../constants/fonts';
import { NavigationBarWrapper, Typography } from '../components';
import { useAssets } from '../TracingStrategyAssets';

import { Colors, Spacing } from '../styles';
import { useDispatch } from 'react-redux';
import toggleAllowFeatureFlagsAction from '../store/actions/featureFlags/toggleAllowFeatureFlagsEnabledAction';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const AboutScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    console.log(clickCount);
    if (clickCount === 20) {
      dispatch(toggleAllowFeatureFlagsAction({ overrideValue: true }));
    }
  }, [clickCount, dispatch]);

  const incrementClickCount = () => setClickCount(clickCount + 1);

  const { t } = useTranslation();
  const { aboutHeader } = useAssets();

  const backToMain = () => {
    navigation.goBack();
  };

  return (
    <NavigationBarWrapper
      title={t('screen_titles.about')}
      onBackPress={backToMain}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        alwaysBounceVertical={false}>
        <View style={styles.spacer} />
        <View style={styles.spacer} />

        <TouchableWithoutFeedback onPress={incrementClickCount}>
          <Typography use='headline2'>{aboutHeader}</Typography>
        </TouchableWithoutFeedback>
        <View style={{ height: 10 }} />
        <Typography use='body2'>
          {t('label.about_para')}
          {/* Space between the copy & link*/}
          <Text> </Text>
          <Typography
            style={styles.hyperlink}
            onPress={() => {
              Linking.openURL('https://covidsafepaths.org/');
            }}>
            {/* eslint-disable-next-line react-native/no-raw-text */}
            {'covidsafepaths.org'}
          </Typography>
        </Typography>

        <View style={styles.spacer} />
        <View style={styles.spacer} />

        <View style={styles.main}>
          <View>
            <View style={styles.row}>
              <Typography style={styles.aboutSectionParaBold}>
                {t('about.version')}
              </Typography>
            </View>

            <View style={styles.row}>
              <Typography style={styles.aboutSectionParaBold}>
                {t('about.operating_system_abbr')}
              </Typography>
            </View>

            <View style={styles.row}>
              <Typography style={styles.aboutSectionParaBold}>
                {t('about.dimensions')}
              </Typography>
            </View>
          </View>

          <View>
            <View style={styles.row}>
              <Typography style={styles.aboutSectionParaBold}>
                {packageJson.version}
              </Typography>
            </View>

            <View style={styles.row}>
              <Typography style={styles.aboutSectionParaBold}>
                {Platform.OS + ' v' + Platform.Version}
              </Typography>
            </View>

            <View style={styles.row}>
              <Typography style={styles.aboutSectionParaBold}>
                {Math.trunc(Dimensions.get('screen').width) +
                  ' x ' +
                  Math.trunc(Dimensions.get('screen').height)}
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
        <View style={styles.spacer} />
      </ScrollView>
    </NavigationBarWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: Spacing.medium,
  },
  hyperlink: {
    color: Colors.linkText,
    textDecorationLine: 'underline',
  },
  aboutSectionParaBold: {
    color: Colors.primaryViolet,
    fontSize: 16,
    lineHeight: 22.5,
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: fontFamily.primaryBold,
  },
  spacer: {
    marginVertical: '2%',
  },
  main: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    color: Colors.primaryText,
    alignItems: 'flex-start',
    marginRight: 20,
  },
});

export default AboutScreen;
