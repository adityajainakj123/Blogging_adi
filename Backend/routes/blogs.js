const express = require('express') ;
const client = require('../db');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router() ;
const { body, validationResult } = require('express-validator');
const { response } = require('express');

// create table blogs ( id serial primary key , title text , tag text , description varchar(2000) , user_name text , support int , Date text , supporter text ARRAY , dislike int , disliker text array ) ;
// insert into blogs (title , tag , description , email) values ( 'hello2' , 'general2' , 'good2 habit2 ' , 'prince@gmail.com' ) ;


// route for fetching all blogs of user route 1 
router.get('/getAllBlogsof_user' , fetchuser , async(req,res)=>{
    try {
        const user_name = req.user_name ;
        console.log(user_name);
        const data = await client.query(`select 
        *from blogs where user_name='${user_name}';`) ;
        const user = await client.query(`select *from users where user_name = '${user_name}' ;`) ;
        const newdata = data.rows ;
        const newuserdata = user.rows[0];
        const object = {
            "user_details":newuserdata,
            "blogs":newdata
        }
        res.status(200).json(object);
    } catch (error) {
        res.status(500).json({message:"blogs can not fetched" , value: -1}) ;
        console.log(error.message) ;
    }
},)

// route for adding blog route 2
// router.post('/addblog' ,[
//     body('title' , 'Enter a valid title').isLength({ min: 3 }),
//     body('description' , 'enter a valid description').isLength({ min: 5 })
// ],async(req,res)=>{
//     const errors = validationResult(req).errors;
//     // if (errors.length!=0) {
//     //     console.log(errors)
//     //   return res.status(400).json({ errors: errors.message });
//     // }
//     if(!errors){
//         console.log(errors)
//         return res.status(400).json({ errors: errors.message });
//     }
//     try {
//         const date = Date.now();
//         let support = 0 ;
//         let dislike = 0 ;
//         // const user_name = req.user_name ;
//         const { title , tag , description ,name} = req.body ;
//         const exist = await client.query(`select *from users where user_name='${name}';`)
//         console.log(exist);
//         if(exist.rows.length==0){
//             return res.status(200).json({message:"please login first then add note " , value : -1})
//         }
//         const already = await client.query(`select *from blogs where user_name='${name}' AND title='${title}' AND tag='${tag}' AND description='${description}';`) 
//         if(already.rowCount ==0 ){
            // const data = await client.query(`insert into blogs (title , tag , description , user_name , support , Date , supporter ,  dislike ,disliker  ) values ( '${title}' ,'${tag}' , '${description}','${name}' , '${support}' , '${date}' , '{}' , '${dislike}' , '{}' ) ;`) ;
//              res.status(200).json({message:"blog added successfully" , value :0});
//         }else {
//              res.status(200).json({message:"blog already exist" , value :2})
//         }
        
//     } catch (error) {
//         console.log(error.message);
//      res.status(200).json({message:"cant add blog" , value : -1});
//     }
// },)



// route for editing blog route 3 

router.post('/editBlog' ,fetchuser,  async(req,res)=>{
         try {
            const zero = 0 ;
            const date = Date.now();
            const {title , tag , description } = req.body ;
            const blog_id = req.body.id ;
            const blog = await client.query( `select *from blogs where id=${blog_id} ;`);
        if ( blog.rows[0].user_name === req.user_name ){
            const data = await client.query(`update blogs set title='${title}' , tag='${tag}' , description='${description}' , support =${zero}, Date='${date}' ,supporter='{}' ,  dislike=${zero} ,disliker='{}' where id=${blog_id} ;`)
            res.json({message:"blog updated ok" , value : 0});
        }else {
            res.json({message:"you can not update blog " , value : -2});
        }
         } catch (error) {
            console.log(error);
            res.status(500).json({message: "blog can not updated blog" , value: -1});
         }
      
})



// route for deleting blog routr 4

router.post('/deleteblog' , fetchuser , async(req,res)=>{
    try {
        const blog_id = req.body.id ;
        console.log(blog_id)
        const blog = await client.query( `select *from blogs where id=${blog_id} ;`);
        console.log(blog)
        console.log(req.user_name)
    if ( blog.rows[0].user_name === req.user_name ){
        const data = await client.query(`delete from blogs where id=${blog_id}`)
        res.json({message:"deleted blog" , value : 0});
    }else {
        res.json({message:"you cannot delete blog " , value : -2});
    }
     } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"cant delete blog" , value : -1});
     }
  
})


// route for fetching all blogs 

router.get('/fetchallblogs' , async (req,res)=>{
    try {
        const data = await client.query(`select *from blogs ;`) ;
        res.status(200).json(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"can not fetch all blogs " , value : -1});
    }
})


//route for fetching notes by category 

router.get('/blogs/:category' , async (req,res)=>{
    try {
        const category = req.params.category ;
        const data = await client.query(`select *from blogs where tag='${category}'`)
        console.log(data.rows);
        res.status(200).json(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"can not fetch  blogs " , value:-1});
    }
})

// route for fetch all notes of another user 
router.post('/anotheruserdata' , async(req,res)=>{
    try {
        const {user_name} = req.body ;
        console.log(user_name)
        const user = await client.query(`select* from users where user_name = '${user_name}' ;`) ;
        console.log(user);
        const data = await client.query(`select 
        *from blogs where user_name='${user_name}';`) ;
        if ( user.rowCount == 0){
            return res.status(404).json({message:"user not exist with this user name " , value :-2})
        }
        const newdata = data.rows ;
        const newuserdata = user.rows[0];
        const object = {
            "user_details":newuserdata,
            "blogs":newdata
        }
        res.status(200).json({object:object , value :0});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"can not fetch  blogs " , value:-1});
    }
})

