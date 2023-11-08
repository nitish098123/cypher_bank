const app = require("./app");
const serverless = require("serverless-http");

require("dotenv").config();

// now initiate the timer check
const { start_check_node_status } = require("./timer_check/timer_check_");


const PORT = process.env.PORT;

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  
  // this will start checking the dead node every 13 sec
  start_check_node_status();

});
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

module.exports.handler = serverless(app);
