const express=require('express') ;
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const client = require('../db');
const router = express.Router() ;
const JWT_SECRET = "adityaisagoodboy" ;

// create table users(user_name text , email text , password text , phone_number text , followers_count int , following_count int , following text array , followers text array ) ;

// SELECT * FROM users where email='amit@gmail.com' ;
// insert into users (name , email , password) values ('aditya rai' , 'aditya@gmail.com' , 'aditya1');


// endpoint for sign up using post request  ROUTE 1
router.post('/signup' ,[
    body('user_name' , 'user name must be atleast 3 character').isLength({ min: 3 }),
    body('email' , 'Enter A valid email').isEmail(),
    body('password' , 'Enter a valid password').isLength({ min: 5 })
], async (req,res)=>{
    const errors = validationResult(req).errors;
    if (errors.length!=0) {
      return res.status(400).json({ errors: errors , value:-2 });
    }
   try {
    const {user_name , email , password , phone_number } = req.body ;
    const followers_count = 0 ;
    const  following_count = 0 ;
      const salt = await bcrypt.genSalt(10) ;
      const secPass = await bcrypt.hash(password,salt )  ;
      const exist2 = await client.query(`select *from users where user_name = '${user_name}' ;`) ;
      if(exist2.rows.length!=0){
        return res.status(500).json({value:-3})
    }
      const exist1 = await client.query(`SELECT * FROM users where email='${email}' ;`)
      if(exist1.rows.length!=0){
        return res.status(500).json({value:-4})
    }
    await client.query(`insert into users values ('${user_name}' , '${email}' , '${secPass}' , '${phone_number}' , ${followers_count} , ${following_count} , '{}' , '{}');`)
    const data1 = user_name ;
      const authtoken = jwt.sign(data1 , JWT_SECRET) ;
      res.json({authtoken:authtoken , value : 0}) ;
   } catch (error) {
    console.log(error.message);
    res.status(500).json({ message:"server error occured" , value :-1});
   }
    },
)

// Endpoint for login get request ROUTE 2 
router.post('/login' ,[
    body('user_name' , 'Enter A user_name').isLength({ min: 3 }),
    body('password' , 'Enter a valid password').isLength({ min: 5 })
], async (req,res)=>{
    const errors = validationResult(req).errors;
    if (errors.length!=0) {
      return res.status(400).json({ value:-2, errors: errors });
    }
   try {
    const { user_name , password} = req.body ;
    console.log(user_name , password);
    const data = await client.query(`SELECT * FROM users where user_name='${user_name}';`) ;
    console.log(data.rows[0]);
    if( data.rowCount === 0 ) {
      return res.status(500).json({message:"Enter Write credentials " , value: -2})
    }
      const passwordCompare = await bcrypt.compare(password , data.rows[0].password) ;
      if ( !passwordCompare){
        return res.status(500).json({message:"Enter Write credentials " , value: -2})
      }
      const data1 = user_name ;
      const authtoken = jwt.sign(data1 , JWT_SECRET) ;
        console.log("you logged in ...")
        res.json({authtoken:authtoken , value : 0 }) ;
      
   
   } catch (error) {
    console.log(error.message);
    res.status(500).json({value:-1});
   }
    },
    )

router.get('/access_user_data' , fetchuser , async(req,res)=>{
  try {
    const user_name = req.user_name ;
    console.log(user_name)
  const data = await client.query(`select *from users where user_name = '${user_name}' ;`);
  // console.log(data) ;
  const newdata = data.rows[0] ;
   res.status(200).json(newdata);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({value:-1});
  }
})


router.post('/follow' , fetchuser , async(req,res)=>{
  try {
    const search_name = req.body.user_name ;
      const user_name = req.user_name ;
      const data = await client.query(`select *from users where user_name = '${search_name}' ;`)
      const followers = data.rows[0].followers 
      const followers_count = data.rows[0].followers_count
      const following_count = data.rows[0].followers_count
      if ( followers.includes(user_name)){
        let newcount = followers_count - 1 ;
        let newcount2 = following_count - 1 ;
        await client.query ( `update users set following = array_remove(following , '${search_name}') , following_count = ${newcount2} where user_name = '${user_name}' ;` )
        await client.query(`update users set followers = array_remove(followers , '${user_name}') , followers_count = ${newcount} where user_name = '${search_name}' ;`)
        return res.status(200).json({message:"you unfollowed user " , value : 1 }) ;
      }
      let newcount = followers_count + 1 ;
      let newcount2 = following_count + 1 ;

        await client.query ( `update users set following = following || '{${search_name}}' , following_count = ${newcount2} where user_name = '${user_name}' ;` )
        await client.query(`update users set followers = followers || '{${user_name}}' , followers_count = ${newcount} where user_name = '${search_name}' ;`)
         res.status(200).json({message:"you followed user " , value : 0 }) ;
  } catch (error) {
      console.log(error);
   res.status(200).json({message:"cant add blog" , value : -1});
  }
})

router.post('/followed_or_not' , fetchuser , async(req,res)=>{
  try {
    const user_name = req.user_name ;
    const search_name = req.body.user_name ;
    const data = await client.query(`select *from users where user_name = '${search_name}' ;`)
    const followers = data.rows[0].followers 
    if (followers.includes(user_name)){
     return res.status(200).json({message:"you followed this user" , value:0})
    }
    res.status(200).json({message:"you are not following this user" , value:1})
  } catch (error) {
    console.log(error);
   res.status(200).json({message:"server error" , value : -1});
  }
})

module.exports = router;