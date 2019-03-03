var images = new Array(3);
images[0]="./images/burger01.jpg";
images[1]="./images/noodle01.jpg";
images[2]="./images/pizza01.jpg";
console.log(images[0])
var i = 1;
function view(increment){
   //i為目前位置，increment=1為下一張圖片，increment=-1為上一張圖片
    if (i+increment>=0 && i+increment<images.length){
        i=i+increment;
        document.getElementById("pic").innerHTML= "<img src=\""+images[i]+ "\" height=\"550px\" width=\"600px\"> ";
      
        if (i==0){
            document.getElementById("back").style.opacity="0.2";
        }
        else if (i==images.length-1){
            document.getElementById("next").style.opacity="0.2";
        }
        else{
            document.getElementById("back").style.opacity="1";
            document.getElementById("next").style.opacity="1";
           
        }
 
    }
}
