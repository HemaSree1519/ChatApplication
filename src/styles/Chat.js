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
        marginRight: 60,
        padding: 20,
        textAlign: "justify",
        alignItems: "flex-end",
    },

    senderMessageContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row-reverse",
    },
    receiverMessageContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    },
    senderTextContainer: {
        marginLeft: 60,
        fontSize: 20,
        paddingRight: 10,
        fontFamily:"roboto.regular"
    },
    receiverTextContainer: {
        marginRight: 60,
        fontSize: 20,
        paddingLeft: 10,
        fontFamily:"roboto.regular"
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
        backgroundColor: '#eee',
    },
    send: {
        alignSelf: 'center',
        color: 'lightseagreen',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
})