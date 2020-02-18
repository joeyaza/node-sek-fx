const express = require("express"),
      axios = require("axios"),
      app = express();

app.get("/:id", async (req, res) => {

    try {

        const countryName: string = req.params.id,
              country: {data: any} = await axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`),
              countryDetails: {} = {
                countryName: country.data[0].name,
                population: country.data[0].population,
                currencies: country.data[0].currencies,
                currencyToSek: await getCurrencyConversion(country.data[0])
              };

        res.send(countryDetails);

    } catch(error) {

        res.send(error);

    }    

});

const getCurrencyConversion = async (countryData: {currencies: any}): Promise<number | Error>  => {

    const apiKey: string = "a161bfd952269688dd727db0ff6d2312",
          baseCurrency: string = countryData.currencies[0].code,
          sekToEurUrl: string = `http://data.fixer.io/api/latest?access_key=${apiKey}&symbols=SEK`,
          baseToEurUrl: string = `http://data.fixer.io/api/latest?access_key=${apiKey}&symbols=${baseCurrency}`;
    
    try {

        const sekToEur: {data: any} = await axios.get(sekToEurUrl),
                baseToEur: {data: any} = await axios.get(baseToEurUrl);

        return sekToEur.data.rates["SEK"] / baseToEur.data.rates[baseCurrency];

    } catch(error) {

        return error;

    }

}

app.listen(3000);
console.log("App is listening on port: 3000");