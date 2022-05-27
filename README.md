
# Location

Projeto pessoal desenvolvido em React Native para obtenção de dados de temperatura, umidade e geolocalização por protocolo MQTT. Além disso,
nesse projeto podemos acionar uma fita de led através de Broker MQTT e acionar um SONOFF MINI® na rede local.

Obs: O projeto depende de configurações exteriores,como por exemplo API_KEY do Google Maps que deve ser configurada

## Funcionalidades

- Acionamento de Leds RGB
- Leitura de Temperatura e Umidade
- Acionamento de SONOFF®



## Instalação

Instale location com npm

```bash
  cd location
  npm install location
```
Instale location com yarn

```bash
   cd location
   yarn
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente

`API_KEY` no arquivo AndroidManifest.xml


## Stack utilizada

**Front-end:** React-Native


## Referência

 - [Biblioteca React Native Maps](https://www.npmjs.com/package/react-native-maps)
 - [Biblioteca MQTT](https://github.com/matiassingers/awesome-readme)
 - [API SONOFF](https://sonoff.tech/product/diy-smart-switch/minir2/)


## Licença

[MIT](https://choosealicense.com/licenses/mit/)



[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
