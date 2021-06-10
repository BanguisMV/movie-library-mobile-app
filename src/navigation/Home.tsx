import React from 'react'
import Movie from '../screens/Movie';
import Person from '../screens/Person';
import Movies from '../screens/Movies';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Categories } from '../../assets/constants';
import { COLORS } from '../../assets/colors';

const Drawer = createDrawerNavigator();
const Home = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // const pam = navigation.setParams(route.params.id)
    return (
      <Drawer.Navigator initialRouteName="Home">
          {Categories.map(category => (
            <Drawer.Screen 
              name={category.name} 
              key={category.id}
              initialParams={{id: category.id}}
              component={Movies} 
              options={{ 
                headerTitle:category.name, 
                headerShown:true, 
                headerTitleAlign:'center',
                headerTintColor:COLORS.primary,
              }} />
          ))}
        </Drawer.Navigator> 
    )
}

export default Home
