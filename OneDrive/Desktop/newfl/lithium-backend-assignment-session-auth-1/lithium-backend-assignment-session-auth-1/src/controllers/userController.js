const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


// Q1 Write a POST api /users to register a user from the user details in request body.
//  Solution

const createUser = async function(req,res) {
  let Data = req.body
  let createuser = await userModel.create(Data)
  res.send({msz: createuser})
}


// Q2 Write a ***POST api /login** to login a user that takes user details - email and password from the request body. If the credentials don't match with any user's data return a suitable error.
// On successful login, generate a JWT token and return it in response body. Example 


const loginUser = async function(req,res) {

  let userName = req.body.emailId;  //take user and in the body
  let password = req.body.password;

  let user = await userModel.findOne({emailId: userName , password: password})
  //g console.log(user);
  if(!user)
  return res.send({
    status:false,
    msz: "User & password is not corrret"
  })

  // Create the jwt token nd sent it in response |
let token = await jwt.sign({userId: user._id.toString()},"raja")
// console.log(token)
res.send({status:true, data:token})
}

// Q3 Write a **GET api /users/:userId** to fetch user details. Pass the userId as path param in the url. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
// If present, check that the token is valid.

const getUserData = async function (req, res){  
    let userId = req.params.userId
    let userDetails = await userModel.findById(userId)
    if(!userDetails)
    return res.send({
      status: false ,
      msz: "User is not found"
    });
    res.send({status:true, data: userDetails})
  }

// Q4 Write a PUT api /users/:userId to update user details. Pass the userId as path param in the url and update the attributes received in the request body. Check that request must contain **x-auth-token** header. If absent, return a suitable error.

// const updateUser = async function (req, res) {
  
//   let userId = req.params.userId;
//   console.log(userId);
//   if (!userId) {
//     return res.send({
//       satus:false,
//       msz:"Not user exists"});
//    }
//   let updatedUser = await userModel.findOneAndUpdate({ _id: userId},{$set:{age:40}},{new:true});
//   res.send({status:true, msz: updatedUser})

// }
const updateUser = async function (req, res) {
  
  let userId = req.params.userId;
  console.log(userId);
  if (!userId) {
    return res.send({
      satus:false,
      msz:"No such user exists"});
   }
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId},{$set:{age:40}},{new:true});
  res.send({status:true, msz: updatedUser})
}

// const updateUser1 = async function (req, res) {
//   let userId = req.params.userId;
//   let user = await userModel.findById(userId);
//   if (!user) {
//     return res.send("No such user exists");
//   }

//   let userData = req.body;
//   let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
//   res.send({ status: updatedUser, data: updatedUser });
// };

//module.exports.updateUser1=updateUser1


// <<<<<<<<<----------------------------------------------------->>>>>>>>>>>>


// Q - Write a **DELETE api /users/:userId** that takes the userId in the path params and marks the isDeleted attribute for a user as true. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
//  Solution => 

const deleteUser = async function (req, res) {
  let userId = req.params.userId;
  if (!userId) {
    return res.send({
      satus:false,
      msz:"thish user is not exists"});
   }
  //  let find1 = await userModel.findOne({ _id: userId})
  //  console.log(find1);
  let  deleteUser = await userModel.findOneAndUpdate({  _id: userId },{$set:{isDeleted:true}},{new:true});
  res.send({status:true,msz:deleteUser})
  
}


 
module.exports.createUser = createUser;
module.exports.loginUser = loginUser; 
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
//module.exports.updateUser1=updateUser1
 






