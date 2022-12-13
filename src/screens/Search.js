import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Button } from "react-native";

import config from '../config/config';

function Search() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState(''); 
    const [results, setResults] = useState(null); 

    useEffect(() => {
        // Fetch search results when the search query changes
        async function fetchData() {
            // Use Axios to search for movies
            const searchResponse = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${config.API_KEY}&language=en-US&query=${searchQuery}&page=1`
            );
            setResults(searchResponse.data.results);
        }

        fetchData();
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for a movie..."
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
            />
            {results && (
                <ScrollView style={{ flex: 1 }}>
                    {results.map((movie) => (
                        <Card key={movie.id}>
                            <View style={styles.cardContent}>
                                <Text style={styles.movieTitleLabel}>Movie Name:</Text>
                                <Text style={styles.title}>{movie.title}</Text>
                                <Text style={styles.subtitle}>{movie.release_date}</Text>
                                <Image
                                    style={styles.thumbnail}
                                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                                    resizeMode="cover"
                                />
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
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    searchInput: {
        width: "80%",
        height: 40,
        borderColor: "#333",
        borderWidth: 1,
        padding: 10,
    },
    thumbnail: {
        width: 200,
        height: 300,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    cardContent: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Search;