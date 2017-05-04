FROM node:latest

ENV PROC server
ENV PORT 4000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn

EXPOSE $PORT

COPY . /usr/src/app

CMD [ "sh", "-c", "node ${PROC}.js"]
