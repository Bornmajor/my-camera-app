// MyContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';
import { Share,Alert,ToastAndroid } from 'react-native';

const MyContext = createContext();

export const MyContextProvider = (props) => {
  const [appTheme, setAppTheme] = useState('#1B1C1E');
  const [textTheme,setTextTheme] = useState("black");


   
    const infoAlert = (msg) =>
      Alert.alert('Media info', msg, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},   
      ],
      {
        cancelable: true,
      },);

      const showFeedback = (msg) =>{
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }



        // Function to show a confirmation dialog
  const confirmDelete = (assetId) => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Delete Confirmation',
        'Are you sure you want to delete this item?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed');
              resolve(false); // Resolve the promise with false if Cancel is pressed
            },
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              
              handleDelete(assetId);
           
              resolve(true); // Resolve the promise with true if Delete is pressed
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    });
  };


  return (
    <MyContext.Provider
      value={{
        appTheme,
        setAppTheme,
        textTheme,
        setTextTheme,
        infoAlert,
        showFeedback,

      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyContext;
