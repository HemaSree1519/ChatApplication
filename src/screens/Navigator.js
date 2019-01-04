import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './Login'
import HomeScreen from './Home'
import ChatScreen from './Chat'
const Navigator = createStackNavigator(
    {
        Login: LoginScreen,
        Home:HomeScreen,
        Chat:ChatScreen
    },
    {
        initialRouteName: "Login",
    }
);
var AppContainer;
export default AppContainer = createAppContainer(Navigator);
