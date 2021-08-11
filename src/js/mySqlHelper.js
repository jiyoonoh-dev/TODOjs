class MySqlHelper{
    //TODO : 생성자 (파라미터)
    // 변수이름 앞에 #붙이면 private변수 선언
    constructor(KEY, uiCallback){
        this.uiCallback = uiCallback;
    }
    //JAVASCRIPT, PYTHON 은 class 내부에 변수선언을 하지 않아도 접근 가능
    // testClass = new DbHelper("HI");
    // testClass.KEY : public변수 사용 //HI

    /**
     * #dataList 리턴
     */
    get(){
        let dataList = [];
        $.ajax({
            url : 'http://localhost:8099/api/get',
            async: false,
            type : 'GET',
            data :{},
            dataType:'json',
            success:function(data){
                console.log(data);
                dataList = data;
            },
            error:function(jqXHR){
                alert(jqXHR.error);
            }
        });
        return dataList;
    }

    /**
     * localStorage에서 KEY값으로 #dataList를 문자열로 저장 
     */
    save(){
    }

    /**
     * #dataList 에 item 추가 후 save()
     * @param {json} item 
     */
    addItem(item){
        var parent = this;
        $.ajax({
            url : 'http://localhost:8099/api/add',
            async: true,
            type : 'POST',
            data :item,
            dataType:'text',
            success:function(data){
                console.log(data);
                parent.uiCallback();
            },
            error:function(jqXHR){
                alert(jqXHR.error);
            }
        });
    }

    /**
     * itemId 에 해당하는 item 의 완료체크 업데이트 
     * @param {string} itemId 
     * @param {boolean} isChecked 
     */
    updateIsDone(itemId, isChecked){
        var parent = this;
        var settings = {
            "url": "http://localhost:8099/api/update",
            "method": "POST",
            "timeout": 0,
            "data":{
                id : itemId,
                isDone : isChecked
            },
            success:function(data){
                console.log(data);
                parent.uiCallback();
            },
            error:function(jqXHR){
                alert(jqXHR.error);
            }
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
    }

    /** 
     * itemText수정
     * @param {string} itemId 
     * @param {string} editText 
     */
    updateText(itemId,editText){
        var parent = this;
        var settings = {
            "url": "http://localhost:8099/api/update",
            "method": "POST",
            "timeout": 0,
            "data":{
                id : itemId,
                text : editText
            },
            success:function(data){
                console.log(data);
                parent.uiCallback();
            },
            error:function(jqXHR){
                alert(jqXHR.error);
            }
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
    }

    /**
     * itemId 에 해당하는 item 삭제 
     * @param {string} itemId 
     */
    removeItem(itemId){
        var parent = this;
        var settings = {
            "url": "http://localhost:8099/api/delete/"+itemId,
            "method": "POST",
            "timeout": 0,
            success:function(data){
                console.log(data);
                parent.uiCallback();
            },
            error:function(jqXHR){
                alert(jqXHR.error);
            }
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
    }
    
}
