import React from 'react'
import {NavigationActions,StackActions} from 'react-navigation';
import {TouchableOpacity, Text,Image,TextInput, View, AsyncStorage,ProgressBarAndroid} from 'react-native'
import styles from '../styles/Login';
import firebase from '../../firebase/Firebase';

export default class Login extends React.Component {

    state = {
        phoneNo: '',
        error: false,
        getting_id: false
    }
    async componentWillMount(){
        const USER_PH_NUM = await AsyncStorage.getItem('registration_id4');
        if(USER_PH_NUM !==null){
            // this.props.navigation.navigate('Home',{phoneNo:USER_PH_NUM});
            this.props.navigation.dispatch(
                StackActions.reset({
                    index:0,
                    actions: [NavigationActions.navigate({routeName: "Home", params:{phoneNo:USER_PH_NUM}})]
                })
            )
        }
        else{
            this.setState({getting_id : true});
        }
    }

    static navigationOptions = ({navigation}) => {
        return (
            {
                headerTitle: "Sollu",
                headerBackTitle: "Back",
                headerTintColor: "white",
                headerStyle: {
                    fontFamily:"roboto.bold",
                    backgroundColor: '#cc504e'
                },
            }
        );
    };

    validatePhoneNum(text) {
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) === -1) {
                this.setState({ error: true })
                return;
            }
        }
        this.setState({phoneNo: text});
    }
    async handlePress(){
        if(this.state.phoneNo.length<10){
            alert("Invalid phone number");
            return;
        }
        let USER_PH_NUM = this.state.phoneNo;
        const REG_USERS = firebase.database().ref('/registeredUsers');
        REG_USERS.once('value', (reg_users) => {
            if (!reg_users.hasChild(USER_PH_NUM)) {
                REG_USERS.child(this.state.phoneNo).set({'Flag': 'true'});
            }
            else{
                alert("User already registered");
                return;
            }
        });
        let ph=this.state.phoneNo;
      await AsyncStorage.setItem('registration_id4', this.state.phoneNo).then(
          // this.props.navigation.navigate('Home',{phoneNo:ph})
          this.props.navigation.dispatch(
              StackActions.reset({
                  index:0,
                  actions: [NavigationActions.navigate({routeName: "Home", params:{phoneNo:ph}})]
              })
          )
      )
    }

    render() {
        if(!this.state.getting_id){
            return(
                <ProgressBarAndroid/>
            )
        }
        return (
            <View style={styles.mainContainer}>
                <View style={styles.SectionStyle}>
                    <Image source={require('../icon/phone_icon.jpg')}
                                 style={styles.imageStyle}/>
                    <TextInput
                        style={styles.TextContainer}
                        placeholder="Enter phone number"
                        keyboardType={'numeric'}
                        maxLength={10}
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