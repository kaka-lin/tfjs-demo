FROM node:alpine

WORKDIR /root

ADD . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
