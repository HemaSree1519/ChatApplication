import React from "react";
import {FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Header, SafeAreaView} from 'react-navigation';
import styles from "../styles/Chat";
import firebase from '../../firebase/Firebase';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            messages: []
        }
    }

    componentWillMount() {
        const persons = this.props.navigation.getParam("persons");
        let key = '';
        if (persons.sender === persons.receiver) {
            key = persons.sender
        }
        else if (persons.sender > persons.receiver.item.key) {
            key = persons.receiver.item.key + persons.sender;
        }
        else {
            key = persons.sender + persons.receiver.item.key;
        }
        const DB_REF = firebase.database().ref().child('/conversations').child(key);
        DB_REF.on('value', (chat) => {
            let chatData = chat.val();
            let _id = '';
            let temp = [];
            for (let chatID in chatData) {

                if(chatData[chatID].sender === persons.sender){
                    _id=1
                }
                if(chatData[chatID].sender !== persons.sender){
                    _id=2
                }
                if (chatData[chatID].sender === persons.sender && chatData[chatID].receiver === persons.sender) {
                    _id = 0
                }
                let message = {
                    _id: _id,
                    msg: chatData[chatID].text,
                    createdAt: new Date(chatData[chatID].createdAt),
                };
                temp.push(message);
            }
            this.setState({messages: temp})
        })

    }

    static navigationOptions = ({navigation}) => {
        return (
            {
                headerTitle: navigation.getParam("persons").receiver.item.name,
                headerTintColor: 'white',
                headerBackTitle: "Home",
                headerStyle: {
                    backgroundColor: '#cc504d',

                    fontFamily: "roboto.bold"
                }
            }
        );
    };

    sendMessage() {
        if (this.state.message === '') {
            return;
        }
        const persons = this.props.navigation.getParam("persons");
        console.log("persons here: ")
        console.log(persons)
        // if(persons.sender===persons.receiver)
        // {
        //     // console.log("self chat in chat screen");
        //     let self_message_object = {
        //         text : this.state.message,
        //         createdAt: new Date().getTime()
        //     }
        // }
        let message_object = {
            sender: persons.sender,
            receiver: persons.receiver.item.key,
            text: this.state.message,
            createdAt: new Date().getTime(),
        }
        this.setState({message: ""})
        const DB_REF = firebase.database().ref().child('/conversations');
        let key = '';
        if (persons.sender === persons.receiver) {
            key = persons.sender;
        }
        else if (persons.sender > persons.receiver.item.key) {
            key = persons.receiver.item.key + persons.sender;
        }
        else {
            key = persons.sender + persons.receiver.item.key;
        }
        DB_REF.child(key).push(message_object);
    }

    renderItem(message) {
        let personMessageContainer;
        let personTextContainer;
        const time = message.item.createdAt.getHours() + ":" + message.item.createdAt.getMinutes();
        if (message.item._id === 0)
        {
            personMessageContainer = styles.selfMessageContainer;
            personTextContainer = styles.selfTextContainer;
            return(
                    <View style={[styles.messageContainer, personMessageContainer]}>
                        <Text style={personTextContainer}>{message.item.msg+ "\n" + time}</Text>
                        {/*<Text styles={styles.selfTimeContainer}>{time}</Text>*/}
                    </View>
                )
        }
        else {
        if (message.item._id === 1) {
            personMessageContainer = styles.senderMessageContainer;
            personTextContainer = styles.senderTextContainer;
        }
        else {
            personMessageContainer = styles.receiverMessageContainer;
            personTextContainer = styles.receiverTextContainer;
        }
        return (
            <View style={[styles.messageContainer, personMessageContainer]}>
                <Image source={require('../icon/user.png')}
                       style={styles.iconContainer}/>
                <Text style={personTextContainer}>{message.item.msg + "\n" + time}</Text>
            </View>
        );
         }


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
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: false})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                />
                <KeyboardAvoidingView
                    keyboardVerticalOffset={keyboardVerticalOffset}
                    behavior={padding}>
                    <SafeAreaView forceInset={{bottom: 'never'}}>
                        <View style={styles.footer}>
                            <TextInput
                                placeholder="TEXT TO SEND"
                                value={this.state.message}
                                style={styles.input}
                                onChangeText={text => this.setState({message: text})}
                                clearButtonMode='always'>
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