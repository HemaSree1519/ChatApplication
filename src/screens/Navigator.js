import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './Login'
import HomeScreen from './Home';
const Navigator = createStackNavigator(
    {
        Login: LoginScreen,
        Home: HomeScreen
    },
    {
        initialRouteName: "Login",
    }
);
var AppContainer;
export default AppContainer = createAppContainer(Navigator);
