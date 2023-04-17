import sequelize from "./database";

sequelize.sync({ force: true }).then(() => {
  console.log("server listening on port 3000");
});
