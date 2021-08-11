
var db = new DbHelper("todoList",uiUpdate);

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

function uiUpdate(){
    $('#todoList').html(''); //ui에서 List clear
    db.get().forEach(item=>addListItem(item)); //db값으로 redraw
}

/**
 * 할 일 추가
 * @param {string} todoText 
 */
function addTodo(){
    let todoText = $("#todoInput").val();
    $("#todoInput").val('');
    let item = {
        'id'    : getTodoId(),
        'text'  : todoText,
        'isDone': false
    }
    //list에 display
    addListItem(item);
    db.addItem(item);
}

$(document).ready(function(){

    $('#todoInput').keydown(e=>{if(e.keyCode==13) addTodo();});
    $('.add').click(addTodo);

    //CHECK
    $(this).on("change",".todoCheck",function(e){
        let itemId = $(this).parent().data('id'); //속성이 data-id의 값을 가져옴
        let isChecked = $(this).prop("checked");  // $(this).is(":checked")도 가능
        //배경 흰색으로
        if(isChecked) 
            $(this).parent().css("background-color","gray");
        else
            $(this).parent().css("background-color","white");
        // js변수에 해당 item isDone을 업데이트
        db.updateIsDone(itemId,isChecked);

    });

    //DELETE
    $(this).on("click",".todo-del-btn",function(e){
        let itemId = $(this).parent().data('id'); //속성이 data-id의 값을 가져옴
        db.removeItem(itemId);
        //display delete
        $(this).parent().remove();
    });

    uiUpdate();
})