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
        this.dispatchEvent(new Event("change"))
    }
    add(value){
        if (value.__proto__ === Array.prototype) {
            for(let el of value){
                this.value.push(el)
            }
        }else{
            this.value.push(value)
        }

        this.dispatchEvent(new Event("change"))
    }
    delete(id){
        this.value = this.value.filter(element => (element.id != id));
        this.dispatchEvent(new Event("change"))
    }
}
