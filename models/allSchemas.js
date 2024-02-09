
let mongoose = require('mongoose');
let houseSchema = new mongoose.Schema(
    {
      
        "_id": {
          "type": "Number"
        },
        "address": {
          "type": "String",
          "require" : true
        },
        "county": {
          "type": "String"
        },
        "description": {
          "type": "String"
        },
        "price": {
          "type": "Number"
        },
        "photo": {
          "type": "String"
        }
    }
);

const userSchema = new mongoose.Schema(
  {
    "username": {
      "type": "String",
      "required": true
    },
    "email": {
      "type": "String",
      "required": true,
      "unique":true
    },
    "password": {
      "type": "String",
      "required": true
    },
    "phone": {
      "type": "String",
      "required": true
    },
    "role":{
      "type": String,
      "required":true,
      "default":"customer"
    }
  }
  );
  
// _id   DB will set it as primary key as unique 
// id    DB will not set it as primary key. allow duplicated id
// if model do not include id, DB will auto create _id itself

// id is id of the house
//address is the address of the house
let enquirySchema = new mongoose.Schema(
  {
    "id": {
      "type": "String",
      "required":true
    },
    "address": {
      "type": "String",
      "required":true
    },
    "username": {
      "type": "String",
      "required":true
    },
    "email": {
      "type": "String",
      "required":true
    },
    "phone": {
      "type": "String",
      "required":true
    },
    "remarks": {
      "type": "String",
      "required":true
    },    
    "submittedDate":{
    "type": Date,
    "default": new Date()
  }
  }  
)

let housesModel = mongoose.model('House', houseSchema);
let usersModel = mongoose.model('User', userSchema);
let enquiriesModel = mongoose.model('Enquiry', enquirySchema);


module.exports = {housesModel, usersModel, enquiriesModel} ;