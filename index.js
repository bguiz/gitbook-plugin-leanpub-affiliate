var lpaData = require('./data/leanpub-affiliate.json');

var len = lpaData.length;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickAd() {
    var idx = getRandomInt(0, len -1);
    return lpaData[idx];
}
function pickAds(num) {
    var ads = [];
    if (num >= len) {
        ads = lpaData;
    }
    else {
        // Use probability based filtering to get most of the way there,
        // Then add or cull a few more to level off to the required number
        // This is not ideal, because the end result may contain a small number of repetitions
        var probability = num / len;
        ads = lpaData.filter(function(ad) {
            return Math.random() < probability;
        });
        while (ads.length < num) {
            ads.push(pickAd());
        }
        while (ads.length > num) {
            //TODO this bit could be more efficient
            ads.splice(getRandomInt(0, ads.length), 1);
        }
    }
    ads = ads.map(function(ad) {
        //cull properties that will not be used for display
        return {
            url: ad.url,
            image: ad.image,
            title: ad.title,
            author_string: ad.author_string,
        };
    });
    return ads;
}
var pageCount = 0;

module.exports.book = {
    assets: "./book",
    js: [
        "plugin.js",
    ],
    css: [
        "plugin.css",
    ],
    html: {
    },
};

module.exports.hooks = {
    init: function() {
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
        config.total = Math.max(config.total || config.count, config.count * 2);
        config.links = config.links || [];
        config.ads = pickAds(config.total - config.links.length);
        config.links.forEach(function(ad) {
            config.ads.push(ad);
        });
        console.log('Leanpub affiliate links count:', config.ads.length, 'of which manually specified', config.links.length);
        this.options.pluginsConfig.leanpubAffiliate = config;
    },

    finish: function() {
        console.log('Total pages with Leanpub affiliate links:', pageCount);
    },

    "page:before": function(page) {
        ++pageCount;
        page.content += '\n\n<div class="gitbook-leanpub-affiliate"></div>\n\n';
        return page;
    },
    "page:after": function(page) {
        //Do nothing
        return page;
    },
};
