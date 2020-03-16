import {DataSource} from "../components/DataSource.js";
import {DataGrid} from "../components/DataGrid.js";
import {Tests} from "../tests/Test.js";

const el = document.createElement("div");
document.body.appendChild(el);
    let columns = [{
        header: "№",
        key: "id"
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

    let getData = async function (source) {
        await new Promise(resolve => setTimeout(() => {
            resolve()
        }, 2000));
        return await fetch(source).then(response => response.json());
    };
    async function setTable(){
    let dataSource = new DataSource( await getData("../data/dataCreator.json"));

    let table = new DataGrid(el,columns,dataSource);

    let newParent = document.createElement("div");
    let test = new Tests(await table,dataSource,newParent);
    await test.runTest()
    }

setTable();