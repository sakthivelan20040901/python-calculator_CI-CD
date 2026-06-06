async function login() {

    try {

        const response =
            await fetch("/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email:
                        document.getElementById("email").value,

                    password:
                        document.getElementById("password").value

                })

            });

        const data =
            await response.json();

        if (data.token) {

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "userId",
                data.user.id
            );

            localStorage.setItem(
                "username",
                data.user.username
            );

            showToast(
                `Welcome ${data.user.username}!`
            );

            setTimeout(() => {

                window.location = "/";

            }, 1000);

        } else {

            alert(
                data.error || "Login Failed"
            );

        }

    } catch (err) {

        console.error(err);

        alert(
            "Unable to connect to server"
        );

    }
}

function showToast(message) {

    let toast =
        document.getElementById("toast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.background = "#131921";
        toast.style.color = "white";
        toast.style.padding = "15px 20px";
        toast.style.borderRadius = "8px";
        toast.style.zIndex = "9999";

        document.body.appendChild(toast);
    }

    toast.innerText = message;

    setTimeout(() => {

        toast.remove();

    }, 2500);
}