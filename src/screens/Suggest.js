import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { View, Text, StyleSheet, Button } from "react-native";
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
        `https://api.themoviedb.org/3/movie/popular?api_key=${config.API_KEY}&language=en-US&page=1&sort_by=popularity.desc`
      );
      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      setMovie(movies[randomIndex]);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {movie && (
        <>
          <Text style={styles.suggestionLabel}>We suggest watching:</Text>
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