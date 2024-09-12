import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./controllers/index";
import sequelize from "./models/index";
import test from "./placeholderData/testcase";

config();
test();

// (async () => {
//   // sequelize.addModels([Todo]);
//   await sequelize.sync({ force: true });
// })();
const app = express();

app.set("port", process.env.PORT || 3080);
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "deploy") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use(
  cors({
    origin: [/http:\/\/localhost:*/, /http:\/\/127.0.0.1:*/],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", router);

app.listen(app.get("port"), () => {
  console.log("server opens ", app.get("port"));
});
