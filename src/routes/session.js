import { Router as expressRouter } from "express";

const router = expressRouter();

router.get("/", (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

export default router;
