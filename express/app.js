var express = require('express');
var utility = require('utility');
var app = express();
// 启动：node app.js

// app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete，
// 为 `/` 路径指定一个 handler 函数。
app.get('/', function(req, res){
    // 获取请求中的query体
    var queryParams = req.query;
    // 如果参数中有mobile字段，则将mobile进行md5加密后显示
    if(queryParams.mobile){
        queryParams.mobile = utility.md5(queryParams.mobile);
    }
    res.send(queryParams);
});

//监听本地的 3000 端口。第二个函数是个回调函数，会在 listen 动作成功后执行。
app.listen(3030, function(){
    console.log('app is listening at port 3030');
});