import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  Navigator
} from 'react-native';
import weatherIcon from './Icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
  },
  resultItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    marginBottom: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  item:{
    marginTop: 5,
    marginBottom: 5
  },
  resultItemLabel: {
    fontWeight: 'bold'
  },
  temperature: {
    fontSize: 62,
    fontWeight: "100",
    margin: 0
  },
  icon: {
    fontFamily: 'WeatherIcons-Regular',
    fontSize: 130,
    padding: 0
  },
  temperatureMinMax: {
    fontSize: 25
  },
  temperatureMinMaxLabel: {
    fontWeight: 'bold'
  },
  location: {
    fontSize: 14,
    fontWeight: "100",
    marginBottom: 20,
  },
});

const Result = ({weather}) => (
  <View style={styles.container}>
    <Text style={styles.icon}>
      {weatherIcon(weather.weather[0].icon)}
    </Text>
    <Text style={styles.temperature}>
      {`${Math.round(weather.main.temp)}ºC`}
    </Text>
    <Text style={styles.location}>
      {`${weather.name} / ${weather.sys.country}`}
    </Text>
  </View>
);

export default Result;