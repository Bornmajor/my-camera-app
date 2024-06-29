import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import Home from '../screens/Home';
import Photos from '../screens/Photos';
import MyContext from '../context/context';

const MainNavigation = () => {
    const Stack = createStackNavigator();
    const {appTheme} = useContext(MyContext);

  return (
    <NavigationContainer>
       <Stack.Navigator
        initialRouteName='home'
       >
        <Stack.Screen 
        name='home'
        component={Home}
        options={{ headerShown: false }} // Hides the header for Details screen
       
        />
          <Stack.Screen 
        name='photos'
        component={Photos}
       
        options={{
            title:'Photos', 
            headerStyle:{backgroundColor:appTheme},
            headerTintColor:'white'

        }}
        />
       </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default MainNavigation