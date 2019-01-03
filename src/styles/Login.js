import {StyleSheet} from "react-native";

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageContainer: {
        textAlign: "justify",
        alignItems: "flex-start",
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 50,
        width: 300,
        borderRadius: 5,
        margin: 10,
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    TextContainer: {
        flex:1,
        fontSize: 20,
    },
    input: {
        borderColor: '#cc504e',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18,

    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: 125,
        height: 45
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,

    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#cc504e",
        alignItems: "center",
        paddingRight: 5
    },
    leftHeaderContainer: {
        alignItems: "flex-start",
        flexDirection: "row"
    },
    rightHeaderContainer: {
        alignItems: "flex-end",
        flexDirection: "row"
    },
    contentContainer: {
        flex: 6,
    },
    logoText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
        alignItems: "flex-start",
        marginLeft: 10
    },
})