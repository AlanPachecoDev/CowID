import React from 'react';
import {View, Text} from 'react-native';
// To generate te QR Code
import QRCode from 'react-native-qrcode-svg';

export default function GenerateQrScreen(){
    return(
        <View>
            <Image>
                <QRCode 
                value={"string"}
                codeStyle="circle"/>
            </Image>
            <Text>Hi</Text>
        </View>
    );
}






{/* Estilos: square, circle, dot, diamond, sharp (También prop innerEyeStyle)
                logo = {require('./example.png')}

                codeStyle="square" outerEyeStyle="square" size="80,80" color="#000"
            */}