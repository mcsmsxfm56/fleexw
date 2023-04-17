import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  `postgres://postgres:franco223@localhost/flipper`,
  {
    logging: false,
    native: false,
  }
);

sequelize.sync({ force: false }).then(() => {
  console.log("server listening on port 3000");
});

export default sequelize;
