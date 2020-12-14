# Menu-App
CMSC 495 - Group 5 - Menu Application

# Group Members
Doukoury Allo</br> 
Israel Balbalec</br> 
Stephen Becker</br> 
Yael R Brown-Evans</br> 
James Geary</br> 
Brian Putt</br> 

# Documents
Application Flow Chart:</br> 
https://drive.google.com/file/d/1NlTpIsJ0ZwAvFK5qnSQpOWD2CmrIiLRb/view?usp=sharing

Project Plan:</br> 
https://docs.google.com/document/d/1d1BCFoorsQlf0s4IFkzKgrFWG5P-OEeiHmTHNC5SAE8/edit?usp=sharing

User Guide:</br> 
https://docs.google.com/document/d/1QgCithoa_AyXY8hUK27CrZDfzy_3erRzaoTNwKRKR_E/edit?usp=sharing

# Instructions for setting up Developer environment: 

1. Download and install mongo https://www.mongodb.com/try/download/community
Accept all defaults
2. Download and install node.
3. To start the server application run  `gradlew bootRun`
    this will start the app on port 8080 
4. Before starting the react app switch to the frontend directory and run `npm install`
5. To start the dev react app switch to the `react-frontend` directory and run, `npm start` 
This will start the react app on http://localhost:3000/
6. To add the react files to the Java application as static resources run `npm run-script build`.
Once added to the application the backend can serve the react files (localhost:8080 will load the react application you may need to restart the backend unless you have a watcher to rebuild the app). This will be able to be loaded from localhost:8080/

Development of the react app is easiest when started with `npm start’ it will use the proxy setting from the package json file to use the java backend apis.

NOTE : Security has not yet been installed so all api’s are unsecured 
