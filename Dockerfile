from node:12
workdir /app
copy package*.json ./
run npm install
copy . .
env PORT=3000
expose 3000
cmd ["npm", "start"]