// 可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的
var cheerio = require("cheerio");
var server = require("./download");
var fs = require("fs");
// 启动: node index.js

var url = "http://www.w3cplus.com/"

server.download(url, function(res, data) {
    if (data) {
        var $ = cheerio.load(data);
        var host = res.connection._host;
        var newsArray = [];

        $(".content h1").each(function(i, e) {
            var title = $(e).find("a").text();
            var url = host + $(e).find("a").attr("href");
            newsArray.push({ "title": title, "url": url });
        });

        // 生成json文件路径及名称
        var outputFilename = './feed.json';
        // 生成json文件并格式化
        fs.writeFile(outputFilename, JSON.stringify(newsArray, null, 4), function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputFilename);
            }
        });

        console.log("done");
    } else {
        console.log("error");
    }
});