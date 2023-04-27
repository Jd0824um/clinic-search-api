# Clinic Search API
A RESTful API that can be called, using your browser or tools like postman, to return information about available vet and dental clinics.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Jd0824um/clinic-search-api.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Run With Docker

Make sure Docker is installed on your local machine. Otherwise, docker can be found here:
```bash
https://docs.docker.com/engine/install/
```

Create a Docker file in the root of your project. This can be done eaisly with the Docker extention in VS Code


Create a Docker image by running the following command
```bash 
 docker build --tag node-docker .
```

Tag the Docker image with the following command
```bash
 docker tag node-docker:latest node-docker:v1.0.0
```
Run your image as a container with the following command
```bash
 docker run node-docker
```

## Running Tests

To run tests, run the following command

```bash
  npm test
```

# How To Use
Make sure your API is running and you are able to navigate to the port you reserved. For instance, I am using http://localhost:3001

To query for clinics, add "/api" after the port number
No query parameters returns all clinics
Query parameters can be mixed and matched

Adding the following query parameters returnds different results
name/clinicName
state/stateCode
to/from
For example, using the following URL, it will produce the following data
```bash
http://localhost:3001/api?name=Good Health Home&stateCode=FL

```

![image](https://user-images.githubusercontent.com/31254785/235007168-75100779-bc0e-4d52-b0df-d1e8d758ab4e.png)\
