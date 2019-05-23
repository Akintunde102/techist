import { Router as expressRouter } from "express";
import passport from "passport";
import { auth } from "../../utils";
import Users from "../models/users";

const router = expressRouter();

const UserModel = new Users();

// POST new user route (optional, everyone has access)
router.post("/", auth.optional, (req, res, next) => {
  const {
    body: { user }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  const finalUser = new UserModel(user);

  finalUser.setPassword(user.password);

  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

// POST login route (optional, everyone has access)
router.post("/login", auth.optional, (req, res, next) => {
  const {
    body: { user }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const userData = passportUser;
        userData.token = passportUser.generateJWT();

        return res.json({ user: userData.toAuthJSON() });
      }

      return res.status(400).info;
    }
  )(req, res, next);
});

// GET current route (required, only authenticated users have access)
router.get("/current", auth.required, (req, res, next) => {
  const {
    payload: { id }
  } = req;

  return Models.Users.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
  });
});

// GET current route (required, only authenticated users have access)
router.get("/register", async (req, res, next) => {
  try {
    const user = await UserModel.save(req.payload);
    if (!user) {
      return res.sendStatus(400);
    }
    return res.json({ flag: 200, msg: "registered successfully" });
  } catch (error) {
    return res.json({ flag: 404, msg: error });
  }
});

export default router;
