FROM node:14.21.3

WORKDIR /backend

COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 8000

CMD ["npm", "start"]