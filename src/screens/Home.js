import React from 'react'
import { CameraView, useCameraPermissions,Camera } from 'expo-camera';
import { useContext, useState,useRef,useEffect } from 'react';
import {Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Nopermission from '../components/Nopermission';
import { Entypo,Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import MyContext from '../context/context';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';



const Home = () => {
    
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [openTorch,setOpenTorch] = useState(false);
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const {showFeedback} = useContext(MyContext);
    const navigation = useNavigation();
    const [isRecording, setIsRecording] = useState(false);
    const [cameraMode,setCameraMode] = useState(true);
    const [permissionAudioResponse, requestAudioPermission] = Audio.usePermissions();
    const [flashMode,setFlashMode] = useState("off");
    
  
    // if (hasPermission === null) {
    //     return <View ><Text>hello</Text></View>;
    //   }
      if (hasPermission === false) {
        return (<Nopermission />);
      }
    
      function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
      }
    
      const toggleTorch = () =>{
        setOpenTorch(!openTorch);
        console.log(openTorch);
      }
    
    
      const takePicture = async () => {
        showFeedback('Saving photo');
        if (cameraRef.current) {
          try {
            const options = { quality: 1, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri); // Image URI
         
            saveAsset(data.uri);
          } catch (error) {
            console.error('Error taking picture:', error);
          }
        }
      };
    
      const saveAsset = async (uri) => {
        try {
          const asset = await MediaLibrary.createAssetAsync(uri);
          const album = await MediaLibrary.getAlbumAsync('Camera');
          if (album == null) {
            await MediaLibrary.createAlbumAsync('Camera', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
          showFeedback('Media saved to camera folder!')
        } catch (error) {
          console.error(error);
          //alert('Error saving picture: ' + error.message);
          showFeedback('Some thing went wrong'+error.message);
        }
      };

    //   const saveVideo = async (uri) => {
    //     try {
    //       const asset = await MediaLibrary.createAssetAsync(uri);
    //       const album = await MediaLibrary.getAlbumAsync('Camera');
    //       if (album == null) {
    //         await MediaLibrary.createAlbumAsync('Camera', asset, false);
    //       } else {
    //         await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    //       }
    //       alert('Video saved to camera folder!');
    //     } catch (error) {
    //       console.error(error);
    //       alert('Error saving video: ' + error.message);
    //     }
    //   };

    const recordVideo = async () => {
        if (cameraRef.current && !isRecording) {
          setIsRecording(true);
          console.log('Recording started'); // Debugging
          try {
            const video = await cameraRef.current.recordAsync();
            console.log('Video URI:', video.uri); // Debugging
            saveAsset(video.uri);
          } catch (error) {
            console.error('Error recording video:', error);
            showFeedback('Error recording video: ' + error.message);
          } finally {
            setIsRecording(false);
            console.log('Recording stopped'); // Debugging
          }
        }
      };

      const stopRecording = async () => {
        if (cameraRef.current && isRecording) {
          cameraRef.current.stopRecording();
          setIsRecording(false);
        }
      };
    
      useEffect(() => {
        (async () => {
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          const mediaStatus = await MediaLibrary.requestPermissionsAsync();
          const audioStatus = await Audio.requestPermissionsAsync();
          setHasPermission(
            cameraStatus.status === 'granted' &&
            mediaStatus.status === 'granted' &&
            audioStatus.status === 'granted'
          );
        })();
      }, []);

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
          setIsVisible(prev => !prev);
        }, 1000); // Change this value to the number of milliseconds you want
    
        return () => clearInterval(interval);
      }, []);
    
  
     const toggleCameraMode = () =>{
        setCameraMode(!cameraMode);
     }

  return (
    <View style={styles.container}>
    <CameraView style={styles.camera} facing={facing}
    enableTorch={toggleTorch}
    ref={cameraRef}
    flash={flashMode}
    >

    <View style={[styles.buttonContainer,{marginTop:30}]}>

      <Pressable style={styles.topButton}  onPress={() => toggleTorch()}>
        {openTorch ?  <Ionicons name="flash" size={24} color="white" />:<Ionicons name="flash-off" size={24} color="white" /> }      
      </Pressable>



      <Pressable style={styles.topButton} onPress={toggleCameraFacing}>
      <Ionicons name="settings" size={24} color="white" />
      </Pressable>

      
     

        {cameraMode ? 
        <Pressable style={styles.topButton}  onPress={() =>  toggleCameraMode()}>
        <Entypo name="video-camera" size={25} color="white" />
      </Pressable> 
        :
      
           <Pressable style={styles.topButton} onPress={() => toggleCameraMode()}  >
            <Entypo name="camera" size={25} color="white" />
          </Pressable> 
        }
         




      </View>

      {isRecording && (
        <>
         <View style={styles.actionContainer}>
        {isVisible && (<Entypo name="controller-record" size={18} color="red" />)}         
          
      </View>

      <View style={{position:'absolute',bottom:'18%',left:'46%'}}>
      <Text>Recording</Text>
      </View> 
        </>
      
      )}
      
     
      <View style={styles.buttonContainer}>

          <Pressable style={styles.button}  onPress={() => navigation.navigate('photos')}>
            <Entypo name="folder-images" size={20} color="white" />
          </Pressable>

         {cameraMode ? 
         <Pressable style={styles.button} onPress={takePicture} >
            <Entypo name="camera" size={35} color="white" />
          </Pressable> 
        :
        <Pressable style={styles.button} onPress={isRecording ? stopRecording :  recordVideo } >
        <Entypo name="controller-record" size={35} color={isRecording ? 'green' : 'red'} />
      </Pressable> 
        
        }
         


          <Pressable style={styles.button} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={24} color="white" />
          </Pressable>



      </View>

    </CameraView>
  </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      position:'relative'
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      marginBottom: 60,
      justifyContent:'space-between',
      
    },
    actionContainer:{
    position:'absolute',
    bottom:'18%',
    left:'40%',
    flexDirection:'row',
    
    

    },
    topButtonContainer:{
    flex:1,
    
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      margin:10,
      padding:2,
      borderRadius:18,
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // semi-transparent black
  
    },
    topButton:{
      flex: 1,
      alignSelf: 'flex-start',
      alignItems: 'center',
      margin:10,
      padding:2,
      borderRadius:10,
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // semi-transparent black
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });