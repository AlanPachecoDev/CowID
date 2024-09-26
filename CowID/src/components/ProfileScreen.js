/*Pantalla de navegacion del perfil: contiene las pantallas informacion de perfil y editar perfil*/
/**Para importar navigation ejecutar yarn add @react-navigation/native-stack */
/*Se importa useNavigation para implementar el boton de editar perfil*/
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from "react-native";
import ProfileInfo from "./ProfileInfo";
import ProfileEdit from "./ProfileEdit";


//Pagina que contiene las pantallas del apartado de perfil
const ProfileStack = createNativeStackNavigator();

const ProfileScreen = () => {
    return (
        <NavigationContainer independent={true}>        
            <ProfileStack.Navigator 
            initialRouteName="ProfileInfo"
            screenOptions={{title:"Mi perfil"}}>
            <ProfileStack.Screen  name="ProfileInfo" component={ProfileInfo} />
            <ProfileStack.Screen  name="ProfileEdit" component={ProfileEdit} options={{title:
            "Editar mi perfil"}}/>
        </ProfileStack.Navigator>
        </NavigationContainer>

    );
};

export default ProfileScreen;