import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    messageContainer: {
        flex: 1,
        borderBottomColor: "rgba(92,94,94,0.5)",
        borderBottomWidth: 0.5,
        padding: 20,
        textAlign: "justify",
        alignItems: "flex-end",
    },

    senderMessageContainer: {
        flex: 1,
        alignItems: "center",
        marginRight: 60,
        flexDirection: "row-reverse",
    },
    receiverMessageContainer: {
        flex: 1,
        alignItems: "center",
        marginLeft: 60,
        flexDirection: "row",
    },
    senderTextContainer: {
        marginLeft: 60,
        fontSize: 20,
        paddingRight: 10,
        fontFamily:"roboto.regular",
    },
    receiverTextContainer: {
        marginRight: 60,
        fontSize: 20,
        fontFamily:"roboto.regular",
        paddingLeft: 10
    },
    selfMessageContainer:{
        alignItems: "center",
        flexDirection: "row",
    },
    selfTextContainer:{
        fontSize: 25,
        fontFamily:"roboto.regular",
    },
    iconContainer: {
        borderRadius: 30,
        width: 50,
        height: 50
    },
    message: {
        fontSize: 18,
    },

    sender: {
        fontWeight: 'bold',
        paddingRight: 10,
    },
    rowText: {
        flex: 1,
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18,
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
    },
    send: {
        alignSelf: 'center',
        color: '#cc504e',
        fontFamily:"roboto.bold",
        fontSize: 23,
        fontWeight: 'bold',
        padding: 20,
    },
})