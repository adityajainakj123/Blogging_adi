const title = document.getElementById('add_title');
const tag = document.getElementById('add_category');
const description = document.getElementById('add_description');

const add_blog_btn = document.getElementById('add_blog');


    
const addurl = 'http://localhost:5000/api/blogs/addblog' ;
const alert = document.getElementById('alert');
const addblog_local = async(e)=>{
    e.preventDefault()

    const queryString = window.location.search; 
const user_name = queryString.substring(1);
    var value = tag.options[tag.selectedIndex].value;


    const object = {
        "title":`${title.value}`,
        "tag":`${value}`,
        "description":`${description.value}`,
        "name":`${user_name}`
    }
    await fetch ( addurl , {
        method:'POST',
        headers:{
              "Content-Type":"application/json"
        },
        mode:"cors",
        body:JSON.stringify(object)
    }).then(async (res)=>{
        const data =await res.json();
        console.log(data);
        if ( data.value === 0 ) {
            const winurl = window.location.href ;
            let length = winurl.length ;
            window.location.replace(`${winurl.substring(0,length-20)}user_profile.html`);
        }
        else if (data.value===-1) {
            alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            Server error . Visit after some Time
            </div> `
        }else {
            alert.innerHTML = `<div class="alert" ><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            Please Enter Valid Title & Description
            </div> `
        }
    }).catch(err=>{
        console.log(err);
    })
}
   

add_blog_btn.addEventListener("click" , addblog_local);






