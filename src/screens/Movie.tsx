import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useRoute  } from '@react-navigation/native';

const Movie = (props:any) => {
    const [ movie, setMovie] = useState<any>()
    const [ loading, setLoading] = useState(true)
    const [ error, setError] = useState()
    const route:any = useRoute();
    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/movie/${route.params.movie}?api_key=c24e2e0c38251c16e41291ca0067c75d&append_to_response=videos`)
        .then(res => res.json())
        .then(data => {
            setMovie(data)
            console.log(data.original_title)
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
            setMovie({})
        }
    }, [route.params.movie])
    
    return (
        <View>
            <Text>
            </Text>
        </View>
    )
}

export default Movie
