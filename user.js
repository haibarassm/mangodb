db.getCollection("user").find({})
// 插入时设置属性,之后就不改了
db.user.update({},{"$setOnInsert":{"createtime":new Date()}},true)
