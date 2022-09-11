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
var page = urlParams.get("page");
fetch("https://rickandmortyapi.com/api/character?page=" + page)
    .then(response => response.json())
    .then(data => CharacterSiteBuilder(data));

function CharacterSiteBuilder(characters) {
    //console.log(characters.info.pages);
    //Oldalszámok kiírása
    var pageNumbers = document.getElementById("oldalszamok");    
  
    //First page button
    var li1 = document.createElement("li");
    var firstPage = document.createElement("a");
    
    li1.setAttribute("class","page-item")
    firstPage.setAttribute("class", "page-link");
    firstPage.setAttribute("href","/Rick_and_Morty_AJAX/Characters/index.html?page=1");
    firstPage.appendChild(document.createTextNode("First"));

    li1.appendChild(firstPage);
    pageNumbers.appendChild(li1);

    if (Number(page) == 0 && characters.info.pages >= 3)
    {
        min = 1;
        max = 3;        
    }
    else if(Number(page) == 0 && characters.info.pages < 3)
    {
        min = 1;
        max = characters.info.pages;  
    }
    else
    {
        var min = Number(page) -1;
        var max = Number(page) +1;

        if(min < 1)
        {
            min = 1;
            max++;
        }
        if(max > characters.info.pages)
        {
            max = characters.info.pages;
            min--;
        }
    }

    // page numbers
    for (let i = min; i <= max; i++)
    {
        
        var li = document.createElement("li");
        var a = document.createElement("a");

        li.setAttribute("class","page-item");
        a.setAttribute("class","page-link");
        a.setAttribute("href","/Rick_and_Morty_AJAX/Characters/index.html?page="+i)
        a.appendChild(document.createTextNode(i));
        
        li.appendChild(a);
        pageNumbers.appendChild(li);
    }
  

    //last page

    var li5 = document.createElement("li");
    var lastPage = document.createElement("a");
    li5.setAttribute("class","page-item ")
    
    lastPage.setAttribute("class", "page-link");
    lastPage.setAttribute("href","/Rick_and_Morty_AJAX/Characters/index.html?page=" + characters.info.pages);
    lastPage.appendChild(document.createTextNode("Last"));

    li5.appendChild(lastPage);
    pageNumbers.appendChild(li5);

        

    //Kártyák összerakása
    for (const character of characters.results) {
        //console.log(character);
        var col = document.createElement("div");
        col.setAttribute("class", "col-12 col-md-6 col-lg-4 col-xl-3 mb-4");
        
        var characterLink = document.createElement("a");
        characterLink.setAttribute("class","page-link");
        characterLink.setAttribute("href","/Rick_and_Morty_AJAX/singleCharacter/index.html?character=" + character.id); 
        var divCard = document.createElement("div");
        divCard.setAttribute("class", "card h-100 w-100");
        divCard.setAttribute("style", "width: 18rem");

        var img = document.createElement("img");
        img.setAttribute("src", character.image);
        img.setAttribute("class", "card-img-top w-100");
        img.setAttribute("id","img")
        img.setAttribute("alt", character.name);

        var divBody = document.createElement("div");
        divBody.setAttribute("class", "card-body");
        divBody.setAttribute("style","background-color: rgb(218, 206, 206);")

        var h4 = document.createElement("h4");
        h4.setAttribute("class", "card-title");
        h4.appendChild(document.createTextNode(character.name));

        /*var ul = document.createElement("ul");

        var liStatus = document.createElement("li");
        var liSpecies = document.createElement("li");
        var liType = document.createElement("li");
        var liGender = document.createElement("li");
        var liLocation = document.createElement("li");
        var liAppear = document.createElement("li");
        
        liSpecies.appendChild(document.createTextNode(character.species));
        liStatus.appendChild(document.createTextNode(character.status));
        liType.appendChild(document.createTextNode((character.type == "")? "-" : character.type));
        liGender.appendChild(document.createTextNode(character.gender));
        liLocation.appendChild(document.createTextNode(character.location.name));

        var xhr = new XMLHttpRequest();
        xhr.open("GET", character.episode[0], false);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                liAppear.appendChild(document.createTextNode(
                    JSON.parse(xhr.responseText).name
                ));
            }
        };
        xhr.send(null);*/

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

        h4.setAttribute("style", "color: " + color + "; text-align: center");
       // h5.setAttribute("style", "text-align: center");

        divBody.appendChild(h4);
       /* divBody.appendChild(liStatus);
        divBody.appendChild(liSpecies);
        divBody.appendChild(liType);
        divBody.appendChild(liGender);
        divBody.appendChild(liLocation);
        divBody.appendChild(liAppear); */

        divCard.appendChild(img);
        divCard.appendChild(divBody);
        characterLink.appendChild(divCard);
        col.appendChild(characterLink);
        document.getElementById("card").appendChild(col);
    }
}