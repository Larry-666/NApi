const {InteractiveBrowserCredential} = require("@azure/identity");
const {TokenCredentialAuthenticationProvider} = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
const {Client} = require("@microsoft/microsoft-graph-client")

var Db  = require('./toiminnot');
var Viestit  = require('./tiedot');
var HuomHair  = require('./tiedot');
var Vast = require('./tiedot');
var Teams = require('./tiedot');
const toiminnot = require('./toiminnot');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

//Lisää lähetysten hyväksytyn koon määrää Teams viestejä varten
app.use(bodyParser.urlencoded({limit: '200mb', extended: true }));
app.use(bodyParser.json(({limit: '200mb'})));


app.use(cors());
app.use('/api', router);

//    HUOM: API käynnistyy kirjoittamalla "npm start" terminaaliin
//
//    API vastaa hakuihin jotka menevät osoitteesee "api:n_Ip_osoite/api/"
//    Vastaukset voidaan tarkentaan lisäämällä ositteen loppuun tarkentava osoite
//    ESIM: "10.0.2.2:1433/api/viestit"


//kirjoittaa "middleware" joka kerta kun API huomaa hakemuksen
router.use((request,response,next)=>{
   console.log('middleware');
   next();
})


//Huomiot ja Häiriöt POST toiminto
router.route('/huomhair').post((request,response)=>{

    let order = {...request.body}

    console.log(order)

    toiminnot.addOrder(order).then(result => {
       response.status(201).json(result);
    })
}) 

//Viestit POST toiminto
router.route('/viestit').post((request,response)=>{

   let order = {...request.body}

   console.log(order)

   toiminnot.addViestit(order).then(result => {
      response.status(201).json(result);
   })
}) 

//Vastaukset POST toiminto
router.route('/vastaukset').post((request,response)=>{

   let order = {...request.body}

   console.log(order)

   toiminnot.addVast(order).then(result => {
      response.status(201).json(result);
   })
}) 


//Teams toiminto
router.all('/teams', function(request,response) {

//Teams Graph API:n käyttötarkistus
//Erinlaiset tarkistustavat löytyvät alla olevasta linkistä
//LINKKI: https://learn.microsoft.com/en-us/graph/sdks/choose-authentication-providers?tabs=typescript

//HUOM: Jotta Teams toiminto hyväksyy halutun lähetyksen, käyttäjän pitää olla saman tenantID:n alainen. Sen voi tarkistaa Azuressa
//clientId saadaan kun API on rekisteröity Azureen
const credential = new InteractiveBrowserCredential({
   tenantId: '74172c0e-018f-42df-8e06-7bdb651012c6',
   clientId: '4e85daaf-cb59-4d26-bcb5-05cd24775d13',
   redirectUri: 'https://login.microsoftonline.com/common/oauth2/nativeclient'
 });
 

 // @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
 const authProvider = new TokenCredentialAuthenticationProvider(credential, {
   scopes: ['ChannelMessage.Send'],
 });
 

const graphClient = Client.initWithMiddleware({ authProvider: authProvider });

const options = {
	authProvider,
};

const client = Client.init(options); 

//Kirjoittaa viestin terminaaliin
let message = {...request.body}

console.log(message);
const chatMessage = { message };

//  Teams viestin lähetys
//  URL pitää kirjoittaa tietyllä tavalla jotta viesti menee perille
//  POHJA: /teams/{team-id}/channels/{channel-id}/messages
//  Tiedot löytyvät kun kopioit halutun ryhmän kanavan linkin kolmesta pallosta (Main Channels -> Haluttu kanava -> ... -> Get a link to the channel)
//  Saadusta linkistä groupId= menee team-id kohtaan ja /l/channel/ menee channel-id kohtaan. Channel-id loppuu ".tacv2" 
graphClient.api('/teams/{team-id}/channels/{channel-id}/messages')
	.post(chatMessage);
});



// Näyttää missä portissa API toimii
var port = process.env.PORT || 1433;
app.listen(port);
console.log('Order API is runnning at ' + port); 
