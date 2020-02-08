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
        dataSource().then(
            response => {this.dataSource = response},
            err => throw(err)
        );
    };

    /**
     *
     * @param elType => type of elments for list
     * @param data => one of dataSource obj
     * @param keys => array of keys to create a table or null
     * @returns {[]}
     */
    /*createTableRowsList(elType,data,keys) {
        let list = [];
        try{
        for(let key of keys) {
            list.push(document.createElement(elType));
            list[list.length - 1] = data[key];
            }
        }
        catch(err){
            console.dir(err);
            console.log(err);
            return list
        }
        return list
    };*/
    createHeader() {
        let tHead = document.createElement("tHead");

    }
    createBody() {
        let tBody = document.createElement("tBody");
        let dataRowsList = dataSource.map(obj =>{
                const parentElement = document.createElement("tr")
                for (let columnElement of columns){
                    let childElement = document.createElement("td")
                    childElement.innerHTML = obj[columnElement.key]
                    parentElement.append(childElement)
                }
                return parentElement
            }
        )
    }
    render() {


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
    /*let filler = await setTimeout(() => {[
        {number:"1",
         name:"John",
         surname:"Doe",
         year:"1970",
         gender:"male"}
    ]},2000)
*/
};
let table = new MyTable(el,columns,dataSource);
table.render()