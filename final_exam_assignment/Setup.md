# Setup
In order to get this project to run, the following steps need to be taken:
- Create a .env file with the following data: PORT, DB_HOST=localhost, DB_USER, DB_PSWD and DB_DTBS=boligstjernen. Make sure to fill out the data for rach of those with the correct information, depending on your setup. Just make sure that DB_DTBS is equal to boligstjernen.
- In your MySQL editor, create a schema with the name "boligstjernen" and import "boligstjernen.sql" into it. This will set up the database that the website uses.
- Open the project folder in your code editor, open the editors terminal and write "npm i". This will install every Node.js package that the project uses.

If everything was done correctly, you should now be able to write "npm run dev" in the code editors terminal to start the website.

To get to the website either click the link that should appear in the terminal or go to "http://localhost:3000". If the port in the .env file has been changed, then replace 3000 with the new port.

To get to the admin panel, simply go to "http://localhost:3000/admin" and login with the username "admin" and password "1234". 

The username and password is really simple in this project, since it was a school project and our teachers wanted us to use that username and password to make it easier for them to get to the admin panel when grading our projects.
