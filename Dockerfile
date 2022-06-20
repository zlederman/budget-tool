FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
ENV PORT=80
ENV USERNAME=$USERNAME
ENV PASS=$PASS
EXPOSE 80
CMD ["node","server.js"]