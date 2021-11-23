import React from 'react';
import * as Location from 'expo-location';

import {
  Container,
  Moreinfo,
  Info,
  ContainerInfo
} from './styles';

import {
  Text,
  TouchableOpacity
} from 'react-native';

import Label from '../shared/components/label';

import { useGeoLocation } from './api/geo-localization';
import { getAirCondition } from './api/air-condition';

import TemplateBase from '../shared/templates/base';

const infoImg = require("../../assets/info.svg");
import { useNavigation } from '@react-navigation/native';

// const Home = ({ navigation }) => {
//   const { city, locality } = useGeoLocation();

//   const {
//     air_quality_number,
//     category,
//     health_recommendations,
//     pollutants,
//     pollutants_full_name
//   } = getAirCondition();

export default class App extends React.Component {

    // Constructor init
  constructor(props) {
    super(props);

    // Get User Location
    this.getGeoLocation();
    
    this.state = {

      // Air Quality Info
      air_quality_number: "",
      health_recommendations: "",
      category: "",
      pollutants: "",
      pollutants_full_name: "",

      // Weather Condition Info
      weather_condition: "",
      relative_humidity: "",

      //User Latitude and Longitude
      latitude: "",
      longitude: "",
      locality_info: "",

      // BrezzoMeter API KEY
      BREZZO_API_KEY: "496bfcfb6ddd40ef831e29858c8ba7a9",

      // Health Color
      health_color: "",
    }


  }

  // Methods

    // Get User Location
    getGeoLocation() {
      Location.installWebGeolocationPolyfill()
  
      //Get Latitude and Longitude 
      return navigator.geolocation.getCurrentPosition(
  
        //Will give you the current location
        (position) => {
  
          //getting the Longitude from the location json
          var currentLongitude =
            JSON.stringify(position.coords.longitude);
  
          //getting the Latitude from the location json
          var currentLatitude =
            JSON.stringify(position.coords.latitude);
  
          fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + currentLatitude + '&longitude=' + currentLongitude + '&localityLanguage=pt-br')
            .then((response) => response.json())
            .then((result) => {
  
              //User Locality Info
              var locality_info = result['locality'] + " - " + result['principalSubdivision'] + ", " + result['countryName']
  
              //Set State
              this.setState({
                locality_info: locality_info,
              })
  
            })
  
          //Set State
          this.setState({
            latitude: currentLatitude,
            longitude: currentLongitude,
  
          })
  
        }, (error) => alert(error.message), {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
      }
      );
    }

  // Method to get Air Quality Area
  getAirCondition() {
    this.getGeoLocation()
    return fetch('https://api.breezometer.com/air-quality/v2/current-conditions?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&key=' + this.state.BREZZO_API_KEY + '&features=local_aqi,health_recommendations,dominant_pollutant_concentrations&metadata=true')
      .then((response) => response.json())
      .then(result => {

        //Get variables items
        var location_key = Object.keys(result['data']['indexes']) //Get location key
        var pollutants_key = Object.keys(result['data']['pollutants'])

        var air_quality_number = result['data']['indexes'][location_key]['aqi'] //Get Air Quality AQI Indice
        var category = result['data']['indexes'][location_key]['category'] //Get Air Quality Indice description
        var health_recommendations = result['data']['health_recommendations']['general_population'] // Get 'General Population' Health Recommendations
        var pollutants = result['data']['pollutants'][pollutants_key]['display_name']
        var pollutants_full_name = result['data']['pollutants'][pollutants_key]['full_name']
        var health_color = result['data']['indexes'][location_key]['color']

        //Set State
        this.setState({
          air_quality_number: air_quality_number,
          health_recommendations: health_recommendations,
          category: category,
          pollutants: pollutants,
          pollutants_full_name: pollutants_full_name,
          health_color: health_color,

        })

      }).catch((error) => {
        console.log(error)
      });
  }

    // Method to get Weather Conditions Area
    getWeatherCondition() {
      this.getGeoLocation()
      return fetch('https://api.breezometer.com/weather/v1/current-conditions?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&key=' + this.state.BREZZO_API_KEY )
        .then((response) => response.json())
        .then(result => {

          //Get weather condition
          var weather_condition = result['data']['temperature']['value']+result['data']['temperature']['units']
          
          var relative_humidity = result['data']['relative_humidity']+"%"

  
          //Set State
          this.setState({
            weather_condition: weather_condition,
            relative_humidity: relative_humidity,
  
          })
  
        }).catch((error) => {
          console.log(error)
        });
    }




  render () {
    const { navigate } = this.props.navigation; //Navigation Config
    
    return (
    <TemplateBase
    header
    title="Home"
    rightAction={() => navigate('About')}
    rightIcon={infoImg}>

    <Container>
      <TouchableOpacity onPress={()=> { this.getAirCondition(); this.getWeatherCondition();}}>
      <Label variant="paragraph" strong color={this.state.health_color}>
        {this.state.locality_info}
      </Label>
      </TouchableOpacity>

      <Label variant="header" extraStrong color={this.state.health_color}>
        {this.state.air_quality_number}
      </Label>

      <Label variant="title" strong color={this.state.health_color}>
        {this.state.category}
      </Label>

      <ContainerInfo>
        <Info>
          <Label variant="paragraph" strong color="#30B9C4">
            Temperatura{"\n"}
            {this.state.weather_condition}
          </Label>
        </Info>
        <Info>
          <Label variant="paragraph" strong color="#30B9C4">
            Umidade do Ar{"\n"}
            {this.state.relative_humidity}
          </Label>
        </Info>
        <Info>
          <Label variant="paragraph" strong color="#30B9C4">
            Principal Poluente{"\n"}
            {this.state.pollutants} ({this.state.pollutants_full_name})
          </Label>
        </Info>
        
      </ContainerInfo>

    </Container>

    <Moreinfo>
      <Label strong color="#FFF">
        Recomendações para o clima: {this.state.health_recommendations}
      </Label>
    </Moreinfo>

  </TemplateBase>
    )}
}