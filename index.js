let express = require('express');
const AllRoutes = require('./routes/AllRoutes');
let mongoose = require('mongoose')
const cors = require('cors');
let app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());//specify to use json format

//allow server 5000 talk to frontend 3000 on different port 
let corspolicy = {
    // origin: "http://localhost:3000"
    origin: process.env.FrontendURI
}
app.use(cors(corspolicy));

//middleware before connect to database
app.use((req, res, next) => {
    console.log(" Request received at for house " + (new Date()));
    //without specify next middleware
    //it will keep hang around without connecting to any next path
    next();
})

// connect to the database
// schema
// model
// from middleware, using model to get data from DB

//connect to the database using connection 
let db = async () =>{
    try {
        console.log("from index.js process.env.DBURI",process.env.DBURI);
        // await mongoose.connect("mongodb+srv://mongouser:12342024@mongodbcloud.kd4b58s.mongodb.net/sales?retryWrites=true&w=majority");
        await mongoose.connect(process.env.DBURI);
        console.log('connected to sales realGrand DB today update backend')

    } catch (error) {
        console.log('There was an error')
        res.status(500).send(error);
    }
}
db();


// if do not pass next(), only the first path will run
app.use('/', AllRoutes);

// app.get('/',(req, res)=>{
//     console.log("Request received at " + new Date(Date.now()));
//     res.send('welcome to realgrade backend server')
// })

const port = 5000;
app.listen(port, ()=>{
    console.log('Backend server listening at port '+ port);
})
