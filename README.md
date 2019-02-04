WikiCollab

This is an app where users can upload wikis and collaborate with other users on certain topics. Users will be sent a confirmation email upon signup and will then have the ability to post wikis for other users to read. Users will also have the option upgrade their account for a certain fee to enable collaboration and private wikis with other users. 

To run the app locally, enter the app directory and run this in your command line terminal:

touch .env

Then find .env.sample provided in the public repository directory.

Copy and paste the contents of .env.sample file into .env file.

Configure the SQL database by running this in your command line terminal:

sequelize db:migrate

Then, run "npm start"
