var Todo_items = function(node,isComplete) {
    this.node = node;
    this.isComplete = false;
};

var Queue = function() {
    this.items = [];
    
    this.isEmpty = function() {
        return (this.items.length == 0);
    }

    this.enqueue = function(data) {
        return this.items.push(data);
    }

    this.dequeue = function() {
        return this.items.shift();
    }

    this.front = function() {
        return this.items[0];
    }

    this.size = function() {
        return this.items.length;
    }
};
// queue is for id record
var total_item = 0;
var used_id = 0;
var todo_items = new Array();
// var QueueID = new Queue();
const input = document.getElementById("todo-input");

function EditTODOCount(now) {
    var todoCount = document.getElementById("todo-count");
    todoCount.innerHTML = now;
}

function DeleteItem(event) {
    console.log('delete id = ' + event.id);
    const eventli = event.parentNode;
    // console.log(event.parentNode);
    var start = event.id;
    // QueueID.enqueue(event.id);
    eventli.parentNode.removeChild(eventli);
    total_item = total_item - 1;

    EditTODOCount(total_item);
}

function CheckBOX(event) {
    var check = 0;
    if(event.type === "checkbox") {
        if(event.checked) {
            // alert('checked');
            const parent = event.parentNode.parentNode.getElementsByTagName("H1")[0];
            parent.style["textDecoration"] = "line-through";
            parent.style["opacity"] = 0.5;
            check++;
        }
        else {
            const parent = event.parentNode.parentNode.getElementsByTagName("H1")[0];
            parent.style["textDecoration"] = "line-through";
            parent.style["opacity"] = 1;
        }
    }

    //update total_item
    EditTODOCount(total_item - check);
}


input.addEventListener('keyup', event => {
    event.preventDefault();
    if(event.keyCode == 13 && event.target.value !== '') {

        //build the li element
        const ul = document.getElementById("todo-list");
        const li = document.createElement("LI");
        const checkbox = document.createElement("DIV");
        const input_checkBox = document.createElement("INPUT");
        const label = document.createElement("LABEL");
        const h1 = document.createElement("H1");
        const img = document.createElement("IMG");

        li.setAttribute("class","todo-app__item");
        checkbox.setAttribute("class","todo-app__checkbox");
        input_checkBox.setAttribute("id",total_item);    //edit
        input_checkBox.type = "checkbox";
        input_checkBox.setAttribute("onclick","CheckBOX(this)");
        label.setAttribute("for",total_item);   //edit
        h1.setAttribute("class","todo-app__item-detail");
        h1.setAttribute("id","todo-item-detail")
        h1.appendChild(document.createTextNode(event.target.value));
        img.src ="./img/x.png";
        img.setAttribute("class","todo-app__item-x");
        img.setAttribute("id",total_item);
        img.setAttribute("onclick","DeleteItem(this)");

        checkbox.appendChild(input_checkBox);
        checkbox.appendChild(label);
        li.appendChild(checkbox);
        li.appendChild(h1);
        li.appendChild(img);
        ul.appendChild(li);


        //update total_item
        total_item = total_item + 1;
        var x = ulElement.querySelectorAll("li");
        EditTODOCount(total_item);

        input.value = '';
    }
    else return false;
});

const ulElement = document.getElementById("todo-list");

function AllBtn() {
    var x = ulElement.querySelectorAll("li");
    for(var i = 0; i < x.length; i++) {
        x[i].classList.remove("hide");
    }
    EditTODOCount(x.length);
}

function ActiveBtn() {
    // alert('active');
    var active = 0;
    var x = ulElement.querySelectorAll("li");
    for(var i = 0; i < x.length; i++) {
        var y = x[i].getElementsByTagName("INPUT")[0];
        console.log(y + " " + y.checked);
        if(y.checked == true) {
            x[i].classList.add("hide");
        } else {
            x[i].classList.remove("hide");
            active++;
        }
    }
    EditTODOCount(active);
}

function CompletedBtn() {
    var completed = 0;
    var x = ulElement.querySelectorAll("li");
    for(var i = 0; i < x.length; i++) {
        var y = x[i].getElementsByTagName("INPUT")[0];
        if(y.checked == true) {
            x[i].classList.remove("hide");
            completed++;
        } else x[i].classList.add("hide");
    }
    EditTODOCount(completed); 
}

function ClearAll() {
    var clear = 0;
    var x = ulElement.querySelectorAll("li");
    for(var i = 0; i < x.length; i++) {
        var y = x[i].getElementsByTagName("INPUT")[0];
        if(y.checked == true) {
            x[i].parentNode.removeChild(x[i]);
            clear++;
        }
    }
    EditTODOCount(total_item-clear); 
}
