FROM node:20-alpine

# Create app directory
WORKDIR /hisense/frontend

ENV NODE_OPTIONS=--max_old_space_size=4096
# Install app dependencies
COPY package*.json ./

RUN yarn install

COPY . .

ENV NODE_ENV=production

RUN yarn build

CMD ["yarn", "start"]