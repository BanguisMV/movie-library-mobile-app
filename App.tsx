import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'react-native-magnus';
import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Movie from './src/screens/Movie';
import Person from './src/screens/Person';
import Home from './src/navigation/Home';
import { COLORS } from './assets/colors';

const Stack = createStackNavigator();


export default function App() {


  return (
    <NavigationContainer>
      <ThemeProvider>
      <StatusBar style='auto' />
      <SafeAreaView style={styles.container}>

        <Stack.Navigator screenOptions={{ headerTintColor:COLORS.primary, headerTitleAlign:'center'}}
        initialRouteName="Home" >
            <Stack.Screen name="Home"  component={Home} options={{   headerShown:false }} />
            <Stack.Screen name="Movie" component={Movie} 
              options={{ 
                headerShown:true,
                headerTransparent:true,
                title:"",
              }} />
            <Stack.Screen name="Cast"  component={Person} options={{ headerShown:false }} />
        </Stack.Navigator>

      </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.white
  },
});