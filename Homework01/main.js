const input = document.getElementById("todo-app__input");

var total_items = 0;
var TOTAL_REAL = 0;

var Todo_items = function(node,isComplete) {
    this.node = node;
    this.isComplete = false;
};

var todo_items = new Array();

function validate(event) {
    const element = event.target;
    const id = event.target.id;
    if(element.type === "checkbox") {
        if(element.checked) {
            todo_items[id].isComplete = true;
            console.log(todo_items[id].node + " " + todo_items[id].isComplete);
            var fontid = "font_" + id;
            console.log(fontid);
            var element_att = document.getElementById(fontid); 
            element_att.parentNode.style.textDecoration = "line-through";
            element.parentNode.style.opacity = 0.5;
        }
        else {
            var fontid = "font_" + id;
            // console.log(fontid);
            var element_att = document.getElementById(fontid); 
            element_att.parentNode.style.textDecoration = "none";
            element.parentNode.style.opacity = 1;
            todo_items[id].isComplete = false;
        }
    }
}

function remove(event) {
    const id = event.target.parentNode.id;
    var x = document.getElementById(id);
    x.parentNode.removeChild(x);
    todo_items.splice(id, 1);
    TOTAL_REAL--;

    //update the total items
    todoCount = document.getElementById("todo-app__total");
    todoCount.innerHTML = todo_items.filter(element => !element.isComplete).length;
    console.log('total after removal = ' + TOTAL_REAL);
}

input.addEventListener("keyup", event => {
    if((event.which == 13 || event.keyCode == 13) && event.target.value !== '') {
        //create todo item whose content is the entered string
        var tmp = new Todo_items(event.target.value, false);
     
        todo_items[total_items] = tmp;

        var ul = document.getElementById("todo-list");
        var listItem = document.createElement("LI");
        listItem.setAttribute("class","todo-app__item");
        listItem.setAttribute("id","list_" + total_items);

        //the checkbox
        var div_checkBox = document.createElement("DIV");
        div_checkBox.setAttribute("class","todo-app__checkbox");
        var input_checkBox = document.createElement("INPUT");
        input_checkBox.setAttribute("id",total_items);
        input_checkBox.type='checkbox';
        input_checkBox.setAttribute("onclick","validate(event)");
        // input_checkBox.setAttribute("type", "checkbox");
        
        div_checkBox.appendChild(input_checkBox);

        var label_checkBox = document.createElement("LABEL");
        label_checkBox.setAttribute("for",total_items);
        //append input checkbox to the div to do app 
        div_checkBox.appendChild(label_checkBox);
        

        //name
        var font_items = document.createElement("H1");
        font_items.setAttribute("class","todo-app__item-detail");
        font_items.setAttribute("id", "font_" + total_items);
        var text = document.createTextNode(event.target.value);
        font_items.appendChild(text);

        //img x
        var img_items = document.createElement("IMG");

        img_items.src = "img/x.png";
        img_items.setAttribute("class","todo-app__item-x");
        img_items.setAttribute("id", "todo-app__item-x");
        img_items.setAttribute("onclick","remove(event)");

        //append to listItem
        listItem.appendChild(div_checkBox);
        listItem.appendChild(font_items);
        listItem.appendChild(img_items);
        ul.appendChild(listItem);
        
        total_items++;
        TOTAL_REAL++;
        console.log('total items after adding = ' + TOTAL_REAL);
        //update the total items
        todoCount = document.getElementById("todo-app__total");
        todoCount.innerHTML = todo_items.filter(element => !element.isComplete).length;
        input.value = "";
       
    }
    else return false;
});

// var ulElement = document.getElementById("todo-list");
// function ShowAll() {
//     var x = ulElement.querySelectorAll("li");
//     for(var i = 0; i < x.length; i++) {
//         x[i].classList.remove("hide");
//     }
//     todoCount = document.getElementById("todo-app__total");
//     todoCount.innerHTML = todo_items.length;
//     console.log('total in showall = ' + TOTAL_REAL);
// }
// function ActiveButton() {
//     var x = ulElement.querySelectorAll("li");
//     // for(var i = 0; i < x.length; i++) {
//     //     // x[i].classList.add("hide");
//     //     x[i].style.display = "none";
//     // }
    
//     for(var i = 0; i < x.length; i++) {
//         var id = "list_" + i;
//         var y = document.getElementById(id);
//         if(todo_items[i].isComplete == true) {
//             y.classList.add("hide");
//         }
//         else {
//             y.classList.remove("hide");
//         }
//    }
//     todoCount = document.getElementById("todo-app__total");
//     todoCount.innerHTML = todo_items.filter(element => !element.isComplete).length;
// }

// function CompletedButton() {
//     var x = ulElement.querySelectorAll("li");
//     // for(var i = 0; i < x.length; i++) {
//     //     // x[i].classList.add("hide");
//     //     x[i].style.display = "none";
//     // }

//     for(var i = 0; i < x.length; i++) {
//         var id = "list_" + i;
//         var y = document.getElementById(id);
//         if(todo_items[i].isComplete == false) {
//             y.classList.add("hide");
//         }
//         else {
//             y.classList.remove("hide");
//         }
//     }
//     todoCount = document.getElementById("todo-app__total");
//     todoCount.innerHTML = todo_items.filter(element => element.isComplete == true).length;
// }

// function ClearCompleted() {
//     var x = ulElement.querySelectorAll("li");
//     for(var i = 0; i < x.length; i++) {
//         x[i].classList.remove("hide");
//     }

//     for(var i = 0; i < x.length; i++) {
//         var id = "list_" + i;
//         var y = document.getElementById(id);
//         if(todo_items[i].isComplete == true) {
            
//             y.parentNode.removeChild(y);
//             todo_items.splice(i, 1);
//             TOTAL_REAL--;
//         } 
//     }
//     console.log('clear complted total remaining = ' + TOTAL_REAL);
//     //update the total items
//     todoCount = document.getElementById("todo-app__total");
//     todoCount.innerHTML = TOTAL_REAL;
// }



