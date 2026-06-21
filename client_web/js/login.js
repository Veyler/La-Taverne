if (!localStorage.getItem("authToken") && !window.location.href.includes("login.html")) {
    window.location.href = "/pages/login.html"
}
const token = localStorage.getItem("authToken")

function connexion_clicked(x){
    var id = document.getElementById("id").value
    var password = document.getElementById("password").value

    console.log("Connexion : id : ", id, " password : ", password)
    
    axios.post("https://la-taverne-cjm6.onrender.com/login", {
        id : id,
        password : password
    })
    .then(response => {
        localStorage.setItem("authToken", response.data.token)
        window.location.href = "/pages/index.html"  
    })
    .catch(error => {
        if (error.response && error.response.status === 401){
            alert("Identifiants incorrect")
        }
        console.log("Erreur :", error)
    })
}