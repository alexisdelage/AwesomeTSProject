/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import BookList from './src/components/BookList';
import * as styleConstants from './styles';
import data from './data.json';

/** The main component of the App */
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{...styles.titleContainer, ...backgroundStyle}}>
        <Text style={styles.title}>Books Explorer</Text>
      </View>
      <BookList data={data.docs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: styleConstants.xs,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
});

export default App;
