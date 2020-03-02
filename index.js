class MyTable {
    /**
     *
     * @param el HtmlElement
     * @param columns  Array<Any>
     * @param dataSource  Function
     */
    constructor(el, columns, dataSource) {
        this.parentElement = el;
        this.columns = columns;
        this.request = dataSource;
    };

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
        return tBody
    }

    async render() {
        this.parentElement.append(this.createHeader(this.columns));
        let dataSource = await this.request();
        let tBody = await this.createBody(dataSource);
        await this.parentElement.append(tBody);
    }
}


let el = document.querySelector('.table');

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
    let data = await fetch("./dataCreator.json").then(response => response.json());
    return await data
};


let table = new MyTable(el, columns, dataSource);
table.render();
/*
*
* TODO: 1. Создать массив из 10 элементов
* TODO: 2. положить массив в таблицу
* TODO: 3. таблица рендерится
* TODO: 4. через 100 секунд я удаляю из массива 2 записи, добавляю 3 других записи и изменяю в одной записи значения колонок
* TODO: 5. табличка должна отразить изменения без дополнительных обращений к таблице
*
*/