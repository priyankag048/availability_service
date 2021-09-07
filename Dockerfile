FROM node:lts-alpine3.13
WORKDIR /app

ARG uid=1001
ARG gid=1001
ARG user="avuser"
ARG group="avgroup"

RUN addgroup $group
RUN adduser -g $group -s /bin/sh -D $user
RUN chown -Rh $user:$user /app
USER $user

COPY package.json yarn.lock ./
COPY src ./src/
RUN yarn
CMD ["yarn", "start"]
