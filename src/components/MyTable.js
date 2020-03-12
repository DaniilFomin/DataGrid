export class MyTable {
    parentNode;
    /**
     *
     * @param columns  Array<String>
     * @param dataSource  <DataSource>
     */
    constructor(columns, dataSource) {
        this.columns = columns;
        this.dataSource = dataSource;
    };

    /**
     *
     * @param node <HTMLElement>
     * @returns {HTMLElement}
     */
    setParentNode(node){
    this.parentNode = node;
}
    createHeader(columns) {
        const tHead = document.createElement("tHead");
        const headerRowsList = () => {
            const row = document.createElement("tr");
            let headers = columns.map(column => {
                let cell = document.createElement("th");
                cell.innerHTML = column.header;
                return cell
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
                for (let column of this.columns) {
                    const cell = document.createElement("td");
                    cell.innerHTML = obj[column.key];
                    row.append(cell);
                }
                return row
            }
        );

        bodyRowsList.forEach(row => (tBody.append(row)));
        return tBody;
    }
    tableRender = () => {
       let dataSource = this.dataSource.data();
       for(let el of this.parentNode.children){
           if (el.tagName === "TBODY"){
               this.parentNode.removeChild(el);
           }
       }
        this.parentNode.append(this.createBody(dataSource));
    }

    render() {
        this.parentNode.append(this.createHeader(this.columns));
        this.tableRender();
        this.dataSource.addEventListener("change",this.tableRender);
        //this.dataSource.dispatchEvent(new Event("change"));
        console.log(this.dataSource)

    }
    remove(){
        while(this.parentNode.children.length != 0) {
            this.parentNode.removeChild(this.parentNode.firstChild)
        }
        this.dataSource.removeEventListener("change",this.tableRender)
    }
}