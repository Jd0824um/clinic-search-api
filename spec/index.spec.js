var request = require('request');

describe("tests external data", function() {
    const vetUrl = "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json";
    it("should respond with a json object of vet clinics", function(done) {
        request(vetUrl, function(error, response, body){
          expect(body).toBeDefined();
          done();
        });
    });
    
      const dentalClinicsURL = "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
    it("should respond with a json object of dental clinics", function(done) {
        request(dentalClinicsURL, function(error, response, body){
        expect(body).toBeDefined();
        done();
        });
    });
});

describe("tests API", function() {
    const url = "http://localhost:3001/api";

    it("should return 200", function(done) {
        request(url, function(error, response, body){
          expect(response.statusCode).toEqual(200);
          done();
        });
      });

    it("should return 200 if the request is vaild with state parameter", function(done) {
        request(url + "?state=Florida"  , function(error, response, body){
          expect(response.statusCode).toEqual(200);
          done();
        });
      });

    it("should return 200 if the request is vaild with stateName parameter", function(done) {
        request(url + "?stateName=FL"  , function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with name parameter", function(done) {
        request(url + "?name=Good Health Home"  , function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with clinicName parameter", function(done) {
        request(url + "?clinicName=Good Health Home"  , function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with to parameter", function(done) {
        request(url + "?to=11:00"  , function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with from parameter", function(done) {
        request(url + "?from=22:00"  , function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with both name and state parameters", function(done) {
        request(url + "?name=Cleveland Clinic&state=New York"  , function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with both to and from parameters", function(done) {
        request(url + "?to=12:00&from=22:00"  , function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with all parameters", function(done) {
        request(url + "?clinicName=National Veterinary Clinic&from=22:00&stateCode=CA&to=22:30"  , function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 400 if the request does not match with any data", function(done) {
        request(url + "?state=New Florida"  , function(error, response, body){
          expect(response.statusCode).toEqual(400);
          done();
        });
      });
});