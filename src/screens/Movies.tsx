import React, { useEffect, useState } from 'react'
import { View,StyleSheet ,FlatList,Dimensions,Text, TouchableOpacity,ActivityIndicator } from 'react-native'
import { Div,Image, } from 'react-native-magnus';
import { COLORS } from '../../assets/colors';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation,useRoute } from '@react-navigation/native';

const Movies = (props:any) => {

const navigation = useNavigation();
const route:any = useRoute();


const [ loading, setLoading] = useState(true)
const [ movies, setMovies] = useState([])
const [ error, setError] = useState()
const [ page, setPage] = useState()

useEffect(() => {

    setLoading(true)
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=c24e2e0c38251c16e41291ca0067c75d&include_adult=true&with_genres=${route.params.id}&sort_by=popularity.desc&page=1`)
    .then(res => res.json())
    .then(data => {
        setMovies(data.results)
    })
    .catch(error => {
        setError(error)
        setLoading(false)
    })
    .finally(() => {
        setLoading(false)
    })
    setLoading(false)

    return () => {
        setMovies([])
    }
}, [route.params.id])

const movieCard = ({ item }:any) => {
    const windowWidth = Dimensions.get('window').width;
    const hasBackdrop = `https://image.tmdb.org/t/p/w342${item.backdrop_path}`
    const noBackdrop = `https://images.all-free-download.com/images/graphiclarge/error_404_page_not_found_6845510.jpg`
    let cover = item.backdrop_path !== null ? hasBackdrop : noBackdrop
   
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Movie', { movie:item.id })}>
            <Div alignSelf='center' w={windowWidth} p={18} overflow='hidden' >
          
                <Image  h={200}
                        style={styles.cover}
                        rounded="lg"
                        position='relative'
                        source={{uri: cover}}
                        />
                    <Text  style={[styles.title, styles.leftBottom]}>{item.original_title}</Text>
                    <Div 
                        position='absolute' 
                        top={18} right={18} 
                        alignItems='center'
                        justifyContent='space-around'
                        zIndex={123} 
                        flexDir='row'
                        px={17}
                        py={8}
                        rounded='md'
                        bg={COLORS.primary}>
                        <MaterialIcons name="star-rate" size={20} color='gold'  />
                        <Text style={[styles.title, { marginHorizontal:8 }]}>{item.vote_average}</Text>
                    </Div>
            </Div>
        </TouchableOpacity>
    )
}

    return (
            <View style={styles.container}>

                { loading ?
                 <ActivityIndicator size="large" color={COLORS.primaryLight} />  
                : 
                <FlatList
                    data={movies}
                    renderItem={(item) => movieCard(item)}
                    keyExtractor={(item:any) => item.id.toString()}
                />
                }
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cover:{
        width:'100%',
        overflow:'hidden',
    },
    title: {
        fontSize:18,
        overflow:'hidden',
        color:COLORS.white,
    },
    leftBottom:{
        position:'absolute',
        backgroundColor:COLORS.primary,
        bottom:18,
        left:18,
        paddingHorizontal:17,
        paddingVertical:8,
        zIndex:12,
        color:COLORS.white,
        borderBottomLeftRadius:8,
        borderTopRightRadius:8
    },
  });
export default Movies
