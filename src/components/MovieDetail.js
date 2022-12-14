import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Card } from "react-native-elements";

import config from '../config/config';

function MovieDetail({ route, navigation }) {
  const [movie, setMovie] = useState(null); 
  const { id } = route.params;


  useEffect(() => {
    // Fetch movie details 
    async function fetchData() {
      // Use Axios to fetch the details of the movie with the given ID
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${config.API_KEY}&language=en-US`
      );
      setMovie(response.data);
    }

    fetchData();
  }, [id]);

  if (!movie) {
    // Show loading indicator while data is being fetched
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Image
        style={styles.thumbnail}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        resizeMode="cover"
      />
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <Text style={styles.movieTitleLabel}>Title:</Text>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.movieOverviewLabel}>Overview:</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
          <Text style={styles.subtitle}>Release Date: {movie.release_date}</Text>
        </Card>

      </ScrollView>


    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 200,
    height: 300,
    borderRadius: 10
  },
  movieTitleLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    marginTop: 8,
  },
  
  movieOverviewLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
  },
  overview: {
    fontSize: 16,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
  },
});


export default MovieDetail;




