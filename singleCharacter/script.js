/*var xhr = new XMLHttpRequest();
xhr.open("GET","https://rickandmortyapi.com/api/character",true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == 4 && xhr.status == 200)
    {
        results = JSON.parse(xhr.responseText);
        Processing(results); 
    }
};
xhr.send(null);*/
var urlParams = new URLSearchParams(window.location.search);
var characterId = urlParams.get("character");
fetch("https://rickandmortyapi.com/api/character/" + characterId)
    .then(response => response.json())
    .then(data => CharacterSiteBuilder(data));

function CharacterSiteBuilder(character) {
    //console.log(characters.info.pages);

    //Kártyák összerakása
    var row = document.createElement("div");
    var imgDiv = document.createElement("div");
    var img = document.createElement("img");
    var textDiv = document.createElement("div");
    var cardBody = document.createElement("div");

    var h1 = document.createElement("h1");
    h1.setAttribute("class","pt-3");
    h1.setAttribute("style","text-align: center; text-decoration: underline;");
    h1.appendChild(document.createTextNode(character.name));
    cardBody.appendChild(h1);

    var listDiv = document.createElement("div");
    listDiv.setAttribute("class","mt-4");

    var h31 = document.createElement("h3");
    var h32 = document.createElement("h3");
    var h33 = document.createElement("h3");
    var h34 = document.createElement("h3");
    var h35 = document.createElement("h3");
    var h36 = document.createElement("h3");
    var h37 = document.createElement("h3");

    h31.appendChild(document.createTextNode("Status: "+ character.status));
    h32.appendChild(document.createTextNode("Species: "+ character.species));
    h33.appendChild(document.createTextNode("Type: "+ character.type));
    h34.appendChild(document.createTextNode("Gender: "+ character.gender));
    h35.appendChild(document.createTextNode("Origin: "+ character.origin.name));
    h36.appendChild(document.createTextNode("Location: "+ character.location.name));
    h37.appendChild(document.createTextNode("Episodes: "+ character.episode.length));

    listDiv.appendChild(h31);
    listDiv.appendChild(h32);
    listDiv.appendChild(h33);
    listDiv.appendChild(h34);
    listDiv.appendChild(h35);
    listDiv.appendChild(h36);
    listDiv.appendChild(h37);

    cardBody.appendChild(listDiv);

    row.setAttribute("class","row g-0");
    imgDiv.setAttribute("class","col-md-4")
    img.setAttribute("class","img h-100 w-100");
    img.setAttribute("src", character.image);
    textDiv.setAttribute("class","col-md-8");
    cardBody.setAttribute("class","card-body");

    imgDiv.appendChild(img);
    textDiv.appendChild(cardBody);
    row.appendChild(imgDiv);
    row.appendChild(textDiv);
    document.getElementById("card").appendChild(row);
    





        var color; 

        switch (character.status) {
            case "Alive":
                color = "green";
                break;
            case "Dead":
                color = "red";
                break;
            case "unknown":
                color = "blue";
                break;
            default:
                break;
        }
    }