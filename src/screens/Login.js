import React from 'react'
import {TextInput, View, TouchableOpacity, Text,Image} from 'react-native'
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

    validatePhoneNum(text) {
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) === -1) {
                return;
            }
        }
        this.setState({phoneNo: text, error: ""});
    }
    setIsRegisterd(USER_PH_NUM) {
        try {
            AsyncStorage.setItem('isRegistered', 'true');
        }
        catch(err) {
            console.log('Error setting data'+err);
        }
        this.props.navigation.navigate('Home', {phoneNo: USER_PH_NUM});
    }
    handlePress(){
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
                <View style={styles.SectionStyle}>
                    <Image source={require('../icon/phone_icon.jpg')}
                                 style={styles.imageStyle}/>
                    <TextInput
                        style={styles.TextContainer}
                        placeholder="Enter phone number"
                        value={this.state.phoneNo}
                        onChangeText={this.validatePhoneNum.bind(this)}
                    />
                </View>
                <View>
                    <TouchableOpacity style={[styles.button, { backgroundColor: this.state.phoneNo ? '#cc504e' : '#f49f8e' }]}
                                      activeOpacity = { .5 }
                                      disabled={!this.state.phoneNo}
                                          onPress={this.handlePress.bind(this)}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}