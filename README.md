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

Download and install mongo https://www.mongodb.com/try/download/community
Accept all defaults
Download and install node.
I used https://www.djamware.com/post/5ab6397c80aca714d19d5b9c/building-spring-boot-mongodb-and-reactjs-crud-web-application as a guide to set up the app
To start the application run  `gradlew bootRun` this will start the app on port 8080 
Before starting the react app switch to the frontend directory and run `npm install`
To start the dev react app switch to the frontend directory and run, `npm start` 
This will start the react app on http://localhost:3000/
To add the react files to the Java application as static resources run `npm build`
Once added to the application the backend can serve the react files (localhost:8080 will load the react application) (you may need to restart the backend unless you have a watcher to rebuild the app). This will be able to be loaded from localhost:8080/
Development of the react app is easiest when started with `npm start’ it will use the proxy setting from the package json file to use the java backend apis.

Security has not yet been installed so all api’s are unsecured 
