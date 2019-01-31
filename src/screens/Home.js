import React, {Component} from 'react';
import {AsyncStorage, FlatList, Text, TouchableOpacity, View,PermissionsAndroid,Platform} from 'react-native';
import styles from '../styles/Home';
import contacts from 'react-native-contacts';
import firebase from '../../firebase/Firebase';
import Firebase from 'react-native-firebase';

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


    async checkPermission() {
        const enabled = await Firebase.messaging().hasPermission();
        if (enabled) {
            await this.getToken();
        } else {
            await this.requestPermission();
        }
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
                    for (let iterator = 0; iterator < local_contacts.length; iterator++) {
                        if (local_contacts[iterator].phoneNumbers.length !== 0) {
                            let USER_PH_NUM = local_contacts[iterator].phoneNumbers[0].number.replace(/\D/g, '');
                            let trim;
                            if(USER_PH_NUM.length===12){
                              trim = USER_PH_NUM.substring(2);
                              USER_PH_NUM=trim;
                           }
                            const USER_NAME = local_contacts[iterator].givenName;
                            if (USER_PH_NUM && USER_PH_NUM !== this.state.phoneNo && reg_users.hasChild(USER_PH_NUM)) {
                                let cnt = {
                                    key: USER_PH_NUM,
                                    name: USER_NAME
                                }
                                cnts.push(cnt);
                            }
                        }
                    }
                    let self_cnt = {
                        key : this.state.phoneNo,
                        name: "YOU"
                    }
                    console.log("Self contact");
                    console.log(self_cnt)
                    cnts.push(self_cnt);
                    this.setState({contacts: cnts});
                });
            }
        })

        await this.checkPermission();
        await this.createNotificationListeners();
    }
    componentWillUnmount() {
        this.notificationListener;
        this.notificationOpenedListener;
    }

    static navigationOptions = ({navigation}) => {
        return (
            {
                headerTitle: 'Sollu',
                headerBackTitle: "Back",
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#cc504d',
                    fontFamily:"roboto.bold"
                }

            }
        );
    };







    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = Firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            console.log('onNotification:');
            // this.showAlert(title, body);
            // alert('message');

            const localNotification = new Firebase.notifications.Notification({
                show_in_foreground: true,
            })
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                // .setSubtitle(notification.subtitle)
                .setBody(notification.body)
                // .setData(notification.data)
                .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
                .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
                .android.setColor('#000000') // you can set a color here
                .android.setPriority(Firebase.notifications.Android.Priority.High);


            Firebase.notifications()
                .displayNotification(localNotification)
                .catch(err => console.error(err));
        });


        const channel = new Firebase.notifications.Android.Channel('fcm_default_channel', 'Demo app name', Firebase.notifications.Android.Importance.High)
            .setDescription('Demo app description')
            .setSound('sampleaudio.mp3');
        Firebase.notifications().android.createChannel(channel);

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = Firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            console.log('onNotificationOpened:');
            // this.showAlert(title, body);
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await Firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            console.log('getInitialNotification:');
            // this.showAlert(title, body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = Firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });
    }












    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await Firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                console.log('fcmToken:', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        console.log('fcmToken:', fcmToken);
    }

    async requestPermission() {
        try {
            await Firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }



    renderName(contact) {
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
