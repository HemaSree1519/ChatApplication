import React from "react";
import {Platform,View,Text,TextInput,KeyboardAvoidingView,FlatList,TouchableOpacity} from 'react-native';
import {Header,SafeAreaView} from 'react-navigation';
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
    componentWillMount(){
        const persons = this.props.navigation.getParam("persons");
        const REG_USERS = firebase.database().ref('/registeredUsers');
        const REF=REG_USERS.child(persons.sender).child("chat").child(persons.receiver.item.key);
        REF.on('value',(chat) =>{
            let chatData = chat.val();
            let temp=[]
            console.log(chatData)
            for (let chatID in chatData) {
                const message={
                    _id:chatData[chatID]._id,
                    msg: chatData[chatID].msg,
                    createdAt:new Date(chatData[chatID].createdAt),
                };
                // console.log("Message object : "+message.msg)
                temp.push(message);
            }
            console.log("Temp : "+temp)
            this.setState({ messages: temp});
            console.log("State : "+this.state.messages)

        })
    }
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle:navigation.getParam("persons").receiver.item.name,
                headerTintColor:'white',
                headerStyle:{
                    backgroundColor: '#cc504d',
                }
            }
        );
    };
    sendMessage(){
        if(this.state.message === ''){
            return;
        }
        const persons = this.props.navigation.getParam("persons");
        let message_object={
            _id:2,
            msg:this.state.message,
            createdAt:new Date().getTime(),
        }
        const REG_USERS = firebase.database().ref('/registeredUsers');
        console.log("sender: "+ persons.sender + "receiver : "+persons.receiver.item.key);
        REG_USERS.child(persons.sender).child("chat").child(persons.receiver.item.key).push(message_object);
        message_object._id=1;
        REG_USERS.child(persons.receiver.item.key).child("chat").child(persons.sender).push(message_object);
    }
    renderItem(message){

        return (
            <View style={styles.row}>
                <View style={styles.rowText}>
                    <Text style={styles.message}>{message.item.msg}</Text>
                </View>
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
                    keyboardVerticalOffset = {keyboardVerticalOffset}
                    behavior= {padding}>
                    <SafeAreaView forceInset={{ bottom: 'never' }}>
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