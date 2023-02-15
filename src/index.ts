import express from 'express';
import dotenv from "dotenv"
import connectDB from './db/connectDb'
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/authRoute";


dotenv.config()
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Backend service is running fine ...');
});

app.use("/auth", authRouter);

const start =async () => {
  const mongo:any = process.env.MONGO_URL
  await connectDB(mongo)
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
}

start()