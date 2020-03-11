export class DataSource extends EventTarget{
    constructor(data) {
        super();
        this.data = data
    }
    data(data){
        if(data == null ){
            return this
        }
        this.data = data;
        dispatchEvent(new Event("DataChange"))
    }
}
