import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import Constants from 'expo-constants'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers'
import MainNavigation from './components/MainNavigation'
import { light, dark } from './utils/colors'
import { setLocalNotification } from './utils/notifications'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{ flex: 1 }} >
          <AppStatusBar backgroundColor={light}/>
          <MainNavigation />
        </View>
      </Provider>
    )
  }
}