var btn = document.getElementById("btn");
var cardElement = document.getElementById("cardElement");
var body = document.getElementsByTagName("body");

var userListData = [];

$(document).ready(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json', true);
    // xhr.setRequestHeader("Content-type", "application/json");
    // xhr.onreadystatechange = function(){
    //     if(xhr.readyState === 4 && xhr.status === 200){
    //         var json = JSON.parse(xhr.responseText);
    //         console.log(json.username);
    //     };
    // };
    // xhr.send();
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function(){
        var result = xhr.response;
        console.log(result);
    }

});

btn.addEventListener("click", function(){
    //var file = req.params.jsonfile;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');
    ourRequest.onload = function(){
        var ourData = JSON.parse(ourRequest.responseText);
//        renderHTML(ourData);
        renderCard(ourData.homeTown);
    };
    ourRequest.send();
});

function renderCard(inputValue){
    var div = document.createElement('div');
    div.className = 'card-body';
    var text = document.createElement('p');
    text.innerHTML = inputValue;
    cardElement.appendChild(div);
    div.appendChild(text);

};
