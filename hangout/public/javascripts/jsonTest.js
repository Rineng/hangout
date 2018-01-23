var btn = document.getElementById("btn");
var cardElement = document.getElementById("cardElement");
var body = document.getElementsByTagName("body");

var userListData = [];

// $(document).ready(function(){
//     $.getJSON('', function(data){
//         $.each(data, function(){
//             var p = document.createElement('p');
//             p.innerHTML = data.username;
//             console.log(data.username);
//             //$('loadText').appendChild()
//         });
//     });
// });



// btn.addEventListener("click", function(){
//     //var file = req.params.jsonfile;
//     var ourRequest = new XMLHttpRequest();
//     ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');
//     ourRequest.onload = function(){
//         var ourData = JSON.parse(ourRequest.responseText);
// //        renderHTML(ourData);
//         renderCard();
//     };
//     ourRequest.send();
// });

function renderCard(){
    var div = document.createElement('div');
    div.className = 'card-body';
    var text = document.createElement('p');
    text.innerHTML = "rendered text";
    cardElement.appendChild(div);
    div.appendChild(text);

};
