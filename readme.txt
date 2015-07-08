Install these on your machine before running app :- a]node b]npm c]gulp d]mongo-db
NOTE :- Make sure you have started mongo service already. Start mongo db by giving the db path.

AUTO
1. Install shell js using 'npm install -g shelljs'
2. Run command 'shjs install.js'. This will take care of install dev dependancies in both client and server as well. It will also start respective servers.

MANUL
In order to properly run the app, follow these steps :-
2. Go to server directory and run 'npm install'. (will install server dependancies)
3. Go to client directory and run 'npm install'. (will install client dependancies)
4. Go to server directory and start node server using 'node server.js'.
5. Inside client directory, run 'gulp server' which will start a server on 'localhost:8989'.