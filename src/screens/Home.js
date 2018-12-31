import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/Home';
import contacts from 'react-native-contacts';
import firebase from '../../firebase/Firebase';

export default class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.addMsg = this.addMsg.bind(this);
        this.handleAddMsg = this.handleAddMsg.bind(this);
        this.state = {
            contacts: [],
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
                            console.log(USER_NAME)
                            if (USER_PH_NUM && reg_users.hasChild(USER_PH_NUM)) {
                                cnts.push({
                                    key: USER_PH_NUM,
                                    name: USER_NAME
                                })
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

    static navigationOptions = ({navigation}) => {
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
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', {"name": contact.item.name})}
                              style={styles.separator}>
                <Text style={styles.item}> {contact.item.name} </Text>
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