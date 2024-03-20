FROM node:14.17.0-alpine3.13

# Create app directory

WORKDIR /app

# Install app dependencies

COPY . .

RUN npm install

# Bundle app source

EXPOSE 3000

CMD ["npm", "start"]


