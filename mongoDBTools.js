


//封装mongoDB的增删改查方法


//引入mongoDB组件
const MongoClient = require('mongodb').MongoClient;
//引入mongoDB操作_id的函数
// const objectID = require('mongodb').ObjectId; 

//将所有的方法封装到对象里
const mongoDBTool = {

    //操作_id的函数
    objectID : require('mongodb').ObjectId,

    //配置mongo的参数
    mongoConfig : {
        url : 'mongodb://localhost:27017',
        dbName : "szqd23",
    },

    //链接数据库与关闭数据库的方法
    connect(callback) {

        url = this.mongoConfig.url;
        dbName = this.mongoConfig.dbName;
 
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            //拿到数据库
            const db = client.db(dbName);
            //操作数据
            callback(err,db);
            //关闭数据库
            client.close();
        });
    },

    /**
     * 增
     * @param {* string} collectionName  表名
     * @param {* arr or obj} data  数据
     * @param {* function } insertCallback 操作后的回调 
     */
    insert(collectionName,data,insertCallback) {

        if(typeof collectionName != 'string') {
            throw new Error('请检查传入的参数是否正确');
        }

        this.connect((err,db)=>{
            if(Array.isArray(data)) { //判断数据是否是数组
                //取到想要的表
                const collection = db.collection(collectionName);
                //插入多条数据
                collection.insertMany(data, insertCallback);
            } else {
                //取到想要的表
                const collection = db.collection(collectionName);
                //插入一条数据
                collection.insertOne(data, insertCallback);
            }
        });
    },

    /**
     * 删
     * @param {* blooern} flag 删除一条或多条 true : 一条; flase : 多条
     * @param {* string} collectionName 集合名
     * @param {* obj} condition 删除的条件
     * @param {* function} deleteCallback 回调 
     */
    delete(flag,collectionName,condition,deleteCallback){

        if(arguments.length != 3) {
            throw new Error('参数的必须为3个');
        }

        this.connect((err,db)=>{
            //取到想要的表
            const collection = db.collection(collectionName);
            if(flag) { //删除一条
                collection.deleteOne(condition,deleteCallback);
            }else { //删除多条
                collection.deleteMany(condition,deleteCallback);
            }
        });
    },

    /**
     * 改
     * @param {* blooern} flag 更新一条或多条 true : 一条; flase : 多条
     * @param {* string} collectionName  集合名
     * @param {* obj} data  更新数据
     * @param {* obj} condition 更新的条件
     * @param {* function} updateCallback 回调 
     */
    upadte(flag,collectionName,condition,data,updateCallback){

        if(typeof collectionName != 'string') {
            throw new Error('请检查传入的参数是否正确');
        }

        this.connect((err,db)=>{
            //取到想要的表
            const collection = db.collection(collectionName);
            if(flag) { //插入多条
                collection.updateOne(condition,{$set:data},updateCallback);  
            }else { //插入一条
                collection.updateMany(condition,{$set:data},updateCallback); 
            }
        });

    },

    /**
     * 查
     * @param {* string} collectionName  表名
     * @param {* obj} condition  条件
     * @param {* function} findCallback  回调
     */
    find(collectionName,condition,findCallback){

        if(typeof collectionName != 'string') {
            throw new Error('请检查传入的参数是否正确');
        }

        this.connect((err,db)=>{
            //取到想要的表
            const collection = db.collection(collectionName);
            //插入多条数据
            collection.find(condition).toArray(findCallback);
        })
    }
}

//导出对象
module.exports =  mongoDBTool;
