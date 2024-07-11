FROM node:18-alpine AS builder

WORKDIR /app

ARG REACT_APP_MAPBOX_TOKEN

ENV REACT_APP_MAPBOX_TOKEN=$REACT_APP_MAPBOX_TOKEN

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build /app/build

RUN npm install -g http-server-spa

EXPOSE 3001

CMD ["http-server-spa", "build", "index.html", "3001"]
