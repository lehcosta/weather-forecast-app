'use strict';

import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {
  fetchWeather,
  fetchWeatherByGeoLocation
} from '../Utils/api';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#000'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    color: '#545454',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#FF4F01',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonMyLocation: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonMyLocationText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center'
  },
  loader: {
    padding: 20,
  }
});

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      city: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMyLocation = this.getMyLocation.bind(this);
  }

  handleChange(event) {
    this.setState({
      city: event.nativeEvent.text
    });
  }

  handleSubmit() {
    const { city } = this.state;

    if (city === '') {
      return Alert.alert('', 'Por favor, digite um local.');
    }

    this.setState({
      isLoading: true
    })

    fetchWeather(city).then((response) => {
      this.setState({
        isLoading: false,
        city: ''
      })
      this.props.navigator.push({
        id: 'result',
        title: city || 'Resultado',
        passProps: {
          weather: response
        }
      });
    }).catch((error) => {
      Alert.alert('Ops :`(', `Não foi encontrado o local "${city}"`);
    })
  }

  getMyLocation() {
    this.setState({
      isLoading: true
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByGeoLocation(lat, lon).then((response) => {
          this.setState({
            isLoading: false,
            city: ''
          });
          this.props.navigator.push({
            id: 'result',
            title: response.name || 'Resultado',
            passProps: {
              weather: response
            }
          });
        })
      },
      (error) => {
        this.setState({
          isLoading: false,
          city: ''
        });
        Alert.alert(JSON.stringify(error));
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    const { city, isLoading } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Digite o local</Text>
        <TextInput
          style={styles.searchInput}
          value={city}
          editable={!isLoading}
          onSubmitEditing={this.handleSubmit}
          underlineColorAndroid="transparent"
          onChange={this.handleChange} />
        {!isLoading && <TouchableHighlight
         style={styles.button}
         onPress={this.handleSubmit}
         underlayColor="white">
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableHighlight>}
        {!isLoading && <TouchableHighlight
         style={styles.buttonMyLocation}
         onPress={this.getMyLocation}
         underlayColor="white">
          <Text style={styles.buttonMyLocationText}>Minha Localização</Text>
        </TouchableHighlight>}
        <ActivityIndicator
          style={styles.loader}
          animating={isLoading}
          color="#111"
          size="large"></ActivityIndicator>
      </View>
    );
  }
}
















































