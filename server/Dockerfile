FROM mhart/alpine-node

WORKDIR /src

COPY package.json .
RUN npm i

COPY . .

EXPOSE 8000

CMD ["node", "app.js"]
