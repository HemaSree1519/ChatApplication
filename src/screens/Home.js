import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import styles from '../styles/Home';
import contacts from 'react-native-contacts';
import firebase from '../../firebase/Firebase';

export default class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
        }
    }
    componentDidMount() {
        try {
            AsyncStorage.getItem('isRegistered').then((isRegistered) => {
                console.log(isRegistered);
                if (isRegistered === 'false') {
                    this.props.navigation.navigate('Login');
                }
            });
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }
    componentWillMount() {
        const REG_USERS = firebase.database().ref('/registeredUsers');
        let cnts = [];
        contacts.getAll((err, local_contacts) => {
            if (err) {
                throw err
            }
            else {
                REG_USERS.once('value', (reg_users) => {
                    for (let iterator = 0; iterator < local_contacts.length; iterator++) {
                        if (local_contacts[iterator].phoneNumbers.length !== 0) {
                            const USER_PH_NUM = local_contacts[iterator].phoneNumbers[0].number.replace(/\D/g, '');
                            const USER_NAME = local_contacts[iterator].givenName;
                            if (USER_PH_NUM && reg_users.hasChild(USER_PH_NUM)) {
                                let cnt = {
                                    key: USER_PH_NUM,
                                    name: USER_NAME
                                }
                                cnts.push(cnt);
                            }
                        }
                    }
                    this.setState({
                        contacts: cnts
                    })
                });
            }
        })
    }
    
    static navigationOptions = ({ navigation }) => {
        return (
            {
                headerTitle: 'ChatBook',
                headerBackTitle: "Back",
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#cc504d',
                }

            }
        );
    };

    renderName(contact) {
        let persons = {
            sender: this.props.navigation.getParam("phoneNo"),
            receiver: contact
        }
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', { "persons": persons })}
                style={styles.separator}>
                <Text style={styles.item}> {persons.receiver.item.name} </Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.contacts}
                    renderItem={this.renderName.bind(this)}
                />
            </View>
        );
    }
}