FROM node:14-alpine AS mediator

# use Bitbucket private key
ARG SSH_PRIVATE_KEY

# save private key and host
RUN apk update; \
    apk add --no-cache git openssh-client; \
    mkdir -p -m 0600 ~/.ssh; \
    ssh-keyscan bitbucket.eresearch.unimelb.edu.au >> ~/.ssh/known_hosts

RUN echo -e "${SSH_PRIVATE_KEY}" >> ~/.ssh/id_rsa; \
    chmod 0600 ~/.ssh/id_rsa

# install dependencies
WORKDIR /opt

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --no-cache --frozen-lockfile


# avoid sharing private key with multi-stage builds
FROM node:14-alpine as build-env

RUN apk update; \
    apk add --no-cache git openssh-client;

WORKDIR /app

# copy app and dependencies
COPY [".", "./"]
COPY --from=mediator ["/opt/node_modules", "./node_modules"]

# build ui production
RUN yarn ui:build


FROM node:14-alpine

EXPOSE 5000

ENV SOURCE_DIR /source

WORKDIR $SOURCE_DIR

RUN apk update; \
    apk add --no-cache --virtual .build-deps alpine-sdk \
                                              build-base \
                                              libressl-dev \
                                              python3 \
                                              python3-dev; \
    apk add --no-cache bash \
                       git \
                       libressl;

USER root

COPY ["docker/release/docker-entrypoint.sh",  "/"]

# copy app, ui production codes and dependencies
COPY [".", "./"]
COPY --from=build-env ["/app/build/", "./build/"]
COPY --from=build-env ["/app/node_modules/", "./node_modules"]

RUN apk add fontconfig ttf-dejavu
RUN apk add --no-cache curl; \ 
    cd /tmp; \ 
    curl -Ls https://github.com/dustinblackman/phantomized/releases/download/2.1.1/dockerized-phantomjs.tar.gz | tar xz; \
    cp -R lib lib64 /; \
    cp -R usr/lib/x86_64-linux-gnu /usr/lib; \
    cp -R usr/share /usr/share; \
    cp -R etc/fonts /etc; \
    curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 | tar -jxf -; \
    cp phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs; \
    rm -fR phantomjs-2.1.1-linux-x86_64; \
    apk del curl

RUN apk del .build-deps; \
    rm -rf /var/cache/apk/*; \
    chmod +x /docker-entrypoint.sh;

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["yarn", "api:start"]
