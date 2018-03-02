FROM mhart/alpine-node:8.7.0

WORKDIR /app
COPY ./package.json /app/package.json

RUN npm install

ENV SERVER_MODE

COPY . /app/

ENTRYPOINT ["node", "./index.js"]
