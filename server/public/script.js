


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signup-admin").addEventListener("click", signUpAdmin);
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signup-user").addEventListener("click", signUpUser);
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signin-admin").addEventListener("click", signInAdmin);
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signin-user").addEventListener("click", signInUser);
});




async function signUpAdmin()
{
    const email=document.getElementById('signup-email').value;
    const password=document.getElementById('signup-password').value;
    const firstName=document.getElementById('signup-first-name').value;
    const lastName=document.getElementById('signup-last-name').value;

    await axios.post("http://localhost:3000/admin/signup",{
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName

    })

    alert("You are signup as admin");

}


async function signInAdmin()
{
    const email=document.getElementById('signin-email').value;
    const password= document.getElementById('signin-password').value;


    const responce= await axios.post("http://localhost:3000/admin/signin",{
        email:email,
        password:password


    })

    localStorage.setItem("token", responce.data.token);

    alert("You are signin as admin");

    window.location.href = "admin.html";




}


async function signUpUser()
{
    const email=document.getElementById('signup-email').value;
    const password=document.getElementById('signup-password').value;
    const firstName=document.getElementById('signup-first-name').value;
    const lastName=document.getElementById('signup-last-name').value;

    await axios.post("http://localhost:3000/user/signup",{
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName

    })

    alert("You are signup as user");

}


async function signInUser()
{
    const email=document.getElementById('signin-email').value;
    const password= document.getElementById('signin-password').value;


    const responce= await axios.post("http://localhost:3000/user/signin",{
        email:email,
        password:password


    })

    localStorage.setItem("token", responce.data.token);

    alert("You are signin as user");

    window.location.href = "user.html";




}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("course-button").addEventListener("click", createCourse);
});

async function createCourse(){

    const title=document.getElementById('course-title').value;
    const description=document.getElementById('course-description').value;
    const price=document.getElementById('course-price').value;
    const imageUrl=document.getElementById('course-url').value;

    const token= localStorage.getItem("token");

    console.log("Before");
    if(token)
    {
        const response= await axios.post("http://localhost:3000/admin/course",{
            title:title,
            description:description,
            price:price,
            imageUrl:imageUrl
    
        },
        {
            headers: {
               token:token,
            },
        }
       
    );

    const courseId=response.data.courseId;

    appendCourse(title,description,price,imageUrl,courseId);

    alert("course created sucessfully");

    console.log(response.data.courseId);




    }
    else
    { 
        alert("You are logged out ,so log in first");
    }
    
    


    console.log("after");


   




    


}


function appendCourse(title,description,price,imageUrl,courseId){

    const mainDiv= document.getElementById('courses');

    const newDiv = document.createElement("div");
    newDiv.setAttribute("class",`course-${courseId}`);

    const newDiv1= document.createElement("div");
    newDiv1.textContent=`title:${title}`;

    const newDiv2= document.createElement("div");
    newDiv2.textContent=`description:${description}`;

    const newDiv3= document.createElement("div");
    newDiv3.textContent=`price:${price}`;

    const newDiv4= document.createElement("div");
    newDiv4.textContent=`imageUrl:${imageUrl}`;

    newDiv.appendChild(newDiv1);
    newDiv.appendChild(newDiv2);
    newDiv.appendChild(newDiv3);
    newDiv.appendChild(newDiv4);

    mainDiv.appendChild(newDiv);





}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("getCourses").addEventListener("click", fetchCourses);
});
async function fetchCourses(){

    const token= localStorage.getItem("token");

    if(!token)
    {
        alert("You are not signed in");
        return ;

    }

    try{

        const responce= await axios.get("http://localhost:3000/admin/course/bulk",{
            headers:{
                token:token
            }
        })


        console.log("course conte t",responce.data);

        const courseContainer= document.getElementById('courses');

        courseContainer.innerHTML="";
        responce.data.courses.forEach(courses=>{
            appendCourse(course.title, course.description, course.price, course.imageUrl, course._id);
        });

    
            
        

    }
    catch(error)
    {
        alert("error occured");

    }
    

}


