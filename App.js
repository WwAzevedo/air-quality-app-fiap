import React from "react";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import About from "./src/about";
import Home from "./src/home";
import Intro from "./src/intro";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  // // Constructor init
  // constructor(props) {
  //   super(props);
  //   this.getGeoLocation() // Get User Location

  //   this.state = {

  //     // Air Quality Info
  //     air_quality_number: "",
  //     health_recommendations: "",
  //     category: "",
  //     pollutants: "",
  //     pollutants_full_name: "",

  //     //User Latitude and Longitude
  //     latitude: "",
  //     longitude: "",
  //     locality_info: "",

  //     // BrezzoMeter API KEY
  //     BREZZO_API_KEY: "67d9c460a3a44ac092c1d0def7d300c5",
  //     GOOGLE_MAPS_API_KEY: "AIzaSyCYV2qYhugmFxDEBn0O4syaJEl9omSenxI",
  //   }
  // }

  // // Methods

  // // Method to get Air Quality Area
  // getAirCondition() {
  //   return fetch('https://api.breezometer.com/air-quality/v2/current-conditions?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&key=' + this.state.BREZZO_API_KEY + '&features=local_aqi,health_recommendations,dominant_pollutant_concentrations&metadata=true')
  //     .then((response) => response.json())
  //     .then(result => {

  //       //Get variables items
  //       var location_key = Object.keys(result['data']['indexes']) //Get location key
  //       var pollutants_key = Object.keys(result['data']['pollutants'])

  //       var air_quality_number = result['data']['indexes'][location_key]['aqi'] //Get Air Quality AQI Indice
  //       var category = result['data']['indexes'][location_key]['category'] //Get Air Quality Indice description
  //       var health_recommendations = result['data']['health_recommendations']['general_population'] // Get 'General Population' Health Recommendations
  //       var pollutants = result['data']['pollutants'][pollutants_key]['display_name']
  //       var pollutants_full_name = result['data']['pollutants'][pollutants_key]['full_name']

  //       //Set State
  //       this.setState({
  //         air_quality_number: air_quality_number,
  //         health_recommendations: health_recommendations,
  //         category: category,
  //         pollutants: pollutants,
  //         pollutants_full_name: pollutants_full_name,

  //       })

  //     }).catch((error) => {
  //       console.log(error)
  //     });
  // }

  // // Get User Location
  // getGeoLocation() {
  //   Location.installWebGeolocationPolyfill()

  //   //Get Latitude and Longitude
  //   return navigator.geolocation.getCurrentPosition(

  //     //Will give you the current location
  //     (position) => {

  //       //getting the Longitude from the location json
  //       var currentLongitude =
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       var currentLatitude =
  //         JSON.stringify(position.coords.latitude);

  //       fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + currentLatitude + '&longitude=' + currentLongitude + '&localityLanguage=pt-br')
  //         .then((response) => response.json())
  //         .then((result) => {

  //           //User Locality Info
  //           var locality_info = result['locality'] + " - " + result['principalSubdivision'] + ", " + result['countryName']

  //           //Set State
  //           this.setState({
  //             locality_info: locality_info,
  //           })

  //         })

  //       //Set State
  //       this.setState({
  //         latitude: currentLatitude,
  //         longitude: currentLongitude,

  //       })

  //     }, (error) => alert(error.message), {
  //     enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
  //   }
  //   );
  // }

  // Screen Render
  render() {
    return (
      // <View style={[styles.container, styles.title]}>

      //   <RootStack />
      //   <About />
      //   {/* <TouchableOpacity onPress={()=> this.getAirCondition()}>
      //     <Text>VERIFICAR QUALIDADE DO AR (Botão)</Text>
      //   </TouchableOpacity>
      //   <View style={styles.container1}>
      //     <Text>Localização: {this.state.locality_info}</Text>
      //     <Text>Indice AQI: {this.state.air_quality_number}</Text>
      //     <Text>Classificação: {this.state.category}</Text>
      //     <Text>Recomendação: {this.state.health_recommendations}</Text>
      //     <Text>Principal Poluente: {this.state.pollutants} ({this.state.pollutants_full_name})</Text>
      //   </View> */}
      // </View>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Intro"
        >
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 28
  },
  container1: {
    backgroundColor: "#fff"
  }
});
