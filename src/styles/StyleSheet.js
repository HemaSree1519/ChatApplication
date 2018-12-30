import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        textAlign: 'center',
        padding: 3,
        height: 40,
        width: 70,
        marginLeft: 20,
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'green',
        // textColor: 'green'
    },
    nameInput: {
        fontSize: 25,
        padding: 5,
        height: 60,
        borderWidth: 2,
        borderColor: 'black',
        margin: 20,
    }
    // instructions: {
    //   textAlign: 'center',
    //   color: '#333333',
    //   marginBottom: 5,
    // },
});
