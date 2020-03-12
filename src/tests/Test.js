export class Tests{
    constructor(testObj,dataSource){
        this.testObj = testObj;
        this.dataSource = dataSource;
    }
    addTest(){
        this.dataSource.add([{"number":"6",
            "name":"Eric",
            "surname":"Clapton",
            "year":"1940",
            "gender":"male" }]);
        console.log("Added Array");

        this.dataSource.add({"number":"5",
            "name":"Jimi",
            "surname":"Hendrix",
            "year":"1940",
            "gender":"male" });
        console.log("Added Obj");
    }
    deleteTest(){
        this.dataSource.delete(this.dataSource[0]);
        console.log("Deleted first element")
    }
    removeTableTest(){
        this.testObj.remove();
        this.addTest();
        console.log("Table Removed")
    }
    createTableTest(){
        console.log(this.testObj);
        this.testObj.render();
        console.log("Table Created")
    }
    async delay(fn,ms){
        await new Promise(resolve => setTimeout(()=>{fn();resolve()},ms))
    }
    async runTest(){
        await this.delay(()=>{this.createTableTest()},40010);
        await this.delay(()=>{this.addTest()},4000);
        await this.delay(()=>{this.deleteTest()},4000);
        await this.delay(()=>{this.removeTableTest()},4000);

    }
}
