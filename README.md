WikiCollab

To run the app locally, enter the app directory and run this in your command line terminal:

touch .env

Then find .env.sample provided in the public repository directory.

Copy and paste the contents of .env.sample file into .env file.

Configure the SQL database by running this in your command line terminal:

sequelize db:migrate

Then, run "npm start"
