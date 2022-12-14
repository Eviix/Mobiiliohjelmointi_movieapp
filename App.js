import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons component here

import MovieScreen from './src/screens/Movie';
import SearchScreen from './src/screens/Search';
import SuggestScreen from './src/screens/Suggest';
import MovieDetail from "./src/components/MovieDetail";



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen
            name="Movies"
            component={HomeStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "md-film" : "md-film-outline"}
                  size={26}
                  color={focused ? "#2f95dc" : "#ccc"}
                />
              )
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "md-search" : "md-search-outline"}
                  size={26}
                  color={focused ? "#2f95dc" : "#ccc"}
                />
              )
            }}
          />
          <Tab.Screen
            name="Suggest"
            component={SuggestStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? "md-bookmark" : "md-bookmark-outline"}
                  size={26}
                  color={focused ? "#2f95dc" : "#ccc"}
                />
              )
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Popular & Upcoming Movies"
        component={MovieScreen}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search movies"
        component={SearchScreen}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
      />
    </Stack.Navigator>
  );
}

function SuggestStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Suggest movies"
        component={SuggestScreen}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
