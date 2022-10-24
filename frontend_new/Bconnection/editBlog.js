const title = document.getElementById('add_title');
const tag = document.getElementById('add_category');
const description = document.getElementById('add_description');

const edit_blog_btn = document.getElementById('edit_blog');


const blog_detail_url = 'http://localhost:5000/api/blogs/ablog' ;
let user_name ;
const func = async ()=>{
    
const queryString = window.location.search;
const id = queryString.substring(1);
console.log(id); 
    const o1 = {
        "id":id
    };
    console.log(o1);
    const token = localStorage.getItem("auth_token");
    await fetch(blog_detail_url , {
           method:'POST',
           headers:{
        "Content-Type":"application/json",
        "auth-token":token,
           },
           body:JSON.stringify(o1)
    }).then( async(res)=>{
        const data = await res.json();
        // console.log(data);
        const blog = data.blog.blog ;
        console.log(blog);
        title.value = blog.title;
        user_name = blog.user_name ;
        description.value = blog.description ;
        if ( blog.tag === 'Lifestyle' ){
            tag.selectedIndex = 0
        }
        else if ( blog.tag === 'General' ){
            tag.selectedIndex = 1
        }else if ( blog.tag === 'Business' ){
            tag.selectedIndex = 2
        }else if ( blog.tag === 'Technology' ){
            tag.selectedIndex = 3
        }else if ( blog.tag === 'Sports' ){
            tag.selectedIndex = 4
        }else if ( blog.tag === 'Health' ){
            tag.selectedIndex = 5
        }
    }).catch( err=>{
        console.log(err);
    })
}
func();

const hello = ()=>{
    console.log("hello function ") ;
}

const edit_blog_url = 'http://localhost:5000/api/blogs/editBlog' ;
const alert = document.getElementById('alert');


const addblog_local = async(e)=>{
    e.preventDefault()

    const queryString = window.location.search;
    const id = queryString.substring(1);
    console.log(id);
    var value = tag.options[tag.selectedIndex].value;


    const object = {
        "title":`${title.value}`,
        "tag":`${value}`,
        "description":`${description.value}`,
        "id":`${id}`
    }
    const token = localStorage.getItem("auth_token");
    await fetch ( edit_blog_url , {
        method:'POST',
        headers:{
              "Content-Type":"application/json",
              "auth-token":token,
        },
        body:JSON.stringify(object)
    }).then(async (res)=>{
        const data =await res.json();
        // console.log(data);
        if ( data.value === 0 ) {
            window.location.replace("http://127.0.0.1:5500/frontend_new/user_profile.html");
        }
        else if (data.value===-1) {
            alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            Server error . Visit after some Time
            </div> `
        }else {
            alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            You Can't Edit Blog
            </div> `
        }
    }).catch(err=>{
        console.log(err);
        alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            ${err.message}
            </div> `
    })
}
   

edit_blog_btn.addEventListener("click" , addblog_local);
