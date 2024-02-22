//2098625008 pc phone number
let express = require ('express');
// const Houses = require('../models/allSchemas');
let AllRoutes = express.Router();
let {housesModel, usersModel, enquiriesModel} = require('../models/allSchemas'); 
const multer = require("multer");//for res.body form when using login, signup, form etc
const upload = multer();

// get: http://localhost:5000
AllRoutes.get('/', (req, res)=>{
    console.log('reach root');
    res.send('Welocme to realgrand backend server trigger last');
});

//Get: http://localhost:5000/houses
AllRoutes.get('/houses', async(req, res)=>{
    console.log('reached/houses');
    try {
        let houses = await housesModel.find({});
        res.send(houses);

    } catch (error) {
        console.log("/houses ",error)
        res.status(500).send('error while fetching houses');
    }
})

//post: http://localhost:5000/signup
// form body // required name, email, password and phone. check schema requirement 
// name     abc
//email     abc@gmail.com  // uniq true
//password  123
//phone     526
// if duplicated exist, will through 500 internal server error
AllRoutes.post('/signup', upload.none(), async(req,res)=>{
    //store data in DB using model, and send the newly created object
    try {
        console.log(`req.body: `, req.body);
        //use model to save to backend
        let newuser = new usersModel(req.body)
        let userFromDB = await newuser.save();// to save to DB
        console.log(userFromDB);

        //res.send() send take only one argument for server  to send user info from DB to respond body on client side. 
        //server will give error if write this way res.send(`response successfully`, response); 
        //don't add any string beside server respond with data from DB or empty
        res.send(userFromDB);// server send respond user info from DB to respond body on client side successfully 
    } catch (error) {
        console.log('error while adding user. check if it is duplicate');
        console.log(error);
        res.status(500).send(error);
    }
});

// POST: http://localhost:5000/login
// need to provided email and password because userModel.find() use both to validate user on DB
// Body Form
// email            email@gmail.com //email set uniq to true. 
// password         123
AllRoutes.post('/login', upload.none(), async (req, res)=>{
    //check email password DB using model, and send a success response
    try {
        
        // do not write  like this console.log(`req.body:  ${req.body}  req.body.password:  ${req.body.password}`)
        //req.body is an object, will results in [object Object] when try to concatenate it directly.

        //req.body: {email:'email@gmail.com', password:'1234'}
        //req.body.password: 1234
        console.log(`req.body: `, req.body); // Logging the entire req.body object
        console.log(`req.body.password: `, req.body.password); // Logging the password property
        
        // Use model to find a user with the provided email and password
        let response = await usersModel.find({email:req.body.email, password:req.body.password});
        console.log(`response: `, response);
        //res.send() send take only one argument for server  to send user info from DB to respond body on client side. 
        //server will give error if write this way res.send(`response successfully`, response);
        
        // server send respond [] if not match or not found
        // server send respond with array obj if match or found
        res.send(response);

    } catch (error) {
        console.log("login error")
        console.log(error);
        res.status(500).send(error);        
    }
});

//post: http://localhost:5000/addenquiry
//body form required name, email, password, phone, remark, check requirement on enquiriesModel
//name      abc
//email     abc@gmail.com
//password  123
//phone     562
//remark    like the house
AllRoutes.post('/addenquiry', upload.none(), async (req,res)=>{
    // get all details and store in DB
    try {
        console.log(req.body);
        //use model to save to backend
        let newEnquiry = new enquiriesModel(req.body);
        let enquirySavedFromDb = await newEnquiry.save();//save to db
        console.log(enquirySavedFromDb);
        res.send(enquirySavedFromDb);
    } catch (error) {
        console.log("error while adding enquiry");
        console.log(error);
        res.status(500).send(error);
    }
});
//Get:  http://localhost:5000/enquiries
AllRoutes.get('/enquiries', async(req,res)=>{
    console.log("reached /enquiries");
    try {
        let enquiries = await enquiriesModel.find({});
        res.send(enquiries);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error while fetching enquiries');
    }
});

module.exports = AllRoutes;
