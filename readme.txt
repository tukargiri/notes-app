Install these on your machine before running app :- a]node b]npm c]gulp d]mongo-db
NOTE :- Make sure you have started mongo service already. Start mongo db by giving the db path.

AUTO install dependancies
1. Install shell js using 'npm install -g shelljs'
2. Run command 'shjs install.js'. This will take care of install dev dependancies in both client and server as well.
3. To start servers use 'shjs start ui' to start ui server and 'shjs start node' to start node server.

MANUL install dependancies
1. Go to server directory and run 'npm install'. (will install server dependancies)
2. Go to client directory and run 'npm install'. (will install client dependancies)
3. Go to server directory and start node server using 'node server.js'.
4. Inside client directory, run 'gulp server' which will start a server on 'localhost:8585'.
NOTE:- the port can be configured accordingly.

MONGO DB as windows service
Goto the folder of mongo db and run following command :- [Sample path :- "C:\Program Files\MongoDB 2.6 Standard\bin"]

mongod.exe --dbpath="C:\Users\Vaibhav\Desktop\HTML5\diary-app\notes-app\mongodb" --logpath="C:\Users\Vaibhav\Desktop\HTML5\diary-app\notes-app\mongodb\log.txt" --install
