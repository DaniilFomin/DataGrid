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
        this.request = dataSource;
        };
    /*getDataSource(request){
        request().then(
            response => {return response},
            err => console.log(err)
        )
    }*/
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
            return parentElement
        };
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

        bodyRowsList.forEach(row => (tBody.append(row)));
        console.log(tBody)
        return tBody
    }
    async render() {
        let dataSource;
        this.parentElement.append(this.createHeader(this.columns));
        await this.request().then(res => (dataSource = res));
        let tBody = await this.createBody(dataSource);
        await this.parentElement.append(tBody);
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

let dataSource = async function(){
    await new Promise(resolve => setTimeout(()=>{resolve()},1000));
    let data = await fetch("./dataCreator.json").then(response => response.json());
    return await data
};




let table = new MyTable(el,columns,dataSource);
table.render();