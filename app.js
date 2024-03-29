const express = require("express");
const morgan =require('morgan');
const parser=require('body-parser');
const routes = require("./routes");
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

//"mongodb+srv://ArunSaini:arun6153@cluster0-vensc.mongodb.net/quizBuilder"
//mongodb://localhost:27017/QuizCamp
mongoose.connect('mongodb+srv://ArunSaini:arun6153@cluster0.qkhpcfv.mongodb.net/?retryWrites=true&w=majority', { 
    useNewUrlParser: true ,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database Connected!");
})
.catch((err) => {
    console.error("Error while connecting to Database: ", err);
});

//app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static('./public'));
app.use('/',routes);

app.listen(port,function(){
    console.log("API listening on port "+port);
});
