var count = 0

       function login(){

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        if (email == "raferb03@gmail.com" && password == "britney123"){
            window.location.href ="shopHomePage.html";
            return true;
        }
        else{
            count++;
            if(count == 3){
                alert("Attempt Exceeded. Please try again later");
                document.getElementById("login").disabled = true;
                document.getElementById("email").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("email").value = null;
                document.getElementById("password").value = null;
                return false;
            }
            else{
            alert("Incorrect Email or Password.");
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            return false;
            }
        }
    }
