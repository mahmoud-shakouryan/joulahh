import express from "express";
// import data from "./data.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
// import path from 'path';

dotenv.config();
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended : true}));
const MONGODB_URI = "mongodb+srv://mahmoud-shakouryan:TarYDvaALJVMQ8w@joulahhcluster.rxqh9.mongodb.net/joulahh?retryWrites=true&w=majority";

// const __dirname = path.resolve();         //baraye inke modele import taghir karder
// app.use('/images',express.static(path.join(__dirname,'images')));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.get("/api/products/:id", (req, res) => {
//   const product = data.products.find(
//     (product) => product._id === req.params.id
//   );
//   if (product) {
//     res.status(201).json({ product });
//   } else {
//     res.status(404).json({ message: "Product Not Found!" });
//   }
// });

// app.get("/", (req, res) => {
//   const products = data.products;
//   res.status(201).json(products);
// });

app.use('/api/users',userRouter); 
app.use('/api/products',productRouter);



app.use((err, req, res, next) => {   //age router'e tooye expressAsyncHandler be error resid express miare inja va khob maloome ke error ro be front end mifreste
    res.status(500).send({message : err.message})
})

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
