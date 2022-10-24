const querystring = window.location.search ;

const comm_id1 = querystring.substring(1);
const comm_id = parseInt(comm_id1);
const delete_commurl = 'http://localhost:5000/api/blogs/comment/delete_comment'
let token = localStorage.getItem("auth_token");
const deletecomment = async ()=>{
    console.log("akj")
    const object = {
        "id":comm_id
    }
    console.log(object , token);
      await fetch ( delete_commurl  ,{
        method:'DELETE' ,
        headers:{
            "Content-Type":"application/json",
            "auth-token":token,
        },
        body:JSON.stringify(object)
      }).then(async(res)=>{
        const data = res.json();
        console.log(data);
        const blog_id = localStorage.getItem("blog_id") ;
        const winurl = window.location.href ;
            let length = winurl.length ;
            window.location.replace(`${winurl.substring(0,length-21)}read_blog.html?${blog_id}`);
      }).catch(err=>{
        console.log(err);
      })
}

deletecomment();