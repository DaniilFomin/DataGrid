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
    delete(position){
        this.value.splice(position,1);
        this.dispatchEvent(new Event("change"))
    }
}
