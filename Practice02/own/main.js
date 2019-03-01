var imgArray = new Array();
var source = new Array();
imgArray[0] = "images/pizza01.jpg";
imgArray[1] = "images/loading.gif";
imgArray[2] = "images/pizza02.jpg";
imgArray[3] = "images/pizza03.jpg";
imgArray[4] = "images/pizza04.jpg";

source[0] = "images/pizza01.jpg";
source[1] = "images/loading.gif";
source[2] = "images/pizza02.jpg";
source[3] = "images/pizza03.jpg";
source[4] = "images/pizza04.jpg";

var count = 1;

function View(i) {
  // var content = document.querySelectorAll(".image-viewer__main");
  var content = document.getElementById("main_img");
  var prevcount = count;
  count = count + i;

  if(count > imgArray.length) {
    // last image
    document.getElementById("nextbtn").classList.add("disabled");
    content.src = imgArray[imgArray.length-1];
  }
  else if(count < 1) {
    document.getElementById("prevbtn").classList.add("disabled");
    content.src = imgArray[0];
  }
  else {
    document.getElementById("prevbtn").classList.remove("disabled");
    document.getElementById("nextbtn").classList.remove("disabled");
    document.getElementById("prevbtn").classList.add("image-viewer__button");
    document.getElementById("nextbtn").classList.add("image-viewer__button");
    content.src = imgArray[count-1];

    // change one part of a sentence in source wrapper
    var str = document.getElementById("source").innerText;
    var sourcechange = str.replace(source[prevcount-1], source[count-1]);
    document.getElementById("source").innerHTML = sourcechange;


  }
}
