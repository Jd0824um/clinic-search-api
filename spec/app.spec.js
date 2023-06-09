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
        request(url + "?state=Florida", function(error, response, body){
          expect(response.statusCode).toEqual(200);
          done();
        });
      });

    it("should return 200 if the request is vaild with stateName parameter", function(done) {
        request(url + "?stateName=FL", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with name parameter", function(done) {
        request(url + "?name=Good Health Home", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with clinicName parameter", function(done) {
        request(url + "?clinicName=Good Health Home", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with to parameter", function(done) {
        request(url + "?to=20:00", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with from parameter", function(done) {
        request(url + "?from=09:00", function(error, response, body) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with both name and state parameters", function(done) {
        request(url + "?name=Cleveland Clinic&state=New York", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with both to and from parameters", function(done) {
        request(url + "?from=12:00&to=22:00", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 200 if the request is vaild with all parameters", function(done) {
        request(url + "?state=California&from=12:00&to=22:00&name=Mount Sinai Hospital"  , function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it("should return 404 if the request does not match with any data", function(done) {
        request(url + "?state=This is not a state", function(error, response, body){
          expect(response.statusCode).toEqual(404);
          done();
        });
      });
});