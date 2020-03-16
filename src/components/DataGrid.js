import {DataSource} from "./DataSource.js";

export class DataGrid {
    /**
     * @param parentElement <HTMLElement>
     * @param columns  Array<String>
     * @param dataSource  <DataSource>
     */
    constructor(parentElement,columns , dataSource) {
        this.columns = columns;
        this.setParentElement(parentElement);
        this.setDataSource(dataSource);
    };
    /**
     *Setting/changing source
     * @param source Array<Object>/URL
     */
    async setDataSource(source){
        let dataSource = source;
        this.remove();
        if(this.parentElement) {
            this._render();
        }
        if(typeof source == "string"){
            dataSource = new DataSource(await fetch(source).then(response => response.json()));
        }
        this.dataSource = dataSource;
        this.dataSource.addEventListener("change", this._tableRender);
        this._tableRender();
    }
    /**
     *Setting/changing Parent Node
     * @param element <HTMLElement>
     */

    setParentElement(element) {
        if(this.parentElement) this.remove();
        this.parentElement = element;
        this._render();
    }

    _createHeader(columns) {
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

    _createBody(dataSource) {
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

    _tableRender = () => {
        if (!this.dataSource) {throw new Error("define dataSource first")}
        let dataSource = this.dataSource.data();
        for (let el of this.table.children) {
            if (el.tagName === "TBODY") {
                this.table.removeChild(el);
            }
        }
        this.table.append(this._createBody(dataSource));
    };

    _createTable(){
        this.table = document.createElement("table");
        this.table.className = "table";
        this.table.append(this._createHeader(this.columns));
    }
    _render() {
        if(!this.table) this._createTable();
        this.parentElement.append(this.table)
    }

    remove() {
        this.parentElement.innerHTML = "";
        if (this.dataSource){
            this.dataSource.removeEventListener("change", this._tableRender)
        }
    }
}