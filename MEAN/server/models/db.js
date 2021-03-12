const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Barabara:barbara@cluster0.8sdsu.mongodb.net/test?retryWrites=true&w=majority",
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
      console.log(err)
      console.log("Error in MongoDB connection");
    }
  }
);

require("./employee.model");
require("./healthstatus.model");
