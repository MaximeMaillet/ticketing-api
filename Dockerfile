FROM node:10-slim

RUN mkdir -p /app
ADD . /app
WORKDIR /app
RUN npm install --production

VOLUME ['/app/config']

CMD npm start