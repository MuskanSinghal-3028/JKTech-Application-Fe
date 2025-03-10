FROM node:22.14.0

COPY . /app
COPY ./src /app/src
WORKDIR "/app"


ENV PORT 3000
RUN npm install
RUN npm run build
ENTRYPOINT ["npm","run","serve"]