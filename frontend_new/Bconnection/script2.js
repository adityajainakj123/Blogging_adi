// java script for login 
 const alert1 = document.getElementById('alert1');
const user_name = document.getElementById('user_name');
const login_password = document.getElementById('login_password')
const login_btn = document.getElementById('login_submit');
const login_url = 'http://localhost:5000/api/auth/login' ;
let auth ;
const login = async (e)=>{
    e.preventDefault();
    const log_object = {
        "user_name":user_name.value,
        "password":login_password.value
    };
    await fetch (login_url , {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(log_object)
    }).then(async (response) =>{
        const data = await response.json();
        console.log(data.message);
        if ( data.value === 0 ) {
          auth = data.authtoken ;
            localStorage.setItem("auth_token" , auth);
            const winurl = window.location.href ;
            let length = winurl.length ;
            window.location.replace(`${winurl.substring(0,length-18)}index.html`);
            // window.location.replace("http://127.0.0.1:5500/frontend_new/index.html");
        }else {
            alert1.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            ${data.message}
            </div> `
            window.scroll(0 , window.top)
        }
        
     }).catch(err=>{
        console.log(err);
     })
}

login_btn.addEventListener("click" , login);