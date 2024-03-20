FROM node:20-alpine

# Create app directory

WORKDIR /app

# Install app dependencies

COPY . .

RUN npm install 

# Bundle app source

EXPOSE 3000

CMD ["npm", "start"]


