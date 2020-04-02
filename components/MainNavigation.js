import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Dashboard from './Dashboard'
import DeckDetails from './DeckDetails'
import Deck from './Deck'
import AddCard from './AddCard'
import AddDeck from './AddDeck'
import Quiz from './Quiz'
import { dark, light } from '../utils/colors'

const MainNavigation = createStackNavigator({
    Home: {
        screen: Dashboard
    },
    DeckDetails: {
        screen: DeckDetails
    },
    AddCard: {
        screen: AddCard
    },
    Deck: {
        screen: Deck
    },
    AddDeck: {
        screen: AddDeck
    },
    Quiz: {
        screen: Quiz
    }
},{
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: dark,
            height: 80
        },
        headerTintColor: light,
        headerTitleStyle: 'bold',
        headerBackTitle: 'back'
    }
})


export default createAppContainer(MainNavigation)