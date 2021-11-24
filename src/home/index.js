import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Container, Moreinfo, Info, ContainerInfo } from "./styles";

import { TouchableOpacity } from "react-native";

import Label from "../shared/components/label";

import TemplateBase from '../shared/templates/base';

const infoImg = require("../../assets/info.svg");

const Home = ({ navigation }) => {

  const [weather, setWeather] = useState();
  const [air, setAir] = useState();
  const [location, setLocation] = useState(null);
  const KEY = "496bfcfb6ddd40ef831e29858c8ba7a9";

  useEffect(() => {
    getGeoLocation();
  }, []);

  useEffect(() => {
    if (location) {
      getWeatherCondition();
      getAirCondition();
    }
  }, [location]);

  const getGeoLocation = () => {
    Location.installWebGeolocationPolyfill()

    return navigator.geolocation.getCurrentPosition(

      async position => {

        let longitude = JSON.stringify(position.coords.longitude);

        let latitude = JSON.stringify(position.coords.latitude);

        let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-br`

        const res = await fetch(url).then(response => response.json());
        const {
          locality,
          principalSubdivision,
          countryName
        } = res;
        setLocation({
          latitude,
          longitude,
          locality_info: `${locality} - ${principalSubdivision}, ${countryName}`
        });
      }
    );
  }

  const getWeatherCondition = async () => {

    let url = `https://api.breezometer.com/weather/v1/current-conditions?lat=${location?.latitude}&lon=${location?.longitude}&key=${KEY}`;

    const res = await fetch(url).then(response => response.json());
    const { value, units } = res.data.temperature;
    const { relative_humidity } = res.data;

    setWeather({
      weather_condition: `${value} ${units}`,
      relative_humidity
    });
  }

  const getAirCondition = async () => {

    let url = `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${location?.latitude}&lon=${location?.longitude}&key=${KEY}&features=local_aqi,health_recommendations,dominant_pollutant_concentrations&metadata=true`
    const res = await fetch(url).then(response => response.json());
    console.log('res', res);
    var location_key = Object.keys(res['data']['indexes']); //Get location key
    var pollutants_key = Object.keys(res['data']['pollutants']);

    var air_quality_number = res['data']['indexes'][location_key]['aqi']; //Get Air Quality AQI Indice
    var category = res['data']['indexes'][location_key]['category']; //Get Air Quality Indice description
    var health_recommendations = res['data']['health_recommendations']['general_population']; // Get 'General Population' Health Recommendations
    var pollutants = res['data']['pollutants'][pollutants_key]['display_name'];
    var pollutants_full_name = res['data']['pollutants'][pollutants_key]['full_name'];
    var health_color = res['data']['indexes'][location_key]['color'];

    setAir({
      air_quality_number,
      health_recommendations,
      category,
      pollutants,
      pollutants_full_name,
      health_color
    })
  }

  return (
    <TemplateBase
      header
      title="Home"
      rightAction={() => navigation.navigate('About')}
      rightIcon={infoImg} >
      <Container>
        <TouchableOpacity>
          <Label variant="paragraph" strong color={air?.health_color == "#FFFF00" ? "#FED900" : "#000"}>
            <Icon name={"location-arrow"} fontSize={"18"} />{" "}

            {location?.locality_info}
          </Label>
        </TouchableOpacity>

        <Label variant="header" extraStrong color={air?.health_color == "#FFFF00" ? "#FED900" : "#000"}>
          {air?.air_quality_number}
        </Label>

        <Label variant="title" strong color={air?.health_color == "#FFFF00" ? "#FED900" : "#000"}>
          {air?.category}
        </Label>

        <ContainerInfo>
          <Info >
            <Label variant="paragraph" strong color={"#30B9C4"}>
              Temperatura{"\n"}
              {weather?.weather_condition}
            </Label>
          </Info>
          <Info>
            <Label variant="paragraph" strong color={"#30B9C4"}>
              Umidade do Ar{"\n"}
              {weather?.relative_humidity}
            </Label>
          </Info>
          <Info>
            <Label variant="paragraph" strong color={"#30B9C4"}>
              Principal Poluente{"\n"}
              {air?.pollutants} ({air?.pollutants_full_name})
            </Label>
          </Info>
        </ContainerInfo>

      </Container>

      <Moreinfo>
        <Label strong color="#FFF">
          Recomendações para o clima: {air?.health_recommendations}
        </Label>
      </Moreinfo>

    </TemplateBase>
  )
};



export default Home;
