require("dotenv").config();
const logger = require('morgan');
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");

module.exports = {
  init(app, express){
   app.use(logger('dev'));
   app.set("views", viewsFolder);
   app.set("view engine", "ejs");
   app.use(express.static(path.join(__dirname, "..", "assets")));
  }
};
