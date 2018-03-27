function setCookie(sName, sValue) {
        var today = new Date(), expires = new Date();
        expires.setTime(today.getTime() + (365*24*60*60*1000));
        document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString();
        console.log("Cookie enregisté");
}

function getCookie(sName) {
        var cookContent = document.cookie, cookEnd, i, j;
        var sName = sName + "=";

        for (i=0, c=cookContent.length; i<c; i++) {
                j = i + sName.length;
                if (cookContent.substring(i, j) == sName) {
                        cookEnd = cookContent.indexOf(";", j);
                        if (cookEnd == -1) {
                                cookEnd = cookContent.length;
                        }
                        return decodeURIComponent(cookContent.substring(j, cookEnd));
                        console.log("Cookie get");
                }
        }
        return null;
}

function connection(){
  var login = document.getElementById("login").value;
  var mdp = document.getElementById("mdp").value;

        var xmlhttp = new XMLHttpRequest();
        var url = "http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?connexion&login="+login+"&mdp="+mdp ;
        //var url = "file:///stockage.json";
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                compare(myArr);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        function compare(connect){
          console.log(connect);
          if(connect.erreur){
            console.log(connect.erreur);
          }else if(connect.resultat){
            if(connect.resultat == "OK"){
              console.log("vous êtes connecté")
              setCookie("connected", "true");
              document.location.href="http://localhost:3000"
            }
          }else{
            console.log("Erreur indéfinie (peut être n'êtes vous pas connecté a internet)");
          }
        }

  console.log(login);
  console.log(mdp);
}

function deconnect(){
  setCookie("connected", "false");
}


window.onload = function() {
  console.log(getCookie("connected"));
  var AreConnected = getCookie("connected");
  if (AreConnected == "true") {
    console.log(AreConnected);
    var content = document.getElementById("content");
    content.innerHTML = '<button type="button" onclick="deconnect();">Se Deonnecter</button>'
  }
};
