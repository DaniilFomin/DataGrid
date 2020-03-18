class MyTable {
    /**
     *
     * @param el
     * @param columns
     * @param dataSource
     */
    constructor(el, columns, dataSource) {
        this.parent = el;
        this.columns = columns;
        this.dataSource = dataSource;
    };

    createHeader(columns) {
        const tHead = document.createElement("tHead");
        const headerRowsList = () => {
            const row = document.createElement("tr");
            let headers = columns.map(obj => {
                let element = document.createElement("th");
                element.innerHTML = obj.header;
                return element
            });
            for (let header of headers) {
                row.append(header)
            }
            return row
        };
        tHead.append(headerRowsList());
        return tHead
    }

    createBody(dataSource) {
        const tBody = document.createElement("tBody");
        /**
         *
         * @type {Array<HTMLTableRowElement>}
         */
        const bodyRowsList = dataSource.map(obj => {
                const row = document.createElement("tr");
                for (let columnElement of this.columns) {
                    const childElement = document.createElement("td");
                    childElement.innerHTML = obj[columnElement.key];
                    row.append(childElement);
                }
                return row
            }
        );

        bodyRowsList.forEach(row => (tBody.append(row)));
        return tBody
    }

    createTable(){
        this.table = document.createElement("table");
        this.table.className = "table";
    }
    async render() {
        this.createTable();
        this.parent.append(this.table);
        this.table.append(this.createHeader(this.columns));
        let tBody = await this.createBody(await this.dataSource);
        await this.table.append(tBody);
    }
}


let el = document.querySelector('.container');

let columns = [{
    header: "№",
    key: "number"
},
    {
        header: "Name",
        key: "name"
    },
    {
        header: "Surname",
        key: "surname"
    },
    {
        header: "Year",
        key: "year"
    },
    {
        header: "Gender",
        key: "gender"
    },
];

let dataSource = async function () {
    await new Promise(resolve => setTimeout(() => {
        resolve()
    }, 1000));
    return await fetch("./dataCreator.json").then(response => response.json());
};


let table = new MyTable(el, columns, dataSource());
table.render();