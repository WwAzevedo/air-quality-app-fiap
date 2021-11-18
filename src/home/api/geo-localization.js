import geoLocation from '../mock/geo-location.json';

export function useGeoLocation() {
  return geoLocation;
}

export function getGeoLocation() {

  // Location.installWebGeolocationPolyfill()

  // return navigator.geolocation.getCurrentPosition(

  //   (position) => {

  //     var currentLongitude =
  //       JSON.stringify(position.coords.longitude);

  //     var currentLatitude =
  //       JSON.stringify(position.coords.latitude);

  //     fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + currentLatitude + '&longitude=' + currentLongitude + '&localityLanguage=pt-br')
  //       .then((response) => response.json())
  //       .then((result) => {

  //         var locality_info = result['locality'] + " - " + result['principalSubdivision'] + ", " + result['countryName']

  //         this.setState({
  //           locality_info: locality_info,
  //         })

  //       })

  //     this.setState({
  //       latitude: currentLatitude,
  //       longitude: currentLongitude,

  //     })

  //   }, (error) => alert(error.message), {
  //   enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
  // }
  // );

}