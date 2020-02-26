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
        this.dataSource = dataSource;
        };
    getDataSource(dataSource){
        dataSource().then(
            response => {return response},
            err => console.log(err)
        )
    }
    createHeader(columns) {
        const tHead = document.createElement("tHead");
        let headerRowsList = () => {
            const parentElement = document.createElement("tr");
            let headers = columns.map(obj =>{
                let element = document.createElement("th");
                element.innerHTML = obj.header;
                return element
            });
            for (let header of headers){
                parentElement.append(header)
            }
            return parentElement}
            tHead.append(headerRowsList());
            return tHead
    }
    createBody(dataSource) {
        const tBody = document.createElement("tBody");
        let bodyRowsList = dataSource.map(obj =>{
                const parentElement = document.createElement("tr");
                for (let columnElement of this.columns){
                    let childElement = document.createElement("td");
                    childElement.innerHTML = obj[columnElement.key];
                    parentElement.append(childElement);
                }
                return parentElement
            }
        );
        tBody.append(bodyRowsList);
        return tBody
    }
    async render() {
        this.parentElement.append(this.createHeader(this.columns));
        let dataSource = await this.getDataSource(this.dataSource);
        this.parentElement.append(this.createBody(dataSource));
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
                key: "gender"    },
              ];

let dataSource = new Promise((resolve, reject) => {
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


let table = new MyTable(el,columns,dataSource);
table.render();