import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions} from 'react-native'
import { gray, light, dark } from '../utils/colors'
import { addNewDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import Constants from 'expo-constants'


export class AddDeck extends Component {
    static navigationOptions = {
        title: 'Add a Deck'
    }
    state = {
        deckTitle: '',
        valid: false
    }
    handleAddTitle = (input) => {
        if (input.length === 0) {
            this.setState({
                valid: false
            })
        }
        this.setState({
            deckTitle: input,
            valid: true
        })
    }
    onPressButton = () => {
        const { deckTitle } = this.state
        this.props.createNewDeck(deckTitle)
        saveDeckTitle(deckTitle)
        this.setState({
            deckTitle: ''
        })
        
        //return to deck.
        this.props.navigation.navigate('DeckDetails', {deck: deckTitle})
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.heading}>New deck</Text>
                <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10, color: dark}}>Add the title of the new deck you want to create</Text>
                <TextInput
                    onChangeText={this.handleAddTitle}
                    placeholder={'title here'}
                    style={styles.input}>
                </TextInput>
                {
                    this.state.valid === false && 
                    <Text>The deck must have a title</Text>
                }
                <TouchableOpacity style={styles.primaryBtn} onPress={this.onPressButton} disabled={this.state.valid === false ? true : false}>
                    <Text style={styles.btnText}>Add Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
        fontSize: 32,
        textAlign: 'center',
        marginBottom:20,
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
    btnText: {
        color: light,
        textAlign: 'center',
        fontSize: 21
    },
    input: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 2,
        borderColor: gray,
        borderRadius: 8,
        width: width - 40,
        textAlign: 'center'
    }
})

const mapDispatchToProps = dispatch => ({
    createNewDeck: (title) => 
        dispatch(addNewDeck(title))
})
export default connect(null, mapDispatchToProps)(AddDeck)