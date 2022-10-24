const username = document.getElementById("username");
const name1 = document.getElementById("user_name");
const email1 = document.getElementById('user_email');
const phone1 = document.getElementById('phone');
const blogs_url = 'http://localhost:5000/api/blogs/anotheruserdata';
const container = document.getElementById('container');
const second_con = document.getElementById('second_con');

const data1 = async ()=>{
  let user_name ;
  if (  window.location.search ) {
    const queryString = window.location.search; 
 user_name = queryString.substring(1);
  }else {
     user_name = localStorage.getItem("search_user_name");
  }
  console.log(user_name)
    const object = {
        "user_name":user_name
    };
    console.log(user_name);
      await fetch ( blogs_url , {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(object)
      }).then(async (res) => {
        const data =await res.json();
        if (data.value == -2 ){
          container.innerHTML = "User Not Found ";
          container.style.display="block"
          second_con.style.display="none";
        }else {
          second_con.style.display="block";
          console.log(data)
          const user_detail = data.object.user_details;
          name1.innerHTML = user_detail.user_name;
          email1.innerHTML = user_detail.email;
          username.innerHTML = user_detail.user_name ;
          phone1.innerHTML = user_detail.phone_number;
          followers.innerHTML = user_detail.followers_count ;
          following.innerHTML = user_detail.following_count;
           blogs = data.object.blogs ;
           blogs.forEach(showblogs);
           show1()
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
  const descri = item.description.substring(0,30) ;
  let data  =`<div class="card card1">
  <div class="details">
  <p id="desc">Writing Date ${dt2}</p>
    <h3><b id="tag">${item.tag}</b></h3>
    <h3 id="title">${item.title}</h3>
    <p id="desc">${descri}</p>
  </div>
               <a href="read_blog.html?${item.id}" class="btn" style="float: right;">Read More</a>
  
</div>` ;
vlogs.innerHTML = prev + data ;
}

data1();








const input_text = document.getElementById('search');
const show = ()=>{
    const data = input_text.value ;
    localStorage.setItem("search_user_name" , data);
    input_text.value='';
}

const search_contact_form = document.getElementById('search_icon');
const following = document.getElementById('following') ;
const followers = document.getElementById('followers') ;

search_contact_form.addEventListener("click" , show)
let user_name1 ;
const url1 = 'http://localhost:5000/api/auth/access_user_data'
const token = localStorage.getItem("auth_token");
// const accessuserdata1 = async ()=>{
  
//      await fetch ( url1 , {
//       method:'GET',
//       headers:{
//          "Content-Type":"application/json",
//           "auth-token":token,
//       }
//      }).then(async (res) => {
//       const data = await res.json();
//       console.log(data);
//       user_name1 = data.user_name ;
//       followers.innerHTML = 
//       show1();
//   }).catch(err => {
//       console.log(err);
//   })
// }

// accessuserdata1();

const sign_in = document.getElementById('sign_in')
const show1 = ()=>{
   console.log(user_name1);
   if ( token==""){
      sign_in.innerHTML = '<a href="./sign-in/sign-in.html" class="contact_form up">Sign In</a>'
    }else {
       sign_in.innerHTML = `<a href="./user_profile.html" class="contact_form up" style="width:6vw; height:6vh; border-radius: 15px;"> <i class="fa fa-user fa-lg" aria-hidden="true"></i></a>`
    }
    
}

 
const follow_url = 'http://localhost:5000/api/auth/follow' ;

const follow_btn = document.getElementById('follow_btn') ;
const follow_text = document.getElementById('follow_text')
const follow_func = async () =>{

  let user_name ;
  if (  window.location.search ) {
    const queryString = window.location.search; 
 user_name = queryString.substring(1);
  }else {
     user_name = localStorage.getItem("search_user_name");
  }
  // console.log(user_name)
    const object = {
        "user_name":user_name
    };

    await fetch( follow_url , {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "auth-token":token,
      },
      body:JSON.stringify(object)
    }).then( async(res)=>{
      const data = await res.json() ;
      if ( data.value == 0 ) {
        follow_btn.style.backgroundColor='black';
        follow_text.innerHTML = 'Followed'
      }else {
        follow_btn.style.backgroundColor='rgb(48, 48, 234)';
        follow_text.innerHTML = 'Follow'
      }
    }).catch(err=>{
      console.log(err);
    })
    location.reload();
}

follow_btn.addEventListener("click" , follow_func)

const followed_or_not_url = 'http://localhost:5000/api/auth/followed_or_not' ;

const fun_local = async()=>{
  let user_name ;
  if (  window.location.search ) {
    const queryString = window.location.search; 
 user_name = queryString.substring(1);
  }else {
     user_name = localStorage.getItem("search_user_name");
  }
  // console.log(user_name)
    const object = {
        "user_name":user_name
    };

    await fetch(followed_or_not_url , {
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "auth-token":token,
      },
      body:JSON.stringify(object)
    }).then(async(res)=>{
      const data = await res.json();
      console.log(data);
      if ( data.value==0){
        follow_btn.style.backgroundColor='black';
        follow_text.innerHTML = 'Followed'
      }else if ( data.value==1){
        follow_btn.style.backgroundColor='rgb(48, 48, 234)';
        follow_text.innerHTML = 'Follow'
      }
    }).catch(err=>{
      console.log(err) ;
    })
}

fun_local();