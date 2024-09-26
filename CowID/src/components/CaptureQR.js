import React, {Fragment, useRef} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {captureRef} from 'react-native-view-shot';

import CameraRoll from "@react-native-community/cameraroll";

function useCapture() {
  const captureViewRef = useRef();

  function onCapture() {
    captureRef(captureViewRef, {
      format: 'jpg',
      quality: 0.9,
    }).then(
      uri => CameraRoll.saveToCameraRoll(uri),
      error => alert('Oops, snapshot failed', error),
    );
  }

  return {
    captureViewRef,
    onCapture,
  };
}

function CaptureQR(){
  const {captureViewRef, onCapture} = useCapture();

  return (
    <Fragment>
      <View style={styles.capture} ref={captureViewRef}>
        <Text style={styles.content}>Capture</Text>
      </View>
      <Button onPress={onCapture} title="Save" />
    </Fragment>
  );
};
// aqui el Stylesheet
const styles = StyleSheet.create({
  capture: {
    flex: 1,
    backgroundColor: '#313131',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    color: 'white',
    fontSize: 40,
  },
});



export default CaptureQR;