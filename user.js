db.getCollection("user").find({})
// 插入时设置属性,之后就不改了
db.user.update({},{"$setOnInsert":{"createtime":new Date()}},true)
db.user.update({"_id" : ObjectId("5bd96dad8882b26ee713dc74")},{"$set":{"age":22}})
db.user.find({"age":{"$lt":30,"$gt":20}})