import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  square: {
    width: 200,
    aspectRatio: 1,
    backgroundColor: '#A02132',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 50,
  },
  text: {
    color: '#70FF70',
    fontWeight: '900',
    fontSize: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

function HelloWorldSquare(): JSX.Element {
  return (
    <View style={styles.square}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
}

export default HelloWorldSquare;
