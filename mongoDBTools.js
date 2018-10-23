


//封装mongoDB的增删改查方法


//引入mongoDB组件
const MongoClient = require('mongodb').MongoClient;

//将所有的方法封装到对象里
const mongoDBTool = {

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
     * @param {*} collectionName  表名
     * @param {*} data  数据
     * @param {*} insertCallback 操作后的回调 
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
     * @param {*} flag 删除一条或多条 true : 一条; flase : 多条
     * @param {*} collectionName 集合名
     * @param {*} condition 删除的条件
     * @param {*} deleteCallback 回调 
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
     * @param {*} flag 更新一条或多条 true : 一条; flase : 多条
     * @param {*} collectionName  集合名
     * @param {*} data  更新数据
     * @param {*} condition 更新的条件
     * @param {*} updateCallback 回调 
     */
    upadte(flag,collectionName,data,condition,updateCallback){

        if(typeof collectionName != 'string') {
            throw new Error('请检查传入的参数是否正确');
        }

        this.connect((err,db)=>{
            //取到想要的表
            const collection = db.collection(collectionName);
            if(flag) { //插入多条
                collection.updateOne(data,condition,updateCallback);  
            }else { //插入一条
                collection.updateMany(data,condition,updateCallback); 
            }
        });

    },

    /**
     * 查
     * @param {*} collectionName  表名
     * @param {*} condition  条件
     * @param {*} findCallback  回调
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