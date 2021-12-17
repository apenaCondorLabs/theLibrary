FROM node:16

ARG HOME_DIR="/app"

WORKDIR $HOME_DIR

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]