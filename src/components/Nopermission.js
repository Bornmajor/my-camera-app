import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';

const Nopermission = () => {
    const [permission, requestPermission] = useCameraPermissions();


  return (
    <View style={styles.container}>
    <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
    <Button onPress={requestPermission} title="grant permission" />
  </View>
  )
}

export default Nopermission

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
