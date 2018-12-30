import  React from 'react'
import {View, Button, TextInput, Text} from 'react-native'
import styles from '../styles/Login';

export default class Login extends React.Component<props>{

    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: "ChatBook",
                headerBackTitle: "Back",
                headerTintColor:"white",
                headerStyle:{
                    backgroundColor:'#cc504e'
                },
            }
        );
    };
    handlePress = () => {
        this.props.navigation.navigate('Home');
    }
    render(){
        return(
            <View style={styles.mainContainer}>
                <View>
                    <TextInput
                        placeholder="Enter your phone number"
                        keyboardType='numeric'
                        style={styles.input}
                        maxLength={10}
                    />
                </View>
                <View>
                    <Button
                        style={styles.button}
                        title="Next"
                        onPress={this.handlePress}
                    />
                </View>
            </View>
        )
    }
}