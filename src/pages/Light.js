import React, {useEffect, useState} from 'react';
import {View, TouchableHighlight, Text, Dimensions, Button} from 'react-native';
import {BitMapColorPicker as ColorPicker} from 'react-native-bitmap-color-picker';
const axios = require('axios');
const tinycolor = require('tinycolor2');
import MQTT from 'sp-react-native-mqtt';
var cliente;

const URL_SONOFF = '';
const TOPIC_PUBLISH = '';
const DEVICE_ID = '482734872'
// import { Container } from './styles';

const Light = () => {
  const [state, setState] = useState();
  const [brilho, setBrilho] = useState(255);

  useEffect(() => {
    const data = {
      deviceid: DEVICE_ID,
      data: {},
    };
    axios.post(`${URL_SONOFF}zeroconf/info`, data).then(
      res => {
        setState(res.data.data.switch);
        if (state === 'off') {
          setState('on');
        } else {
          setState('off');
        }
      },
      err => {
        console.log(err);
      },
    );
  }, []);
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

        client.on('message', function (msg) {});

        client.on('connect', function () {
          cliente = client;
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  const sendData = () => {
    console.log(state);
    if (state === 'off') {
      setState('on');
    } else {
      setState('off');
    }
    const data = {
      deviceid: D,
      data: {
        switch: state,
      },
    };
    axios.post(`${URL_SONOFF}zeroconf/switch`, data).then(
      res => {},
      err => {
        console.log(err);
      },
    );
  };
  return (
    <View
      style={{
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <ColorPicker
        onColorChange={color => {
          var cor = tinycolor(color);
          cor.brilho = 255;
          var data = cor.toRgb();

          data.brilho = brilho;

          console.log(data);

          cliente.publish(
            TOPIC_PUBLISH,
            JSON.stringify(data),
            0,
            false,
          );
          //sendData(data);
        }}
        style={{width: 200, height: 200, backgroundColor: 'black'}}
      />
      <Button
        title="Apagar"
        onPress={() => {
          const data = {
            r: 0,
            g: 0,
            b: 0,
            brilho: brilho,
          };

          cliente.publish(
            TOPIC_PUBLISH,
            JSON.stringify(data),
            0,
            false,
          );
        }}
      />
      <Button
        title="Luz Branca"
        onPress={() => {
          const data = {
            r: 255,
            g: 255,
            b: 255,
            brilho: brilho,
          };

          cliente.publish(
            TOPIC_PUBLISH,
            JSON.stringify(data),
            0,
            false,
          );
        }}
      />
      <Button
        title="Modo Leitura"
        onPress={() => {
          const data = {
            r: 255,
            g: 100,
            b: 0,
            brilho: brilho,
          };

          cliente.publish(
            TOPIC_PUBLISH,
            JSON.stringify(data),
            0,
            false,
          );
        }}
      />
      <TouchableHighlight
        style={{
          backgroundColor: '#9BA3EB',
          width: 300,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={sendData}>
        <Text style={{color: 'white'}}>ACIONAR</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Light;
