var http = require("http");

function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on("end", function() {
            callback(res, data);
        });
    }).on("error", function() {
        callback(null);
    });
}

exports.download = download;