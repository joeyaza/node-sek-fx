var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const axios = require("axios");
const app = express();
app.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const countryName = req.params.id;
    try {
        const country = yield axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`), countryDetails = {
            countryName: country.data[0].name,
            population: country.data[0].population,
            currencies: country.data[0].currencies,
            currencyToSek: yield getCurrencyConversion(country.data[0])
        };
        res.send(countryDetails);
    }
    catch (error) {
        res.send(error);
    }
}));
const getCurrencyConversion = (countryData) => __awaiter(this, void 0, void 0, function* () {
    const apiKey = "a161bfd952269688dd727db0ff6d2312", baseCurrency = countryData.currencies[0].code, sekToEurUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}&symbols=SEK`, baseToEurUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}&symbols=${baseCurrency}`;
    try {
        const sekToEur = yield axios.get(sekToEurUrl), baseToEur = yield axios.get(baseToEurUrl);
        return sekToEur.data.rates["SEK"] / baseToEur.data.rates[baseCurrency];
    }
    catch (error) {
        return error;
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map