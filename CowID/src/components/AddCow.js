import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Image,
  Text,
  View,
  TextInput,
  Pressable,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";

//Para guardar imagen

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/colors";
import QRCode from "react-native-qrcode-svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { captureRef } from "react-native-view-shot";

import * as MediaLibrary from "expo-media-library";

/* Metodos de la api*/
import { saveVaca } from "../apiRoutes/apiVaca";

//Funciones utilitarias independientes
const formatDate = (fech) => {
  var options = { year: "numeric", month: "2-digit", day: "2-digit" };
  let str = fech.toLocaleDateString("en-US", options);
  return fech.getFullYear() + "/" + str.substring(0, 5);
};

// get permission on android when you will save a QR of a cow
const getPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Permiso para descargar imágen.",
        message:
          "Es necesario su permiso para guardar imágenes en el dispositivo.",
        buttonNeutral: "Preguntar luego",
        buttonNegative: "Cancelar",
        buttonPositive: "OK",
      }
    );
    console.log("Granted: ", PermissionsAndroid.RESULTS.GRANTED);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        "Error",
        "Sin su permiso no se puede guardar las imágenes en el dispositivo."
      );
      return false;
    }
  } catch (err) {
    console.log("error: ", err);
  }
};

//Componente
export default function AddCow({ navigation, route }) {
  //Hooks de estado

  //Este ref apunta al qr que se va a descargar como imagen
  const qrComponentRef = useRef();
  const [isProductionEnabled, setIsProductionEnabled] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisibility] = useState(false);
  const [isCowSaved, setIsCowSaved] = useState(false);
  const [idCow, setIdCow] = useState();
  const [cowBirthDate, setCowBirthDate] = useState();
  const [cowData, setCowData] = useState({
    peso: 51.0,
    fechaNacimiento: `${formatDate(new Date())}`,
    numeroPartos: 3,
    qr: "",
    parcelaUbicacion: "",
    edadDestete: 7,
    aptaParaProduccion: 0,
    produccionesDiarias: [],
  });

  //Funciones utilitarias
  const showDatePicker = () => {
    setIsDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    hideDatePicker();
    propertyOfCowChange("fechaNacimiento", formatDate(date));
    setCowBirthDate(formatDate(date));
  };

  const propertyOfCowChange = (type, value) => {
    setCowData({
      ...cowData,
      [type]: value,
    });
  };

  const saveCow = async (vaca) => {
    //Guarda la vaca
    const res = await saveVaca(vaca);

    //res devuelve información de la vaca guardada en firebase
    //En qr recuperamos únicamente el qr que se generó
    console.log("res: ", res);
    let qr = res.vacaID;

    //Setea el contenido del QR que se generará
    setIdCow(qr);
    //Permite mostrar las etiquetas del QR en pantalla
    setIsCowSaved(true);
  };

  const productionEnabledToggleSwitch = () => {
    setIsProductionEnabled((previousState) => !previousState);
    !isProductionEnabled
      ? propertyOfCowChange("aptaParaProduccion", false)
      : propertyOfCowChange("aptaParaProduccion", true);
  };

  // download image
  const downloadImage = async () => {
    try {
      //Consultar si ya tenemos los permisos de guardado de imagenes
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      //Si ya teníamos permisos devuelve true
      if (!hasPermission) {
        console.log("No tiene permisos");
        //Si no tenemos, pedimos permisos de guardado
        if (Platform.OS === "android") {
          const granted = await getPermissionAndroid();

          if (!granted) {
            Alert.alert(
              "La imágen no se guardó correctamente.",
              [{ text: "OK", onPress: () => {} }],
              { cancelable: false }
            );
            return;
          }
        }
      }

      //Recuperamos el componente que tiene el QR en formato png
      const uri = await captureRef(qrComponentRef, {
        format: "png",
        quality: 1,
      });

      // MediaLibrary convierte el componente guardado en uri a una imagen
      const image = MediaLibrary.saveToLibraryAsync(uri);

      //Si se guardó sin problemas
      if (image) {
        Alert.alert(
          "",
          "Imagen guardada correctamente.",
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "",
          "Ocurrió un error y la imagen no se guardó correctamente.",
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setCowBirthDate(cowData.fechaNacimiento);
  }, []);

  return (
    <View style={{ backgroundColor: "#ffff"}}>
        {!isCowSaved ? (
          <View style={styles.formContainer}>
            {/* Fecha de nacimiento*/}
            <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
            <View
              style={[styles.inputHorizontalContainer, { marginTop: "1%" }]}
            >
              <TextInput
                placeholder="Seleccione una fecha"
                editable={true}
                keyboardType="number-pad"
                value={cowBirthDate}
                style={styles.inputDate}
              />

              <Pressable
                style={styles.buttonSalir}
                backgroundColor={colors.QUINARY_COLOR}
                onPress={showDatePicker}
              >
                <Icon
                  name="calendar"
                  color={colors.SECONDARY_COLOR}
                  size={25}
                />
              </Pressable>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                date={new Date()}
                onCancel={hideDatePicker}
              />
            </View>
            {/* Peso */}
            <Text style={styles.inputLabel}>Peso</Text>
            <TextInput
              placeholder="Peso"
              keyboardType="number-pad"
              style={styles.inputText}
              onChangeText={(val) => propertyOfCowChange("peso", val)}
            />
            {/* Partos */}
            <Text style={styles.inputLabel}>Cantidad de partos</Text>
            <TextInput
              placeholder="Cantidad de partos"
              keyboardType="decimal-pad"
              style={styles.inputText}
              onChangeText={(val) => propertyOfCowChange("numeroPartos", val)}
            />
            {/* Ubicación */}
            <Text style={styles.inputLabel}>Ubicación</Text>
            <TextInput
              placeholder="Parcelas"
              keyboardType="ascii-capable"
              style={styles.inputText}
              onChangeText={(val) =>
                propertyOfCowChange("parcelaUbicacion", val)
              }
            />
            {/* Edad de destete */}
            <Text style={styles.inputLabel}>Edad de destete</Text>
            <TextInput
              placeholder="Edad destete"
              keyboardType="number-pad"
              style={styles.inputText}
              onChangeText={(val) => propertyOfCowChange("edadDestete", val)}
            />
            {/* Produccion */}
            <View style={styles.inputHorizontalContainer}>
              <Text style={{ paddingRight: 20, fontSize: 20 }}>
                ¿Está produciendo?
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#c7934e" }}
                thumbColor={isProductionEnabled ? "#271d14" : "#271d14"}
                onValueChange={productionEnabledToggleSwitch}
                value={isProductionEnabled}
              ></Switch>
            </View>
            {/* Boton para agregar la vaca */}
            <Pressable
              style={styles.buttonContainer}
              backgroundColor={colors.PRIMARY_COLOR}
              onPress={() => {
                saveCow(cowData);
              }}
            >
              <Icon
                name="plus-box"
                style={{ paddingRight: 10 }}
                color={colors.SECONDARY_COLOR}
                size={25}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: colors.SECONDARY_COLOR,
                  fontWeight: "bold",
                }}
              >
                Agregar
              </Text>
            </Pressable>
          </View>
        ) : 
        (
          <View style={styles.formContainer}>
            <View style={styles.contenedorMayor}>
            
              <View style={styles.qrContenedor}>
                <Text style={styles.textQr}>Descarga tu código QR!</Text>
                <View style={styles.qrStyle}>
                  <View
                    collapsable={false}
                    style={{ backgroundColor: "white" }}
                    ref={qrComponentRef}
                  >
                    <QRCode size={Dimensions.get('window').width*0.5} style={styles.qr} value={idCow} codeStyle="square" />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={downloadImage}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.SECONDARY_COLOR,
                    fontWeight: "bold",
                  }}
                >
                  Descargar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </View>
  );
}

