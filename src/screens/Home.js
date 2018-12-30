import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, Button, View, FlatList} from 'react-native';
import styles from '../styles/Home';
import contacts from 'react-native-contacts';
import firebase from '../../firebase/Firebase';

export default class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.addMsg = this.addMsg.bind(this);
        this.handleAddMsg = this.handleAddMsg.bind(this);
        this.state = {
            contacts:[
                {name:'Hema'},
                {name:'Monisha'},
                {name:'Ashu'},
                {name:'Kittu'},
                {name:'sfsa'},
                {name:'sggsdv'},
                {name:'ljjn'},
                {name:'jhujn'}
            ],
            messages: [],
            msg: ''
        }
    }
    componentDidMount() {
        console.log(this.props.navigation.getParam('phoneNo'));
        console.log()
    }
    componentWillMount() {
        var msgs = [];

        // FIREBASE_REF.on('value', (snap) => {

        //         snap.forEach((childSnap) => {

        //             var temp = {
        //                 'time': childSnap.val().time,
        //                 'title': childSnap.val().message
        //             }
        //             msgs.push(temp)
        //         });
        //         this.setState({messages: msgs});

        //         msgs = [];
        //     }
        // )
    }
    handleAddMsg() {
        if ( this.state.msg !== "") {
            this.addMsg(this.state.msg)
            this.setState({
                msg: '',
            })
        }
    }

    addMsg(msg) {
        console.log("entered into add msg func")
        const temp = {
            time: Date.now(),
            message: msg
        }
        //console.log("Entered 1")
        //FIREBASE_REF.push(temp);
    }
    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle:'ChatBook',
                headerBackTitle:"Back",
                headerTintColor:'white',
                headerStyle:{
                    backgroundColor: '#cc504d',
                }

            }
        );
    };

    renderName = ({item}) => {
        return(

                        <TouchableOpacity style={styles.separator}>
                            <Text style={styles.item}> {item.name} </Text>
                        </TouchableOpacity>

        );
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.contacts}
                    renderItem={this.renderName}
                />
            </View>
        );
    }
}