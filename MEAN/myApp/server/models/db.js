const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONDODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB connection succeeded");
    } else {
      console.log("Error in MongoDB connection");
    }
  }
);

require("./employee.model");
require("./healthstatus.model");
