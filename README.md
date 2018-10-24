
# mododb操作数据库方法的封装
------

# 引入
const mongodbTool = path.join(__dirname,'../tools/mongoDBTools')

## 使用

### _id是mongodb数据库的id

mongodbTool.objectID(_id)

### 新增数据(一条/多条)
mongodbTool.insert(collectionName,data,insertCallback)

### 删除数据
mongodbTool.delete(flag,collectionName,condition,deleteCallback)

### 修改(更新)数据
mongodbTool.upadte(flag,collectionName,condition,data,updateCallback)

### 查询数据
mongodbTool.find(collectionName,condition,findCallback)

---------------
