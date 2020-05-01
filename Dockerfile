FROM node:11.9-alpine
RUN apk update && apk add bash curl jq grep
WORKDIR /usr/src/app
ENV containerized true
ENV NIGHTWATCH_ENV chrome
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN chmod +x ./wait-for-grid.sh
CMD [ "./wait-for-grid.sh","npm","test" ]