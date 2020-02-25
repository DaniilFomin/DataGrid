class MyTable{
    /**
     *
     * @param el
     * @param columns
     * @param dataSource
     */
    constructor(el,columns,dataSource) {
        this.parentElement = el;
        this.columns = columns;
        this.dataSource = this.getDataSource()
    };
    getDataSource(){
        dataSource().then(
            response => {return response},
            err => throw(err)
        )
    }
    createHeader() {
        let tHead = document.createElement("tHead");
        let headerRowsList = () => {
            const parentElement = document.createElement("tr");
            let headers = this.columns.map(obj =>{
                let element = document.createElement("th");
                element.innerHTML = obj.header;
                return element
            });
            for (let header of headers){
                parentElement.append(header)
            }
            return parentElement}
            return tHead.append(headerRowsList())
    }
    createBody() {
        let tBody = document.createElement("tBody");
        let bodyRowsList = this.dataSource.map(obj =>{
                const parentElement = document.createElement("tr");
                for (let columnElement of this.columns){
                    let childElement = document.createElement("td");
                    childElement.innerHTML = obj[columnElement.key];
                    parentElement.append(childElement);
                }
                return parentElement
            }
        )
        return tBody.append(bodyRowsList)
    }
    render() {
        this.parentElement.append(this.createHeader());
        this.parentElement.append(this.createBody())
    }
}
let el = document.querySelector('.table')
let columns = [{header: "№",
                key: "number"   },
               {header: "Name"   ,
                key: "name"     },
               {header: "Surname",
                key: "surname"  },
               {header: "Year"   ,
                key: "year"     },
               {header: "Gender" ,
                key: "gender"    },]
let dataSource = async function(){
    let promise = new Promise((resolve, reject) => {
        let data = [{
            number:"1",
            name:"John",
            surname:"Lennon",
            year:"1940",
            gender:"male"}, {
            number:"2",
            name:"Paul",
            surname:"McCartney",
            year:"1942",
            gender:"male"}, {
            number:"3",
            name:"George",
            surname:"Harrison",
            year:"1943",
            gender:"male"}, {
            number:"4",
            name:"Richard",
            surname:"Starkey",
            year:"1940",
            gender:"male"},];
        (data) ? setTimeout(() => resolve(data),2000): reject("No data")
    });

return await promise

};
let table = new MyTable(el,columns,dataSource);
table.render();