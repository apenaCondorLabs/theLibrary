FROM node:16

ARG HOME_DIR="/app"

WORKDIR $HOME_DIR

COPY package*.json ./

RUN npm install -g pm2

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "pm2-runtime", "start", "pm2.json" ]