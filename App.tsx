/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import BookList from './src/components/BookList';
import * as styleConstants from './styles';

const queryClient = new QueryClient();

/** The main component of the App */
function App(): JSX.Element {
  const [queryText, setQueryText] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={{...styles.titleContainer, ...backgroundStyle}}>
          <Text style={styles.title}>Books Explorer</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setQueryText}
          testID="queryInput"
          placeholder="Search"
        />
        <BookList query={queryText} />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    margin: styleConstants.xs,
    paddingLeft: styleConstants.xs,
    paddingRight: styleConstants.xs,
    borderWidth: 1,
  },
});

export default App;
