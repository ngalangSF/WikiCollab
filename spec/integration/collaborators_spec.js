const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const Collaborator = require("../../src/db/models").Collaborator;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;
 describe("routes : collaborators", () => {
   beforeEach((done) => {
     sequelize.sync({force: true}).then((res) => {
      User.create({
         email: "starman@tesla.com",
         password: "Trekkie4lyfe",
         username: "starman"
       })
       .then((user) => {
         this.user = user;
          Wiki.create({
           title: "Winter Games",
           body: "Post your Winter Games stories.",
           userId: this.user.id
         })
         .then((wiki) => {
           this.wiki = wiki;
           Collaborator.create({
             userId: this.user.id,
             wikiId: this.wiki.id
           })
           .then((collaborator) => {
             this.collaborator = collaborator;
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           })
         })
         .catch((err) => {
           console.log(err);
           done();
         })
       })
     });
   });
   describe("GET /wikis/:wikiId/collaborators", () => {
     it("should render a view with a form to view and add collaborators", (done) => {
      request.get(`${base}${this.wiki.id}/collaborators`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Winter Games");
        done();
      });
    });
   });
   describe("POST /wikis/:wikiId/collaborators/create", () => {
     it("should add a new collaborator and redirect", (done) => {
         const options = {
           url: `${base}${this.wiki.id}/collaborators/create`,
           form: {
             username: 'StarGalactica'
           }
         };
         request.post(options,
           (err, res, body) => {
             Collaborator.findOne({where: {username: "StarGalactica"}})
             .then((collaborator) => {
               expect(collaborator).not.toBeNull();
               expect(collaborator.username).toBe('StarGalactica');
               done();
             })
             .catch((err) => {
               console.log(err);
               done();
             });
           }
         );
       });
       });
});
