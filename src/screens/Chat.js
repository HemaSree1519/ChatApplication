import React from "react";
import {Platform,View,Text,TextInput,KeyboardAvoidingView,FlatList,TouchableOpacity} from 'react-native';
import {Header,SafeAreaView} from 'react-navigation';
import styles from "../styles/Chat";

export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state={
            typing : "",
            messages: []
        }
    }
    renderItem({item}){
        return (
            <View style={styles.row}>
                <View style={styles.rowText}>
                    <Text style={styles.sender}>{item.sender}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                </View>
            </View>
        );
    };
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: navigation.getParam("name"),
                headerTintColor:'white',
                headerStyle:{
                    backgroundColor: '#cc504d',
                }
            }
        );
    };
    sendMessage(){
        if(this.state.typing === ''){
            return;
        }
        const messages=this.state.messages;
        messages.push({"sender":this.props.navigation.getParam("name"),"message":this.state.typing});
        this.setState({
            messages:messages,
            typing:""
        });
    }
    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? Header.HEIGHT + 20 : 0;
        const padding = Platform.OS === 'ios' ? "padding" : '';
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.messages}
                    renderItem={this.renderItem}
                    extradata={this.state}
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
                                onChangeText={text => this.setState({typing: text})}>
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