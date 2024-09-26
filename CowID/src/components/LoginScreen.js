import React, { Component, useState } from 'react';
import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import {firebase} from '../utils/firebase';

{/*----------Importamos los colores----------*/ }
import Colors from '../utils/colors.js';

{/*---------Exportamos el componente---------*/ }

export default function (props) {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [nombre,setNombre] = useState('')
    const auth = getAuth(firebase);

    function logInUser(){
        signInWithEmailAndPassword(auth,email,password)
        .then(response =>{
            const user = response.user;
            console.log(user.email);
            props.setLoggedIn(response);
        })
        .catch(error=>alert(error.message))
    }

    return (
        <View style = {styles.viewForm}>
            <Text style={[styles.slogan, styles.titulo]}>COWID</Text>
            {/* <Text style={styles.slogan}>el lugar perfecto para dejar tu leche</Text> */}

            <View style={styles.viewInputs}>
                
                {/* E-mail */}
                <TextInput placeholder="Correo Electrónico" onChangeText={text => setEmail(text)}
                 keyboardType="email-address" style={styles.input}/>

                {/* Password */}
                <TextInput placeholder="Contraseña" secureTextEntry onChangeText={text => setPassword(text)}
                style={styles.input}/>

                <Pressable style={[styles.input, styles.btnLogin]} onPress={logInUser}
                /*onPress={() => props.setLoggedIn(true)}*/>
                    <Text style={styles.txtBtnLogin}>Login</Text>
                </Pressable>

                <View style={styles.viewRegistrarse}>
                    <Text style={styles.txtRegistrarse}>No tienes cuenta? </Text>

                {/* Esta funcion cambia el estado de la constante loginForm en Login.js para cambiar el formulario     */}
                    <Pressable style={[]} onPress={() => props.changeForm()}>
                        <Text style={[styles.txtRegistrarse, styles.iniciarPress]}>Regístrate</Text>
                    </Pressable>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewForm:{
        position:"absolute",
        bottom: -320,
        width: "85%",
        paddingHorizontal: 50,
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 30,
        height: 450,
        justifyContent: "center",
        alignItems:"center",
    },
    
    slogan:{
        textAlign:"center",
        bottom: "20%",
        fontFamily: "sans-serif-condensed",
        fontSize:20,
        color: "#fff",
        fontWeight: "bold",
        width: "133%",
    },

    titulo:{
          marginBottom:"3%", 
          marginTop:"40%",     
          fontSize:50,
    },

    viewInputs: {
        alignItems: "center",
        width:"100%",
        bottom:"10%",
        right: "-2%"
    },

    input: {
        borderRadius:"20%",
        width:"120%",
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
    btnLogin:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    txtBtnLogin:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    },
    txtRegistrarse:{
        fontSize: 16,
        color:"#000"
    },
    viewRegistrarse:{
        fontSize: 16,
        flexDirection: "row",

    },
    iniciarPress:{
        fontWeight: "bold",
    }
});