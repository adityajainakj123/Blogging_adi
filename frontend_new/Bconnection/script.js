// java script for signup 

const user_name = document.getElementById('user_name');
const user_email = document.getElementById('user_email');
const user_password = document.getElementById('user_password');
const phone = document.getElementById('user_phone');
const user_conf_password = document.getElementById('user_conf_password');
const submit_btn_signin = document.getElementById('submit_signin');
const alert = document.getElementById('alert')
const baseurl = 'http://localhost:5000/api/auth/signup';

let auth ;
const signup = async (e)=>{
    e.preventDefault();
const object ={
    "user_name":user_name.value,
    "email":user_email.value,
    "password":user_password.value,
    "phone_number":phone.value
};
if ( user_conf_password.value === user_password.value){
    await fetch( baseurl , {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(object)
     }).then(async (response) =>{
        const data = await response.json();
        if ( data.value == -1 ) {
         alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
         Server error . Visit after some Time
         </div> `
         window.scroll(0 , window.top)
        }if ( data.value == -2 ) {
            alert.innerHTML = `<div class="alert" >
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            User name must have atleast 3 characters 
            <br>
            Invalid E-mail  
            <br>
            Password length should be atleast 5 ... 
          </div>`
          window.scroll(0 , window.top)
           }
           if ( data.value == -3 ) {
            alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            User Exist with Entered user name ...
            </div> `
            window.scroll(0 , window.top)
        }
            
            if ( data.value == -4 ) {
                alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                User Exist with Entered user Email Id ...
                </div> `
                window.scroll(0 , window.top)
            }if ( data.value == 0 ){
                auth = data.authtoken ;
                localStorage.setItem("auth_token" , auth)
                const winurl = window.location.href ;
            let length = winurl.length ;
            window.location.replace(`${winurl.substring(0,length-20)}index.html`);
                // window.location.replace("http://127.0.0.1:5500/frontend_new/index.html");
            }
        
     }).catch(err=>{
        console.log(err);
     })
}else {
    console.log("password must be same ");
        alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        Password and Confirm Password must be same ...
        </div> `
}
}


submit_btn_signin.addEventListener("click" , signup);


// module.exports = auth ;





