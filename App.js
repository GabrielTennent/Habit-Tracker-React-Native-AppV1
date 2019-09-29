import HabitPage from './components/HabitPage';
import WelcomePage from './components/WelcomePage';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomePage,
    navigationOptions: {
      title: 'Habits List',
    }
  },
  Home: {
    screen: HabitPage,
    navigationOptions: {
      headerLeft: null,
      title: 'Habits List',
    }
  },
}, {
  initialRoute: 'Welcome'
}
);

const App = createAppContainer(MainNavigator);

export default App;


