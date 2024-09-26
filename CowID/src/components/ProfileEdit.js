import React,{useState,useEffect} from "react"
import { SafeAreaView, StyleSheet, Text, View, TextInput, Image,Pressable } from "react-native";

/**Se importa material icons para el boton de editar perfil */
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
/**Imports para manejo de la imagen */
import * as ImagePicker from 'expo-image-picker'
import {upload} from '../utils/firestore'
import {firebase} from '../utils/firebase';
//import {getStorage,ref, uploadBytes} from 'firebase/storage';
import colors from "../utils/colors";

/*Firebase*/
import {getAuth} from 'firebase/auth';

{/* Pantalla para editar datos personales */ }
export default function ProfileEdit({ navigation }) {

    const auth = getAuth(firebase);
    const currentUser = auth.currentUser;
    //const storage = getStorage(firebase);
    //Permisos de acceso a la galeria
    const [hasGalleryPersmission,setHasGalleryPermission] = useState(null);
    const [profilePic,setProfilePic] = useState(require('../../assets/users/agumon.jpg'));
    const [newImage,setNewImage] = useState(false);

   /* async function upload(image,currentUser){
        const imgRef = ref(storage,currentUser.uid + '.png');
        //setLoading(true);
        const snapshot = await uploadBytes(imgRef,image);
        //setLoading(false);
        alert("Imagen subida correctamente");
    }*/

    useEffect(()=>{
        /*if(currentUser?.photoURL){
            console.log(profilePic);
            setProfilePic(currentUser.photoURL);
        }*/
    });

    useEffect(()=>{
        (async ()=>{
            //Se solicitan permisos de galeria
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    },[]);

    const pickImage = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        });

        if(!result.cancelled){
            console.log(result.uri);
            setProfilePic(result.uri);
            setNewImage(true);
        }
    }

    if(hasGalleryPersmission === false){
        return alert("Permiso denegado de aceso a multimedia");
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor:"#ffffff" }}>
                <View style={styles.imageContainer}>
                
                    <Image style = {styles.userImg} source={{profilePic}}/>
 
                    <View style={styles.button}>
                        <MaterialCommunityIcons.Button
                            name="camera-image"
                            backgroundColor={colors.QUATERNARY_COLOR}
                            color={colors.SECONDARY_COLOR}
                            size={25}
                            borderRadius={30}
                            onPress={() => pickImage()}
                        >
                        </MaterialCommunityIcons.Button>
                    </View>
                </View>
                
                <View style={styles.formContainer}>
                    {/* Username */}
                    <View style={styles.inputContainer}>
                        <Text>Nombre de usuario</Text>
                        <TextInput placeholder="Nombre De Usuario" keyboardType="ascii-capable" style={styles.inputText} />
                    </View>


                    {/* E-mail */}
                    <View style={styles.inputContainer}>
                        <Text>Correo Electrónico</Text>
                        <TextInput placeholder="Correo Electrónico" keyboardType="ascii-capable" style={styles.inputText} />
                    </View>

                    {/* Boton para guardar cambios */}
                    <View style={styles.buttonContainer}>
                        <MaterialCommunityIcons.Button
                            name="content-save"
                            backgroundColor={colors.PRIMARY_COLOR}
                            color={colors.QUATERNARY_COLOR}
                            size={30}
                            borderRadius={30}
                            margin={5}
                            onPress={() => { upload(profilePic,currentUser)}}
                        ><Text style={{ fontSize: 18 }}>Guardar cambios</Text>
                        </MaterialCommunityIcons.Button>

                    </View>

                </View>
            </SafeAreaView>
        </>
    )
}

/**Los colores son : cafe oscuro: #271d14 para el fondo y blanco para los cuadros de texto */
/**pendiente mejorar el manejo de height y width */
const styles = StyleSheet.create({

    formContainer: {
        display: "flex",
        alignContent: "space-between",
        height: "100%",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: "10%",
        backgroundColor: "#ffffff"
    },
    formHeader: {
        fontSize: 30,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 40,
        marginTop: 40

    },
    inputText: {
        fontSize: 20,
        marginTop: "5%",

    },
    userImg:{
        borderRadius: 125,
        height: 200,
        width: 200 , 
        marginTop : 20,
    },
    inputContainer: {
        marginTop: "7%",
        fontSize: 20,
    },
    buttonContainer:{
        flexDirection: "row",
        margin:"3%",
        paddingHorizontal:"10%",
        paddingVertical:"1%",
        alignItems: "center",
        alignSelf:"center",
        backgroundColor:colors.PRIMARY_COLOR,
        borderRadius: 25
    },

    imageContainer:{
        flexDirection: "row",
        alignSelf:"center",
    },
    button:{
        flexDirection: "row",
        paddingVertical:"1%",
        paddingLeft:'2.5%',
        alignSelf:"center",
        backgroundColor:colors.QUATERNARY_COLOR,
        borderRadius: 25
    }

});