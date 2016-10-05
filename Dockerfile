FROM node:latest

MAINTAINER Jonathan Sharpe <mail@jonrshar.pe>

RUN npm install -g angular-cli

RUN mkdir -p /usr
WORKDIR /usr

COPY ./package.json /usr
RUN npm install

COPY ./angular-cli.json /usr

COPY ./src /usr/src

EXPOSE 4200

ENTRYPOINT ["ng"]
CMD ["serve", "--host", "0.0.0.0"]
