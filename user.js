db.getCollection("user").find({})
db.user.update({},{"$setOnInsert":{"createtime":new Date()}},true)
