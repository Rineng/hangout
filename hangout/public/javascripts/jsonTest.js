var info = document.getElementById("items");
var btn = document.getElementById("btn");


btn.addEventListener("click", function(){
    //var file = req.params.jsonfile;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'http://localhost:3000/hangout/' );
    ourRequest.onload = function(){
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.send();
});

function renderHTML(data){
	var htmlString = "this is a test";
	info.insertAdjacentHTML('beforeend', htmlString);
}