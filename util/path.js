const path = require("path");

//this gives the path to the file that is responsible for the fact that our application runs
module.exports = path.dirname(process.mainModule.filename);
