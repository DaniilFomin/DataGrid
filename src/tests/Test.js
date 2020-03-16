export class Tests{
    constructor(testObj,dataSource,newParent){
        this.testObj = testObj;
        this.dataSource = dataSource;
        this.newParent = newParent
    }
    addTest(){
        this.dataSource.add([{"id":"5",
            "name":"Eric",
            "surname":"Clapton",
            "year":"1940",
            "gender":"male" }]);
        console.log("Added Array");

        this.dataSource.add({"id":"6",
            "name":"Jimi",
            "surname":"Hendrix",
            "year":"1940",
            "gender":"male" });
        console.log("Added Obj");
    }
    deleteTest(){
        this.dataSource.delete(1);
        console.log("Deleted first element")
    }
    removeTableTest(){
        this.testObj.remove();
        this.addTest();
        console.log("Table Removed")
    }
    changeParentElementTest(){
        document.body.appendChild(this.newParent);
        this.testObj.setParentElement(this.newParent);
        console.log("new Parent")
    }

    urlDataSourceTest(){
        this.testObj.setDataSource("../data/secondDataCreator.json");
        console.log("UrlDataSource set")
    }
    async delay(fn,ms){
        await new Promise(resolve => setTimeout(()=>{fn();resolve()},ms))
    }
    async runTest(){
        await this.delay(()=>{this.addTest()},4000);
        await this.delay(()=>{this.deleteTest()},4000);
        await this.delay(()=>{this.removeTableTest()},4000);
        await this.delay(()=>{this.changeParentElementTest()},4000);
        await this.delay(()=>{this.urlDataSourceTest()},4000);
    }
}
