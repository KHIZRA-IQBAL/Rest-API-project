const getusername = document.querySelector('#user') as HTMLInputElement;
const formSubmit = document.querySelector('.form') as HTMLFormElement;
const main_container = document.querySelector(".main_container") as HTMLElement;


interface UserData {
    id: number;
    login: string;
    avatar_url: string;
    url: string;
}

//reusable func

async function myCustomFetcher<T>(url: string, option?: RequestInit): Promise<T> {
    const response = await fetch(url, option)
    if (!response.ok === true) {
        throw new Error(
        `Network response was not ok - status:${response.status}`)
    }
     const data= await response.json();
     return data;
}

//for individual structure
const showResultUI=(singleuser:UserData)=>{
    const {login,avatar_url,url}=singleuser;
   main_container.insertAdjacentHTML(
    "beforeend",
    `<div   class="card">
    <img src=${avatar_url} alt=${login}/>
    <hr />
    <div   class="card-footer">
    <img src="${avatar_url}" alt="${login}"/>
    <a href="${url}">Github</a>
    </div>
    </div>
    `
   )
   
}

//defualt function

function fetchuserdata(url: string) {
    myCustomFetcher<UserData[]>(url, {}).then((userinfo)=>{
       for( const singleuser of userinfo ){
        showResultUI(singleuser)
        console.log("login"+ singleuser.login);
        
       }
    });
}

//defualt function call
fetchuserdata('https://api.github.com/users');


// let perform search functionality
formSubmit.addEventListener('submit', async (e)=>{
  e.preventDefault();

  const searchTerm=getusername.value.toLowerCase();


try {
    const url='https://api.github.com/users';

    const alluserdata=await  myCustomFetcher<UserData[]>(url,{});

    const matchingUsers=alluserdata.filter((user)=>{
            return user.login.toLowerCase().includes(searchTerm);
    });

    //we  need to clear previous data
    main_container.innerHTML="";

    if(matchingUsers.length===0){
        main_container?.insertAdjacentHTML(
            "beforeend",
            `<p class="empty-msg">No matching users found. </p>`
        );
    }else{
        for(const singleUser of matchingUsers){
            showResultUI(singleUser);
        }
    }
}
 catch (error) {
    console.log(error);
    }

});





