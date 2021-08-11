class DbHelper{
    //TODO : 생성자 (파라미터)
    // 변수이름 앞에 #붙이면 private변수 선언
    #dataList = [];
    #KEY = '';
    constructor(KEY, uiCallback){
        this.#KEY = KEY;
        let strTodo = localStorage.getItem(KEY);
        this.#dataList = (strTodo===null)? [] : JSON.parse(strTodo);
        this.uiCallback = uiCallback;
    }
    //JAVASCRIPT, PYTHON 은 class 내부에 변수선언을 하지 않아도 접근 가능
    // testClass = new DbHelper("HI");
    // testClass.KEY : public변수 사용 //HI

    /**
     * #dataList 리턴
     */
    get(){
        return this.#dataList;
    }

    /**
     * localStorage에서 KEY값으로 #dataList를 문자열로 저장 
     */
    save(){
        localStorage.setItem(this.#KEY, JSON.stringify(this.#dataList));
        this.uiCallback();
    }

    /**
     * #dataList 에 item 추가 후 save()
     * @param {json} item 
     */
    addItem(item){
        this.#dataList.push(item);
        this.save();
    }

    /**
     * itemId 에 해당하는 item 의 완료체크 업데이트 
     * @param {string} itemId 
     * @param {boolean} isChecked 
     */
    updateIsDone(itemId, isChecked){
        this.#dataList.filter(f=>f.id==itemId).forEach(it=>{it.isDone = isChecked;});
        this.save();
    }

    /** 
     * itemText수정
     * @param {string} itemId 
     * @param {string} editText 
     */
    updateText(itemId, editText){
        this.#dataList.filter(f=>f.id==itemId).forEach(it=>{it.text = editText;});
        this.save();
    }

    /**
     * itemId 에 해당하는 item 삭제 
     * @param {string} itemId 
     */
    removeItem(itemId){
        this.#dataList = this.#dataList.filter(f=>f.id!=itemId);
        this.save();
    }
    
}
