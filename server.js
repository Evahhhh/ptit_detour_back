const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorHandler");
const db = require("./models");

dotenv.config({ path: "config.env" });

const app = express();

// Body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Route files
const users = require("./routes/users");
const childs = require("./routes/childs");
const avatars = require("./routes/avatars");
const activities = require("./routes/activities");

// Mount routers
app.use(users);
app.use(childs);
app.use(avatars);
app.use(activities);

const PORT = process.env.PORT || 8081;

app.use(errorHandler);

const sync = async () => await db.sequelize.sync({ force: true });
sync().then(async () => {
    try {
      const avatar = await db.Avatar.create({ url: '/avatars/default.png' });
      const premium = await db.Premium.create({
          name: 'free',
          price: 0.00,
          max_childs: 3,
          advertisement: true,
          downloading: false,
          holding: 30
      });
  
      await db.User.create({
        email: "test@test.com",
        password: "123456",
        name: "neo",
        role_id: 1,
        avatar_id: avatar.id,
        premium_id: premium.id
      });
      await db.User.create({
        email: "test+admin@test.com",
        password: "123456",
        name: "celeb_neo",
        role_id: 0,
        avatar_id: avatar.id,
        premium_id: premium.id
      });
      console.log('Database seeded successfully'.green.bold);
    } catch (error) {
      console.error('Error seeding database:'.red.bold, error);
    }
  });

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
