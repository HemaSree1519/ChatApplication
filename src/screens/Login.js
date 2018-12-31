import  React from 'react'
import {View, Button, TextInput, Text} from 'react-native'
import styles from '../styles/Login';
import firebase from '../../firebase/Firebase';

export default class Login extends React.Component {

      state= {phoneNo: ''}

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
        console.log(this.state.phoneNo);
        firebase.database().ref('/registeredUsers').child(this.state.phoneNo).set({'Flag': 'true'});
        this.props.navigation.navigate('Home', { phoneNo: this.state.phoneNo });

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
                        onChangeText={(text)=> this.setState({phoneNo: text})}
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