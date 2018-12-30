import { StyleSheet } from "react-native";

export default StyleSheet.create({
        mainContainer:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        input: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 18,

        },
        button:{
            backgroundColor:"red"
        },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#cc504e",
        alignItems:"center",
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