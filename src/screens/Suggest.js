import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { View, Text, StyleSheet, Image, Button, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';

import config from '../config/config';

function Suggest() {
  const [movie, setMovie] = useState(null); 
  const navigation = useNavigation(); 

  useEffect(() => {
    // Fetch a random popular movie 
    async function fetchData() {
    
      // Use Axios to fetch a random popular movie
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${config.API_KEY}&language=en-US&primary_release_date.gte=2020-01-01&primary_release_date.lte=2021-12-31&page=2`
      );
      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      setMovie(movies[randomIndex]);
    }

    fetchData();
  }, []);

  const refresh = async () => {
    // Use Axios to fetch a random popular movie
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${config.API_KEY}&language=en-US&&primary_release_date.gte=2020-01-01&primary_release_date.lte=2021-12-31&page=2`
    );
    const movies = response.data.results;
    const randomIndex = Math.floor(Math.random() * movies.length);
    setMovie(movies[randomIndex]);
  }

  return (
    <View style={styles.container}>
      {movie && (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={refresh}
          >
            <Image
              style={styles.thumbnail}
              source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={styles.suggestionLabel}>Press poster to get suggestion:</Text>
          <Text style={styles.title}>{movie.title}</Text>
          <Button
            title="View Details"
            onPress={() => {
              // Navigate to the MovieDetail component, passing the movie ID as a parameter
              navigation.navigate('MovieDetail', { id: movie.id });
              
            }}
            
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  thumbnail: {
    width: 200,
    height: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
},
  suggestionLabel: {
    fontSize: 20,
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
export default Suggest;