import { createStackNavigator } from 'react-navigation';

import LoginPage from './src/pages/LoginPage';
import SeriesPage from './src/pages/SeriesPage';

export default createStackNavigator({
  'Login': {
    screen: LoginPage,
    navigationOptions: {
      title: 'Bem Vindo!'
    }
  },
  'Main': {
    screen: SeriesPage
  }
}, {
  navigationOptions: {
    title: "Series!",
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#6ca2f7',
      borderBottomWidth: 1,
      borderBottomColor: '#C5C5C5',
    },
    headerTitleStyle: {
      color: '#fff',
      fontSize: 30
    }
  }
})