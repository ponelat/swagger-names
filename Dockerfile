FROM mhart/alpine-node:8.7.0

RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--", "node", "./index.js"]

WORKDIR /app
COPY ./package.json /app/package.json

RUN npm install

# Set to 1, to start a server instead of just a cli
ENV SERVER_MODE=
EXPOSE 3000

COPY . /app/
