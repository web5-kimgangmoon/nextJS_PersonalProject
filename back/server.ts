import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./controllers/index";
import session from "express-session";
import store from "session-file-store";
const FileStore = store(session);

config();
// export const front = `http://localhost:3080/api/img?name=`;
export const front = `/api/img?name=`;

// import sequelize from "./models/index";
import test from "./placeholderData/testcase";

test();

// (async () => {
//   await sequelize.sync({ force: false });
// })();
const app = express();

app.set("port", process.env.PORT || 3080);
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "deploy") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use(
  cors({
    origin: [/http:\/\/localhost:*/, /http:\/\/127.0.0.1:*/, "/"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
declare module "express-session" {
  interface SessionData {
    userId: number;
    isAdminLogin: boolean;
    isMainAdmin: boolean;
  }
}

declare module "express" {
  interface Request {
    ban?: boolean;
  }
}
router.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "userInfo",
    name: "user",
    store: new FileStore({
      reapInterval: 1800,
      path: "./sessions",
    }),
    cookie: {
      signed: true,
      httpOnly: true,
      maxAge: 1800 * 1000,
    },
  })
);

app.use("/api", router);

app.listen(app.get("port"), () => {
  console.log("server opens ", app.get("port"));
});
