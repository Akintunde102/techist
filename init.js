// This Module is to be exported as a Side Effect
import mongoose from "mongoose";
import models from "./src/models";
import conf from "./lib";

// Initialize MongoDB
const initDbStartUp = async () => {
  mongoose.Promise = global.Promise;
  const uri = `mongodb://${conf.databaseHost}:${conf.databasePort}/${
    conf.databaseName
  }`;
  const options = { useNewUrlParser: true };
  try {
    await mongoose.connect(uri, options);
    mongoose.set("debug", true);
    mongoose.set("useFindAndModify", false);
    Logger.info("DB: MongoDB Connected");
    global.Mongoose = mongoose;
  } catch (err) {
    Logger.error({
      ERROR: err
    });
  }
};

export default initDbStartUp;
