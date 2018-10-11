const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models").User;
const authHelper = require("../auth/helpers");
 module.exports = {
  init(app){
    // initialize Passport and tell it to use sessions to keep track of authenticated users
    app.use(passport.initialize());
    app.use(passport.session());
    // We instruct Passport to use the local strategy.
    // Passport looks for properties called  username and password in the
    // body of the request by default, so we pass an option called usernameField to
    // specify what property to use instead.
    passport.use(new LocalStrategy({
      usernameField: "username"
    }, (username, password, done) => {
      User.findOne({
        where: { username }
      })
      .then((user) => {
      // If we find no user with a provided email, or if the password provided
      //doesn't match the one stored in the database, we return an error message.
        if (!user || !authHelper.comparePass(password, user.password)) {
          return done(null, false, { message: "Invalid username or password" });
        }
      // If all went well, we return the authenticated user
        return done(null, user);
      })
    }));
     // serializeUser takes the authenticated user's ID and stores it in the session.
    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });
     // deserializeUser takes the ID stored in the session and returns the user associated with it
    passport.deserializeUser((id, callback) => {
      User.findById(id)
      .then((user) => {
        callback(null, user);
      })
      .catch((err =>{
        callback(err, user);
      }))
     });
  }
}
