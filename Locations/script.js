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
fetch("https://rickandmortyapi.com/api/location?page=" + page)
    .then(response => response.json())
    .then(data => CharacterSiteBuilder(data));

function CharacterSiteBuilder(locations) {
   // console.log(characters);

   var pageNumbers = document.getElementById("oldalszamok");    
  
   //First page button
   var li1 = document.createElement("li");
   var firstPage = document.createElement("a");
   
   li1.setAttribute("class","page-item")
   firstPage.setAttribute("class", "page-link");
   firstPage.setAttribute("href","/Rick_and_Morty_AJAX/Locations/index.html?page=1");
   firstPage.appendChild(document.createTextNode("First"));

   li1.appendChild(firstPage);
   pageNumbers.appendChild(li1);

   if (Number(page) == 0 && locations.info.pages >= 3)
   {
       min = 1;
       max = 3;        
   }
   else if(Number(page) == 0 && locations.info.pages < 3)
   {
       min = 1;
       max = locations.info.pages;  
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
       if(max > locations.info.pages)
       {
           max = locations.info.pages;
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
          a.setAttribute("href","/Rick_and_Morty_AJAX/Locations/index.html?page="+i)
          a.appendChild(document.createTextNode(i));
          
          li.appendChild(a);
          pageNumbers.appendChild(li);
      }
    
  
      //last page
      var li5 = document.createElement("li");
      var lastPage = document.createElement("a");
      li5.setAttribute("class","page-item ")
      
      lastPage.setAttribute("class", "page-link");
      lastPage.setAttribute("href","/Rick_and_Morty_AJAX/Locations/index.html?page=" + locations.info.pages);
      lastPage.appendChild(document.createTextNode("Last"));
  
      li5.appendChild(lastPage);
      pageNumbers.appendChild(li5);


    //Kártyák összerakása
    for (const location of locations.results) {
           //create the table element
           var tr = document.createElement("tr");
           var nameTd = document.createElement("td");
           var typeTd = document.createElement("td");
           var dimensionTd = document.createElement("td");
           var residentsTd = document.createElement("td");
   
           //fill the elements with data
   
           nameTd.appendChild(document.createTextNode(location.name));
           typeTd .appendChild(document.createTextNode(location.type));
           dimensionTd.appendChild(document.createTextNode(location.dimension));
           residentsTd.appendChild(document.createTextNode(location.residents.length));
   
           //fill the row
           tr.appendChild(nameTd);
           tr.appendChild(typeTd);
           tr.appendChild(dimensionTd);
           tr.appendChild(residentsTd);
   
           //fill the table
           torzs.appendChild(tr);
    }
}