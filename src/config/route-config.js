module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const wikiRoutes = require("../routes/wikis");
    const userRoutes = require("../routes/users");
    app.use(staticRoutes);
    app.use(wikiRoutes);
    app.use(userRoutes);
  }
}
