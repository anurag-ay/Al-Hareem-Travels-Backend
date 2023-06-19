require("dotenv").config();
module.exports = () => {
  const { DATABASE_URI } = process.env;

  if (!DATABASE_URI) {
    console.log("Don't Have environment varibales setup contact the Author");
    process.exit(1);
  }
};
