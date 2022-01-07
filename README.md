# Demo of condor labs

Demo to implement condor labs libraries, use docker and option to implement it with docker-compose.

## Installation

Use the package manager [NodeJS](https://nodejs.org/es/download/) to install the demo.

```bash
npm install
```
## Installation other packages

install [Docker](https://docs.docker.com/engine/install/).

```bash
docker network create app-demo

docker run -d --name mongo --net app-demo -e MONGO_INITDB_ROOT_USERNAME=YOURUSER -e MONGO_INITDB_ROOT_PASSWORD=YOURPASSWORD -p 27017:27017 mongo

docker run --name redis --net app-demo -p 6379:6379 -d redis 

docker pull armandojose009/the_library:latest

docker run --name demo --net app-demo -p 80:3000 -d --restart=always HASHIMAGES
```

## Installation with docker-compose

install [docker-compose](https://docs.docker.com/compose/install/). 


```bash
docker-compose up -d
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)