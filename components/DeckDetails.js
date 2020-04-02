import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { gray, light, dark } from '../utils/colors'
import Constants from 'expo-constants'
import { clearLocalNotifications, setLocalNotification } from '../utils/notifications'

export class DeckDetails extends Component {
    static navigationOptions = {
        title: 'Deck Details'
    }
    handleStartQuiz = () => {
        const deck = this.props.deck

        clearLocalNotifications()
        .then(setLocalNotification)
        .then(this.props.navigation.navigate('Quiz', {deck}))
        
    }
    render() {
        const { deck } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={{fontSize: 32, marginTop: 10, marginBottom: 5, textAlign: 'center'}}>{deck.title}</Text>
                    <Text style={{color: gray, fontSize: 18, textAlign: 'center'}}>{deck.questions.length} cards</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.primaryBtn} onPress={this.handleStartQuiz}>
                        <Text style={styles.btnText}>Take a Quiz</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[styles.primaryBtn, styles.secondaryBtn]} onPress={()=> this.props.navigation.navigate('AddCard', {deck})}>
                        <Text style={styles.secondaryText}>Add a card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: Constants.statusBarHeight,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: light
    },
    heading: {
        marginBottom: 20
    },
    primaryBtn: {
        backgroundColor: dark,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 7,
        width: width - 40,
        marginTop: 10,
        marginBottom: 10 
    },
    secondaryBtn: {
        backgroundColor: light,
        borderColor: dark,
        borderWidth: 3,
    },
    btnText: {
        color: light,
        textAlign: 'center',
        fontSize: 21
    },
    secondaryText: {
        color: dark,
        textAlign: 'center',
        fontSize: 21
    }
})

function mapStateToProps(state, ownProps) {
    return { deck: state[ownProps.navigation.state.params.deck] };
}
export default connect(mapStateToProps)(DeckDetails)