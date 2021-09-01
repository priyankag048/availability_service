FROM node:14
WORKDIR /app
COPY package.json yarn.lock ./
COPY src ./src/
RUN yarn
CMD ["yarn", "start"]

