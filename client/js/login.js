if (!localStorage.getItem("authToken") && !window.location.href.includes("login.html")) {
    window.location.href = "http://127.0.0.1:5500/client/pages/login.html"
}
const token = localStorage.getItem("authToken")

function connexion_clicked(x){
    var id = document.getElementById("id").value
    var password = document.getElementById("password").value

    console.log("Connexion : id : ", id, " password : ", password)
    
    axios.post("http://localhost:8000/login", {
        id : id,
        password : password
    })
    .then(response => {
        localStorage.setItem("authToken", response.data.token)
        window.location.href="http://127.0.0.1:5500/client/pages/index.html"
    })
    .catch(error => {
        if (error.response && error.response.status === 401){
            alert("Identifiants incorect")
        }
        console.log("Erreur :", error)
    })
}