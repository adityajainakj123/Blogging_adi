const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const client = require('../db');
// create table contact (name text , email text , message text ) ;
router.post('/contact' ,[
    body('email' , 'Enter a valid Email').isEmail()
] ,async (req,res)=>{
    const errors = validationResult(req).errors;
    console.log(errors);
    if(errors){
        console.log(errors)
        return res.status(400).json({ errors: errors.message, value:-2 });
    }
    try {
        const {name , email , message } = req.body ;
    const data = await client.query(`insert into contact values ( '${name}' , '${email}' , '${message}') ; `)
    res.status(200).json({message:"ok" , value : 0});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"contac form is not submitted..." , value :-1}) ;
    }
})

module.exports = router ;