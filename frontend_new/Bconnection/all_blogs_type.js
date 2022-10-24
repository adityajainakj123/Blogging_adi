
const baseurl = 'http://localhost:5000/api/blogs/blogs/' ;

const tag_blog = document.getElementById('tag_blog');
const all_blogs = async ()=>{
    const queryString = window.location.search; 
console.log(queryString);
category = queryString.substring(1);
tag_blog.innerHTML = category ;
    // console.log(value);
    await fetch ( baseurl + `${category}` , {
        method:'GET',
    }).then(async(res)=>{
         const data = await res.json();
         console.log(data);
         data.forEach(showblogs);
    }).catch(err=>{
        console.log(err);
    })
}
all_blogs();

const vlogs = document.getElementById('vlogs')
function showblogs(item) {
    let desc = item.description.substring(0,25);
    let str = '   .........';
    desc = desc + str ;
     let prev = vlogs.innerHTML ;
     let data = ` <div class="card card1">
     <div class="container">
         
     </div>
     <div class="details">
       <h3><b>${item.tag}</b></h3>
       <h3>${item.title}</h3>
       <p>${desc}</p>
       <div class="nav-link contact-link">
                   <a href="read_blog.html?${item.id}" class="btn" style="float: right;">Read More</a>
                 </div>
     </div>
 </div>`
   vlogs.innerHTML = prev + data ;
}




