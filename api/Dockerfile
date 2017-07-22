FROM node:8.2.1

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/log

# Bundle app source
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install

COPY . /usr/src/app/

CMD ["npm", "start"]