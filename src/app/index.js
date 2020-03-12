import {DataSource} from "../data/DataSource.js";
import {MyTable} from "../components/MyTable.js";
import {Tests} from "../tests/Test.js";

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

    let getData = async function () {
        await new Promise(resolve => setTimeout(() => {
            resolve()
        }, 1000));
        return await fetch("../data/dataCreator.json").then(response => response.json());

    };
    async function setTable(){
    let dataSource = new DataSource( await getData());

    let table = new MyTable(columns,await dataSource);


    table.setParentNode(el);
    console.log(table);
    let test = new Tests(await table,await dataSource);
    console.log(test);
    await test.runTest()

    }

setTable();