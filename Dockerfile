# Use official Node.js image
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"] 