
var db = new MySqlHelper("todoList",uiUpdate);

function addListItem(item){
    let checkedStr = item.isDone ? ' checked' : '';
    let color      = checkedStr  ? 'lightgray' : 'white';
    // 위에 추가 : prepend
    // 아래로 추가 : append
    $('#todoList').append(`
    <li class='list-group-item todoLi' data-id="${item.id}" style="background-color: ${color}" >
        <input class='form-check-input me-1 todoCheck' type='checkbox' value='' ${checkedStr} >
        <span class="todoText">${item.text}</span>
        <input type="text" class="todoTextInput d-none"/>
        <button type="button" class="btn btn-outline-danger btn-sm todo-del-btn"><i class="fas fa-minus-circle"></i></button>
    </li>`);
}

function uiUpdate(){
    $('#todoList').html(''); //ui에서 List clear
    db.get().forEach(item=>addListItem(item)); //db값으로 redraw
}

//list item의 id를 리턴
function getCurrentItemId(jElement){
    return jElement.closest("li.todoLi").data('id');
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
    //addListItem(item);
    db.addItem(item);
}


$(document).ready(function(){

    $('#todoInput').keydown(e=>{if(e.keyCode==13) addTodo();});
    $('.add').click(addTodo);

   


    //CHECK
    $(this).on("change",".todoCheck",function(e){
        let itemId = getCurrentItemId($(this)); //속성이 data-id의 값을 가져옴
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
        let itemId = $(this).closest("li.todoLi").data('id'); //속성이 data-id의 값을 가져옴
        db.removeItem(itemId);
        //display delete
        $(this).parent().remove();
    });

    //text클릭 시 변경 가능
    $(this).on("click",".todoText",function(e){
        //alert($(this).parent().children(".todoTextInput"));
        let input = $(this).closest("li.todoLi").find(".todoTextInput");
        input.val($(this).text());
        $(this).hide();
        input.removeClass('d-none');
    });

    $(this).on('blur',".todoTextInput",function(e){
        let editText = $(this).val();
        let itemId = getCurrentItemId($(this));
        db.updateText(itemId, editText);
        $(this).show();
        $(this).addClass('d-none');
    });

    uiUpdate();
});