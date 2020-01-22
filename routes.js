var express = require("express");
var router = express.Router();
var user = require('./database/model.js').userModel;
var question = require('./database/model.js').questionModel;
var test = require('./database/model.js').testModel;
var result = require('./database/model').resultModal;


//////////////////// USER //////////////////
router.post("/getUser", (req, res) => {
    user.find({
        Email: req.body.mail,
        Password: req.body.pass
    })
        .then((data) => {
            if (data.length) {
                res.end(JSON.stringify(data[0]));
            }
            else
                res.end("false");
        })
        .catch((err) => {
            console.log("Error While logging in User: ", err);
            res.end("false");
        });
});

router.post("/registerUser", (req, res) => {
    user.create({
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Type: req.body.Type
    })
        .then((data) => {
            res.end("User registered");
        })
        .catch((err) => {
            console.log("Error While adding User: ", err);
            res.end();
        })
});
//////////////////// Question /////////////
router.post("/addQuestion", (req, res) => {
    question.create({
        Title: req.body.Title,
        Description: req.body.Description,
        CorrectAnswerNo: req.body.CorrectAnswerNo,
        Options: req.body.Options
    })
    .then((data) => {
        res.end();
    })
    .catch((err) => {
        console.log("Error While adding User: ", err);
        res.end();
    })
});

router.get("/getQuestions", (req, res) => {
    question.find({})
    .then((data) => {
        console.log("Question Get");
        res.end(JSON.stringify(data));
    })
    .catch((err) =>{
        console.log("Error in /getQuestions: ", err);
        res.end("[]");
    });
});
//////////// TEST ////////////////
router.post("/createTest", (req, res) => {
    test.create({
        Questions:req.body.TestQuestion,
        Id:req.body.TestId,
        Timing:req.body.Timing,
        Title:req.body.TestTitle,
    })
    .then(() => {
        res.end();
    })
    .catch((err) =>{
        console.log("Error in /createTest: ", err);
        res.end();
    })
});
router.get("/getCreateTest", (req, res) => {
    test.find({})
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        console.log("Consoling Error : "+err  );
        res.end();
    })
})

router.post("/getTest", (req, res) => {
    console.log(req.body.Key);
    result.find({
        TestId:req.body.Key,
        StudentEmail:req.body.Email
    })
    .then((data)=>{
        if(data.length)
        {
            res.send({bool:false});
        }
        else{
            test.find({
                Id : req.body.Key
            })
            .then((data)=>{
                console.log(data);
                if(data.length)
                {
                    res.send(data[0]);
                }   
                else{
                    res.send(data);
                }
            })
            .catch((err)=>{
                console.log("Consoling Error : "+err  );
                res.end();
            })
        }
    })
})

/////// Result //////

router.post('/postResult',(req,res)=>{
    result.create({
        TestTitle:req.body.TestTitle,
        Percentage:req.body.Percentage,
        StudentName:req.body.StudentName,
        StudentEmail:req.body.StudentEmail,
        TestId:req.body.TestId
    }).then(()=>{
        res.end();
    }).catch(()=>{
        res.end();
    })
})
router.post('/getResult',(req,res)=>{
    console.log(req.body);
    result.find({TestId: req.body.TestId})
    .then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
        res.end();
    })
})

module.exports = router;