// fetch one blog by its id 
router.post('/ablog' , fetchuser, async(req,res)=>{
    try {
        const user_name = req.user_name ;
        const { id } = req.body ;
        const data  = await client.query ( `select *from blogs where id =${id} ;`) ;
        const comments = await client.query(`select *from comments where blog_id=${id} ;`);
        console.log(comments);
        const object = {
            "blog":data.rows[0],
            "comments":comments.rows
        }
        let value=0 ;
        const supporter = data.rows[0].supporter ;
        const disliker = data.rows[0].disliker ;
        if (supporter.includes(user_name)){
            value = 1 ;
        }else if (disliker.includes(user_name)){
            value = 2 ;
        }
        console.log(data);
        res.status(200).json({blog:object , value :value}) ;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"can not fetch a blog " , value:-1});
    }
})


// route for like a blog 
router.post('/likeablog' , fetchuser , async(req,res) =>{
    console.log('like')
    const user_name = req.user_name ;
        const {id} = req.body ;
    try {
        const data  = await client.query ( `select *from blogs where id =${id} ;`) ;
const supporter = data.rows[0].supporter ;
const disliker = data.rows[0].disliker ;
let newsupport = data.rows[0].support;
let newdislike = data.rows[0].dislike;
if(disliker.includes(user_name)){
    let  new1 = data.rows[0].dislike -1 ;
    newdislike = new1 ;
   await client.query(`update blogs set dislike=${new1} ,disliker=array_remove(disliker , '${user_name}') where id=${id};`);

   let  new2 = data.rows[0].support +1 ;
   newsupport = new2 ;
   await client.query(`update blogs set support=${new2} ,supporter=supporter || '{${user_name}}' where id=${id};`);
   res.status(200).json({support:newsupport , dislike:newdislike , value:0});
}
else if ( supporter.includes(user_name) ) {
    let  new1 = data.rows[0].support -1 ;
    newsupport = new1 ;
   await client.query(`update blogs set support=${new1} ,supporter=array_remove(supporter , '${user_name}') where id=${id};`);
  return res.status(200).json({support:newsupport , dislike:newdislike , value:-2});
}else {
    let  new1 = data.rows[0].support +1 ;
    newsupport = new1 ;
    await client.query(`update blogs set support=${new1} ,supporter=supporter || '{${user_name}}' where id=${id};`);
    res.status(200).json({support:newsupport , dislike:newdislike , value:0});
}


    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"can not like  blog " , value:-1});
    }
})



router.post('/dislikeablog' , fetchuser , async(req,res) =>{
    console.log("dislike")
    const user_name = req.user_name ;
        const {id} = req.body ;
        console.log(user_name , id);
    try {
        const data  = await client.query ( `select *from blogs where id =${id} ;`) ;
const disliker = data.rows[0].disliker ;
const supporter = data.rows[0].supporter ;
let newsupport = data.rows[0].support;
let newdislike = data.rows[0].dislike;
// console.log(newdislike)
if (supporter.includes(user_name) ){
    let new1 = data.rows[0].support -1 ;
    newsupport = new1 ;
   await client.query(`update blogs set support=${new1} ,supporter=array_remove(supporter , '${user_name}') where id=${id};`);

   let  new2 = data.rows[0].dislike +1 ;
   newdislike = new2 ;
   
   await client.query(`update blogs set dislike=${new2} ,disliker=disliker || '{${user_name}}' where id=${id};`);
   res.status(200).json({support:newsupport , dislike:newdislike , value:-2});
}
 else if ( disliker.includes(user_name) ) {
    let new1 = data.rows[0].dislike -1 ;
    newdislike = new1 ;
   await client.query(`update blogs set dislike=${new1} ,disliker=array_remove(disliker , '${user_name}') where id=${id};`);
  return res.status(200).json({support:newsupport , dislike:newdislike , value:0});
}else {
    let  new1 = data.rows[0].dislike +1 ;
    newdislike = new1 ;
    
    await client.query(`update blogs set dislike=${new1} ,disliker=disliker || '{${user_name}}' where id=${id};`);
    res.status(200).json({support:newsupport , dislike:newdislike , value:-2});
}


    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"can not like  blog " , value:-1});
    }
})






router.post('/addblog' ,[
    body('title' , 'Enter a valid title').isLength({ min: 3 }),
    body('description' , 'enter a valid description').isLength({ min: 5 })
],async(req,res)=>{
    const errors = validationResult(req).errors;
    if(!errors){
        console.log(errors)
        return res.status(400).json({ errors: errors.message, value:-2 });
    }
    try {
        let date = Date.now();
        let support = 0 ;
        let dislike = 0 ;
        
        const { title , tag , description ,name} = req.body ;
        console.log(name);
        const exist = await client.query(`select *from users where user_name='${name}';`)
        if(exist.rows.length==0){
            return res.status(200).json({message:"please login first then add note " , value : -1})
        }
        
        
            const data1 = await client.query(`insert into blogs (title , tag , description , user_name , support , Date , supporter ,  dislike ,disliker  ) values ( '${title}' ,'${tag}' , '${description}','${name}' , ${support} , '${date}' , '{}' , ${dislike} , '{}' ) ;`) ; 
            console.log("ok");
             res.status(200).json({message:"blog added successfully" , value :0 , data:data1});
             console.log("ok3")
        
        
    } catch (error) {
        console.log(error);
     res.status(200).json({message:"cant add blog" , value : -1});
    }
},)




module.exports = router ;