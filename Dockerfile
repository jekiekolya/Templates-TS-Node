FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "dist/index.js"]