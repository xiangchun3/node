var eventproxy = require('eventproxy');
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var app = express();
// 启动：node app.js

var targetUrl = 'https://cnodejs.org';
app.get('/', function(req, res){
    superagent.get(targetUrl)
    .end(function (err, sres){
        // 常规的错误处理
        if(err){
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        var topicUrls = []; //存储每个页面地址，后续抓取页面详情使用
        $('#topic_list .cell').each(function (index, element) {
            var $element = $(element);
            var href = targetUrl + $(element).find('.topic_title').attr('href');
            var title = $(element).find('.topic_title').attr('title');
            var visits = trim($(element).find('.count_of_visits').text());
            var replies = trim($(element).find('.count_of_replies').text());
            items.push({
                title: title,
                href: href,
                views: visits,
                replies: replies
            });

            topicUrls.push(href);
        });

        var ep = new eventproxy();

        // 循环抓取每一个页面的详细内容
        topicUrls.forEach(function(topicUrl){
            superagent.get(topicUrl).end(function(err, res){
                console.log('fetch ' + topicUrl + ' successful');
                ep.emit('topic_html', [topicUrl, res.text]);
            });
        });

        // 获取每个页面的第一条comment
        ep.after('topic_html', topicUrls.length, function(topics){
            items = topics.map(function (topicPair, index){
                var topicHtml= topicPair[1];
                var $ = cheerio.load(topicHtml);
                var firstComment = $('.reply_content').eq(0).text().trim();
                return ({
                    title: items[index].title,
                    href: items[index].href,
                    views: items[index].views,
                    replies: items[index].replies,
                    firstComment: firstComment
                });
            });
            res.send(items);
            console.log(items);
        });
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
