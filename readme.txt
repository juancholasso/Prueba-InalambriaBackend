--Getting Started
npm install

--Configurations on config/env.js

--For develoment run
npm run nserve (with nodemon)

--For production run
npm run serve

--With environment variables run (Example)
PORT=3100 npm run nserve
PORT=3100 SEED="jwt-secret" npm run nserve


--Docker develoment
docker push node:10
sudo docker run -it -w /home/app -v "$PWD":/home/app -p 3000:3000 node:10 npm run nserve


--Docker production
docker build -t appprod .
docker run -p 3000:3000 appprod npm run nserve