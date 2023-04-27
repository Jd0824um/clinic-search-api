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
    .catch(() => {
      response.statusMessage = "Something went wrong.";
      response.status(400);
    })
    .then((data) => { // Able to use any combination of search terms to query results from the dataset
      var searchResult = data;

      var name = request.query.name;
      var state = request.query.state || request.query.stateCode; // Can use state or stateCode as a query parameter
      var availabilityFrom = request.query.from;
      var availabilityTo = request.query.to;

      if (name) {
        searchResult = searchResult.filter(clinic => clinic?.name === name || clinic?.clinicName === name);
      }

      if (state) {
        searchResult = searchResult.filter(clinic => clinic?.stateName === state || clinic?.stateCode === state);
      }

      if (availabilityFrom) {
        searchResult = searchResult.filter(clinic => clinic?.availability?.from === availabilityFrom || clinic?.opening?.from === availabilityFrom);
      }

      if (availabilityTo) {
        searchResult = searchResult.filter(clinic => clinic?.availability?.to === availabilityTo || clinic?.opening?.to === availabilityTo);
      }

      if (searchResult.length <= 0) {
        response.statusMessage = "Could not find what you were looking for."
        response.status(404);
        response.end();
      } else {
        response.statusMessage = "Query complete!";
        response.status(200);
        response.send(searchResult); // If no params are given, return all results
      }
    });
});

// Start the server
app.listen(3001, () => {
  console.log("Listening on port 3001");
});

async function getData() {
  // Convert JSON strings into objects
  dentalClinicResponse = JSON.parse(await requestPromise(dentalClinicsURL)); 
  vetClinicResponse = JSON.parse(await requestPromise(vetClinicsURL));

  // Combine objects
  return dentalClinicResponse.concat(vetClinicResponse);
}
