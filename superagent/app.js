const async = require('async');
const cheerio = require('cheerio');
const superagent = require('superagent');
const express = require('express');
const fs = require('fs');
var app = express();

var count = 0;
var fetchUrl = function(url ,callback) {
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    count++;
    // console.log('现在的并发数是：', count, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
    setTimeout(function(){
        count--;
        callback(null, url + ' html content');
    });
};

var targetUrl = 'https://cnodejs.org';
app.get('/', function(req, res){
    superagent.get(targetUrl).end(function (err, sres){
        // 常规的错误处理
        if(err){
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var urls = []; //存储每个页面地址，后续抓取页面详情使用

        // 创建目录
        fs.mkdir("html", 0777, function(err){
            if(err){
                console.log("创建目录失败");
                return;
            }
        });

        // 循环抓取每个url内容
        $('#topic_list .cell').each(function (index, element) {
            var $element = $(element);
            var fileName = $(element).find('.topic_title').attr('title') + ".html";
            var href = targetUrl + $(element).find('.topic_title').attr('href');
            console.log(sres.text);
            // res.send($);
            // 创建文件，并写入指定目录
            fs.writeFile("html/" + fileName, sres.text, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("生成页面文件成功"+href);
                }
            });
            urls.push(href);
            // res.send("文件生成成功");
        });
        
        async.mapLimit(urls, 5, function(url, callback){
            fetchUrl(url, callback);
        }, function(err, result){
            // console.log('final:');
            // console.log(result);
        });
    });
});

app.listen(3030, function(){
    console.log('app is listening at port 3030');
});