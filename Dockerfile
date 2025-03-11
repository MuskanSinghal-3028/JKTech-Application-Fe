FROM node:22.14.0

WORKDIR "/app"
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT 3000

RUN npm run build
ENTRYPOINT ["npm","run","serve"]