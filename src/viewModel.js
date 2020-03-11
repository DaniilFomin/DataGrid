function bindModelInput(obj, property, domElement) {
    Object.defineProperty(obj,property, {
        get() { return domElement.value
        },
        set(v) { domElement.value = v
        },
        configurable: true,
    })
}
function render(){
    alert("rendered")
}
let dataSource = [];
function dataSourceProxify(dataSource){
    if (dataSource.__proto__ === Array.prototype) {
        dataSource = dataSource.map(obj =>
        obj = new Proxy(obj,{
            get(target, p, receiver) {
                return target[p]
            },
            set(target, p, value, receiver) {
                target[p] = value;
                render();
                return true
            }
        })
    )}
    dataSource = new Proxy(dataSource,{
       get(target, p, receiver) {
           return Reflect.get(target,p,receiver)
       },

       set(target, p, value, receiver) {
           target[p] = value;
           render();
           return true
       },

       deleteProperty(target, p) {
           if (dataSource.__proto__ === Array.prototype) {
               target.splice(p, 1);
           }else{
               delete target[p];
           }
            render();
            return true
       },
    });
    return dataSource
}

