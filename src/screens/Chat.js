import React from "react";
import {FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View,Image} from 'react-native';
import {Header, SafeAreaView} from 'react-navigation';
import styles from "../styles/Chat";
import firebase from '../../firebase/Firebase';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: [],
        }
    }
    componentWillMount() {
        const persons = this.props.navigation.getParam("persons");
        const REG_USERS = firebase.database().ref('/registeredUsers');
        const REF = REG_USERS.child(persons.sender).child("chat").child(persons.receiver.item.key);
        REF.on('value', (chat) => {
            let chatData = chat.val();
            let temp = []
            for (let chatID in chatData) {
                const message = {
                    _id: chatData[chatID]._id,
                    msg: chatData[chatID].msg,
                    createdAt: new Date(chatData[chatID].createdAt),
                };
                temp.push(message);
            }
            this.setState({messages: temp});
        })
        // const USER_CHAT=firebase.database().ref('/conversations')
    }

    static navigationOptions = ({navigation}) => {
        return (
            {
                headerTitle: navigation.getParam("persons").receiver.item.name,
                headerTintColor: 'white',
                headerBackTitle: "Home",
                headerStyle: {
                    backgroundColor: '#cc504d',
                }
            }
        );
    };

    sendMessage() {
        if (this.state.message === '') {
            return;
        }
        const persons = this.props.navigation.getParam("persons");
        let message_object = {
            sender : persons.sender,
            receiver : persons.receiver.item.key,
            text: this.state.message,
            createdAt: new Date().getTime(),
        }
        const REG_USERS = firebase.database().ref('/registeredUsers');
        // const USER_CHAT = firebase.database().ref('/conversations');
        // USER_CHAT.push(message_object);
        REG_USERS.child(persons.sender).child("chat").child(persons.receiver.item.key).push(message_object);
        message_object._id = 2;
        REG_USERS.child(persons.receiver.item.key).child("chat").child(persons.sender).push(message_object);
    }

    renderItem(message) {
        let personMessageContainer;
        let personTextContainer;
        if(message.item._id===1){
            personMessageContainer=styles.senderMessageContainer;
            personTextContainer=styles.senderTextContainer;
        }
        else{
            personMessageContainer=styles.receiverMessageContainer;
            personTextContainer=styles.receiverTextContainer;
        }
        return (
            <View style={[styles.messageContainer, personMessageContainer]}>
                <Image source={require('../icon/user.png')}
                       style={styles.iconContainer} />
                    <Text style={personTextContainer}>{message.item.msg}</Text>
            </View>
        );
    };

    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? Header.HEIGHT + 20 : 0;
        const padding = Platform.OS === 'ios' ? "padding" : '';
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.messages}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                />
                <KeyboardAvoidingView
                    keyboardVerticalOffset={keyboardVerticalOffset}
                    behavior={padding}>
                    <SafeAreaView forceInset={{bottom: 'never'}}>
                        <View style={styles.footer}>
                            <TextInput
                                placeholder="TEXT TO SEND"
                                value={this.state.typing}
                                style={styles.input}
                                onChangeText={text => this.setState({message: text})}>
                            </TextInput>
                            <TouchableOpacity onPress={this.sendMessage.bind(this)}>
                                <Text style={styles.send}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}