import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { Card } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, ScrollView, Button } from "react-native";

import config from '../config/config';

function Movie() {
    const navigation = useNavigation();
    const [popularMovies, setPopularMovies] = useState(null); 
    const [upcomingMovies, setUpcomingMovies] = useState(null); 
    


    useEffect(() => {
        // Fetch popular and upcoming movies
        async function fetchData() {
            // Use Axios to fetch popular movies
            const popularResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${config.API_KEY}&language=en-US&page=1`
            );
            setPopularMovies(popularResponse.data.results);

            // Use Axios to fetch upcoming movies
            const upcomingResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=1`
            );
            setUpcomingMovies(upcomingResponse.data.results);
        }

        fetchData();
    }, []);

    if (!popularMovies || !upcomingMovies) {
        // Show loading indicator while data is being fetched
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <React.Fragment>
            <ScrollView style={{ flex: 1 }}>
                <Card containerStyle={styles.card}>
                    <Text style={styles.popularMoviesLabel}>Popular Movies:</Text>
                    <View style={{ flex: 1 }}>
                        <ScrollView horizontal={true}>
                            {popularMovies.map((movie) => (
                                <Card>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.movieTitleLabel}>Movie Name:</Text>
                                        <Text style={styles.title}>{movie.title}</Text>
                                        <Text style={styles.subtitle}>{movie.release_date}</Text>
                                        <Button
                                            title="View Details"
                                            onPress={() => {
                                                // Navigate to the MovieDetail component, passing the movie ID as a parameter
                                                navigation.navigate('MovieDetail', { id: movie.id });
                                            }}
                                        />
                                    </View>
                                </Card>
                            ))}
                        </ScrollView>
                    </View>
                </Card>
                <Card containerStyle={styles.card}>
                    <Text style={styles.upcomingMoviesLabel}>Upcoming Movies:</Text>
                    <View style={{ flex: 1 }}>
                        <ScrollView horizontal={true}>
                            {upcomingMovies.map((movie) => (
                                <Card>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.movieTitleLabel}>Movie Name:</Text>
                                        <Text style={styles.title}>{movie.title}</Text>
                                        <Text style={styles.subtitle}>{movie.release_date}</Text>
                                        <Button
                                            title="View Details"
                                            onPress={() => {
                                                // Navigate to the MovieDetail component, passing the movie ID as a parameter
                                                navigation.navigate('MovieDetail', { id: movie.id });
                                            }}
                                        />
                                    </View>
                                </Card>
                            ))}
                        </ScrollView>
                    </View>
                </Card>
            </ScrollView>
        </React.Fragment>
    );

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5
    },
    cardContent: {
        padding: 10
    },

    thumbnail: {
        width: 200,
        height: 300,
        borderRadius: 10
    },

    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,

    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,

    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 14,
        color: "#666666",
    },

});

export default Movie;



