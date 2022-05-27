import React, {useState, useEffect} from 'react';
import {View, Dimensions, Image} from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
// import { Container } from './styles';
import MQTT from 'sp-react-native-mqtt';
import Card from '../components/Card';

const TOPIC_SUBSCRIBE_GPS = '';
const TOPIC_SUBSCRIBE_TEMPERATURA = '';

const Main = () => {
  const [region, setRegion] = useState({
    latitude: -10,
    longitude: -37,
    latitudeDelta: 3,
    longitudeDelta: 3,
  });

  const [lat, setLatitude] = useState(0);
  const [long, setLongitude] = useState(0);
  const [temp, setTemperatura] = useState(0);
  const [um, setUmidade] = useState(0);

  useEffect(() => {
    MQTT.createClient({
      uri: 'mqtt://test.mosquitto.org:1883',
      clientId: 'your_client_id',
    })
      .then(function (client) {
        client.on('closed', function () {
          console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
        });

        client.on('message', function (msg) {
          console.log(msg.topic);
          if (msg.topic === TOPIC_SUBSCRIBE_GPS) {
            const {latitude, longitude} = JSON.parse(msg.data);
            setLatitude(latitude);
            setLongitude(longitude);
            console.log({latitude, longitude});
          } else {
            const {temperatura, umidade} = JSON.parse(msg.data);
            setTemperatura(temperatura);
            setUmidade(umidade);
          }
        });

        client.on('connect', function () {
          console.log('connected');
          client.subscribe(TOPIC_SUBSCRIBE_GPS, 0);
          client.subscribe(TOPIC_SUBSCRIBE_TEMPERATURA, 0);
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            position: 'absolute',
            Index: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          region={region}
          initialRegion={region}>
          <Marker
            coordinate={{
              latitude: lat,
              longitude: long,
            }}
          />
        </MapView>
        <Card
          style={{position: 'absolute', flex: 1, zIndex: 5, marginTop: 20}}
          temperatura={temp.toFixed(2)}
          umidade={um.toFixed(2)}
        />
      </View>
    </View>
  );
};

export default Main;
