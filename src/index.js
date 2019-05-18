import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import models from './models';
import routes from './routes';

const { databaseHost, databasePort, databaseName } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Middlewares
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  };
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

mongoose.Promise = global.Promise;
const uri = `mongodb://${databaseHost}:${databasePort}/${databaseName}`;
const options = { useNewUrlParser: true };
mongoose.connect(uri, options);
