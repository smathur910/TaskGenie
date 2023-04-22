
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
    databaseURL: "https://dailytodo-69340-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const todoDB = ref(database, "todoList")


let addItemFieldEl = document.getElementById("inputField");
let btnAddEl = document.getElementById("addItemBtn");
let todoListEl = document.getElementById("todo-list");



btnAddEl.addEventListener("click", function(){
    let adValue = addItemFieldEl.value;
    push(todoDB, adValue);

    clearInput()

    // appendItemToList(adValue)
    // console.log(adValue);
})

onValue(todoDB, function(snapshot){

    if(snapshot.exists()){
        let todoArray = Object.entries(snapshot.val())

        clearlistEl()
    
        for(let i =0; i < todoArray.length; i++){
            let currentItem = todoArray[i]
            let currentItemId = currentItem[0]
            let currentItemValues = currentItem[1]
    
            // console.log(currentItem)
            appendItemToList( currentItem )
           
        }
    }else{
        todoListEl.innerHTML += "<li>No items here</li>"
    }
    
})


function clearInput(){
    addItemFieldEl.value = "";
 }

 function appendItemToList(item){
    let itemId = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.setAttribute("class", "todoItem");

    newEl.textContent = itemValue

    // console.log(itemId)

    todoListEl.append(newEl)

    let deletElCon = document.createElement("span");
    deletElCon.setAttribute("id", itemId);
    deletElCon.innerHTML  += '<span class="delete"><i class="fa-solid fa-xmark"></i></span>'
   
    newEl.appendChild(deletElCon)

    newEl.addEventListener("click", function(){
        
        var elem = document.getElementsByClassName('todoItem'); 

        for (let i = 0; i < elem.length; i++) { 
            elem[i].style.textDecoration = "line-through";
        }  
    })
   
    let deleteItemBtn = document.getElementById(itemId)
    deleteItemBtn.addEventListener("click", function(){
        // console.log(itemId)
        let idLocationItem = ref(database, `todoList/${itemId}`)
        remove(idLocationItem)

    })
 }

 function clearlistEl(){
    todoListEl.innerHTML = "";
 }

