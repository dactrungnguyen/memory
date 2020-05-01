FROM debian:stable-slim

WORKDIR /app

RUN echo "deb http://ftp.fr.debian.org/debian/ buster main">/etc/apt/sources.list &&\
    apt update &&\
    apt-get install -y --no-install-recommends build-essential &&\
    apt install -y --no-install-recommends nodejs npm &&\
    rm -fr /var/lib/apt/lists/*

# Javascript dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm version
RUN npm ci

# source code
COPY ./src ./
COPY ./public ./

CMD ["npm", "start"]
