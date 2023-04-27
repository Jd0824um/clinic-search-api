const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const requestPromise = require("request-promise");
const dentalClinicsURL =
  "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
const vetClinicsURL =
  "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json";

// defining the Express app
const app = express();

// adding Helmet to enhance Rest API's security by setting HTTP headers appropriately
app.use(helmet());

// enabling CORS for all requests to restrict resources fro mbeing accessed from external domains
app.use(cors());

// defining an endpoint to return all clinics based of parameters given
app.get("/api", (request, response) => {
  getData()
    .catch((err) => console.log(err))
    .then((data) => { // Able to use any combination of search terms to query results from the dataset
      var searchResult = data;

      var name = request.query.name;
      if (name) {
        searchResult = searchResult.filter(clinic => clinic?.name === name || clinic?.clinicName === name);
      }

      var state = request.query.state || request.query.stateCode; // Can use state or stateCode as a query parameter
      if (state) {
        searchResult = searchResult.filter(clinic => clinic?.stateName === state || clinic?.stateCode === state);
      }

      var availabilityFrom = request.query.from;
      if (availabilityFrom) {
        searchResult = searchResult.filter(clinic => clinic?.availability?.from === availabilityFrom || clinic?.open?.from === availabilityFrom);
      }

      var availabilityTo = request.query.to;
      if (availabilityTo) {
        searchResult = searchResult.filter(clinic => clinic?.availability?.to === availabilityTo || clinic?.open?.to === availabilityTo);
      }

      response.send(searchResult); // If no params are given, return all results
    });
});

// Start the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});

async function getData() {
  // Convert JSON strings into objects
  dentalClinicResponse = JSON.parse(await requestPromise(dentalClinicsURL)).catch(err => console.log(err)); 
  vetClinicResponse = JSON.parse(await requestPromise(vetClinicsURL)).catch(err => console.log(err));

  // Combine objects
  return dentalClinicResponse.concat(vetClinicResponse);
}
