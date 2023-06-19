require("dotenv").config();
module.exports = () => {
  const { DATABASE_URI, jwt_secret_key } = process.env;

  if (!DATABASE_URI && !jwt_secret_key) {
    console.log("Don't Have environment varibales setup contact the Author");
    process.exit(1);
  }
};
