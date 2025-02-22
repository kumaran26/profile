define("page/messaging", ["pagebus"], function() {
    var e = {};
    return e.subscribeTopic = function(e, t) {
        window.top.PageBus.subscribe(e, this, function(e, n) {
            t(n)
        })
    }, e.publishTopic = function(e, t) {
        window.top.PageBus.publish(e, t)
    }, e.queryTopic = function(e) {
        for (var t = window.top.PageBus.query(e), n = [], r = 0; r < t.length; r++) n.push(t[r].value);
        return n
    }, e.storeTopic = function(e, t) {
        window.top.PageBus.subscribe(e, function() {}, null, {
            PageBus: {
                cache: !0
            }
        }), window.top.PageBus.store(e, t)
    }, Object.freeze(e), e
})