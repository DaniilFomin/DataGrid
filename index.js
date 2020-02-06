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
     * @param keys => array of keys or string key to create a table
     * @returns {[]}
     */
    createTableRowsList(elType,data,keys) {
        let list = [];
        if(typeof(keys) != "object"){

            return data.map(x => x.keys)
        }
        for(let key of keys) {
            list.push(document.createElement(elType));
            list[list.length - 1] = data[key];
        }
        return list
    };
    createHeader() {
        let elType = "th";
        let keys = "header";
        let tHead = document.createElement("tHead");

    }
    createBody() {
        let elType = "td";
        let keys = columns.map(obj => obj.key);
        let tBody = document.createElement("tBody");

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