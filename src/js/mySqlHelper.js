

class MySqlHelper{
    //TODO : 생성자 (파라미터)
    // 변수이름 앞에 #붙이면 private변수 선언
    constructor(KEY, uiCallback){
        this.uiCallback = uiCallback;
        this.apiUrl = "/api/";
    }
    //JAVASCRIPT, PYTHON 은 class 내부에 변수선언을 하지 않아도 접근 가능
    // testClass = new DbHelper("HI");
    // testClass.KEY : public변수 사용 //HI


    commonSucc(response){
        console.log(response);
        this.uiCallback();
    }

    commonDone(response){
        console.log(response);
    }
    
    commonError(jqXHR){
        alert(jqXHR.error);
    }

    setAjax(url, method, data={}){
        var settings = {
            "url": this.apiUrl+url,
            "method": method,
            "timeout": 0,
            "data" : data,
            success:this.commonSucc.bind(this),
            error:this.commonError
          };
          
          $.ajax(settings).done(this.commonDone);
    }

    /**
     * #dataList 리턴
     */
    get(){
        let dataList = [];
        $.ajax({
            url : this.apiUrl+'get',
            async: false,
            type : 'GET',
            data :{},
            dataType:'json',
            success:function(data){
                console.log(data);
                dataList = data;
            },
            error:this.commonError
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
        this.setAjax('add', 'POST', item);
    }

    
    /**
     * itemId 에 해당하는 item 의 완료체크 업데이트 
     * @param {string} itemId 
     * @param {boolean} isChecked 
     */
    updateIsDone(itemId, isChecked){
        var data = {
            id : itemId,
            isDone : isChecked
        };
        this.setAjax('update', 'POST', data);
    }

    /** 
     * itemText수정
     * @param {string} itemId 
     * @param {string} editText 
     */
    updateText(itemId,editText){
        var data = {
            id : itemId,
            text : editText
        };
        this.setAjax('/update', 'POST', data);
    }

    /**
     * itemId 에 해당하는 item 삭제 
     * @param {string} itemId 
     */
    removeItem(itemId){
        this.setAjax('delete/'+itemId, 'POST');
    }
    
}
