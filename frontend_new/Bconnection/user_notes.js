const username = document.getElementById("username");
const name1 = document.getElementById("user_name");
const email1 = document.getElementById('user_email');
const phone1 = document.getElementById('phone');
const vlogs = document.getElementById('vlogs');
const followers_count = document.getElementById('followers_count');
const following_count = document.getElementById('following_count');


const blogs_url = 'http://localhost:5000/api/blogs/getAllBlogsof_user';



const addurl = 'http://localhost:5000/api/blogs/addblog' ;

const add_blog = document.getElementById('add_blog') ;
let blogs , token;
const empty = document.getElementById('empty_no_blog')
const allblogs_of_user = async () => {
 token = localStorage.getItem("auth_token")

    await fetch(blogs_url, {
        method: 'GET',
        headers: {
            "Content-Type":"application/json",
            "auth-token": token,
        }
    }).then(async (res) => {
        const data =await res.json();
        console.log(data);
        const user_detail = data.user_details;
        name1.innerHTML = user_detail.user_name;
        email1.innerHTML = user_detail.email;
        username.innerHTML = user_detail.user_name ;
        phone1.innerHTML = user_detail.phone_number;
        followers_count.innerHTML = user_detail.followers_count ;
        following_count.innerHTML = user_detail.following_count ;
        add_blog.innerHTML = `<a href="./add_Blog.html?${user_detail.user_name}" class="btn up " id="add_blog_btn" style=" background: rgb(80, 66, 66);">Add
        Blog</a>`
         blogs = data.blogs ;
         if ( blogs.length === 0 ){
            empty.innerHTML = '<h5 style="color:white;"> Write Blogs that can be displaye here ...</h5>'
         }else {
            blogs.forEach(showblogs);
         }
    }).catch(err => {
        console.log(err);
    })



}



function showblogs(item) {
    let t1 = item.date ;
    let today = parseInt(t1) ; 
    let dt1 = new Date(today) ;
    let dt2 = dt1.toUTCString();
    let prev = vlogs.innerHTML ;
    const desc = item.description.substring(0 , 30);
    let data  =`<div class="card card1">
    <div class="details">
    <p id="desc">Writing Date ${dt2}</p>
      <h3><b id="tag">${item.tag}</b></h3>
      <h3 id="title">${item.title}</h3>
      <p id="desc">${desc}</p>
    </div>
                 <a href="read_blog.html?${item.id}" class="btn" style="float: right;">Read More</a>
    <button class="btn" style="margin: 10px;"><a href="./edit_blog.html?${item.id}" style="color:white;">Edit</a></button>
    <button class="btn" style="margin: 10px;"><a href="./delete_blog.html?${item.id}" style="color:white;">delete</a></button>
  </div>` ;
 vlogs.innerHTML = prev + data ;
}
allblogs_of_user();




// java script for log out 
const logout_btn = document.getElementById('logout');

const logout = ()=>{
    localStorage.setItem("auth_token" , "");
}

logout_btn.addEventListener("click" , logout);



