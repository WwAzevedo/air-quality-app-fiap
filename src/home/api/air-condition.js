import airCondition from '../mock/air-conditions.json';

export function useAirCondition() {
  return airCondition;
}

export function getAirCondition() {
  const res = useAirCondition();

  var location_key = Object.keys(res['data']['indexes']);
  var pollutants_key = Object.keys(res['data']['pollutants']);

  var air_quality_number = res['data']['indexes'][location_key]['aqi'];
  var category = res['data']['indexes'][location_key]['category'];
  var health_recommendations = res['data']['health_recommendations']['general_population'];
  var pollutants = res['data']['pollutants'][pollutants_key]['display_name'];
  var pollutants_full_name = res['data']['pollutants'][pollutants_key]['full_name'];

  return {
    air_quality_number,
    category: "Moderado",
    health_recommendations,
    pollutants,
    pollutants_full_name
  };
}