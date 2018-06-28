var globalVariable;
var arrayOfLinks = [];

document.getElementById("submit").onclick = addFeed;
document.getElementById("feedInput").style.display="none";
document.getElementById("NewFeed").onclick = showForm;

window.onload = function load() {
    var storedValue = localStorage.getItem("feed_urls");
    var content_array = JSON.parse(storedValue);
    var select = document.getElementById("dropdown");
    var url = content_array.map(a => a.url);
    var text = content_array.map(b => b.text);
    for (var i = 0; i < url.length; i++) {
        opt = document.createElement("option");
        opt.value = url[i];
        opt.textContent = text[i];
        select.appendChild(opt);
    }
}

function showForm() {
var x = document.getElementById("feedInput");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
var x = document.getElementById("NewFeed");
 if (x.value=="Add a New Feed") x.value = "Click to Add!";
    else x.value = "Add a New Feed";
    x.onclick = addFeed;
}


function addFeed() {
    var myURL2 = document.getElementById("myURL").value;
    var myName2 = document.getElementById("myName").value;
    var select = document.getElementById("dropdown");
    
    opt = document.createElement("option");
    opt.value = myURL2;
    opt.textContent = myName2;
    select.appendChild(opt);

    
    var x = document.getElementById("NewFeed");
        if (x.value=="Add a New Feed") x.value = "Click to Add!";
        else x.value = "Add a New Feed";
        x.onclick = showForm;
        
    var y = document.getElementById("feedInput");
        if (y.style.display === "none") {
            y.style.display = "block";
        } else {
            y.style.display = "none";
        }
    
    var existingEntries = JSON.parse(localStorage.getItem("feed_urls"));
    if(existingEntries == null) existingEntries = [];
    var entryURL = myURL2;
    var entryText = myName2;
    var entry = {
        "url": entryURL,
        "text": entryText
    };
    localStorage.setItem("entry", JSON.stringify(entry));
    existingEntries.push(entry);
    localStorage.setItem("feed_urls", JSON.stringify(existingEntries));
}


function changeHiddenInput(objDropDown) {
    console.log(objDropDown);
    var objHidden = document.getElementById("hiddenInput");
    objHidden.value = objDropDown.value;
    globalVariable = objHidden.value;
    console.log(globalVariable);
}
 
function loadFeed() {
    var url2= "https://api.rss2json.com/v1/api.json?rss_url=" + globalVariable;
    $.ajax({
    type: 'GET',
    url: url2,
    dataType: 'jsonp',
    success: function(data) {
      console.log(data.feed.description);    
      console.log(data);
      var obj=data.items
      var tbl=$("<table/>").attr("id","mytable");
      $("#div1").html(tbl);
      for(var i=0;i<obj.length;i++)
      {
        var tr="<tr>";
        var td1="<td>"+obj[i]["title"]+"</td>";
        var td2="<td>"+obj[i]["description"]+"</td>";
        var td3="<td>"+"<a href='"+ obj[i]["link"]+"'>"+obj[i]["link"]+"</a></td></tr>";

       $("#mytable").append(tr+td1+td2+td3); 

    }   
  }
})};
