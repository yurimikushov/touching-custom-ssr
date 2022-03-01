FROM node

WORKDIR /app

COPY package-lock.json .
COPY package.json .

RUN npm ci

COPY . .

ENV PORT 3000

EXPOSE $PORT

CMD ["npm", "run", "start:prod:ssr"]
