import React, { Component } from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions'
import { getDecks } from '../utils/api'
import { light, dark } from '../utils/colors'
import Deck from './Deck'
import { AppLoading } from 'expo'
import Constants from 'expo-constants'

export class Dashboard extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
    .then(decks => dispatch(getAllDecks(decks)))
    .then(() => this.setState(() => ({ ready: true})))
  }
  _keyExtractor = (item, index) => `list-item-${index}`;

  navigateToDeckDetails= (deck) => {
    this.props.navigation.navigate('DeckDetails', {deck})
  }
  render() {
    const {decks} = this.props
    const { ready } = this.state
    if (ready === false ) {
      return <AppLoading />
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
        data={Object.values(decks)}
        renderItem={({item}) => <Deck style={styles.deck} title={item.title} navigateToDeckDetails={this.navigateToDeckDetails}/>}
        keyExtractor={this._keyExtractor}
        />
        <View style={{paddingLeft: 10, paddingRight: 10}}>
            <TouchableOpacity style={styles.primaryBtn} onPress={()=> this.props.navigation.navigate('AddDeck')}>
                <Text style={styles.btnText}>Add a Deck</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: light
  },
  primaryBtn: {
    backgroundColor: dark,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    width: width - 20,
    marginTop: 10,
    marginBottom: 10
  },
  btnText: {
      color: light,
      textAlign: 'center',
      fontSize: 21
  }
});

function mapStateToProps (decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(Dashboard)