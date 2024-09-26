import {View, Text, Button,StyleSheet,Pressable} from 'react-native';
import React ,{useState, useEffect}from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import colors from "../utils/colors";

export default function QRScan({navigation}) {

    const [hasPermission, setHasPermission] = useState(null) 
    const [scanned,setScanned]  = useState(false)
    const [cowID,setCowID] = useState('Not yet scanned')



    //Pedir permiso de la camara
    const askCameraPermission = () =>{
        (
            async() =>{
                //Pregunta por permiso
                const {status} = await BarCodeScanner.requestPermissionsAsync();
                //Define el estado
                setHasPermission(status =='granted')
            }
        )()
    }

    //Ejecuta el pedir permisos al inicio de el componente
    useEffect(() =>{
        askCameraPermission();
    }, []
    );

    const handleQrScanned = ({type, data}) =>{
        setScanned(true);
        setCowID(data);
        alert('Vaca encontrada',`Vaca #${data}`);
        navigation.navigate("CowInfo", data);
    };

    const resetQR = () =>{
        setScanned(false);
        alert('Escanear de nuevo','Ahora puedes volver a escanear un código');
    };
    
    

    if(hasPermission === null){
        return(
            <View style={styles.container}> 
                <Text>Request camera permission</Text>
            </View>
        )
    }

    if(hasPermission === false){
        return(
            <View style={styles.container}> 
                <Text>Request camera permission</Text>
                <Button title={'Dar permiso camara'} onPress={askCameraPermission()} />
            </View> 
        )
    } 

    return (

        <View style={styles.container}>

            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleQrScanned}
                    style={{height:400, width:400}}
                />
            </View>
            <Pressable
              style={styles.buttonContainer}
              backgroundColor={colors.PRIMARY_COLOR}
              onPress={() => resetQR()}
            >
                <Text style={{
                  fontSize: 18,
                  color: colors.SECONDARY_COLOR,
                  fontWeight: "bold",
                }}>Escanear de nuevo</Text>
            </Pressable>
        </View>
    );

 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonContainer: {
        flexDirection: "row",
        marginTop: "10%",
        paddingHorizontal: "10%",
        paddingVertical: "3%",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: 15
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        color: '#fff'
      },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
        marginBottom:30
    }
    
});