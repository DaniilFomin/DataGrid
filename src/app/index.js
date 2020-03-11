import {DataSource} from "../data/DataSource.js";
import {MyTable} from "../components/MyTable.js";

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
    table.render();
    new Promise(resolve => setTimeout(()=>{dataSource.data([{"number":"6",
        "name":"Johrtyn",
        "surname":"Lennon",
        "year":"1940",
        "gender":"male" }])},4000))
    ;
    }
setTable();