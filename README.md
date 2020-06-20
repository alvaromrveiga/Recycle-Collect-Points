<p align="center">
  <img src="https://raw.githubusercontent.com/alvaromrveiga/ecoleta-nlw/master/web/src/assets/logo.svg">
</p>

Ecoleta provê uma forma de registrar lugares que coletam itens recicláveis e os mostra em um mapa e o que coletam.

<p align="center">
  <br><b>Read in <a href="https://github.com/alvaromrveiga/ecoleta-nlw/blob/master/README.en.md">English</a></b><br>
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

## Tecnologias
#### Server ( [NodeJS]() + [Typescript](https://www.typescriptlang.org/) )
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
 * [Leaflet](https://leafletjs.com/) e [React Leaflet](https://react-leaflet.js.org/)
 * [Axios](https://github.com/axios/axios)
 * API do IBGE: **<kbd>[Estados](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-UFs-estadosGet)</kbd>** e **<kbd>[Municípios](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-Municipios-estadosUFMunicipiosGet)</kbd>**
 
#### Mobile( [React Native]() + [Typescript](https://www.typescriptlang.org/) )
 * [Expo](https://expo.io/), [Expo Google Fonts](https://github.com/expo/google-fonts), [Expo Location](https://docs.expo.io/versions/latest/sdk/location/), [Expo Mail Composer](https://docs.expo.io/versions/latest/sdk/mail-composer/)
 * [Axios](https://github.com/axios/axios)
 * [React Navigation](https://reactnavigation.org/docs/getting-started)
 * [React Native Maps](https://github.com/react-native-community/react-native-maps)

## Instalação
 1. Se já não tiver, instale o [Node](https://nodejs.org/en/download/)
 1. Clone este repositório
 1. Entre na pasta do respositório e em cada uma das pastas server, web e mobile e execute pelo terminal/prompt:
    ```sh 
     $ npm install 
    ```
 1. #### Servidor
    ```sh
     # Execute dentro da pasta /server
     
     # Instacia o banco
     $ npm run knex:migrate
     
     # Popula o banco
     $ npm run knex:seed
     
     # Abre o servidor em modo de desenvolvimento
     $ npm run dev
    ```
   
 1. #### Web
    ```sh
     # Execute dentro da pasta /web
     
     # Abre o site em modo de desenvolvimento
     $ npm start
    ```
   
 1. #### Mobile
    * Faça download do aplicativo Expo no seu smartphone
     ```sh
     # Instale o [ngrok](https://ngrok.com/) para abrir um servidor público do seu localhost
     $ npm install ngrok -g
     
     # Abra a porta do servidor com o ngrok (a porta padrão do node é 3333)
     $ ngrok http 3333
     
     # Copie o endereço que o ngrok der. Exemplo: http://e48931b22dc2.ngrok.io
     # Dentro de ./mobile/src edite o arquivo serverAdress.ts
     const serverAddress = 'Endereço do ngrok';
     # Exemplo: const serverAddress = 'http://e48931b22dc2.ngrok.io';
     # É importante que não haja uma barra no final, após o .io
     
     # Execute dentro da pasta /mobile     
      # Abre o servidor expo em modo tunnel, possibilitando acessar na mesma rede Wi-Fi mas em IPs diferentes (DHCP)
      $ expo start --tunnel
    ```
    * Leia o QR Code com o aplicativo Expo
    
## Reconhecimentos
* Next Level Week #1 da [RocketSeat](https://rocketseat.com.br/)
* [Diego Fernandes](https://github.com/diego3g)

## Licença
[MIT](https://choosealicense.com/licenses/mit/)
