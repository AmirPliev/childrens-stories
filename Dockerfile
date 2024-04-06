FROM node:lts-alpine3.19 as builder

WORKDIR /app


COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY svelte.config.js .
COPY vite.config.ts .
COPY tailwind.config.js .
COPY postcss.config.js .


COPY src/ src/
COPY static/ static/

RUN npm i
RUN npm run build

CMD ["node", "build/index.js"]

