FROM node:16-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY ./ ./

EXPOSE 8000

CMD ["npm", "run", "start"]