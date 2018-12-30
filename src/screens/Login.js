import  React from 'react'
import {View, Button, TextInput, Text} from 'react-native'
import styles from '../styles/Login';
import firebase from '../../firebase/Firebase';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            phoneNo: ''
        }
    }

    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: "P2PApp",
                headerBackTitle: "Back",
                headerTintColor:"white",
                headerStyle:{
                    backgroundColor:'#cc504e'
                },
            }
        );
    };
    handlePress = () => {
        firebase.database().ref('/registeredUsers').child(this.state.phoneNo).child('chat').set({'chat': 'chat'});
    }
    render(){
        console.log(this.state.phoneNo);
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