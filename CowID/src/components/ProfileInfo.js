import React, { useEffect,useState } from "react"

/**Se importa material icons para el boton de editar perfil */

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView, StyleSheet, Text, View, Image ,Pressable} from "react-native";
import colors from "../utils/colors";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import { collection, doc, getDocs,addDoc  } from "firebase/firestore";
import {firebase} from '../utils/firebase';
/****Firebase*/
//function firebaseTest(){
    //const db = getFirestore(firebase);

    async function firebaseTest(){

        const db = Store;
        const querySnapshot = await getDocs(collection(db, "Vacas"));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        });

    }


//     db.collection("Vacas").get().then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//           console.log(`${doc.id} => ${doc.data()}`);
//       });
//   });
  
    // var docRef = db.collection("Vacas").doc("YxsxjfdtSQ46YchXHOqN");
  
    // docRef.get().then((doc) => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });
  //}


/*Constantes de prueba para borrar*/
const DATA = {
    user1: {
        name: "Nombre",
        lastname: "Apellido",
        mail: "example@mail.com",
        phone: "0987654321"
    },
    user2: {
        name: "David",
        mail: "example2@mail.com"
    }
}


export default function ProfileInfo({ navigation }) {

    const [profilePic,setProfilePic] = useState(require('../../assets/users/agumon.jpg'));
    const auth = getAuth(firebase);
    const currentUser = auth.currentUser;

    useEffect(()=>{
        firebaseTest()
        //firebaseTest()
        /*if(currentUser?.photoURL){
            console.log(currentUser.photoURL);
            setProfilePic(currentUser.photoURL);
        }*/
    })

    function cerrarSesion(){
        auth.signOut().catch(error=>alert(error.message));
    }

    async function firebaseTest(){
        const db = getFirestore(firebase);
        const querySnapshot = await getDocs(collection(db, "Vacas"));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        });

    }    

    return (

        <SafeAreaView style={{backgroundColor: "#ffffff", alignItems: "center" }}>
            <Image style = {styles.userImg} source={require('../../assets/users/agumon.jpg')}/>
            <View style={styles.infoContainer}>
                {/**Nombre */}
                <View style={styles.row}>
                    <Icon name="account"
                        size={35} />
                    <Text style={styles.textInfo}>Nombre: {DATA.user1.name} {DATA.user1.lastname}</Text>
                </View>
                {/**email */}
                <View style={styles.row}>
                    <Icon name="email"
                        size={35} />
                    <Text style={styles.textInfo}>Correo: {auth.currentUser?.email}</Text>
                </View>
                {/**Numero de telefono*/}
                <View style={styles.row}>
                    <Icon name="phone"
                        size={35} />
                    <Text style={styles.textInfo}>Teléfono: {DATA.user1.phone}</Text>
                </View>
                <Pressable style={styles.buttonContainer} onPress={()=>{navigation.navigate('ProfileEdit')}}> 
                    <Icon name="account-edit" color={colors.SECONDARY_COLOR} size={25}/>
                    <Text style={styles.textButton}>Editar Perfil</Text>
                </Pressable>
                <Pressable style={styles.buttonSalir} backgroundColor={colors.QUINARY_COLOR} onPress={cerrarSesion}> 
                    <Text style={styles.textButton} >Salir</Text> 
                    <Icon name="logout" color={colors.SECONDARY_COLOR} size={25}/>
                </Pressable>

                
            </View>
            
        </SafeAreaView>

    )
}
/**Los colores son : cafe oscuro: #271d14 para el fondo y blanco para los cuadros de texto */
/**pendiente mejorar el manejo de height y width */
const styles = StyleSheet.create({

    
    infoContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: "10%"
    },


    headerContainer: {
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        maxWidth: "90%",
        height:"20%"
    },

    buttonContainer:{
        flexDirection: "row",
        margin:"5%",
        paddingHorizontal:"10%",
        paddingVertical:"3%",
        alignItems: "center",
        alignSelf:"center",
        backgroundColor:colors.PRIMARY_COLOR,
        borderRadius: 15
    },
    buttonSalir:{
        flexDirection: "row",
        margin:"5%",
        paddingHorizontal:"10%",
        paddingVertical:"3%",
        alignItems: "center",
        alignSelf:"center",
        backgroundColor:colors.QUATERNARY_COLOR,
        borderRadius: 15
    },
    row: {
        flexDirection: "row",
        padding: "4%",
    },

    textInfo: {
        fontSize: 20,
        display: "flex",
        marginLeft: 20
    },
    textButton: {
        fontSize: 20,
        display: "flex",
        paddingRight: 4,
        color:colors.SECONDARY_COLOR 
    },

    title: {
        fontSize: 30,
        margin: 20,
        color: "#ffffff"
    },
    
    userImg:{
        borderRadius: 125,
        height: 200,
        width: 200 , 
        marginTop : 20,
    }
});

