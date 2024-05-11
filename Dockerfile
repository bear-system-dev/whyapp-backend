FROM node:alpine

LABEL app="whyapp-backend"
USER root

WORKDIR /usr/whyapp/
COPY . /usr/whyapp/

EXPOSE 3000

RUN npm install &&\ 
    npm run build

CMD npm run start:prod