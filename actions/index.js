import { getDecks } from '../utils/api';

export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_NEW_CARD = 'ADD_NEW_CARD'

export function getAllDecks(decks) {
    return {
        type: GET_ALL_DECKS,
        decks
    }
}

export function addNewDeck(title) {
    return {
        type: ADD_NEW_DECK,
        title
    }
}

export function addNewCard(deckId, cardInfo) {
    return {
        type: ADD_NEW_CARD,
        deckId,
        cardInfo
    }
}
