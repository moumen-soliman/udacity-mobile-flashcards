import { AsyncStorage } from 'react-native'
import { decks } from './_DATA'

export const DECKS_STORAGE_KEY = 'MobileFlashCards:decks';

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(result => {
            if (result !== null) {
                return JSON.parse(result)
            } else {
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
                return decks;
            }
        })
}
  
export function getDeck(title) {
    return getDecks()
        .then((decks) => decks[title]);
}

export function saveDeckTitle(title) {
    const deck = { title, questions: []}
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: deck
    }))
}

export function addCardToDeck(title, card) {
    return getDecks()
        .then((decks) => {
            decks[title.title].questions.push(card)
            AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
        })
}