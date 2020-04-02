import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { gray, dark, light } from '../utils/colors'

export class Deck extends Component {
    render() {
        const { deck } = this.props
        return (
            <TouchableWithoutFeedback onPress={() => this.props.navigateToDeckDetails(deck.title)}>
                <View style={[styles.container, styles.deck, styles.shadow]}>
                    <Text style={{fontSize: 32, marginTop: 10, marginBottom: 5}}>{deck.title}</Text>
                    <Text style={{color: gray, fontSize: 18}}>{deck.questions.length} cards</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    deck: {
        borderWidth: 2,
        borderColor: light,
        backgroundColor: light,
        margin: 15,
        borderRadius: 8
    },
    shadow: {
        shadowColor: dark,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 2
      },
})

function mapStateToProps(state, title) {
    const deck = state[title.title]
    return {
        deck
    }
}
export default connect(mapStateToProps)(Deck)