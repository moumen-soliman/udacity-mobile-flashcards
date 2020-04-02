import React, {Component} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions} from 'react-native'
import { addNewCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { gray, light, dark } from '../utils/colors'
import Constants from 'expo-constants'
import { ScrollView } from 'react-native-gesture-handler'

export class AddCard extends Component {
    static navigationOptions = {
        title: 'Add Card'
      }
    state = {
        question: '',
        answer: ''
    }
    handleAddQuestion = (input) => {
        this.setState({
            question: input
        })
    }
    handleAddAnswer = (input) => {
        this.setState({
            answer: input
        })
    }
    onPressButton = () => {
        const { question, answer } = this.state

        const deckId = this.props.navigation.state.params.deck
        this.props.createNewCard(deckId, {question, answer})
        addCardToDeck(deckId, {question, answer})
        this.setState({
            question: '',
            answer: ''
        })
        //return to deck.
        this.props.navigation.navigate('DeckDetails', deckId)
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                <Text style={styles.heading}>Add a new card to your mobile FlashCards!</Text>
                <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10, color: dark, marginTop: 20}}>Add the question</Text>
                <KeyboardAvoidingView behavior='padding'>
                    <TextInput
                        onChangeText={this.handleAddQuestion}
                        placeholder={'your question'}
                        style={styles.input}>
                    </TextInput>
                    {
                        this.state.question.length === '' && 
                        <Text>The card must have a question</Text>
                    }
                </KeyboardAvoidingView>
                <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 10, color: dark}}>Add the answer, should be a true or false answer.</Text>
                <KeyboardAvoidingView behavior='padding'>
                    <TextInput
                        onChangeText={this.handleAddAnswer}
                        placeholder={'is true or false'}
                        style={styles.input}>
                    </TextInput>
                    {
                        this.state.answer.length === '' && 
                        <Text>The card must have a question</Text>
                    }
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.primaryBtn} onPress={this.onPressButton} disabled={this.state.question === '' || this.state.answer === '' ? true : false}>
                    <Text style={styles.btnText}>Add Card</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
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
        fontSize: 24,
        textAlign: 'center',
        marginBottom:10,
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
    },
    input: {
        padding: 20,
        marginTop: 10,
        marginBottom: 25,
        fontSize: 18,
        borderWidth: 2,
        borderColor: gray,
        borderRadius: 8,
        width: width - 40,
        textAlign: 'center'
    }
})
const mapDispatchToProps = dispatch => ({
    createNewCard: (deckId, question, answer) => 
        dispatch(addNewCard(deckId, question, answer))
})
export default connect(null, mapDispatchToProps)(AddCard)