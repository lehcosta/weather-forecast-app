// 'use strict';

import React, {Component} from 'react';
import {
  Navigator,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';
import Main from './Main';
import Result from './Result';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  navigatorBar: {
    backgroundColor: '#FF4F01',
    flex: 1,
    justifyContent: 'center'
  },
  navigatorBarTitle: {
    color: '#fff',
    fontSize: 22,
    lineHeight: (Navigator.NavigationBar.Styles.General.NavBarHeight - 5)
  },
  button: {
    backgroundColor: '#FF6F2D',
    borderRadius: 10,
    marginRight: 15,
    borderColor: '#fff',
  },
  buttonText: {
    padding: 10,
    color: '#fff',
  }
});

export default class Navigation extends Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'main', title: 'Previsão do Tempo'}}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {},
              RightButton: (route, navigator, index, navState) => {
                return (
                  <TouchableHighlight
                    style={styles.button}
                    onPress={() => navigator.pop()}
                    underlayColor="white">
                    {route.id === 'main' ? <Text /> : <Text style={styles.buttonText}>Voltar</Text>}
                  </TouchableHighlight>
                );
              },
              Title: (route, navigator, index, navState) => {
                return (<Text style={styles.navigatorBarTitle}>{route.title}</Text>);
              },
            }}
            style={styles.navigatorBar}
            navigationStyles={Navigator.NavigationBar.StylesIOS}/>
        }
        renderScene={this.navigatorRenderScene} />
    );
  }

  navigatorRenderScene(route, navigator) {
    console.log(route.passProps)
    const { id, title } = route;
    switch (id) {
      case 'main':
        return <Main
                  title={title}
                  navigator={navigator} />

      case 'result':
        return <Result
                  title={title}
                  onBack={() => navigator.pop()}
                  navigator={navigator}
                  {...route.passProps} />
    }
  }
}