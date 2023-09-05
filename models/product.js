const fs=require('fs');
const path=require('path')

const p=path.join(path.dirname(process.mainModule.filename),
'data',
'products.json'
);

const getProductsFromFile=(cb)=>{

    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([]) ;
        }else{
            cb(JSON.parse(fileContent))//always returns list of objects
        }

    });
}

module.exports=class product{
    constructor(t){
        this.title=t;
    }

    save(){
        getProductsFromFile(products=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err)
            });
        });
        //must use arrow function otherwise this will not be able to access the data of class
    }
    static fetchAll(cb){
        getProductsFromFile(cb)
    }
}