import React, {Component} from 'react';
import {AsyncStorage, FlatList, Text, TouchableOpacity, View,PermissionsAndroid} from 'react-native';
import styles from '../styles/Home';
import contacts from 'react-native-contacts';
import firebase from '../../firebase/Firebase';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            phoneNo:this.props.navigation.getParam("phoneNo"),
        }
    }
    async getContactsPermission(){
        const grant_permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        return grant_permission ===PermissionsAndroid.RESULTS.GRANTED;
    }

    async componentDidMount() {
        const permission = await this.getContactsPermission();

        if(!permission){
            alert(permission);
            return;
        }

        const REG_USERS = firebase.database().ref('/registeredUsers');
        let cnts = [];
        contacts.getAll((err, local_contacts) => {
            if (err) {
                throw err
            }
            else {
                REG_USERS.once('value', (reg_users) => {
                    console.log('firebase')
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
                    this.setState({contacts: cnts});
                });
            }
            console.log(this.state.contacts)
        })
    }

    static navigationOptions = ({navigation}) => {
        return (
            {
                headerTitle: 'Sollu',
                headerBackTitle: "Back",
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#cc504d',
                }

            }
        );
    };

    renderName(contact) {
        console.log("In home sender:")
        console.log(this.state.phoneNo);
        let persons = {
            sender: this.state.phoneNo,
            receiver: contact
        }
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', {"persons": persons})}
                              style={styles.separator}>
                <Text style={styles.item}> {persons.receiver.item.name} </Text>
            </TouchableOpacity>
        );
    }

    render() {
        console.log(this.state.phoneNo);
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
