require(["gitbook"], function(gitbook) {
    var leanpubAffiliateConfig;

    function reload() {
    }

    gitbook.events.bind("start", function(e, config) {
        leanpubAffiliateConfig = config.share || {};
        reload();
    });

    gitbook.events.bind("page.change", function() {
        leanpubAffiliateConfig = leanpubAffiliateConfig || {};
        reload();
    });

    gitbook.events.bind("exercise.submit", function(e, data) {});
});
