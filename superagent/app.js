var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var app = express();
// 启动：node app.js

var targetUrl = 'https://cnodejs.org';
app.get('/', function(req, res, next){
    // console.log(req);
    // 用superagent抓取网页内容
    superagent.get(targetUrl)
    .end(function (err, sres){
        // 常规的错误处理
        if(err){
            return next(err);
        }

        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#topic_list .cell').each(function (index, element) {
            var $element = $(element);
            var title = $(element).find('.topic_title').attr('title');
            var href = $(element).find('.topic_title').attr('href');
            var visits = trim($(element).find('.count_of_visits').text());
            var replies = trim($(element).find('.count_of_replies').text());
            items.push({
                title: title,
                href: href,
                views: visits,
                replies: replies
            });
        });

        res.send(items);
    });
});

// 模拟jquery $.trim方法，因为cheerio不支持
function trim(text){
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    return text.replace(rtrim, "");
}

app.listen(3030, function(){
    console.log('app is listening at port 3030');
});
