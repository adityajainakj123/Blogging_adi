// const { json } = require("express");
// const { body } = require("express-validator");




const message1 = document.getElementById('contact_message');
const email1 = document.getElementById('contact_email');
const name1 = document.getElementById('contact_name');
const contact_form = document.getElementById('send_now')
const alert = document.getElementById('alert');
const baseurl = 'http://localhost:5000/api/contact' ;
const submit_contact_form = async () =>{
 const object = {
    "name":name1.value,
    "email":email1.value,
    "message":message1.value
 };
 name1.value = '';
 message1.value = '';
 email1.value = '';
 await fetch (baseurl , {
    method:'POST',
    headers:{
        "content-Type":"application/json",
    },
    body:JSON.stringify(object)
 }).then( async (response) =>{
    const data = await response.json();
    console.log(data);
    if ( data.value === 0 ) {
        alert.innerHTML = `<div class="alert" style="background-color:#28a745;" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        we will soon contact you 
        </div> `
    }else if ( data.value === -2 ) {
        alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        Invalid Email .. 
        </div> `
    }else {
        alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        Try After Sometime .. 
        </div> `
    }
    window.scroll( 0 , window.top);
 }).catch((err)=>{
    console.log(err);
 })
}

contact_form.addEventListener("click" , submit_contact_form);

let token ;
 

const url = 'http://localhost:5000/api/blogs/fetchallblogs';

const popular_blogs = async () => {
 token = localStorage.getItem("auth_token");

    await fetch(url, {
        method: 'GET',
    }).then(async (res) => {
        const data = await res.json();
        data.forEach(displayblog);
    }).catch(err => {
        console.log(err);
    })
}

popular_blogs();

const blogs_cur = document.getElementById('blogs_cur');
function displayblog(item) {
    let prev = blogs_cur.innerHTML;
     console.log(item.id);
     const desc = item.description.substring(0 , 30);
    let data = ` <div class="card card1">
    <div class="container">
        
    </div>
    <div class="details">
      <h3><b>${item.tag}</b></h3>
      <h3>${item.title}</h3>
      <p>${desc} ....</p>
      <div class="nav-link contact-link">
                  <a href="read_blog.html?${item.id}" class="btn" style="float: right;">Read More</a>
                </div>
    </div>
</div>`

    blogs_cur.innerHTML = prev + data;
}



