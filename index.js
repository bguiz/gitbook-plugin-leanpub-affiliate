var lpaData = require('./data/leanpub-affiliate.json');

var len = lpaData.length;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickAd() {
    var idx = getRandomInt(0, len -1);
    return lpaData[idx];
}

module.exports.book = {
    assets: "./book",
    js: [
        "plugin.js"
    ],
    html: {
    },
};

module.exports.hooks = {
    "page:before": function(page) {
        page.content += '\n\n<div class="gitbook-leanpub-affiliate"></div>\n\n';
        return page;
    },
    "page:after": function(page) {
        var config = this.options.pluginsConfig.leanpubAffiliate || {};
        config.queryString = config.queryString || '?a=27hVMyWVn46xaZCi6E563X&subID=gitbookPlugin';
        config.image = config.image || {
            display: true,
            width: 68,
            height: 100,
        };
        config.count = config.count || 3;
        out = '\n\n<br /><hr />';
        for (var c = 0; c < config.count; ++c) {
            var ad = pickAd();
            out += '<a href="'+ad.url+config.queryString+'" class="gitbook-leanpub-affiliate">';
            if (config.image.display) {
                out += '<img width="'+config.image.width+'" height="'+config.image.height+'" src="'+ad.image+'" class="gitbook-leanpub-affiliate-cover" />';
            }
            out +=
                '<span class="gitbook-leanpub-affiliate-text">'+
                    '<div>'+ad.title+'</div>'+
                    '<div>by '+ad.author_string+'</div>'+
                '</span></a>\n';
        }

        out += '<hr />\n\n';

        page.content = page.content.replace('<div class="gitbook-leanpub-affiliate"></div>', out);
        return page;
    },
};
