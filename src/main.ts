import axios from 'axios';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

let EUR: number = 800;
let USD: number = 600;

const headers = {
  'apikey': process.env.APIKEY
};

const urlEur = 'https://api.apilayer.com/exchangerates_data/convert?to=TRY&from=EUR&amount='+EUR;
const urlUsd = 'https://api.apilayer.com/exchangerates_data/convert?to=TRY&from=USD&amount='+USD;

Promise.all([
  axios.get(urlEur, { headers }),
  axios.get(urlUsd, { headers })
])
  .then(responses => {
    const eurCurrency = responses[0].data.info.rate;
    const usdCurrency = responses[1].data.info.rate;
    const TRY = (eurCurrency*EUR + usdCurrency*USD).toFixed(2);
    console.log(new Date().toLocaleDateString("tr-TR"));
    console.log(`€${EUR} + $${USD}`);
    console.log(`€ = ${eurCurrency.toFixed(2)}₺`);
    console.log(`$ = ${usdCurrency.toFixed(2)}₺`);
    console.log(`Total: ${TRY}₺`);
  })
  .catch(error => console.log('error', error));



