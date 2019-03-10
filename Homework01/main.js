const input = document.getElementById("todo-app__input");

var Todo_items = function(node,id,isComplete) {
    this.node = node;
    this.id = id;
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

var used_id = 0;
var total_item = 0;
var QueueID = new Queue();
var todo_items = new Array();

function validate(event) {
    const element = event.target;
    var id = event.target.id;
    console.log('in validate id = ' + id);
    if(element.type === "checkbox") {
        if(element.checked) {
            todo_items[id].isComplete = true;
            var fontid = "font_" + id;
            console.log('in validate fontid = ' + fontid);
            var element_att = document.getElementById(fontid); 
            element_att.parentNode.style.textDecoration = "line-through";
            element.parentNode.style.opacity = 0.5;
            // console.log('in checkbox = ' + fontid + " " + todo_items[id].isComplete);
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
    // console.log('id = ' + id);
    //parse the id and get the number only
    var num = id.match(/\d/g);
    // console.log('num = ' + num);

    var x = document.getElementById(id);
    x.parentNode.removeChild(x);
    todo_items.splice(num, 1);

    QueueID.enqueue(num);
    // console.log('before remove = ' + total_item);
    total_item--;
    // console.log('after remove = ' + total_item);

    //update the total items
    todoCount = document.getElementById("todo-app__total");
    todoCount.innerHTML = total_item;
}

input.addEventListener("keyup", event => {
    if((event.which == 13 || event.keyCode == 13) && event.target.value !== '') {
        //create todo item whose content is the entered string
        if(QueueID.isEmpty() == true) {
            used_id = total_item;
        }
        else {
            used_id = QueueID.front();
            QueueID.dequeue();
        }     
        
        console.log("TEXT = " + event.target.value);
        console.log('input used_id = ' + used_id);

        var tmp = new Todo_items(event.target.value,used_id,false);
        todo_items[total_item] = tmp;

        var ul = document.getElementById("todo-list");
        var listItem = document.createElement("LI");
        listItem.setAttribute("class","todo-app__item");
        listItem.setAttribute("id","list_" + used_id);

        //the checkbox
        var div_checkBox = document.createElement("DIV");
        div_checkBox.setAttribute("class","todo-app__checkbox");
        var input_checkBox = document.createElement("INPUT");
        input_checkBox.setAttribute("id",used_id);
        input_checkBox.type='checkbox';
        input_checkBox.setAttribute("onclick","validate(event)");
        // input_checkBox.setAttribute("type", "checkbox");
        
        div_checkBox.appendChild(input_checkBox);

        var label_checkBox = document.createElement("LABEL");
        label_checkBox.setAttribute("for",used_id);
        //append input checkbox to the div to do app 
        div_checkBox.appendChild(label_checkBox);
        
        //name
        var font_items = document.createElement("H1");
        font_items.setAttribute("class","todo-app__item-detail");
        font_items.setAttribute("id", "font_" + used_id);
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
        
        total_item++;
        console.log('total items after adding = ' + total_item);

        //update the total items
        todoCount = document.getElementById("todo-app__total");
        // todoCount.innerHTML = todo_items.filter(element => !element.isComplete).length;
        todoCount.innerHTML = total_item;
        input.value = "";
       
    }
    else return false;
});

var ulElement = document.getElementById("todo-list");
function ShowAll() {
    var x = ulElement.querySelectorAll("li");
    for(var i = 0; i < x.length; i++) {
        x[i].classList.remove("hide");
    }
    todoCount = document.getElementById("todo-app__total");
    todoCount.innerHTML = todo_items.length;
    // console.log('total in showall = ' + total_item);
}

function ActiveButton() {
    var x = ulElement.querySelectorAll("li");
    // console.log('in active length = ' + x.length);
    
    ShowAll();

    for(var i = 0; i < x.length; i++) {
        var y = document.getElementById("list_" + todo_items[i].id);
        if(todo_items[i].isComplete == true) {
            y.classList.add("hide");
        }
    }
    todoCount = document.getElementById("todo-app__total");
    todoCount.innerHTML = todo_items.filter(element => !element.isComplete).length;
}

function CompletedButton() {
    var x = ulElement.querySelectorAll("li");
    // console.log('in complete length = ' + x.length);

    ShowAll();

    for(var i = 0; i < x.length; i++) {
        var y = document.getElementById("list_" + todo_items[i].id);
        if(todo_items[i].isComplete === false) {
            y.classList.add("hide");
        }
    }
    todoCount = document.getElementById("todo-app__total");
    todoCount.innerHTML = todo_items.filter(element => element.isComplete).length;
}

function ClearCompleted() {
    var filter = function(element) {
        return element.isComplete == true;
    }
    var x = ulElement.querySelectorAll("li");
    // console.log('in clear length = ' + x.length);

    var removing = new Array();
    var count = 0;
    for(var i = 0; i < x.length; i++) {
        if(todo_items[i].isComplete === true) {
            // console.log(i);
            removing[count] = todo_items[i].id;
            QueueID.enqueue(removing[count]);
            total_item--;
            count++;
        }
    }

    for(var j = 0; j < count; j++) {
        var id = "list_" + removing[j]; 
        var y = document.getElementById(id);
        y.parentNode.removeChild(y);
        todo_items.splice(removing[j], 1);
    }

    //update the total items
    todoCount = document.getElementById("todo-app__total");
    todoCount.innerHTML = total_item;

}
