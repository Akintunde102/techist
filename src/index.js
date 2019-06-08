import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import cors from "cors";
import routes from "./routes";
import { initDbStartUp, addAdmin } from "../init";
import { validateUser } from "../utils";
import controllers from "./controllers";

initDbStartUp().then(() => {
  addAdmin();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  /** Middlewares */
  // error middleware
  app.use((err, req, res, next) => {
    Logger.error(err);
    res.status(500).send();
    next();
  });

  // test App
  app.get("/status", controllers.statusController);
  app.get("/checkEmail/:email", controllers.checkEmailController);

  app.use("/auth", routes.auth);
  app.use("/session", routes.session);
  app.use("/users", routes.user);
  app.use("/messages", routes.message);

  // To authenticate User
  passport.use(
    new LocalStrategy(
      {
        usernameField: "user[email]",
        passwordField: "user[password]"
      },
      validateUser
    )
  );

  app.listen(process.env.PORT, () =>
    Logger.info(`Techist App is listening on port ${process.env.PORT}!`)
  );
});
