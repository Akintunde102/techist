// This Module is to be exported as a Side Effect
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Models from "./src/models";
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

const addAdmin = async () => {
  try {
    const admin = {
      email: "jegedeakintunde@gmail.com",
      password: "admin",
      firstName: "akintunde",
      lastName: "jegedeakintunde",
      roles: "Admin"
    };

    const checkAdmin = await Models.UserModel.findOne({ email: admin.email });

    if (!checkAdmin) {
      const saltRounds = parseInt(conf.saltRounds,10)
      admin.password = bcrypt.hashSync(admin.password, saltRounds);
      await Models.UserModel(admin).save();
    }

    return;
  } catch (error) {
    Logger.error(error);
  }
};

export { initDbStartUp, addAdmin };
