import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './Login'


const Navigator = createStackNavigator(
    {
        Login: LoginScreen,
    },
    {
        initialRouteName: "Login",
    }
);
var AppContainer;
export default AppContainer = createAppContainer(Navigator);
