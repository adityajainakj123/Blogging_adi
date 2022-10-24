
const title = document.getElementById('btitle');
const tag = document.getElementById('btag');
const desc = document.getElementById('bdescr');
const date1 = document.getElementById('bdate');
const goto = document.getElementById('gotouserpage');
const blogurl = 'http://localhost:5000/api/blogs/ablog' ;
const queryString = window.location.search; 
// console.log(queryString);
let id1 = queryString.substring(1);

const object = {
  "id":id1
};
localStorage.setItem("blog_id" , id1) ;


const func = async ()=>{
  let token = localStorage.getItem("auth_token");
  await fetch ( blogurl , {
    method:'POST',
    headers:{
        "Content-Type":"application/json",
        "auth-token":token,
    },
body:JSON.stringify(object)
  }).then( async (res) =>{
       const data = await res.json();
       const comments = data.blog.comments;
       comments.forEach(showcomment);
       const blog = data.blog.blog ;
       let t1 = blog.date ;
      //  console.log(blog);
       let today = parseInt(t1) ;
       let dt1 = new Date(today) ;
       let dt2 = dt1.toUTCString();
    title.innerHTML = blog.title ;
    tag.innerHTML = blog.tag ;
    date1.innerHTML = dt2;
    desc.innerHTML = blog.description ;
    like.innerHTML = blog.support ;
    dislike.innerHTML = blog.dislike;
    if(data.value == 1 ){
      likebtn.style.color = "	#22bb33"
      dislike_btn.style.color = "white"
    }else if (data.value == 2 ){
      dislike_btn.style.color = "#ED4F32"
      likebtn.style.color = "white"
    }
    goto.innerHTML = `<a href="./search_user.html?${blog.user_name}" style="text-decoration: none; font-family: sans-serif; color:rgb(108, 108, 190);"><span style="font-size: 1rem;">${blog.user_name}</span> </a>`
  }).catch( err =>{
    console.log(err);
  })
}

func();


// javascript for like and dislike blog 
const like = document.getElementById('like');
const dislike = document.getElementById('dislike');
const likebtn = document.getElementById('likebtn')
const dislike_btn = document.getElementById('dislike_btn');
const likeurl = 'http://localhost:5000/api/blogs/likeablog' ;

const likeblog = async () =>{
  let token = localStorage.getItem("auth_token");
  await fetch ( likeurl , {
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      "auth-token":token,
    },
    body:JSON.stringify(object)
  }).then( async (res) =>{
    let data1 = await res.json();
    // console.log(data1)
    if(data1.value === 0 ){
      likebtn.style.color = "	#22bb33"
      dislike_btn.style.color = "white"
    }else {
      likebtn.style.color = "white"
      dislike_btn.style.color = "white"
    }
    dislike.innerHTML = data1.dislike ;
    like.innerHTML = data1.support;
  }).catch(err=>{
    console.log(err);
  })
}

likebtn.addEventListener("click" , likeblog) ;








const dislikeurl = 'http://localhost:5000/api/blogs/dislikeablog' ;

const dislikeblog = async () =>{
  let token = localStorage.getItem("auth_token");
  await fetch ( dislikeurl , {
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      "auth-token":token,
    },
    body:JSON.stringify(object)
  }).then( async (res) =>{
    let data1 = await res.json();
    // console.log(data1)
    if(data1.value === -2 ) {
      dislike_btn.style.color = "#ED4F32"
      likebtn.style.color = "white"
    }else {
      dislike_btn.style.color = "white"
      likebtn.style.color = "white"
    }
    dislike.innerHTML = data1.dislike ;
    like.innerHTML = data1.support ;
  }).catch(err=>{
    console.log(err);
  })
}

dislike_btn.addEventListener("click" , dislikeblog) ;

const all_comments = document.getElementById('all_comments');
const showcomment = (item)=>{
  // console.log(item);
      let data = `<div class="card comment"  >
      <div class="user" style="margin-right:10px;>
      <a href="./search_user.html?${item.commenter_user_name}" style="text-decoration: none; font-family: sans-serif; color:rgb(108, 108, 190);"><span style="font-size: 1rem; word-wrap:normal; color:rgb(162, 162, 171);">${item.commenter_user_name}</span> </a>
      </div>
      <div class="comment" style="margin-right:5px;">
        ${item.description}
      </div>
      <button class="btn" style="margin: 10px;"><a href="./deletecomment.html?${item.comm_id}" style="color:white;"><i class="fa fa-trash" aria-hidden="true"></i>
      </a></button>
       
    </div>`
    all_comments.innerHTML +=data ;
}




const addcommenturl = 'http://localhost:5000/api/blogs/comment/addcomment'
const comment_desc_add = document.getElementById('comment_Desc_add');
const add_comment_btn = document.getElementById('add_comment_btn');
const addcomment = async(e) =>{
  const token = localStorage.getItem("auth_token")
  e.preventDefault();
  const object = {
    "description":comment_desc_add.value,
    "id":id1
  }
   await fetch ( addcommenturl , {
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      "auth-token":token,
    },
    body:JSON.stringify(object)
   }).then(async(res)=>{
    const data = await res.json();
    // console.log(data);
    comment_desc_add.value = '';
    location.reload();
   }).catch(err=>{
    console.log(err);
   })
}

add_comment_btn.addEventListener("click" , addcomment)


