import react from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Veterinaria(props) {
    return (
        <View style={styles.content}>

            <Text style={[styles.textStyle, {marginBottom:"10%"}]}>Seleccione el motivo de la ficha</Text>
            
            {/* Cambia a la pantalla de gestacion */}
            <Pressable style={[styles.input, styles.btnLogin]}
                onPress={() => props.setScreen("Gestacion")}> 
                <Text style={styles.txtBtnLogin}>Gestación</Text>
            </Pressable>

            {/* Cambia a la pantalla de enfermedad */}
            <Pressable style={[styles.input, styles.btnLogin]}
                onPress={() => props.setScreen("Enfermedad")}>
                <Text style={styles.txtBtnLogin}>Enfermedad</Text>
            </Pressable>

            {/* Cambia a la pantalla de vacuna */}
            <Pressable style={[styles.input, styles.btnLogin]}
                onPress={() => props.setScreen("Vacuna")}>
                <Text style={styles.txtBtnLogin}>Vacuna</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    content: {
        width: "100%",
        height: "80%",
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    
    textStyle: {
        fontFamily: "sans-serif-condensed",
        fontSize: 25
    },
    input: {

        borderRadius: "20%",
        width: "80%",
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        marginRight: 5,
        marginLeft: -5,
        marginBottom: 10,
        color: "#000",
        paddingHorizontal: 20,

    },
    buttonContainer: {
        justifyContent: "center",

        width: "80%",
        paddingLeft: "18%",
        paddingRight: "18%",
    },

    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    txtBtnLogin: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    }
})