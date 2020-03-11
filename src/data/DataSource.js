export class DataSource extends EventTarget{
    constructor(value) {
        super();
        this.value = value
    };
    data(value) {
        if(value == null ){
            return this.value
        }
        this.value = value;
        console.log(2);
        this.dispatchEvent(new Event("change"))
    }
    velow(){
        alert("ous")
    }
}
