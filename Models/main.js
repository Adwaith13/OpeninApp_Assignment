//importing the necessary libraries
const Sequelize = require("sequelize");

//creating a sequelize instance
//----------------------------->database_name,username,password
const database = new Sequelize("postgres", "postgres", "adwaith1310", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const connectToDatabase = async () => {
  try {
    await database.authenticate();
    await database.sync({ alter: true });
    console.log("Database is Connected");
  } catch (error) {
    throw new Error("Database did not Connect", error);
  }
};

module.exports = { database, connectToDatabase };
