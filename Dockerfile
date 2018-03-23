FROM node:9.5.0
WORKDIR /app
COPY package.json /app/package.json
RUN npm install -g grunt-cli bower
COPY . /app
CMD ["node", "./app.js"]
EXPOSE 3000