/**Los colores son : cafe oscuro: #271d14 para el fondo y blanco para los cuadros de texto */
/**pendiente mejorar el manejo de height y width */
const styles = StyleSheet.create({
  contenedorMayor: {
    alignSelf:"center",
    flex:0,
    width:"90%",
    backgroundColor: "#FFF5ED",
  },
  qrContenedor: {
    height: "70%",
    alignItems: "center",
    justifyContent:"center",
  },
  qrStyle: {
    backgroundColor: "yellow",
  },
  qr: {
    width: 200,
    height: 200,
    padding: 0,
    backgroundColor: "#fff",
  },
  textQr: {
    fontWeight: "bold",
    marginBottom: "10%",
  },
  formContainer: {
    height:"100%",
    paddingHorizontal: 25,
    paddingBottom: 25,
    alignContent: "center",
    justifyContent:"center"
  },
  inputLabel: {
    marginTop: "5%",
    fontSize: 17,
  },

  inputText: {
    fontSize: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: "3%",
    marginBottom: "0%",
    borderWidth: 1,
    borderColor: colors.QUINARY_COLOR,
  },
  inputDate: {
    fontSize: 20,
    paddingVertical: 7,
    paddingLeft: 15,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: "3%",
    marginBottom: "0%",
    borderWidth: 1,
    borderColor: colors.QUINARY_COLOR,
  },
  inputHorizontalContainer: {
    marginTop: "5%",
    flexDirection: "row",
    fontSize: 20,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: "10%",
    marginBottom: "10%",
    paddingHorizontal: "10%",
    paddingVertical: "3%",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 15,
  },
  buttonSalir: {
    flexDirection: "row",
    marginTop: "3%",
    marginStart: "-5%",
    paddingHorizontal: "3%",
    paddingVertical: "2.6%",
    backgroundColor: colors.QUINARY_COLOR,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
