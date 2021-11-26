import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Container, Moreinfo, Info, ContainerInfo } from "./styles";
import { TouchableOpacity, SafeAreaView } from "react-native";
import Label from "../shared/components/label";
import TemplateBase from "../shared/templates/base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '@env';

const infoImg = require("../../assets/info.svg");

const Home = ({ navigation }) => {

  const KEY = API_KEY;

  const [weather, setWeather] = useState();
  const [air, setAir] = useState(null);
  const [location, setLocation] = useState(null);
  const [last_measurement, setLastMeasurement] = useState(null);

  useEffect(() => {
    getGeoLocation();
  }, []);

  useEffect(() => {
    if (location) {
      getWeatherCondition();
      getAirCondition();
    }
  }, [location]);
  
  useEffect(() => {
    if (air) {
      storeLastMeasurement();
      getLastMeasurement();
    }
  }, [air]);


  const getGeoLocation = () => {

    Location.installWebGeolocationPolyfill();

    return navigator.geolocation.getCurrentPosition(async (position) => {

      let longitude = JSON.stringify(position.coords.longitude);
      let latitude = JSON.stringify(position.coords.latitude);

      let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-br`;

      const res = await fetch(url).then((response) => response.json());
      const { locality, principalSubdivision, countryName } = res;

      setLocation({
        latitude,
        longitude,
        locality_info: `${locality} - ${principalSubdivision}, ${countryName}`
      });

    });
  };

  const getWeatherCondition = async () => {

    let url = `https://api.breezometer.com/weather/v1/current-conditions?lat=${location?.latitude}&lon=${location?.longitude}&key=${KEY}`;

    const res = await fetch(url).then((response) => response.json());
    const { value, units } = res.data.temperature;
    const { relative_humidity } = res.data;

    setWeather({
      weather_condition: `${value} ${units}`,
      relative_humidity
    });

  };

  const getAirCondition = async () => {

    let url = `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${location?.latitude}&lon=${location?.longitude}&key=${KEY}&features=local_aqi,health_recommendations,dominant_pollutant_concentrations&metadata=true`;
    const res = await fetch(url).then((response) => response.json());

    var location_key = Object.keys(res["data"]["indexes"]); //Get location key
    var pollutants_key = Object.keys(res["data"]["pollutants"]);

    var air_quality_number = res["data"]["indexes"][location_key]["aqi"]; //Get Air Quality AQI Indice
    var category = res["data"]["indexes"][location_key]["category"]; //Get Air Quality Indice description
    var health_recommendations =
      res["data"]["health_recommendations"]["general_population"]; // Get 'General Population' Health Recommendations
    var pollutants = res["data"]["pollutants"][pollutants_key]["display_name"];
    var pollutants_full_name =
      res["data"]["pollutants"][pollutants_key]["full_name"];
    var health_color = res["data"]["indexes"][location_key]["color"];

    setAir({
      air_quality_number,
      health_recommendations:
        "Se você começar a sentir desconforto respiratório, como tosse ou dificuldades respiratórias, considere reduzir a intensidade de suas atividades ao ar livre. Tente limitar o tempo que você passa perto de estradas movimentadas, canteiros de obras, fogueiras e outras fontes de fumaça.",
      category,
      pollutants,
      pollutants_full_name: pollutants_full_name.split(" ")[0],
      health_color: health_color == "#FFFF00" ? "#FED900" : health_color
    });

  };

  // store last measurement
  const storeLastMeasurement = async () => {

    const infos = {
      number: air?.air_quality_number,
      category: air?.category,
      locality: location?.locality_info
    };

    try {
      await AsyncStorage.setItem("@last_Measurement", JSON.stringify(infos))
    } catch (e) {
      console.log('error record storage');
    }
  };

  // get last measurement
  const getLastMeasurement = async (value) => {
    try {
      const value = await AsyncStorage.getItem('@last_Measurement');
      if(value !== null) {
        setLastMeasurement({
          last_info: JSON.parse(value)
        });
      }
    } catch (e) {
      console.log('error read storage');
    }
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      <TemplateBase
        header
        title="Air Fresh"
        rightAction={() => navigation.navigate("About")}
        rightIcon={infoImg}
      >
        <Container>
          <TouchableOpacity>
            <Label variant="paragraph" strong color="#000">
              <Icon name={"location-arrow"} fontSize={"18"} />{" "}
              {location?.locality_info}
            </Label>
          </TouchableOpacity>

          <ContainerInfo>
          <Info style={{ gridArea: "temp" }}>
            <Label variant="title" strong color={air?.health_color}>
              {air?.category}
            </Label>
            <Label variant="header" extraStrong color={air?.health_color}>
              {air?.air_quality_number}
            </Label>
          </Info>
            <Info style={{ gridArea: "temp" }}>
              <Label variant="paragraph" strong color={"#30B9C4"}>
                Temperatura{"\n"}
                {weather?.weather_condition}
              </Label>
            </Info>
            <Info style={{ gridArea: "um" }}>
              <Label variant="paragraph" strong color={"#30B9C4"}>
                Umidade do Ar{"\n"}
                {weather?.relative_humidity}
              </Label>
            </Info>
            <Info style={{ gridArea: "pol" }}>
              <Label variant="paragraph" strong color={"#30B9C4"}>
                Principal Poluente{"\n"}
                {air?.pollutants} ({air?.pollutants_full_name})
              </Label>
            </Info>
            <Info style={{ gridArea: "pol" }}>
              <Label variant="paragraph" strong color={"#30B9C4"}>
                Última Medição{"\n"}
                {last_measurement?.last_info?.category}{"\n"}
                {last_measurement?.last_info?.locality}
              </Label>
            </Info>
          <Moreinfo>
            <Label strong color="#FFF">
              Recomendações para o clima: {air?.health_recommendations}
            </Label>
          </Moreinfo>
          </ContainerInfo>
        </Container>

      </TemplateBase>
    </SafeAreaView>
  );
};

export default Home;
