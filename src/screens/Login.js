import React from 'react'
import { Button, TextInput, View, AsyncStorage } from 'react-native'
import styles from '../styles/Login';
import firebase from '../../firebase/Firebase';

export default class Login extends React.Component {

    state = {phoneNo: ''}


    static navigationOptions = ({navigation}) => {
        return (
            {
                headerTitle: "ChatBook",
                headerBackTitle: "Back",
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: '#cc504e'
                },
            }
        );
    };

    setIsRegisterd(USER_PH_NUM) {
        try {
            AsyncStorage.setItem('isRegistered', 'true');
            // AsyncStorage.getItem('isRegistered').then((isRegistered) => {
            //     console.log(isRegistered);
            // });
        }
        catch(err) {
            console.log(err);
        }
        this.props.navigation.navigate('Home', {phoneNo: USER_PH_NUM}); 
    }
    handlePress() {
        let USER_PH_NUM = this.state.phoneNo;
        const REG_USERS = firebase.database().ref('/registeredUsers');
        REG_USERS.once('value', (reg_users) => {
            if (!reg_users.hasChild(USER_PH_NUM)) {
                REG_USERS.child(this.state.phoneNo).set({'Flag': 'true'});
            }

        });
       this.setIsRegisterd(USER_PH_NUM);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View>
                    <TextInput
                        placeholder="Enter your phone number"
                        keyboardType='numeric'
                        style={styles.input}
                        maxLength={10}
                        onChangeText={(text) => this.setState({phoneNo: text})}
                    />
                </View>
                <View>
                    <Button
                        style={styles.button}
                        title="Next"
                        onPress={this.handlePress.bind(this)}
                    />
                </View>
            </View>
        )
    }
}