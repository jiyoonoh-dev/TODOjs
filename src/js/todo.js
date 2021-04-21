const DB_KEY = "todoList";
var todoList = [];

/**
 * localStorage value를 가져와서 리스트
 */
function loadTodoList(){
    let strTodo = localStorage.getItem(DB_KEY);
    if(strTodo === null)
        todoList = [];
    else
        todoList = JSON.parse(strTodo);
}

/**
 * localStorage 저장
 */
function saveTodoList(){
    localStorage.setItem(DB_KEY, JSON.stringify(todoList));
}

function addListItem(item){
    let checkedStr = item.isDone ? ' checked="checked"  ' : '';
    let color      = checkedStr  ? 'lightgray' : 'white';
    // 위에 추가 : prepend
    // 아래로 추가 : append
    $('#todoList').append(`
    <li class='list-group-item' data-id="${item.id}" style="background-color: ${color}" >
    <input class='form-check-input me-1 todoCheck' type='checkbox' value='' ${checkedStr} >
    ${item.text}
    <button type="button" class="btn btn-outline-danger btn-sm todo-del-btn">X</button>
    </li>`);
}

function listUp(){
    todoList.forEach(item => {
        addListItem(item); //list에 display
    });
}

/**
 * 할 일 추가
 * @param {string} todoText 
 */
function addTodo(todoText){
    
    let item = {
        'id'    : getTodoId(),
        'text'  : todoText,
        'isDone': false
    }
    //list에 display
    addListItem(item);

    //js변수에 추가
    todoList.push(item);

    //localStorage에 저장
    saveTodoList();
    
}

function addEvent(){
    addTodo($("#todoInput").val());
    $("#todoInput").val("");
}


$(document).ready(function(){

    $('#todoInput').keydown(function(e){
        if(e.keyCode==13){
            addEvent();
        }
    });

    $('.add').click(function(e){
        addEvent();
    });

    $(this).on("change",".todoCheck",function(e){
        let itemId = $(this).parent().data('id'); //속성이 data-id의 값을 가져옴
        let isChecked = $(this).prop("checked");  // $(this).is(":checked")도 가능
        //배경 흰색으로
        if(isChecked) 
            $(this).parent().css("background-color","gray");
        else
            $(this).parent().css("background-color","white");
        // js변수에 해당 item isDone을 업데이트
        todoList.filter(f=>f.id==itemId).forEach(it=>{it.isDone = isChecked;});

        //localStorage에 동기화
        saveTodoList();
    });

  



    $(this).on("click",".todo-del-btn",function(e){
        let itemId = $(this).parent().data('id'); //속성이 data-id의 값을 가져옴

        // js변수에 해당 item isDone을 업데이트
        todoList = todoList.filter(f=>f.id!=itemId);

        //display delete
        $(this).parent().remove();

        //localStorage에 동기화
        saveTodoList();
    });


    //localStorage의 데이터를 리스트로 뿌려줌
    loadTodoList();
    listUp();
})