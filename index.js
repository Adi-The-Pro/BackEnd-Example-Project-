require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
//Allowing Cross-Server Flow Using cors middleware--> npm install cors
const cors = require("cors");
const server = express();
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
console.log("env", process.env.DB_PASSWORD);

//db connection
main().catch((err) => console.log(err));
async function main() {
  //Connectin with Cloud Server of MONGODB--> MongoAtlas
  await mongoose.connect("mongodb+srv://adi:12345678910@cluster0.vklvjrl.mongodb.net/");
  console.log("database connected");
}
//Schema
 

server.use(cors());  // cors is a middleware used for allowing cross-server connection between frontend and backend
//bodyParser
server.use(express.json());
server.use(morgan("default"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(path.resolve(__dirname, "build", "index.html")));
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});