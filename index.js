var lpaData = require('./data/leanpub-affiliate.json');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickAd() {
    var idx = getRandomInt(0, lpaData.length -1);
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
        console.log('page:before');
        page.content += '\n\n<div class="gitbook-leanpub-affiliate"></div>\n\n';
        return page;
    },
    "page:after": function(page) {
        console.log('page:after');
        var config = this.options.pluginsConfig.leanpubAffiliate || {};
        config.queryString = config.queryString || '?a=27hVMyWVn46xaZCi6E563X&subID=gitbookPlugin';
        var ad = pickAd();
        console.log('page:after', ad);
        out = '\n\n<a href="'+ad.url+config.queryString+'" class="gitbook-leanpub-affiliate">';
        out += '<img src="'+ad.image+'" />';
        out += '<span>'+ad.title+' by '+ad.author_string+'</span>';
        out += '\n</a>\n\n';

        page.content = page.content.replace('<div class="gitbook-leanpub-affiliate"></div>', out);
        return page;
    },
};
