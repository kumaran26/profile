define("sf/mobile-bridge", [], function() {
    function e() {}

    function t() {}

    function n() {}
    var r, o = !!window.iOSBridge,
        i = !!window.AndroidBridge;
    return o ? r = window.iOSBridge : i && (r = window.AndroidBridge), e.prototype.isIOS = o, e.prototype.isAndroid = i, e.prototype.isMobile = o || i, e.prototype.isDesktop = !o && !i, t.prototype = new e, t.prototype.getBaseUrl = function() {
        return r.getAjaxBaseUrl()
    }, t.prototype.getCSRFToken = function() {
        return r.getCSRFToken()
    }, n.prototype = new e, n.prototype.getBaseUrl = function() {
        return r.getBaseURL()
    }, n.prototype.getCSRFToken = function() {
        return r.getCSRFToken()
    }, o ? new n : i ? new t : new e
}), define("sf/appcontext", ["jquery", "./mobile-bridge"], function(e, t) {
    function n(e) {
        return /.*\/$/.test(e) ? e : e += "/"
    }

    function r(e) {
        return /^\/.*/.test(e) ? e.substring(1) : e
    }
    return function(o) {
        var i = e(o).data("urlContext");
        if (void 0 === i || null === i) throw new Error("The application context could not be determined.");
        return t.isDesktop ? i : n(t.getBaseUrl()) + r(i)
    }
}), define("sf/csrf", ["jquery", "./mobile-bridge", "module"], function(e, t, n) {
    function r() {
        if (t.isMobile) {
            var e = o();
            if (null !== e) return i(e), e
        }
        var n, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
            u = 128,
            a = "";
        for (n = 0; u > n; n++) {
            var s = Math.floor(Math.random() * r.length);
            a += r.substring(s, s + 1)
        }
        return i(encodeURIComponent(a)), encodeURIComponent(a)
    }
    
    function csrfCookieExists() {
        if (typeof document !== "undefined") {
            if (document.cookie && document.cookie.indexOf(d) >= 0) {
                return true;
            }
        }
        return false;
    }
    function getTokenFromCookie() {
        const allCookiesArray = document.cookie.split(';');
        for (var i = 0; i < allCookiesArray.length; i++) {
			var cookie = allCookiesArray[i];
            var tempCookie = cookie.trim();
            if (tempCookie.split('=')[0] === d) {
                return decodeURIComponent(tempCookie.split('=')[1]);
            }
        }
    }
    function getToken() {
        if (csrfCookieExists()) {
            c = getTokenFromCookie();
        } else if (!c || window.newTabOpened) {
            window.newTabOpened = false
            c = r();
        }
        return c;
    }

    function o() {
        return t.isMobile && "function" == typeof t.getCSRFToken ? t.getCSRFToken() : null
    }

    function i(e, t) {
        window.document.cookie = d + "=" + e + "; Path=/" + (n.config().secure !== !1 ? "; Secure" : "") + (void 0 !== t ? ";expires=Thu, 01 Jan 1970 00:00:00 UTC" : "")
    }

    function u() {
        e.ajaxPrefilter(function(e, t, n) {
            n.setRequestHeader(d, getToken())
        })
    }
    
    function f() {
        g || (g = !0,  u())
    }
    var c, l = {},
        d = encodeURIComponent("CSRF"),
        g = !1;
    return l.addTokenOnSubmit = function(t) {
        var n = e(t);
        if ("string" != typeof n.prop("tagName") || "FORM" !== n.prop("tagName").toUpperCase()) throw "Cannot add token on other elements than a form";
        if ("string" == typeof n.attr("method") && "post" === n.attr("method").toLowerCase()) {
            c = r();
            var o = e("<input>").attr("type", "hidden").attr("name", d).attr("value", c);
            n.append(o)
        }
    }, f(), l
}), define("sf/errlog", ["jquery"], function(e) {
    function t(t) {
        e.ajax({
            type: "POST",
            url: o.url,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(t)
        })
    }

    function n() {
        a = !1;
        for (var e = [], n = u.length, r = 0; n > r; r++) {
            var i = u[r],
                s = {
                    loc: i.loc,
                    ln: i.line ? i.line.toString() : "",
                    err: i.msg.substr(0, o.maxMsgLength)
                };
            e[r] = s
        }
        u = [];
        var f = {
            url: document.URL,
            errors: e
        };
        t(f)
    }
    var r = {},
        o = {
            localMode: !1,
            preventDefault: !1,
            maxMsgLength: 1024,
            maxErrorQueue: 1024,
            laps: 1e3,
            url: "rpc/logError"
        },
        i = null,
        u = [],
        a = !1;
    return r.queueError = function(e, t, n) {
        if (u.length > 0) {
            var r = u.pop();
            (r.msg !== e || r.loc !== t || r.line !== n) && u.push(r)
        }
        u.length < o.maxErrorQueue && u.push({
            msg: e,
            loc: t,
            line: n
        })
    }, r.onerror = function(e, t, u) {
        return r.queueError(e, t, u), "function" == typeof i && i(e, t, u), a || (a = !0, window.setTimeout(n, o.laps)), o.localMode ? !1 : o.preventDefault
    }, r.config = function(t) {
        if (void 0 !== t) {
            if ("undefined" != typeof t.url && (null === t.url || "" === t.url)) throw new Error("url cannot be empty");
            o = e.extend({}, o, t)
        }
        return Object.create(o)
    }, r.reset = function() {
        u = []
    }, i = window.onerror, window.onerror = r.onerror, Object.freeze(r), r
}), define("sf/fluid", ["jquery"], function(e) {
    function t(t, n) {
        n || (n = r);
        var o = e(t),
            i = o.outerWidth();
        o.removeClass(n.breakpointClasses.join(" "));
        var u = 0;
        for (u = 0; u < n.breakpoints.length; u++) {
            var a = n.breakpoints[u];
            if (a >= i) {
                o.addClass(n.breakpointClasses[u]);
                break
            }
        }
    }
    var n = {},
        r = {
            breakpoints: [320, 480, 768, 940, 1210],
            breakpointClasses: ["tiny", "small", "medium", "large", "huge"]
        },
        o = {};
    return n.update = function(r, o) {
        return e(r).each(function() {
            t(this, o)
        }), n
    }, n.updateRegistered = function() {
        var e;
        for (e in o) o.hasOwnProperty(e) && n.update(e, o[e]);
        return n
    }, n.register = function(e, t) {
        return o[e] = t, n
    }, e(window).resize(function() {
        n.updateRegistered()
    }), Object.freeze(n), n
}), define("sf/form", ["jquery"], function(e) {
    return e.fn.protectForm = function(t) {
            var n = {
                    type: "POST"
                },
                r = "protect-form-submitted";
            return this.each(function() {
                e(this).data(r, !1).on("submit", function(o) {
                    o.preventDefault();
                    var i, u, a = e(this),
                        s = e.extend(!0, {}, n, t);
                    s.url = s.url || a.attr("action"), a.data(r) || (a.data(r, !0), s.before && s.before.apply(a[0]), i = {
                        url: s.url,
                        type: s.type
                    }, "POST" === s.type && (i.data = a.serialize()), u = e.ajax(i).always(function() {
                        a.data(r, !1)
                    }), e.each(["done", "fail", "always"], function(e, t) {
                        s[t] && u[t](s[t])
                    }))
                })
            })
        },
        function(t, n, r) {
            e(n, t).protectForm(r)
        }
}), define("sf/history", ["require"], function() {
    var e = {};
        window.sf_history_callbacks =  window.sf_history_callbacks || {};
        window.sf_history_initialStates = window.sf_history_initialStates||{};
    return window.onpopstate = function(e) {
        var r, o, i = e ? e.state : window.history.state;
        for (r in window.sf_history_callbacks)
            if (window.sf_history_callbacks.hasOwnProperty(r)) {
                var u = window.sf_history_callbacks[r];
                u && (o = void 0, i && (o = i[r]), void 0 === o && (o = window.sf_history_initialStates[r]), void 0 !== o && u(o))
            }
    }, e.push = function(e, t) {
        var n = window.history.state;
        n || (n = {}), n[e] = t, window.history.pushState && window.history.pushState(n, "Last state of element id " + e)
    }, e.register = function(e, r, o) {
        return window.sf_history_callbacks[e] = r, void 0 !== o && (window.sf_history_initialStates[e] = o), e
    }, e.unregister = function(e) {
        window.sf_history_callbacks[e] = null
    }, Object.freeze(e), e
}), define("sf/messaging", ["pagebus"], function() {
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
}), define("sf/wcm", ["pagebus", "jquery"], function(e, t) {
    var n = {};
    return n.ERROR_TOPIC = "wcm.sf.displayError", n.notifyError = function(t) {
        e.publish(n.ERROR_TOPIC, t)
    }, n.load = function(e, n, r, o, i, u) {
        var a = t(e);
        if (void 0 === o && (o = a.data("wcmcontentType"), void 0 === o || null === o)) throw new Error("WCM content type could not be determined.");
        if (void 0 === i && (i = a.data("wcmcontentAsset"), void 0 === i || null === i)) throw new Error("WCM content asset could not be determined.");
        void 0 === u && (u = a.data("wcmcontentIframe"));
        var s = n + o + "?axes1=" + r.language() + "&axes2=" + r.distributionChannel() + "&axes3=" + r.territory() + "&axes4=" + r.audience() + "&asset=" + i;
        if (u) a.html("<iframe seamless='seamless' scrolling='no' style='width:100%; height: 100%;'></iframe>"), t("iframe", a).attr("src", s);
        else {
            var f = document.createElement("a");
            f.href = s;
            var c = f.protocol + "//" + f.host;
            t.ajax({
                type: "GET",
                url: s,
                csrf: !1,
                success: function(e) {
                    e = e.replace(/(\/rsc\/|\/sites\/)/g, c + "$1");
                    var n = t(e).filter(function(e, t) {
                        return 1 == t.nodeType && "sf-master" == t.id
                    });
                    a.html(n)
                }
            }).fail(function(e, t, n) {
                throw new Error("WCM content load error " + t + " " + n + " for " + s)
            })
        }
    }, Object.freeze(n), n
}), define("sf/axes", [], function() {
    var e = {},
        t = {
            language: "",
            territory: "",
            audience: "",
            distributionChannel: ""
        },
        n = null;
    return e.language = function() {
        return e.cookieValue("language")
    }, e.territory = function() {
        return e.cookieValue("territory")
    }, e.audience = function() {
        return e.cookieValue("audience")
    }, e.distributionChannel = function() {
        return e.cookieValue("distributionChannel")
    }, e.cookieValue = function(e) {
        var r = "axes",
            o = document.cookie;
        if (o != n && o.indexOf(r) >= 0) {
            for (var i = o.split(";"), u = null, a = 0; a < i.length; a++) {
                var s = i[a].trim();
                if (s.split('=')[0] === r) {
                    u = decodeURIComponent(s.split('=')[1]);
                    break
                }
            }
            if (null !== u && u.indexOf("|") >= 0) {
                var f = u.split("|");
                f.length >= 4 && (t.language = f[0], t.distributionChannel = f[1], t.territory = f[2], t.audience = f[3])
            }
            n = o
        }
        return t[e]
    }, Object.freeze(e), e
}), define("sf", ["./sf/appcontext", "./sf/csrf", "./sf/errlog", "./sf/fluid", "./sf/form", "./sf/history", "./sf/messaging", "./sf/wcm", "./sf/axes", "./sf/mobile-bridge"], function(e, t, n, r, o, i, u, a, s, f) {
    var c = {};
    return c.getApplicationContext = e, c.errlog = n, c.fluid = r, c.protectForm = o, c.history = i, c.messaging = u, c.wcm = a, c.axes = s, c.mobileBridge = f, c.csrf = t, c
}); //