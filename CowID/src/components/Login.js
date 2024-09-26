//import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Image,
} from "react-native";

{
  /*-----------------Importación de colores-----------------*/
}
import colors from "../utils/colors";

{
  /*-----------------Importación de componentes-----------------*/
}
import FormLogin from "./FormLogin";
import LoginScreen from './LoginScreen';

export default function Login(props) {

  /*Constante para cambiar entre los formularios registar y login */
  const[loginForm, setLoginForm] = useState(false);

  const changeForm =()=> {
    setLoginForm(!loginForm);
  }

  return (
    <>
      {/* Barra de notificaciones del telefono (Parte Superior) */}
      <StatusBar barStyle="light-content" />
      <View style={styles.ViewContainer}>
        <View style={styles.safeArea}>
          {/*Cabecera */}
          <Image
            style={styles.img}
            source={require("../utils/images/LogoCowID.png")}
          />

          {loginForm ? <FormLogin setLoggedIn = {props.setLogged} changeForm={changeForm}/> :  <LoginScreen setLoggedIn = {props.setLogged}  changeForm={changeForm}/> }
          {/* <FormLogin setLoggedIn = {props.setLogged} />
          <LoginScreen setLoggedIn = {props.setLogged}/> */}
        </View>

        <View>{/* <Text>Resultado</Text> */}</View>

        <View>{/* <Text>Footer</Text> */}</View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ViewContainer:{
    height:"100%",
    //backgroundColor:"#FAEEDC"
  },
  safeArea: {
    backgroundColor: colors.TERTIARY_COLOR,
    height: "50%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  img: {
    width:"80%",
    /*Para que la imagen se ajuste y no se corte*/
    flex:1,
    resizeMode:'contain',
    /*--------------*/
    bottom: "15%",
  },
});
