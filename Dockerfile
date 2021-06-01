FROM node:10-alpine

LABEL auther="sanjay"

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python && \
    npm install && \
    apk del make gcc g++ python
RUN npm install -g node-gyp
RUN npm rebuild argon2
RUN npm install

COPY . . 

EXPOSE 9009

CMD ["node", "src/index.js"]
