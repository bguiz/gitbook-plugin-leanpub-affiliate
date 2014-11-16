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
        if (typeof config.queryString !== 'string') {
            config.queryString = '?' + Object.keys(config.queryString).map(function(key) {
                return key+'='+config.queryString[key];
            }).join('&');
        }
        config.image = config.image || {
            display: true,
            width: 68,
            height: 100,
        };
        config.count = config.count || 3;
        var widthPercent = Math.floor(90 / config.count);
        var widthPixels = Math.floor(config.image.width);
        out = '\n\n<br /><hr />';
        for (var c = 0; c < config.count; ++c) {
            var ad = pickAd();
            out += '<a href="'+ad.url+config.queryString+'" class="gitbook-leanpub-affiliate" '+
                'style="display: inline-block; max-width: '+widthPercent+'%; min-width: '+widthPixels+'px; vertical-align: top;">';
            if (config.image.display) {
                out += '<img width="'+config.image.width+'" height="'+config.image.height+
                    '" src="'+ad.image+'" class="gitbook-leanpub-affiliate-cover" /><br />';
            }
            out +=
                '<span class="gitbook-leanpub-affiliate-text">'+
                    '<span>'+ad.title+'</span><br />'+
                    '<span>by '+ad.author_string+'</span>'+
                '</span></a>\n';
        }

        out += '<hr />\n\n';

        page.content = page.content.replace('<div class="gitbook-leanpub-affiliate"></div>', out);
        return page;
    },
};
