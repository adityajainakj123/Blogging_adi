const input_text = document.getElementById('search');
const show = ()=>{
    const data = input_text.value ;
    localStorage.setItem("search_user_name" , data);
    input_text.value='';
}

const search_contact_form = document.getElementById('search_icon');
const token1 = localStorage.getItem("auth_token");

search_contact_form.addEventListener("click" , show)
let user_name1 ;
const url1 = 'http://localhost:5000/api/auth/access_user_data'
const accessuserdata1 = async ()=>{
   
     await fetch ( url1 , {
      method:'GET',
      headers:{
         "Content-Type":"application/json",
          "auth-token":token1,
      }
     }).then(async (res) => {
      const data = await res.json();
    //   console.log(data);
      user_name1 = data.user_name ;
      show1();
  }).catch(err => {
      console.log(err);
  })
}

accessuserdata1();

const sign_in = document.getElementById('sign_in')
const show1 = ()=>{
//    console.log(user_name1);
   if ( token1==""){
      sign_in.innerHTML = '<a href="./sign-in/sign-in.html" class="contact_form up">Sign In</a>'
    }else {
       sign_in.innerHTML = `<a href="./user_profile.html" class="contact_form up" style="width:6vw; height:6vh; border-radius: 15px;"> <i class="fa fa-user fa-lg"style="color:white;" aria-hidden="true""></i></a>`
    }
    
}

