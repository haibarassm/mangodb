use mydb
// 添加数据
game={"name":"jx3",
"content":[{"name":"叶雪风","职业":"藏剑"},{"name":"小小琉璃","职业":"万花"}],
}
db.jx3.insert(game)
// 按ObjectId搜索文档,修改content内容,并修改
var jx3=db.jx3.find({"_id": ObjectId("5bd97080e13dd94858c415c7")})
jx3.content=[{"name":"叶雪风","职业":"藏剑"},{"name":"小小琉璃","职业":"万花"},{"name":"悲莫悲生别离","职业":"蓬莱"}]
db.jx3.update({"_id": ObjectId("5bd91415fac210459cee4ef6")},jx3)
// 用push方式修改指定ObjectId的文档(新插入一个数据到content中)
db.jx3.update({"_id":ObjectId("5c32c231663fc5da02e0bcd5")},{"$push":{"content":{"name":"笛音不渡","职业":"五毒"}}})
  // 插入多个内容到content中(each),最多插入10个文档(slice)
db.jx3.update
({"_id": ObjectId("5bd928b706c731a4a068ebd5")},
{"$push":{"content":
  {"$slice":-10,
    "$each":[{"name":"陆迟墨","职业":"明教"},{"name":"长孙岚雪","职业":"五毒"}]}}})
    //根据ObjectId删除文档 
db.jx3.remove({"_id" : ObjectId("5bd97196e13dd94858c415c9")})
// 根据ObjectId删除某一个集合里的某条数据
db.jx3.update({"_id" : ObjectId("5bd92050273e152f114d001a")},{"$pull":{"content":{"name":"叶雪风","职业":"藏剑"}}})
// 根据ObjectId查找文档
db.jx3.find({"_id": ObjectId("5bd928b706c731a4a068ebd5")})
// jx3的状态,可以查看填充因子
db.jx3.stats()
// 用save方式修改content
var j=db.jx3.findOne()
j.content=[{"name":"叶雪风","职业":"藏剑"},{ "name" : "笛音不渡", "职业" : "五毒" },{"name":"小小琉璃","职业":"万花"},{"name":"悲莫悲生别离","职业":"蓬莱"},{"name":"长孙岚雪","职业":"五毒"}]
db.jx3.save(j)
// 不重复的添加内容到content
db.jx3.update({"_id": ObjectId("5bd928b706c731a4a068ebd5")},{"$addToSet":{"content":{"name":"陆迟墨","职业":"明教"}}})
// 适用于大量移动或经常打乱数据,用这样的方式提高复用率 但是实际操作之后collectionName说没有定义
db.runCommand({"collMod":collectionName,"usePowerOf2Sizes":true})
// 剔除查询结果中的_id,输出name和content
db.jx3.find({},{"_id":0,"name":1,"content":1})
// 查询里的比较
$lt <
$lte <=
$gt  >
$gte >=
$ne 不等于
db.user.update({"_id" : ObjectId("5bd96dad8882b26ee713dc74")},{"$set":{"age":22}})
db.user.find({"age":{"$lt":30,"$gt":20}})
// in
// $in 返回与数组中某一个条件匹配的文档(一个键的多个值)
// $nin 返回与数组中所有条件都不匹配的文档
db.jx3.find({"content.name":{"$in":["叶雪风"]}})
// or
// $or 返回与数组中某一个条件匹配的文档，可嵌套$in实现多个键的多个值
db.raffle.find({"$or":[{"ticket_no":{"$in":[725,542,390]}},{"winner":true}]})
// $not 元条件句(可用在任何其他条件上),与正则结合使用,查找与特定模式不匹配的文档
// 条件语句内层文档的键,修改器外层文档的键
// 查询某个值是否为null用$exists
db.jx3.find({"content.name":{"$in":[null],"$exists":true}})
// 正则表达式,也可以匹配自身
// i 不区分大小写
// perlji兼容的正则
// $all 通过多个元素来匹配数组
db.jx3.find({"content.name":{$all:["叶雪风"]}})
// key.index语法指定下标,数组从0开始
db.jx3.find({"name.1":"圈圈"})
// $size 查询特定长度的数组
db.jx3.find({"content":{"$size":3}})
// $slice 返回某个键匹配的数组元素子集 (下例只有叶雪风哪个号了)
db.jx3.find({},{"content":{"$slice":1}})
// $elemMatch 查询条件与每个元素进行比较,但不会匹配非数组元素
db.jx3.find({"content":{"$elemMatch":{"name":"叶雪风","职业" : "藏剑"}}})
// $maxscan 指定本次扫描文档数量上限
// $min 指定一个索引的扫描的下边界
// $max 指定一个索引的扫描的上边界
// $showDiskLoc 显示该结果在磁盘上的位置
// snapshot 对查询进行快照，保证每个文档只被遍历一次，但是速度会慢，故只在必要时使用
