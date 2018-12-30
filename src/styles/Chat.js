import { StyleSheet } from "react-native";

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