function connection(){
  var login = document.getElementById("login").value;
  var mdp = document.getElementById("mdp").value;

  /*const req = new XMLHttpRequest();
        req.open('GET', 'http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?connexion&login='+login+'&mdp='+mdp, true); // Replace 'my_data' with the path to your file
        req.send(null);
        console.log(req);
        var connection = JSON.parse(req.responseText);
        console.log(connection);*/
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
        }

  console.log(login);
  console.log(mdp);
}
