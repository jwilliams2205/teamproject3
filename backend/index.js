const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./db/db')
const Mongoose = require("mongoose");

Mongoose.connect(db.db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = Mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.listen(PORT,() =>{
    console.log(`Server started on ${PORT}`);
})

