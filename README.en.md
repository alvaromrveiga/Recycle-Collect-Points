<p align="center">
  <img src="https://raw.githubusercontent.com/alvaromrveiga/ecoleta-nlw/master/web/src/assets/logo.svg"><br>
  Ecoleta provides a way to register places that collect recyclabe items and show them and what the collect on a map.
</p>

<p align="center">
  <br><b>Leia em <a href="https://github.com/alvaromrveiga/ecoleta-nlw/blob/master/README.md">Português</a></b><br>
</p>

<p align="center">
  <a href="#design">Design</a> / 
  <a href="#technologies">Technologies</a> / 
  <a href="#installation-and-usage">Installation and Usage</a> / 
  <a href="#acknowledgments">Acknowledgments</a> / 
  <a href="#license">License</a>  
</p>

## Design
### Web
<p align="center">
  <img src="https://raw.githubusercontent.com/alvaromrveiga/ecoleta-nlw/assets/web-beginning.png">
  <img src="https://raw.githubusercontent.com/alvaromrveiga/ecoleta-nlw/assets/web-create-point.gif">
</p>

### Mobile
<p align="center">
  <img src="https://raw.githubusercontent.com/alvaromrveiga/ecoleta-nlw/assets/mobile-beginning.jpeg">
  <img src="https://raw.githubusercontent.com/alvaromrveiga/ecoleta-nlw/assets/mobile-point-details.jpeg">
  <img src="https://raw.githubusercontent.com/alvaromrveiga/ecoleta-nlw/assets/mobile-map.gif">
</p>

## Technologies
#### Server ( [NodeJS](https://nodejs.org/en/) + [Typescript](https://www.typescriptlang.org/) )
 * [Express](https://expressjs.com/)
 * [KnexJS](http://knexjs.org/)
 * [Node SQLite3](https://github.com/mapbox/node-sqlite3)
 * [CORS](https://github.com/expressjs/cors)
 * [Multer](https://github.com/expressjs/multer)
 * [Celebrate](https://github.com/arb/celebrate)

#### Web ( [React](https://reactjs.org/) + [Typescript](https://www.typescriptlang.org/) )
 * [React Router DOM](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
 * [React Icons](https://react-icons.github.io/react-icons/)
 * [React Dropzone](https://github.com/react-dropzone/react-dropzone)
 * [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/)
 * [Axios](https://github.com/axios/axios)
 * IBGE's API: **<kbd>[States](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-UFs-estadosGet)</kbd>** and **<kbd>[Cities](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-Municipios-estadosUFMunicipiosGet)</kbd>**
 
#### Mobile( [React Native]() + [Typescript](https://www.typescriptlang.org/) )
 * [Expo](https://expo.io/), [Expo Google Fonts](https://github.com/expo/google-fonts), [Expo Location](https://docs.expo.io/versions/latest/sdk/location/), [Expo Mail Composer](https://docs.expo.io/versions/latest/sdk/mail-composer/)
 * [Axios](https://github.com/axios/axios)
 * [React Navigation](https://reactnavigation.org/docs/getting-started)
 * [React Native Maps](https://github.com/react-native-community/react-native-maps)

## Installation and Usage
 1. If you don't have it yet, install [Node](https://nodejs.org/en/download/)
 1. Clone this repository
 1. Enter the repository's folder and inside each of the folders server, web and mobile run through terminal:
    ```sh 
     $ npm install 
    ```
 1. #### Server
    ```sh
     # Run inside folder /server
     
     # Instantiate database
     $ npm run knex:migrate
     
     # Populate database
     $ npm run knex:seed
     
     # Run server in development mode
     $ npm run dev
    ```
   
 1. #### Web
    ```sh
     # Run inside folder /web
     
     # Run website in development mode
     $ npm start
    ```
   
 1. #### Mobile
    * Download the Expo app in your smartphone
     ```sh
     # Install [ngrok](https://ngrok.com/) to open a public server of your localhost
     $ npm install ngrok -g
     
     # Open server's port with ngrok ( Node's default port is 3333 )
     $ ngrok http 3333
     
     # Copy the link ngrok shows. Example: http://e48931b22dc2.ngrok.io
     # Inside ./mobile/src edit the file serverAddress.ts
     const serverAddress = 'Ngrok's link';
     # Example: const serverAddress = 'http://e48931b22dc2.ngrok.io';
     # It's really important that there is no '/' after .io
     
     # Run inside folder /mobile
      # Opens Expo server in tunnel mode, this way it is possible to enter in the same Wi-Fi but in different IPs (DHCP)
      $ expo start --tunnel
    ```
    * Read the QR Code with Expo app

## Acknowledgments
* Next Level Week #1 from [RocketSeat](https://rocketseat.com.br/)
* [Diego Fernandes](https://github.com/diego3g)

## License
[MIT](https://choosealicense.com/licenses/mit/)
