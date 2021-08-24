import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
// import path from 'path';

const app = express();
const MONGODB_URI = "mongodb+srv://mahmoud-shakouryan:TarYDvaALJVMQ8w@joulahhcluster.rxqh9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const __dirname = path.resolve();         //baraye inke modele import taghir karder
// app.use('/images',express.static(path.join(__dirname,'images')));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find(
    (product) => product._id === req.params.id
  );
  if (product) {
    res.status(201).json({ product });
  } else {
    res.status(404).json({ message: "Product Not Found!" });
  }
});

app.get("/", (req, res) => {
  const products = data.products;
  res.status(201).json(products);
});

app.use('/api/users',userRouter); 

let port = process.env.PORT || 5000;
mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true })
  .then((result) => {
    app.listen(port);     // app.listen(5000); >>> start listening for incoming requests
    console.log("connected");
  })
  .catch((err) => {
    console.log("mongoose.connect error >>> ", err);
  });
