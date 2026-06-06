async function signup(){

    const response =
        await fetch("/signup",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                username:
                    document.getElementById("username").value,

                email:
                    document.getElementById("email").value,

                password:
                    document.getElementById("password").value
            })
        });

    const data =
        await response.json();

    if(data.success){

        alert("Account created");

        window.location =
            "login.html";
    }
}
