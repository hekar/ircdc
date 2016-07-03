FROM node:5

EXPOSE 8888

RUN npm install

ENTRYPOINT ["npm", "start"]

