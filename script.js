let count=0
let todoList=document.querySelector("ol")
let todos=[]
let todoTextArea=document.getElementById("todo")
loadPreviousSession()
showDefaultTextIfEmpty()
function loadPreviousSession(){
    todos=  localStorage.getItem('todos') || []
    count=  localStorage.getItem('count') || 0
    todos=JSON.parse(todos)
    console.log(todos)
    if (todos){
        todos.forEach(({id,text})=>{
            element='<li id='+id+'>'+text+'</li>'
            todoList.innerHTML+=element
            let todoItems=document.querySelectorAll("ol li")
            todoItems.forEach(item=>setTodoList(item))
        })
    }
}
function storeTodos(){
    console.log('storing')
    localStorage.setItem('todos',JSON.stringify(todos))
    localStorage.setItem('count',count)
}
function showDefaultTextIfEmpty(){
    text=document.querySelector('.info-text')
    if (!count){
        text.innerHTML=`<p>Click on the top bar and press Enter to add todo items, click on the item to edit and double click to delete</p>`
       
    }
    else{
        text.innerHTML=''
    }
}
function saveTodo(){
    // storeTodos()
    let todoText=todoTextArea.value
        if(todoText.length>0){
            id=count++
            element='<li id='+id+'>'+String(todoText).trim()+'</li>'
            todos.push({
                id:id,
                text:todoText.trim()
            })
            todoList.innerHTML+=element
            todoTextArea.value=""
            let todoItems=document.querySelectorAll("ol li")
            todoItems.forEach(setTodoList)
            storeTodos()  
        }
        
    showDefaultTextIfEmpty()
}
function setTodoList(item){
    item.setAttribute("contenteditable","false")
    item.onkeypress=function(){
      return event.keyCode!=13
    }
    item.ondblclick=deleteTodo.bind(item)
    item.onclick=editTodo.bind(item)
    }
function deleteTodo(items){
    let deletedItem=items.srcElement
    console.log({deletedItem})
    console.log(deletedItem.outerHTML)
    todos=todos.filter(todo=>todo.text!==deletedItem.innerText)
    console.log(
        {todos}
    )
    items.srcElement.parentNode.removeChild(deletedItem)
    count--
    console.log(count)
    storeTodos()
    showDefaultTextIfEmpty()
}
function editTodo(items){
    console.log(items)
    let selectedItem=items.srcElement
    selectedItem.setAttribute("contenteditable","true")
    console.log(selectedItem)
}
function stopEdit(items){
    let selectedItem=items.srcElement
    if(event.keyCode===13){
        selectedItem.setAttribute("contenteditable","false")
    }
    console.log(selectedItem)
}