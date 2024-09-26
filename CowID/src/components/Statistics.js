import react, {useEffect, useState } from "react";
import { ScrollView, SafeAreaView, StyleSheet, Text, View, Button, Dimensions } from "react-native";
import Colors from '../utils/colors.js';
import { getProducciones } from '../apiRoutes/apiProduccion';
/**Estos comandos permiten instalar las herramientas para el grafico de barras
 * yarn add react-native-chart-kit */
/**yarn add react-native-svg */

/**Se importan los componentes para el grafico */
import { BarChart } from "react-native-chart-kit";

/**Se importa material icons para el boton de editar perfil */
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



/**Constante para borrar contiene los datos del grafico de barras  */
const granja = {
    datos: {
        produccionLunes: 100,
        produccionMartes: 200,
        produccionMiercoles: 300,
        produccionJueves: 100,
        produccionViernes: 150,
        produccionSabado: 300,
        produccionDomingo: 100
    }

}

//scrollview
//cantidad de vacas enfermas
//cantidad en gestacion
//cantidad de vacas 
//pagina de anadir vaca
export default function Statistics(navigation) {

    const[datosProduccion,setDatosProduccion] = useState({
        Lunes: 0,
        Martes: 0,
        Miercoles: 0,
        Jueves: 0,
        Viernes: 0,
        Sabado: 0,
        Domingo: 0
    });

    const[totalDiario,seTotalDiario] = useState(0);
    const[vacasOrdenadas,setVacasOrdenadas] = useState(0);
    const cargarDatos = async () => {
        let produccion = await getProducciones();
        produccion = produccion[0];
        //console.log(cowL.Fecha);
        var hoy = new Date();
        hoy.setHours(0,0,0,0)
        //console.log("hoy: "+hoy.toISOString());
        setVacasOrdenadas(0);
        produccion.forEach(dato => {
            var date = new Date(dato.Fecha);
            date.setHours(0,0,0,0);
            //console.log("dato: "+date.toISOString());
            console.log(date.toISOString()===hoy.toISOString());
            if(date.toISOString()===hoy.toISOString()){
                seTotalDiario(totalDiario+dato.CantidadManana + dato.CantidadTarde);
                setVacasOrdenadas(vacasOrdenadas+1);
            }
        });
        console.log(totalDiario);
    }

    useEffect(() => {

        //loadCows();
        //cargarDatos()
        /*const refresh = navigation.addListener('focus', () => {
            cargarDatos();
        });
        return refresh;*/
    }, []);
    // const[cowList, setCowList] = useState();
    // const loadCows = async () => {
    //     //console.log(await getVacas());
    //     setCowList(await getVacas());
    //   }

      
    
    //   useEffect(() => {
    //     loadCows();
    //   }, []);

    //   console.log(cowList);


    return (
        <ScrollView style={styles.viewStyle}>
            <View style={styles.content}>
                {/* Encabezado con el titulo */}
                <View style={styles.header}>
                    <Text style={styles.title}>Mi granja</Text>

                    {/* Tarjetas para mostrar informacion importante */}
                    <View style={styles.infoCards}>
                        <View style={styles.card}><Text style={styles.textStyle}>Litros producidos este día: {totalDiario}</Text></View>
                        <View style={styles.card}><Text style={styles.textStyle}>Cantidad de vacas ordeñadas:{vacasOrdenadas}</Text></View>
                    </View>
                </View>
                {/* Contenedor del grafico de barras y las tarjetas con informacion importante */}
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={[styles.textStyle, { marginBottom: "5%" }]}>Producción de la semana</Text>
                        <View styles={styles.graphicContainer}>
                            <View>
                                {/*               Editar los datos del grafico de barras           */}
                                <BarChart
                                    data={{
                                        labels: ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"],
                                        datasets: [
                                            {
                                                data: [
                                                datosProduccion.Lunes,
                                                datosProduccion.Martes,
                                                datosProduccion.Miercoles,
                                                datosProduccion.Jueves,
                                                datosProduccion.Viernes]
                                            }
                                        ]
                                    }}
                                    width={330}
                                    height={300}
                                    //yAxisLabel="$"
                                    yAxisSuffix="L"
                                    yAxisInterval={1}
                                    chartConfig={{
                                        backgroundColor: "#ffffff",
                                        backgroundGradientFrom: "#fff",
                                        backgroundGradientTo: "#fff",
                                        decimalPlaces: 1,
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(0,0, 0, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },

                                    }}

                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    title: {
        color: "#fff",
        margin: "5%",
        fontSize: 25
    },

    content: {
        backgroundColor: Colors.QUATERNARY_COLOR,
        height: "100%",
        width: "100%",
        display: "flex"

    },


    textStyle: {
        fontFamily: "sans-serif-condensed",
        fontSize: 25
    },

    header: {
        height: "40%",
        alignItems: "flex-start"
    },

    buttonsContainer: {
        position: "absolute",
        bottom: 200,
        display: "flex",
        flexDirection: "row",
        margin: "5%"

    },

    infoContainer: {
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        paddingTop: "5%",
        paddingLeft: "3%",
        paddingRight: "3%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },

    infoCards: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        margin: "5%",
        justifyContent: "space-between"

    },

    card: {
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 10,
        width: "48%",
        color: "#fff",
        padding: "5%",
        height: "100%"
    },

    cardText: {

        fontSize: 20
    }
    ,
    viewStyle:{
        paddingTop:"10%"
    }

})