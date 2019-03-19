(function () {
    function W(d, c, b) {
        var a;
        c = c.toLowerCase();
        return (a = d.__allListeners || b && (d.__allListeners = {})) && (a[c] || b && (a[c] = []))
    }

    function X(d, c, b, a, e, h) {
        a = a && d[c];
        var g;
        for (!a && (a = d[b]); !a && (g = (g || d).parentNode);) {
            if ("BODY" == g.tagName || h && !h(g)) return null;
            a = g[b]
        }
        return a && e && !e(a) ? X(a, c, b, !1, e) : a
    }

    UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};
    var s = window.baidu || {};
    window.baidu = s;
    window.UE = s.editor = window.UE || {};
    UE.plugins = {};
    UE.commands = {};
    UE.instants = {};
    UE.I18N = {};
    UE._customizeUI = {};
    UE.version = "1.4.3";
    var L = UE.dom = {}, r = UE.browser = function () {
        var d = navigator.userAgent.toLowerCase(), c = window.opera, b = {
            ie: /(msie\s|trident.*rv:)([\w.]+)/.test(d),
            opera: !!c && c.version,
            webkit: -1 < d.indexOf(" applewebkit/"),
            mac: -1 < d.indexOf("macintosh"),
            quirks: "BackCompat" == document.compatMode
        };
        b.gecko = "Gecko" == navigator.product && !b.webkit && !b.opera && !b.ie;
        var a = 0;
        if (b.ie) {
            var a = d.match(/(?:msie\s([\w.]+))/), e = d.match(/(?:trident.*rv:([\w.]+))/),
                a = a && e && a[1] && e[1] ? Math.max(1 * a[1], 1 * e[1]) : a && a[1] ? 1 * a[1] : e && e[1] ? 1 * e[1] : 0;
            b.ie11Compat =
                11 == document.documentMode;
            b.ie9Compat = 9 == document.documentMode;
            b.ie8 = !!document.documentMode;
            b.ie8Compat = 8 == document.documentMode;
            b.ie7Compat = 7 == a && !document.documentMode || 7 == document.documentMode;
            b.ie6Compat = 7 > a || b.quirks;
            b.ie9above = 8 < a;
            b.ie9below = 9 > a;
            b.ie11above = 10 < a;
            b.ie11below = 11 > a
        }
        b.gecko && (e = d.match(/rv:([\d\.]+)/)) && (e = e[1].split("."), a = 1E4 * e[0] + 100 * (e[1] || 0) + 1 * (e[2] || 0));
        /chrome\/(\d+\.\d)/i.test(d) && (b.chrome = +RegExp.$1);
        /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(d) && !/chrome/i.test(d) &&
        (b.safari = +(RegExp.$1 || RegExp.$2));
        b.opera && (a = parseFloat(c.version()));
        b.webkit && (a = parseFloat(d.match(/ applewebkit\/(\d+)/)[1]));
        b.version = a;
        b.isCompatible = !b.mobile && (b.ie && 6 <= a || b.gecko && 10801 <= a || b.opera && 9.5 <= a || b.air && 1 <= a || b.webkit && 522 <= a || !1);
        return b
    }(), I = r.ie, ma = r.opera, p = UE.utils = {
        each: function (d, c, b) {
            if (null != d) if (d.length === +d.length) for (var a = 0, e = d.length; a < e; a++) {
                if (!1 === c.call(b, d[a], a, d)) return !1
            } else for (a in d) if (d.hasOwnProperty(a) && !1 === c.call(b, d[a], a, d)) return !1
        }, makeInstance: function (d) {
            var c =
                new Function;
            c.prototype = d;
            d = new c;
            c.prototype = null;
            return d
        }, extend: function (d, c, b) {
            if (c) for (var a in c) b && d.hasOwnProperty(a) || (d[a] = c[a]);
            return d
        }, extend2: function (d) {
            for (var c = arguments, b = 1; b < c.length; b++) {
                var a = c[b], e;
                for (e in a) d.hasOwnProperty(e) || (d[e] = a[e])
            }
            return d
        }, inherits: function (d, c) {
            var b = d.prototype, a = p.makeInstance(c.prototype);
            p.extend(a, b, !0);
            d.prototype = a;
            return a.constructor = d
        }, bind: function (d, c) {
            return function () {
                return d.apply(c, arguments)
            }
        }, defer: function (d, c, b) {
            var a;
            return function () {
                b &&
                clearTimeout(a);
                a = setTimeout(d, c)
            }
        }, indexOf: function (d, c, b) {
            var a = -1;
            b = this.isNumber(b) ? b : 0;
            this.each(d, function (e, h) {
                if (h >= b && e === c) return a = h, !1
            });
            return a
        }, removeItem: function (d, c) {
            for (var b = 0, a = d.length; b < a; b++) d[b] === c && (d.splice(b, 1), b--)
        }, trim: function (d) {
            return d.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
        }, listToMap: function (d) {
            if (!d) return {};
            d = p.isArray(d) ? d : d.split(",");
            for (var c = 0, b, a = {}; b = d[c++];) a[b.toUpperCase()] = a[b] = 1;
            return a
        }, unhtml: function (d, c) {
            return d ? d.replace(c || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g,
                function (b, a) {
                    return a ? b : {"<": "&lt;", "&": "&amp;", '"': "&quot;", ">": "&gt;", "'": "&#39;"}[b]
                }) : ""
        }, html: function (d) {
            return d ? d.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (c) {
                return {"&lt;": "<", "&amp;": "&", "&quot;": '"', "&gt;": ">", "&#39;": "'", "&nbsp;": " "}[c]
            }) : ""
        }, cssStyleToDomStyle: function () {
            var d = document.createElement("div").style,
                c = {"float": void 0 != d.cssFloat ? "cssFloat" : void 0 != d.styleFloat ? "styleFloat" : "float"};
            return function (b) {
                return c[b] || (c[b] = b.toLowerCase().replace(/-./g, function (a) {
                    return a.charAt(1).toUpperCase()
                }))
            }
        }(),
        loadFile: function () {
            function d(b, a) {
                try {
                    for (var e = 0, h; h = c[e++];) if (h.doc === b && h.url == (a.src || a.href)) return h
                } catch (g) {
                    return null
                }
            }

            var c = [];
            return function (b, a, e) {
                var h = d(b, a);
                if (h) h.ready ? e && e() : h.funs.push(e); else if (c.push({
                    doc: b,
                    url: a.src || a.href,
                    funs: [e]
                }), !b.body) {
                    e = [];
                    for (var g in a) "tag" != g && e.push(g + '="' + a[g] + '"');
                    b.write("<" + a.tag + " " + e.join(" ") + " ></" + a.tag + ">")
                } else if (!a.id || !b.getElementById(a.id)) {
                    var l = b.createElement(a.tag);
                    delete a.tag;
                    for (g in a) l.setAttribute(g, a[g]);
                    l.onload =
                        l.onreadystatechange = function () {
                            if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                                h = d(b, a);
                                if (0 < h.funs.length) {
                                    h.ready = 1;
                                    for (var e; e = h.funs.pop();) e()
                                }
                                l.onload = l.onreadystatechange = null
                            }
                        };
                    l.onerror = function () {
                        throw Error("The load " + (a.href || a.src) + " fails,check the url settings of file ueditor.config.js ");
                    };
                    b.getElementsByTagName("head")[0].appendChild(l)
                }
            }
        }(), isEmptyObject: function (d) {
            if (null == d) return !0;
            if (this.isArray(d) || this.isString(d)) return 0 === d.length;
            for (var c in d) if (d.hasOwnProperty(c)) return !1;
            return !0
        }, fixColor: function (d, c) {
            if (/color/i.test(d) && /rgba?/.test(c)) {
                var b = c.split(",");
                if (3 < b.length) return "";
                c = "#";
                for (var a = 0, e; e = b[a++];) e = parseInt(e.replace(/[^\d]/gi, ""), 10).toString(16), c += 1 == e.length ? "0" + e : e;
                c = c.toUpperCase()
            }
            return c
        }, optCss: function (d) {
            function c(a, b) {
                if (!a) return "";
                var g = a.top, c = a.bottom, k = a.left, d = a.right, n = "";
                if (g && k && c && d) n += ";" + b + ":" + (g == c && c == k && k == d ? g : g == c && k == d ? g + " " + k : k == d ? g + " " + k + " " + c : g + " " + d + " " + c + " " + k) + ";"; else for (var f in a) n += ";" + b + "-" + f + ":" + a[f] + ";";
                return n
            }

            var b, a;
            d = d.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function (e, c, g, l) {
                if (1 == l.split(" ").length) switch (c) {
                    case "padding":
                        return !b && (b = {}), b[g] = l, "";
                    case "margin":
                        return !a && (a = {}), a[g] = l, "";
                    case "border":
                        return "initial" == l ? "" : e
                }
                return e
            });
            d += c(b, "padding") + c(a, "margin");
            return d.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g, function (a, b) {
                return b ? b + ";;" : ";"
            })
        }, clone: function (d, c) {
            var b;
            c = c || {};
            for (var a in d) d.hasOwnProperty(a) &&
            (b = d[a], "object" == typeof b ? (c[a] = p.isArray(b) ? [] : {}, p.clone(d[a], c[a])) : c[a] = b);
            return c
        }, transUnitToPx: function (d) {
            if (!/(pt|cm)/.test(d)) return d;
            var c;
            d.replace(/([\d.]+)(\w+)/, function (b, a, e) {
                d = a;
                c = e
            });
            switch (c) {
                case "cm":
                    d = 25 * parseFloat(d);
                    break;
                case "pt":
                    d = Math.round(96 * parseFloat(d) / 72)
            }
            return d + (d ? "px" : "")
        }, domReady: function () {
            function d(b) {
                for (b.isReady = !0; b = c.pop(); b()) ;
            }

            var c = [];
            return function (b, a) {
                a = a || window;
                var e = a.document;
                b && c.push(b);
                "complete" === e.readyState ? d(e) : (e.isReady && d(e),
                    r.ie && 11 != r.version ? (function () {
                        if (!e.isReady) {
                            try {
                                e.documentElement.doScroll("left")
                            } catch (a) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            d(e)
                        }
                    }(), a.attachEvent("onload", function () {
                        d(e)
                    })) : (e.addEventListener("DOMContentLoaded", function () {
                        e.removeEventListener("DOMContentLoaded", arguments.callee, !1);
                        d(e)
                    }, !1), a.addEventListener("load", function () {
                        d(e)
                    }, !1)))
            }
        }(), cssRule: r.ie && 11 != r.version ? function (d, c, b) {
            var a, e;
            if (void 0 === c || c && c.nodeType && 9 == c.nodeType) {
                if (b = c && c.nodeType && 9 == c.nodeType ? c : b || document,
                    a = b.indexList || (b.indexList = {}), e = a[d], void 0 !== e) return b.styleSheets[e].cssText
            } else {
                b = b || document;
                a = b.indexList || (b.indexList = {});
                e = a[d];
                if ("" === c) return void 0 !== e ? (b.styleSheets[e].cssText = "", delete a[d], !0) : !1;
                void 0 !== e ? sheetStyle = b.styleSheets[e] : (sheetStyle = b.createStyleSheet("", e = b.styleSheets.length), a[d] = e);
                sheetStyle.cssText = c
            }
        } : function (d, c, b) {
            var a;
            if (void 0 === c || c && c.nodeType && 9 == c.nodeType) return b = c && c.nodeType && 9 == c.nodeType ? c : b || document, (a = b.getElementById(d)) ? a.innerHTML : void 0;
            b = b || document;
            a = b.getElementById(d);
            if ("" === c) return a ? (a.parentNode.removeChild(a), !0) : !1;
            a ? a.innerHTML = c : (a = b.createElement("style"), a.id = d, a.innerHTML = c, b.getElementsByTagName("head")[0].appendChild(a))
        }, sort: function (d, c) {
            c = c || function (a, e) {
                return a.localeCompare(e)
            };
            for (var b = 0, a = d.length; b < a; b++) for (var e = b, h = d.length; e < h; e++) if (0 < c(d[b], d[e])) {
                var g = d[b];
                d[b] = d[e];
                d[e] = g
            }
            return d
        }, serializeParam: function (d) {
            var c = [], b;
            for (b in d) if ("method" != b && "timeout" != b && "async" != b) if ("function" != (typeof d[b]).toLowerCase() &&
                "object" != (typeof d[b]).toLowerCase()) c.push(encodeURIComponent(b) + "=" + encodeURIComponent(d[b])); else if (p.isArray(d[b])) for (var a = 0; a < d[b].length; a++) c.push(encodeURIComponent(b) + "[]=" + encodeURIComponent(d[b][a]));
            return c.join("&")
        }, formatUrl: function (d) {
            d = d.replace(/&&/g, "&");
            d = d.replace(/\?&/g, "?");
            d = d.replace(/&$/g, "");
            d = d.replace(/&#/g, "#");
            return d = d.replace(/&+/g, "&")
        }, isCrossDomainUrl: function (d) {
            var c = document.createElement("a");
            c.href = d;
            r.ie && (c.href = c.href);
            return !(c.protocol == location.protocol &&
                c.hostname == location.hostname && (c.port == location.port || "80" == c.port && "" == location.port || "" == c.port && "80" == location.port))
        }, clearEmptyAttrs: function (d) {
            for (var c in d) "" === d[c] && delete d[c];
            return d
        }, str2json: function (d) {
            return p.isString(d) ? window.JSON ? JSON.parse(d) : (new Function("return " + p.trim(d || "")))() : null
        }, json2str: function () {
            if (window.JSON) return JSON.stringify;
            var d = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"},
                c = function (a) {
                    /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g,
                        function (a) {
                            var b = d[a];
                            if (b) return b;
                            b = a.charCodeAt();
                            return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
                        }));
                    return '"' + a + '"'
                }, b = function (a) {
                    return 10 > a ? "0" + a : a
                };
            return function (a) {
                switch (typeof a) {
                    case "undefined":
                        return "undefined";
                    case "number":
                        return isFinite(a) ? String(a) : "null";
                    case "string":
                        return c(a);
                    case "boolean":
                        return String(a);
                    default:
                        if (null === a) return "null";
                        if (p.isArray(a)) {
                            var e = ["["], h = a.length, g, l, k;
                            for (l = 0; l < h; l++) switch (k = a[l], typeof k) {
                                case "undefined":
                                case "function":
                                case "unknown":
                                    break;
                                default:
                                    g && e.push(","), e.push(p.json2str(k)), g = 1
                            }
                            e.push("]");
                            return e.join("")
                        }
                        if (p.isDate(a)) return '"' + a.getFullYear() + "-" + b(a.getMonth() + 1) + "-" + b(a.getDate()) + "T" + b(a.getHours()) + ":" + b(a.getMinutes()) + ":" + b(a.getSeconds()) + '"';
                        g = ["{"];
                        l = p.json2str;
                        for (h in a) if (Object.prototype.hasOwnProperty.call(a, h)) switch (k = a[h], typeof k) {
                            case "undefined":
                            case "unknown":
                            case "function":
                                break;
                            default:
                                e && g.push(","), e = 1, g.push(l(h) + ":" + l(k))
                        }
                        g.push("}");
                        return g.join("")
                }
            }
        }()
    };
    p.each("String Function Array Number RegExp Object Date".split(" "),
        function (d) {
            UE.utils["is" + d] = function (c) {
                return Object.prototype.toString.apply(c) == "[object " + d + "]"
            }
        });
    var Z = UE.EventBase = function () {
    };
    Z.prototype = {
        addListener: function (d, c) {
            d = p.trim(d).split(/\s+/);
            for (var b = 0, a; a = d[b++];) W(this, a, !0).push(c)
        }, on: function (d, c) {
            return this.addListener(d, c)
        }, off: function (d, c) {
            return this.removeListener(d, c)
        }, trigger: function () {
            return this.fireEvent.apply(this, arguments)
        }, removeListener: function (d, c) {
            d = p.trim(d).split(/\s+/);
            for (var b = 0, a; a = d[b++];) p.removeItem(W(this,
                a) || [], c)
        }, fireEvent: function () {
            for (var d = arguments[0], d = p.trim(d).split(" "), c = 0, b; b = d[c++];) {
                var a = W(this, b), e, h, g;
                if (a) for (g = a.length; g--;) if (a[g]) {
                    h = a[g].apply(this, arguments);
                    if (!0 === h) return h;
                    void 0 !== h && (e = h)
                }
                if (h = this["on" + b.toLowerCase()]) e = h.apply(this, arguments)
            }
            return e
        }
    };
    var v = L.dtd = function () {
            function d(a) {
                for (var e in a) a[e.toUpperCase()] = a[e];
                return a
            }

            var c = p.extend2, b = d({isindex: 1, fieldset: 1}),
                a = d({input: 1, button: 1, select: 1, textarea: 1, label: 1}), e = c(d({a: 1}), a), h = c({iframe: 1}, e),
                g = d({
                    hr: 1,
                    ul: 1,
                    menu: 1,
                    div: 1,
                    blockquote: 1,
                    noscript: 1,
                    table: 1,
                    center: 1,
                    address: 1,
                    dir: 1,
                    pre: 1,
                    h5: 1,
                    dl: 1,
                    h4: 1,
                    noframes: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1
                }), l = d({ins: 1, del: 1, script: 1, style: 1}), k = c(d({
                    b: 1,
                    acronym: 1,
                    bdo: 1,
                    "var": 1,
                    "#": 1,
                    abbr: 1,
                    code: 1,
                    br: 1,
                    i: 1,
                    cite: 1,
                    kbd: 1,
                    u: 1,
                    strike: 1,
                    s: 1,
                    tt: 1,
                    strong: 1,
                    q: 1,
                    samp: 1,
                    em: 1,
                    dfn: 1,
                    span: 1
                }), l), m = c(d({
                    sub: 1,
                    img: 1,
                    embed: 1,
                    object: 1,
                    sup: 1,
                    basefont: 1,
                    map: 1,
                    applet: 1,
                    font: 1,
                    big: 1,
                    small: 1
                }), k), n = c(d({p: 1}), m), a = c(d({iframe: 1}), m, a), m = d({
                    img: 1,
                    embed: 1,
                    noscript: 1,
                    br: 1,
                    kbd: 1,
                    center: 1,
                    button: 1,
                    basefont: 1,
                    h5: 1,
                    h4: 1,
                    samp: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1,
                    form: 1,
                    font: 1,
                    "#": 1,
                    select: 1,
                    menu: 1,
                    ins: 1,
                    abbr: 1,
                    label: 1,
                    code: 1,
                    table: 1,
                    script: 1,
                    cite: 1,
                    input: 1,
                    iframe: 1,
                    strong: 1,
                    textarea: 1,
                    noframes: 1,
                    big: 1,
                    small: 1,
                    span: 1,
                    hr: 1,
                    sub: 1,
                    bdo: 1,
                    "var": 1,
                    div: 1,
                    object: 1,
                    sup: 1,
                    strike: 1,
                    dir: 1,
                    map: 1,
                    dl: 1,
                    applet: 1,
                    del: 1,
                    isindex: 1,
                    fieldset: 1,
                    ul: 1,
                    b: 1,
                    acronym: 1,
                    a: 1,
                    blockquote: 1,
                    i: 1,
                    u: 1,
                    s: 1,
                    tt: 1,
                    address: 1,
                    q: 1,
                    pre: 1,
                    p: 1,
                    em: 1,
                    dfn: 1
                }), f = c(d({a: 0}), a), t = d({tr: 1}), w = d({"#": 1}), y = c(d({param: 1}), m),
                u = c(d({form: 1}), b, h, g, n),
                C = d({li: 1, ol: 1, ul: 1}), E = d({style: 1, script: 1}), G = d({base: 1, link: 1, meta: 1, title: 1}),
                E = c(G, E), A = d({head: 1, body: 1}), N = d({html: 1}), r = d({
                    address: 1,
                    blockquote: 1,
                    center: 1,
                    dir: 1,
                    div: 1,
                    dl: 1,
                    fieldset: 1,
                    form: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    hr: 1,
                    isindex: 1,
                    menu: 1,
                    noframes: 1,
                    ol: 1,
                    p: 1,
                    pre: 1,
                    table: 1,
                    ul: 1
                }), s = d({
                    area: 1,
                    base: 1,
                    basefont: 1,
                    br: 1,
                    col: 1,
                    command: 1,
                    dialog: 1,
                    embed: 1,
                    hr: 1,
                    img: 1,
                    input: 1,
                    isindex: 1,
                    keygen: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    source: 1,
                    track: 1,
                    wbr: 1
                });
            return d({
                $nonBodyContent: c(N, A, G),
                $block: r,
                $inline: f,
                $inlineWithA: c(d({a: 1}),
                    f),
                $body: c(d({script: 1, style: 1}), r),
                $cdata: d({script: 1, style: 1}),
                $empty: s,
                $nonChild: d({iframe: 1, textarea: 1}),
                $listItem: d({dd: 1, dt: 1, li: 1}),
                $list: d({ul: 1, ol: 1, dl: 1}),
                $isNotEmpty: d({
                    table: 1,
                    ul: 1,
                    ol: 1,
                    dl: 1,
                    iframe: 1,
                    area: 1,
                    base: 1,
                    col: 1,
                    hr: 1,
                    img: 1,
                    embed: 1,
                    input: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1
                }),
                $removeEmpty: d({
                    a: 1,
                    abbr: 1,
                    acronym: 1,
                    address: 1,
                    b: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    q: 1,
                    s: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    tt: 1,
                    u: 1,
                    "var": 1
                }),
                $removeEmptyBlock: d({p: 1, div: 1}),
                $tableContent: d({
                    caption: 1,
                    col: 1,
                    colgroup: 1,
                    tbody: 1,
                    td: 1,
                    tfoot: 1,
                    th: 1,
                    thead: 1,
                    tr: 1,
                    table: 1
                }),
                $notTransContent: d({pre: 1, script: 1, style: 1, textarea: 1}),
                html: A,
                head: E,
                style: w,
                script: w,
                body: u,
                base: {},
                link: {},
                meta: {},
                title: w,
                col: {},
                tr: d({td: 1, th: 1}),
                img: {},
                embed: {},
                colgroup: d({thead: 1, col: 1, tbody: 1, tr: 1, tfoot: 1}),
                noscript: u,
                td: u,
                br: {},
                th: u,
                center: u,
                kbd: f,
                button: c(n, g),
                basefont: {},
                h5: f,
                h4: f,
                samp: f,
                h6: f,
                ol: C,
                h1: f,
                h3: f,
                option: w,
                h2: f,
                form: c(b, h, g, n),
                select: d({
                    optgroup: 1,
                    option: 1
                }),
                font: f,
                ins: f,
                menu: C,
                abbr: f,
                label: f,
                table: d({thead: 1, col: 1, tbody: 1, tr: 1, colgroup: 1, caption: 1, tfoot: 1}),
                code: f,
                tfoot: t,
                cite: f,
                li: u,
                input: {},
                iframe: u,
                strong: f,
                textarea: w,
                noframes: u,
                big: f,
                small: f,
                span: d({"#": 1, br: 1, b: 1, strong: 1, u: 1, i: 1, em: 1, sub: 1, sup: 1, strike: 1, span: 1}),
                hr: f,
                dt: f,
                sub: f,
                optgroup: d({option: 1}),
                param: {},
                bdo: f,
                "var": f,
                div: u,
                object: y,
                sup: f,
                dd: u,
                strike: f,
                area: {},
                dir: C,
                map: c(d({area: 1, form: 1, p: 1}), b, l, g),
                applet: y,
                dl: d({dt: 1, dd: 1}),
                del: f,
                isindex: {},
                fieldset: c(d({legend: 1}), m),
                thead: t,
                ul: C,
                acronym: f,
                b: f,
                a: c(d({a: 1}), a),
                blockquote: c(d({td: 1, tr: 1, tbody: 1, li: 1}), u),
                caption: f,
                i: f,
                u: f,
                tbody: t,
                s: f,
                address: c(h, n),
                tt: f,
                legend: f,
                q: f,
                pre: c(k, e),
                p: c(d({a: 1}), f),
                em: f,
                dfn: f
            })
        }(), ea = I && 9 > r.version ? {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder"
        } : {tabindex: "tabIndex", readonly: "readOnly"},
        oa = p.listToMap("-webkit-box -moz-box block list-item table table-row-group table-header-group table-footer-group table-row table-column-group table-column table-cell table-caption".split(" ")),
        f = L.domUtils = {
            NODE_ELEMENT: 1,
            NODE_DOCUMENT: 9,
            NODE_TEXT: 3,
            NODE_COMMENT: 8,
            NODE_DOCUMENT_FRAGMENT: 11,
            POSITION_IDENTICAL: 0,
            POSITION_DISCONNECTED: 1,
            POSITION_FOLLOWING: 2,
            POSITION_PRECEDING: 4,
            POSITION_IS_CONTAINED: 8,
            POSITION_CONTAINS: 16,
            fillChar: I && "6" == r.version ? "\ufeff" : "\u200b",
            keys: {8: 1, 46: 1, 16: 1, 17: 1, 18: 1, 37: 1, 38: 1, 39: 1, 40: 1, 13: 1},
            getPosition: function (d, c) {
                if (d === c) return 0;
                var b, a = [d], e = [c];
                for (b = d; b = b.parentNode;) {
                    if (b === c) return 10;
                    a.push(b)
                }
                for (b = c; b = b.parentNode;) {
                    if (b === d) return 20;
                    e.push(b)
                }
                a.reverse();
                e.reverse();
                if (a[0] !== e[0]) return 1;
                for (b = -1; b++, a[b] === e[b];) ;
                d = a[b];
                for (c = e[b]; d = d.nextSibling;) if (d === c) return 4;
                return 2
            },
            getNodeIndex: function (d, c) {
                for (var b = d, a = 0; b = b.previousSibling;) c && 3 == b.nodeType ? b.nodeType != b.nextSibling.nodeType && a++ : a++;
                return a
            },
            inDoc: function (d, c) {
                return 10 == f.getPosition(d, c)
            },
            findParent: function (d, c, b) {
                if (d && !f.isBody(d)) for (d = b ? d : d.parentNode; d;) {
                    if (!c || c(d) || f.isBody(d)) return c && !c(d) && f.isBody(d) ? null : d;
                    d = d.parentNode
                }
                return null
            },
            findParentByTagName: function (d,
                                           c, b, a) {
                c = p.listToMap(p.isArray(c) ? c : [c]);
                return f.findParent(d, function (e) {
                    return c[e.tagName] && !(a && a(e))
                }, b)
            },
            findParents: function (d, c, b, a) {
                for (c = c && (b && b(d) || !b) ? [d] : []; d = f.findParent(d, b);) c.push(d);
                return a ? c : c.reverse()
            },
            insertAfter: function (d, c) {
                return d.nextSibling ? d.parentNode.insertBefore(c, d.nextSibling) : d.parentNode.appendChild(c)
            },
            remove: function (d, c) {
                var b = d.parentNode, a;
                if (b) {
                    if (c && d.hasChildNodes()) for (; a = d.firstChild;) b.insertBefore(a, d);
                    b.removeChild(d)
                }
                return d
            },
            getNextDomNode: function (d,
                                      c, b, a) {
                return X(d, "firstChild", "nextSibling", c, b, a)
            },
            getPreDomNode: function (d, c, b, a) {
                return X(d, "lastChild", "previousSibling", c, b, a)
            },
            isBookmarkNode: function (d) {
                return 1 == d.nodeType && d.id && /^_baidu_bookmark_/i.test(d.id)
            },
            getWindow: function (d) {
                d = d.ownerDocument || d;
                return d.defaultView || d.parentWindow
            },
            getCommonAncestor: function (d, c) {
                if (d === c) return d;
                for (var b = [d], a = [c], e = d, h = -1; e = e.parentNode;) {
                    if (e === c) return e;
                    b.push(e)
                }
                for (e = c; e = e.parentNode;) {
                    if (e === d) return e;
                    a.push(e)
                }
                b.reverse();
                for (a.reverse(); h++,
                b[h] === a[h];) ;
                return 0 == h ? null : b[h - 1]
            },
            clearEmptySibling: function (d, c, b) {
                function a(a, b) {
                    for (var g; a && !f.isBookmarkNode(a) && (f.isEmptyInlineElement(a) || !RegExp("[^\t\n\r" + f.fillChar + "]").test(a.nodeValue));) g = a[b], f.remove(a), a = g
                }

                !c && a(d.nextSibling, "nextSibling");
                !b && a(d.previousSibling, "previousSibling")
            },
            split: function (d, c) {
                var b = d.ownerDocument;
                if (r.ie && c == d.nodeValue.length) {
                    var a = b.createTextNode("");
                    return f.insertAfter(d, a)
                }
                a = d.splitText(c);
                r.ie8 && (b = b.createTextNode(""), f.insertAfter(a, b),
                    f.remove(b));
                return a
            },
            isWhitespace: function (d) {
                return !RegExp("[^ \t\n\r" + f.fillChar + "]").test(d.nodeValue)
            },
            getXY: function (d) {
                for (var c = 0, b = 0; d.offsetParent;) b += d.offsetTop, c += d.offsetLeft, d = d.offsetParent;
                return {x: c, y: b}
            },
            on: function (d, c, b) {
                var a = p.isArray(c) ? c : p.trim(c).split(/\s+/), e = a.length;
                if (e) for (; e--;) if (c = a[e], d.addEventListener) d.addEventListener(c, b, !1); else {
                    b._d || (b._d = {els: []});
                    var h = c + b.toString(), g = p.indexOf(b._d.els, d);
                    b._d[h] && -1 != g || (-1 == g && b._d.els.push(d), b._d[h] || (b._d[h] = function (a) {
                        return b.call(a.srcElement,
                            a || window.event)
                    }), d.attachEvent("on" + c, b._d[h]))
                }
                d = null
            },
            un: function (d, c, b) {
                var a = p.isArray(c) ? c : p.trim(c).split(/\s+/), e = a.length;
                if (e) for (; e--;) if (c = a[e], d.removeEventListener) d.removeEventListener(c, b, !1); else {
                    var h = c + b.toString();
                    try {
                        d.detachEvent("on" + c, b._d ? b._d[h] : b)
                    } catch (g) {
                    }
                    b._d && b._d[h] && (c = p.indexOf(b._d.els, d), -1 != c && b._d.els.splice(c, 1), 0 == b._d.els.length && delete b._d[h])
                }
            },
            isSameElement: function (d, c) {
                if (d.tagName != c.tagName) return !1;
                var b = d.attributes, a = c.attributes;
                if (!I && b.length !=
                    a.length) return !1;
                for (var e, h, g = 0, l = 0, k = 0; e = b[k++];) {
                    if ("style" == e.nodeName) if (e.specified && g++, f.isSameStyle(d, c)) continue; else return !1;
                    if (I) if (e.specified) g++, h = a.getNamedItem(e.nodeName); else continue; else h = c.attributes[e.nodeName];
                    if (!h.specified || e.nodeValue != h.nodeValue) return !1
                }
                if (I) {
                    for (k = 0; h = a[k++];) h.specified && l++;
                    if (g != l) return !1
                }
                return !0
            },
            isSameStyle: function (d, c) {
                var b = d.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"),
                    a = c.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g,
                        ":");
                if (r.opera) {
                    b = d.style;
                    a = c.style;
                    if (b.length != a.length) return !1;
                    for (var e in b) if (!/^(\d+|csstext)$/i.test(e) && b[e] != a[e]) return !1;
                    return !0
                }
                if (!b || !a) return b == a;
                b = b.split(";");
                a = a.split(";");
                if (b.length != a.length) return !1;
                e = 0;
                for (var h; h = b[e++];) if (-1 == p.indexOf(a, h)) return !1;
                return !0
            },
            isBlockElm: function (d) {
                return 1 == d.nodeType && (v.$block[d.tagName] || oa[f.getComputedStyle(d, "display")]) && !v.$nonChild[d.tagName]
            },
            isBody: function (d) {
                return d && 1 == d.nodeType && "body" == d.tagName.toLowerCase()
            },
            breakParent: function (d,
                                   c) {
                var b, a = d, e = d, h, g;
                do {
                    a = a.parentNode;
                    h ? (b = a.cloneNode(!1), b.appendChild(h), h = b, b = a.cloneNode(!1), b.appendChild(g), g = b) : (h = a.cloneNode(!1), g = h.cloneNode(!1));
                    for (; b = e.previousSibling;) h.insertBefore(b, h.firstChild);
                    for (; b = e.nextSibling;) g.appendChild(b);
                    e = a
                } while (c !== a);
                b = c.parentNode;
                b.insertBefore(h, c);
                b.insertBefore(g, c);
                b.insertBefore(d, g);
                f.remove(c);
                return d
            },
            isEmptyInlineElement: function (d) {
                if (1 != d.nodeType || !v.$removeEmpty[d.tagName]) return 0;
                for (d = d.firstChild; d;) {
                    if (f.isBookmarkNode(d) ||
                        1 == d.nodeType && !f.isEmptyInlineElement(d) || 3 == d.nodeType && !f.isWhitespace(d)) return 0;
                    d = d.nextSibling
                }
                return 1
            },
            trimWhiteTextNode: function (d) {
                function c(b) {
                    for (var a; (a = d[b]) && 3 == a.nodeType && f.isWhitespace(a);) d.removeChild(a)
                }

                c("firstChild");
                c("lastChild")
            },
            mergeChild: function (d, c, b) {
                c = f.getElementsByTagName(d, d.tagName.toLowerCase());
                for (var a = 0, e; e = c[a++];) if (e.parentNode && !f.isBookmarkNode(e)) if ("span" == e.tagName.toLowerCase()) {
                    if (d === e.parentNode && (f.trimWhiteTextNode(d), 1 == d.childNodes.length)) {
                        d.style.cssText =
                            e.style.cssText + ";" + d.style.cssText;
                        f.remove(e, !0);
                        continue
                    }
                    e.style.cssText = d.style.cssText + ";" + e.style.cssText;
                    if (b) {
                        var h = b.style;
                        if (h) for (var h = h.split(";"), g = 0, l; l = h[g++];) e.style[p.cssStyleToDomStyle(l.split(":")[0])] = l.split(":")[1]
                    }
                    f.isSameStyle(e, d) && f.remove(e, !0)
                } else f.isSameElement(d, e) && f.remove(e, !0)
            },
            getElementsByTagName: function (d, c, b) {
                if (b && p.isString(b)) {
                    var a = b;
                    b = function (e) {
                        return f.hasClass(e, a)
                    }
                }
                c = p.trim(c).replace(/[ ]{2,}/g, " ").split(" ");
                for (var e = [], h = 0, g; g = c[h++];) {
                    g = d.getElementsByTagName(g);
                    for (var l = 0, k; k = g[l++];) b && !b(k) || e.push(k)
                }
                return e
            },
            mergeToParent: function (d) {
                for (var c = d.parentNode; c && v.$removeEmpty[c.tagName];) {
                    if (c.tagName == d.tagName || "A" == c.tagName) {
                        f.trimWhiteTextNode(c);
                        if ("SPAN" == c.tagName && !f.isSameStyle(c, d) || "A" == c.tagName && "SPAN" == d.tagName) if (1 < c.childNodes.length || c !== d.parentNode) {
                            d.style.cssText = c.style.cssText + ";" + d.style.cssText;
                            c = c.parentNode;
                            continue
                        } else c.style.cssText += ";" + d.style.cssText, "A" == c.tagName && (c.style.textDecoration = "underline");
                        if ("A" != c.tagName) {
                            c ===
                            d.parentNode && f.remove(d, !0);
                            break
                        }
                    }
                    c = c.parentNode
                }
            },
            mergeSibling: function (d, c, b) {
                function a(a, b, g) {
                    var c;
                    if ((c = g[a]) && !f.isBookmarkNode(c) && 1 == c.nodeType && f.isSameElement(g, c)) {
                        for (; c.firstChild;) "firstChild" == b ? g.insertBefore(c.lastChild, g.firstChild) : g.appendChild(c.firstChild);
                        f.remove(c)
                    }
                }

                !c && a("previousSibling", "firstChild", d);
                !b && a("nextSibling", "lastChild", d)
            },
            unSelectable: I && r.ie9below || r.opera ? function (d) {
                d.onselectstart = function () {
                    return !1
                };
                d.onclick = d.onkeyup = d.onkeydown = function () {
                    return !1
                };
                d.unselectable = "on";
                d.setAttribute("unselectable", "on");
                for (var c = 0, b; b = d.all[c++];) switch (b.tagName.toLowerCase()) {
                    case "iframe":
                    case "textarea":
                    case "input":
                    case "select":
                        break;
                    default:
                        b.unselectable = "on", d.setAttribute("unselectable", "on")
                }
            } : function (d) {
                d.style.MozUserSelect = d.style.webkitUserSelect = d.style.msUserSelect = d.style.KhtmlUserSelect = "none"
            },
            removeAttributes: function (d, c) {
                c = p.isArray(c) ? c : p.trim(c).replace(/[ ]{2,}/g, " ").split(" ");
                for (var b = 0, a; a = c[b++];) {
                    a = ea[a] || a;
                    switch (a) {
                        case "className":
                            d[a] =
                                "";
                            break;
                        case "style":
                            d.style.cssText = "";
                            var e = d.getAttributeNode("style");
                            !r.ie && e && d.removeAttributeNode(e)
                    }
                    d.removeAttribute(a)
                }
            },
            createElement: function (d, c, b) {
                return f.setAttributes(d.createElement(c), b)
            },
            setAttributes: function (d, c) {
                for (var b in c) if (c.hasOwnProperty(b)) {
                    var a = c[b];
                    switch (b) {
                        case "class":
                            d.className = a;
                            break;
                        case "style":
                            d.style.cssText = d.style.cssText + ";" + a;
                            break;
                        case "innerHTML":
                            d[b] = a;
                            break;
                        case "value":
                            d.value = a;
                            break;
                        default:
                            d.setAttribute(ea[b] || b, a)
                    }
                }
                return d
            },
            getComputedStyle: function (d,
                                        c) {
                if (-1 < "width height top left".indexOf(c)) return d["offset" + c.replace(/^\w/, function (a) {
                    return a.toUpperCase()
                })] + "px";
                3 == d.nodeType && (d = d.parentNode);
                if (r.ie && 9 > r.version && "font-size" == c && !d.style.fontSize && !v.$empty[d.tagName] && !v.$nonChild[d.tagName]) {
                    var b = d.ownerDocument.createElement("span");
                    b.style.cssText = "padding:0;border:0;font-family:simsun;";
                    b.innerHTML = ".";
                    d.appendChild(b);
                    var a = b.offsetHeight;
                    d.removeChild(b);
                    b = null;
                    return a + "px"
                }
                try {
                    b = f.getStyle(d, c) || (window.getComputedStyle ? f.getWindow(d).getComputedStyle(d,
                        "").getPropertyValue(c) : (d.currentStyle || d.style)[p.cssStyleToDomStyle(c)])
                } catch (e) {
                    return ""
                }
                return p.transUnitToPx(p.fixColor(c, b))
            },
            removeClasses: function (d, c) {
                c = p.isArray(c) ? c : p.trim(c).replace(/[ ]{2,}/g, " ").split(" ");
                for (var b = 0, a, e = d.className; a = c[b++];) e = e.replace(RegExp("\\b" + a + "\\b"), "");
                (e = p.trim(e).replace(/[ ]{2,}/g, " ")) ? d.className = e : f.removeAttributes(d, ["class"])
            },
            addClass: function (d, c) {
                if (d) {
                    c = p.trim(c).replace(/[ ]{2,}/g, " ").split(" ");
                    for (var b = 0, a, e = d.className; a = c[b++];) RegExp("\\b" +
                        a + "\\b").test(e) || (e += " " + a);
                    d.className = p.trim(e)
                }
            },
            hasClass: function (d, c) {
                if (p.isRegExp(c)) return c.test(d.className);
                c = p.trim(c).replace(/[ ]{2,}/g, " ").split(" ");
                for (var b = 0, a, e = d.className; a = c[b++];) if (!RegExp("\\b" + a + "\\b", "i").test(e)) return !1;
                return b - 1 == c.length
            },
            preventDefault: function (d) {
                d.preventDefault ? d.preventDefault() : d.returnValue = !1
            },
            removeStyle: function (d, c) {
                r.ie ? ("color" == c && (c = "(^|;)" + c), d.style.cssText = d.style.cssText.replace(RegExp(c + "[^:]*:[^;]+;?", "ig"), "")) : d.style.removeProperty ?
                    d.style.removeProperty(c) : d.style.removeAttribute(p.cssStyleToDomStyle(c));
                d.style.cssText || f.removeAttributes(d, ["style"])
            },
            getStyle: function (d, c) {
                var b = d.style[p.cssStyleToDomStyle(c)];
                return p.fixColor(c, b)
            },
            setStyle: function (d, c, b) {
                d.style[p.cssStyleToDomStyle(c)] = b;
                p.trim(d.style.cssText) || this.removeAttributes(d, "style")
            },
            setStyles: function (d, c) {
                for (var b in c) c.hasOwnProperty(b) && f.setStyle(d, b, c[b])
            },
            removeDirtyAttr: function (d) {
                for (var c = 0, b, a = d.getElementsByTagName("*"); b = a[c++];) b.removeAttribute("_moz_dirty");
                d.removeAttribute("_moz_dirty")
            },
            getChildCount: function (d, c) {
                var b = 0, a = d.firstChild;
                for (c = c || function () {
                    return 1
                }; a;) c(a) && b++, a = a.nextSibling;
                return b
            },
            isEmptyNode: function (d) {
                return !d.firstChild || 0 == f.getChildCount(d, function (c) {
                    return !f.isBr(c) && !f.isBookmarkNode(c) && !f.isWhitespace(c)
                })
            },
            clearSelectedArr: function (d) {
                for (var c; c = d.pop();) f.removeAttributes(c, ["class"])
            },
            scrollToView: function (d, c, b) {
                var a = function () {
                    var a = c.document, b = "CSS1Compat" == a.compatMode;
                    return {
                        width: (b ? a.documentElement.clientWidth :
                            a.body.clientWidth) || 0,
                        height: (b ? a.documentElement.clientHeight : a.body.clientHeight) || 0
                    }
                }().height;
                b = -1 * a + b + (d.offsetHeight || 0);
                d = f.getXY(d);
                b += d.y;
                d = function (a) {
                    if ("pageXOffset" in a) return {x: a.pageXOffset || 0, y: a.pageYOffset || 0};
                    a = a.document;
                    return {
                        x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
                        y: a.documentElement.scrollTop || a.body.scrollTop || 0
                    }
                }(c).y;
                (b > d || b < d - a) && c.scrollTo(0, b + (0 > b ? -20 : 20))
            },
            isBr: function (d) {
                return 1 == d.nodeType && "BR" == d.tagName
            },
            isFillChar: function (d, c) {
                if (3 != d.nodeType) return !1;
                var b = d.nodeValue;
                return c ? RegExp("^" + f.fillChar).test(b) : !b.replace(RegExp(f.fillChar, "g"), "").length
            },
            isStartInblock: function (d) {
                d = d.cloneRange();
                var c = 0, b = d.startContainer, a;
                if (1 == b.nodeType && b.childNodes[d.startOffset]) for (var b = b.childNodes[d.startOffset], e = b.previousSibling; e && f.isFillChar(e);) b = e, e = e.previousSibling;
                this.isFillChar(b, !0) && 1 == d.startOffset && (d.setStartBefore(b), b = d.startContainer);
                for (; b && f.isFillChar(b);) a = b, b = b.previousSibling;
                a && (d.setStartBefore(a), b = d.startContainer);
                for (1 ==
                     b.nodeType && f.isEmptyNode(b) && 1 == d.startOffset && d.setStart(b, 0).collapse(!0); !d.startOffset;) {
                    b = d.startContainer;
                    if (f.isBlockElm(b) || f.isBody(b)) {
                        c = 1;
                        break
                    }
                    var e = d.startContainer.previousSibling, h;
                    if (e) {
                        for (; e && f.isFillChar(e);) h = e, e = e.previousSibling;
                        h ? d.setStartBefore(h) : d.setStartBefore(d.startContainer)
                    } else d.setStartBefore(d.startContainer)
                }
                return c && !f.isBody(d.startContainer) ? 1 : 0
            },
            isEmptyBlock: function (d, c) {
                if (1 != d.nodeType) return 0;
                c = c || RegExp("[ \u00a0\t\r\n" + f.fillChar + "]", "g");
                if (0 < d[r.ie ?
                    "innerText" : "textContent"].replace(c, "").length) return 0;
                for (var b in v.$isNotEmpty) if (d.getElementsByTagName(b).length) return 0;
                return 1
            },
            setViewportOffset: function (d, c) {
                var b = parseInt(d.style.left) | 0, a = parseInt(d.style.top) | 0, e = d.getBoundingClientRect(),
                    h = c.left - e.left, e = c.top - e.top;
                h && (d.style.left = b + h + "px");
                e && (d.style.top = a + e + "px")
            },
            fillNode: function (d, c) {
                var b = r.ie ? d.createTextNode(f.fillChar) : d.createElement("br");
                c.innerHTML = "";
                c.appendChild(b)
            },
            moveChild: function (d, c, b) {
                for (; d.firstChild;) b &&
                c.firstChild ? c.insertBefore(d.lastChild, c.firstChild) : c.appendChild(d.firstChild)
            },
            hasNoAttributes: function (d) {
                return r.ie ? /^<\w+\s*?>/.test(d.outerHTML) : 0 == d.attributes.length
            },
            isCustomeNode: function (d) {
                return 1 == d.nodeType && d.getAttribute("_ue_custom_node_")
            },
            isTagNode: function (d, c) {
                return 1 == d.nodeType && RegExp("\\b" + d.tagName + "\\b", "i").test(c)
            },
            filterNodeList: function (d, c, b) {
                var a = [];
                if (!p.isFunction(c)) {
                    var e = c;
                    c = function (a) {
                        return -1 != p.indexOf(p.isArray(e) ? e : e.split(" "), a.tagName.toLowerCase())
                    }
                }
                p.each(d,
                    function (e) {
                        c(e) && a.push(e)
                    });
                return 0 == a.length ? null : 1 != a.length && b ? a : a[0]
            },
            isInNodeEndBoundary: function (d, c) {
                var b = d.startContainer;
                if (3 == b.nodeType && d.startOffset != b.nodeValue.length || 1 == b.nodeType && d.startOffset != b.childNodes.length) return 0;
                for (; b !== c;) {
                    if (b.nextSibling) return 0;
                    b = b.parentNode
                }
                return 1
            },
            isBoundaryNode: function (d, c) {
                for (var b; !f.isBody(d);) if (b = d, d = d.parentNode, b !== d[c]) return !1;
                return !0
            },
            fillHtml: r.ie11below ? "&nbsp;" : "<br/>"
        }, P = RegExp(f.fillChar, "g");
    (function () {
        function d(a) {
            return !a.collapsed &&
                1 == a.startContainer.nodeType && a.startContainer === a.endContainer && 1 == a.endOffset - a.startOffset
        }

        function c(a, e, g, b) {
            1 == e.nodeType && (v.$empty[e.tagName] || v.$nonChild[e.tagName]) && (g = f.getNodeIndex(e) + (a ? 0 : 1), e = e.parentNode);
            a ? (b.startContainer = e, b.startOffset = g, b.endContainer || b.collapse(!0)) : (b.endContainer = e, b.endOffset = g, b.startContainer || b.collapse(!1));
            b.collapsed = b.startContainer && b.endContainer && b.startContainer === b.endContainer && b.startOffset == b.endOffset;
            return b
        }

        function b(a, e) {
            var g = a.startContainer,
                b = a.endContainer, c = a.startOffset, l = a.endOffset, k = a.document, h = k.createDocumentFragment(),
                d, p;
            1 == g.nodeType && (g = g.childNodes[c] || (d = g.appendChild(k.createTextNode(""))));
            1 == b.nodeType && (b = b.childNodes[l] || (p = b.appendChild(k.createTextNode(""))));
            if (g === b && 3 == g.nodeType) return h.appendChild(k.createTextNode(g.substringData(c, l - c))), e && (g.deleteData(c, l - c), a.collapse(!0)), h;
            for (var A, N, r = h, s = f.findParents(g, !0), v = f.findParents(b, !0), z = 0; s[z] == v[z];) z++;
            for (var H = z, D; D = s[H]; H++) {
                A = D.nextSibling;
                D == g ?
                    d || (3 == a.startContainer.nodeType ? (r.appendChild(k.createTextNode(g.nodeValue.slice(c))), e && g.deleteData(c, g.nodeValue.length - c)) : r.appendChild(e ? g : g.cloneNode(!0))) : (N = D.cloneNode(!1), r.appendChild(N));
                for (; A && A !== b && A !== v[H];) D = A.nextSibling, r.appendChild(e ? A : A.cloneNode(!0)), A = D;
                r = N
            }
            r = h;
            s[z] || (r.appendChild(s[z - 1].cloneNode(!1)), r = r.firstChild);
            for (H = z; c = v[H]; H++) {
                A = c.previousSibling;
                c == b ? p || 3 != a.endContainer.nodeType || (r.appendChild(k.createTextNode(b.substringData(0, l))), e && b.deleteData(0, l)) :
                    (N = c.cloneNode(!1), r.appendChild(N));
                if (H != z || !s[z]) for (; A && A !== g;) c = A.previousSibling, r.insertBefore(e ? A : A.cloneNode(!0), r.firstChild), A = c;
                r = N
            }
            e && a.setStartBefore(v[z] ? s[z] ? v[z] : s[z - 1] : v[z - 1]).collapse(!0);
            d && f.remove(d);
            p && f.remove(p);
            return h
        }

        function a(a, g) {
            try {
                if (l && f.inDoc(l, a)) if (l.nodeValue.replace(P, "").length) l.nodeValue = l.nodeValue.replace(P, ""); else {
                    var e = l.parentNode;
                    for (f.remove(l); e && f.isEmptyInlineElement(e) && (r.safari ? !(f.getPosition(e, g) & f.POSITION_CONTAINS) : !e.contains(g));) l = e.parentNode,
                        f.remove(e), e = l
                }
            } catch (b) {
            }
        }

        function e(a, e) {
            var g;
            for (a = a[e]; a && f.isFillChar(a);) g = a[e], f.remove(a), a = g
        }

        var h = 0, g = f.fillChar, l, k = L.Range = function (a) {
            this.startContainer = this.startOffset = this.endContainer = this.endOffset = null;
            this.document = a;
            this.collapsed = !0
        };
        k.prototype = {
            cloneContents: function () {
                return this.collapsed ? null : b(this, 0)
            }, deleteContents: function () {
                var a;
                this.collapsed || b(this, 1);
                r.webkit && (a = this.startContainer, 3 != a.nodeType || a.nodeValue.length || (this.setStartBefore(a).collapse(!0), f.remove(a)));
                return this
            }, extractContents: function () {
                return this.collapsed ? null : b(this, 2)
            }, setStart: function (a, e) {
                return c(!0, a, e, this)
            }, setEnd: function (a, e) {
                return c(!1, a, e, this)
            }, setStartAfter: function (a) {
                return this.setStart(a.parentNode, f.getNodeIndex(a) + 1)
            }, setStartBefore: function (a) {
                return this.setStart(a.parentNode, f.getNodeIndex(a))
            }, setEndAfter: function (a) {
                return this.setEnd(a.parentNode, f.getNodeIndex(a) + 1)
            }, setEndBefore: function (a) {
                return this.setEnd(a.parentNode, f.getNodeIndex(a))
            }, setStartAtFirst: function (a) {
                return this.setStart(a,
                    0)
            }, setStartAtLast: function (a) {
                return this.setStart(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
            }, setEndAtFirst: function (a) {
                return this.setEnd(a, 0)
            }, setEndAtLast: function (a) {
                return this.setEnd(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
            }, selectNode: function (a) {
                return this.setStartBefore(a).setEndAfter(a)
            }, selectNodeContents: function (a) {
                return this.setStart(a, 0).setEndAtLast(a)
            }, cloneRange: function () {
                return (new k(this.document)).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer,
                    this.endOffset)
            }, collapse: function (a) {
                a ? (this.endContainer = this.startContainer, this.endOffset = this.startOffset) : (this.startContainer = this.endContainer, this.startOffset = this.endOffset);
                this.collapsed = !0;
                return this
            }, shrinkBoundary: function (a) {
                function e(a) {
                    return 1 == a.nodeType && !f.isBookmarkNode(a) && !v.$empty[a.tagName] && !v.$nonChild[a.tagName]
                }

                for (var g, b = this.collapsed; 1 == this.startContainer.nodeType && (g = this.startContainer.childNodes[this.startOffset]) && e(g);) this.setStart(g, 0);
                if (b) return this.collapse(!0);
                if (!a) for (; 1 == this.endContainer.nodeType && 0 < this.endOffset && (g = this.endContainer.childNodes[this.endOffset - 1]) && e(g);) this.setEnd(g, g.childNodes.length);
                return this
            }, getCommonAncestor: function (a, e) {
                var g = this.startContainer, b = this.endContainer;
                return g === b ? a && d(this) && (g = g.childNodes[this.startOffset], 1 == g.nodeType) ? g : e && 3 == g.nodeType ? g.parentNode : g : f.getCommonAncestor(g, b)
            }, trimBoundary: function (a) {
                this.txtToElmBoundary();
                var g = this.startContainer, e = this.startOffset, b = this.collapsed, c = this.endContainer;
                if (3 == g.nodeType) {
                    if (0 == e) this.setStartBefore(g); else if (e >= g.nodeValue.length) this.setStartAfter(g); else {
                        var l = f.split(g, e);
                        g === c ? this.setEnd(l, this.endOffset - e) : g.parentNode === c && (this.endOffset += 1);
                        this.setStartBefore(l)
                    }
                    if (b) return this.collapse(!0)
                }
                a || (e = this.endOffset, c = this.endContainer, 3 == c.nodeType && (0 == e ? this.setEndBefore(c) : (e < c.nodeValue.length && f.split(c, e), this.setEndAfter(c))));
                return this
            }, txtToElmBoundary: function (a) {
                function g(a, e) {
                    var b = a[e + "Container"], c = a[e + "Offset"];
                    if (3 == b.nodeType) if (!c) a["set" +
                    e.replace(/(\w)/, function (a) {
                        return a.toUpperCase()
                    }) + "Before"](b); else if (c >= b.nodeValue.length) a["set" + e.replace(/(\w)/, function (a) {
                        return a.toUpperCase()
                    }) + "After"](b)
                }

                if (a || !this.collapsed) g(this, "start"), g(this, "end");
                return this
            }, insertNode: function (a) {
                var g = a, e = 1;
                11 == a.nodeType && (g = a.firstChild, e = a.childNodes.length);
                this.trimBoundary(!0);
                var b = this.startContainer, c = b.childNodes[this.startOffset];
                c ? b.insertBefore(a, c) : b.appendChild(a);
                g.parentNode === this.endContainer && (this.endOffset += e);
                return this.setStartBefore(g)
            },
            setCursor: function (a, g) {
                return this.collapse(!a).select(g)
            }, createBookmark: function (a, g) {
                var e, b = this.document.createElement("span");
                b.style.cssText = "display:none;line-height:0px;";
                b.appendChild(this.document.createTextNode("\u200d"));
                b.id = "_baidu_bookmark_start_" + (g ? "" : h++);
                this.collapsed || (e = b.cloneNode(!0), e.id = "_baidu_bookmark_end_" + (g ? "" : h++));
                this.insertNode(b);
                e && this.collapse().insertNode(e).setEndBefore(e);
                this.setStartAfter(b);
                return {start: a ? b.id : b, end: e ? a ? e.id : e : null, id: a}
            }, moveToBookmark: function (a) {
                var e =
                    a.id ? this.document.getElementById(a.start) : a.start;
                a = a.end && a.id ? this.document.getElementById(a.end) : a.end;
                this.setStartBefore(e);
                f.remove(e);
                a ? (this.setEndBefore(a), f.remove(a)) : this.collapse(!0);
                return this
            }, enlarge: function (a, e) {
                var g = f.isBody, b, c, l = this.document.createTextNode("");
                if (a) {
                    c = this.startContainer;
                    1 == c.nodeType ? c.childNodes[this.startOffset] ? b = c = c.childNodes[this.startOffset] : (c.appendChild(l), b = c = l) : b = c;
                    for (; ;) {
                        if (f.isBlockElm(c)) {
                            for (c = b; (b = c.previousSibling) && !f.isBlockElm(b);) c =
                                b;
                            this.setStartBefore(c);
                            break
                        }
                        b = c;
                        c = c.parentNode
                    }
                    c = this.endContainer;
                    1 == c.nodeType ? ((b = c.childNodes[this.endOffset]) ? c.insertBefore(l, b) : c.appendChild(l), b = c = l) : b = c;
                    for (; ;) {
                        if (f.isBlockElm(c)) {
                            for (c = b; (b = c.nextSibling) && !f.isBlockElm(b);) c = b;
                            this.setEndAfter(c);
                            break
                        }
                        b = c;
                        c = c.parentNode
                    }
                    l.parentNode === this.endContainer && this.endOffset--;
                    f.remove(l)
                }
                if (!this.collapsed) {
                    for (; !(0 != this.startOffset || e && e(this.startContainer) || g(this.startContainer));) this.setStartBefore(this.startContainer);
                    for (; !(this.endOffset !=
                        (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) || e && e(this.endContainer) || g(this.endContainer));) this.setEndAfter(this.endContainer)
                }
                return this
            }, enlargeToBlockElm: function (a) {
                for (; !f.isBlockElm(this.startContainer);) this.setStartBefore(this.startContainer);
                if (!a) for (; !f.isBlockElm(this.endContainer);) this.setEndAfter(this.endContainer);
                return this
            }, adjustmentBoundary: function () {
                if (!this.collapsed) {
                    for (; !f.isBody(this.startContainer) && this.startOffset ==
                           this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setStartAfter(this.startContainer);
                    for (; !f.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue" : "childNodes"].length;) this.setEndBefore(this.endContainer)
                }
                return this
            }, applyInlineStyle: function (a, e, g) {
                if (this.collapsed) return this;
                this.trimBoundary().enlarge(!1, function (a) {
                    return 1 ==
                        a.nodeType && f.isBlockElm(a)
                }).adjustmentBoundary();
                for (var b = this.createBookmark(), c = b.end, l = function (a) {
                    return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !f.isWhitespace(a)
                }, k = f.getNextDomNode(b.start, !1, l), h, d, p = this.cloneRange(); k && f.getPosition(k, c) & f.POSITION_PRECEDING;) if (3 == k.nodeType || v[a][k.tagName]) {
                    p.setStartBefore(k);
                    for (h = k; h && (3 == h.nodeType || v[a][h.tagName]) && h !== c;) d = h, h = f.getNextDomNode(h, 1 == h.nodeType, null, function (e) {
                        return v[a][e.tagName]
                    });
                    var k = p.setEndAfter(d).extractContents(),
                        A;
                    if (g && 0 < g.length) {
                        var N;
                        N = A = g[0].cloneNode(!1);
                        for (var r = 1, s; s = g[r++];) A.appendChild(s.cloneNode(!1)), A = A.firstChild
                    } else A = p.document.createElement(a);
                    e && f.setAttributes(A, e);
                    A.appendChild(k);
                    p.insertNode(g ? N : A);
                    var T;
                    "span" == a && e.style && /text\-decoration/.test(e.style) && (T = f.findParentByTagName(A, "a", !0)) ? (f.setAttributes(T, e), f.remove(A, !0), A = T) : (f.mergeSibling(A), f.clearEmptySibling(A));
                    f.mergeChild(A, e);
                    k = f.getNextDomNode(A, !1, l);
                    f.mergeToParent(A);
                    if (h === c) break
                } else k = f.getNextDomNode(k,
                    !0, l);
                return this.moveToBookmark(b)
            }, removeInlineStyle: function (a) {
                if (this.collapsed) return this;
                a = p.isArray(a) ? a : [a];
                this.shrinkBoundary().adjustmentBoundary();
                for (var e = this.startContainer, g = this.endContainer; ;) {
                    if (1 == e.nodeType) {
                        if (-1 < p.indexOf(a, e.tagName.toLowerCase())) break;
                        if ("body" == e.tagName.toLowerCase()) {
                            e = null;
                            break
                        }
                    }
                    e = e.parentNode
                }
                for (; ;) {
                    if (1 == g.nodeType) {
                        if (-1 < p.indexOf(a, g.tagName.toLowerCase())) break;
                        if ("body" == g.tagName.toLowerCase()) {
                            g = null;
                            break
                        }
                    }
                    g = g.parentNode
                }
                var b = this.createBookmark(),
                    c, l;
                e && (l = this.cloneRange().setEndBefore(b.start).setStartBefore(e), c = l.extractContents(), l.insertNode(c), f.clearEmptySibling(e, !0), e.parentNode.insertBefore(b.start, e));
                g && (l = this.cloneRange().setStartAfter(b.end).setEndAfter(g), c = l.extractContents(), l.insertNode(c), f.clearEmptySibling(g, !1, !0), g.parentNode.insertBefore(b.end, g.nextSibling));
                for (e = f.getNextDomNode(b.start, !1, function (a) {
                    return 1 == a.nodeType
                }); e && e !== b.end;) g = f.getNextDomNode(e, !0, function (a) {
                    return 1 == a.nodeType
                }), -1 < p.indexOf(a,
                    e.tagName.toLowerCase()) && f.remove(e, !0), e = g;
                return this.moveToBookmark(b)
            }, getClosedNode: function () {
                var a;
                if (!this.collapsed) {
                    var e = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                    d(e) && (e = e.startContainer.childNodes[e.startOffset]) && 1 == e.nodeType && (v.$empty[e.tagName] || v.$nonChild[e.tagName]) && (a = e)
                }
                return a
            }, select: r.ie ? function (b, c) {
                var k;
                this.collapsed || this.shrinkBoundary();
                var h = this.getClosedNode();
                if (h && !c) {
                    try {
                        k = this.document.body.createControlRange(), k.addElement(h), k.select()
                    } catch (d) {
                    }
                    return this
                }
                var h =
                    this.createBookmark(), y = h.start;
                k = this.document.body.createTextRange();
                k.moveToElementText(y);
                k.moveStart("character", 1);
                if (!this.collapsed) {
                    var u = this.document.body.createTextRange(), y = h.end;
                    u.moveToElementText(y);
                    k.setEndPoint("EndToEnd", u)
                } else if (!b && 3 != this.startContainer.nodeType) {
                    var u = this.document.createTextNode(g), C = this.document.createElement("span");
                    C.appendChild(this.document.createTextNode(g));
                    y.parentNode.insertBefore(C, y);
                    y.parentNode.insertBefore(u, y);
                    a(this.document, u);
                    l = u;
                    e(C, "previousSibling");
                    e(y, "nextSibling");
                    k.moveStart("character", -1);
                    k.collapse(!0)
                }
                this.moveToBookmark(h);
                C && f.remove(C);
                try {
                    k.select()
                } catch (E) {
                }
                return this
            } : function (b) {
                function c(a) {
                    function e(b, g, c) {
                        3 == b.nodeType && b.nodeValue.length < g && (a[c + "Offset"] = b.nodeValue.length)
                    }

                    e(a.startContainer, a.startOffset, "start");
                    e(a.endContainer, a.endOffset, "end")
                }

                var k = f.getWindow(this.document), h = k.getSelection();
                r.gecko ? this.document.body.focus() : k.focus();
                if (h) {
                    h.removeAllRanges();
                    this.collapsed && !b && (b = k = this.startContainer, 1 ==
                    k.nodeType && (b = k.childNodes[this.startOffset]), 3 == k.nodeType && this.startOffset || (b ? b.previousSibling && 3 == b.previousSibling.nodeType : k.lastChild && 3 == k.lastChild.nodeType) || (b = this.document.createTextNode(g), this.insertNode(b), a(this.document, b), e(b, "previousSibling"), e(b, "nextSibling"), l = b, this.setStart(b, r.webkit ? 1 : 0).collapse(!0)));
                    k = this.document.createRange();
                    if (this.collapsed && r.opera && 1 == this.startContainer.nodeType) if (b = this.startContainer.childNodes[this.startOffset]) {
                        for (; b && f.isBlockElm(b);) if (1 ==
                            b.nodeType && b.childNodes[0]) b = b.childNodes[0]; else break;
                        b && this.setStartBefore(b).collapse(!0)
                    } else (b = this.startContainer.lastChild) && f.isBr(b) && this.setStartBefore(b).collapse(!0);
                    c(this);
                    k.setStart(this.startContainer, this.startOffset);
                    k.setEnd(this.endContainer, this.endOffset);
                    h.addRange(k)
                }
                return this
            }, scrollToView: function (a, e) {
                a = a ? window : f.getWindow(this.document);
                var b = this.document.createElement("span");
                b.innerHTML = "&nbsp;";
                this.cloneRange().insertNode(b);
                f.scrollToView(b, a, e);
                f.remove(b);
                return this
            }, inFillChar: function () {
                var a = this.startContainer;
                return this.collapsed && 3 == a.nodeType && a.nodeValue.replace(RegExp("^" + f.fillChar), "").length + 1 == a.nodeValue.length ? !0 : !1
            }, createAddress: function (a, e) {
                function b(a) {
                    for (var g = a ? c.startContainer : c.endContainer, l = f.findParents(g, !0, function (a) {
                        return !f.isBody(a)
                    }), k = [], h = 0, d; d = l[h++];) k.push(f.getNodeIndex(d, e));
                    l = 0;
                    if (e) if (3 == g.nodeType) {
                        for (g = g.previousSibling; g && 3 == g.nodeType;) l += g.nodeValue.replace(P, "").length, g = g.previousSibling;
                        l += a ?
                            c.startOffset : c.endOffset
                    } else if (g = g.childNodes[a ? c.startOffset : c.endOffset]) l = f.getNodeIndex(g, e); else for (g = a ? c.startContainer : c.endContainer, a = g.firstChild; a;) if (f.isFillChar(a)) a = a.nextSibling; else if (l++, 3 == a.nodeType) for (; a && 3 == a.nodeType;) a = a.nextSibling; else a = a.nextSibling; else l = a ? f.isFillChar(g) ? 0 : c.startOffset : c.endOffset;
                    0 > l && (l = 0);
                    k.push(l);
                    return k
                }

                var g = {}, c = this;
                g.startAddress = b(!0);
                a || (g.endAddress = c.collapsed ? [].concat(g.startAddress) : b());
                return g
            }, moveToAddress: function (a, e) {
                function g(a,
                           e) {
                    for (var c = b.document.body, l, k, h = 0, d, f = a.length; h < f; h++) if (d = a[h], l = c, c = c.childNodes[d], !c) {
                        k = d;
                        break
                    }
                    e ? c ? b.setStartBefore(c) : b.setStart(l, k) : c ? b.setEndBefore(c) : b.setEnd(l, k)
                }

                var b = this;
                g(a.startAddress, !0);
                !e && a.endAddress && g(a.endAddress);
                return b
            }, equals: function (a) {
                for (var e in this) if (this.hasOwnProperty(e) && this[e] !== a[e]) return !1;
                return !0
            }, traversal: function (a, e) {
                if (this.collapsed) return this;
                for (var b = this.createBookmark(), g = b.end, c = f.getNextDomNode(b.start, !1, e); c && c !== g && f.getPosition(c,
                    g) & f.POSITION_PRECEDING;) {
                    var l = f.getNextDomNode(c, !1, e);
                    a(c);
                    c = l
                }
                return this.moveToBookmark(b)
            }
        }
    })();
    (function () {
        function d(a, e) {
            var b = f.getNodeIndex;
            a = a.duplicate();
            a.collapse(e);
            var g = a.parentElement();
            if (!g.hasChildNodes()) return {container: g, offset: 0};
            for (var c = g.children, k, d = a.duplicate(), n = 0, q = c.length - 1, t = -1; n <= q;) {
                t = Math.floor((n + q) / 2);
                k = c[t];
                d.moveToElementText(k);
                var w = d.compareEndPoints("StartToStart", a);
                if (0 < w) q = t - 1; else if (0 > w) n = t + 1; else return {container: g, offset: b(k)}
            }
            if (-1 == t) {
                d.moveToElementText(g);
                d.setEndPoint("StartToStart", a);
                d = d.text.replace(/(\r\n|\r)/g, "\n").length;
                c = g.childNodes;
                if (!d) return k = c[c.length - 1], {container: k, offset: k.nodeValue.length};
                for (b = c.length; 0 < d;) d -= c[--b].nodeValue.length;
                return {container: c[b], offset: -d}
            }
            d.collapse(0 < w);
            d.setEndPoint(0 < w ? "StartToStart" : "EndToStart", a);
            d = d.text.replace(/(\r\n|\r)/g, "\n").length;
            if (!d) return v.$empty[k.tagName] || v.$nonChild[k.tagName] ? {
                container: g,
                offset: b(k) + (0 < w ? 0 : 1)
            } : {container: k, offset: 0 < w ? 0 : k.childNodes.length};
            for (; 0 < d;) try {
                c =
                    k, k = k[0 < w ? "previousSibling" : "nextSibling"], d -= k.nodeValue.length
            } catch (y) {
                return {container: g, offset: b(c)}
            }
            return {container: k, offset: 0 < w ? -d : k.nodeValue.length + d}
        }

        function c(a, e) {
            if (a.item) e.selectNode(a.item(0)); else {
                var b = d(a, !0);
                e.setStart(b.container, b.offset);
                0 != a.compareEndPoints("StartToEnd", a) && (b = d(a, !1), e.setEnd(b.container, b.offset))
            }
            return e
        }

        function b(a) {
            var b;
            try {
                b = a.getNative().createRange()
            } catch (c) {
                return null
            }
            var g = b.item ? b.item(0) : b.parentElement();
            return (g.ownerDocument || g) === a.document ?
                b : null
        }

        (L.Selection = function (a) {
            var e = this;
            e.document = a;
            r.ie9below && (a = f.getWindow(a).frameElement, f.on(a, "beforedeactivate", function () {
                e._bakIERange = e.getIERange()
            }), f.on(a, "activate", function () {
                try {
                    !b(e) && e._bakIERange && e._bakIERange.select()
                } catch (a) {
                }
                e._bakIERange = null
            }));
            a = a = null
        }).prototype = {
            rangeInBody: function (a, b) {
                var c = r.ie9below || b ? a.item ? a.item() : a.parentElement() : a.startContainer;
                return c === this.document.body || f.inDoc(c, this.document)
            }, getNative: function () {
                var a = this.document;
                try {
                    return a ?
                        r.ie9below ? a.selection : f.getWindow(a).getSelection() : null
                } catch (b) {
                    return null
                }
            }, getIERange: function () {
                var a = b(this);
                return !a && this._bakIERange ? this._bakIERange : a
            }, cache: function () {
                this.clear();
                this._cachedRange = this.getRange();
                this._cachedStartElement = this.getStart();
                this._cachedStartElementPath = this.getStartElementPath()
            }, getStartElementPath: function () {
                if (this._cachedStartElementPath) return this._cachedStartElementPath;
                var a = this.getStart();
                return a ? f.findParents(a, !0, null, !0) : []
            }, clear: function () {
                this._cachedStartElementPath =
                    this._cachedRange = this._cachedStartElement = null
            }, isFocus: function () {
                try {
                    if (r.ie9below) {
                        var a = b(this);
                        return !(!a || !this.rangeInBody(a))
                    }
                    return !!this.getNative().rangeCount
                } catch (e) {
                    return !1
                }
            }, getRange: function () {
                function a(a) {
                    for (var g = b.document.body.firstChild, c = a.collapsed; g && g.firstChild;) a.setStart(g, 0), g = g.firstChild;
                    a.startContainer || a.setStart(b.document.body, 0);
                    c && a.collapse(!0)
                }

                var b = this;
                if (null != b._cachedRange) return this._cachedRange;
                var h = new s.editor.dom.Range(b.document);
                if (r.ie9below) {
                    var g =
                        b.getIERange();
                    if (g) try {
                        c(g, h)
                    } catch (l) {
                        a(h)
                    } else a(h)
                } else {
                    var k = b.getNative();
                    if (k && k.rangeCount) g = k.getRangeAt(0), k = k.getRangeAt(k.rangeCount - 1), h.setStart(g.startContainer, g.startOffset).setEnd(k.endContainer, k.endOffset), h.collapsed && f.isBody(h.startContainer) && !h.startOffset && a(h); else {
                        if (this._bakRange && f.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange;
                        a(h)
                    }
                }
                return this._bakRange = h
            }, getStart: function () {
                if (this._cachedStartElement) return this._cachedStartElement;
                var a =
                    r.ie9below ? this.getIERange() : this.getRange(), b, c;
                if (r.ie9below) {
                    if (!a) return this.document.body.firstChild;
                    if (a.item) return a.item(0);
                    b = a.duplicate();
                    0 < b.text.length && b.moveStart("character", 1);
                    b.collapse(1);
                    b = b.parentElement();
                    for (c = a = a.parentElement(); a = a.parentNode;) if (a == b) {
                        b = c;
                        break
                    }
                } else if (a.shrinkBoundary(), b = a.startContainer, 1 == b.nodeType && b.hasChildNodes() && (b = b.childNodes[Math.min(b.childNodes.length - 1, a.startOffset)]), 3 == b.nodeType) return b.parentNode;
                return b
            }, getText: function () {
                var a;
                return this.isFocus() && (a = this.getNative()) ? (a = r.ie9below ? a.createRange() : a.getRangeAt(0), r.ie9below ? a.text : a.toString()) : ""
            }, clearRange: function () {
                this.getNative()[r.ie9below ? "empty" : "removeAllRanges"]()
            }
        }
    })();
    (function () {
        function d(a, b) {
            var c;
            if (b.textarea) if (p.isString(b.textarea)) for (var e = 0, h, d = f.getElementsByTagName(a, "textarea"); h = d[e++];) {
                if (h.id == "ueditor_textarea_" + b.options.textarea) {
                    c = h;
                    break
                }
            } else c = b.textarea;
            c || (a.appendChild(c = f.createElement(document, "textarea", {
                name: b.options.textarea,
                id: "ueditor_textarea_" + b.options.textarea, style: "display:none"
            })), b.textarea = c);
            !c.getAttribute("name") && c.setAttribute("name", b.options.textarea);
            c.value = b.hasContents() ? b.options.allHtmlEnabled ? b.getAllHtml() : b.getContent(null, null, !0) : ""
        }

        function c(a) {
            for (var b in a) return b
        }

        function b(a) {
            a.langIsReady = !0;
            a.fireEvent("langReady")
        }

        var a = 0, e, h = UE.Editor = function (g) {
            var e = this;
            e.uid = a++;
            Z.call(e);
            e.commands = {};
            e.options = p.extend(p.clone(g || {}), UEDITOR_CONFIG, !0);
            e.shortcutkeys = {};
            e.inputRules = [];
            e.outputRules = [];
            e.setOpt(h.defaultOptions(e));
            e.loadServerConfig();
            p.isEmptyObject(UE.I18N) ? p.loadFile(document, {
                src: e.options.langPath + e.options.lang + "/" + e.options.lang + ".js",
                tag: "script",
                type: "text/javascript",
                defer: "defer"
            }, function () {
                UE.plugin.load(e);
                b(e)
            }) : (e.options.lang = c(UE.I18N), UE.plugin.load(e), b(e));
            UE.instants["ueditorInstant" + e.uid] = e
        };
        h.prototype = {
            registerCommand: function (a, b) {
                this.commands[a] = b
            }, ready: function (a) {
                a && (this.isReady ? a.apply(this) : this.addListener("ready", a))
            }, setOpt: function (a,
                                 b) {
                var e = {};
                p.isString(a) ? e[a] = b : e = a;
                p.extend(this.options, e, !0)
            }, getOpt: function (a) {
                return this.options[a]
            }, destroy: function () {
                this.fireEvent("destroy");

                var a = this.container.parentNode,
                    b = this.textarea;
                b ? b.style.display = "" : (b = document.createElement("textarea"), a.parentNode.insertBefore(b, a));
                b.style.width = this.iframe.offsetWidth + "px";
                b.style.height = this.iframe.offsetHeight + "px";
                b.value = this.getContent();
                b.id = this.key;
                a.innerHTML = "";
                f.remove(a);
                var a = this.key, e;
                for (e in this) this.hasOwnProperty(e) &&
                delete this[e];
                UE.delEditor(a)
            }, render: function (a) {
                var b = this.options;
                p.isString(a) && (a = document.getElementById(a));
                if (a) {
                    b.minFrameWidth = b.initialFrameWidth ? b.initialFrameWidth : b.initialFrameWidth = a.offsetWidth;
                    b.initialFrameHeight ? b.minFrameHeight = b.initialFrameHeight : b.initialFrameHeight = b.minFrameHeight = a.offsetHeight;
                    a.style.width = /%$/.test(b.initialFrameWidth) ? "100%" : b.initialFrameWidth - parseInt(f.getComputedStyle(a, "padding-left")) - parseInt(f.getComputedStyle(a, "padding-right")) + "px";
                    a.style.height =
                        /%$/.test(b.initialFrameHeight) ? "100%" : b.initialFrameHeight - parseInt(f.getComputedStyle(a, "padding-top")) - parseInt(f.getComputedStyle(a, "padding-bottom")) + "px";
                    a.style.zIndex = b.zIndex;
                    var e = (I && 9 > r.version ? "" : "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\nbody{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style>" + (b.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" +
                        p.unhtml(b.iframeCssUrl) + "'/>" : "") + (b.initialStyle ? "<style>" + b.initialStyle + "</style>" : "") + "</head><body class='view' ></body><script type='text/javascript' " + (I ? "defer='defer'" : "") + " id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant" + this.uid + "'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);\x3c/script></html>";
                    a.appendChild(f.createElement(document, "iframe", {
                        id: "ueditor_" +
                            this.uid,
                        width: "100%",
                        height: "100%",
                        frameborder: "0",
                        src: "javascript:void(function(){document.open();" + (b.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";' : "") + 'document.write("' + e + '");document.close();}())'
                    }));
                    a.style.overflow = "hidden";
                    setTimeout(function () {
                        /%$/.test(b.initialFrameWidth) && (b.minFrameWidth = b.initialFrameWidth = a.offsetWidth);
                        /%$/.test(b.initialFrameHeight) && (b.minFrameHeight = b.initialFrameHeight = a.offsetHeight, a.style.height = b.initialFrameHeight +
                            "px")
                    })
                }
            }, _setup: function (a) {
                var b = this, e = b.options;
                I ? (a.body.disabled = !0, a.body.contentEditable = !0, a.body.disabled = !1) : a.body.contentEditable = !0;
                a.body.spellcheck = !1;
                b.document = a;
                b.window = a.defaultView || a.parentWindow;
                b.iframe = b.window.frameElement;
                b.body = a.body;
                b.selection = new L.Selection(a);
                var c;
                r.gecko && (c = this.selection.getNative()) && c.removeAllRanges();
                this._initEvents();
                for (var h = this.iframe.parentNode; !f.isBody(h); h = h.parentNode) if ("FORM" == h.tagName) {
                    b.form = h;
                    if (b.options.autoSyncData) f.on(b.window,
                        "blur", function () {
                            d(h, b)
                        }); else f.on(h, "submit", function () {
                        d(this, b)
                    });
                    break
                }
                if (e.initialContent) if (e.autoClearinitialContent) {
                    var q = b.execCommand;
                    b.execCommand = function () {
                        b.fireEvent("firstBeforeExecCommand");
                        return q.apply(b, arguments)
                    };
                    this._setDefaultContent(e.initialContent)
                } else this.setContent(e.initialContent, !1, !0);
                f.isEmptyNode(b.body) && (b.body.innerHTML = "<p>" + (r.ie ? "" : "<br/>") + "</p>");
                e.focus && setTimeout(function () {
                        b.focus(b.options.focusInEnd);
                        !b.options.autoClearinitialContent && b._selectionChange()
                    },
                    0);
                b.container || (b.container = this.iframe.parentNode);
                e.fullscreen && b.ui && b.ui.setFullScreen(!0);
                try {
                    b.document.execCommand("2D-position", !1, !1)
                } catch (t) {
                }
                try {
                    b.document.execCommand("enableInlineTableEditing", !1, !1)
                } catch (w) {
                }
                try {
                    b.document.execCommand("enableObjectResizing", !1, !1)
                } catch (y) {
                }
                b._bindshortcutKeys();
                b.isReady = 1;
                b.fireEvent("ready");
                e.onready && e.onready.call(b);
                if (!r.ie9below) f.on(b.window, ["blur", "focus"], function (a) {
                    if ("blur" == a.type) {
                        b._bakRange = b.selection.getRange();
                        try {
                            b._bakNativeRange =
                                b.selection.getNative().getRangeAt(0), b.selection.getNative().removeAllRanges()
                        } catch (e) {
                            b._bakNativeRange = null
                        }
                    } else try {
                        b._bakRange && b._bakRange.select()
                    } catch (c) {
                    }
                });
                r.gecko && 10902 >= r.version && (b.body.contentEditable = !1, setTimeout(function () {
                    b.body.contentEditable = !0
                }, 100), setInterval(function () {
                    b.body.style.height = b.iframe.offsetHeight - 20 + "px"
                }, 100));
                !e.isShow && b.setHide();
                e.readonly && b.setDisabled()
            }, sync: function (a) {
                (a = a ? document.getElementById(a) : f.findParent(this.iframe.parentNode, function (a) {
                    return "FORM" ==
                        a.tagName
                }, !0)) && d(a, this)
            }, setHeight: function (a, b) {
                a !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.height = a + "px");
                !b && (this.options.minFrameHeight = this.options.initialFrameHeight = a);
                this.body.style.height = a + "px";
                !b && this.trigger("setHeight")
            }, addshortcutkey: function (a, b) {
                var e = {};
                b ? e[a] = b : e = a;
                p.extend(this.shortcutkeys, e)
            }, _bindshortcutKeys: function () {
                var a = this, b = this.shortcutkeys;
                a.addListener("keydown", function (e, c) {
                    var h = c.keyCode || c.which, d;
                    for (d in b) for (var t =
                        b[d].split(","), w = 0, y; y = t[w++];) {
                        y = y.split(":");
                        var u = y[0];
                        y = y[1];
                        if (/^(ctrl)(\+shift)?\+(\d+)$/.test(u.toLowerCase()) || /^(\d+)$/.test(u)) if ("ctrl" == RegExp.$1 && (c.ctrlKey || c.metaKey) && ("" != RegExp.$2 ? c[RegExp.$2.slice(1) + "Key"] : 1) && h == RegExp.$3 || h == RegExp.$1) -1 != a.queryCommandState(d, y) && a.execCommand(d, y), f.preventDefault(c)
                    }
                })
            }, getContent: function (a, b, e, c, h) {
                a && p.isFunction(a) && (b = a, a = "");
                if (b ? !b() : !this.hasContents()) return "";
                this.fireEvent("beforegetcontent");
                b = UE.htmlparser(this.body.innerHTML,
                    c);
                this.filterOutputRule(b);
                this.fireEvent("aftergetcontent", a, b);
                return b.toHtml(h)
            }, getAllHtml: function () {
                var a = [];
                this.fireEvent("getAllHtml", a);
                if (r.ie && 8 < r.version) {
                    var b = "";
                    p.each(this.document.styleSheets, function (a) {
                        b += a.href ? '<link rel="stylesheet" type="text/css" href="' + a.href + '" />' : "<style>" + a.cssText + "</style>"
                    });
                    p.each(this.document.getElementsByTagName("script"), function (a) {
                        b += a.outerHTML
                    })
                }
                return "<html><head>" + (this.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' +
                    this.options.charset + '"/>' : "") + (b || this.document.getElementsByTagName("head")[0].innerHTML) + a.join("\n") + "</head><body " + (I && 9 > r.version ? 'class="view"' : "") + ">" + this.getContent(null, null, !0) + "</body></html>"
            }, getPlainTxt: function () {
                var a = RegExp(f.fillChar, "g"), b = this.body.innerHTML.replace(/[\n\r]/g, ""),
                    b = b.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/]+>/g, "").replace(/(\n)?<\/([^>]+)>/g, function (a, b, e) {
                        return v.$block[e] ? "\n" : b ? b : ""
                    });
                return b.replace(a,
                    "").replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ")
            }, getContentTxt: function () {
                return this.body[r.ie ? "innerText" : "textContent"].replace(RegExp(f.fillChar, "g"), "").replace(/\u00a0/g, " ")
            }, setContent: function (a, b, e) {
                this.fireEvent("beforesetcontent", a);
                a = UE.htmlparser(a);
                this.filterInputRule(a);
                a = a.toHtml();
                this.body.innerHTML = (b ? this.body.innerHTML : "") + a;
                if ("p" == this.options.enterTag) if (b = this.body.firstChild, !b || 1 == b.nodeType && (v.$cdata[b.tagName] || "DIV" == b.tagName && b.getAttribute("cdata_tag") || f.isCustomeNode(b)) &&
                b === this.body.lastChild) this.body.innerHTML = "<p>" + (r.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML; else for (var c = this.document.createElement("p"); b;) {
                    for (; b && (3 == b.nodeType || 1 == b.nodeType && v.p[b.tagName] && !v.$cdata[b.tagName]);) a = b.nextSibling, c.appendChild(b), b = a;
                    if (c.firstChild) if (b) b.parentNode.insertBefore(c, b), c = this.document.createElement("p"); else {
                        this.body.appendChild(c);
                        break
                    }
                    b = b.nextSibling
                }
                this.fireEvent("aftersetcontent");
                this.fireEvent("contentchange");
                !e && this._selectionChange();
                this._bakRange = this._bakIERange = this._bakNativeRange = null;
                var h;
                r.gecko && (h = this.selection.getNative()) && h.removeAllRanges();
                this.options.autoSyncData && this.form && d(this.form, this)
            }, focus: function (a) {
                try {
                    var b = this.selection.getRange();
                    if (a) {
                        var e = this.body.lastChild;
                        e && 1 == e.nodeType && !v.$empty[e.tagName] && (f.isEmptyBlock(e) ? b.setStartAtFirst(e) : b.setStartAtLast(e), b.collapse(!0));
                        b.setCursor(!0)
                    } else !b.collapsed && f.isBody(b.startContainer) && 0 == b.startOffset && (e = this.body.firstChild) && 1 == e.nodeType &&
                    !v.$empty[e.tagName] && b.setStartAtFirst(e).collapse(!0), b.select(!0);
                    this.fireEvent("focus selectionchange")
                } catch (c) {
                }
            }, isFocus: function () {
                return this.selection.isFocus()
            }, blur: function () {
                var a = this.selection.getNative();
                if (a.empty && r.ie) {
                    var b = document.body.createTextRange();
                    b.moveToElementText(document.body);
                    b.collapse(!0);
                    b.select();
                    a.empty()
                } else a.removeAllRanges()
            }, _initEvents: function () {
                var a = this, b = a.document, e = a.window;
                a._proxyDomEvent = p.bind(a._proxyDomEvent, a);
                f.on(b, "click contextmenu mousedown keydown keyup keypress mouseup mouseover mouseout selectstart".split(" "),
                    a._proxyDomEvent);
                f.on(e, ["focus", "blur"], a._proxyDomEvent);
                f.on(a.body, "drop", function (b) {
                    r.gecko && b.stopPropagation && b.stopPropagation();
                    a.fireEvent("contentchange")
                });
                f.on(b, ["mouseup", "keydown"], function (b) {
                    "keydown" == b.type && (b.ctrlKey || b.metaKey || b.shiftKey || b.altKey) || 2 != b.button && a._selectionChange(250, b)
                })
            }, _proxyDomEvent: function (a) {
                return !1 === this.fireEvent("before" + a.type.replace(/^on/, "").toLowerCase()) || !1 === this.fireEvent(a.type.replace(/^on/, ""), a) ? !1 : this.fireEvent("after" + a.type.replace(/^on/,
                    "").toLowerCase())
            }, _selectionChange: function (a, b) {
                var c = this, h = !1, d, f;
                r.ie && 9 > r.version && b && "mouseup" == b.type && !this.selection.getRange().collapsed && (h = !0, d = b.clientX, f = b.clientY);
                clearTimeout(e);
                e = setTimeout(function () {
                    if (c.selection && c.selection.getNative()) {
                        var a;
                        if (h && "None" == c.selection.getNative().type) {
                            a = c.document.body.createTextRange();
                            try {
                                a.moveToPoint(d, f)
                            } catch (e) {
                                a = null
                            }
                        }
                        var g;
                        a && (g = c.selection.getIERange, c.selection.getIERange = function () {
                            return a
                        });
                        c.selection.cache();
                        g && (c.selection.getIERange =
                            g);
                        c.selection._cachedRange && c.selection._cachedStartElement && (c.fireEvent("beforeselectionchange"), c.fireEvent("selectionchange", !!b), c.fireEvent("afterselectionchange"), c.selection.clear())
                    }
                }, a || 50)
            }, _callCmdFn: function (a, b) {
                var e = b[0].toLowerCase(), c;
                c = (e = this.commands[e] || UE.commands[e]) && e[a];
                if (!(e && c || "queryCommandState" != a)) return 0;
                if (c) return c.apply(this, b)
            }, execCommand: function (a) {
                a = a.toLowerCase();
                var b, e = this.commands[a] || UE.commands[a];
                if (!e || !e.execCommand) return null;
                e.notNeedUndo ||
                this.__hasEnterExecCommand ? (b = this._callCmdFn("execCommand", arguments), this.__hasEnterExecCommand || e.ignoreContentChange || this._ignoreContentChange || this.fireEvent("contentchange")) : (this.__hasEnterExecCommand = !0, -1 != this.queryCommandState.apply(this, arguments) && (this.fireEvent("saveScene"), this.fireEvent.apply(this, ["beforeexeccommand", a].concat(arguments)), b = this._callCmdFn("execCommand", arguments), this.fireEvent.apply(this, ["afterexeccommand", a].concat(arguments)), this.fireEvent("saveScene")),
                    this.__hasEnterExecCommand = !1);
                this.__hasEnterExecCommand || e.ignoreContentChange || this._ignoreContentChange || this._selectionChange();
                return b
            }, queryCommandState: function (a) {
                return this._callCmdFn("queryCommandState", arguments)
            }, queryCommandValue: function (a) {
                return this._callCmdFn("queryCommandValue", arguments)
            }, hasContents: function (a) {
                if (a) for (var b = 0, e; e = a[b++];) if (0 < this.document.getElementsByTagName(e).length) return !0;
                if (!f.isEmptyBlock(this.body)) return !0;
                a = ["div"];
                for (b = 0; e = a[b++];) {
                    e = f.getElementsByTagName(this.document,
                        e);
                    for (var c = 0, h; h = e[c++];) if (f.isCustomeNode(h)) return !0
                }
                return !1
            }, reset: function () {
                this.fireEvent("reset")
            }, setEnabled: function () {
                var a;
                if ("false" == this.body.contentEditable) {
                    this.body.contentEditable = !0;
                    a = this.selection.getRange();
                    try {
                        a.moveToBookmark(this.lastBk), delete this.lastBk
                    } catch (b) {
                        a.setStartAtFirst(this.body).collapse(!0)
                    }
                    a.select(!0);
                    this.bkqueryCommandState && (this.queryCommandState = this.bkqueryCommandState, delete this.bkqueryCommandState);
                    this.bkqueryCommandValue && (this.queryCommandValue =
                        this.bkqueryCommandValue, delete this.bkqueryCommandValue);
                    this.fireEvent("selectionchange")
                }
            }, enable: function () {
                return this.setEnabled()
            }, setDisabled: function (a) {
                var b = this;
                a = a ? p.isArray(a) ? a : [a] : [];
                "true" == b.body.contentEditable && (b.lastBk || (b.lastBk = b.selection.getRange().createBookmark(!0)), b.body.contentEditable = !1, b.bkqueryCommandState = b.queryCommandState, b.bkqueryCommandValue = b.queryCommandValue, b.queryCommandState = function (e) {
                    return -1 != p.indexOf(a, e) ? b.bkqueryCommandState.apply(b, arguments) :
                        -1
                }, b.queryCommandValue = function (e) {
                    return -1 != p.indexOf(a, e) ? b.bkqueryCommandValue.apply(b, arguments) : null
                }, b.fireEvent("selectionchange"))
            }, disable: function (a) {
                return this.setDisabled(a)
            }, _setDefaultContent: function () {
                function a() {
                    var b = this;
                    b.document.getElementById("initContent") && (b.body.innerHTML = "<p>" + (I ? "" : "<br/>") + "</p>", b.removeListener("firstBeforeExecCommand focus", a), setTimeout(function () {
                        b.focus();
                        b._selectionChange()
                    }, 0))
                }

                return function (b) {
                    this.body.innerHTML = '<p id="initContent">' +
                        b + "</p>";
                    this.addListener("firstBeforeExecCommand focus", a)
                }
            }(), setShow: function () {
                var a = this.selection.getRange();
                if ("none" == this.container.style.display) {
                    try {
                        a.moveToBookmark(this.lastBk), delete this.lastBk
                    } catch (b) {
                        a.setStartAtFirst(this.body).collapse(!0)
                    }
                    setTimeout(function () {
                        a.select(!0)
                    }, 100);
                    this.container.style.display = ""
                }
            }, show: function () {
                return this.setShow()
            }, setHide: function () {
                this.lastBk || (this.lastBk = this.selection.getRange().createBookmark(!0));
                this.container.style.display = "none"
            },
            hide: function () {
                return this.setHide()
            }, getLang: function (a) {
                var b = UE.I18N[this.options.lang];
                if (!b) throw Error("not import language file");
                a = (a || "").split(".");
                for (var e = 0, c; (c = a[e++]) && (b = b[c], b);) ;
                return b
            }, getContentLength: function (a, b) {
                var e = this.getContent(!1, !1, !0).length;
                if (a) {
                    b = (b || []).concat(["hr", "img", "iframe"]);
                    for (var e = this.getContentTxt().replace(/[\t\r\n]+/g, "").length, c = 0, h; h = b[c++];) e += this.document.getElementsByTagName(h).length
                }
                return e
            }, addInputRule: function (a) {
                this.inputRules.push(a)
            },
            filterInputRule: function (a) {
                for (var b = 0, e; e = this.inputRules[b++];) e.call(this, a)
            }, addOutputRule: function (a) {
                this.outputRules.push(a)
            }, filterOutputRule: function (a) {
                for (var b = 0, e; e = this.outputRules[b++];) e.call(this, a)
            }, getActionUrl: function (a) {
                a = this.getOpt(a) || a;
                var b = this.getOpt("imageUrl"), e = this.getOpt("serverUrl");
                !e && b && (e = b.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2"));
                return e ? (e = e + (-1 == e.indexOf("?") ? "?" : "&") + "action=" + (a || ""), p.formatUrl(e)) : ""
            }
        };
        p.inherits(h, Z)
    })();
    UE.Editor.defaultOptions =
        function (d) {
            d = d.options.UEDITOR_HOME_URL;
            return {
                isShow: !0,
                initialContent: "",
                initialStyle: "",
                autoClearinitialContent: !1,
                iframeCssUrl: d + "themes/iframe.css",
                textarea: "editorValue",
                focus: !1,
                focusInEnd: !0,
                autoClearEmptyNode: !0,
                fullscreen: !1,
                readonly: !1,
                zIndex: 999,
                imagePopup: !0,
                enterTag: "p",
                customDomain: !1,
                lang: "zh-cn",
                langPath: d + "lang/",
                theme: "default",
                themePath: d + "themes/",
                allHtmlEnabled: !1,
                scaleEnabled: !1,
                tableNativeEditInFF: !1,
                autoSyncData: !0,
                fileNameFormat: "{time}{rand:6}"
            }
        };
    (function () {
        UE.Editor.prototype.loadServerConfig =
            function () {
                function d(b) {
                    console && console.error(b)
                }

                var c = this;
                setTimeout(function () {
                    try {
                        c.options.imageUrl && c.setOpt("serverUrl", c.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2"));
                        var b = c.getActionUrl("config"), a = p.isCrossDomainUrl(b);
                        c._serverConfigLoaded = !1;
                        b && UE.ajax.request(b, {
                            method: "GET", dataType: a ? "jsonp" : "", onsuccess: function (b) {
                                try {
                                    var e = a ? b : eval("(" + b.responseText + ")");
                                    p.extend(c.options, e);
                                    c.fireEvent("serverConfigLoaded");
                                    c._serverConfigLoaded = !0
                                } catch (l) {
                                    d(c.getLang("loadconfigFormatError"))
                                }
                            },
                            onerror: function () {
                                d(c.getLang("loadconfigHttpError"))
                            }
                        })
                    } catch (e) {
                        d(c.getLang("loadconfigError"))
                    }
                })
            };
        UE.Editor.prototype.isServerConfigLoaded = function () {
            return this._serverConfigLoaded || !1
        };
        UE.Editor.prototype.afterConfigReady = function (d) {
            if (d && p.isFunction(d)) {
                var c = this, b = function () {
                    d.apply(c, arguments);
                    c.removeListener("serverConfigLoaded", b)
                };
                c.isServerConfigLoaded() ? d.call(c, "serverConfigLoaded") : c.addListener("serverConfigLoaded", b)
            }
        }
    })();
    UE.ajax = function () {
        function d(a) {
            var b = [], e;
            for (e in a) if ("method" !=
                e && "timeout" != e && "async" != e && "dataType" != e && "callback" != e && void 0 != a[e] && null != a[e]) if ("function" != (typeof a[e]).toLowerCase() && "object" != (typeof a[e]).toLowerCase()) b.push(encodeURIComponent(e) + "=" + encodeURIComponent(a[e])); else if (p.isArray(a[e])) for (var c = 0; c < a[e].length; c++) b.push(encodeURIComponent(e) + "[]=" + encodeURIComponent(a[e][c]));
            return b.join("&")
        }

        function c(a, b) {
            var e = g(), c = !1, h = {
                method: "POST", timeout: 5E3, async: !0, data: {}, onsuccess: function () {
                }, onerror: function () {
                }
            };
            "object" === typeof a &&
            (b = a, a = b.url);
            if (e && a) {
                var f = b ? p.extend(h, b) : h, h = d(f);
                p.isEmptyObject(f.data) || (h += (h ? "&" : "") + d(f.data));
                var w = setTimeout(function () {
                        4 != e.readyState && (c = !0, e.abort(), clearTimeout(w))
                    }, f.timeout), y = f.method.toUpperCase(),
                    u = a + (-1 == a.indexOf("?") ? "?" : "&") + ("POST" == y ? "" : h + "&noCache=" + +new Date);
                e.open(y, u, f.async);
                e.onreadystatechange = function () {
                    if (4 == e.readyState) if (c || 200 != e.status) f.onerror(e); else f.onsuccess(e)
                };
                "POST" == y ? (e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.send(h)) :
                    e.send(null)
            }
        }

        function b(a, b) {
            function e(a) {
                return function () {
                    try {
                        if (a) h.onerror && h.onerror(); else try {
                            clearTimeout(E), c.apply(window, arguments)
                        } catch (b) {
                        }
                    } catch (e) {
                        h.onerror && h.onerror.call(window, e)
                    } finally {
                        h.oncomplete && h.oncomplete.apply(window, arguments);
                        g.parentNode && g.parentNode.removeChild(g);
                        window[u] = null;
                        try {
                            delete window[u]
                        } catch (k) {
                        }
                    }
                }
            }

            var c = b.onsuccess || function () {
                }, g = document.createElement("SCRIPT"), h = b || {}, f = h.charset, y = h.jsonp || "callback", u,
                C = h.timeOut || 0, E, G = RegExp("(\\?|&)" + y + "=([^&]*)"),
                A;
            if (p.isFunction(c)) u = "bd__editor__" + Math.floor(2147483648 * Math.random()).toString(36), window[u] = e(0); else if (p.isString(c)) u = c; else if (A = G.exec(a)) u = A[2];
            a = a.replace(G, "$1" + y + "=" + u);
            0 > a.search(G) && (a += (0 > a.indexOf("?") ? "?" : "&") + y + "=" + u);
            y = d(b);
            p.isEmptyObject(b.data) || (y += (y ? "&" : "") + d(b.data));
            y && (a = a.replace(/\?/, "?" + y + "&"));
            g.onerror = e(1);
            C && (E = setTimeout(e(1), C));
            (function (a, b, e) {
                a.setAttribute("type", "text/javascript");
                a.setAttribute("defer", "defer");
                e && a.setAttribute("charset", e);
                a.setAttribute("src",
                    b);
                document.getElementsByTagName("head")[0].appendChild(a)
            })(g, a, f)
        }

        var a = "XMLHttpRequest()";
        try {
            new ActiveXObject("Msxml2.XMLHTTP"), a = "ActiveXObject('Msxml2.XMLHTTP')"
        } catch (e) {
            try {
                new ActiveXObject("Microsoft.XMLHTTP"), a = "ActiveXObject('Microsoft.XMLHTTP')"
            } catch (h) {
            }
        }
        var g = new Function("return new " + a);
        return {
            request: function (a, e) {
                e && "jsonp" == e.dataType ? b(a, e) : c(a, e)
            }, getJSONP: function (a, e, c) {
                b(a, {data: e, oncomplete: c})
            }
        }
    }();
    UE.filterWord = function () {
        function d(b) {
            return b = b.replace(/[\d.]+\w+/g,
                function (a) {
                    return p.transUnitToPx(a)
                })
        }

        function c(b) {
            return b.replace(/[\t\r\n]+/g, " ").replace(/\x3c!--[\s\S]*?--\x3e/ig, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function (a) {
                if (r.opera) return "";
                try {
                    if (/Bitmap/i.test(a)) return "";
                    var b = a.match(/width:([ \d.]*p[tx])/i)[1], c = a.match(/height:([ \d.]*p[tx])/i)[1],
                        g = a.match(/src=\s*"([^"]*)"/i)[1];
                    return '<img width="' + d(b) + '" height="' + d(c) + '" src="' + g + '" />'
                } catch (l) {
                    return ""
                }
            }).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g,
                "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig, function (a, b, c, g) {
                return "class" == b && "MsoListParagraph" == g ? a : ""
            }).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi, function (a, b, c) {
                return c.replace(/[\t\r\n ]+/g, " ")
            }).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function (a, b, c, g) {
                a = [];
                g = g.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").replace(/[\d.]+(cm|pt)/g, function (a) {
                    return p.transUnitToPx(a)
                }).split(/;\s*/g);
                c = 0;
                for (var l; l = g[c]; c++) {
                    var k, f = l.split(":");
                    if (2 == f.length && (l = f[0].toLowerCase(), k = f[1].toLowerCase(), !(/^(background)\w*/.test(l) && 0 == k.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(l) && /^0\w+$/.test(k)))) {
                        switch (l) {
                            case "mso-padding-alt":
                            case "mso-padding-top-alt":
                            case "mso-padding-right-alt":
                            case "mso-padding-bottom-alt":
                            case "mso-padding-left-alt":
                            case "mso-margin-alt":
                            case "mso-margin-top-alt":
                            case "mso-margin-right-alt":
                            case "mso-margin-bottom-alt":
                            case "mso-margin-left-alt":
                            case "mso-height":
                            case "mso-width":
                            case "mso-vertical-align-alt":
                                /<table/.test(b) ||
                                (a[c] = l.replace(/^mso-|-alt$/g, "") + ":" + d(k));
                                continue;
                            case "horiz-align":
                                a[c] = "text-align:" + k;
                                continue;
                            case "vert-align":
                                a[c] = "vertical-align:" + k;
                                continue;
                            case "font-color":
                            case "mso-foreground":
                                a[c] = "color:" + k;
                                continue;
                            case "mso-background":
                            case "mso-highlight":
                                a[c] = "background:" + k;
                                continue;
                            case "mso-default-height":
                                a[c] = "min-height:" + d(k);
                                continue;
                            case "mso-default-width":
                                a[c] = "min-width:" + d(k);
                                continue;
                            case "mso-padding-between-alt":
                                a[c] = "border-collapse:separate;border-spacing:" + d(k);
                                continue;
                            case "text-line-through":
                                if ("single" == k || "double" == k) a[c] = "text-decoration:line-through";
                                continue;
                            case "mso-zero-height":
                                "yes" == k && (a[c] = "display:none");
                                continue;
                            case "margin":
                                if (!/[1-9]/.test(k)) continue
                        }
                        /^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(l) || /text\-indent|padding|margin/.test(l) && /\-[\d.]+/.test(k) || (a[c] = l + ":" + f[1])
                    }
                }
                return b + (a.length ? ' style="' + a.join(";").replace(/;{2,}/g,
                    ";") + '"' : "")
            })
        }

        return function (b) {
            return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test(b) ? c(b) : b
        }
    }();
    (function () {
        function d(a, b, e) {
            a.push(q);
            return b + (e ? 1 : -1)
        }

        function c(a, b) {
            for (var e = 0; e < b; e++) a.push(n)
        }

        function b(e, g, h, k) {
            switch (e.type) {
                case "root":
                    for (var l = 0, n; n = e.children[l++];) h && "element" == n.type && !v.$inlineWithA[n.tagName] && 1 < l && (d(g, k, !0), c(g, k)), b(n, g, h, k);
                    break;
                case "text":
                    "pre" == e.parentNode.tagName ? g.push(e.data) : g.push(f[e.parentNode.tagName] ? p.html(e.data) :
                        e.data.replace(/[ ]{2}/g, " &nbsp;"));
                    break;
                case "element":
                    a(e, g, h, k);
                    break;
                case "comment":
                    g.push("\x3c!--" + e.data + "--\x3e")
            }
            return g
        }

        function a(a, e, g, h) {
            var l = "";
            if (a.attrs) {
                var l = [], f = a.attrs, n;
                for (n in f) l.push(n + (void 0 !== f[n] ? '="' + (k[n] ? p.html(f[n]).replace(/["]/g, function (a) {
                    return "&quot;"
                }) : p.unhtml(f[n])) + '"' : ""));
                l = l.join(" ")
            }
            e.push("<" + a.tagName + (l ? " " + l : "") + (v.$empty[a.tagName] ? "/" : "") + ">");
            g && !v.$inlineWithA[a.tagName] && "pre" != a.tagName && a.children && a.children.length && (h = d(e, h, !0), c(e,
                h));
            if (a.children && a.children.length) for (l = 0; f = a.children[l++];) g && "element" == f.type && !v.$inlineWithA[f.tagName] && 1 < l && (d(e, h), c(e, h)), b(f, e, g, h);
            v.$empty[a.tagName] || (g && !v.$inlineWithA[a.tagName] && "pre" != a.tagName && a.children && a.children.length && (h = d(e, h), c(e, h)), e.push("</" + a.tagName + ">"))
        }

        function e(a, b) {
            var c;
            if ("element" == a.type && a.getAttr("id") == b) return a;
            if (a.children && a.children.length) for (var g = 0; c = a.children[g++];) if (c = e(c, b)) return c
        }

        function h(a, b, e) {
            "element" == a.type && a.tagName == b &&
            e.push(a);
            if (a.children && a.children.length) for (var c = 0, g; g = a.children[c++];) h(g, b, e)
        }

        function g(a, b) {
            if (a.children && a.children.length) for (var e = 0, c; c = a.children[e];) g(c, b), c.parentNode && (c.children && c.children.length && b(c), c.parentNode && e++); else b(a)
        }

        var l = UE.uNode = function (a) {
            this.type = a.type;
            this.data = a.data;
            this.tagName = a.tagName;
            this.parentNode = a.parentNode;
            this.attrs = a.attrs || {};
            this.children = a.children
        }, k = {href: 1, src: 1, _src: 1, _href: 1, cdata_data: 1}, f = {style: 1, script: 1}, n = "    ", q = "\n";
        l.createElement =
            function (a) {
                return /[<>]/.test(a) ? UE.htmlparser(a).children[0] : new l({
                    type: "element",
                    children: [],
                    tagName: a
                })
            };
        l.createText = function (a, b) {
            return new UE.uNode({type: "text", data: b ? a : p.unhtml(a || "")})
        };
        l.prototype = {
            toHtml: function (a) {
                var e = [];
                b(this, e, a, 0);
                return e.join("")
            }, innerHTML: function (a) {
                if ("element" != this.type || v.$empty[this.tagName]) return this;
                if (p.isString(a)) {
                    if (this.children) for (var b = 0, e; e = this.children[b++];) e.parentNode = null;
                    this.children = [];
                    a = UE.htmlparser(a);
                    for (b = 0; e = a.children[b++];) this.children.push(e),
                        e.parentNode = this;
                    return this
                }
                a = new UE.uNode({type: "root", children: this.children});
                return a.toHtml()
            }, innerText: function (a, b) {
                if ("element" != this.type || v.$empty[this.tagName]) return this;
                if (a) {
                    if (this.children) for (var e = 0, c; c = this.children[e++];) c.parentNode = null;
                    this.children = [];
                    this.appendChild(l.createText(a, b));
                    return this
                }
                return this.toHtml().replace(/<[^>]+>/g, "")
            }, getData: function () {
                return "element" == this.type ? "" : this.data
            }, firstChild: function () {
                return this.children ? this.children[0] : null
            }, lastChild: function () {
                return this.children ?
                    this.children[this.children.length - 1] : null
            }, previousSibling: function () {
                for (var a = this.parentNode, b = 0, e; e = a.children[b]; b++) if (e === this) return 0 == b ? null : a.children[b - 1]
            }, nextSibling: function () {
                for (var a = this.parentNode, b = 0, e; e = a.children[b++];) if (e === this) return a.children[b]
            }, replaceChild: function (a, b) {
                if (this.children) {
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var e = 0, c; c = this.children[e]; e++) if (c === b) return this.children.splice(e, 1, a), b.parentNode = null, a.parentNode = this, a
                }
            }, appendChild: function (a) {
                if ("root" ==
                    this.type || "element" == this.type && !v.$empty[this.tagName]) {
                    this.children || (this.children = []);
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var b = 0, e; e = this.children[b]; b++) if (e === a) {
                        this.children.splice(b, 1);
                        break
                    }
                    this.children.push(a);
                    a.parentNode = this;
                    return a
                }
            }, insertBefore: function (a, b) {
                if (this.children) {
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var e = 0, c; c = this.children[e]; e++) if (c === b) return this.children.splice(e, 0, a), a.parentNode = this, a
                }
            }, insertAfter: function (a, b) {
                if (this.children) {
                    a.parentNode &&
                    a.parentNode.removeChild(a);
                    for (var e = 0, c; c = this.children[e]; e++) if (c === b) return this.children.splice(e + 1, 0, a), a.parentNode = this, a
                }
            }, removeChild: function (a, b) {
                if (this.children) for (var e = 0, c; c = this.children[e]; e++) if (c === a) {
                    this.children.splice(e, 1);
                    c.parentNode = null;
                    if (b && c.children && c.children.length) for (var g = 0, h; h = c.children[g]; g++) this.children.splice(e + g, 0, h), h.parentNode = this;
                    return c
                }
            }, getAttr: function (a) {
                return this.attrs && this.attrs[a.toLowerCase()]
            }, setAttr: function (a, b) {
                if (a) if (this.attrs ||
                (this.attrs = {}), p.isObject(a)) for (var e in a) a[e] ? this.attrs[e.toLowerCase()] = a[e] : delete this.attrs[e]; else b ? this.attrs[a.toLowerCase()] = b : delete this.attrs[a]; else delete this.attrs
            }, getIndex: function () {
                for (var a = this.parentNode, b = 0, e; e = a.children[b]; b++) if (e === this) return b;
                return -1
            }, getNodeById: function (a) {
                var b;
                if (this.children && this.children.length) for (var c = 0; b = this.children[c++];) if (b = e(b, a)) return b
            }, getNodesByTagName: function (a) {
                a = p.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
                var b = [], e =
                    this;
                p.each(a, function (a) {
                    if (e.children && e.children.length) for (var c = 0, g; g = e.children[c++];) h(g, a, b)
                });
                return b
            }, getStyle: function (a) {
                var b = this.getAttr("style");
                return b ? (a = b.match(RegExp("(^|;)\\s*" + a + ":([^;]+)", "i"))) && a[0] ? a[2] : "" : ""
            }, setStyle: function (a, b) {
                function e(a, b) {
                    c = c.replace(RegExp("(^|;)\\s*" + a + ":([^;]+;?)", "gi"), "$1");
                    b && (c = a + ":" + p.unhtml(b) + ";" + c)
                }

                var c = this.getAttr("style");
                c || (c = "");
                if (p.isObject(a)) for (var g in a) e(g, a[g]); else e(a, b);
                this.setAttr("style", p.trim(c))
            }, traversal: function (a) {
                this.children &&
                this.children.length && g(this, a);
                return this
            }
        }
    })();
    UE.htmlparser = function (d, c) {
        function b(a, b) {
            if (n[a.tagName]) {
                var e = k.createElement(n[a.tagName]);
                a.appendChild(e);
                e.appendChild(k.createText(b))
            } else a.appendChild(k.createText(b))
        }

        function a(b, e, c) {
            var g;
            if (g = m[e]) {
                for (var d = b, f; "root" != d.type;) {
                    if (p.isArray(g) ? -1 != p.indexOf(g, d.tagName) : g == d.tagName) {
                        b = d;
                        f = !0;
                        break
                    }
                    d = d.parentNode
                }
                f || (b = a(b, p.isArray(g) ? g[0] : g))
            }
            g = new k({
                parentNode: b, type: "element", tagName: e.toLowerCase(), children: v.$empty[e] ? null :
                    []
            });
            if (c) {
                for (d = {}; f = h.exec(c);) d[f[1].toLowerCase()] = l[f[1].toLowerCase()] ? f[2] || f[3] || f[4] : p.unhtml(f[2] || f[3] || f[4]);
                g.attrs = d
            }
            b.children.push(g);
            return v.$empty[e] ? b : g
        }

        var e = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\s\/<>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
            h = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, g = {
                b: 1,
                code: 1,
                i: 1,
                u: 1,
                strike: 1,
                s: 1,
                tt: 1,
                strong: 1,
                q: 1,
                samp: 1,
                em: 1,
                span: 1,
                sub: 1,
                img: 1,
                sup: 1,
                font: 1,
                big: 1,
                small: 1,
                iframe: 1,
                a: 1,
                br: 1,
                pre: 1
            };
        d = d.replace(RegExp(f.fillChar, "g"), "");
        c || (d = d.replace(RegExp("[\\r\\t\\n" + (c ? "" : " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (c ? "" : " ") + "]*", "g"), function (a, b) {
            return b && g[b.toLowerCase()] ? a.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : a.replace(RegExp("^[\\r\\n" + (c ? "" : " ") + "]+"), "").replace(RegExp("[\\r\\n" + (c ? "" : " ") + "]+$"), "")
        }));
        for (var l = {href: 1, src: 1}, k = UE.uNode, m = {
                td: "tr",
                tr: ["tbody", "thead", "tfoot"],
                tbody: "table",
                th: "tr",
                thead: "table",
                tfoot: "table",
                caption: "table",
                li: ["ul", "ol"],
                dt: "dl",
                dd: "dl",
                option: "select"
            },
                 n = {ol: "li", ul: "li"}, q, t = 0, w = 0, y = new k({
                type: "root",
                children: []
            }), u = y; q = e.exec(d);) {
            t = q.index;
            try {
                if (t > w && b(u, d.slice(w, t)), q[3]) v.$cdata[u.tagName] ? b(u, q[0]) : u = a(u, q[3].toLowerCase(), q[4]); else if (q[1]) {
                    if ("root" != u.type) if (v.$cdata[u.tagName] && !v.$cdata[q[1]]) b(u, q[0]); else {
                        for (t = u; "element" == u.type && u.tagName != q[1].toLowerCase();) if (u = u.parentNode, "root" == u.type) throw u = t, "break";
                        u = u.parentNode
                    }
                } else q[2] && u.children.push(new k({type: "comment", data: q[2], parentNode: u}))
            } catch (C) {
            }
            w = e.lastIndex
        }
        w <
        d.length && b(u, d.slice(w));
        return y
    };
    UE.filterNode = function () {
        function d(c, b) {
            switch (c.type) {
                case "element":
                    var a;
                    if (a = b[c.tagName]) if ("-" === a) c.parentNode.removeChild(c); else if (p.isFunction(a)) {
                        var e = c.parentNode, h = c.getIndex();
                        a(c);
                        if (c.parentNode) {
                            if (c.children) for (a = 0; h = c.children[a];) d(h, b), h.parentNode && a++
                        } else for (a = h; h = e.children[a];) d(h, b), h.parentNode && a++
                    } else {
                        if ((a = a.$) && c.attrs) {
                            var h = {}, g;
                            for (e in a) {
                                g = c.getAttr(e);
                                if ("style" == e && p.isArray(a[e])) {
                                    var l = [];
                                    p.each(a[e], function (a) {
                                        var b;
                                        (b = c.getStyle(a)) && l.push(a + ":" + b)
                                    });
                                    g = l.join(";")
                                }
                                g && (h[e] = g)
                            }
                            c.attrs = h
                        }
                        if (c.children) for (a = 0; h = c.children[a];) d(h, b), h.parentNode && a++
                    } else if (v.$cdata[c.tagName]) c.parentNode.removeChild(c); else for (e = c.parentNode, h = c.getIndex(), c.parentNode.removeChild(c, !0), a = h; h = e.children[a];) d(h, b), h.parentNode && a++;
                    break;
                case "comment":
                    c.parentNode.removeChild(c)
            }
        }

        return function (c, b) {
            if (p.isEmptyObject(b)) return c;
            var a;
            (a = b["-"]) && p.each(a.split(" "), function (a) {
                b[a] = "-"
            });
            a = 0;
            for (var e; e = c.children[a];) d(e,
                b), e.parentNode && a++;
            return c
        }
    }();
    UE.plugin = function () {
        var d = {};
        return {
            register: function (c, b, a, e) {
                a && p.isFunction(a) && (e = a, a = null);
                d[c] = {optionName: a || c, execFn: b, afterDisabled: e}
            }, load: function (c) {
                p.each(d, function (b) {
                    var a = b.execFn.call(c);
                    !1 !== c.options[b.optionName] ? a && p.each(a, function (a, b) {
                        switch (b.toLowerCase()) {
                            case "shortcutkey":
                                c.addshortcutkey(a);
                                break;
                            case "bindevents":
                                p.each(a, function (a, b) {
                                    c.addListener(b, a)
                                });
                                break;
                            case "bindmultievents":
                                p.each(p.isArray(a) ? a : [a], function (a) {
                                    var b = p.trim(a.type).split(/\s+/);
                                    p.each(b, function (b) {
                                        c.addListener(b, a.handler)
                                    })
                                });
                                break;
                            case "commands":
                                p.each(a, function (a, b) {
                                    c.commands[b] = a
                                });
                                break;
                            case "outputrule":
                                c.addOutputRule(a);
                                break;
                            case "inputrule":
                                c.addInputRule(a);
                                break;
                            case "defaultoptions":
                                c.setOpt(a)
                        }
                    }) : b.afterDisabled && b.afterDisabled.call(c)
                });
                p.each(UE.plugins, function (b) {
                    b.call(c)
                })
            }, run: function (c, b) {
                var a = d[c];
                a && a.exeFn.call(b)
            }
        }
    }();
    var $ = UE.keymap = {
        Backspace: 8,
        Tab: 9,
        Enter: 13,
        Shift: 16,
        Control: 17,
        Alt: 18,
        CapsLock: 20,
        Esc: 27,
        Spacebar: 32,
        PageUp: 33,
        PageDown: 34,
        End: 35,
        Home: 36,
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,
        Insert: 45,
        Del: 46,
        NumLock: 144,
        Cmd: 91,
        "=": 187,
        "-": 189,
        b: 66,
        i: 73,
        z: 90,
        y: 89,
        v: 86,
        x: 88,
        s: 83,
        n: 78
    }, Y = UE.LocalStorage = function () {
        function d() {
            var a = document.createElement("div");
            a.style.display = "none";
            if (!a.addBehavior) return null;
            a.addBehavior("#default#userdata");
            return {
                getItem: function (e) {
                    var c = null;
                    try {
                        document.body.appendChild(a), a.load(b), c = a.getAttribute(e), document.body.removeChild(a)
                    } catch (g) {
                    }
                    return c
                }, setItem: function (e, c) {
                    document.body.appendChild(a);
                    a.setAttribute(e, c);
                    a.save(b);
                    document.body.removeChild(a)
                }, removeItem: function (e) {
                    document.body.appendChild(a);
                    a.removeAttribute(e);
                    a.save(b);
                    document.body.removeChild(a)
                }
            }
        }

        var c = window.localStorage || d() || null, b = "localStorage";
        return {
            saveLocalData: function (a, b) {
                return c && b ? (c.setItem(a, b), !0) : !1
            }, getLocalData: function (a) {
                return c ? c.getItem(a) : null
            }, removeItem: function (a) {
                c && c.removeItem(a)
            }
        }
    }();
    (function () {
        UE.Editor.prototype.setPreferences = function (d, c) {
            var b = {};
            p.isString(d) ? b[d] = c : b = d;
            var a = Y.getLocalData("ueditor_preference");
            a && (a = p.str2json(a)) ? p.extend(a, b) : a = b;
            a && Y.saveLocalData("ueditor_preference", p.json2str(a))
        };
        UE.Editor.prototype.getPreferences = function (d) {
            var c = Y.getLocalData("ueditor_preference");
            return c && (c = p.str2json(c)) ? d ? c[d] : c : null
        };
        UE.Editor.prototype.removePreferences = function (d) {
            var c = Y.getLocalData("ueditor_preference");
            c && (c = p.str2json(c)) && (c[d] = void 0, delete c[d]);
            c && Y.saveLocalData("ueditor_preference", p.json2str(c))
        }
    })();
    UE.plugins.defaultfilter = function () {
        var d = this;
        d.setOpt({
            allowDivTransToP: !0,
            disabledTableInTable: !0
        });
        d.addInputRule(function (c) {
            function b(a) {
                for (; a && "element" == a.type;) {
                    if ("td" == a.tagName) return !0;
                    a = a.parentNode
                }
                return !1
            }

            var a = this.options.allowDivTransToP, e;
            c.traversal(function (c) {
                if ("element" == c.type) if (v.$cdata[c.tagName] || !d.options.autoClearEmptyNode || !v.$inline[c.tagName] || v.$empty[c.tagName] || c.attrs && !p.isEmptyObject(c.attrs)) switch (c.tagName) {
                    case "style":
                    case "script":
                        c.setAttr({cdata_tag: c.tagName, cdata_data: c.innerHTML() || "", _ue_custom_node_: "true"});
                        c.tagName =
                            "div";
                        c.innerHTML("");
                        break;
                    case "a":
                        (e = c.getAttr("href")) && c.setAttr("_href", e);
                        break;
                    case "img":
                        if ((e = c.getAttr("src")) && /^data:/.test(e)) {
                            c.parentNode.removeChild(c);
                            break
                        }
                        c.setAttr("_src", c.getAttr("src"));
                        break;
                    case "span":
                        r.webkit && (e = c.getStyle("white-space")) && /nowrap|normal/.test(e) && (c.setStyle("white-space", ""), d.options.autoClearEmptyNode && p.isEmptyObject(c.attrs) && c.parentNode.removeChild(c, !0));
                        (e = c.getAttr("id")) && /^_baidu_bookmark_/i.test(e) && c.parentNode.removeChild(c);
                        break;
                    case "p":
                        if (e =
                            c.getAttr("align")) c.setAttr("align"), c.setStyle("text-align", e);
                        p.each(c.children, function (a) {
                            if ("element" == a.type && "p" == a.tagName) {
                                var b = a.nextSibling();
                                for (c.parentNode.insertAfter(a, c); b;) {
                                    var e = b.nextSibling();
                                    c.parentNode.insertAfter(b, a);
                                    a = b;
                                    b = e
                                }
                                return !1
                            }
                        });
                        c.firstChild() || c.innerHTML(r.ie ? "&nbsp;" : "<br/>");
                        break;
                    case "div":
                        if (c.getAttr("cdata_tag")) break;
                        if ((e = c.getAttr("class")) && /^line number\d+/.test(e)) break;
                        if (!a) break;
                        for (var g, l = UE.uNode.createElement("p"); g = c.firstChild();) "text" !=
                        g.type && UE.dom.dtd.$block[g.tagName] ? l.firstChild() ? (c.parentNode.insertBefore(l, c), l = UE.uNode.createElement("p")) : c.parentNode.insertBefore(g, c) : l.appendChild(g);
                        l.firstChild() && c.parentNode.insertBefore(l, c);
                        c.parentNode.removeChild(c);
                        break;
                    case "dl":
                        c.tagName = "ul";
                        break;
                    case "dt":
                    case "dd":
                        c.tagName = "li";
                        break;
                    case "li":
                        (g = c.getAttr("class")) && /list\-/.test(g) || c.setAttr();
                        g = c.getNodesByTagName("ol ul");
                        UE.utils.each(g, function (a) {
                            c.parentNode.insertAfter(a, c)
                        });
                        break;
                    case "td":
                    case "th":
                    case "caption":
                        c.children &&
                        c.children.length || c.appendChild(r.ie11below ? UE.uNode.createText(" ") : UE.uNode.createElement("br"));
                        break;
                    case "table":
                        d.options.disabledTableInTable && b(c) && (c.parentNode.insertBefore(UE.uNode.createText(c.innerText()), c), c.parentNode.removeChild(c))
                } else c.firstChild() ? "span" != c.tagName || c.attrs && !p.isEmptyObject(c.attrs) || c.parentNode.removeChild(c, !0) : c.parentNode.removeChild(c)
            })
        });
        d.addOutputRule(function (c) {
            var b;
            c.traversal(function (a) {
                if ("element" == a.type) if (!d.options.autoClearEmptyNode ||
                    !v.$inline[a.tagName] || v.$empty[a.tagName] || a.attrs && !p.isEmptyObject(a.attrs)) switch (a.tagName) {
                    case "div":
                        if (b = a.getAttr("cdata_tag")) a.tagName = b, a.appendChild(UE.uNode.createText(a.getAttr("cdata_data"))), a.setAttr({
                            cdata_tag: "",
                            cdata_data: "",
                            _ue_custom_node_: ""
                        });
                        break;
                    case "a":
                        (b = a.getAttr("_href")) && a.setAttr({href: p.html(b), _href: ""});
                        break;
                    case "span":
                        (b = a.getAttr("id")) && /^_baidu_bookmark_/i.test(b) && a.parentNode.removeChild(a);
                        break;
                    case "img":
                        (b = a.getAttr("_src")) && a.setAttr({
                            src: a.getAttr("_src"),
                            _src: ""
                        })
                } else a.firstChild() ? "span" != a.tagName || a.attrs && !p.isEmptyObject(a.attrs) || a.parentNode.removeChild(a, !0) : a.parentNode.removeChild(a)
            })
        })
    };
    UE.commands.inserthtml = {
        execCommand: function (d, c, b) {
            var a = this, e;
            if (c && !0 !== a.fireEvent("beforeinserthtml", c)) {
                e = a.selection.getRange();
                d = e.document.createElement("div");
                d.style.display = "inline";
                b || (b = UE.htmlparser(c), a.options.filterRules && UE.filterNode(b, a.options.filterRules), a.filterInputRule(b), c = b.toHtml());
                d.innerHTML = p.trim(c);
                if (!e.collapsed &&
                    (b = e.startContainer, f.isFillChar(b) && e.setStartBefore(b), b = e.endContainer, f.isFillChar(b) && e.setEndAfter(b), e.txtToElmBoundary(), e.endContainer && 1 == e.endContainer.nodeType && (b = e.endContainer.childNodes[e.endOffset]) && f.isBr(b) && e.setEndAfter(b), 0 == e.startOffset && (b = e.startContainer, f.isBoundaryNode(b, "firstChild") && (b = e.endContainer, e.endOffset == (3 == b.nodeType ? b.nodeValue.length : b.childNodes.length) && f.isBoundaryNode(b, "lastChild") && (a.body.innerHTML = "<p>" + (r.ie ? "" : "<br/>") + "</p>", e.setStart(a.body.firstChild,
                        0).collapse(!0)))), !e.collapsed && e.deleteContents(), 1 == e.startContainer.nodeType)) {
                    b = e.startContainer.childNodes[e.startOffset];
                    var h;
                    if (b && f.isBlockElm(b) && (h = b.previousSibling) && f.isBlockElm(h)) {
                        for (e.setEnd(h, h.childNodes.length).collapse(); b.firstChild;) h.appendChild(b.firstChild);
                        f.remove(b)
                    }
                }
                var g, l, k = 0, m;
                e.inFillChar() && (b = e.startContainer, f.isFillChar(b) ? (e.setStartBefore(b).collapse(!0), f.remove(b)) : f.isFillChar(b, !0) && (b.nodeValue = b.nodeValue.replace(P, ""), e.startOffset--, e.collapsed && e.collapse(!0)));
                var n = f.findParentByTagName(e.startContainer, "li", !0);
                if (n) {
                    for (var q; b = d.firstChild;) {
                        for (; b && (3 == b.nodeType || !f.isBlockElm(b) || "HR" == b.tagName);) q = b.nextSibling, e.insertNode(b).collapse(), g = b, b = q;
                        if (b) if (/^(ol|ul)$/i.test(b.tagName)) {
                            for (; b.firstChild;) g = b.firstChild, f.insertAfter(n, b.firstChild), n = n.nextSibling;
                            f.remove(b)
                        } else q = b.nextSibling, h = a.document.createElement("li"), f.insertAfter(n, h), h.appendChild(b), g = b, b = q, n = h
                    }
                    n = f.findParentByTagName(e.startContainer, "li", !0);
                    f.isEmptyBlock(n) && f.remove(n);
                    g && e.setStartAfter(g).collapse(!0).select(!0)
                } else {
                    for (; b = d.firstChild;) {
                        if (k) {
                            for (g = a.document.createElement("p"); b && (3 == b.nodeType || !v.$block[b.tagName]);) m = b.nextSibling, g.appendChild(b), b = m;
                            g.firstChild && (b = g)
                        }
                        e.insertNode(b);
                        m = b.nextSibling;
                        if (!k && b.nodeType == f.NODE_ELEMENT && f.isBlockElm(b) && (g = f.findParent(b, function (a) {
                            return f.isBlockElm(a)
                        })) && "body" != g.tagName.toLowerCase() && (!v[g.tagName][b.nodeName] || b.parentNode !== g)) {
                            if (v[g.tagName][b.nodeName]) for (l = b.parentNode; l !== g;) h = l, l = l.parentNode;
                            else h = g;
                            f.breakParent(b, h || l);
                            h = b.previousSibling;
                            f.trimWhiteTextNode(h);
                            h.childNodes.length || f.remove(h);
                            !r.ie && (q = b.nextSibling) && f.isBlockElm(q) && q.lastChild && !f.isBr(q.lastChild) && q.appendChild(a.document.createElement("br"));
                            k = 1
                        }
                        q = b.nextSibling;
                        if (!d.firstChild && q && f.isBlockElm(q)) {
                            e.setStart(q, 0).collapse(!0);
                            break
                        }
                        e.setEndAfter(b).collapse()
                    }
                    b = e.startContainer;
                    m && f.isBr(m) && f.remove(m);
                    if (f.isBlockElm(b) && f.isEmptyNode(b)) if (m = b.nextSibling) f.remove(b), 1 == m.nodeType && v.$block[m.tagName] &&
                    e.setStart(m, 0).collapse(!0).shrinkBoundary(); else try {
                        b.innerHTML = r.ie ? f.fillChar : "<br/>"
                    } catch (t) {
                        e.setStartBefore(b), f.remove(b)
                    }
                    try {
                        e.select(!0)
                    } catch (w) {
                    }
                }
                setTimeout(function () {
                    e = a.selection.getRange();
                    e.scrollToView(a.autoHeightEnabled, a.autoHeightEnabled ? f.getXY(a.iframe).y : 0);
                    a.fireEvent("afterinserthtml", c)
                }, 200)
            }
        }
    };
    UE.plugins.autotypeset = function () {
        function d(a, b) {
            if (!a || 3 == a.nodeType) return 0;
            if (f.isBr(a)) return 1;
            if (a && a.parentNode && k[a.tagName.toLowerCase()]) return m && m.contains(a) ||
            a.getAttribute("pagebreak") ? 0 : b ? !f.isEmptyBlock(a) : f.isEmptyBlock(a, RegExp("[\\s" + f.fillChar + "]", "g"))
        }

        function c(a) {
            a.style.cssText || (f.removeAttributes(a, ["style"]), "span" == a.tagName.toLowerCase() && f.hasNoAttributes(a) && f.remove(a, !0))
        }

        function b(a, b) {
            var e;
            if (b) {
                if (!h.pasteFilter) return;
                e = this.document.createElement("div");
                e.innerHTML = b.html
            } else e = this.document.body;
            for (var k = f.getElementsByTagName(e, "*"), y = 0, u; u = k[y++];) if (!0 !== this.fireEvent("excludeNodeinautotype", u)) {
                h.clearFontSize && u.style.fontSize &&
                (f.removeStyle(u, "font-size"), c(u));
                h.clearFontFamily && u.style.fontFamily && (f.removeStyle(u, "font-family"), c(u));
                if (d(u)) {
                    if (h.mergeEmptyline) for (var C = u.nextSibling, E, G = f.isBr(u); d(C);) {
                        E = C;
                        C = E.nextSibling;
                        if (G && (!C || C && !f.isBr(C))) break;
                        f.remove(E)
                    }
                    if (h.removeEmptyline && f.inDoc(u, e) && !l[u.parentNode.tagName.toLowerCase()]) {
                        if (f.isBr(u) && (C = u.nextSibling) && !f.isBr(C)) continue;
                        f.remove(u);
                        continue
                    }
                }
                d(u, !0) && "SPAN" != u.tagName && (h.indent && (u.style.textIndent = h.indentValue), h.textAlign && (u.style.textAlign =
                    h.textAlign));
                if (h.removeClass && u.className && !g[u.className.toLowerCase()]) {
                    if (m && m.contains(u)) continue;
                    f.removeAttributes(u, ["class"])
                }
                if (h.imageBlockLine && "img" == u.tagName.toLowerCase() && !u.getAttribute("emotion")) if (b) switch (G = u, h.imageBlockLine) {
                    case "left":
                    case "right":
                    case "none":
                        for (var C = G.parentNode, r; v.$inline[C.tagName] || "A" == C.tagName;) C = C.parentNode;
                        E = C;
                        if ("P" == E.tagName && "center" == f.getStyle(E, "text-align") && !f.isBody(E) && 1 == f.getChildCount(E, function (a) {
                            return !f.isBr(a) && !f.isWhitespace(a)
                        })) if (r =
                            E.previousSibling, C = E.nextSibling, r && C && 1 == r.nodeType && 1 == C.nodeType && r.tagName == C.tagName && f.isBlockElm(r)) {
                            for (r.appendChild(E.firstChild); C.firstChild;) r.appendChild(C.firstChild);
                            f.remove(E);
                            f.remove(C)
                        } else f.setStyle(E, "text-align", "");
                        f.setStyle(G, "float", h.imageBlockLine);
                        break;
                    case "center":
                        if ("center" != this.queryCommandValue("imagefloat")) {
                            C = G.parentNode;
                            f.setStyle(G, "float", "none");
                            for (E = G; C && 1 == f.getChildCount(C, function (a) {
                                return !f.isBr(a) && !f.isWhitespace(a)
                            }) && (v.$inline[C.tagName] ||
                                "A" == C.tagName);) E = C, C = C.parentNode;
                            C = this.document.createElement("p");
                            f.setAttributes(C, {style: "text-align:center"});
                            E.parentNode.insertBefore(C, E);
                            C.appendChild(E);
                            f.setStyle(E, "float", "")
                        }
                } else this.selection.getRange().selectNode(u).select(), this.execCommand("imagefloat", h.imageBlockLine);
                h.removeEmptyNode && h.removeTagNames[u.tagName.toLowerCase()] && f.hasNoAttributes(u) && f.isEmptyBlock(u) && f.remove(u)
            }
            h.tobdc && (k = UE.htmlparser(e.innerHTML), k.traversal(function (a) {
                if ("text" == a.type) {
                    for (var b =
                        a.data, b = p.html(b), e = "", c = 0; c < b.length; c++) e = 32 == b.charCodeAt(c) ? e + String.fromCharCode(12288) : 127 > b.charCodeAt(c) ? e + String.fromCharCode(b.charCodeAt(c) + 65248) : e + b.charAt(c);
                    a.data = e
                }
            }), e.innerHTML = k.toHtml());
            h.bdc2sb && (k = UE.htmlparser(e.innerHTML), k.traversal(function (a) {
                if ("text" == a.type) {
                    for (var b = a.data, e = "", c = 0; c < b.length; c++) var g = b.charCodeAt(c), e = 65281 <= g && 65373 >= g ? e + String.fromCharCode(b.charCodeAt(c) - 65248) : 12288 == g ? e + String.fromCharCode(b.charCodeAt(c) - 12288 + 32) : e + b.charAt(c);
                    a.data = e
                }
            }),
                e.innerHTML = k.toHtml());
            b && (b.html = e.innerHTML)
        }

        function a() {
            var a = e.getPreferences("autotypeset");
            p.extend(e.options.autotypeset, a)
        }

        this.setOpt({
            autotypeset: {
                mergeEmptyline: !0,
                removeClass: !0,
                removeEmptyline: !1,
                textAlign: "left",
                imageBlockLine: "center",
                pasteFilter: !1,
                clearFontSize: !1,
                clearFontFamily: !1,
                removeEmptyNode: !1,
                removeTagNames: p.extend({div: 1}, v.$removeEmpty),
                indent: !1,
                indentValue: "2em",
                bdc2sb: !1,
                tobdc: !1
            }
        });
        var e = this, h = e.options.autotypeset, g = {selectTdClass: 1, pagebreak: 1, anchorclass: 1},
            l = {li: 1},
            k = {div: 1, p: 1, blockquote: 1, center: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, span: 1}, m;
        h && (a(), h.pasteFilter && e.addListener("beforepaste", b), e.commands.autotypeset = {
            execCommand: function () {
                e.removeListener("beforepaste", b);
                h.pasteFilter && e.addListener("beforepaste", b);
                b.call(e)
            }
        })
    };
    UE.plugin.register("autosubmit", function () {
        return {
            shortcutkey: {autosubmit: "ctrl+13"}, commands: {
                autosubmit: {
                    execCommand: function () {
                        var d = f.findParentByTagName(this.iframe, "form", !1);
                        d && !1 !== this.fireEvent("beforesubmit") && (this.sync(),
                            d.submit())
                    }
                }
            }
        }
    });
    UE.plugin.register("background", function () {
        function d(a) {
            var b = {};
            a = a.split(";");
            p.each(a, function (a) {
                var e = a.indexOf(":"), c = p.trim(a.substr(0, e)).toLowerCase();
                c && (b[c] = p.trim(a.substr(e + 1) || ""))
            });
            return b
        }

        function c(e) {
            if (e) {
                var c = [], g;
                for (g in e) e.hasOwnProperty(g) && c.push(g + ":" + e[g] + "; ");
                p.cssRule(a, c.length ? "body{" + c.join("") + "}" : "", b.document)
            } else p.cssRule(a, "", b.document)
        }

        var b = this, a = "editor_background", e, h = /body[\s]*\{(.+)\}/i, g = b.hasContents;
        b.hasContents = function () {
            return b.queryCommandValue("background") ?
                !0 : g.apply(b, arguments)
        };
        return {
            bindEvents: {
                getAllHtml: function (a, e) {
                    var c = this.body, g = f.getComputedStyle(c, "background-image"), h = "",
                        h = 0 < g.indexOf(b.options.imagePath) ? g.substring(g.indexOf(b.options.imagePath), g.length - 1).replace(/"|\(|\)/ig, "") : "none" != g ? g.replace(/url\("?|"?\)/ig, "") : "",
                        g = '<style type="text/css">body{', c = {
                            "background-color": f.getComputedStyle(c, "background-color") || "#ffffff",
                            "background-image": h ? "url(" + h + ")" : "",
                            "background-repeat": f.getComputedStyle(c, "background-repeat") || "",
                            "background-position": r.ie ? f.getComputedStyle(c, "background-position-x") + " " + f.getComputedStyle(c, "background-position-y") : f.getComputedStyle(c, "background-position"),
                            height: f.getComputedStyle(c, "height")
                        }, d;
                    for (d in c) c.hasOwnProperty(d) && (g += d + ":" + c[d] + "; ");
                    e.push(g + "}</style> ")
                }, aftersetcontent: function () {
                    !1 == e && c()
                }
            }, inputRule: function (a) {
                e = !1;
                p.each(a.getNodesByTagName("p"), function (a) {
                    var b = a.getAttr("data-background");
                    b && (e = !0, c(d(b)), a.parentNode.removeChild(a))
                })
            }, outputRule: function (b) {
                var e =
                    (p.cssRule(a, this.document) || "").replace(/[\n\r]+/g, "").match(h);
                e && b.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="' + p.trim(e[1].replace(/"/g, "").replace(/[\s]+/g, " ")) + '"><br/></p>'))
            }, commands: {
                background: {
                    execCommand: function (a, b) {
                        c(b)
                    }, queryCommandValue: function () {
                        var b = (p.cssRule(a, this.document) || "").replace(/[\n\r]+/g, "").match(h);
                        return b ? d(b[1]) : null
                    }, notNeedUndo: !0
                }
            }
        }
    });
    UE.commands.imagefloat = {
        execCommand: function (d, c) {
            var b = this.selection.getRange();
            if (!b.collapsed) {
                var a =
                    b.getClosedNode();
                if (a && "IMG" == a.tagName) switch (c) {
                    case "left":
                    case "right":
                    case "none":
                        for (var e = a.parentNode, h, g; v.$inline[e.tagName] || "A" == e.tagName;) e = e.parentNode;
                        h = e;
                        if ("P" == h.tagName && "center" == f.getStyle(h, "text-align")) {
                            if (!f.isBody(h) && 1 == f.getChildCount(h, function (a) {
                                return !f.isBr(a) && !f.isWhitespace(a)
                            })) if (e = h.previousSibling, g = h.nextSibling, e && g && 1 == e.nodeType && 1 == g.nodeType && e.tagName == g.tagName && f.isBlockElm(e)) {
                                for (e.appendChild(h.firstChild); g.firstChild;) e.appendChild(g.firstChild);
                                f.remove(h);
                                f.remove(g)
                            } else f.setStyle(h, "text-align", "");
                            b.selectNode(a).select()
                        }
                        f.setStyle(a, "float", "none" == c ? "" : c);
                        "none" == c && f.removeAttributes(a, "align");
                        break;
                    case "center":
                        if ("center" != this.queryCommandValue("imagefloat")) {
                            e = a.parentNode;
                            f.setStyle(a, "float", "");
                            f.removeAttributes(a, "align");
                            for (h = a; e && 1 == f.getChildCount(e, function (a) {
                                return !f.isBr(a) && !f.isWhitespace(a)
                            }) && (v.$inline[e.tagName] || "A" == e.tagName);) h = e, e = e.parentNode;
                            b.setStartBefore(h).setCursor(!1);
                            e = this.document.createElement("div");
                            e.appendChild(h);
                            f.setStyle(h, "float", "");
                            this.execCommand("insertHtml", '<p id="_img_parent_tmp" style="text-align:center">' + e.innerHTML + "</p>");
                            h = this.document.getElementById("_img_parent_tmp");
                            h.removeAttribute("id");
                            h = h.firstChild;
                            b.selectNode(h).select();
                            (g = h.parentNode.nextSibling) && f.isEmptyNode(g) && f.remove(g)
                        }
                }
            }
        }, queryCommandValue: function () {
            var d = this.selection.getRange(), c;
            return d.collapsed ? "none" : (d = d.getClosedNode()) && 1 == d.nodeType && "IMG" == d.tagName ? (c = f.getComputedStyle(d, "float") ||
                d.getAttribute("align"), "none" == c && (c = "center" == f.getComputedStyle(d.parentNode, "text-align") ? "center" : c), {
                left: 1,
                right: 1,
                center: 1
            }[c] ? c : "none") : "none"
        }, queryCommandState: function () {
            var d = this.selection.getRange();
            return d.collapsed ? -1 : (d = d.getClosedNode()) && 1 == d.nodeType && "IMG" == d.tagName ? 0 : -1
        }
    };
    UE.commands.insertimage = {
        execCommand: function (d, c) {
            c = p.isArray(c) ? c : [c];
            if (c.length) {
                var b = this.selection.getRange(), a = b.getClosedNode();
                if (!0 !== this.fireEvent("beforeinsertimage", c)) {
                    if (!a || !/img/i.test(a.tagName) ||
                        "edui-faked-video" == a.className && -1 == a.className.indexOf("edui-upload-video") || a.getAttribute("word_img")) {
                        var b = [], a = "", e;
                        e = c[0];
                        if (1 == c.length) a = '<img src="' + e.src + '" ' + (e._src ? ' _src="' + e._src + '" ' : "") + (e.width ? 'width="' + e.width + '" ' : "") + (e.height ? ' height="' + e.height + '" ' : "") + ("left" == e.floatStyle || "right" == e.floatStyle ? ' style="float:' + e.floatStyle + ';"' : "") + (e.title && "" != e.title ? ' title="' + e.title + '"' : "") + (e.border && "0" != e.border ? ' border="' + e.border + '"' : "") + (e.alt && "" != e.alt ? ' alt="' + e.alt +
                            '"' : "") + (e.hspace && "0" != e.hspace ? ' hspace = "' + e.hspace + '"' : "") + (e.vspace && "0" != e.vspace ? ' vspace = "' + e.vspace + '"' : "") + "/>", "center" == e.floatStyle && (a = '<p style="text-align: center">' + a + "</p>"), b.push(a); else for (var h = 0; e = c[h++];) a = "<p " + ("center" == e.floatStyle ? 'style="text-align: center" ' : "") + '><img src="' + e.src + '" ' + (e.width ? 'width="' + e.width + '" ' : "") + (e._src ? ' _src="' + e._src + '" ' : "") + (e.height ? ' height="' + e.height + '" ' : "") + ' style="' + (e.floatStyle && "center" != e.floatStyle ? "float:" + e.floatStyle +
                            ";" : "") + (e.border || "") + '" ' + (e.title ? ' title="' + e.title + '"' : "") + " /></p>", b.push(a);
                        this.execCommand("insertHtml", b.join(""))
                    } else e = c.shift(), h = e.floatStyle, delete e.floatStyle, f.setAttributes(a, e), this.execCommand("imagefloat", h), 0 < c.length && (b.setStartAfter(a).setCursor(!1, !0), this.execCommand("insertimage", c));
                    this.fireEvent("afterinsertimage", c)
                }
            }
        }
    };
    UE.plugins.justify = function () {
        var d = f.isBlockElm, c = {left: 1, right: 1, center: 1, justify: 1}, b = function (a, b) {
            var c = a.createBookmark(), g = function (a) {
                return 1 ==
                a.nodeType ? "br" != a.tagName.toLowerCase() && !f.isBookmarkNode(a) : !f.isWhitespace(a)
            };
            a.enlarge(!0);
            for (var l = a.createBookmark(), k = f.getNextDomNode(l.start, !1, g), m = a.cloneRange(), n; k && !(f.getPosition(k, l.end) & f.POSITION_FOLLOWING);) if (3 != k.nodeType && d(k)) k = f.getNextDomNode(k, !0, g); else {
                for (m.setStartBefore(k); k && k !== l.end && !d(k);) n = k, k = f.getNextDomNode(k, !1, null, function (a) {
                    return !d(a)
                });
                m.setEndAfter(n);
                k = m.getCommonAncestor();
                if (!f.isBody(k) && d(k)) f.setStyles(k, p.isString(b) ? {"text-align": b} : b); else {
                    k =
                        a.document.createElement("p");
                    f.setStyles(k, p.isString(b) ? {"text-align": b} : b);
                    var q = m.extractContents();
                    k.appendChild(q);
                    m.insertNode(k)
                }
                k = f.getNextDomNode(k, !1, g)
            }
            return a.moveToBookmark(l).moveToBookmark(c)
        };
        UE.commands.justify = {
            execCommand: function (a, e) {
                var c = this.selection.getRange(), g;
                c.collapsed && (g = this.document.createTextNode("p"), c.insertNode(g));
                b(c, e);
                g && (c.setStartBefore(g).collapse(!0), f.remove(g));
                c.select();
                return !0
            }, queryCommandValue: function () {
                var a = this.selection.getStart(), a = f.getComputedStyle(a,
                    "text-align");
                return c[a] ? a : "left"
            }, queryCommandState: function () {
                var a = this.selection.getStart();
                return a && f.findParentByTagName(a, ["td", "th", "caption"], !0) ? -1 : 0
            }
        }
    };
    UE.plugins.font = function () {
        function d(a) {
            for (var b; b = a.parentNode;) if ("SPAN" == b.tagName && 1 == f.getChildCount(b, function (a) {
                return !f.isBookmarkNode(a) && !f.isBr(a)
            })) b.style.cssText += a.style.cssText, f.remove(a, !0), a = b; else break
        }

        function c(a, b, c) {
            if (h[b] && (a.adjustmentBoundary(), !a.collapsed && 1 == a.startContainer.nodeType)) {
                var e = a.startContainer.childNodes[a.startOffset];
                if (e && f.isTagNode(e, "span")) {
                    var g = a.createBookmark();
                    p.each(f.getElementsByTagName(e, "span"), function (a) {
                        !a.parentNode || f.isBookmarkNode(a) || "backcolor" == b && f.getComputedStyle(a, "background-color").toLowerCase() === c || (f.removeStyle(a, h[b]), 0 == a.style.cssText.replace(/^\s+$/, "").length && f.remove(a, !0))
                    });
                    a.moveToBookmark(g)
                }
            }
        }

        function b(a, b, e) {
            var g = a.collapsed, h = a.createBookmark();
            if (g) for (g = h.start.parentNode; v.$inline[g.tagName];) g = g.parentNode; else g = f.getCommonAncestor(h.start, h.end);
            p.each(f.getElementsByTagName(g,
                "span"), function (a) {
                if (a.parentNode && !f.isBookmarkNode(a)) if (/\s*border\s*:\s*none;?\s*/i.test(a.style.cssText)) /^\s*border\s*:\s*none;?\s*$/.test(a.style.cssText) ? f.remove(a, !0) : f.removeStyle(a, "border"); else {
                    /border/i.test(a.style.cssText) && "SPAN" == a.parentNode.tagName && /border/i.test(a.parentNode.style.cssText) && (a.style.cssText = a.style.cssText.replace(/border[^:]*:[^;]+;?/gi, ""));
                    if ("fontborder" != b || "none" != e) for (var c = a.nextSibling; c && 1 == c.nodeType && "SPAN" == c.tagName;) {
                        if (f.isBookmarkNode(c) &&
                            "fontborder" == b) a.appendChild(c); else if (c.style.cssText == a.style.cssText && (f.moveChild(c, a), f.remove(c)), a.nextSibling === c) break;
                        c = a.nextSibling
                    }
                    d(a);
                    r.ie && 8 < r.version && (c = f.findParent(a, function (a) {
                        return "SPAN" == a.tagName && /background-color/.test(a.style.cssText)
                    })) && !/background-color/.test(a.style.cssText) && (a.style.backgroundColor = c.style.backgroundColor)
                }
            });
            a.moveToBookmark(h);
            c(a, b, e)
        }

        var a = {
                forecolor: "color",
                backcolor: "background-color",
                fontsize: "font-size",
                fontfamily: "font-family",
                underline: "text-decoration",
                strikethrough: "text-decoration",
                fontborder: "border"
            }, e = {underline: 1, strikethrough: 1, fontborder: 1},
            h = {forecolor: "color", backcolor: "background-color", fontsize: "font-size", fontfamily: "font-family"};
        this.setOpt({
            fontfamily: [{name: "songti", val: "\u5b8b\u4f53,SimSun"}, {
                name: "yahei",
                val: "\u5fae\u8f6f\u96c5\u9ed1,Microsoft YaHei"
            }, {name: "kaiti", val: "\u6977\u4f53,\u6977\u4f53_GB2312, SimKai"}, {
                name: "heiti",
                val: "\u9ed1\u4f53, SimHei"
            }, {name: "lishu", val: "\u96b6\u4e66, SimLi"}, {name: "andaleMono", val: "andale mono"},
                {name: "arial", val: "arial, helvetica,sans-serif"}, {
                    name: "arialBlack",
                    val: "arial black,avant garde"
                }, {name: "comicSansMs", val: "comic sans ms"}, {
                    name: "impact",
                    val: "impact,chicago"
                }, {name: "timesNewRoman", val: "times new roman"}], fontsize: [10, 11, 12, 14, 16, 18, 20, 24, 36]
        });
        this.addInputRule(function (a) {
            p.each(a.getNodesByTagName("u s del font strike"), function (a) {
                if ("font" == a.tagName) {
                    var b = [], c;
                    for (c in a.attrs) switch (c) {
                        case "size":
                            b.push("font-size:" + ({
                                    1: "10",
                                    2: "12",
                                    3: "16",
                                    4: "18",
                                    5: "24",
                                    6: "32",
                                    7: "48"
                                }[a.attrs[c]] ||
                                a.attrs[c]) + "px");
                            break;
                        case "color":
                            b.push("color:" + a.attrs[c]);
                            break;
                        case "face":
                            b.push("font-family:" + a.attrs[c]);
                            break;
                        case "style":
                            b.push(a.attrs[c])
                    }
                    a.attrs = {style: b.join(";")}
                } else b = "u" == a.tagName ? "underline" : "line-through", a.attrs = {style: (a.getAttr("style") || "") + "text-decoration:" + b + ";"};
                a.tagName = "span"
            })
        });
        for (var g in a) (function (a, c) {
            UE.commands[a] = {
                execCommand: function (g, h) {
                    h = h || (this.queryCommandState(g) ? "none" : "underline" == g ? "underline" : "fontborder" == g ? "1px solid #000" : "line-through");
                    var d = this.selection.getRange(), t;
                    if ("default" == h) d.collapsed && (t = this.document.createTextNode("font"), d.insertNode(t).select()), this.execCommand("removeFormat", "span,a", c), t && (d.setStartBefore(t).collapse(!0), f.remove(t)), b(d, g, h), d.select(); else if (d.collapsed) {
                        var w = f.findParentByTagName(d.startContainer, "span", !0);
                        t = this.document.createTextNode("font");
                        if (!w || w.children.length || w[r.ie ? "innerText" : "textContent"].replace(P, "").length) {
                            d.insertNode(t);
                            d.selectNode(t).select();
                            w = d.document.createElement("span");
                            if (e[a]) {
                                if (f.findParentByTagName(t, "a", !0)) {
                                    d.setStartBefore(t).setCursor();
                                    f.remove(t);
                                    return
                                }
                                this.execCommand("removeFormat", "span,a", c)
                            }
                            w.style.cssText = c + ":" + h;
                            t.parentNode.insertBefore(w, t);
                            if (!r.ie || r.ie && 9 == r.version) for (var y = w.parentNode; !f.isBlockElm(y);) "SPAN" == y.tagName && (w.style.cssText = y.style.cssText + ";" + w.style.cssText), y = y.parentNode;
                            ma ? setTimeout(function () {
                                d.setStart(w, 0).collapse(!0);
                                b(d, g, h);
                                d.select()
                            }) : (d.setStart(w, 0).collapse(!0), b(d, g, h), d.select())
                        } else d.insertNode(t),
                        e[a] && (d.selectNode(t).select(), this.execCommand("removeFormat", "span,a", c, null), w = f.findParentByTagName(t, "span", !0), d.setStartBefore(t)), w && (w.style.cssText += ";" + c + ":" + h), d.collapse(!0).select();
                        f.remove(t)
                    } else e[a] && this.queryCommandValue(a) && this.execCommand("removeFormat", "span,a", c), d = this.selection.getRange(), d.applyInlineStyle("span", {style: c + ":" + h}), b(d, g, h), d.select();
                    return !0
                }, queryCommandValue: function (a) {
                    var b = this.selection.getStart();
                    if ("underline" == a || "strikethrough" == a) {
                        for (var e =
                            b; e && !f.isBlockElm(e) && !f.isBody(e);) {
                            if (1 == e.nodeType && (a = f.getComputedStyle(e, c), "none" != a)) return a;
                            e = e.parentNode
                        }
                        return "none"
                    }
                    if ("fontborder" == a) {
                        for (a = b; a && v.$inline[a.tagName];) {
                            if ((e = f.getComputedStyle(a, "border")) && /1px/.test(e) && /solid/.test(e)) return e;
                            a = a.parentNode
                        }
                        return ""
                    }
                    return "FontSize" == a ? (e = f.getComputedStyle(b, c), (a = /^([\d\.]+)(\w+)$/.exec(e)) ? Math.floor(a[1]) + a[2] : e) : f.getComputedStyle(b, c)
                }, queryCommandState: function (a) {
                    if (!e[a]) return 0;
                    var b = this.queryCommandValue(a);
                    return "fontborder" ==
                    a ? /1px/.test(b) && /solid/.test(b) : "underline" == a ? /underline/.test(b) : /line\-through/.test(b)
                }
            }
        })(g, a[g])
    };
    UE.plugins.link = function () {
        function d(c) {
            var b = c.startContainer, a = c.endContainer;
            (b = f.findParentByTagName(b, "a", !0)) && c.setStartBefore(b);
            (a = f.findParentByTagName(a, "a", !0)) && c.setEndAfter(a)
        }

        UE.commands.unlink = {
            execCommand: function () {
                var c = this.selection.getRange(), b;
                if (!c.collapsed || f.findParentByTagName(c.startContainer, "a", !0)) b = c.createBookmark(), d(c), c.removeInlineStyle("a").moveToBookmark(b).select()
            },
            queryCommandState: function () {
                return !this.highlight && this.queryCommandValue("link") ? 0 : -1
            }
        };
        UE.commands.link = {
            execCommand: function (c, b) {
                var a;
                b._href && (b._href = p.unhtml(b._href, /[<">]/g));
                b.href && (b.href = p.unhtml(b.href, /[<">]/g));
                b.textValue && (b.textValue = p.unhtml(b.textValue, /[<">]/g));
                var e = a = this.selection.getRange(), h = e.cloneRange(), g = this.queryCommandValue("link");
                d(e = e.adjustmentBoundary());
                var l = e.startContainer;
                1 == l.nodeType && g && (l = l.childNodes[e.startOffset]) && 1 == l.nodeType && "A" == l.tagName &&
                /^(?:https?|ftp|file)\s*:\s*\/\//.test(l[r.ie ? "innerText" : "textContent"]) && (l[r.ie ? "innerText" : "textContent"] = p.html(b.textValue || b.href));
                if (!h.collapsed || g) e.removeInlineStyle("a"), h = e.cloneRange();
                if (h.collapsed) {
                    var g = e.document.createElement("a"), k = "";
                    b.textValue ? (k = p.html(b.textValue), delete b.textValue) : k = p.html(b.href);
                    f.setAttributes(g, b);
                    (l = f.findParentByTagName(h.startContainer, "a", !0)) && f.isInNodeEndBoundary(h, l) && e.setStartAfter(l).collapse(!0);
                    g[r.ie ? "innerText" : "textContent"] = k;
                    e.insertNode(g).selectNode(g)
                } else e.applyInlineStyle("a",
                    b);
                a.collapse().select(!0)
            }, queryCommandValue: function () {
                var c = this.selection.getRange(), b;
                if (c.collapsed) {
                    if (b = c.startContainer, (b = 1 == b.nodeType ? b : b.parentNode) && (b = f.findParentByTagName(b, "a", !0)) && !f.isInNodeEndBoundary(c, b)) return b
                } else {
                    c.shrinkBoundary();
                    var a = 3 != c.startContainer.nodeType && c.startContainer.childNodes[c.startOffset] ? c.startContainer.childNodes[c.startOffset] : c.startContainer,
                        e = 3 == c.endContainer.nodeType || 0 == c.endOffset ? c.endContainer : c.endContainer.childNodes[c.endOffset - 1],
                        c = c.getCommonAncestor();
                    b = f.findParentByTagName(c, "a", !0);
                    if (!b && 1 == c.nodeType) for (var c = c.getElementsByTagName("a"), h, g, d = 0, k; k = c[d++];) if (h = f.getPosition(k, a), g = f.getPosition(k, e), (h & f.POSITION_FOLLOWING || h & f.POSITION_CONTAINS) && (g & f.POSITION_PRECEDING || g & f.POSITION_CONTAINS)) {
                        b = k;
                        break
                    }
                    return b
                }
            }, queryCommandState: function () {
                var c = this.selection.getRange().getClosedNode();
                return !c || "edui-faked-video" != c.className && -1 == c.className.indexOf("edui-upload-video") ? 0 : -1
            }
        }
    };
    UE.plugins.insertframe = function () {
        var d =
            this;
        d.addListener("selectionchange", function () {
            d._iframe && delete d._iframe
        })
    };
    UE.commands.scrawl = {
        queryCommandState: function () {
            return r.ie && 8 >= r.version ? -1 : 0
        }
    };
    UE.plugins.removeformat = function () {
        this.setOpt({
            removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
            removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
        });
        this.commands.removeformat = {
            execCommand: function (d, c, b, a, e) {
                function h(a) {
                    if (3 == a.nodeType || "span" != a.tagName.toLowerCase()) return 0;
                    if (r.ie) {
                        var b = a.attributes;
                        if (b.length) {
                            a = 0;
                            for (var c = b.length; a < c; a++) if (b[a].specified) return 0;
                            return 1
                        }
                    }
                    return !a.attributes.length
                }

                var g = RegExp("^(?:" + (c || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"),
                    l = b ? [] : (a || this.options.removeFormatAttributes).split(",");
                d = new L.Range(this.document);
                var k, m, n = function (a) {
                    return 1 == a.nodeType
                };
                d = this.selection.getRange();
                (function (a) {
                    var c = a.createBookmark();
                    a.collapsed && a.enlarge(!0);
                    if (!e) {
                        var d = f.findParentByTagName(a.startContainer, "a", !0);
                        d && a.setStartBefore(d);
                        (d = f.findParentByTagName(a.endContainer, "a", !0)) && a.setEndAfter(d)
                    }
                    k = a.createBookmark();
                    for (d = k.start; (m = d.parentNode) && !f.isBlockElm(m);) f.breakParent(d, m), f.clearEmptySibling(d);
                    if (k.end) {
                        for (d = k.end; (m = d.parentNode) && !f.isBlockElm(m);) f.breakParent(d, m), f.clearEmptySibling(d);
                        for (var d = f.getNextDomNode(k.start, !1, n), y; d && d != k.end;) y = f.getNextDomNode(d, !0, n), v.$empty[d.tagName.toLowerCase()] || f.isBookmarkNode(d) || (g.test(d.tagName) ? b ? (f.removeStyle(d, b), h(d) && "text-decoration" !=
                        b && f.remove(d, !0)) : f.remove(d, !0) : v.$tableContent[d.tagName] || v.$list[d.tagName] || (f.removeAttributes(d, l), h(d) && f.remove(d, !0))), d = y
                    }
                    d = k.start.parentNode;
                    !f.isBlockElm(d) || v.$tableContent[d.tagName] || v.$list[d.tagName] || f.removeAttributes(d, l);
                    d = k.end.parentNode;
                    k.end && f.isBlockElm(d) && !v.$tableContent[d.tagName] && !v.$list[d.tagName] && f.removeAttributes(d, l);
                    a.moveToBookmark(k).moveToBookmark(c);
                    d = a.startContainer;
                    for (y = a.collapsed; 1 == d.nodeType && f.isEmptyNode(d) && v.$removeEmpty[d.tagName];) c = d.parentNode,
                        a.setStartBefore(d), a.startContainer === a.endContainer && a.endOffset--, f.remove(d), d = c;
                    if (!y) for (d = a.endContainer; 1 == d.nodeType && f.isEmptyNode(d) && v.$removeEmpty[d.tagName];) c = d.parentNode, a.setEndBefore(d), f.remove(d), d = c
                })(d);
                d.select()
            }
        }
    };
    UE.plugins.blockquote = function () {
        this.commands.blockquote = {
            execCommand: function (d, c) {
                var b = this.selection.getRange(),
                    a = f.filterNodeList(this.selection.getStartElementPath(), "blockquote"), e = v.blockquote,
                    h = b.createBookmark();
                if (a) {
                    var e = b.startContainer, e = f.isBlockElm(e) ?
                        e : f.findParent(e, function (a) {
                            return f.isBlockElm(a)
                        }), g = b.endContainer, g = f.isBlockElm(g) ? g : f.findParent(g, function (a) {
                        return f.isBlockElm(a)
                    }), e = f.findParentByTagName(e, "li", !0) || e, g = f.findParentByTagName(g, "li", !0) || g;
                    "LI" == e.tagName || "TD" == e.tagName || e === a || f.isBody(e) ? f.remove(a, !0) : f.breakParent(e, a);
                    e !== g && (a = f.findParentByTagName(g, "blockquote")) && ("LI" == g.tagName || "TD" == g.tagName || f.isBody(g) ? a.parentNode && f.remove(a, !0) : f.breakParent(g, a));
                    for (var l = f.getElementsByTagName(this.document, "blockquote"),
                             a = 0, k; k = l[a++];) k.childNodes.length ? f.getPosition(k, e) & f.POSITION_FOLLOWING && f.getPosition(k, g) & f.POSITION_PRECEDING && f.remove(k, !0) : f.remove(k)
                } else {
                    a = b.cloneRange();
                    l = g = 1 == a.startContainer.nodeType ? a.startContainer : a.startContainer.parentNode;
                    for (k = 1; ;) {
                        if (f.isBody(g)) {
                            l !== g ? b.collapsed ? (a.selectNode(l), k = 0) : a.setStartBefore(l) : a.setStart(g, 0);
                            break
                        }
                        if (!e[g.tagName]) {
                            b.collapsed ? a.selectNode(l) : a.setStartBefore(l);
                            break
                        }
                        l = g;
                        g = g.parentNode
                    }
                    if (k) for (l = g = g = 1 == a.endContainer.nodeType ? a.endContainer :
                        a.endContainer.parentNode; ;) {
                        if (f.isBody(g)) {
                            l !== g ? a.setEndAfter(l) : a.setEnd(g, g.childNodes.length);
                            break
                        }
                        if (!e[g.tagName]) {
                            a.setEndAfter(l);
                            break
                        }
                        l = g;
                        g = g.parentNode
                    }
                    g = b.document.createElement("blockquote");
                    f.setAttributes(g, c);
                    g.appendChild(a.extractContents());
                    a.insertNode(g);
                    e = f.getElementsByTagName(g, "blockquote");
                    for (a = 0; g = e[a++];) g.parentNode && f.remove(g, !0)
                }
                b.moveToBookmark(h).select()
            }, queryCommandState: function () {
                return f.filterNodeList(this.selection.getStartElementPath(), "blockquote") ?
                    1 : 0
            }
        }
    };
    UE.commands.touppercase = UE.commands.tolowercase = {
        execCommand: function (d) {
            var c = this.selection.getRange();
            if (c.collapsed) return c;
            for (var b = c.createBookmark(), a = b.end, e = function (a) {
                return !f.isBr(a) && !f.isWhitespace(a)
            }, h = f.getNextDomNode(b.start, !1, e); h && f.getPosition(h, a) & f.POSITION_PRECEDING && (3 == h.nodeType && (h.nodeValue = h.nodeValue["touppercase" == d ? "toUpperCase" : "toLowerCase"]()), h = f.getNextDomNode(h, !0, e), h !== a);) ;
            c.moveToBookmark(b).select()
        }
    };
    UE.commands.indent = {
        execCommand: function () {
            var d =
                this.queryCommandState("indent") ? "0em" : this.options.indentValue || "2em";
            this.execCommand("Paragraph", "p", {style: "text-indent:" + d})
        }, queryCommandState: function () {
            var d = f.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
            return d && d.style.textIndent && parseInt(d.style.textIndent) ? 1 : 0
        }
    };
    UE.commands.print = {
        execCommand: function () {
            this.window.print()
        }, notNeedUndo: 1
    };
    UE.commands.preview = {
        execCommand: function () {
            var d = window.open("", "_blank", "").document;
            d.open();
            d.write('<!DOCTYPE html><html><head><meta charset="utf-8"/><script src="' +
                this.options.UEDITOR_HOME_URL + "ueditor.parse.js\">\x3c/script><script>setTimeout(function(){uParse('div',{rootPath: '" + this.options.UEDITOR_HOME_URL + "'})},300)\x3c/script></head><body><div>" + this.getContent(null, null, !0) + "</div></body></html>");
            d.close()
        }, notNeedUndo: 1
    };
    UE.plugins.selectall = function () {
        this.commands.selectall = {
            execCommand: function () {
                var d = this.body, c = this.selection.getRange();
                c.selectNodeContents(d);
                f.isEmptyBlock(d) && (r.opera && d.firstChild && 1 == d.firstChild.nodeType && c.setStartAtFirst(d.firstChild),
                    c.collapse(!0));
                c.select(!0)
            }, notNeedUndo: 1
        };
        this.addshortcutkey({selectAll: "ctrl+65"})
    };
    UE.plugins.paragraph = function () {
        var d = f.isBlockElm, c = ["TD", "LI", "PRE"], b = function (a, b, h, g) {
            var l = a.createBookmark(), k = function (a) {
                return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() && !f.isBookmarkNode(a) : !f.isWhitespace(a)
            }, m;
            a.enlarge(!0);
            var n = a.createBookmark();
            m = f.getNextDomNode(n.start, !1, k);
            for (var q = a.cloneRange(), t; m && !(f.getPosition(m, n.end) & f.POSITION_FOLLOWING);) if (3 != m.nodeType && d(m)) m = f.getNextDomNode(m,
                !0, k); else {
                for (q.setStartBefore(m); m && m !== n.end && !d(m);) t = m, m = f.getNextDomNode(m, !1, null, function (a) {
                    return !d(a)
                });
                q.setEndAfter(t);
                m = a.document.createElement(b);
                h && (f.setAttributes(m, h), g && "customstyle" == g && h.style && (m.style.cssText = h.style));
                m.appendChild(q.extractContents());
                f.isEmptyNode(m) && f.fillChar(a.document, m);
                q.insertNode(m);
                var w = m.parentNode;
                d(w) && !f.isBody(m.parentNode) && -1 == p.indexOf(c, w.tagName) && (g && "customstyle" == g || (w.getAttribute("dir") && m.setAttribute("dir", w.getAttribute("dir")),
                w.style.cssText && (m.style.cssText = w.style.cssText + ";" + m.style.cssText), w.style.textAlign && !m.style.textAlign && (m.style.textAlign = w.style.textAlign), w.style.textIndent && !m.style.textIndent && (m.style.textIndent = w.style.textIndent), w.style.padding && !m.style.padding && (m.style.padding = w.style.padding)), h && /h\d/i.test(w.tagName) && !/h\d/i.test(m.tagName) ? (f.setAttributes(w, h), g && "customstyle" == g && h.style && (w.style.cssText = h.style), f.remove(m, !0), m = w) : f.remove(m.parentNode, !0));
                m = -1 != p.indexOf(c, w.tagName) ?
                    w : m;
                m = f.getNextDomNode(m, !1, k)
            }
            return a.moveToBookmark(n).moveToBookmark(l)
        };
        this.setOpt("paragraph", {p: "", h1: "", h2: "", h3: "", h4: "", h5: "", h6: ""});
        this.commands.paragraph = {
            execCommand: function (a, c, h, g) {
                a = this.selection.getRange();
                if (a.collapsed) {
                    var d = this.document.createTextNode("p");
                    a.insertNode(d);
                    if (r.ie) {
                        var k = d.previousSibling;
                        k && f.isWhitespace(k) && f.remove(k);
                        (k = d.nextSibling) && f.isWhitespace(k) && f.remove(k)
                    }
                }
                a = b(a, c, h, g);
                d && (a.setStartBefore(d).collapse(!0), pN = d.parentNode, f.remove(d), f.isBlockElm(pN) &&
                f.isEmptyNode(pN) && f.fillNode(this.document, pN));
                r.gecko && a.collapsed && 1 == a.startContainer.nodeType && (h = a.startContainer.childNodes[a.startOffset]) && 1 == h.nodeType && h.tagName.toLowerCase() == c && a.setStart(h, 0).collapse(!0);
                a.select();
                return !0
            }, queryCommandValue: function () {
                var a = f.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
                return a ? a.tagName.toLowerCase() : ""
            }
        }
    };
    (function () {
        var d = f.isBlockElm, c = function (a) {
            return f.filterNodeList(a.selection.getStartElementPath(), function (a) {
                return a &&
                    1 == a.nodeType && a.getAttribute("dir")
            })
        }, b = function (a, b, h) {
            var g = function (a) {
                return 1 == a.nodeType ? !f.isBookmarkNode(a) : !f.isWhitespace(a)
            };
            if ((b = c(b)) && a.collapsed) return b.setAttribute("dir", h), a;
            b = a.createBookmark();
            a.enlarge(!0);
            for (var l = a.createBookmark(), k = f.getNextDomNode(l.start, !1, g), m = a.cloneRange(), n; k && !(f.getPosition(k, l.end) & f.POSITION_FOLLOWING);) if (3 != k.nodeType && d(k)) k = f.getNextDomNode(k, !0, g); else {
                for (m.setStartBefore(k); k && k !== l.end && !d(k);) n = k, k = f.getNextDomNode(k, !1, null, function (a) {
                    return !d(a)
                });
                m.setEndAfter(n);
                k = m.getCommonAncestor();
                if (!f.isBody(k) && d(k)) k.setAttribute("dir", h); else {
                    k = a.document.createElement("p");
                    k.setAttribute("dir", h);
                    var q = m.extractContents();
                    k.appendChild(q);
                    m.insertNode(k)
                }
                k = f.getNextDomNode(k, !1, g)
            }
            return a.moveToBookmark(l).moveToBookmark(b)
        };
        UE.commands.directionality = {
            execCommand: function (a, c) {
                var h = this.selection.getRange();
                if (h.collapsed) {
                    var g = this.document.createTextNode("d");
                    h.insertNode(g)
                }
                b(h, this, c);
                g && (h.setStartBefore(g).collapse(!0), f.remove(g));
                h.select();
                return !0
            }, queryCommandValue: function () {
                var a = c(this);
                return a ? a.getAttribute("dir") : "ltr"
            }
        }
    })();
    UE.plugins.horizontal = function () {
        this.commands.horizontal = {
            execCommand: function (d) {
                if (-1 !== this.queryCommandState(d)) {
                    this.execCommand("insertHtml", "<hr>");
                    d = this.selection.getRange();
                    var c = d.startContainer;
                    if (1 == c.nodeType && !c.childNodes[d.startOffset]) {
                        var b;
                        (b = c.childNodes[d.startOffset - 1]) && 1 == b.nodeType && "HR" == b.tagName && ("p" == this.options.enterTag ? (b = this.document.createElement("p"), d.insertNode(b),
                            d.setStart(b, 0).setCursor()) : (b = this.document.createElement("br"), d.insertNode(b), d.setStartBefore(b).setCursor()))
                    }
                    return !0
                }
            }, queryCommandState: function () {
                return f.filterNodeList(this.selection.getStartElementPath(), "table") ? -1 : 0
            }
        };
        this.addListener("delkeydown", function (d, c) {
            var b = this.selection.getRange();
            b.txtToElmBoundary(!0);
            if (f.isStartInblock(b)) {
                var a = b.startContainer.previousSibling;
                if (a && f.isTagNode(a, "hr")) return f.remove(a), b.select(), f.preventDefault(c), !0
            }
        })
    };
    UE.commands.time = UE.commands.date =
        {
            execCommand: function (d, c) {
                function b(a, b) {
                    var c = ("0" + a.getHours()).slice(-2), e = ("0" + a.getMinutes()).slice(-2),
                        d = ("0" + a.getSeconds()).slice(-2);
                    return (b || "hh:ii:ss").replace(/hh/ig, c).replace(/ii/ig, e).replace(/ss/ig, d)
                }

                function a(a, b) {
                    var c = ("000" + a.getFullYear()).slice(-4), e = c.slice(-2),
                        d = ("0" + (a.getMonth() + 1)).slice(-2), f = ("0" + a.getDate()).slice(-2);
                    return (b || "yyyy-mm-dd").replace(/yyyy/ig, c).replace(/yy/ig, e).replace(/mm/ig, d).replace(/dd/ig, f)
                }

                var e = new Date;
                this.execCommand("insertHtml", "time" ==
                d ? b(e, c) : a(e, c))
            }
        };
    UE.plugins.rowspacing = function () {
        this.setOpt({rowspacingtop: ["5", "10", "15", "20", "25"], rowspacingbottom: ["5", "10", "15", "20", "25"]});
        this.commands.rowspacing = {
            execCommand: function (d, c, b) {
                this.execCommand("paragraph", "p", {style: "margin-" + b + ":" + c + "px"});
                return !0
            }, queryCommandValue: function (d, c) {
                var b = f.filterNodeList(this.selection.getStartElementPath(), function (a) {
                    return f.isBlockElm(a)
                });
                return b ? (b = f.getComputedStyle(b, "margin-" + c).replace(/[^\d]/g, "")) ? b : 0 : 0
            }
        }
    };
    UE.plugins.lineheight =
        function () {
            this.setOpt({lineheight: "1 1.5 1.75 2 3 4 5".split(" ")});
            this.commands.lineheight = {
                execCommand: function (d, c) {
                    this.execCommand("paragraph", "p", {style: "line-height:" + ("1" == c ? "normal" : c + "em")});
                    return !0
                }, queryCommandValue: function () {
                    var d = f.filterNodeList(this.selection.getStartElementPath(), function (c) {
                        return f.isBlockElm(c)
                    });
                    if (d) return d = f.getComputedStyle(d, "line-height"), "normal" == d ? 1 : d.replace(/[^\d.]*/ig, "")
                }
            }
        };
    UE.plugins.insertcode = function () {
        var d = this;
        d.ready(function () {
            p.cssRule("pre",
                "pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;}", d.document)
        });
        d.setOpt("insertcode", {
            as3: "ActionScript3",
            bash: "Bash/Shell",
            cpp: "C/C++",
            css: "Css",
            cf: "CodeFunction",
            "c#": "C#",
            delphi: "Delphi",
            diff: "Diff",
            erlang: "Erlang",
            groovy: "Groovy",
            html: "Html",
            java: "Java",
            jfx: "JavaFx",
            js: "Javascript",
            pl: "Perl",
            php: "Php",
            plain: "Plain Text",
            ps: "PowerShell",
            python: "Python",
            ruby: "Ruby",
            scala: "Scala",
            sql: "Sql",
            vb: "Vb",
            xml: "Xml"
        });
        d.commands.insertcode = {
            execCommand: function (c, b) {
                var a = this.selection.getRange(),
                    e = f.findParentByTagName(a.startContainer, "pre", !0);
                if (e) e.className = "brush:" + b + ";toolbar:false;"; else {
                    var h = "";
                    a.collapsed ? h = r.ie && r.ie11below ? 8 >= r.version ? "&nbsp;" : "" : "<br/>" : (e = a.extractContents(), a = this.document.createElement("div"), a.appendChild(e), p.each(UE.filterNode(UE.htmlparser(a.innerHTML.replace(/[\r\t]/g, "")), this.options.filterTxtRules).children, function (a) {
                        r.ie && r.ie11below && 8 < r.version ? ("element" == a.type ? "br" == a.tagName ? h += "\n" : v.$empty[a.tagName] || (p.each(a.children, function (b) {
                            "element" ==
                            b.type ? "br" == b.tagName ? h += "\n" : v.$empty[a.tagName] || (h += b.innerText()) : h += b.data
                        }), /\n$/.test(h) || (h += "\n")) : h += a.data + "\n", !a.nextSibling() && /\n$/.test(h) && (h = h.replace(/\n$/, ""))) : r.ie && r.ie11below ? ("element" == a.type ? "br" == a.tagName ? h += "<br>" : v.$empty[a.tagName] || (p.each(a.children, function (b) {
                                "element" == b.type ? "br" == b.tagName ? h += "<br>" : v.$empty[a.tagName] || (h += b.innerText()) : h += b.data
                            }), /br>$/.test(h) || (h += "<br>")) : h += a.data + "<br>", !a.nextSibling() && /<br>$/.test(h) && (h = h.replace(/<br>$/, ""))) :
                            (h += "element" == a.type ? v.$empty[a.tagName] ? "" : a.innerText() : a.data, !/br\/?\s*>$/.test(h) && a.nextSibling() && (h += "<br>"))
                    }));
                    this.execCommand("inserthtml", '<pre id="coder"class="brush:' + b + ';toolbar:false">' + h + "</pre>", !0);
                    e = this.document.getElementById("coder");
                    f.removeAttributes(e, "id");
                    (a = e.previousSibling) && (3 == a.nodeType && 1 == a.nodeValue.length && r.ie && 6 == r.version || f.isEmptyBlock(a)) && f.remove(a);
                    a = this.selection.getRange();
                    f.isEmptyBlock(e) ? a.setStart(e, 0).setCursor(!1, !0) : a.selectNodeContents(e).select()
                }
            },
            queryCommandValue: function () {
                var c = this.selection.getStartElementPath(), b = "";
                p.each(c, function (a) {
                    if ("PRE" == a.nodeName) return b = (a = a.className.match(/brush:([^;]+)/)) && a[1] ? a[1] : "", !1
                });
                return b
            }
        };
        d.addInputRule(function (c) {
            p.each(c.getNodesByTagName("pre"), function (b) {
                var a = b.getNodesByTagName("br");
                a.length ? r.ie && r.ie11below && 8 < r.version && p.each(a, function (a) {
                    var b = UE.uNode.createText("\n");
                    a.parentNode.insertBefore(b, a);
                    a.parentNode.removeChild(a)
                }) : r.ie && r.ie11below && 8 < r.version || (a = b.innerText().split(/\n/),
                    b.innerHTML(""), p.each(a, function (a) {
                    a.length && b.appendChild(UE.uNode.createText(a));
                    b.appendChild(UE.uNode.createElement("br"))
                }))
            })
        });
        d.addOutputRule(function (c) {
            p.each(c.getNodesByTagName("pre"), function (b) {
                var a = "";
                p.each(b.children, function (b) {
                    a = "text" == b.type ? a + b.data.replace(/[ ]/g, "&nbsp;").replace(/\n$/, "") : "br" == b.tagName ? a + "\n" : a + (v.$empty[b.tagName] ? b.innerText() : "")
                });
                b.innerText(a.replace(/(&nbsp;|\n)+$/, ""))
            })
        });
        d.notNeedCodeQuery = {
            help: 1, undo: 1, redo: 1, source: 1, print: 1, searchreplace: 1,
            fullscreen: 1, preview: 1, insertparagraph: 1, elementpath: 1, insertcode: 1, inserthtml: 1, selectall: 1
        };
        d.queryCommandState = function (c) {
            return !this.notNeedCodeQuery[c.toLowerCase()] && this.selection && this.queryCommandValue("insertcode") ? -1 : UE.Editor.prototype.queryCommandState.apply(this, arguments)
        };
        d.addListener("beforeenterkeydown", function () {
            var c = d.selection.getRange(), b = f.findParentByTagName(c.startContainer, "pre", !0);
            if (b) {
                d.fireEvent("saveScene");
                c.collapsed || c.deleteContents();
                if (!r.ie || r.ie9above) {
                    b =
                        d.document.createElement("br");
                    c.insertNode(b).setStartAfter(b).collapse(!0);
                    b.nextSibling || r.ie && !(10 < r.version) ? c.setStartAfter(b) : c.insertNode(b.cloneNode(!1));
                    for (var b = b.previousSibling, a; b;) if (a = b, b = b.previousSibling, !b || "BR" == b.nodeName) {
                        b = a;
                        break
                    }
                    if (b) {
                        for (a = ""; b && "BR" != b.nodeName && RegExp("^[\\s" + f.fillChar + "]*$").test(b.nodeValue);) a += b.nodeValue, b = b.nextSibling;
                        "BR" != b.nodeName && (b = b.nodeValue.match(RegExp("^([\\s" + f.fillChar + "]+)"))) && b[1] && (a += b[1]);
                        a && (a = d.document.createTextNode(a),
                            c.insertNode(a).setStartAfter(a))
                    }
                    c.collapse(!0).select(!0)
                } else if (8 < r.version) if (b = d.document.createTextNode("\n"), a = c.startContainer, 0 == c.startOffset) {
                    if (a.previousSibling) {
                        c.insertNode(b);
                        var e = d.document.createTextNode(" ");
                        c.setStartAfter(b).insertNode(e).setStart(e, 0).collapse(!0).select(!0)
                    }
                } else c.insertNode(b).setStartAfter(b), e = d.document.createTextNode(" "), (a = c.startContainer.childNodes[c.startOffset]) && !/^\n/.test(a.nodeValue) && c.setStartBefore(b), c.insertNode(e).setStart(e, 0).collapse(!0).select(!0);
                else {
                    b = d.document.createElement("br");
                    c.insertNode(b);
                    c.insertNode(d.document.createTextNode(f.fillChar));
                    c.setStartAfter(b);
                    for (b = b.previousSibling; b;) if (a = b, b = b.previousSibling, !b || "BR" == b.nodeName) {
                        b = a;
                        break
                    }
                    if (b) {
                        for (a = ""; b && "BR" != b.nodeName && RegExp("^[ " + f.fillChar + "]*$").test(b.nodeValue);) a += b.nodeValue, b = b.nextSibling;
                        "BR" != b.nodeName && (b = b.nodeValue.match(RegExp("^([ " + f.fillChar + "]+)"))) && b[1] && (a += b[1]);
                        a = d.document.createTextNode(a);
                        c.insertNode(a).setStartAfter(a)
                    }
                    c.collapse(!0).select()
                }
                d.fireEvent("saveScene");
                return !0
            }
        });
        d.addListener("tabkeydown", function (c, b) {
            var a = d.selection.getRange(), e = f.findParentByTagName(a.startContainer, "pre", !0);
            if (e) {
                d.fireEvent("saveScene");
                if (!b.shiftKey) if (a.collapsed) e = d.document.createTextNode("    "), a.insertNode(e).setStartAfter(e).collapse(!0).select(!0); else {
                    for (var h = a.createBookmark(), g = h.start.previousSibling; g;) {
                        if (e.firstChild === g && !f.isBr(g)) {
                            e.insertBefore(d.document.createTextNode("    "), g);
                            break
                        }
                        if (f.isBr(g)) {
                            e.insertBefore(d.document.createTextNode("    "),
                                g.nextSibling);
                            break
                        }
                        g = g.previousSibling
                    }
                    var l = h.end, g = h.start.nextSibling;
                    for (e.firstChild === h.start && e.insertBefore(d.document.createTextNode("    "), g.nextSibling); g && g !== l;) {
                        if (f.isBr(g) && g.nextSibling) {
                            if (g.nextSibling === l) break;
                            e.insertBefore(d.document.createTextNode("    "), g.nextSibling)
                        }
                        g = g.nextSibling
                    }
                    a.moveToBookmark(h).select()
                }
                d.fireEvent("saveScene");
                return !0
            }
        });
        d.addListener("beforeinserthtml", function (c, b) {
            var a = this, e = a.selection.getRange();
            if (f.findParentByTagName(e.startContainer,
                "pre", !0)) {
                e.collapsed || e.deleteContents();
                var h = "";
                if (r.ie && 8 < r.version) {
                    p.each(UE.filterNode(UE.htmlparser(b), a.options.filterTxtRules).children, function (a) {
                        "element" == a.type ? "br" == a.tagName ? h += "\n" : v.$empty[a.tagName] || (p.each(a.children, function (b) {
                            "element" == b.type ? "br" == b.tagName ? h += "\n" : v.$empty[a.tagName] || (h += b.innerText()) : h += b.data
                        }), /\n$/.test(h) || (h += "\n")) : h += a.data + "\n";
                        !a.nextSibling() && /\n$/.test(h) && (h = h.replace(/\n$/, ""))
                    });
                    var g = a.document.createTextNode(p.html(h.replace(/&nbsp;/g,
                        " ")));
                    e.insertNode(g).selectNode(g).select()
                } else {
                    var d = a.document.createDocumentFragment();
                    p.each(UE.filterNode(UE.htmlparser(b), a.options.filterTxtRules).children, function (b) {
                        "element" == b.type ? "br" == b.tagName ? d.appendChild(a.document.createElement("br")) : v.$empty[b.tagName] || (p.each(b.children, function (c) {
                            "element" == c.type ? "br" == c.tagName ? d.appendChild(a.document.createElement("br")) : v.$empty[b.tagName] || d.appendChild(a.document.createTextNode(p.html(c.innerText().replace(/&nbsp;/g, " ")))) : d.appendChild(a.document.createTextNode(p.html(c.data.replace(/&nbsp;/g,
                                " "))))
                        }), "BR" != d.lastChild.nodeName && d.appendChild(a.document.createElement("br"))) : d.appendChild(a.document.createTextNode(p.html(b.data.replace(/&nbsp;/g, " "))));
                        b.nextSibling() || "BR" != d.lastChild.nodeName || d.removeChild(d.lastChild)
                    });
                    e.insertNode(d).select()
                }
                return !0
            }
        });
        d.addListener("keydown", function (c, b) {
            if (40 == (b.keyCode || b.which)) {
                var a = this.selection.getRange(), e, h = a.startContainer;
                if (a.collapsed && (e = f.findParentByTagName(a.startContainer, "pre", !0)) && !e.nextSibling) {
                    for (var g = e.lastChild; g &&
                    "BR" == g.nodeName;) g = g.previousSibling;
                    if (g === h || a.startContainer === e && a.startOffset == e.childNodes.length) this.execCommand("insertparagraph"), f.preventDefault(b)
                }
            }
        });
        d.addListener("delkeydown", function (c, b) {
            var a = this.selection.getRange();
            a.txtToElmBoundary(!0);
            var e = a.startContainer;
            if (f.isTagNode(e, "pre") && a.collapsed && f.isStartInblock(a)) {
                var h = d.document.createElement("p");
                f.fillNode(d.document, h);
                e.parentNode.insertBefore(h, e);
                f.remove(e);
                a.setStart(h, 0).setCursor(!1, !0);
                f.preventDefault(b);
                return !0
            }
        })
    };
    UE.commands.cleardoc = {
        execCommand: function (d) {
            var c = this;
            d = c.options.enterTag;
            var b = c.selection.getRange();
            "br" == d ? (c.body.innerHTML = "<br/>", b.setStart(c.body, 0).setCursor()) : (c.body.innerHTML = "<p>" + (I ? "" : "<br/>") + "</p>", b.setStart(c.body.firstChild, 0).setCursor(!1, !0));
            setTimeout(function () {
                c.fireEvent("clearDoc")
            }, 0)
        }
    };
    UE.plugin.register("anchor", function () {
        return {
            bindEvents: {
                ready: function () {
                    p.cssRule("anchor", ".anchorclass{background: url('" + this.options.themePath + this.options.theme + "/images/anchor.gif') no-repeat scroll left center transparent;cursor: auto;display: inline-block;height: 16px;width: 15px;}",
                        this.document)
                }
            }, outputRule: function (d) {
                p.each(d.getNodesByTagName("img"), function (c) {
                    var b;
                    if (b = c.getAttr("anchorname")) c.tagName = "a", c.setAttr({anchorname: "", name: b, "class": ""})
                })
            }, inputRule: function (d) {
                p.each(d.getNodesByTagName("a"), function (c) {
                    c.getAttr("name") && !c.getAttr("href") && (c.tagName = "img", c.setAttr({
                        anchorname: c.getAttr("name"),
                        "class": "anchorclass"
                    }), c.setAttr("name"))
                })
            }, commands: {
                anchor: {
                    execCommand: function (d, c) {
                        var b = this.selection.getRange(), a = b.getClosedNode();
                        a && a.getAttribute("anchorname") ?
                            c ? a.setAttribute("anchorname", c) : (b.setStartBefore(a).setCursor(), f.remove(a)) : c && (a = this.document.createElement("img"), b.collapse(!0), f.setAttributes(a, {
                            anchorname: c,
                            "class": "anchorclass"
                        }), b.insertNode(a).setStartAfter(a).setCursor(!1, !0))
                    }
                }
            }
        }
    });
    UE.plugins.wordcount = function () {
        var d = this;
        d.setOpt("wordCount", !0);
        d.addListener("contentchange", function () {
            d.fireEvent("wordcount")
        });
        var c;
        d.addListener("ready", function () {
            var b = this;
            f.on(b.body, "keyup", function (a) {
                (a.keyCode || a.which) in {
                    16: 1, 18: 1, 20: 1,
                    37: 1, 38: 1, 39: 1, 40: 1
                } || (clearTimeout(c), c = setTimeout(function () {
                    b.fireEvent("wordcount")
                }, 200))
            })
        })
    };
    UE.plugins.pagebreak = function () {
        function d(a) {
            if (f.isEmptyBlock(a)) {
                for (var c = a.firstChild, g; c && 1 == c.nodeType && f.isEmptyBlock(c);) g = c, c = c.firstChild;
                !g && (g = a);
                f.fillNode(b.document, g)
            }
        }

        function c(a) {
            return a && 1 == a.nodeType && "HR" == a.tagName && "pagebreak" == a.className
        }

        var b = this, a = ["td"];
        b.setOpt("pageBreakTag", "_ueditor_page_break_tag_");
        b.ready(function () {
            p.cssRule("pagebreak", ".pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}",
                b.document)
        });
        b.addInputRule(function (a) {
            a.traversal(function (a) {
                if ("text" == a.type && a.data == b.options.pageBreakTag) {
                    var c = UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">');
                    a.parentNode.insertBefore(c, a);
                    a.parentNode.removeChild(a)
                }
            })
        });
        b.addOutputRule(function (a) {
            p.each(a.getNodesByTagName("hr"), function (a) {
                if ("pagebreak" == a.getAttr("class")) {
                    var c = UE.uNode.createText(b.options.pageBreakTag);
                    a.parentNode.insertBefore(c, a);
                    a.parentNode.removeChild(a)
                }
            })
        });
        b.commands.pagebreak = {
            execCommand: function () {
                var e = b.selection.getRange(), h = b.document.createElement("hr");
                f.setAttributes(h, {"class": "pagebreak", noshade: "noshade", size: "5"});
                f.unSelectable(h);
                var g = f.findParentByTagName(e.startContainer, a, !0), l = [];
                if (g) switch (g.tagName) {
                    case "TD":
                        g = g.parentNode, g.previousSibling ? (g.parentNode.insertBefore(h, g), l = f.findParents(h)) : (e = f.findParentByTagName(g, "table"), e.parentNode.insertBefore(h, e), l = f.findParents(h, !0)), g = l[1], h !== g && f.breakParent(h, g), b.fireEvent("afteradjusttable",
                            b.document)
                } else {
                    if (!e.collapsed) for (e.deleteContents(), g = e.startContainer; !f.isBody(g) && f.isBlockElm(g) && f.isEmptyNode(g);) e.setStartBefore(g).collapse(!0), f.remove(g), g = e.startContainer;
                    e.insertNode(h);
                    for (g = h.parentNode; !f.isBody(g);) f.breakParent(h, g), (g = h.nextSibling) && f.isEmptyBlock(g) && f.remove(g), g = h.parentNode;
                    g = h.nextSibling;
                    l = h.previousSibling;
                    c(l) ? f.remove(l) : l && d(l);
                    g ? (c(g) ? f.remove(g) : d(g), e.setEndAfter(h).collapse(!1)) : (g = b.document.createElement("p"), h.parentNode.appendChild(g), f.fillNode(b.document,
                        g), e.setStart(g, 0).collapse(!0));
                    e.select(!0)
                }
            }
        }
    };
    UE.plugin.register("wordimage", function () {
        var d = this, c = [];
        return {
            commands: {
                wordimage: {
                    execCommand: function () {
                        for (var b = f.getElementsByTagName(d.body, "img"), a = [], c = 0, h; h = b[c++];) (h = h.getAttribute("word_img")) && a.push(h);
                        return a
                    }, queryCommandState: function () {
                        c = f.getElementsByTagName(d.body, "img");
                        for (var b = 0, a; a = c[b++];) if (a.getAttribute("word_img")) return 1;
                        return -1
                    }, notNeedUndo: !0
                }
            }, inputRule: function (b) {
                p.each(b.getNodesByTagName("img"), function (a) {
                    var b =
                            a.attrs, c = 128 > parseInt(b.width) || 43 > parseInt(b.height), g = d.options,
                        f = g.UEDITOR_HOME_URL + "themes/default/images/spacer.gif";
                    b.src && /^(?:(file:\/+))/.test(b.src) && a.setAttr({
                        width: b.width,
                        height: b.height,
                        alt: b.alt,
                        word_img: b.src,
                        src: f,
                        style: "background:url(" + (c ? g.themePath + g.theme + "/images/word.gif" : g.langPath + g.lang + "/images/localimage.png") + ") no-repeat center center;border:1px solid #ddd"
                    })
                })
            }
        }
    });
    UE.plugins.dragdrop = function () {
        var d = this;
        d.ready(function () {
            f.on(this.body, "dragend", function () {
                var c =
                    d.selection.getRange(), b = c.getClosedNode() || d.selection.getStart();
                if (b && "IMG" == b.tagName) {
                    for (var a = b.previousSibling, e; (e = b.nextSibling) && 1 == e.nodeType && "SPAN" == e.tagName && !e.firstChild;) f.remove(e);
                    (!a || 1 != a.nodeType || f.isEmptyBlock(a)) && a || e && (!e || f.isEmptyBlock(e)) || (a && "P" == a.tagName && !f.isEmptyBlock(a) ? (a.appendChild(b), f.moveChild(e, a), f.remove(e)) : e && "P" == e.tagName && !f.isEmptyBlock(e) && e.insertBefore(b, e.firstChild), a && "P" == a.tagName && f.isEmptyBlock(a) && f.remove(a), e && "P" == e.tagName && f.isEmptyBlock(e) &&
                    f.remove(e), c.selectNode(b).select(), d.fireEvent("saveScene"))
                }
            })
        });
        d.addListener("keyup", function (c, b) {
            if (13 == (b.keyCode || b.which)) {
                var a = d.selection.getRange(), e;
                (e = f.findParentByTagName(a.startContainer, "p", !0)) && "center" == f.getComputedStyle(e, "text-align") && f.removeStyle(e, "text-align")
            }
        })
    };
    UE.plugins.undo = function () {
        function d(a, b) {
            if (a.length != b.length) return 0;
            for (var c = 0, e = a.length; c < e; c++) if (a[c] != b[c]) return 0;
            return 1
        }

        var c, b = this, a = b.options.maxUndoCount || 20, e = b.options.maxInputCount ||
            20, h = RegExp(f.fillChar + "|</hr>", "gi"), g = {ol: 1, ul: 1, table: 1, tbody: 1, tr: 1, body: 1},
            l = b.options.autoClearEmptyNode;
        b.undoManger = new function () {
            this.list = [];
            this.index = 0;
            this.hasRedo = this.hasUndo = !1;
            this.undo = function () {
                if (this.hasUndo) if (this.list[this.index - 1] || 1 != this.list.length) {
                    for (; this.list[this.index].content == this.list[this.index - 1].content;) if (this.index--, 0 == this.index) return this.restore(0);
                    this.restore(--this.index)
                } else this.reset()
            };
            this.redo = function () {
                if (this.hasRedo) {
                    for (; this.list[this.index].content ==
                           this.list[this.index + 1].content;) if (this.index++, this.index == this.list.length - 1) return this.restore(this.index);
                    this.restore(++this.index)
                }
            };
            this.restore = function () {
                var a = this.editor, b = this.list[this.index], c = UE.htmlparser(b.content.replace(h, ""));
                a.options.autoClearEmptyNode = !1;
                a.filterInputRule(c);
                a.options.autoClearEmptyNode = l;
                a.document.body.innerHTML = c.toHtml();
                a.fireEvent("afterscencerestore");
                r.ie && p.each(f.getElementsByTagName(a.document, "td th caption p"), function (b) {
                    f.isEmptyNode(b) && f.fillNode(a.document,
                        b)
                });
                try {
                    var e = (new L.Range(a.document)).moveToAddress(b.address);
                    e.select(g[e.startContainer.nodeName.toLowerCase()])
                } catch (d) {
                }
                this.update();
                this.clearKey();
                a.fireEvent("reset", !0)
            };
            this.getScene = function () {
                var a = this.editor, b = a.selection.getRange().createAddress(!1, !0);
                a.fireEvent("beforegetscene");
                var c = UE.htmlparser(a.body.innerHTML);
                a.options.autoClearEmptyNode = !1;
                a.filterOutputRule(c);
                a.options.autoClearEmptyNode = l;
                c = c.toHtml();
                a.fireEvent("aftergetscene");
                return {address: b, content: c}
            };
            this.save =
                function (e, g) {
                    clearTimeout(c);
                    var h = this.getScene(g), k = this.list[this.index];
                    k && k.content != h.content && b.trigger("contentchange");
                    var f;
                    if (f = k) if (f = k.content == h.content) e ? k = 1 : (k = k.address, f = h.address, k = k.collapsed != f.collapsed ? 0 : d(k.startAddress, f.startAddress) && d(k.endAddress, f.endAddress) ? 1 : 0), f = k;
                    f || (this.list = this.list.slice(0, this.index + 1), this.list.push(h), this.list.length > a && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update())
                };
            this.update = function () {
                this.hasRedo = !!this.list[this.index +
                1];
                this.hasUndo = !!this.list[this.index - 1]
            };
            this.reset = function () {
                this.list = [];
                this.index = 0;
                this.hasRedo = this.hasUndo = !1;
                this.clearKey()
            };
            this.clearKey = function () {
                m = 0
            }
        };
        b.undoManger.editor = b;
        b.addListener("saveScene", function () {
            var a = Array.prototype.splice.call(arguments, 1);
            this.undoManger.save.apply(this.undoManger, a)
        });
        b.addListener("reset", function (a, b) {
            b || this.undoManger.reset()
        });
        b.commands.redo = b.commands.undo = {
            execCommand: function (a) {
                this.undoManger[a]()
            }, queryCommandState: function (a) {
                return this.undoManger["has" +
                ("undo" == a.toLowerCase() ? "Undo" : "Redo")] ? 0 : -1
            }, notNeedUndo: 1
        };
        var k = {16: 1, 17: 1, 18: 1, 37: 1, 38: 1, 39: 1, 40: 1}, m = 0, n = !1;
        b.addListener("ready", function () {
            f.on(this.body, "compositionstart", function () {
                n = !0
            });
            f.on(this.body, "compositionend", function () {
                n = !1
            })
        });
        b.addshortcutkey({Undo: "ctrl+90", Redo: "ctrl+89"});
        var q = !0;
        b.addListener("keydown", function (a, b) {
            var g = this;
            if (!(k[b.keyCode || b.which] || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey || n)) if (g.selection.getRange().collapsed) {
                0 == g.undoManger.list.length && g.undoManger.save(!0);
                clearTimeout(c);
                var d = function (a) {
                    a.undoManger.save(!1, !0);
                    a.fireEvent("selectionchange")
                };
                c = setTimeout(function () {
                    if (n) var a = setInterval(function () {
                        n || (d(g), clearInterval(a))
                    }, 300); else d(g)
                }, 200);
                m++;
                m >= e && d(g)
            } else g.undoManger.save(!1, !0), q = !1
        });
        b.addListener("keyup", function (a, b) {
            k[b.keyCode || b.which] || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey || n || q || (this.undoManger.save(!1, !0), q = !0)
        });
        b.stopCmdUndo = function () {
            b.__hasEnterExecCommand = !0
        };
        b.startCmdUndo = function () {
            b.__hasEnterExecCommand = !1
        }
    };
    UE.plugin.register("copy", function () {
        function d() {
            ZeroClipboard.config({
                debug: !1,
                swfPath: c.options.UEDITOR_HOME_URL + "third-party/zeroclipboard/ZeroClipboard.swf"
            });
            var b = c.zeroclipboard = new ZeroClipboard;
            b.on("copy", function (a) {
                a = a.client;
                var b = c.selection.getRange(), d = document.createElement("div");
                d.appendChild(b.cloneContents());
                a.setText(d.innerText || d.textContent);
                a.setHtml(d.innerHTML);
                b.select()
            });
            b.on("mouseover mouseout", function (a) {
                var b = a.target;
                "mouseover" == a.type ? f.addClass(b, "edui-state-hover") :
                    "mouseout" == a.type && f.removeClasses(b, "edui-state-hover")
            });
            b.on("wrongflash noflash", function () {
                ZeroClipboard.destroy()
            })
        }

        var c = this;
        return {
            bindEvents: {
                ready: function () {
                    r.ie || (window.ZeroClipboard ? d() : p.loadFile(document, {
                        src: c.options.UEDITOR_HOME_URL + "third-party/zeroclipboard/ZeroClipboard.js",
                        tag: "script",
                        type: "text/javascript",
                        defer: "defer"
                    }, function () {
                        d()
                    }))
                }
            }, commands: {
                copy: {
                    execCommand: function (b) {
                        c.document.execCommand("copy") || alert(c.getLang("copymsg"))
                    }
                }
            }
        }
    });
    UE.plugins.paste = function () {
        function d(a) {
            var b =
                this.document;
            if (!b.getElementById("baidu_pastebin")) {
                var c = this.selection.getRange(), e = c.createBookmark(), g = b.createElement("div");
                g.id = "baidu_pastebin";
                r.webkit && g.appendChild(b.createTextNode(f.fillChar + f.fillChar));
                b.body.appendChild(g);
                e.start.style.display = "";
                g.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + f.getXY(e.start).y + "px";
                c.selectNodeContents(g).select(!0);
                setTimeout(function () {
                    if (r.webkit) for (var d = 0, h = b.querySelectorAll("#baidu_pastebin"),
                                           y; y = h[d++];) if (f.isEmptyNode(y)) f.remove(y); else {
                        g = y;
                        break
                    }
                    try {
                        g.parentNode.removeChild(g)
                    } catch (u) {
                    }
                    c.moveToBookmark(e).select(!0);
                    a(g)
                }, 0)
            }
        }

        function c(a) {
            return a.replace(/<(\/?)([\w\-]+)([^>]*)>/gi, function (a, b, c, e) {
                c = c.toLowerCase();
                if ({img: 1}[c]) return a;
                e = e.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi, function (a, b, c) {
                    return {src: 1, href: 1, name: 1}[b.toLowerCase()] ? b + "=" + c + " " : ""
                });
                return {span: 1, div: 1}[c] ? "" : "<" + b + c + " " + p.trim(e) + ">"
            })
        }

        function b(b) {
            var d;
            if (b.firstChild) {
                var m =
                    f.getElementsByTagName(b, "span");
                d = 0;
                for (var n; n = m[d++];) "_baidu_cut_start" != n.id && "_baidu_cut_end" != n.id || f.remove(n);
                if (r.webkit) {
                    n = b.querySelectorAll("div br");
                    for (d = 0; m = n[d++];) m = m.parentNode, "DIV" == m.tagName && 1 == m.childNodes.length && (m.innerHTML = "<p><br/></p>", f.remove(m));
                    m = b.querySelectorAll("#baidu_pastebin");
                    for (d = 0; n = m[d++];) {
                        var q = a.document.createElement("p");
                        for (n.parentNode.insertBefore(q, n); n.firstChild;) q.appendChild(n.firstChild);
                        f.remove(n)
                    }
                    n = b.querySelectorAll("meta");
                    for (d = 0; m =
                        n[d++];) f.remove(m);
                    n = b.querySelectorAll("br");
                    for (d = 0; m = n[d++];) /^apple-/i.test(m.className) && f.remove(m)
                }
                if (r.gecko) for (n = b.querySelectorAll("[_moz_dirty]"), d = 0; m = n[d++];) m.removeAttribute("_moz_dirty");
                if (!r.ie) for (n = b.querySelectorAll("span.Apple-style-span"), d = 0; m = n[d++];) f.remove(m, !0);
                d = b.innerHTML;
                d = UE.filterWord(d);
                b = UE.htmlparser(d);
                a.options.filterRules && UE.filterNode(b, a.options.filterRules);
                a.filterInputRule(b);
                r.webkit && ((d = b.lastChild()) && "element" == d.type && "br" == d.tagName && b.removeChild(d),
                    p.each(a.body.querySelectorAll("div"), function (a) {
                        f.isEmptyBlock(a) && f.remove(a, !0)
                    }));
                d = {html: b.toHtml()};
                a.fireEvent("beforepaste", d, b);
                d.html && (b = UE.htmlparser(d.html, !0), 1 === a.queryCommandState("pasteplain") ? a.execCommand("insertHtml", UE.filterNode(b, a.options.filterTxtRules).toHtml(), !0) : (UE.filterNode(b, a.options.filterTxtRules), e = b.toHtml(), h = d.html, g = a.selection.getRange().createAddress(!0), a.execCommand("insertHtml", !0 === a.getOpt("retainOnlyLabelPasted") ? c(h) : h, !0)), a.fireEvent("afterpaste",
                    d))
            }
        }

        var a = this;
        a.setOpt({retainOnlyLabelPasted: !1});
        var e, h, g;
        a.addListener("pasteTransfer", function (b, d) {
            if (g && e && h && e != h) {
                var m = a.selection.getRange();
                m.moveToAddress(g, !0);
                if (!m.collapsed) {
                    for (; !f.isBody(m.startContainer);) {
                        var n = m.startContainer;
                        if (1 == n.nodeType) {
                            n = n.childNodes[m.startOffset];
                            if (!n) {
                                m.setStartBefore(m.startContainer);
                                continue
                            }
                            (n = n.previousSibling) && 3 == n.nodeType && RegExp("^[\n\r\t " + f.fillChar + "]*$").test(n.nodeValue) && m.setStartBefore(n)
                        }
                        if (0 == m.startOffset) m.setStartBefore(m.startContainer);
                        else break
                    }
                    for (; !f.isBody(m.endContainer);) {
                        n = m.endContainer;
                        if (1 == n.nodeType) {
                            n = n.childNodes[m.endOffset];
                            if (!n) {
                                m.setEndAfter(m.endContainer);
                                continue
                            }
                            (n = n.nextSibling) && 3 == n.nodeType && RegExp("^[\n\r\t" + f.fillChar + "]*$").test(n.nodeValue) && m.setEndAfter(n)
                        }
                        if (m.endOffset == m.endContainer[3 == m.endContainer.nodeType ? "nodeValue" : "childNodes"].length) m.setEndAfter(m.endContainer); else break
                    }
                }
                m.deleteContents();
                m.select(!0);
                a.__hasEnterExecCommand = !0;
                m = h;
                2 === d ? m = c(m) : d && (m = e);
                a.execCommand("inserthtml",
                    m, !0);
                a.__hasEnterExecCommand = !1;
                for (m = a.selection.getRange(); !f.isBody(m.startContainer) && !m.startOffset && m.startContainer[3 == m.startContainer.nodeType ? "nodeValue" : "childNodes"].length;) m.setStartBefore(m.startContainer);
                m = m.createAddress(!0);
                g.endAddress = m.startAddress
            }
        });
        a.addListener("ready", function () {
            f.on(a.body, "cut", function () {
                !a.selection.getRange().collapsed && a.undoManger && a.undoManger.save()
            });
            f.on(a.body, r.ie || r.opera ? "keydown" : "paste", function (c) {
                (!r.ie && !r.opera || (c.ctrlKey || c.metaKey) &&
                    "86" == c.keyCode) && d.call(a, function (a) {
                    b(a)
                })
            })
        });
        a.commands.paste = {
            execCommand: function (c) {
                r.ie ? (d.call(a, function (a) {
                    b(a)
                }), a.document.execCommand("paste")) : alert(a.getLang("pastemsg"))
            }
        }
    };
    UE.plugins.pasteplain = function () {
        this.setOpt({
            pasteplain: !1, filterTxtRules: function () {
                function c(a) {
                    a.tagName = "p";
                    a.setStyle()
                }

                function b(a) {
                    a.parentNode.removeChild(a, !0)
                }

                return {
                    "-": "script style object iframe embed input select",
                    p: {$: {}},
                    br: {$: {}},
                    div: function (a) {
                        for (var b, c = UE.uNode.createElement("p"); b = a.firstChild();) "text" !=
                        b.type && UE.dom.dtd.$block[b.tagName] ? c.firstChild() ? (a.parentNode.insertBefore(c, a), c = UE.uNode.createElement("p")) : a.parentNode.insertBefore(b, a) : c.appendChild(b);
                        c.firstChild() && a.parentNode.insertBefore(c, a);
                        a.parentNode.removeChild(a)
                    },
                    ol: b,
                    ul: b,
                    dl: b,
                    dt: b,
                    dd: b,
                    li: b,
                    caption: c,
                    th: c,
                    tr: c,
                    h1: c,
                    h2: c,
                    h3: c,
                    h4: c,
                    h5: c,
                    h6: c,
                    td: function (a) {
                        a.innerText() && a.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"), a);
                        a.parentNode.removeChild(a, a.innerText())
                    }
                }
            }()
        });
        var d = this.options.pasteplain;
        this.commands.pasteplain =
            {
                queryCommandState: function () {
                    return d ? 1 : 0
                }, execCommand: function () {
                    d = !d | 0
                }, notNeedUndo: 1
            }
    };
    UE.plugins.list = function () {
        function d(a) {
            var b = [], c;
            for (c in a) b.push(c);
            return b
        }

        function c(a) {
            var b = a.className;
            return f.hasClass(a, /custom_/) ? b.match(/custom_(\w+)/)[1] : f.getStyle(a, "list-style-type")
        }

        function b(b, g) {
            p.each(f.getElementsByTagName(b, "ol ul"), function (d) {
                if (f.inDoc(d, b)) {
                    var h = d.parentNode;
                    if (h.tagName == d.tagName) {
                        var k = c(d) || ("OL" == d.tagName ? "decimal" : "disc"),
                            l = c(h) || ("OL" == h.tagName ? "decimal" :
                                "disc");
                        k == l && (k = p.indexOf(n[d.tagName], k), k = k + 1 == n[d.tagName].length ? 0 : k + 1, e(d, n[d.tagName][k]))
                    }
                    var q = 0, k = 2;
                    f.hasClass(d, /custom_/) ? /[ou]l/i.test(h.tagName) && f.hasClass(h, /custom_/) || (k = 1) : /[ou]l/i.test(h.tagName) && f.hasClass(h, /custom_/) && (k = 3);
                    (h = f.getStyle(d, "list-style-type")) && (d.style.cssText = "list-style-type:" + h);
                    d.className = p.trim(d.className.replace(/list-paddingleft-\w+/, "")) + " list-paddingleft-" + k;
                    p.each(f.getElementsByTagName(d, "li"), function (a) {
                        a.style.cssText && (a.style.cssText = "");
                        if (!a.firstChild) f.remove(a); else if (a.parentNode === d) {
                            q++;
                            if (f.hasClass(d, /custom_/)) {
                                var b = 1, e = c(d);
                                if ("OL" == d.tagName) {
                                    if (e) switch (e) {
                                        case "cn":
                                        case "cn1":
                                        case "cn2":
                                            10 < q && (0 == q % 10 || 10 < q && 20 > q) ? b = 2 : 20 < q && (b = 3);
                                            break;
                                        case "num2":
                                            9 < q && (b = 2)
                                    }
                                    a.className = "list-" + m[e] + q + " list-" + e + "-paddingleft-" + b
                                } else a.className = "list-" + m[e] + " list-" + e + "-paddingleft"
                            } else a.className = a.className.replace(/list-[\w\-]+/gi, "");
                            b = a.getAttribute("class");
                            null === b || b.replace(/\s/g, "") || f.removeAttributes(a, "class")
                        }
                    });
                    !g && a(d, d.tagName.toLowerCase(), c(d) || f.getStyle(d, "list-style-type"), !0)
                }
            })
        }

        function a(a, e, g, d) {
            var h = a.nextSibling;
            h && 1 == h.nodeType && h.tagName.toLowerCase() == e && (c(h) || f.getStyle(h, "list-style-type") || ("ol" == e ? "decimal" : "disc")) == g && (f.moveChild(h, a), 0 == h.childNodes.length && f.remove(h));
            h && f.isFillChar(h) && f.remove(h);
            (h = a.previousSibling) && 1 == h.nodeType && h.tagName.toLowerCase() == e && (c(h) || f.getStyle(h, "list-style-type") || ("ol" == e ? "decimal" : "disc")) == g && f.moveChild(a, h);
            h && f.isFillChar(h) && f.remove(h);
            !d && f.isEmptyBlock(a) && f.remove(a);
            c(a) && b(a.ownerDocument, !0)
        }

        function e(a, b) {
            m[b] && (a.className = "custom_" + b);
            try {
                f.setStyle(a, "list-style-type", b)
            } catch (c) {
            }
        }

        function h(a) {
            var b = a.previousSibling;
            b && f.isEmptyBlock(b) && f.remove(b);
            (b = a.nextSibling) && f.isEmptyBlock(b) && f.remove(b)
        }

        function g(a) {
            for (; a && !f.isBody(a);) {
                if ("TABLE" == a.nodeName) return null;
                if ("LI" == a.nodeName) return a;
                a = a.parentNode
            }
        }

        var l = this, k = {TD: 1, PRE: 1, BLOCKQUOTE: 1}, m = {
            cn: "cn-1-", cn1: "cn-2-", cn2: "cn-3-", num: "num-1-", num1: "num-2-",
            num2: "num-3-", dash: "dash", dot: "dot"
        };
        l.setOpt({
            autoTransWordToList: !1,
            insertorderedlist: {
                num: "",
                num1: "",
                num2: "",
                cn: "",
                cn1: "",
                cn2: "",
                decimal: "",
                "lower-alpha": "",
                "lower-roman": "",
                "upper-alpha": "",
                "upper-roman": ""
            },
            insertunorderedlist: {circle: "", disc: "", square: "", dash: "", dot: ""},
            listDefaultPaddingLeft: "30",
            listiconpath: "http://bs.baidu.com/listicon/",
            maxListLevel: -1,
            disablePInList: !1
        });
        var n = {OL: d(l.options.insertorderedlist), UL: d(l.options.insertunorderedlist)}, q = l.options.listiconpath,
            t;
        for (t in m) l.options.insertorderedlist.hasOwnProperty(t) ||
        l.options.insertunorderedlist.hasOwnProperty(t) || delete m[t];
        l.ready(function () {
            var a = [], b;
            for (b in m) {
                if ("dash" == b || "dot" == b) a.push("li.list-" + m[b] + "{background-image:url(" + q + m[b] + ".gif)}"), a.push("ul.custom_" + b + "{list-style:none;}ul.custom_" + b + " li{background-position:0 3px;background-repeat:no-repeat}"); else {
                    for (var c = 0; 99 > c; c++) a.push("li.list-" + m[b] + c + "{background-image:url(" + q + "list-" + m[b] + c + ".gif)}");
                    a.push("ol.custom_" + b + "{list-style:none;}ol.custom_" + b + " li{background-position:0 3px;background-repeat:no-repeat}")
                }
                switch (b) {
                    case "cn":
                        a.push("li.list-" +
                            b + "-paddingleft-1{padding-left:25px}");
                        a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
                        a.push("li.list-" + b + "-paddingleft-3{padding-left:55px}");
                        break;
                    case "cn1":
                        a.push("li.list-" + b + "-paddingleft-1{padding-left:30px}");
                        a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
                        a.push("li.list-" + b + "-paddingleft-3{padding-left:55px}");
                        break;
                    case "cn2":
                        a.push("li.list-" + b + "-paddingleft-1{padding-left:40px}");
                        a.push("li.list-" + b + "-paddingleft-2{padding-left:55px}");
                        a.push("li.list-" + b + "-paddingleft-3{padding-left:68px}");
                        break;
                    case "num":
                    case "num1":
                        a.push("li.list-" + b + "-paddingleft-1{padding-left:25px}");
                        break;
                    case "num2":
                        a.push("li.list-" + b + "-paddingleft-1{padding-left:35px}");
                        a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
                        break;
                    case "dash":
                        a.push("li.list-" + b + "-paddingleft{padding-left:35px}");
                        break;
                    case "dot":
                        a.push("li.list-" + b + "-paddingleft{padding-left:20px}")
                }
            }
            a.push(".list-paddingleft-1{padding-left:0}");
            a.push(".list-paddingleft-2{padding-left:" + l.options.listDefaultPaddingLeft + "px}");
            a.push(".list-paddingleft-3{padding-left:" +
                2 * l.options.listDefaultPaddingLeft + "px}");
            p.cssRule("list", "ol,ul{margin:0;pading:0;" + (r.ie ? "" : "width:95%") + "}li{clear:both;}" + a.join("\n"), l.document)
        });
        l.ready(function () {
            f.on(l.body, "cut", function () {
                setTimeout(function () {
                    var a = l.selection.getRange(), b;
                    if (!a.collapsed && (b = f.findParentByTagName(a.startContainer, "li", !0)) && !b.nextSibling && f.isEmptyBlock(b)) {
                        b = b.parentNode;
                        var c;
                        (c = b.previousSibling) ? (f.remove(b), a.setStartAtLast(c).collapse(!0)) : (c = b.nextSibling) ? (f.remove(b), a.setStartAtFirst(c).collapse(!0)) :
                            (c = l.document.createElement("p"), f.fillNode(l.document, c), b.parentNode.insertBefore(c, b), f.remove(b), a.setStart(c, 0).collapse(!0));
                        a.select(!0)
                    }
                })
            })
        });
        l.addListener("beforepaste", function (a, b) {
            var e = this.selection.getRange(), g = UE.htmlparser(b.html, !0);
            if (e = f.findParentByTagName(e.startContainer, "li", !0)) {
                var d = e.parentNode;
                p.each(g.getNodesByTagName("OL" == d.tagName ? "ul" : "ol"), function (b) {
                    b.tagName = d.tagName;
                    b.setAttr();
                    if (b.parentNode === g) a = c(d) || ("OL" == d.tagName ? "decimal" : "disc"); else {
                        var e = b.parentNode.getAttr("class");
                        (a = e && /custom_/.test(e) ? e.match(/custom_(\w+)/)[1] : b.parentNode.getStyle("list-style-type")) || (a = "OL" == d.tagName ? "decimal" : "disc")
                    }
                    e = p.indexOf(n[d.tagName], a);
                    b.parentNode !== g && (e = e + 1 == n[d.tagName].length ? 0 : e + 1);
                    e = n[d.tagName][e];
                    m[e] ? b.setAttr("class", "custom_" + e) : b.setStyle("list-style-type", e)
                })
            }
            b.html = g.toHtml()
        });
        !0 === l.getOpt("disablePInList") && l.addOutputRule(function (a) {
            p.each(a.getNodesByTagName("li"), function (a) {
                var b = [], c = 0;
                p.each(a.children, function (e) {
                    if ("p" == e.tagName) {
                        for (var g; g = e.children.pop();) b.splice(c,
                            0, g), g.parentNode = a, lastNode = g;
                        g = b[b.length - 1];
                        g && "element" == g.type && "br" == g.tagName || (e = UE.uNode.createElement("br"), e.parentNode = a, b.push(e));
                        c = b.length
                    }
                });
                b.length && (a.children = b)
            })
        });
        l.addInputRule(function (a) {
            p.each(a.getNodesByTagName("li"), function (a) {
                for (var b = UE.uNode.createElement("p"), c = 0, e; e = a.children[c];) "text" == e.type || v.p[e.tagName] ? b.appendChild(e) : b.firstChild() ? (a.insertBefore(b, e), b = UE.uNode.createElement("p"), c += 2) : c++;
                (b.firstChild() && !b.parentNode || !a.firstChild()) && a.appendChild(b);
                b.firstChild() || b.innerHTML(r.ie ? "&nbsp;" : "<br/>");
                a = a.firstChild();
                (b = a.lastChild()) && "text" == b.type && /^\s*$/.test(b.data) && a.removeChild(b)
            });
            if (l.options.autoTransWordToList) {
                var b = {
                    num1: /^\d+\)/,
                    decimal: /^\d+\./,
                    "lower-alpha": /^[a-z]+\)/,
                    "upper-alpha": /^[A-Z]+\./,
                    cn: /^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,
                    cn2: /^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/
                }, c = {square: "n"}, e = function (a, e) {
                    var g = e.firstChild();
                    if (g && "element" == g.type && "span" == g.tagName &&
                        /Wingdings|Symbol/.test(g.getStyle("font-family"))) {
                        for (var d in c) if (c[d] == g.data) return d;
                        return "disc"
                    }
                    for (d in b) if (b[d].test(a)) return d
                };
                p.each(a.getNodesByTagName("p"), function (a) {
                    if ("MsoListParagraph" == a.getAttr("class")) {
                        a.setStyle("margin", "");
                        a.setStyle("margin-left", "");
                        a.setAttr("class", "");
                        var c = a, g, d = a;
                        if ("li" != a.parentNode.tagName && (g = e(a.innerText(), a))) {
                            var h = UE.uNode.createElement(l.options.insertorderedlist.hasOwnProperty(g) ? "ol" : "ul");
                            for (m[g] ? h.setAttr("class", "custom_" + g) : h.setStyle("list-style-type",
                                g); a && "li" != a.parentNode.tagName && e(a.innerText(), a);) {
                                (c = a.nextSibling()) || a.parentNode.insertBefore(h, a);
                                var k = h, f = g;
                                if ("ol" == k.tagName) if (r.ie) {
                                    var n = a.firstChild();
                                    "element" == n.type && "span" == n.tagName && b[f].test(n.innerText()) && a.removeChild(n)
                                } else a.innerHTML(a.innerHTML().replace(b[f], "")); else a.removeChild(a.firstChild());
                                f = UE.uNode.createElement("li");
                                f.appendChild(a);
                                k.appendChild(f);
                                a = c
                            }
                            !h.parentNode && a && a.parentNode && a.parentNode.insertBefore(h, a)
                        }
                        (c = d.firstChild()) && "element" == c.type &&
                        "span" == c.tagName && /^\s*(&nbsp;)+\s*$/.test(c.innerText()) && c.parentNode.removeChild(c)
                    }
                })
            }
        });
        l.addListener("contentchange", function () {
            b(l.document)
        });
        l.addListener("keydown", function (a, b) {
            function c() {
                b.preventDefault ? b.preventDefault() : b.returnValue = !1;
                l.fireEvent("contentchange");
                l.undoManger && l.undoManger.save()
            }

            function e(a, b) {
                for (; a && !f.isBody(a) && !b(a);) {
                    if (1 == a.nodeType && /[ou]l/i.test(a.tagName)) return a;
                    a = a.parentNode
                }
                return null
            }

            var g = b.keyCode || b.which;
            if (13 == g && !b.shiftKey) {
                var d = l.selection.getRange(),
                    k = f.findParent(d.startContainer, function (a) {
                        return f.isBlockElm(a)
                    }, !0), n = f.findParentByTagName(d.startContainer, "li", !0);
                k && "PRE" != k.tagName && !n && (n = k.innerHTML.replace(RegExp(f.fillChar, "g"), ""), /^\s*1\s*\.[^\d]/.test(n) && (k.innerHTML = n.replace(/^\s*1\s*\./, ""), d.setStartAtLast(k).collapse(!0).select(), l.__hasEnterExecCommand = !0, l.execCommand("insertorderedlist"), l.__hasEnterExecCommand = !1));
                d = l.selection.getRange();
                k = e(d.startContainer, function (a) {
                    return "TABLE" == a.tagName
                });
                n = d.collapsed ? k : e(d.endContainer,
                    function (a) {
                        return "TABLE" == a.tagName
                    });
                if (k && n && k === n) {
                    if (!d.collapsed) if (k = f.findParentByTagName(d.startContainer, "li", !0), n = f.findParentByTagName(d.endContainer, "li", !0), k && n && k === n) {
                        if (d.deleteContents(), (n = f.findParentByTagName(d.startContainer, "li", !0)) && f.isEmptyBlock(n)) {
                            t = n.previousSibling;
                            next = n.nextSibling;
                            k = l.document.createElement("p");
                            f.fillNode(l.document, k);
                            q = n.parentNode;
                            t && next ? (d.setStart(next, 0).collapse(!0).select(!0), f.remove(n)) : ((t || next) && t ? n.parentNode.parentNode.insertBefore(k,
                                q.nextSibling) : q.parentNode.insertBefore(k, q), f.remove(n), q.firstChild || f.remove(q), d.setStart(k, 0).setCursor());
                            c();
                            return
                        }
                    } else {
                        var k = d.cloneRange(), m = k.collapse(!1).createBookmark();
                        d.deleteContents();
                        k.moveToBookmark(m);
                        n = f.findParentByTagName(k.startContainer, "li", !0);
                        h(n);
                        k.select();
                        c();
                        return
                    }
                    if (n = f.findParentByTagName(d.startContainer, "li", !0)) {
                        if (f.isEmptyBlock(n)) {
                            var m = d.createBookmark(), q = n.parentNode;
                            n !== q.lastChild ? (f.breakParent(n, q), h(n)) : (q.parentNode.insertBefore(n, q.nextSibling),
                            f.isEmptyNode(q) && f.remove(q));
                            if (!v.$list[n.parentNode.tagName]) if (f.isBlockElm(n.firstChild)) f.remove(n, !0); else {
                                k = l.document.createElement("p");
                                for (n.parentNode.insertBefore(k, n); n.firstChild;) k.appendChild(n.firstChild);
                                f.remove(n)
                            }
                            d.moveToBookmark(m).select()
                        } else {
                            k = n.firstChild;
                            if (!k || !f.isBlockElm(k)) {
                                k = l.document.createElement("p");
                                for (!n.firstChild && f.fillNode(l.document, k); n.firstChild;) k.appendChild(n.firstChild);
                                n.appendChild(k)
                            }
                            m = l.document.createElement("span");
                            d.insertNode(m);
                            f.breakParent(m,
                                n);
                            t = m.nextSibling;
                            k = t.firstChild;
                            k || (k = l.document.createElement("p"), f.fillNode(l.document, k), t.appendChild(k));
                            f.isEmptyNode(k) && (k.innerHTML = "", f.fillNode(l.document, k));
                            d.setStart(k, 0).collapse(!0).shrinkBoundary().select();
                            f.remove(m);
                            var t = t.previousSibling;
                            t && f.isEmptyBlock(t) && (t.innerHTML = "<p></p>", f.fillNode(l.document, t.firstChild))
                        }
                        c()
                    }
                }
            }
            if (8 == g && (d = l.selection.getRange(), d.collapsed && f.isStartInblock(d) && (k = d.cloneRange().trimBoundary(), (n = f.findParentByTagName(d.startContainer, "li",
                !0)) && f.isStartInblock(k)))) if ((k = f.findParentByTagName(d.startContainer, "p", !0)) && k !== n.firstChild) q = f.findParentByTagName(k, ["ol", "ul"]), f.breakParent(k, q), h(k), l.fireEvent("contentchange"), d.setStart(k, 0).setCursor(!1, !0), l.fireEvent("saveScene"), f.preventDefault(b); else if (n && (t = n.previousSibling)) {
                if (46 != g || !n.childNodes.length) {
                    v.$list[t.tagName] && (t = t.lastChild);
                    l.undoManger && l.undoManger.save();
                    k = n.firstChild;
                    if (f.isBlockElm(k)) if (f.isEmptyNode(k)) for (t.appendChild(k), d.setStart(k, 0).setCursor(!1,
                        !0); n.firstChild;) t.appendChild(n.firstChild); else m = l.document.createElement("span"), d.insertNode(m), f.isEmptyBlock(t) && (t.innerHTML = ""), f.moveChild(n, t), d.setStartBefore(m).collapse(!0).select(!0), f.remove(m); else if (f.isEmptyNode(n)) k = l.document.createElement("p"), t.appendChild(k), d.setStart(k, 0).setCursor(); else for (d.setEnd(t, t.childNodes.length).collapse().select(!0); n.firstChild;) t.appendChild(n.firstChild);
                    f.remove(n);
                    l.fireEvent("contentchange");
                    l.fireEvent("saveScene");
                    f.preventDefault(b)
                }
            } else if (n &&
                !n.previousSibling) {
                q = n.parentNode;
                m = d.createBookmark();
                if (f.isTagNode(q.parentNode, "ol ul")) q.parentNode.insertBefore(n, q); else {
                    for (; n.firstChild;) q.parentNode.insertBefore(n.firstChild, q);
                    f.remove(n)
                }
                f.isEmptyNode(q) && f.remove(q);
                d.moveToBookmark(m).setCursor(!1, !0);
                l.fireEvent("contentchange");
                l.fireEvent("saveScene");
                f.preventDefault(b)
            }
        });
        l.addListener("keyup", function (b, e) {
            if (8 == (e.keyCode || e.which)) {
                var g = l.selection.getRange(), d;
                (d = f.findParentByTagName(g.startContainer, ["ol", "ul"], !0)) &&
                a(d, d.tagName.toLowerCase(), c(d) || f.getComputedStyle(d, "list-style-type"), !0)
            }
        });
        l.addListener("tabkeydown", function () {
            function b(a) {
                if (-1 != l.options.maxListLevel) {
                    a = a.parentNode;
                    for (var c = 0; /[ou]l/i.test(a.tagName);) c++, a = a.parentNode;
                    if (c >= l.options.maxListLevel) return !0
                }
            }

            var g = l.selection.getRange(), d = f.findParentByTagName(g.startContainer, "li", !0);
            if (d) {
                var h;
                if (g.collapsed) {
                    if (b(d)) return !0;
                    var k = d.parentNode, m = l.document.createElement(k.tagName),
                        q = p.indexOf(n[m.tagName], c(k) || f.getComputedStyle(k,
                            "list-style-type")), q = q + 1 == n[m.tagName].length ? 0 : q + 1, q = n[m.tagName][q];
                    e(m, q);
                    if (f.isStartInblock(g)) return l.fireEvent("saveScene"), h = g.createBookmark(), k.insertBefore(m, d), m.appendChild(d), a(m, m.tagName.toLowerCase(), q), l.fireEvent("contentchange"), g.moveToBookmark(h).select(!0), !0
                } else {
                    l.fireEvent("saveScene");
                    h = g.createBookmark();
                    for (var k = 0, t, m = f.findParents(d), r; r = m[k++];) if (f.isTagNode(r, "ol ul")) {
                        t = r;
                        break
                    }
                    r = d;
                    if (h.end) for (; r && !(f.getPosition(r, h.end) & f.POSITION_FOLLOWING);) if (b(r)) r = f.getNextDomNode(r,
                        !1, null, function (a) {
                            return a !== t
                        }); else {
                        k = r.parentNode;
                        m = l.document.createElement(k.tagName);
                        q = p.indexOf(n[m.tagName], c(k) || f.getComputedStyle(k, "list-style-type"));
                        q = n[m.tagName][q + 1 == n[m.tagName].length ? 0 : q + 1];
                        e(m, q);
                        for (k.insertBefore(m, r); r && !(f.getPosition(r, h.end) & f.POSITION_FOLLOWING);) {
                            d = r.nextSibling;
                            m.appendChild(r);
                            if (!d || f.isTagNode(d, "ol ul")) {
                                if (d) for (; (d = d.firstChild) && "LI" != d.tagName;) ; else d = f.getNextDomNode(r, !1, null, function (a) {
                                    return a !== t
                                });
                                break
                            }
                            r = d
                        }
                        a(m, m.tagName.toLowerCase(),
                            q);
                        r = d
                    }
                    l.fireEvent("contentchange");
                    g.moveToBookmark(h).select();
                    return !0
                }
            }
        });
        l.commands.insertorderedlist = l.commands.insertunorderedlist = {
            execCommand: function (b, d) {
                d || (d = "insertorderedlist" == b.toLowerCase() ? "decimal" : "disc");
                var h = this.selection.getRange(), l = function (a) {
                    return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !f.isWhitespace(a)
                }, n = "insertorderedlist" == b.toLowerCase() ? "ol" : "ul", m = this.document.createDocumentFragment();
                h.adjustmentBoundary().shrinkBoundary();
                var q = h.createBookmark(!0), t =
                        g(this.document.getElementById(q.start)), p = 0, r = g(this.document.getElementById(q.end)), s = 0,
                    z, H, D, B;
                if (t || r) {
                    t && (z = t.parentNode);
                    q.end || (r = t);
                    r && (H = r.parentNode);
                    if (z === H) {
                        for (; t !== r;) {
                            B = t;
                            t = t.nextSibling;
                            if (!f.isBlockElm(B.firstChild)) {
                                for (l = this.document.createElement("p"); B.firstChild;) l.appendChild(B.firstChild);
                                B.appendChild(l)
                            }
                            m.appendChild(B)
                        }
                        B = this.document.createElement("span");
                        z.insertBefore(B, r);
                        if (!f.isBlockElm(r.firstChild)) {
                            for (l = this.document.createElement("p"); r.firstChild;) l.appendChild(r.firstChild);
                            r.appendChild(l)
                        }
                        m.appendChild(r);
                        f.breakParent(B, z);
                        f.isEmptyNode(B.previousSibling) && f.remove(B.previousSibling);
                        f.isEmptyNode(B.nextSibling) && f.remove(B.nextSibling);
                        l = c(z) || f.getComputedStyle(z, "list-style-type") || ("insertorderedlist" == b.toLowerCase() ? "decimal" : "disc");
                        if (z.tagName.toLowerCase() == n && l == d) {
                            r = 0;
                            for (r = this.document.createDocumentFragment(); l = m.firstChild;) if (f.isTagNode(l, "ol ul")) r.appendChild(l); else for (; l.firstChild;) r.appendChild(l.firstChild), f.remove(l);
                            B.parentNode.insertBefore(r,
                                B)
                        } else D = this.document.createElement(n), e(D, d), D.appendChild(m), B.parentNode.insertBefore(D, B);
                        f.remove(B);
                        D && a(D, n, d);
                        h.moveToBookmark(q).select();
                        return
                    }
                    if (t) {
                        for (; t;) {
                            B = t.nextSibling;
                            if (f.isTagNode(t, "ol ul")) m.appendChild(t); else {
                                D = this.document.createDocumentFragment();
                                for (var O = 0; t.firstChild;) f.isBlockElm(t.firstChild) && (O = 1), D.appendChild(t.firstChild);
                                O ? m.appendChild(D) : (O = this.document.createElement("p"), O.appendChild(D), m.appendChild(O));
                                f.remove(t)
                            }
                            t = B
                        }
                        z.parentNode.insertBefore(m, z.nextSibling);
                        f.isEmptyNode(z) ? (h.setStartBefore(z), f.remove(z)) : h.setStartAfter(z);
                        p = 1
                    }
                    if (r && f.inDoc(H, this.document)) {
                        for (t = H.firstChild; t && t !== r;) {
                            B = t.nextSibling;
                            if (f.isTagNode(t, "ol ul")) m.appendChild(t); else {
                                D = this.document.createDocumentFragment();
                                for (O = 0; t.firstChild;) f.isBlockElm(t.firstChild) && (O = 1), D.appendChild(t.firstChild);
                                O ? m.appendChild(D) : (O = this.document.createElement("p"), O.appendChild(D), m.appendChild(O));
                                f.remove(t)
                            }
                            t = B
                        }
                        B = f.createElement(this.document, "div", {tmpDiv: 1});
                        f.moveChild(r, B);
                        m.appendChild(B);
                        f.remove(r);
                        H.parentNode.insertBefore(m, H);
                        h.setEndBefore(H);
                        f.isEmptyNode(H) && f.remove(H);
                        s = 1
                    }
                }
                p || h.setStartBefore(this.document.getElementById(q.start));
                q.end && !s && h.setEndAfter(this.document.getElementById(q.end));
                h.enlarge(!0, function (a) {
                    return k[a.tagName]
                });
                m = this.document.createDocumentFragment();
                r = h.createBookmark();
                z = f.getNextDomNode(r.start, !1, l);
                D = h.cloneRange();
                for (p = f.isBlockElm; z && z !== r.end && f.getPosition(z, r.end) & f.POSITION_PRECEDING;) if (3 == z.nodeType || v.li[z.tagName]) if (1 == z.nodeType &&
                    v.$list[z.tagName]) {
                    for (; z.firstChild;) m.appendChild(z.firstChild);
                    t = f.getNextDomNode(z, !1, l);
                    f.remove(z);
                    z = t
                } else {
                    t = z;
                    for (D.setStartBefore(z); z && z !== r.end && (!p(z) || f.isBookmarkNode(z));) t = z, z = f.getNextDomNode(z, !1, null, function (a) {
                        return !k[a.tagName]
                    });
                    z && p(z) && (B = f.getNextDomNode(t, !1, l)) && f.isBookmarkNode(B) && (z = f.getNextDomNode(B, !1, l), t = B);
                    D.setEndAfter(t);
                    z = f.getNextDomNode(t, !1, l);
                    B = h.document.createElement("li");
                    B.appendChild(D.extractContents());
                    if (f.isEmptyNode(B)) {
                        for (t = h.document.createElement("p"); B.firstChild;) t.appendChild(B.firstChild);
                        B.appendChild(t)
                    }
                    m.appendChild(B)
                } else z = f.getNextDomNode(z, !0, l);
                h.moveToBookmark(r).collapse(!0);
                D = this.document.createElement(n);
                e(D, d);
                D.appendChild(m);
                h.insertNode(D);
                a(D, n, d);
                r = 0;
                for (n = f.getElementsByTagName(D, "div"); l = n[r++];) l.getAttribute("tmpDiv") && f.remove(l, !0);
                h.moveToBookmark(q).select()
            }, queryCommandState: function (a) {
                a = "insertorderedlist" == a.toLowerCase() ? "ol" : "ul";
                for (var b = this.selection.getStartElementPath(), c = 0, e; (e = b[c++]) && "TABLE" != e.nodeName;) if (a == e.nodeName.toLowerCase()) return 1;
                return 0
            }, queryCommandValue: function (a) {
                a = "insertorderedlist" == a.toLowerCase() ? "ol" : "ul";
                for (var b = this.selection.getStartElementPath(), e, g = 0, d; d = b[g++];) {
                    if ("TABLE" == d.nodeName) {
                        e = null;
                        break
                    }
                    if (a == d.nodeName.toLowerCase()) {
                        e = d;
                        break
                    }
                }
                return e ? c(e) || f.getComputedStyle(e, "list-style-type") : null
            }
        }
    };
    (function () {
        var d = {
            textarea: function (c, b) {
                var a = b.ownerDocument.createElement("textarea");
                a.style.cssText = "position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;";
                r.ie && 8 > r.version && (a.style.width = b.offsetWidth + "px", a.style.height = b.offsetHeight + "px", b.onresize = function () {
                    a.style.width = b.offsetWidth + "px";
                    a.style.height = b.offsetHeight + "px"
                });
                b.appendChild(a);
                return {
                    setContent: function (b) {
                        a.value = b
                    }, getContent: function () {
                        return a.value
                    }, select: function () {
                        var b;
                        r.ie ? (b = a.createTextRange(), b.collapse(!0), b.select()) : (a.setSelectionRange(0, 0), a.focus())
                    }, dispose: function () {
                        b.removeChild(a);
                        b = a = b.onresize = null
                    }
                }
            }, codemirror: function (c, b) {
                var a = window.CodeMirror(b,
                    {mode: "text/html", tabMode: "indent", lineNumbers: !0, lineWrapping: !0}),
                    e = a.getWrapperElement();
                e.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;';
                a.getScrollerElement().style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;";
                a.refresh();
                return {
                    getCodeMirror: function () {
                        return a
                    }, setContent: function (b) {
                        a.setValue(b)
                    }, getContent: function () {
                        return a.getValue()
                    }, select: function () {
                        a.focus()
                    }, dispose: function () {
                        b.removeChild(e);
                        a = e = null
                    }
                }
            }
        };
        UE.plugins.source = function () {
            var c = this, b = this.options, a = !1, e, h;
            b.sourceEditor = r.ie ? "textarea" : b.sourceEditor || "codemirror";
            c.setOpt({sourceEditorFirst: !1});
            var g, l, k;
            c.commands.source = {
                execCommand: function () {
                    if (a = !a) {
                        k = c.selection.getRange().createAddress(!1, !0);
                        c.undoManger && c.undoManger.save(!0);
                        r.gecko && (c.body.contentEditable = !1);
                        g = c.iframe.style.cssText;
                        c.iframe.style.cssText += "position:absolute;left:-32768px;top:-32768px;";
                        c.fireEvent("beforegetcontent");
                        var n = UE.htmlparser(c.body.innerHTML);
                        c.filterOutputRule(n);
                        n.traversal(function (a) {
                            if ("element" == a.type) switch (a.tagName) {
                                case "td":
                                case "th":
                                case "caption":
                                    a.children && 1 == a.children.length && "br" == a.firstChild().tagName && a.removeChild(a.firstChild());
                                    break;
                                case "pre":
                                    a.innerText(a.innerText().replace(/&nbsp;/g, " "))
                            }
                        });
                        c.fireEvent("aftergetcontent");
                        n = n.toHtml(!0);
                        e = d["codemirror" == b.sourceEditor && window.CodeMirror ? "codemirror" : "textarea"](c, c.iframe.parentNode);
                        e.setContent(n);
                        h = c.setContent;
                        c.setContent = function (a) {
                            a = UE.htmlparser(a);
                            c.filterInputRule(a);
                            a = a.toHtml();
                            e.setContent(a)
                        };
                        setTimeout(function () {
                            e.select();
                            c.addListener("fullscreenchanged", function () {
                                try {
                                    e.getCodeMirror().refresh()
                                } catch (a) {
                                }
                            })
                        });
                        l = c.getContent;
                        c.getContent = function () {
                            return e.getContent() || "<p>" + (r.ie ? "" : "<br/>") + "</p>"
                        }
                    } else if (c.iframe.style.cssText = g, n = e.getContent() || "<p>" + (r.ie ? "" : "<br/>") + "</p>", n = n.replace(RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"), function (a, b) {
                        return b && !v.$inlineWithA[b.toLowerCase()] ? a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g,
                            "") : a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "")
                    }), c.setContent = h, c.setContent(n), e.dispose(), e = null, c.getContent = l, n = c.body.firstChild, n || (c.body.innerHTML = "<p>" + (r.ie ? "" : "<br/>") + "</p>", n = c.body.firstChild), c.undoManger && c.undoManger.save(!0), r.gecko) {
                        var m = document.createElement("input");
                        m.style.cssText = "position:absolute;left:0;top:-32768px";
                        document.body.appendChild(m);
                        c.body.contentEditable = !1;
                        setTimeout(function () {
                            f.setViewportOffset(m, {left: -32768, top: 0});
                            m.focus();
                            setTimeout(function () {
                                c.body.contentEditable =
                                    !0;
                                c.selection.getRange().moveToAddress(k).select(!0);
                                f.remove(m)
                            })
                        })
                    } else try {
                        c.selection.getRange().moveToAddress(k).select(!0)
                    } catch (t) {
                    }
                    this.fireEvent("sourcemodechanged", a)
                }, queryCommandState: function () {
                    return a | 0
                }, notNeedUndo: 1
            };
            var m = c.queryCommandState;
            c.queryCommandState = function (b) {
                b = b.toLowerCase();
                return a ? b in {source: 1, fullscreen: 1} ? 1 : -1 : m.apply(this, arguments)
            };
            "codemirror" == b.sourceEditor && c.addListener("ready", function () {
                p.loadFile(document, {
                    src: b.codeMirrorJsUrl || b.UEDITOR_HOME_URL +
                        "third-party/codemirror/codemirror.js", tag: "script", type: "text/javascript", defer: "defer"
                }, function () {
                    b.sourceEditorFirst && setTimeout(function () {
                        c.execCommand("source")
                    }, 0)
                });
                p.loadFile(document, {
                    tag: "link",
                    rel: "stylesheet",
                    type: "text/css",
                    href: b.codeMirrorCssUrl || b.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.css"
                })
            })
        }
    })();
    UE.plugins.enterkey = function () {
        var d, c = this, b = c.options.enterTag;
        c.addListener("keyup", function (a, b) {
            if (13 == (b.keyCode || b.which)) {
                var h = c.selection.getRange(), g = h.startContainer,
                    l;
                if (r.ie) c.fireEvent("saveScene", !0, !0); else {
                    if (/h\d/i.test(d)) {
                        if (r.gecko) f.findParentByTagName(g, "h1 h2 h3 h4 h5 h6 blockquote caption table".split(" "), !0) || (c.document.execCommand("formatBlock", !1, "<p>"), l = 1); else if (1 == g.nodeType) {
                            var g = c.document.createTextNode(""), k;
                            h.insertNode(g);
                            if (k = f.findParentByTagName(g, "div", !0)) {
                                for (l = c.document.createElement("p"); k.firstChild;) l.appendChild(k.firstChild);
                                k.parentNode.insertBefore(l, k);
                                f.remove(k);
                                h.setStartBefore(g).setCursor();
                                l = 1
                            }
                            f.remove(g)
                        }
                        c.undoManger &&
                        l && c.undoManger.save()
                    }
                    r.opera && h.select()
                }
            }
        });
        c.addListener("keydown", function (a, e) {
            if (13 == (e.keyCode || e.which)) if (c.fireEvent("beforeenterkeydown")) f.preventDefault(e); else {
                c.fireEvent("saveScene", !0, !0);
                d = "";
                var h = c.selection.getRange();
                if (!h.collapsed) {
                    var g = h.startContainer, l = h.endContainer, g = f.findParentByTagName(g, "td", !0),
                        l = f.findParentByTagName(l, "td", !0);
                    if (g && l && g !== l || !g && l || g && !l) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                        return
                    }
                }
                if ("p" == b) r.ie || ((g = f.findParentByTagName(h.startContainer,
                    "ol ul p h1 h2 h3 h4 h5 h6 blockquote caption".split(" "), !0)) || r.opera ? (d = g.tagName, "p" == g.tagName.toLowerCase() && r.gecko && f.removeDirtyAttr(g)) : (c.document.execCommand("formatBlock", !1, "<p>"), r.gecko && (h = c.selection.getRange(), (g = f.findParentByTagName(h.startContainer, "p", !0)) && f.removeDirtyAttr(g)))); else if (e.preventDefault ? e.preventDefault() : e.returnValue = !1, h.collapsed) l = h.document.createElement("br"), h.insertNode(l), l.parentNode.lastChild === l ? (l.parentNode.insertBefore(l.cloneNode(!0), l), h.setStartBefore(l)) :
                    h.setStartAfter(l), h.setCursor(); else if (h.deleteContents(), g = h.startContainer, 1 == g.nodeType && (g = g.childNodes[h.startOffset])) {
                    for (; 1 == g.nodeType;) {
                        if (v.$empty[g.tagName]) return h.setStartBefore(g).setCursor(), c.undoManger && c.undoManger.save(), !1;
                        if (!g.firstChild) return l = h.document.createElement("br"), g.appendChild(l), h.setStart(g, 0).setCursor(), c.undoManger && c.undoManger.save(), !1;
                        g = g.firstChild
                    }
                    g === h.startContainer.childNodes[h.startOffset] ? (l = h.document.createElement("br"), h.insertNode(l).setCursor()) :
                        h.setStart(g, 0).setCursor()
                } else l = h.document.createElement("br"), h.insertNode(l).setStartAfter(l).setCursor()
            }
        })
    };
    UE.plugins.keystrokes = function () {
        var d = this, c = !0;
        d.addListener("keydown", function (b, a) {
            var e = a.keyCode || a.which, h = d.selection.getRange();
            if (!(h.collapsed || a.ctrlKey || a.shiftKey || a.altKey || a.metaKey) && (65 <= e && 90 >= e || 48 <= e && 57 >= e || 96 <= e && 111 >= e || {
                13: 1,
                8: 1,
                46: 1
            }[e])) {
                var g = h.startContainer;
                f.isFillChar(g) && h.setStartBefore(g);
                g = h.endContainer;
                f.isFillChar(g) && h.setEndAfter(g);
                h.txtToElmBoundary();
                h.endContainer && 1 == h.endContainer.nodeType && (g = h.endContainer.childNodes[h.endOffset]) && f.isBr(g) && h.setEndAfter(g);
                if (0 == h.startOffset && (g = h.startContainer, f.isBoundaryNode(g, "firstChild") && (g = h.endContainer, h.endOffset == (3 == g.nodeType ? g.nodeValue.length : g.childNodes.length) && f.isBoundaryNode(g, "lastChild")))) {
                    d.fireEvent("saveScene");
                    d.body.innerHTML = "<p>" + (r.ie ? "" : "<br/>") + "</p>";
                    h.setStart(d.body.firstChild, 0).setCursor(!1, !0);
                    d._selectionChange();
                    return
                }
            }
            if (e == $.Backspace) {
                h = d.selection.getRange();
                c = h.collapsed;
                if (d.fireEvent("delkeydown", a)) return;
                var l, k;
                h.collapsed && h.inFillChar() && (l = h.startContainer, f.isFillChar(l) ? (h.setStartBefore(l).shrinkBoundary(!0).collapse(!0), f.remove(l)) : (l.nodeValue = l.nodeValue.replace(RegExp("^" + f.fillChar), ""), h.startOffset--, h.collapse(!0).select(!0)));
                if (l = h.getClosedNode()) {
                    d.fireEvent("saveScene");
                    h.setStartBefore(l);
                    f.remove(l);
                    h.setCursor();
                    d.fireEvent("saveScene");
                    f.preventDefault(a);
                    return
                }
                if (!r.ie && (l = f.findParentByTagName(h.startContainer, "table",
                    !0), k = f.findParentByTagName(h.endContainer, "table", !0), l && !k || !l && k || l !== k)) {
                    a.preventDefault();
                    return
                }
            }
            if (e == $.Tab) {
                var m = {ol: 1, ul: 1, table: 1};
                if (d.fireEvent("tabkeydown", a)) {
                    f.preventDefault(a);
                    return
                }
                h = d.selection.getRange();
                d.fireEvent("saveScene");
                var g = 0, n = "";
                l = d.options.tabSize || 4;
                for (k = d.options.tabNode || "&nbsp;"; g < l; g++) n += k;
                g = d.document.createElement("span");
                g.innerHTML = n + f.fillChar;
                if (h.collapsed) h.insertNode(g.cloneNode(!0).firstChild).setCursor(!0); else if (n = function (a) {
                    return f.isBlockElm(a) &&
                        !m[a.tagName.toLowerCase()]
                }, l = f.findParent(h.startContainer, n, !0), k = f.findParent(h.endContainer, n, !0), l && k && l === k) h.deleteContents(), h.insertNode(g.cloneNode(!0).firstChild).setCursor(!0); else {
                    l = h.createBookmark();
                    h.enlarge(!0);
                    k = h.createBookmark();
                    for (var q = f.getNextDomNode(k.start, !1, n); q && !(f.getPosition(q, k.end) & f.POSITION_FOLLOWING);) q.insertBefore(g.cloneNode(!0).firstChild, q.firstChild), q = f.getNextDomNode(q, !1, n);
                    h.moveToBookmark(k).moveToBookmark(l).select()
                }
                f.preventDefault(a)
            }
            if (r.gecko &&
                46 == e && (h = d.selection.getRange(), h.collapsed && (l = h.startContainer, f.isEmptyBlock(l)))) {
                for (e = l.parentNode; 1 == f.getChildCount(e) && !f.isBody(e);) l = e, e = e.parentNode;
                l === e.lastChild && a.preventDefault()
            }
        });
        d.addListener("keyup", function (b, a) {
            var e;
            if ((a.keyCode || a.which) == $.Backspace && !this.fireEvent("delkeyup")) {
                e = this.selection.getRange();
                if (e.collapsed) {
                    var d;
                    if ((d = f.findParentByTagName(e.startContainer, "h1 h2 h3 h4 h5 h6".split(" "), !0)) && f.isEmptyBlock(d)) {
                        var g = d.previousSibling;
                        if (g && "TABLE" != g.nodeName) {
                            f.remove(d);
                            e.setStartAtLast(g).setCursor(!1, !0);
                            return
                        }
                        if ((g = d.nextSibling) && "TABLE" != g.nodeName) {
                            f.remove(d);
                            e.setStartAtFirst(g).setCursor(!1, !0);
                            return
                        }
                    }
                    f.isBody(e.startContainer) && (d = f.createElement(this.document, "p", {innerHTML: r.ie ? f.fillChar : "<br/>"}), e.insertNode(d).setStart(d, 0).setCursor(!1, !0))
                }
                !c && (3 == e.startContainer.nodeType || 1 == e.startContainer.nodeType && f.isEmptyBlock(e.startContainer)) && (r.ie ? (d = e.document.createElement("span"), e.insertNode(d).setStartBefore(d).collapse(!0), e.select(), f.remove(d)) :
                    e.select())
            }
        })
    };
    UE.plugins.fiximgclick = function () {
        function d() {
            this.cover = this.resizer = this.editor = null;
            this.doc = document;
            this.prePos = {x: 0, y: 0};
            this.startPos = {x: 0, y: 0}
        }

        var c = !1;
        (function () {
            var b = [[0, 0, -1, -1], [0, 0, 0, -1], [0, 0, 1, -1], [0, 0, -1, 0], [0, 0, 1, 0], [0, 0, -1, 1], [0, 0, 0, 1], [0, 0, 1, 1]];
            d.prototype = {
                init: function (a) {
                    var b = this;
                    b.editor = a;
                    b.startPos = this.prePos = {x: 0, y: 0};
                    b.dragId = -1;
                    a = [];
                    var c = b.cover = document.createElement("div"), g = b.resizer = document.createElement("div");
                    c.id = b.editor.ui.id + "_imagescale_cover";
                    c.style.cssText = "position:absolute;display:none;z-index:" + b.editor.options.zIndex + ";filter:alpha(opacity=0); opacity:0;background:#CCC;";
                    f.on(c, "mousedown click", function () {
                        b.hide()
                    });
                    for (i = 0; 8 > i; i++) a.push('<span class="edui-editor-imagescale-hand' + i + '"></span>');
                    g.id = b.editor.ui.id + "_imagescale";
                    g.className = "edui-editor-imagescale";
                    g.innerHTML = a.join("");
                    g.style.cssText += ";display:none;border:1px solid #3b77ff;z-index:" + b.editor.options.zIndex + ";";
                    b.editor.ui.getDom().appendChild(c);
                    b.editor.ui.getDom().appendChild(g);
                    b.initStyle();
                    b.initEvents()
                }, initStyle: function () {
                    p.cssRule("imagescale", ".edui-editor-imagescale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}.edui-editor-imagescale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-editor-imagescale .edui-editor-imagescale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}")
                },
                initEvents: function () {
                    this.startPos.x = this.startPos.y = 0;
                    this.isDraging = !1
                }, _eventHandler: function (a) {
                    switch (a.type) {
                        case "mousedown":
                            var b = a.target || a.srcElement;
                            -1 != b.className.indexOf("edui-editor-imagescale-hand") && -1 == this.dragId && (this.dragId = b.className.slice(-1), this.startPos.x = this.prePos.x = a.clientX, this.startPos.y = this.prePos.y = a.clientY, f.on(this.doc, "mousemove", this.proxy(this._eventHandler, this)));
                            break;
                        case "mousemove":
                            -1 != this.dragId && (this.updateContainerStyle(this.dragId, {
                                x: a.clientX -
                                    this.prePos.x, y: a.clientY - this.prePos.y
                            }), this.prePos.x = a.clientX, this.prePos.y = a.clientY, c = !0, this.updateTargetElement());
                            break;
                        case "mouseup":
                            -1 != this.dragId && (this.updateContainerStyle(this.dragId, {
                                x: a.clientX - this.prePos.x,
                                y: a.clientY - this.prePos.y
                            }), this.updateTargetElement(), this.target.parentNode && this.attachTo(this.target), this.dragId = -1), f.un(this.doc, "mousemove", this.proxy(this._eventHandler, this)), c && (c = !1, this.editor.fireEvent("contentchange"))
                    }
                }, updateTargetElement: function () {
                    f.setStyles(this.target,
                        {width: this.resizer.style.width, height: this.resizer.style.height});
                    this.target.width = parseInt(this.resizer.style.width);
                    this.target.height = parseInt(this.resizer.style.height);
                    this.attachTo(this.target)
                }, updateContainerStyle: function (a, c) {
                    var d = this.resizer, g;
                    0 != b[a][0] && (g = parseInt(d.style.left) + c.x, d.style.left = this._validScaledProp("left", g) + "px");
                    0 != b[a][1] && (g = parseInt(d.style.top) + c.y, d.style.top = this._validScaledProp("top", g) + "px");
                    0 != b[a][2] && (g = d.clientWidth + b[a][2] * c.x, d.style.width = this._validScaledProp("width",
                        g) + "px");
                    0 != b[a][3] && (g = d.clientHeight + b[a][3] * c.y, d.style.height = this._validScaledProp("height", g) + "px")
                }, _validScaledProp: function (a, b) {
                    var c = this.resizer, g = document;
                    b = isNaN(b) ? 0 : b;
                    switch (a) {
                        case "left":
                            return 0 > b ? 0 : b + c.clientWidth > g.clientWidth ? g.clientWidth - c.clientWidth : b;
                        case "top":
                            return 0 > b ? 0 : b + c.clientHeight > g.clientHeight ? g.clientHeight - c.clientHeight : b;
                        case "width":
                            return 0 >= b ? 1 : b + c.offsetLeft > g.clientWidth ? g.clientWidth - c.offsetLeft : b;
                        case "height":
                            return 0 >= b ? 1 : b + c.offsetTop > g.clientHeight ?
                                g.clientHeight - c.offsetTop : b
                    }
                }, hideCover: function () {
                    this.cover.style.display = "none"
                }, showCover: function () {
                    var a = f.getXY(this.editor.ui.getDom()), b = f.getXY(this.editor.iframe);
                    f.setStyles(this.cover, {
                        width: this.editor.iframe.offsetWidth + "px",
                        height: this.editor.iframe.offsetHeight + "px",
                        top: b.y - a.y + "px",
                        left: b.x - a.x + "px",
                        position: "absolute",
                        display: ""
                    })
                }, show: function (a) {
                    this.resizer.style.display = "block";
                    a && this.attachTo(a);
                    f.on(this.resizer, "mousedown", this.proxy(this._eventHandler, this));
                    f.on(this.doc,
                        "mouseup", this.proxy(this._eventHandler, this));
                    this.showCover();
                    this.editor.fireEvent("afterscaleshow", this);
                    this.editor.fireEvent("saveScene")
                }, hide: function () {
                    this.hideCover();
                    this.resizer.style.display = "none";
                    f.un(this.resizer, "mousedown", this.proxy(this._eventHandler, this));
                    f.un(this.doc, "mouseup", this.proxy(this._eventHandler, this));
                    this.editor.fireEvent("afterscalehide", this)
                }, proxy: function (a, b) {
                    return function (c) {
                        return a.apply(b || this, arguments)
                    }
                }, attachTo: function (a) {
                    a = this.target = a;
                    var b =
                        this.resizer, c = f.getXY(a), g = f.getXY(this.editor.iframe), d = f.getXY(b.parentNode);
                    f.setStyles(b, {
                        width: a.width + "px",
                        height: a.height + "px",
                        left: g.x + c.x - this.editor.document.body.scrollLeft - d.x - parseInt(b.style.borderLeftWidth) + "px",
                        top: g.y + c.y - this.editor.document.body.scrollTop - d.y - parseInt(b.style.borderTopWidth) + "px"
                    })
                }
            }
        })();
        return function () {
            var b = this, a;
            b.setOpt("imageScaleEnabled", !0);
            !r.ie && b.options.imageScaleEnabled && b.addListener("click", function (c, h) {
                var g = b.selection.getRange().getClosedNode();
                if (g && "IMG" == g.tagName && "false" != b.body.contentEditable) {
                    if (!(-1 != g.className.indexOf("edui-faked-music") || g.getAttribute("anchorname") || f.hasClass(g, "loadingclass") || f.hasClass(g, "loaderrorclass"))) {
                        if (!a) {
                            a = new d;
                            a.init(b);
                            b.ui.getDom().appendChild(a.resizer);
                            var l = function (c) {
                                a.hide();
                                a.target && b.selection.getRange().selectNode(a.target).select()
                            }, k = function (a) {
                                var b = a.target || a.srcElement;
                                !b || void 0 !== b.className && -1 != b.className.indexOf("edui-editor-imagescale") || l(a)
                            }, m;
                            b.addListener("afterscaleshow",
                                function (a) {
                                    b.addListener("beforekeydown", l);
                                    b.addListener("beforemousedown", k);
                                    f.on(document, "keydown", l);
                                    f.on(document, "mousedown", k);
                                    b.selection.getNative().removeAllRanges()
                                });
                            b.addListener("afterscalehide", function (c) {
                                b.removeListener("beforekeydown", l);
                                b.removeListener("beforemousedown", k);
                                f.un(document, "keydown", l);
                                f.un(document, "mousedown", k);
                                c = a.target;
                                c.parentNode && b.selection.getRange().selectNode(c).select()
                            });
                            f.on(a.resizer, "mousedown", function (c) {
                                b.selection.getNative().removeAllRanges();
                                var e = c.target || c.srcElement;
                                e && -1 == e.className.indexOf("edui-editor-imagescale-hand") && (m = setTimeout(function () {
                                    a.hide();
                                    a.target && b.selection.getRange().selectNode(e).select()
                                }, 200))
                            });
                            f.on(a.resizer, "mouseup", function (a) {
                                (a = a.target || a.srcElement) && -1 == a.className.indexOf("edui-editor-imagescale-hand") && clearTimeout(m)
                            })
                        }
                        a.show(g)
                    }
                } else a && "none" != a.resizer.style.display && a.hide()
            });
            r.webkit && b.addListener("click", function (a, c) {
                "IMG" == c.target.tagName && "false" != b.body.contentEditable && (new L.Range(b.document)).selectNode(c.target).select()
            })
        }
    }();
    UE.plugin.register("autolink", function () {
        return r.ie ? {} : {
            bindEvents: {
                reset: function () {
                }, keydown: function (d, c) {
                    var b = c.keyCode || c.which;
                    if (32 == b || 13 == b) {
                        for (var b = this.selection.getNative(), a = b.getRangeAt(0).cloneRange(), e, h = a.startContainer; 1 == h.nodeType && 0 < a.startOffset;) {
                            h = a.startContainer.childNodes[a.startOffset - 1];
                            if (!h) break;
                            a.setStart(h, 1 == h.nodeType ? h.childNodes.length : h.nodeValue.length);
                            a.collapse(!0);
                            h = a.startContainer
                        }
                        do {
                            if (0 == a.startOffset) {
                                for (h = a.startContainer.previousSibling; h && 1 ==
                                h.nodeType;) h = h.lastChild;
                                if (!h || f.isFillChar(h)) break;
                                e = h.nodeValue.length
                            } else h = a.startContainer, e = a.startOffset;
                            a.setStart(h, e - 1);
                            e = a.toString().charCodeAt(0)
                        } while (160 != e && 32 != e);
                        if (a.toString().replace(RegExp(f.fillChar, "g"), "").match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
                            for (; a.toString().length && !/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(a.toString());) try {
                                a.setStart(a.startContainer, a.startOffset + 1)
                            } catch (g) {
                                for (h = a.startContainer; !(next = h.nextSibling);) {
                                    if (f.isBody(h)) return;
                                    h = h.parentNode
                                }
                                a.setStart(next, 0)
                            }
                            if (!f.findParentByTagName(a.startContainer, "a", !0)) {
                                e = this.document.createElement("a");
                                var h = this.document.createTextNode(" "), l;
                                this.undoManger && this.undoManger.save();
                                e.appendChild(a.extractContents());
                                e.href = e.innerHTML = e.innerHTML.replace(/<[^>]+>/g, "");
                                l = e.getAttribute("href").replace(RegExp(f.fillChar, "g"), "");
                                l = /^(?:https?:\/\/)/ig.test(l) ? l : "http://" + l;
                                e.setAttribute("_src", p.html(l));
                                e.href = p.html(l);
                                a.insertNode(e);
                                e.parentNode.insertBefore(h, e.nextSibling);
                                a.setStart(h, 0);
                                a.collapse(!0);
                                b.removeAllRanges();
                                b.addRange(a);
                                this.undoManger && this.undoManger.save()
                            }
                        }
                    }
                }
            }
        }
    }, function () {
        function d(b) {
            if (3 == b.nodeType) return null;
            if ("A" == b.nodeName) return b;
            for (b = b.lastChild; b;) {
                if ("A" == b.nodeName) return b;
                if (3 == b.nodeType) {
                    if (f.isWhitespace(b)) {
                        b = b.previousSibling;
                        continue
                    }
                    return null
                }
                b = b.lastChild
            }
        }

        var c = {37: 1, 38: 1, 39: 1, 40: 1, 13: 1, 32: 1};
        r.ie && this.addListener("keyup", function (b, a) {
            var e = a.keyCode;
            if (c[e]) {
                var h = this.selection.getRange(), g = h.startContainer;
                if (13 ==
                    e) {
                    for (; g && !f.isBody(g) && !f.isBlockElm(g);) g = g.parentNode;
                    g && !f.isBody(g) && "P" == g.nodeName && (h = g.previousSibling) && 1 == h.nodeType && (h = d(h)) && !h.getAttribute("_href") && f.remove(h, !0)
                } else 32 == e ? 3 == g.nodeType && /^\s$/.test(g.nodeValue) && (g = g.previousSibling) && "A" == g.nodeName && !g.getAttribute("_href") && f.remove(g, !0) : (g = f.findParentByTagName(g, "a", !0)) && !g.getAttribute("_href") && (e = h.createBookmark(), f.remove(g, !0), h.moveToBookmark(e).select(!0))
            }
        })
    });
    UE.plugins.autoheight = function () {
        function d() {
            var b =
                this;
            clearTimeout(g);
            l || b.queryCommandState && (!b.queryCommandState || 1 == b.queryCommandState("source")) || (g = setTimeout(function () {
                for (var c = b.body.lastChild; c && 1 != c.nodeType;) c = c.previousSibling;
                c && 1 == c.nodeType && (c.style.clear = "both", h = Math.max(f.getXY(c).y + c.offsetHeight + 25, Math.max(e.minFrameHeight, e.initialFrameHeight)), h != a && (h !== parseInt(b.iframe.parentNode.style.height) && (b.iframe.parentNode.style.height = h + "px"), b.body.style.height = h + "px", a = h), f.removeStyle(c, "clear"))
            }, 50))
        }

        var c = this;
        c.autoHeightEnabled =
            !1 !== c.options.autoHeightEnabled;
        if (c.autoHeightEnabled) {
            var b, a = 0, e = c.options, h, g, l;
            c.addListener("fullscreenchanged", function (a, b) {
                l = b
            });
            c.addListener("destroy", function () {
                c.removeListener("contentchange afterinserthtml keyup mouseup", d)
            });
            c.enableAutoHeight = function () {
                var a = this;
                if (a.autoHeightEnabled) {
                    var c = a.document;
                    a.autoHeightEnabled = !0;
                    b = c.body.style.overflowY;
                    c.body.style.overflowY = "hidden";
                    a.addListener("contentchange afterinserthtml keyup mouseup", d);
                    setTimeout(function () {
                        d.call(a)
                    }, r.gecko ?
                        100 : 0);
                    a.fireEvent("autoheightchanged", a.autoHeightEnabled)
                }
            };
            c.disableAutoHeight = function () {
                c.body.style.overflowY = b || "";
                c.removeListener("contentchange", d);
                c.removeListener("keyup", d);
                c.removeListener("mouseup", d);
                c.autoHeightEnabled = !1;
                c.fireEvent("autoheightchanged", c.autoHeightEnabled)
            };
            c.on("setHeight", function () {
                c.disableAutoHeight()
            });
            c.addListener("ready", function () {
                c.enableAutoHeight();
                var a;
                f.on(r.ie ? c.body : c.document, r.webkit ? "dragover" : "drop", function () {
                    clearTimeout(a);
                    a = setTimeout(function () {
                            d.call(c)
                        },
                        100)
                });
                var b;
                window.onscroll = function () {
                    null === b ? b = this.scrollY : 0 == this.scrollY && 0 != b && (c.window.scrollTo(0, 0), b = null)
                }
            })
        }
    };
    UE.plugins.autofloat = function () {
        function d() {
            var a = document.body.style;
            a.backgroundImage = 'url("about:blank")';
            a.backgroundAttachment = "fixed"
        }

        function c() {
            y = !0;
            n.parentNode && n.parentNode.removeChild(n);
            q.style.cssText = m
        }

        function b() {
            var b = w(a.container), e = a.options.toolbarTopOffset || 0;
            if (0 > b.top && b.bottom - q.offsetHeight > e) {
                var b = f.getXY(q), e = f.getComputedStyle(q, "position"), g =
                    f.getComputedStyle(q, "left");
                q.style.width = q.offsetWidth + "px";
                q.style.zIndex = 1 * a.options.zIndex + 1;
                q.parentNode.insertBefore(n, q);
                l || k && r.ie ? ("absolute" != q.style.position && (q.style.position = "absolute"), q.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - t + h + "px") : (r.ie7Compat && y && (y = !1, q.style.left = f.getXY(q).x - document.documentElement.getBoundingClientRect().left + 2 + "px"), "fixed" != q.style.position && (q.style.position = "fixed", q.style.top = h + "px", ("absolute" == e || "relative" == e) && parseFloat(g) &&
                (q.style.left = b.x + "px")))
            } else c()
        }

        var a = this, e = a.getLang();
        a.setOpt({topOffset: 0});
        var h = a.options.topOffset;
        if (!1 !== a.options.autoFloatEnabled) {
            var g = UE.ui.uiUtils, l = r.ie && 6 >= r.version, k = r.quirks, m, n = document.createElement("div"), q, t,
                w, y = !0, u = p.defer(function () {
                    b()
                }, r.ie ? 200 : 100, !0);
            a.addListener("destroy", function () {
                f.un(window, ["scroll", "resize"], b);
                a.removeListener("keydown", u)
            });
            a.addListener("ready", function () {
                var h;
                UE.ui ? h = 1 : (alert(e.autofloatMsg), h = 0);
                h && a.ui && (w = g.getClientRect, q = a.ui.getDom("toolbarbox"),
                    t = w(q).top, m = q.style.cssText, n.style.height = q.offsetHeight + "px", l && d(), f.on(window, ["scroll", "resize"], b), a.addListener("keydown", u), a.addListener("beforefullscreenchange", function (a, b) {
                    b && c()
                }), a.addListener("fullscreenchanged", function (a, c) {
                    c || b()
                }), a.addListener("sourcemodechanged", function (a, c) {
                    setTimeout(function () {
                        b()
                    }, 0)
                }), a.addListener("clearDoc", function () {
                    setTimeout(function () {
                        b()
                    }, 0)
                }))
            })
        }
    };
    UE.plugins.video = function () {
        function d(a, c, d, g, f, k, m) {
            var n;
            switch (m) {
                case "image":
                    n = "<img " + (g ?
                        'id="' + g + '"' : "") + ' width="' + c + '" height="' + d + '" _url="' + a + '" class="' + k.replace(/\bvideo-js\b/, "") + '" src="' + b.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" style="background:url(' + b.options.UEDITOR_HOME_URL + "themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" + (f ? "float:" + f + ";" : "") + '" />';
                    break;
                case "embed":
                    n = '<embed type="application/x-shockwave-flash" class="' + k + '" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + p.html(a) + '" width="' +
                        c + '" height="' + d + '"' + (f ? ' style="float:' + f + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
                    break;
                case "video":
                    m = a.substr(a.lastIndexOf(".") + 1), "ogv" == m && (m = "ogg"), n = "<video" + (g ? ' id="' + g + '"' : "") + ' class="' + k + ' video-js" ' + (f ? ' style="float:' + f + '"' : "") + ' controls preload="none" width="' + c + '" height="' + d + '" src="' + a + '" data-setup="{}"><source src="' + a + '" type="video/' + m + '" /></video>'
            }
            return n
        }

        function c(a, b) {
            p.each(a.getNodesByTagName(b ?
                "img" : "embed video"), function (a) {
                var c = a.getAttr("class");
                if (c && -1 != c.indexOf("edui-faked-video")) {
                    var f = d(b ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", c, b ? "embed" : "image");
                    a.parentNode.replaceChild(UE.uNode.createElement(f), a)
                }
                c && -1 != c.indexOf("edui-upload-video") && (f = d(b ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", c, b ? "video" : "image"), a.parentNode.replaceChild(UE.uNode.createElement(f),
                    a))
            })
        }

        var b = this;
        b.addOutputRule(function (a) {
            c(a, !0)
        });
        b.addInputRule(function (a) {
            c(a)
        });
        b.commands.insertvideo = {
            execCommand: function (a, c, h) {
                c = p.isArray(c) ? c : [c];
                var g = [], l;
                a = 0;
                for (var k, m = c.length; a < m; a++) k = c[a], l = "upload" == h ? "edui-upload-video video-js vjs-default-skin" : "edui-faked-video", g.push(d(k.url, k.width || 420, k.height || 280, "tmpVedio" + a, null, l, "image"));
                b.execCommand("inserthtml", g.join(""), !0);
                h = this.selection.getRange();
                a = 0;
                for (m = c.length; a < m; a++) g = this.document.getElementById("tmpVedio" +
                    a), f.removeAttributes(g, "id"), h.selectNode(g).select(), b.execCommand("imagefloat", c[a].align)
            }, queryCommandState: function () {
                var a = b.selection.getRange().getClosedNode();
                return !a || "edui-faked-video" != a.className && -1 == a.className.indexOf("edui-upload-video") ? 0 : 1
            }
        }
    };
    (function () {
        var d = UE.UETable = function (c) {
            this.table = c;
            this.indexTable = [];
            this.selectedTds = [];
            this.cellsRange = {};
            this.update(c)
        };
        d.removeSelectedClass = function (c) {
            p.each(c, function (b) {
                f.removeClasses(b, "selectTdClass")
            })
        };
        d.addSelectedClass =
            function (c) {
                p.each(c, function (b) {
                    f.addClass(b, "selectTdClass")
                })
            };
        d.isEmptyBlock = function (c) {
            var b = RegExp(f.fillChar, "g");
            if (0 < c[r.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(b, "").length) return 0;
            for (var a in v.$isNotEmpty) if (v.$isNotEmpty.hasOwnProperty(a) && c.getElementsByTagName(a).length) return 0;
            return 1
        };
        d.getWidth = function (c) {
            return c ? parseInt(f.getComputedStyle(c, "width"), 10) : 0
        };
        d.getTableCellAlignState = function (c) {
            !p.isArray(c) && (c = [c]);
            var b = {}, a = ["align", "valign"], e = null,
                d = !0;
            p.each(c, function (c) {
                p.each(a, function (a) {
                    e = c.getAttribute(a);
                    if (!b[a] && e) b[a] = e; else if (!b[a] || e !== b[a]) return d = !1
                });
                return d
            });
            return d ? b : null
        };
        d.getTableItemsByRange = function (c) {
            var b = c.selection.getStart();
            b && b.id && 0 === b.id.indexOf("_baidu_bookmark_start_") && b.nextSibling && (b = b.nextSibling);
            var a = (c = b && f.findParentByTagName(b, ["td", "th"], !0)) && c.parentNode,
                b = b && f.findParentByTagName(b, "caption", !0);
            return {cell: c, tr: a, table: b ? b.parentNode : a && a.parentNode.parentNode, caption: b}
        };
        d.getUETableBySelected =
            function (c) {
                return (c = d.getTableItemsByRange(c).table) && c.ueTable && c.ueTable.selectedTds.length ? c.ueTable : null
            };
        d.getDefaultValue = function (c, b) {
            var a = {thin: "0px", medium: "1px", thick: "2px"}, e, d, g;
            if (b) l = b.getElementsByTagName("td")[0], g = f.getComputedStyle(b, "border-left-width"), e = parseInt(a[g] || g, 10), g = f.getComputedStyle(l, "padding-left"), d = parseInt(a[g] || g, 10), g = f.getComputedStyle(l, "border-left-width"), a = parseInt(a[g] || g, 10); else {
                b = c.document.createElement("table");
                b.insertRow(0).insertCell(0).innerHTML =
                    "xxx";
                c.body.appendChild(b);
                var l = b.getElementsByTagName("td")[0];
                g = f.getComputedStyle(b, "border-left-width");
                e = parseInt(a[g] || g, 10);
                g = f.getComputedStyle(l, "padding-left");
                d = parseInt(a[g] || g, 10);
                g = f.getComputedStyle(l, "border-left-width");
                a = parseInt(a[g] || g, 10);
                f.remove(b)
            }
            return {tableBorder: e, tdPadding: d, tdBorder: a}
        };
        d.getUETable = function (c) {
            var b = c.tagName.toLowerCase();
            c = "td" == b || "th" == b || "caption" == b ? f.findParentByTagName(c, "table", !0) : c;
            c.ueTable || (c.ueTable = new d(c));
            return c.ueTable
        };
        d.cloneCell =
            function (c, b, a) {
                if (!c || p.isString(c)) return this.table.ownerDocument.createElement(c || "td");
                var e = f.hasClass(c, "selectTdClass");
                e && f.removeClasses(c, "selectTdClass");
                var d = c.cloneNode(!0);
                b && (d.rowSpan = d.colSpan = 1);
                !a && f.removeAttributes(d, "width height");
                !a && f.removeAttributes(d, "style");
                d.style.borderLeftStyle = "";
                d.style.borderTopStyle = "";
                d.style.borderLeftColor = c.style.borderRightColor;
                d.style.borderLeftWidth = c.style.borderRightWidth;
                d.style.borderTopColor = c.style.borderBottomColor;
                d.style.borderTopWidth =
                    c.style.borderBottomWidth;
                e && f.addClass(c, "selectTdClass");
                return d
            };
        d.prototype = {
            getMaxRows: function () {
                for (var c = this.table.rows, b = 1, a = 0, e; e = c[a]; a++) {
                    for (var d = 1, g = 0, f; f = e.cells[g++];) d = Math.max(f.rowSpan || 1, d);
                    b = Math.max(d + a, b)
                }
                return b
            }, getMaxCols: function () {
                for (var c = this.table.rows, b = 0, a = {}, e = 0, d; d = c[e]; e++) {
                    for (var g = 0, f = 0, k; k = d.cells[f++];) if (g += k.colSpan || 1, k.rowSpan && 1 < k.rowSpan) for (var m = 1; m < k.rowSpan; m++) a["row_" + (e + m)] ? a["row_" + (e + m)]++ : a["row_" + (e + m)] = k.colSpan || 1;
                    g += a["row_" + e] || 0;
                    b = Math.max(g, b)
                }
                return b
            }, getCellColIndex: function (c) {
            }, getHSideCell: function (c, b) {
                try {
                    var a = this.getCellInfo(c), e, d, g = this.selectedTds.length, f = this.cellsRange;
                    if (!b && (g ? !f.beginColIndex : !a.colIndex) || b && (g ? f.endColIndex == this.colsNum - 1 : a.colIndex == this.colsNum - 1)) return null;
                    e = g ? f.beginRowIndex : a.rowIndex;
                    d = b ? g ? f.endColIndex + 1 : a.colIndex + 1 : g ? f.beginColIndex - 1 : 1 > a.colIndex ? 0 : a.colIndex - 1;
                    return this.getCell(this.indexTable[e][d].rowIndex, this.indexTable[e][d].cellIndex)
                } catch (k) {
                }
            }, getTabNextCell: function (c,
                                         b) {
                var a = this.getCellInfo(c), e = b || a.rowIndex, a = a.colIndex + 1 + (a.colSpan - 1), d;
                try {
                    d = this.getCell(this.indexTable[e][a].rowIndex, this.indexTable[e][a].cellIndex)
                } catch (g) {
                    try {
                        e = 1 * e + 1, a = 0, d = this.getCell(this.indexTable[e][a].rowIndex, this.indexTable[e][a].cellIndex)
                    } catch (f) {
                    }
                }
                return d
            }, getVSideCell: function (c, b, a) {
                try {
                    var e = this.getCellInfo(c), d, g, f = this.selectedTds.length && !a, k = this.cellsRange;
                    if (!b && 0 == e.rowIndex || b && (f ? k.endRowIndex == this.rowsNum - 1 : e.rowIndex + e.rowSpan > this.rowsNum - 1)) return null;
                    d = b ? f ? k.endRowIndex + 1 : e.rowIndex + e.rowSpan : f ? k.beginRowIndex - 1 : e.rowIndex - 1;
                    g = f ? k.beginColIndex : e.colIndex;
                    return this.getCell(this.indexTable[d][g].rowIndex, this.indexTable[d][g].cellIndex)
                } catch (m) {
                }
            }, getSameEndPosCells: function (c, b) {
                try {
                    for (var a = "x" === b.toLowerCase(), e = f.getXY(c)[a ? "x" : "y"] + c["offset" + (a ? "Width" : "Height")], d = this.table.rows, g = null, l = [], k = 0; k < this.rowsNum; k++) for (var g = d[k].cells, m = 0, n; n = g[m++];) {
                        var q = f.getXY(n)[a ? "x" : "y"] + n["offset" + (a ? "Width" : "Height")];
                        if (q > e && a) break;
                        if (c ==
                            n || e == q) if (1 == n[a ? "colSpan" : "rowSpan"] && l.push(n), a) break
                    }
                    return l
                } catch (t) {
                }
            }, setCellContent: function (c, b) {
                c.innerHTML = b || (r.ie ? f.fillChar : "<br />")
            }, cloneCell: d.cloneCell, getSameStartPosXCells: function (c) {
                try {
                    var b = f.getXY(c).x + c.offsetWidth, a = this.table.rows, e;
                    c = [];
                    for (var d = 0; d < this.rowsNum; d++) {
                        e = a[d].cells;
                        for (var g = 0, l; l = e[g++];) {
                            var k = f.getXY(l).x;
                            if (k > b) break;
                            if (k == b && 1 == l.colSpan) {
                                c.push(l);
                                break
                            }
                        }
                    }
                    return c
                } catch (m) {
                }
            }, update: function (c) {
                this.table = c || this.table;
                this.selectedTds = [];
                this.cellsRange =
                    {};
                this.indexTable = [];
                c = this.table.rows;
                for (var b = this.getMaxRows(), a = b - c.length, e = this.getMaxCols(); a--;) this.table.insertRow(c.length);
                this.rowsNum = b;
                this.colsNum = e;
                for (var a = 0, d = c.length; a < d; a++) this.indexTable[a] = Array(e);
                for (var a = 0, g; g = c[a]; a++) {
                    var d = 0, l;
                    for (g = g.cells; l = g[d]; d++) {
                        l.rowSpan > b && (l.rowSpan = b);
                        var k = d, m = l.rowSpan || 1;
                        for (l = l.colSpan || 1; this.indexTable[a][k];) k++;
                        for (var n = 0; n < m; n++) for (var q = 0; q < l; q++) this.indexTable[a + n][k + q] = {
                            rowIndex: a,
                            cellIndex: d,
                            colIndex: k,
                            rowSpan: m,
                            colSpan: l
                        }
                    }
                }
                for (n =
                         0; n < b; n++) for (q = 0; q < e; q++) void 0 === this.indexTable[n][q] && (g = c[n], l = (l = g.cells[g.cells.length - 1]) ? l.cloneNode(!0) : this.table.ownerDocument.createElement("td"), this.setCellContent(l), 1 !== l.colSpan && (l.colSpan = 1), 1 !== l.rowSpan && (l.rowSpan = 1), g.appendChild(l), this.indexTable[n][q] = {
                    rowIndex: n,
                    cellIndex: l.cellIndex,
                    colIndex: q,
                    rowSpan: 1,
                    colSpan: 1
                });
                c = f.getElementsByTagName(this.table, "td");
                var t = [];
                p.each(c, function (a) {
                    f.hasClass(a, "selectTdClass") && t.push(a)
                });
                t.length && (b = t[t.length - 1], c = this.getCellInfo(t[0]),
                    b = this.getCellInfo(b), this.selectedTds = t, this.cellsRange = {
                    beginRowIndex: c.rowIndex,
                    beginColIndex: c.colIndex,
                    endRowIndex: b.rowIndex + b.rowSpan - 1,
                    endColIndex: b.colIndex + b.colSpan - 1
                });
                if (!f.hasClass(this.table.rows[0], "firstRow")) for (f.addClass(this.table.rows[0], "firstRow"), a = 1; a < this.table.rows.length; a++) f.removeClasses(this.table.rows[a], "firstRow")
            }, getCellInfo: function (c) {
                if (c) {
                    var b = c.cellIndex;
                    c = c.parentNode.rowIndex;
                    for (var a = this.indexTable[c], e = this.colsNum, d = b; d < e; d++) {
                        var g = a[d];
                        if (g.rowIndex ===
                            c && g.cellIndex === b) return g
                    }
                }
            }, getCell: function (c, b) {
                return c < this.rowsNum && this.table.rows[c].cells[b] || null
            }, deleteCell: function (c, b) {
                b = "number" == typeof b ? b : c.parentNode.rowIndex;
                this.table.rows[b].deleteCell(c.cellIndex)
            }, getCellsRange: function (c, b) {
                function a(b, c, g, d) {
                    var k = b, h = c, f = g, l = d, n, m, q;
                    if (0 < b) for (m = c; m < d; m++) n = e.indexTable[b][m], q = n.rowIndex, q < b && (k = Math.min(q, k));
                    if (d < e.colsNum) for (q = b; q < g; q++) n = e.indexTable[q][d], m = n.colIndex + n.colSpan - 1, m > d && (l = Math.max(m, l));
                    if (g < e.rowsNum) for (m = c; m <
                    d; m++) n = e.indexTable[g][m], q = n.rowIndex + n.rowSpan - 1, q > g && (f = Math.max(q, f));
                    if (0 < c) for (q = b; q < g; q++) n = e.indexTable[q][c], m = n.colIndex, m < c && (h = Math.min(n.colIndex, h));
                    return k != b || h != c || f != g || l != d ? a(k, h, f, l) : {
                        beginRowIndex: b,
                        beginColIndex: c,
                        endRowIndex: g,
                        endColIndex: d
                    }
                }

                try {
                    var e = this, d = e.getCellInfo(c);
                    if (c === b) return {
                        beginRowIndex: d.rowIndex,
                        beginColIndex: d.colIndex,
                        endRowIndex: d.rowIndex + d.rowSpan - 1,
                        endColIndex: d.colIndex + d.colSpan - 1
                    };
                    var g = e.getCellInfo(b), f = Math.min(d.rowIndex, g.rowIndex), k = Math.min(d.colIndex,
                        g.colIndex), m = Math.max(d.rowIndex + d.rowSpan - 1, g.rowIndex + g.rowSpan - 1),
                        n = Math.max(d.colIndex + d.colSpan - 1, g.colIndex + g.colSpan - 1);
                    return a(f, k, m, n)
                } catch (q) {
                }
            }, getCells: function (c) {
                this.clearSelected();
                for (var b = c.beginColIndex, a = c.endRowIndex, e = c.endColIndex, d, g, f = {}, k = [], m = c.beginRowIndex; m <= a; m++) for (var n = b; n <= e; n++) {
                    c = this.indexTable[m][n];
                    d = c.rowIndex;
                    g = c.colIndex;
                    var q = d + "|" + g;
                    if (!f[q]) {
                        f[q] = 1;
                        if (d < m || g < n || d + c.rowSpan - 1 > a || g + c.colSpan - 1 > e) return null;
                        k.push(this.getCell(d, c.cellIndex))
                    }
                }
                return k
            },
            clearSelected: function () {
                d.removeSelectedClass(this.selectedTds);
                this.selectedTds = [];
                this.cellsRange = {}
            }, setSelected: function (c) {
                var b = this.getCells(c);
                d.addSelectedClass(b);
                this.selectedTds = b;
                this.cellsRange = c
            }, isFullRow: function () {
                var c = this.cellsRange;
                return c.endColIndex - c.beginColIndex + 1 == this.colsNum
            }, isFullCol: function () {
                var c = this.cellsRange, b = this.table.getElementsByTagName("th"),
                    c = c.endRowIndex - c.beginRowIndex + 1;
                return b.length ? c == this.rowsNum || c == this.rowsNum - 1 : c == this.rowsNum
            }, getNextCell: function (c,
                                      b, a) {
                try {
                    var e = this.getCellInfo(c), d, g, f = this.selectedTds.length && !a, k = this.cellsRange;
                    if (!b && 0 == e.rowIndex || b && (f ? k.endRowIndex == this.rowsNum - 1 : e.rowIndex + e.rowSpan > this.rowsNum - 1)) return null;
                    d = b ? f ? k.endRowIndex + 1 : e.rowIndex + e.rowSpan : f ? k.beginRowIndex - 1 : e.rowIndex - 1;
                    g = f ? k.beginColIndex : e.colIndex;
                    return this.getCell(this.indexTable[d][g].rowIndex, this.indexTable[d][g].cellIndex)
                } catch (m) {
                }
            }, getPreviewCell: function (c, b) {
                try {
                    var a = this.getCellInfo(c), e, d, g = this.selectedTds.length, f = this.cellsRange;
                    if (!b && (g ? !f.beginColIndex : !a.colIndex) || b && (g ? f.endColIndex == this.colsNum - 1 : a.rowIndex > this.colsNum - 1)) return null;
                    e = b ? g ? f.beginRowIndex : 1 > a.rowIndex ? 0 : a.rowIndex - 1 : g ? f.beginRowIndex : a.rowIndex;
                    d = b ? g ? f.endColIndex + 1 : a.colIndex : g ? f.beginColIndex - 1 : 1 > a.colIndex ? 0 : a.colIndex - 1;
                    return this.getCell(this.indexTable[e][d].rowIndex, this.indexTable[e][d].cellIndex)
                } catch (k) {
                }
            }, moveContent: function (c, b) {
                if (!d.isEmptyBlock(b)) if (d.isEmptyBlock(c)) c.innerHTML = b.innerHTML; else {
                    var a = c.lastChild;
                    for (3 != a.nodeType &&
                         v.$block[a.tagName] || c.appendChild(c.ownerDocument.createElement("br")); a = b.firstChild;) c.appendChild(a)
                }
            }, mergeRight: function (c) {
                var b = this.getCellInfo(c), a = this.indexTable[b.rowIndex][b.colIndex + b.colSpan],
                    e = this.getCell(a.rowIndex, a.cellIndex);
                c.colSpan = b.colSpan + a.colSpan;
                c.removeAttribute("width");
                this.moveContent(c, e);
                this.deleteCell(e, a.rowIndex);
                this.update()
            }, mergeDown: function (c) {
                var b = this.getCellInfo(c), a = this.indexTable[b.rowIndex + b.rowSpan][b.colIndex],
                    e = this.getCell(a.rowIndex, a.cellIndex);
                c.rowSpan = b.rowSpan + a.rowSpan;
                c.removeAttribute("height");
                this.moveContent(c, e);
                this.deleteCell(e, a.rowIndex);
                this.update()
            }, mergeRange: function () {
                var c = this.cellsRange,
                    b = this.getCell(c.beginRowIndex, this.indexTable[c.beginRowIndex][c.beginColIndex].cellIndex);
                if ("TH" == b.tagName && c.endRowIndex !== c.beginRowIndex) var a = this.indexTable,
                    c = this.getCellInfo(b), b = this.getCell(1, a[1][c.colIndex].cellIndex),
                    c = this.getCellsRange(b, this.getCell(a[this.rowsNum - 1][c.colIndex].rowIndex, a[this.rowsNum - 1][c.colIndex].cellIndex));
                for (var e = this.getCells(c), a = 0, d; d = e[a++];) d !== b && (this.moveContent(b, d), this.deleteCell(d));
                b.rowSpan = c.endRowIndex - c.beginRowIndex + 1;
                1 < b.rowSpan && b.removeAttribute("height");
                b.colSpan = c.endColIndex - c.beginColIndex + 1;
                1 < b.colSpan && b.removeAttribute("width");
                b.rowSpan == this.rowsNum && 1 != b.colSpan && (b.colSpan = 1);
                if (b.colSpan == this.colsNum && 1 != b.rowSpan) {
                    e = b.parentNode.rowIndex;
                    if (this.table.deleteRow) for (a = e + 1, e += 1, c = b.rowSpan; a < c; a++) this.table.deleteRow(e); else for (a = 0, c = b.rowSpan - 1; a < c; a++) d = this.table.rows[e +
                    1], d.parentNode.removeChild(d);
                    b.rowSpan = 1
                }
                this.update()
            }, insertRow: function (c, b) {
                function a(a, b, c) {
                    0 == a ? (a = (c.nextSibling || c.previousSibling).cells[a], "TH" == a.tagName && (a = b.ownerDocument.createElement("th"), a.appendChild(b.firstChild), c.insertBefore(a, b), f.remove(b))) : "TH" == b.tagName && (a = b.ownerDocument.createElement("td"), a.appendChild(b.firstChild), c.insertBefore(a, b), f.remove(b))
                }

                var e = this.colsNum, d = this.table.insertRow(c), g,
                    l = "string" == typeof b && "TH" == b.toUpperCase();
                if (0 == c || c == this.rowsNum) for (var k =
                    0; k < e; k++) g = this.cloneCell(b, !0), this.setCellContent(g), g.getAttribute("vAlign") && g.setAttribute("vAlign", g.getAttribute("vAlign")), d.appendChild(g), l || a(k, g, d); else for (var m = this.indexTable[c], k = 0; k < e; k++) {
                    var n = m[k];
                    n.rowIndex < c ? (g = this.getCell(n.rowIndex, n.cellIndex), g.rowSpan = n.rowSpan + 1) : (g = this.cloneCell(b, !0), this.setCellContent(g), d.appendChild(g));
                    l || a(k, g, d)
                }
                this.update();
                return d
            }, deleteRow: function (c) {
                for (var b = this.table.rows[c], a = this.indexTable[c], e = this.colsNum, d = 0, g = 0; g < e;) {
                    var l =
                        a[g], k = this.getCell(l.rowIndex, l.cellIndex);
                    if (1 < k.rowSpan && l.rowIndex == c) {
                        l = k.cloneNode(!0);
                        l.rowSpan = k.rowSpan - 1;
                        l.innerHTML = "";
                        k.rowSpan = 1;
                        var m = c + 1, n = this.table.rows[m], m = this.getPreviewMergedCellsNum(m, g) - d;
                        m < g ? (m = g - m - 1, f.insertAfter(n.cells[m], l)) : n.cells.length && n.insertBefore(l, n.cells[0]);
                        d += 1
                    }
                    g += k.colSpan || 1
                }
                c = [];
                d = {};
                for (g = 0; g < e; g++) k = a[g].rowIndex, l = a[g].cellIndex, n = k + "_" + l, d[n] || (d[n] = 1, k = this.getCell(k, l), c.push(k));
                var q = [];
                p.each(c, function (a) {
                    1 == a.rowSpan ? a.parentNode.removeChild(a) :
                        q.push(a)
                });
                p.each(q, function (a) {
                    a.rowSpan--
                });
                b.parentNode.removeChild(b);
                this.update()
            }, insertCol: function (c, b, a) {
                function e(a, b, c) {
                    0 == a ? (a = b.nextSibling || b.previousSibling, "TH" == a.tagName && (a = b.ownerDocument.createElement("th"), a.appendChild(b.firstChild), c.insertBefore(a, b), f.remove(b))) : "TH" == b.tagName && (a = b.ownerDocument.createElement("td"), a.appendChild(b.firstChild), c.insertBefore(a, b), f.remove(b))
                }

                var d = this.rowsNum, g = 0, l, k,
                    m = parseInt((this.table.offsetWidth - 20 * (this.colsNum + 1) - (this.colsNum +
                        1)) / (this.colsNum + 1), 10), n = "string" == typeof b && "TH" == b.toUpperCase(), q;
                if (0 == c || c == this.colsNum) for (; g < d; g++) l = this.table.rows[g], q = l.cells[0 == c ? c : l.cells.length], k = this.cloneCell(b, !0), this.setCellContent(k), k.setAttribute("vAlign", k.getAttribute("vAlign")), q && k.setAttribute("width", q.getAttribute("width")), c ? f.insertAfter(l.cells[l.cells.length - 1], k) : l.insertBefore(k, l.cells[0]), n || e(g, k, l); else for (; g < d; g++) q = this.indexTable[g][c], q.colIndex < c ? (k = this.getCell(q.rowIndex, q.cellIndex), k.colSpan =
                    q.colSpan + 1) : (l = this.table.rows[g], q = l.cells[q.cellIndex], k = this.cloneCell(b, !0), this.setCellContent(k), k.setAttribute("vAlign", k.getAttribute("vAlign")), q && k.setAttribute("width", q.getAttribute("width")), q ? l.insertBefore(k, q) : l.appendChild(k)), n || e(g, k, l);
                this.update();
                this.updateWidth(m, a || {tdPadding: 10, tdBorder: 1})
            }, updateWidth: function (c, b) {
                var a = this.table, e = d.getWidth(a) - 2 * b.tdPadding - b.tdBorder + c;
                e < a.ownerDocument.body.offsetWidth ? a.setAttribute("width", e) : (a = f.getElementsByTagName(this.table,
                    "td th"), p.each(a, function (a) {
                    a.setAttribute("width", c)
                }))
            }, deleteCol: function (c) {
                for (var b = this.indexTable, a = this.table.rows, e = this.table.getAttribute("width"), d = 0, g = this.rowsNum, f = {}, k = 0; k < g;) {
                    var m = b[k][c], n = m.rowIndex + "_" + m.colIndex;
                    f[n] || (f[n] = 1, n = this.getCell(m.rowIndex, m.cellIndex), d || (d = n && parseInt(n.offsetWidth / n.colSpan, 10).toFixed(0)), 1 < n.colSpan ? n.colSpan-- : a[k].deleteCell(m.cellIndex), k += m.rowSpan || 1)
                }
                this.table.setAttribute("width", e - d);
                this.update()
            }, splitToCells: function (c) {
                var b =
                    this;
                c = this.splitToRows(c);
                p.each(c, function (a) {
                    b.splitToCols(a)
                })
            }, splitToRows: function (c) {
                var b = this.getCellInfo(c), a = b.rowIndex, e = b.colIndex, d = [];
                c.rowSpan = 1;
                d.push(c);
                for (var g = a, f = a + b.rowSpan; g < f; g++) if (g != a) {
                    var k = this.table.rows[g].insertCell(e - this.getPreviewMergedCellsNum(g, e));
                    k.colSpan = b.colSpan;
                    this.setCellContent(k);
                    k.setAttribute("vAlign", c.getAttribute("vAlign"));
                    k.setAttribute("align", c.getAttribute("align"));
                    c.style.cssText && (k.style.cssText = c.style.cssText);
                    d.push(k)
                }
                this.update();
                return d
            }, getPreviewMergedCellsNum: function (c, b) {
                for (var a = this.indexTable[c], e = 0, d = 0; d < b;) var g = a[d].colSpan, e = e + (g - (a[d].rowIndex == c ? 1 : 0)), d = d + g;
                return e
            }, splitToCols: function (c) {
                var b = (c.offsetWidth / c.colSpan - 22).toFixed(0), a = this.getCellInfo(c), e = a.rowIndex,
                    d = a.colIndex, g = [];
                c.colSpan = 1;
                c.setAttribute("width", b);
                g.push(c);
                for (var l = d, k = d + a.colSpan; l < k; l++) if (l != d) {
                    var m = this.table.rows[e], n = m.insertCell(this.indexTable[e][l].cellIndex + 1);
                    n.rowSpan = a.rowSpan;
                    this.setCellContent(n);
                    n.setAttribute("vAlign",
                        c.getAttribute("vAlign"));
                    n.setAttribute("align", c.getAttribute("align"));
                    n.setAttribute("width", b);
                    c.style.cssText && (n.style.cssText = c.style.cssText);
                    if ("TH" == c.tagName) {
                        var q = c.ownerDocument.createElement("th");
                        q.appendChild(n.firstChild);
                        q.setAttribute("vAlign", c.getAttribute("vAlign"));
                        q.rowSpan = n.rowSpan;
                        m.insertBefore(q, n);
                        f.remove(n)
                    }
                    g.push(n)
                }
                this.update();
                return g
            }, isLastCell: function (c, b, a) {
                b = b || this.rowsNum;
                a = a || this.colsNum;
                c = this.getCellInfo(c);
                return c.rowIndex + c.rowSpan == b && c.colIndex +
                    c.colSpan == a
            }, getLastCell: function (c) {
                c = c || this.table.getElementsByTagName("td");
                this.getCellInfo(c[0]);
                var b = this, a = c[0], e = a.parentNode, d = 0, g = 0, f;
                p.each(c, function (a) {
                    a.parentNode == e && (g += a.colSpan || 1);
                    d += a.rowSpan * a.colSpan || 1
                });
                f = d / g;
                p.each(c, function (c) {
                    if (b.isLastCell(c, f, g)) return a = c, !1
                });
                return a
            }, selectRow: function (c) {
                var b = this.indexTable[c];
                c = this.getCell(b[0].rowIndex, b[0].cellIndex);
                b = this.getCell(b[this.colsNum - 1].rowIndex, b[this.colsNum - 1].cellIndex);
                c = this.getCellsRange(c, b);
                this.setSelected(c)
            },
            selectTable: function () {
                var c = this.table.getElementsByTagName("td"), c = this.getCellsRange(c[0], c[c.length - 1]);
                this.setSelected(c)
            }, setBackground: function (c, b) {
                if ("string" === typeof b) p.each(c, function (a) {
                    a.style.backgroundColor = b
                }); else if ("object" === typeof b) {
                    b = p.extend({repeat: !0, colorList: ["#ddd", "#fff"]}, b);
                    for (var a = this.getCellInfo(c[0]).rowIndex, e = 0, d = b.colorList, g = function (a, b, c) {
                        return a[b] ? a[b] : c ? a[b % a.length] : ""
                    }, f = 0, k; k = c[f++];) {
                        var m = this.getCellInfo(k);
                        k.style.backgroundColor = g(d, a + e ==
                        m.rowIndex ? e : ++e, b.repeat)
                    }
                }
            }, removeBackground: function (c) {
                p.each(c, function (b) {
                    b.style.backgroundColor = ""
                })
            }
        }
    })();
    (function () {
        function d(b, e) {
            var d = f.getElementsByTagName(b, "td th");
            p.each(d, function (a) {
                a.removeAttribute("width")
            });
            b.setAttribute("width", c(e, !0, a.getDefaultValue(e, b)));
            var h = [];
            setTimeout(function () {
                p.each(d, function (a) {
                    1 == a.colSpan && h.push(a.offsetWidth)
                });
                p.each(d, function (a, b) {
                    1 == a.colSpan && a.setAttribute("width", h[b] + "")
                })
            }, 0)
        }

        function c(a, b, c) {
            var e = a.body;
            return e.offsetWidth -
                (b ? 2 * parseInt(f.getComputedStyle(e, "margin-left"), 10) : 0) - 2 * c.tableBorder - (a.options.offsetWidth || 0)
        }

        function b(a) {
            if (a = e(a).cell) {
                var b = h(a);
                return b.selectedTds.length ? b.selectedTds : [a]
            }
            return []
        }

        var a = UE.UETable, e = function (b) {
            return a.getTableItemsByRange(b)
        }, h = function (b) {
            return a.getUETable(b)
        };
        UE.commands.inserttable = {
            queryCommandState: function () {
                return e(this).table ? -1 : 0
            }, execCommand: function (b, c) {
                c || (c = p.extend({}, {
                    numCols: this.options.defaultCols,
                    numRows: this.options.defaultRows,
                    tdvalign: this.options.tdvalign
                }));
                var e = this.selection.getRange().startContainer, e = f.findParent(e, function (a) {
                        return f.isBlockElm(a)
                    }, !0) || this.body, d = a.getDefaultValue(this, void 0),
                    e = Math.floor(e.offsetWidth / c.numCols - 2 * d.tdPadding - d.tdBorder);
                !c.tdvalign && (c.tdvalign = this.options.tdvalign);
                this.execCommand("inserthtml", function (a, b) {
                    for (var c = [], e = a.numRows, d = a.numCols, g = 0; g < e; g++) {
                        c.push("<tr" + (0 == g ? ' class="firstRow"' : "") + ">");
                        for (var k = 0; k < d; k++) c.push('<td width="' + b + '"  vAlign="' + a.tdvalign + '" >' + (r.ie && 11 > r.version ? f.fillChar :
                            "<br/>") + "</td>");
                        c.push("</tr>")
                    }
                    return "<table><tbody>" + c.join("") + "</tbody></table>"
                }(c, e))
            }
        };
        UE.commands.insertparagraphbeforetable = {
            queryCommandState: function () {
                return e(this).cell ? 0 : -1
            }, execCommand: function () {
                var a = e(this).table;
                if (a) {
                    var b = this.document.createElement("p");
                    b.innerHTML = r.ie ? "&nbsp;" : "<br />";
                    a.parentNode.insertBefore(b, a);
                    this.selection.getRange().setStart(b, 0).setCursor()
                }
            }
        };
        UE.commands.deletetable = {
            queryCommandState: function () {
                var a = this.selection.getRange();
                return f.findParentByTagName(a.startContainer,
                    "table", !0) ? 0 : -1
            }, execCommand: function (a, b) {
                var c = this.selection.getRange();
                if (b = b || f.findParentByTagName(c.startContainer, "table", !0)) {
                    var e = b.nextSibling;
                    e || (e = f.createElement(this.document, "p", {innerHTML: r.ie ? f.fillChar : "<br/>"}), b.parentNode.insertBefore(e, b));
                    f.remove(b);
                    c = this.selection.getRange();
                    3 == e.nodeType ? c.setStartBefore(e) : c.setStart(e, 0);
                    c.setCursor(!1, !0);
                    this.fireEvent("tablehasdeleted")
                }
            }
        };
        UE.commands.cellalign = {
            queryCommandState: function () {
                return b(this).length ? 0 : -1
            }, execCommand: function (a,
                                      c) {
                var e = b(this);
                if (e.length) for (var d = 0, f; f = e[d++];) f.setAttribute("align", c)
            }
        };
        UE.commands.cellvalign = {
            queryCommandState: function () {
                return b(this).length ? 0 : -1
            }, execCommand: function (a, c) {
                var e = b(this);
                if (e.length) for (var d = 0, f; f = e[d++];) f.setAttribute("vAlign", c)
            }
        };
        UE.commands.insertcaption = {
            queryCommandState: function () {
                var a = e(this).table;
                return a ? 0 == a.getElementsByTagName("caption").length ? 1 : -1 : -1
            }, execCommand: function () {
                var a = e(this).table;
                if (a) {
                    var b = this.document.createElement("caption");
                    b.innerHTML =
                        r.ie ? f.fillChar : "<br/>";
                    a.insertBefore(b, a.firstChild);
                    this.selection.getRange().setStart(b, 0).setCursor()
                }
            }
        };
        UE.commands.deletecaption = {
            queryCommandState: function () {
                var a = this.selection.getRange();
                return (a = f.findParentByTagName(a.startContainer, "table")) ? 0 == a.getElementsByTagName("caption").length ? -1 : 1 : -1
            }, execCommand: function () {
                var a = this.selection.getRange();
                if (a = f.findParentByTagName(a.startContainer, "table")) f.remove(a.getElementsByTagName("caption")[0]), this.selection.getRange().setStart(a.rows[0].cells[0],
                    0).setCursor()
            }
        };
        UE.commands.inserttitle = {
            queryCommandState: function () {
                var a = e(this).table;
                return a ? (a = a.rows[0], "th" != a.cells[a.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
            }, execCommand: function () {
                var a = e(this).table;
                a && h(a).insertRow(0, "th");
                a = a.getElementsByTagName("th")[0];
                this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
            }
        };
        UE.commands.deletetitle = {
            queryCommandState: function () {
                var a = e(this).table;
                return a ? (a = a.rows[0], "th" == a.cells[a.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
            }, execCommand: function () {
                var a =
                    e(this).table;
                a && f.remove(a.rows[0]);
                a = a.getElementsByTagName("td")[0];
                this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
            }
        };
        UE.commands.inserttitlecol = {
            queryCommandState: function () {
                var a = e(this).table;
                return a ? a.rows[a.rows.length - 1].getElementsByTagName("th").length ? -1 : 0 : -1
            }, execCommand: function (a) {
                (a = e(this).table) && h(a).insertCol(0, "th");
                d(a, this);
                a = a.getElementsByTagName("th")[0];
                this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
            }
        };
        UE.commands.deletetitlecol = {
            queryCommandState: function () {
                var a =
                    e(this).table;
                return a ? a.rows[a.rows.length - 1].getElementsByTagName("th").length ? 0 : -1 : -1
            }, execCommand: function () {
                var a = e(this).table;
                if (a) for (var b = 0; b < a.rows.length; b++) f.remove(a.rows[b].children[0]);
                d(a, this);
                a = a.getElementsByTagName("td")[0];
                this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
            }
        };
        UE.commands.mergeright = {
            queryCommandState: function (a) {
                var b = e(this);
                a = b.table;
                b = b.cell;
                if (!a || !b) return -1;
                var c = h(a);
                if (c.selectedTds.length) return -1;
                var d = c.getCellInfo(b), f = d.colIndex + d.colSpan;
                if (f >= c.colsNum) return -1;
                c = c.indexTable[d.rowIndex][f];
                return (a = a.rows[c.rowIndex].cells[c.cellIndex]) && b.tagName == a.tagName ? c.rowIndex == d.rowIndex && c.rowSpan == d.rowSpan ? 0 : -1 : -1
            }, execCommand: function (a) {
                a = this.selection.getRange();
                var b = a.createBookmark(!0), c = e(this).cell;
                h(c).mergeRight(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.mergedown = {
            queryCommandState: function (a) {
                var b = e(this);
                a = b.table;
                b = b.cell;
                if (!a || !b) return -1;
                var c = h(a);
                if (c.selectedTds.length) return -1;
                var d = c.getCellInfo(b), f = d.rowIndex +
                    d.rowSpan;
                if (f >= c.rowsNum) return -1;
                c = c.indexTable[f][d.colIndex];
                return (a = a.rows[c.rowIndex].cells[c.cellIndex]) && b.tagName == a.tagName ? c.colIndex == d.colIndex && c.colSpan == d.colSpan ? 0 : -1 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell;
                h(c).mergeDown(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.mergecells = {
            queryCommandState: function () {
                return a.getUETableBySelected(this) ? 0 : -1
            }, execCommand: function () {
                var b = a.getUETableBySelected(this);
                if (b && b.selectedTds.length) {
                    var c =
                        b.selectedTds[0];
                    b.mergeRange();
                    b = this.selection.getRange();
                    f.isEmptyBlock(c) ? b.setStart(c, 0).collapse(!0) : b.selectNodeContents(c);
                    b.select()
                }
            }
        };
        UE.commands.insertrow = {
            queryCommandState: function () {
                var a = e(this), b = a.cell;
                return b && ("TD" == b.tagName || "TH" == b.tagName && a.tr !== a.table.rows[0]) && h(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this), d = c.cell, c = c.table,
                    f = h(c), q = f.getCellInfo(d);
                if (f.selectedTds.length) for (var q =
                    f.cellsRange, t = 0, w = q.endRowIndex - q.beginRowIndex + 1; t < w; t++) f.insertRow(q.beginRowIndex, d); else f.insertRow(q.rowIndex, d);
                a.moveToBookmark(b).select();
                "enabled" === c.getAttribute("interlaced") && this.fireEvent("interlacetable", c)
            }
        };
        UE.commands.insertrownext = {
            queryCommandState: function () {
                var a = e(this), b = a.cell;
                return b && "TD" == b.tagName && h(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this), d = c.cell, c = c.table,
                    f = h(c), q = f.getCellInfo(d);
                if (f.selectedTds.length) for (var q = f.cellsRange, t = 0, w = q.endRowIndex - q.beginRowIndex + 1; t < w; t++) f.insertRow(q.endRowIndex + 1, d); else f.insertRow(q.rowIndex + q.rowSpan, d);
                a.moveToBookmark(b).select();
                "enabled" === c.getAttribute("interlaced") && this.fireEvent("interlacetable", c)
            }
        };
        UE.commands.deleterow = {
            queryCommandState: function () {
                return e(this).cell ? 0 : -1
            }, execCommand: function () {
                var a = e(this).cell, b = h(a), c = b.cellsRange, d = b.getCellInfo(a), n = b.getVSideCell(a),
                    q = b.getVSideCell(a, !0), a = this.selection.getRange();
                if (p.isEmptyObject(c)) b.deleteRow(d.rowIndex); else for (var t = c.beginRowIndex; t < c.endRowIndex + 1; t++) b.deleteRow(c.beginRowIndex);
                t = b.table;
                t.getElementsByTagName("td").length ? 1 == d.rowSpan || d.rowSpan == c.endRowIndex - c.beginRowIndex + 1 ? (q || n) && a.selectNodeContents(q || n).setCursor(!1, !0) : (b = b.getCell(d.rowIndex, b.indexTable[d.rowIndex][d.colIndex].cellIndex)) && a.selectNodeContents(b).setCursor(!1, !0) : (b = t.nextSibling, f.remove(t), b && a.setStart(b, 0).setCursor(!1, !0));
                "enabled" === t.getAttribute("interlaced") &&
                this.fireEvent("interlacetable", t)
            }
        };
        UE.commands.insertcol = {
            queryCommandState: function (a) {
                a = e(this);
                var b = a.cell;
                return b && ("TD" == b.tagName || "TH" == b.tagName && b !== a.tr.cells[0]) && h(a.table).colsNum < this.options.maxColNum ? 0 : -1
            }, execCommand: function (a) {
                var b = this.selection.getRange(), c = b.createBookmark(!0);
                if (-1 != this.queryCommandState(a)) {
                    a = e(this).cell;
                    var d = h(a), f = d.getCellInfo(a);
                    if (d.selectedTds.length) for (var f = d.cellsRange, q = 0, t = f.endColIndex - f.beginColIndex + 1; q < t; q++) d.insertCol(f.beginColIndex,
                        a); else d.insertCol(f.colIndex, a);
                    b.moveToBookmark(c).select(!0)
                }
            }
        };
        UE.commands.insertcolnext = {
            queryCommandState: function () {
                var a = e(this);
                return a.cell && h(a.table).colsNum < this.options.maxColNum ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell, d = h(c),
                    f = d.getCellInfo(c);
                if (d.selectedTds.length) for (var f = d.cellsRange, q = 0, t = f.endColIndex - f.beginColIndex + 1; q < t; q++) d.insertCol(f.endColIndex + 1, c); else d.insertCol(f.colIndex + f.colSpan, c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.deletecol = {
            queryCommandState: function () {
                return e(this).cell ? 0 : -1
            }, execCommand: function () {
                var a = e(this).cell, b = h(a), c = b.cellsRange, d = b.getCellInfo(a), n = b.getHSideCell(a),
                    q = b.getHSideCell(a, !0);
                if (p.isEmptyObject(c)) b.deleteCol(d.colIndex); else for (d = c.beginColIndex; d < c.endColIndex + 1; d++) b.deleteCol(c.beginColIndex);
                b = b.table;
                c = this.selection.getRange();
                b.getElementsByTagName("td").length ? f.inDoc(a, this.document) ? c.setStart(a, 0).setCursor(!1, !0) : q && f.inDoc(q, this.document) ? c.selectNodeContents(q).setCursor(!1,
                    !0) : n && f.inDoc(n, this.document) && c.selectNodeContents(n).setCursor(!0, !0) : (a = b.nextSibling, f.remove(b), a && c.setStart(a, 0).setCursor(!1, !0))
            }
        };
        UE.commands.splittocells = {
            queryCommandState: function () {
                var a = e(this), b = a.cell;
                return !b || 0 < h(a.table).selectedTds.length ? -1 : b && (1 < b.colSpan || 1 < b.rowSpan) ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell;
                h(c).splitToCells(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.splittorows = {
            queryCommandState: function () {
                var a =
                    e(this), b = a.cell;
                return !b || 0 < h(a.table).selectedTds.length ? -1 : b && 1 < b.rowSpan ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell;
                h(c).splitToRows(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.splittocols = {
            queryCommandState: function () {
                var a = e(this), b = a.cell;
                return !b || 0 < h(a.table).selectedTds.length ? -1 : b && 1 < b.colSpan ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell;
                h(c).splitToCols(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.adaptbytext = UE.commands.adaptbywindow = {
            queryCommandState: function () {
                return e(this).table ? 0 : -1
            }, execCommand: function (a) {
                var b = e(this).table;
                b && ("adaptbywindow" == a ? d(b, this) : (a = f.getElementsByTagName(b, "td th"), p.each(a, function (a) {
                    a.removeAttribute("width")
                }), b.removeAttribute("width")))
            }
        };
        UE.commands.averagedistributecol = {
            queryCommandState: function () {
                var b = a.getUETableBySelected(this);
                return b ? b.isFullRow() || b.isFullCol() ? 0 : -1 : -1
            }, execCommand: function (b) {
                function c() {
                    var b = h.table, e = 0,
                        g = 0, f = a.getDefaultValue(d, b);
                    if (h.isFullRow()) e = b.offsetWidth, g = h.colsNum; else for (var b = h.cellsRange.endColIndex, k, l = h.cellsRange.beginColIndex; l <= b;) k = h.selectedTds[l], e += k.offsetWidth, l += k.colSpan, g += 1;
                    return Math.ceil(e / g) - 2 * f.tdBorder - 2 * f.tdPadding
                }

                function e(a) {
                    p.each(f.getElementsByTagName(h.table, "th"), function (a) {
                        a.setAttribute("width", "")
                    });
                    var b = h.isFullRow() ? f.getElementsByTagName(h.table, "td") : h.selectedTds;
                    p.each(b, function (b) {
                        1 == b.colSpan && b.setAttribute("width", a)
                    })
                }

                var d = this, h = a.getUETableBySelected(d);
                h && h.selectedTds.length && e(c())
            }
        };
        UE.commands.averagedistributerow = {
            queryCommandState: function () {
                var b = a.getUETableBySelected(this);
                return !b || b.selectedTds && /th/ig.test(b.selectedTds[0].tagName) ? -1 : b.isFullRow() || b.isFullCol() ? 0 : -1
            }, execCommand: function (b) {
                function c() {
                    var b, e = 0;
                    b = h.table;
                    var g = a.getDefaultValue(d, b),
                        k = parseInt(f.getComputedStyle(b.getElementsByTagName("td")[0], "padding-top"));
                    if (h.isFullCol()) {
                        var e = f.getElementsByTagName(b, "caption"), l = f.getElementsByTagName(b, "th"), p, s;
                        0 < e.length &&
                        (p = e[0].offsetHeight);
                        0 < l.length && (s = l[0].offsetHeight);
                        e = b.offsetHeight - (p || 0) - (s || 0);
                        b = 0 == l.length ? h.rowsNum : h.rowsNum - 1
                    } else {
                        s = h.cellsRange.beginRowIndex;
                        l = h.cellsRange.endRowIndex;
                        p = 0;
                        for (b = f.getElementsByTagName(b, "tr"); s <= l; s++) e += b[s].offsetHeight, p += 1;
                        b = p
                    }
                    return r.ie && 9 > r.version ? Math.ceil(e / b) : Math.ceil(e / b) - 2 * g.tdBorder - 2 * k
                }

                function e(a) {
                    var b = h.isFullCol() ? f.getElementsByTagName(h.table, "td") : h.selectedTds;
                    p.each(b, function (b) {
                        1 == b.rowSpan && b.setAttribute("height", a)
                    })
                }

                var d = this, h = a.getUETableBySelected(d);
                h && h.selectedTds.length && e(c())
            }
        };
        UE.commands.cellalignment = {
            queryCommandState: function () {
                return e(this).table ? 0 : -1
            }, execCommand: function (b, c) {
                var e = a.getUETableBySelected(this);
                e ? p.each(e.selectedTds, function (a) {
                    f.setAttributes(a, c)
                }) : (e = (e = this.selection.getStart()) && f.findParentByTagName(e, ["td", "th", "caption"], !0), /caption/ig.test(e.tagName) ? (e.style.textAlign = c.align, e.style.verticalAlign = c.vAlign) : f.setAttributes(e, c), this.selection.getRange().setCursor(!0))
            }, queryCommandValue: function (a) {
                (a =
                    e(this).cell) || (a = b(this)[0]);
                if (a) {
                    var c = UE.UETable.getUETable(a).selectedTds;
                    !c.length && (c = a);
                    return UE.UETable.getTableCellAlignState(c)
                }
                return null
            }
        };
        UE.commands.tablealignment = {
            queryCommandState: function () {
                return r.ie && 8 > r.version ? -1 : e(this).table ? 0 : -1
            }, execCommand: function (a, b) {
                var c = this.selection.getStart();
                (c = c && f.findParentByTagName(c, ["table"], !0)) && c.setAttribute("align", b)
            }
        };
        UE.commands.edittable = {
            queryCommandState: function () {
                return e(this).table ? 0 : -1
            }, execCommand: function (a, b) {
                var c =
                    this.selection.getRange();
                if (c = f.findParentByTagName(c.startContainer, "table")) c = f.getElementsByTagName(c, "td").concat(f.getElementsByTagName(c, "th"), f.getElementsByTagName(c, "caption")), p.each(c, function (a) {
                    a.style.borderColor = b
                })
            }
        };
        UE.commands.edittd = {
            queryCommandState: function () {
                return e(this).table ? 0 : -1
            }, execCommand: function (b, c) {
                var e = a.getUETableBySelected(this);
                if (e) p.each(e.selectedTds, function (a) {
                    a.style.backgroundColor = c
                }); else if (e = (e = this.selection.getStart()) && f.findParentByTagName(e,
                    ["td", "th", "caption"], !0)) e.style.backgroundColor = c
            }
        };
        UE.commands.settablebackground = {
            queryCommandState: function () {
                return 1 < b(this).length ? 0 : -1
            }, execCommand: function (a, c) {
                var e;
                e = b(this);
                h(e[0]).setBackground(e, c)
            }
        };
        UE.commands.cleartablebackground = {
            queryCommandState: function () {
                var a = b(this);
                if (!a.length) return -1;
                for (var c = 0, e; e = a[c++];) if ("" !== e.style.backgroundColor) return 0;
                return -1
            }, execCommand: function () {
                var a = b(this);
                h(a[0]).removeBackground(a)
            }
        };
        UE.commands.interlacetable = UE.commands.uninterlacetable =
            {
                queryCommandState: function (a) {
                    var b = e(this).table;
                    if (!b) return -1;
                    b = b.getAttribute("interlaced");
                    return "interlacetable" == a ? "enabled" === b ? -1 : 0 : b && "disabled" !== b ? 0 : -1
                }, execCommand: function (a, b) {
                    var c = e(this).table;
                    "interlacetable" == a ? (c.setAttribute("interlaced", "enabled"), this.fireEvent("interlacetable", c, b)) : (c.setAttribute("interlaced", "disabled"), this.fireEvent("uninterlacetable", c))
                }
            };
        UE.commands.setbordervisible = {
            queryCommandState: function (a) {
                return e(this).table ? 0 : -1
            }, execCommand: function () {
                var a =
                    e(this).table;
                p.each(f.getElementsByTagName(a, "td"), function (a) {
                    a.style.borderWidth = "1px";
                    a.style.borderStyle = "solid"
                })
            }
        }
    })();
    UE.plugins.table = function () {
        function d(a, b) {
            c(a, "width", !0);
            c(a, "height", !0)
        }

        function c(a, b, c) {
            a.style[b] && (c && a.setAttribute(b, parseInt(a.style[b], 10)), a.style[b] = "")
        }

        function b(a) {
            if ("TD" == a.tagName || "TH" == a.tagName) return a;
            var b;
            return (b = f.findParentByTagName(a, "td", !0) || f.findParentByTagName(a, "th", !0)) ? b : null
        }

        function a(a) {
            var b = RegExp(f.fillChar, "g");
            if (0 < a[r.ie ? "innerText" :
                "textContent"].replace(/^\s*$/, "").replace(b, "").length) return 0;
            for (var c in v.$isNotEmpty) if (a.getElementsByTagName(c).length) return 0;
            return 1
        }

        function e(a) {
            return a.pageX || a.pageY ? {
                x: a.pageX,
                y: a.pageY
            } : {
                x: a.clientX + x.document.body.scrollLeft - x.document.body.clientLeft,
                y: a.clientY + x.document.body.scrollTop - x.document.body.clientTop
            }
        }

        function h(a) {
            if (!da()) try {
                var c = b(a.target || a.srcElement), d;
                ba && (x.body.style.webkitUserSelect = "none", Math.abs(fa.x - a.clientX) > Z || Math.abs(fa.y - a.clientY) > Z) && (s(),
                    ba = !1, Q = 0, G(a));
                if (U && R) if (Q = 0, x.body.style.webkitUserSelect = "none", x.selection.getNative()[r.ie9below ? "empty" : "removeAllRanges"](), d = e(a), m(x, !0, U, d, c), "h" == U) {
                    var h = S.style, l;
                    var c = R, q = M(c);
                    if (q) {
                        var t = q.getSameEndPosCells(c, "x")[0], p = q.getSameStartPosXCells(c)[0], y = e(a).x,
                            w = (t ? f.getXY(t).x : f.getXY(q.table).x) + 20,
                            u = p ? f.getXY(p).x + p.offsetWidth - 20 : x.body.offsetWidth + 5 || parseInt(f.getComputedStyle(x.body, "width"), 10),
                            w = w + W, u = u - W;
                        l = y < w ? w : y > u ? u : y
                    } else l = void 0;
                    h.left = l + "px"
                } else {
                    if ("v" == U) {
                        var E = S.style,
                            v;
                        a:{
                            try {
                                var z = f.getXY(R).y, A = e(a).y;
                                v = A < z ? z : A;
                                break a
                            } catch (B) {
                            }
                            v = void 0
                        }
                        E.top = v + "px"
                    }
                } else if (c) {
                    if (!0 !== x.fireEvent("excludetable", c)) {
                        d = e(a);
                        var D = n(c, d), ca = f.findParentByTagName(c, "table", !0);
                        k(ca, c, a, !0) ? !0 !== x.fireEvent("excludetable", ca) && (x.body.style.cursor = "url(" + x.options.cursorpath + "h.png),pointer") : k(ca, c, a) ? !0 !== x.fireEvent("excludetable", ca) && (x.body.style.cursor = "url(" + x.options.cursorpath + "v.png),pointer") : (x.body.style.cursor = "text", /\d/.test(D) && (D = D.replace(/\d/, ""), c = M(c).getPreviewCell(c,
                            "v" == D)), m(x, c ? !!D : !1, c ? D : "", d, c))
                    }
                } else g(!1, ca, x)
            } catch (H) {
            }
        }

        function g(a, b, c) {
            a ? l(b, c) : ga || setTimeout(function () {
                !ga && J && J.parentNode && J.parentNode.removeChild(J)
            }, 2E3)
        }

        function l(a, b) {
            function c(e, d) {
                clearTimeout(g);
                g = setTimeout(function () {
                    b.fireEvent("tableClicked", a, d)
                }, 300)
            }

            var e = f.getXY(a), d = a.ownerDocument;
            if (J && J.parentNode) return J;
            J = d.createElement("div");
            J.contentEditable = !1;
            J.innerHTML = "";
            J.style.cssText = "width:15px;height:15px;background-image:url(" + b.options.UEDITOR_HOME_URL + "dialogs/table/dragicon.png);position: absolute;cursor:move;top:" +
                (e.y - 15) + "px;left:" + e.x + "px;";
            f.unSelectable(J);
            J.onmouseover = function (a) {
                ga = !0
            };
            J.onmouseout = function (a) {
                ga = !1
            };
            f.on(J, "click", function (a, b) {
                c(b, this)
            });
            f.on(J, "dblclick", function (c, e) {
                clearTimeout(g);
                var d = M(a), f = a.rows[0].cells[0], h = d.getLastCell(), h = d.getCellsRange(f, h);
                b.selection.getRange().setStart(f, 0).setCursor(!1, !0);
                d.setSelected(h)
            });
            f.on(J, "dragstart", function (a, b) {
                f.preventDefault(b)
            });
            var g;
            d.body.appendChild(J)
        }

        function k(a, b, c, d) {
            c = e(c);
            b = n(b, c);
            return d ? (d = (d = a.getElementsByTagName("caption")[0]) ?
                d.offsetHeight : 0, "v1" == b && 8 > c.y - f.getXY(a).y - d) : "h1" == b && 8 > c.x - f.getXY(a).x
        }

        function m(a, b, c, e, d) {
            try {
                a.body.style.cursor = "h" == c ? "col-resize" : "v" == c ? "row-resize" : "text", r.ie && (!c || aa || F.getUETableBySelected(a) ? I(a) : (O(a, a.document), la(c, d))), ka = b
            } catch (g) {
            }
        }

        function n(a, b) {
            var c = f.getXY(a);
            return c ? c.x + a.offsetWidth - b.x < ha ? "h" : b.x - c.x < ha ? "h1" : c.y + a.offsetHeight - b.y < ha ? "v" : b.y - c.y < ha ? "v1" : "" : ""
        }

        function q(a, b) {
            if (!da()) if (fa = {x: b.clientX, y: b.clientY}, 2 == b.button) {
                var c = F.getUETableBySelected(x), e =
                    !1;
                if (c) {
                    var d = X(x, b);
                    p.each(c.selectedTds, function (a) {
                        a === d && (e = !0)
                    });
                    e ? (d = c.selectedTds[0], setTimeout(function () {
                        x.selection.getRange().setStart(d, 0).setCursor(!1, !0)
                    }, 0)) : (ia(f.getElementsByTagName(x.body, "th td")), c.clearSelected())
                }
            } else w(b)
        }

        function t(a) {
            Q = 0;
            a = a || x.window.event;
            var c = b(a.target || a.srcElement);
            if (c) {
                var d;
                if (d = n(c, e(a))) if (I(x), "h1" == d && (d = "h", k(f.findParentByTagName(c, "table"), c, a) ? x.execCommand("adaptbywindow") : (c = M(c).getPreviewCell(c)) && x.selection.getRange().selectNodeContents(c).setCursor(!0,
                    !0)), "h" == d) {
                    a = M(c);
                    var g = z(c, a.table, !0), g = u(g, "left");
                    a.width = a.offsetWidth;
                    var h = [], l = [];
                    p.each(g, function (a) {
                        h.push(a.offsetWidth)
                    });
                    p.each(g, function (a) {
                        a.removeAttribute("width")
                    });
                    window.setTimeout(function () {
                        var a = !0;
                        p.each(g, function (b, c) {
                            var e = b.offsetWidth;
                            if (e > h[c]) return a = !1;
                            l.push(e)
                        });
                        var b = a ? l : h;
                        p.each(g, function (a, c) {
                            a.width = b[c] - B()
                        })
                    }, 0)
                }
            }
        }

        function w(a) {
            ia(f.getElementsByTagName(x.body, "td th"));
            p.each(x.document.getElementsByTagName("table"), function (a) {
                a.ueTable = null
            });
            if (K =
                X(x, a)) {
                var b = f.findParentByTagName(K, "table", !0);
                (ut = M(b)) && ut.clearSelected();
                ka ? y(a) : (x.document.body.style.webkitUserSelect = "", aa = !0, x.addListener("mouseover", N))
            }
        }

        function y(a) {
            r.ie && (a = E(a));
            s();
            ba = !0;
            ja = setTimeout(function () {
                G(a)
            }, $)
        }

        function u(a, b) {
            for (var c = [], e = null, d = 0, g = a.length; d < g; d++) (e = a[d][b]) && c.push(e);
            return c
        }

        function s() {
            ja && clearTimeout(ja);
            ja = null
        }

        function E(a) {
            var b = "pageX pageY clientX clientY srcElement target".split(" "), c = {};
            if (a) for (var e = 0, d, g; d = b[e]; e++) (g = a[d]) && (c[d] =
                g);
            return c
        }

        function G(a) {
            ba = !1;
            if (K = a.target || a.srcElement) a = n(K, e(a)), /\d/.test(a) && (a = a.replace(/\d/, ""), K = M(K).getPreviewCell(K, "v" == a)), I(x), O(x, x.document), x.fireEvent("saveScene"), la(a, K), aa = !0, U = a, R = K
        }

        function A(a, b) {
            if (!da()) {
                s();
                ba = !1;
                if (ka && (Q = ++Q % 3, fa = {x: b.clientX, y: b.clientY}, setTimeout(function () {
                    0 < Q && Q--
                }, $), 2 === Q)) {
                    Q = 0;
                    t(b);
                    return
                }
                if (2 != b.button) {
                    var c = this.selection.getRange(), e = f.findParentByTagName(c.startContainer, "table", !0),
                        d = f.findParentByTagName(c.endContainer, "table", !0);
                    if (e || d) e === d ? (e = f.findParentByTagName(c.startContainer, ["td", "th", "caption"], !0), d = f.findParentByTagName(c.endContainer, ["td", "th", "caption"], !0), e !== d && this.selection.clearRange()) : this.selection.clearRange();
                    aa = !1;
                    this.document.body.style.webkitUserSelect = "";
                    if (U && R && (this.selection.getNative()[r.ie9below ? "empty" : "removeAllRanges"](), Q = 0, S = this.document.getElementById("ue_tableDragLine"))) {
                        c = f.getXY(R);
                        e = f.getXY(S);
                        switch (U) {
                            case "h":
                                na(R, e.x - c.x);
                                break;
                            case "v":
                                T(R, e.y - c.y - R.offsetHeight)
                        }
                        U = "";
                        R = null;
                        I(this);
                        this.fireEvent("saveScene");
                        return
                    }
                    if (K) (e = (c = M(K)) ? c.selectedTds[0] : null) ? (c = new L.Range(this.document), f.isEmptyBlock(e) ? c.setStart(e, 0).setCursor(!1, !0) : c.selectNodeContents(e).shrinkBoundary().setCursor(!1, !0)) : (c = this.selection.getRange().shrinkBoundary(), c.collapsed || (e = f.findParentByTagName(c.startContainer, ["td", "th"], !0), d = f.findParentByTagName(c.endContainer, ["td", "th"], !0), (e && !d || !e && d || e && d && e !== d) && c.setCursor(!1, !0))), K = null, this.removeListener("mouseover", N); else if ((e =
                        f.findParentByTagName(b.target || b.srcElement, "td", !0)) || (e = f.findParentByTagName(b.target || b.srcElement, "th", !0)), e && ("TD" == e.tagName || "TH" == e.tagName)) {
                        if (!0 === this.fireEvent("excludetable", e)) return;
                        c = new L.Range(this.document);
                        c.setStart(e, 0).setCursor(!1, !0)
                    }
                    this._selectionChange(250, b)
                }
            }
        }

        function N(a, b) {
            if (!da()) {
                var c = b.target || b.srcElement;
                V = f.findParentByTagName(c, "td", !0) || f.findParentByTagName(c, "th", !0);
                if (K && V && ("TD" == K.tagName && "TD" == V.tagName || "TH" == K.tagName && "TH" == V.tagName) && f.findParentByTagName(K,
                    "table") == f.findParentByTagName(V, "table")) if (c = M(V), K != V) {
                    this.document.body.style.webkitUserSelect = "none";
                    this.selection.getNative()[r.ie9below ? "empty" : "removeAllRanges"]();
                    var e = c.getCellsRange(K, V);
                    c.setSelected(e)
                } else this.document.body.style.webkitUserSelect = "", c.clearSelected();
                b.preventDefault ? b.preventDefault() : b.returnValue = !1
            }
        }

        function na(a, b) {
            var c = M(a);
            if (c) {
                var c = c.table, e = z(a, c);
                c.style.width = "";
                c.removeAttribute("width");
                b = H(b, a, e);
                a.nextSibling ? p.each(e, function (a) {
                    a.left.width =
                        +a.left.width + b;
                    a.right && (a.right.width = +a.right.width - b)
                }) : p.each(e, function (a) {
                    a.left.width -= -b
                })
            }
        }

        function da() {
            return "false" === x.body.contentEditable
        }

        function T(a, b) {
            if (!(10 > Math.abs(b))) {
                var c = M(a);
                if (c) for (var c = c.getSameEndPosCells(a, "y"), e = c[0] ? c[0].offsetHeight : 0, d = 0, g; g = c[d++];) {
                    var h = b, k = e, l = parseInt(f.getComputedStyle(g, "line-height"), 10), h = k + h,
                        h = h < l ? l : h;
                    g.style.height && (g.style.height = "");
                    1 == g.rowSpan ? g.setAttribute("height", h) : g.removeAttribute && g.removeAttribute("height")
                }
            }
        }

        function z(a,
                   b, c) {
            b || (b = f.findParentByTagName(a, "table"));
            if (!b) return null;
            f.getNodeIndex(a);
            b = b.rows;
            for (var e = 0; a;) 1 === a.nodeType && (e += a.colSpan || 1), a = a.previousSibling;
            a = null;
            var d = [];
            p.each(b, function (a) {
                var b = 0;
                p.each(a.cells, function (a) {
                    b += a.colSpan || 1;
                    if (b === e) return d.push({left: a, right: a.nextSibling || null}), !1;
                    if (b > e) return c && d.push({left: a}), !1
                })
            });
            return d
        }

        function H(a, b, c) {
            a -= B();
            if (0 > a) return 0;
            a -= D(b);
            var e = 0 > a ? "left" : "right";
            a = Math.abs(a);
            p.each(c, function (b) {
                (b = b[e]) && (a = Math.min(a, D(b) - W))
            });
            a = 0 > a ? 0 : a;
            return "left" === e ? -a : a
        }

        function D(a) {
            var b = 0, b = a.offsetWidth - B();
            if (!a.nextSibling) {
                tab = f.findParentByTagName(a, "table", !1);
                if (void 0 === tab.offsetVal) {
                    var c = a.previousSibling;
                    tab.offsetVal = c ? a.offsetWidth - c.offsetWidth === F.borderWidth ? F.borderWidth : 0 : 0
                }
                b -= tab.offsetVal
            }
            b = 0 > b ? 0 : b;
            try {
                a.width = b
            } catch (e) {
            }
            return b
        }

        function B() {
            if (void 0 === F.tabcellSpace) {
                var a = x.document.createElement("table"), b = x.document.createElement("tbody"),
                    c = x.document.createElement("tr"), e = x.document.createElement("td"),
                    d = null;
                e.style.cssText = "border: 0;";
                e.width = 1;
                c.appendChild(e);
                c.appendChild(d = e.cloneNode(!1));
                b.appendChild(c);
                a.appendChild(b);
                a.style.cssText = "visibility: hidden;";
                x.body.appendChild(a);
                F.paddingSpace = e.offsetWidth - 1;
                b = a.offsetWidth;
                e.style.cssText = "";
                d.style.cssText = "";
                F.borderWidth = (a.offsetWidth - b) / 3;
                F.tabcellSpace = F.paddingSpace + F.borderWidth;
                x.body.removeChild(a)
            }
            B = function () {
                return F.tabcellSpace
            };
            return F.tabcellSpace
        }

        function O(a, b) {
            aa || (S = a.document.createElement("div"), f.setAttributes(S,
                {
                    id: "ue_tableDragLine",
                    unselectable: "on",
                    contenteditable: !1,
                    onresizestart: "return false",
                    ondragstart: "return false",
                    onselectstart: "return false",
                    style: "background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"
                }), a.body.appendChild(S))
        }

        function I(a) {
            if (!aa) for (var b; b = a.document.getElementById("ue_tableDragLine");) f.remove(b)
        }

        function la(a, b) {
            if (b) {
                var c = f.findParentByTagName(b, "table"), e = c.getElementsByTagName("caption"), d =
                        c.offsetWidth, g = c.offsetHeight - (0 < e.length ? e[0].offsetHeight : 0), c = f.getXY(c),
                    h = f.getXY(b);
                switch (a) {
                    case "h":
                        e = "height:" + g + "px;top:" + (c.y + (0 < e.length ? e[0].offsetHeight : 0)) + "px;left:" + (h.x + b.offsetWidth);
                        S.style.cssText = e + "px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)";
                        break;
                    case "v":
                        e = "width:" + d + "px;left:" + c.x + "px;top:" + (h.y + b.offsetHeight), S.style.cssText = e + "px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)"
                }
            }
        }

        function P(a, b) {
            for (var c = f.getElementsByTagName(a.body, "table"), e, d = 0, g; g = c[d++];) e = f.getElementsByTagName(g, "td"), e[0] && (b ? (e = e[0].style.borderColor.replace(/\s/g, ""), /(#ffffff)|(rgb\(255,255,255\))/ig.test(e) && f.addClass(g, "noBorderTable")) : f.removeClasses(g, "noBorderTable"))
        }

        function Y(a, b, c) {
            var e = a.body;
            return e.offsetWidth - (b ? 2 * parseInt(f.getComputedStyle(e, "margin-left"), 10) : 0) - 2 * c.tableBorder - (a.options.offsetWidth || 0)
        }

        function X(a, b) {
            var c = f.findParentByTagName(b.target || b.srcElement, ["td",
                "th"], !0), d = null;
            if (!c) return null;
            d = n(c, e(b));
            if (!c) return null;
            if ("h1" === d && c.previousSibling) {
                var d = f.getXY(c), g = c.offsetWidth;
                Math.abs(d.x + g - b.clientX) > g / 3 && (c = c.previousSibling)
            } else "v1" === d && c.parentNode.previousSibling && (d = f.getXY(c), g = c.offsetHeight, Math.abs(d.y + g - b.clientY) > g / 3 && (c = c.parentNode.previousSibling.firstChild));
            return c && !0 !== a.fireEvent("excludetable", c) ? c : null
        }

        var x = this, ja = null, W = 5, ba = !1, ha = 5, Z = 10, Q = 0, fa = null, $ = 360, F = UE.UETable,
            M = function (a) {
                return F.getUETable(a)
            }, ia = function (a) {
                return F.removeSelectedClass(a)
            };
        x.ready(function () {
            var a = this, b = a.selection.getText;
            a.selection.getText = function () {
                var c = F.getUETableBySelected(a);
                if (c) {
                    var e = "";
                    p.each(c.selectedTds, function (a) {
                        e += a[r.ie ? "innerText" : "textContent"]
                    });
                    return e
                }
                return b.call(a.selection)
            }
        });
        var K = null, V = null, U = "", ka = !1, J = null, ga = !1, S = null, R = null, aa = !1;
        x.setOpt({
            maxColNum: 20,
            maxRowNum: 100,
            defaultCols: 5,
            defaultRows: 5,
            tdvalign: "top",
            cursorpath: x.options.UEDITOR_HOME_URL + "themes/default/images/cursor_",
            tableDragable: !1,
            classList: ["ue-table-interlace-color-single",
                "ue-table-interlace-color-double"]
        });
        x.getUETable = M;
        var ea = {
            deletetable: 1,
            inserttable: 1,
            cellvalign: 1,
            insertcaption: 1,
            deletecaption: 1,
            inserttitle: 1,
            deletetitle: 1,
            mergeright: 1,
            mergedown: 1,
            mergecells: 1,
            insertrow: 1,
            insertrownext: 1,
            deleterow: 1,
            insertcol: 1,
            insertcolnext: 1,
            deletecol: 1,
            splittocells: 1,
            splittorows: 1,
            splittocols: 1,
            adaptbytext: 1,
            adaptbywindow: 1,
            adaptbycustomer: 1,
            insertparagraph: 1,
            insertparagraphbeforetable: 1,
            averagedistributecol: 1,
            averagedistributerow: 1
        };
        x.ready(function () {
            p.cssRule("table",
                ".selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}",
                x.document);
            var c, e, l;
            x.addListener("keydown", function (b, d) {
                var g = d.keyCode || d.which;
                if (8 == g) {
                    var h = F.getUETableBySelected(this);
                    h && h.selectedTds.length && (h.isFullCol() ? this.execCommand("deletecol") : h.isFullRow() ? this.execCommand("deleterow") : this.fireEvent("delcells"), f.preventDefault(d));
                    var k = f.findParentByTagName(this.selection.getStart(), "caption", !0),
                        n = this.selection.getRange();
                    n.collapsed && k && a(k) && (this.fireEvent("saveScene"), h = k.parentNode, f.remove(k), h && n.setStart(h.rows[0].cells[0], 0).setCursor(!1,
                        !0), this.fireEvent("saveScene"))
                }
                if (46 == g && (h = F.getUETableBySelected(this))) {
                    this.fireEvent("saveScene");
                    for (k = 0; n = h.selectedTds[k++];) f.fillNode(this.document, n);
                    this.fireEvent("saveScene");
                    f.preventDefault(d)
                }
                if (13 == g) {
                    g = this.selection.getRange();
                    if (k = f.findParentByTagName(g.startContainer, "caption", !0)) {
                        h = f.findParentByTagName(k, "table");
                        g.collapsed ? k && g.setStart(h.rows[0].cells[0], 0).setCursor(!1, !0) : (g.deleteContents(), this.fireEvent("saveScene"));
                        f.preventDefault(d);
                        return
                    }
                    g.collapsed && (h = f.findParentByTagName(g.startContainer,
                        "table")) && (n = h.rows[0].cells[0], k = f.findParentByTagName(this.selection.getStart(), ["td", "th"], !0), h = h.previousSibling, n === k && (!h || 1 == h.nodeType && "TABLE" == h.tagName) && f.isStartInblock(g) && (g = f.findParent(this.selection.getStart(), function (a) {
                        return f.isBlockElm(a)
                    }, !0)) && (/t(h|d)/i.test(g.tagName) || g === k.firstChild) && (this.execCommand("insertparagraphbeforetable"), f.preventDefault(d)))
                }
                if ((d.ctrlKey || d.metaKey) && "67" == d.keyCode && (c = null, h = F.getUETableBySelected(this))) for (g = h.selectedTds, e = h.isFullCol(),
                                                                                                                            l = h.isFullRow(), c = [[h.cloneCell(g[0], null, !0)]], k = 1; n = g[k]; k++) n.parentNode !== g[k - 1].parentNode ? c.push([h.cloneCell(n, null, !0)]) : c[c.length - 1].push(h.cloneCell(n, null, !0))
            });
            x.addListener("tablehasdeleted", function () {
                m(this, !1, "", null);
                J && f.remove(J)
            });
            x.addListener("beforepaste", function (b, g) {
                var h = this, k = h.selection.getRange();
                if (f.findParentByTagName(k.startContainer, "caption", !0)) k = h.document.createElement("div"), k.innerHTML = g.html, g.html = k[r.ie9below ? "innerText" : "textContent"]; else {
                    var n = F.getUETableBySelected(h);
                    if (c) {
                        h.fireEvent("saveScene");
                        var k = h.selection.getRange(), m = f.findParentByTagName(k.startContainer, ["td", "th"], !0),
                            q, t;
                        if (m) {
                            n = M(m);
                            if (l) {
                                var y = n.getCellInfo(m).rowIndex;
                                "TH" == m.tagName && y++;
                                for (var k = 0, w; w = c[k++];) {
                                    t = n.insertRow(y++, "td");
                                    for (var u = 0, s; s = w[u]; u++) (m = t.cells[u]) || (m = t.insertCell(u)), m.innerHTML = s.innerHTML, s.getAttribute("width") && m.setAttribute("width", s.getAttribute("width")), s.getAttribute("vAlign") && m.setAttribute("vAlign", s.getAttribute("vAlign")), s.getAttribute("align") &&
                                    m.setAttribute("align", s.getAttribute("align")), s.style.cssText && (m.style.cssText = s.style.cssText);
                                    for (u = 0; (s = t.cells[u]) && w[u]; u++) s.innerHTML = w[u].innerHTML, w[u].getAttribute("width") && s.setAttribute("width", w[u].getAttribute("width")), w[u].getAttribute("vAlign") && s.setAttribute("vAlign", w[u].getAttribute("vAlign")), w[u].getAttribute("align") && s.setAttribute("align", w[u].getAttribute("align")), w[u].style.cssText && (s.style.cssText = w[u].style.cssText)
                                }
                            } else {
                                if (e) {
                                    y = n.getCellInfo(m);
                                    u = m = 0;
                                    for (w = c[0]; s =
                                        w[u++];) m += s.colSpan || 1;
                                    h.__hasEnterExecCommand = !0;
                                    for (k = 0; k < m; k++) h.execCommand("insertcol");
                                    h.__hasEnterExecCommand = !1;
                                    m = n.table.rows[0].cells[y.cellIndex];
                                    "TH" == m.tagName && (m = n.table.rows[1].cells[y.cellIndex])
                                }
                                for (k = 0; w = c[k++];) {
                                    q = m;
                                    for (u = 0; s = w[u++];) m ? (m.innerHTML = s.innerHTML, s.getAttribute("width") && m.setAttribute("width", s.getAttribute("width")), s.getAttribute("vAlign") && m.setAttribute("vAlign", s.getAttribute("vAlign")), s.getAttribute("align") && m.setAttribute("align", s.getAttribute("align")),
                                    s.style.cssText && (m.style.cssText = s.style.cssText), t = m, m = m.nextSibling) : (y = s.cloneNode(!0), f.removeAttributes(y, ["class", "rowSpan", "colSpan"]), t.parentNode.appendChild(y));
                                    m = n.getNextCell(q, !0, !0);
                                    if (!c[k]) break;
                                    m || (y = n.getCellInfo(q), n.table.insertRow(n.table.rows.length), n.update(), m = n.getVSideCell(q, !0))
                                }
                            }
                            n.update()
                        } else {
                            n = h.document.createElement("table");
                            for (k = 0; w = c[k++];) {
                                t = n.insertRow(n.rows.length);
                                for (u = 0; s = w[u++];) y = F.cloneCell(s, null, !0), f.removeAttributes(y, ["class"]), t.appendChild(y);
                                2 == u && 1 < y.rowSpan && (y.rowSpan = 1)
                            }
                            k = F.getDefaultValue(h, void 0);
                            k = h.body.offsetWidth - 2 * parseInt(f.getComputedStyle(h.body, "margin-left"), 10) - 2 * k.tableBorder - (h.options.offsetWidth || 0);
                            h.execCommand("insertHTML", "<table  " + (e && l ? 'width="' + k + '"' : "") + ">" + n.innerHTML.replace(/>\s*</g, "><").replace(/\bth\b/gi, "td") + "</table>")
                        }
                        h.fireEvent("contentchange");
                        h.fireEvent("saveScene");
                        g.html = "";
                        return !0
                    }
                    k = h.document.createElement("div");
                    k.innerHTML = g.html;
                    w = k.getElementsByTagName("table");
                    f.findParentByTagName(h.selection.getStart(),
                        "table") ? (p.each(w, function (a) {
                        f.remove(a)
                    }), f.findParentByTagName(h.selection.getStart(), "caption", !0) && (k.innerHTML = k[r.ie ? "innerText" : "textContent"])) : p.each(w, function (b) {
                        d(b, !0);
                        f.removeAttributes(b, ["style", "border"]);
                        p.each(f.getElementsByTagName(b, "td"), function (b) {
                            a(b) && f.fillNode(h.document, b);
                            d(b, !0)
                        })
                    });
                    g.html = k.innerHTML
                }
            });
            x.addListener("afterpaste", function () {
                p.each(f.getElementsByTagName(x.body, "table"), function (a) {
                    if (a.offsetWidth > x.body.offsetWidth) {
                        var b = F.getDefaultValue(x, a);
                        a.style.width = x.body.offsetWidth - 2 * parseInt(f.getComputedStyle(x.body, "margin-left"), 10) - 2 * b.tableBorder - (x.options.offsetWidth || 0) + "px"
                    }
                })
            });
            x.addListener("blur", function () {
                c = null
            });
            var n;
            x.addListener("keydown", function () {
                clearTimeout(n);
                n = setTimeout(function () {
                    var a = x.selection.getRange();
                    if (a = f.findParentByTagName(a.startContainer, ["th", "td"], !0)) {
                        var b = a.parentNode.parentNode.parentNode;
                        b.offsetWidth > b.getAttribute("width") && (a.style.wordBreak = "break-all")
                    }
                }, 100)
            });
            x.addListener("selectionchange",
                function () {
                    m(x, !1, "", null)
                });
            x.addListener("contentchange", function () {
                var a = this;
                I(a);
                if (!F.getUETableBySelected(a)) {
                    var c = a.selection.getRange().startContainer, c = f.findParentByTagName(c, ["td", "th"], !0);
                    p.each(f.getElementsByTagName(a.document, "table"), function (c) {
                        !0 !== a.fireEvent("excludetable", c) && (c.ueTable = new F(c), c.onmouseover = function () {
                            a.fireEvent("tablemouseover", c)
                        }, c.onmousemove = function () {
                            a.fireEvent("tablemousemove", c);
                            a.options.tableDragable && g(!0, this, a);
                            p.defer(function () {
                                a.fireEvent("contentchange",
                                    50)
                            }, !0)
                        }, c.onmouseout = function () {
                            a.fireEvent("tablemouseout", c);
                            m(a, !1, "", null);
                            I(a)
                        }, c.onclick = function (c) {
                            c = a.window.event || c;
                            var e = b(c.target || c.srcElement);
                            if (e) {
                                var d = M(e), g = d.table, f = d.getCellInfo(e), h = a.selection.getRange();
                                k(g, e, c, !0) ? (g = d.getCell(d.indexTable[d.rowsNum - 1][f.colIndex].rowIndex, d.indexTable[d.rowsNum - 1][f.colIndex].cellIndex), c.shiftKey && d.selectedTds.length ? d.selectedTds[0] !== g ? (c = d.getCellsRange(d.selectedTds[0], g), d.setSelected(c)) : h && h.selectNodeContents(g).select() : e !==
                                g ? (c = d.getCellsRange(e, g), d.setSelected(c)) : h && h.selectNodeContents(g).select()) : k(g, e, c) && (g = d.getCell(d.indexTable[f.rowIndex][d.colsNum - 1].rowIndex, d.indexTable[f.rowIndex][d.colsNum - 1].cellIndex), c.shiftKey && d.selectedTds.length ? d.selectedTds[0] !== g ? (c = d.getCellsRange(d.selectedTds[0], g), d.setSelected(c)) : h && h.selectNodeContents(g).select() : e !== g ? (c = d.getCellsRange(e, g), d.setSelected(c)) : h && h.selectNodeContents(g).select())
                            }
                        })
                    });
                    P(a, !0)
                }
            });
            f.on(x.document, "mousemove", h);
            f.on(x.document, "mouseout",
                function (a) {
                    "TABLE" == (a.target || a.srcElement).tagName && m(x, !1, "", null)
                });
            x.addListener("interlacetable", function (a, b, c) {
                if (b) {
                    a = b.rows;
                    b = a.length;
                    for (var e = 0; e < b; e++) {
                        var d = c || this.options.classList;
                        a[e].className = d[e] ? d[e] : d[e % d.length]
                    }
                }
            });
            x.addListener("uninterlacetable", function (a, b) {
                if (b) for (var c = b.rows, e = this.options.classList, d = c.length, g = 0; g < d; g++) f.removeClasses(c[g], e)
            });
            x.addListener("mousedown", q);
            x.addListener("mouseup", A);
            f.on(x.body, "dragstart", function (a) {
                A.call(x, "dragstart", a)
            });
            x.addOutputRule(function (a) {
                p.each(a.getNodesByTagName("div"), function (a) {
                    "ue_tableDragLine" == a.getAttr("id") && a.parentNode.removeChild(a)
                })
            });
            var t = 0;
            x.addListener("mousedown", function () {
                t = 0
            });
            x.addListener("tabkeydown", function () {
                var b = this.selection.getRange(), c = b.getCommonAncestor(!0, !0),
                    e = f.findParentByTagName(c, "table");
                if (e) {
                    if (f.findParentByTagName(c, "caption", !0)) (c = f.getElementsByTagName(e, "th td")) && c.length && b.setStart(c[0], 0).setCursor(!1, !0); else {
                        var c = f.findParentByTagName(c, ["td",
                            "th"], !0), d = M(c);
                        t = 1 < c.rowSpan ? t : d.getCellInfo(c).rowIndex;
                        (c = d.getTabNextCell(c, t)) ? a(c) ? b.setStart(c, 0).setCursor(!1, !0) : b.selectNodeContents(c).select() : (x.fireEvent("saveScene"), x.__hasEnterExecCommand = !0, this.execCommand("insertrownext"), x.__hasEnterExecCommand = !1, b = this.selection.getRange(), b.setStart(e.rows[e.rows.length - 1].cells[0], 0).setCursor(), x.fireEvent("saveScene"))
                    }
                    return !0
                }
            });
            r.ie && x.addListener("selectionchange", function () {
                m(this, !1, "", null)
            });
            x.addListener("keydown", function (a, b) {
                var c =
                    b.keyCode || b.which;
                if (8 != c && 46 != c) {
                    (c = !b.ctrlKey && !b.metaKey && !b.shiftKey && !b.altKey) && ia(f.getElementsByTagName(this.body, "td"));
                    var e = F.getUETableBySelected(this);
                    e && c && e.clearSelected()
                }
            });
            x.addListener("beforegetcontent", function () {
                P(this, !1);
                r.ie && p.each(this.document.getElementsByTagName("caption"), function (a) {
                    f.isEmptyNode(a) && (a.innerHTML = "&nbsp;")
                })
            });
            x.addListener("aftergetcontent", function () {
                P(this, !0)
            });
            x.addListener("getAllHtml", function () {
                ia(x.document.getElementsByTagName("td"))
            });
            x.addListener("fullscreenchanged", function (a, b) {
                if (!b) {
                    var c = this.body.offsetWidth / document.body.offsetWidth,
                        e = f.getElementsByTagName(this.body, "table");
                    p.each(e, function (a) {
                        if (a.offsetWidth < x.body.offsetWidth) return !1;
                        var b = f.getElementsByTagName(a, "td"), e = [];
                        p.each(b, function (a) {
                            e.push(a.offsetWidth)
                        });
                        for (var d = 0, g; g = b[d]; d++) g.setAttribute("width", Math.floor(e[d] * c));
                        a.setAttribute("width", Math.floor(Y(x, !0, F.getDefaultValue(x, void 0))))
                    })
                }
            });
            var y = x.execCommand;
            x.execCommand = function (b, c) {
                b =
                    b.toLowerCase();
                var e = F.getUETableBySelected(this), d = new L.Range(this.document),
                    g = this.commands[b] || UE.commands[b], h;
                if (g) {
                    if (!e || ea[b] || g.notNeedUndo || this.__hasEnterExecCommand) h = y.apply(this, arguments); else {
                        this.__hasEnterExecCommand = !0;
                        this.fireEvent("beforeexeccommand", b);
                        for (var e = e.selectedTds, k = g = -2, l, n, m = 0, q; q = e[m]; m++) if (a(q) ? d.setStart(q, 0).setCursor(!1, !0) : d.selectNode(q).select(!0), n = this.queryCommandState(b), l = this.queryCommandValue(b), -1 != n) {
                            if (g !== n || k !== l) this._ignoreContentChange =
                                !0, h = y.apply(this, arguments), this._ignoreContentChange = !1;
                            g = this.queryCommandState(b);
                            k = this.queryCommandValue(b);
                            f.isEmptyBlock(q) && f.fillNode(this.document, q)
                        }
                        d.setStart(e[0], 0).shrinkBoundary(!0).setCursor(!1, !0);
                        this.fireEvent("contentchange");
                        this.fireEvent("afterexeccommand", b);
                        this.__hasEnterExecCommand = !1;
                        this._selectionChange()
                    }
                    return h
                }
            }
        })
    };
    UE.UETable.prototype.sortTable = function (d, c) {
        var b = this.table, a = b.rows, e = [], f = "TH" === a[0].cells[0].tagName, g = 0;
        if (this.selectedTds.length) {
            for (var l =
                this.cellsRange, k = l.endRowIndex + 1, m = l.beginRowIndex; m < k; m++) e[m] = a[m];
            e.splice(0, l.beginRowIndex);
            g = l.endRowIndex + 1 === this.rowsNum ? 0 : l.endRowIndex + 1
        } else for (m = 0, k = a.length; m < k; m++) e[m] = a[m];
        var n = {
            reversecurrent: function (a, b) {
                return 1
            }, orderbyasc: function (a, b) {
                return (a.innerText || a.textContent).localeCompare(b.innerText || b.textContent)
            }, reversebyasc: function (a, b) {
                return b.innerHTML.localeCompare(a.innerHTML)
            }, orderbynum: function (a, b) {
                var c = a[r.ie ? "innerText" : "textContent"].match(/\d+/), e = b[r.ie ?
                    "innerText" : "textContent"].match(/\d+/);
                c && (c = +c[0]);
                e && (e = +e[0]);
                return (c || 0) - (e || 0)
            }, reversebynum: function (a, b) {
                var c = a[r.ie ? "innerText" : "textContent"].match(/\d+/),
                    e = b[r.ie ? "innerText" : "textContent"].match(/\d+/);
                c && (c = +c[0]);
                e && (e = +e[0]);
                return (e || 0) - (c || 0)
            }
        };
        b.setAttribute("data-sort-type", c && "string" === typeof c && n[c] ? c : "");
        f && e.splice(0, 1);
        e = p.sort(e, function (a, b) {
            return c && "function" === typeof c ? c.call(this, a.cells[d], b.cells[d]) : c && "number" === typeof c ? 1 : c && "string" === typeof c && n[c] ? n[c].call(this,
                a.cells[d], b.cells[d]) : n.orderbyasc.call(this, a.cells[d], b.cells[d])
        });
        f = b.ownerDocument.createDocumentFragment();
        m = 0;
        for (k = e.length; m < k; m++) f.appendChild(e[m]);
        b = b.getElementsByTagName("tbody")[0];
        g ? b.insertBefore(f, a[g - l.endRowIndex + l.beginRowIndex - 1]) : b.appendChild(f)
    };
    UE.plugins.tablesort = function () {
        var d = this, c = UE.UETable;
        d.ready(function () {
            p.cssRule("tablesort", "table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url(" +
                d.options.themePath + d.options.theme + "/images/sortable.png);}", d.document);
            d.addListener("afterexeccommand", function (b, a) {
                "mergeright" != a && "mergedown" != a && "mergecells" != a || this.execCommand("disablesort")
            })
        });
        UE.commands.sorttable = {
            queryCommandState: function () {
                var b = c.getTableItemsByRange(this);
                if (!b.cell) return -1;
                for (var b = b.table.getElementsByTagName("td"), a = 0, e; e = b[a++];) if (1 != e.rowSpan || 1 != e.colSpan) return -1;
                return 0
            }, execCommand: function (b, a) {
                var e = this.selection.getRange(), d = e.createBookmark(!0),
                    g = c.getTableItemsByRange(this), f = g.cell, g = c.getUETable(g.table), f = g.getCellInfo(f);
                g.sortTable(f.cellIndex, a);
                e.moveToBookmark(d);
                try {
                    e.select()
                } catch (k) {
                }
            }
        };
        UE.commands.enablesort = UE.commands.disablesort = {
            queryCommandState: function (b) {
                var a = c.getTableItemsByRange(this).table;
                if (a && "enablesort" == b) for (var e = f.getElementsByTagName(a, "th td"), d = 0; d < e.length; d++) if (1 < e[d].getAttribute("colspan") || 1 < e[d].getAttribute("rowspan")) return -1;
                return a ? "enablesort" == b ^ "sortEnabled" != a.getAttribute("data-sort") ?
                    -1 : 0 : -1
            }, execCommand: function (b) {
                var a = c.getTableItemsByRange(this).table;
                a.setAttribute("data-sort", "enablesort" == b ? "sortEnabled" : "sortDisabled");
                "enablesort" == b ? f.addClass(a, "sortEnabled") : f.removeClasses(a, "sortEnabled")
            }
        }
    };
    UE.plugins.contextmenu = function () {
        var d = this;
        d.setOpt("enableContextMenu", !0);
        if (!1 !== d.getOpt("enableContextMenu")) {
            var c = d.getLang("contextMenu"), b,
                a = d.options.contextMenu || [{label: c.selectall, cmdName: "selectall"}, {
                    label: c.cleardoc, cmdName: "cleardoc", exec: function () {
                        confirm(c.confirmclear) &&
                        this.execCommand("cleardoc")
                    }
                }, "-", {label: c.unlink, cmdName: "unlink"}, "-", {
                    group: c.paragraph,
                    icon: "justifyjustify",
                    subMenu: [{label: c.justifyleft, cmdName: "justify", value: "left"}, {
                        label: c.justifyright,
                        cmdName: "justify",
                        value: "right"
                    }, {label: c.justifycenter, cmdName: "justify", value: "center"}, {
                        label: c.justifyjustify,
                        cmdName: "justify",
                        value: "justify"
                    }]
                }, "-", {
                    group: c.table,
                    icon: "table",
                    subMenu: [{label: c.inserttable, cmdName: "inserttable"}, {
                        label: c.deletetable,
                        cmdName: "deletetable"
                    }, "-", {
                        label: c.deleterow,
                        cmdName: "deleterow"
                    }, {label: c.deletecol, cmdName: "deletecol"}, {
                        label: c.insertcol,
                        cmdName: "insertcol"
                    }, {label: c.insertcolnext, cmdName: "insertcolnext"}, {
                        label: c.insertrow,
                        cmdName: "insertrow"
                    }, {label: c.insertrownext, cmdName: "insertrownext"}, "-", {
                        label: c.insertcaption,
                        cmdName: "insertcaption"
                    }, {label: c.deletecaption, cmdName: "deletecaption"}, {
                        label: c.inserttitle,
                        cmdName: "inserttitle"
                    }, {label: c.deletetitle, cmdName: "deletetitle"}, {
                        label: c.inserttitlecol,
                        cmdName: "inserttitlecol"
                    }, {label: c.deletetitlecol, cmdName: "deletetitlecol"},
                        "-", {label: c.mergecells, cmdName: "mergecells"}, {
                            label: c.mergeright,
                            cmdName: "mergeright"
                        }, {label: c.mergedown, cmdName: "mergedown"}, "-", {
                            label: c.splittorows,
                            cmdName: "splittorows"
                        }, {label: c.splittocols, cmdName: "splittocols"}, {
                            label: c.splittocells,
                            cmdName: "splittocells"
                        }, "-", {label: c.averageDiseRow, cmdName: "averagedistributerow"}, {
                            label: c.averageDisCol,
                            cmdName: "averagedistributecol"
                        }, "-", {
                            label: c.edittd, cmdName: "edittd", exec: function () {
                                UE.ui.edittd && new UE.ui.edittd(this);
                                this.getDialog("edittd").open()
                            }
                        },
                        {
                            label: c.edittable, cmdName: "edittable", exec: function () {
                                UE.ui.edittable && new UE.ui.edittable(this);
                                this.getDialog("edittable").open()
                            }
                        }, {label: c.setbordervisible, cmdName: "setbordervisible"}]
                }, {
                    group: c.tablesort,
                    icon: "tablesort",
                    subMenu: [{label: c.enablesort, cmdName: "enablesort"}, {
                        label: c.disablesort,
                        cmdName: "disablesort"
                    }, "-", {
                        label: c.reversecurrent,
                        cmdName: "sorttable",
                        value: "reversecurrent"
                    }, {label: c.orderbyasc, cmdName: "sorttable", value: "orderbyasc"}, {
                        label: c.reversebyasc,
                        cmdName: "sorttable",
                        value: "reversebyasc"
                    },
                        {label: c.orderbynum, cmdName: "sorttable", value: "orderbynum"}, {
                            label: c.reversebynum,
                            cmdName: "sorttable",
                            value: "reversebynum"
                        }]
                }, {
                    group: c.borderbk,
                    icon: "borderBack",
                    subMenu: [{
                        label: c.setcolor, cmdName: "interlacetable", exec: function () {
                            this.execCommand("interlacetable")
                        }
                    }, {
                        label: c.unsetcolor, cmdName: "uninterlacetable", exec: function () {
                            this.execCommand("uninterlacetable")
                        }
                    }, {
                        label: c.setbackground, cmdName: "settablebackground", exec: function () {
                            this.execCommand("settablebackground", {
                                repeat: !0, colorList: ["#bbb",
                                    "#ccc"]
                            })
                        }
                    }, {
                        label: c.unsetbackground, cmdName: "cleartablebackground", exec: function () {
                            this.execCommand("cleartablebackground")
                        }
                    }, {
                        label: c.redandblue, cmdName: "settablebackground", exec: function () {
                            this.execCommand("settablebackground", {repeat: !0, colorList: ["red", "blue"]})
                        }
                    }, {
                        label: c.threecolorgradient, cmdName: "settablebackground", exec: function () {
                            this.execCommand("settablebackground", {repeat: !0, colorList: ["#aaa", "#bbb", "#ccc"]})
                        }
                    }]
                }, {
                    group: c.aligntd, icon: "aligntd", subMenu: [{
                        cmdName: "cellalignment", value: {
                            align: "left",
                            vAlign: "top"
                        }
                    }, {cmdName: "cellalignment", value: {align: "center", vAlign: "top"}}, {
                        cmdName: "cellalignment",
                        value: {align: "right", vAlign: "top"}
                    }, {cmdName: "cellalignment", value: {align: "left", vAlign: "middle"}}, {
                        cmdName: "cellalignment",
                        value: {align: "center", vAlign: "middle"}
                    }, {cmdName: "cellalignment", value: {align: "right", vAlign: "middle"}}, {
                        cmdName: "cellalignment",
                        value: {align: "left", vAlign: "bottom"}
                    }, {cmdName: "cellalignment", value: {align: "center", vAlign: "bottom"}}, {
                        cmdName: "cellalignment", value: {
                            align: "right",
                            vAlign: "bottom"
                        }
                    }]
                }, {
                    group: c.aligntable,
                    icon: "aligntable",
                    subMenu: [{
                        cmdName: "tablealignment",
                        className: "left",
                        label: c.tableleft,
                        value: "left"
                    }, {
                        cmdName: "tablealignment",
                        className: "center",
                        label: c.tablecenter,
                        value: "center"
                    }, {cmdName: "tablealignment", className: "right", label: c.tableright, value: "right"}]
                }, "-", {
                    label: c.insertparagraphbefore,
                    cmdName: "insertparagraph",
                    value: !0
                }, {label: c.insertparagraphafter, cmdName: "insertparagraph"}, {
                    label: c.copy,
                    cmdName: "copy"
                }, {label: c.paste, cmdName: "paste"}];
            if (a.length) {
                var e =
                    UE.ui.uiUtils;
                d.addListener("contextmenu", function (h, g) {
                    var l = e.getViewportOffsetByEvent(g);
                    d.fireEvent("beforeselectionchange");
                    b && b.destroy();
                    for (var k = 0, m, n = []; m = a[k]; k++) {
                        var q;
                        (function (a) {
                            if ("-" == a) (q = n[n.length - 1]) && "-" !== q && n.push("-"); else if (a.hasOwnProperty("group")) {
                                for (var b = 0, e, g = []; e = a.subMenu[b]; b++) (function (a) {
                                    "-" == a ? (q = g[g.length - 1]) && "-" !== q ? g.push("-") : g.splice(g.length - 1) : (d.commands[a.cmdName] || UE.commands[a.cmdName] || a.query) && -1 < (a.query ? a.query() : d.queryCommandState(a.cmdName)) &&
                                        g.push({
                                            label: a.label || d.getLang("contextMenu." + a.cmdName + (a.value || "")) || "",
                                            className: "edui-for-" + a.cmdName + (a.className ? " edui-for-" + a.cmdName + "-" + a.className : ""),
                                            onclick: a.exec ? function () {
                                                a.exec.call(d)
                                            } : function () {
                                                d.execCommand(a.cmdName, a.value)
                                            }
                                        })
                                })(e);
                                g.length && n.push({
                                    label: function () {
                                        switch (a.icon) {
                                            case "table":
                                                return d.getLang("contextMenu.table");
                                            case "justifyjustify":
                                                return d.getLang("contextMenu.paragraph");
                                            case "aligntd":
                                                return d.getLang("contextMenu.aligntd");
                                            case "aligntable":
                                                return d.getLang("contextMenu.aligntable");
                                            case "tablesort":
                                                return c.tablesort;
                                            case "borderBack":
                                                return c.borderbk;
                                            default:
                                                return ""
                                        }
                                    }(), className: "edui-for-" + a.icon, subMenu: {items: g, editor: d}
                                })
                            } else (d.commands[a.cmdName] || UE.commands[a.cmdName] || a.query) && -1 < (a.query ? a.query.call(d) : d.queryCommandState(a.cmdName)) && n.push({
                                label: a.label || d.getLang("contextMenu." + a.cmdName),
                                className: "edui-for-" + (a.icon ? a.icon : a.cmdName + (a.value || "")),
                                onclick: a.exec ? function () {
                                    a.exec.call(d)
                                } : function () {
                                    d.execCommand(a.cmdName, a.value)
                                }
                            })
                        })(m)
                    }
                    "-" == n[n.length -
                    1] && n.pop();
                    b = new UE.ui.Menu({items: n, className: "edui-contextmenu", editor: d});
                    b.render();
                    b.showAt(l);
                    d.fireEvent("aftershowcontextmenu", b);
                    f.preventDefault(g);
                    if (r.ie) {
                        var t;
                        try {
                            t = d.selection.getNative().createRange()
                        } catch (p) {
                            return
                        }
                        t.item && (new L.Range(d.document)).selectNode(t.item(0)).select(!0, !0)
                    }
                });
                d.addListener("aftershowcontextmenu", function (a, b) {
                    if (d.zeroclipboard) {
                        var c = b.items, e;
                        for (e in c) "edui-for-copy" == c[e].className && d.zeroclipboard.clip(c[e].getDom())
                    }
                })
            }
        }
    };
    UE.plugins.shortcutmenu =
        function () {
            var d, c = this.options.shortcutMenu || [];
            c.length && (this.addListener("contextmenu mouseup", function (b, a) {
                var e = this, h = {
                    type: b,
                    target: a.target || a.srcElement,
                    screenX: a.screenX,
                    screenY: a.screenY,
                    clientX: a.clientX,
                    clientY: a.clientY
                };
                setTimeout(function () {
                    if (!1 === e.selection.getRange().collapsed || "contextmenu" == b) d || (d = new s.editor.ui.ShortCutMenu({
                        editor: e,
                        items: c,
                        theme: e.options.theme,
                        className: "edui-shortcutmenu"
                    }), d.render(), e.fireEvent("afterrendershortcutmenu", d)), d.show(h, !!UE.plugins.contextmenu)
                });
                if ("contextmenu" == b && (f.preventDefault(a), r.ie9below)) {
                    var g;
                    try {
                        g = e.selection.getNative().createRange()
                    } catch (l) {
                        return
                    }
                    g.item && (new L.Range(e.document)).selectNode(g.item(0)).select(!0, !0)
                }
            }), this.addListener("keydown", function (b) {
                "keydown" == b && d && !d.isHidden && d.hide()
            }))
        };
    UE.plugins.basestyle = function () {
        var d = {bold: ["strong", "b"], italic: ["em", "i"], subscript: ["sub"], superscript: ["sup"]},
            c = function (a, b) {
                return f.filterNodeList(a.selection.getStartElementPath(), b)
            }, b = this;
        b.addshortcutkey({
            Bold: "ctrl+66",
            Italic: "ctrl+73", Underline: "ctrl+85"
        });
        b.addInputRule(function (a) {
            p.each(a.getNodesByTagName("b i"), function (a) {
                switch (a.tagName) {
                    case "b":
                        a.tagName = "strong";
                        break;
                    case "i":
                        a.tagName = "em"
                }
            })
        });
        for (var a in d) (function (a, d) {
            b.commands[a] = {
                execCommand: function (a) {
                    var e = b.selection.getRange(), k = c(this, d);
                    if (e.collapsed) {
                        if (k) a = b.document.createTextNode(""), e.insertNode(a).removeInlineStyle(d), e.setStartBefore(a), f.remove(a); else {
                            k = e.document.createElement(d[0]);
                            if ("superscript" == a || "subscript" == a) a =
                                b.document.createTextNode(""), e.insertNode(a).removeInlineStyle(["sub", "sup"]).setStartBefore(a).collapse(!0);
                            e.insertNode(k).setStart(k, 0)
                        }
                        e.collapse(!0)
                    } else {
                        if ("superscript" == a || "subscript" == a) k && k.tagName.toLowerCase() == a || e.removeInlineStyle(["sub", "sup"]);
                        k ? e.removeInlineStyle(d) : e.applyInlineStyle(d[0])
                    }
                    e.select()
                }, queryCommandState: function () {
                    return c(this, d) ? 1 : 0
                }
            }
        })(a, d[a])
    };
    UE.plugins.elementpath = function () {
        var d, c, b = this;
        b.setOpt("elementPathEnabled", !0);
        b.options.elementPathEnabled && (b.commands.elementpath =
            {
                execCommand: function (a, e) {
                    var f = c[e], g = b.selection.getRange();
                    d = 1 * e;
                    g.selectNode(f).select()
                }, queryCommandValue: function () {
                    var a = [].concat(this.selection.getStartElementPath()).reverse(), b = [];
                    c = a;
                    for (var f = 0, g; g = a[f]; f++) if (3 != g.nodeType) {
                        var l = g.tagName.toLowerCase();
                        "img" == l && g.getAttribute("anchorname") && (l = "anchor");
                        b[f] = l;
                        if (d == f) {
                            d = -1;
                            break
                        }
                    }
                    return b
                }
            })
    };
    UE.plugins.formatmatch = function () {
        function d(h, g) {
            if (r.webkit) var l = "IMG" == g.target.tagName ? g.target : null;
            c.undoManger && c.undoManger.save();
            var k = c.selection.getRange(), l = l || k.getClosedNode();
            if (a && l && "IMG" == l.tagName) l.style.cssText += ";float:" + (a.style.cssFloat || a.style.styleFloat || "none") + ";display:" + (a.style.display || "inline"), a = null; else if (!a) {
                if (k.collapsed) {
                    var m = c.document.createTextNode("match");
                    k.insertNode(m).select()
                }
                c.__hasEnterExecCommand = !0;
                k = c.options.removeFormatAttributes;
                c.options.removeFormatAttributes = "";
                c.execCommand("removeformat");
                c.options.removeFormatAttributes = k;
                c.__hasEnterExecCommand = !1;
                k = c.selection.getRange();
                b.length && (l = k, m && l.selectNode(m), l.applyInlineStyle(b[b.length - 1].tagName, null, b));
                m && k.setStartBefore(m).collapse(!0);
                k.select();
                m && f.remove(m)
            }
            c.undoManger && c.undoManger.save();
            c.removeListener("mouseup", d);
            e = 0
        }

        var c = this, b = [], a, e = 0;
        c.addListener("reset", function () {
            b = [];
            e = 0
        });
        c.commands.formatmatch = {
            execCommand: function (h) {
                if (e) e = 0, b = [], c.removeListener("mouseup", d); else {
                    h = c.selection.getRange();
                    a = h.getClosedNode();
                    if (!a || "IMG" != a.tagName) {
                        h.collapse(!0).shrinkBoundary();
                        b = f.findParents(h.startContainer,
                            !0, function (a) {
                                return !f.isBlockElm(a) && 1 == a.nodeType
                            });
                        h = 0;
                        for (var g; g = b[h]; h++) if ("A" == g.tagName) {
                            b.splice(h, 1);
                            break
                        }
                    }
                    c.addListener("mouseup", d);
                    e = 1
                }
            }, queryCommandState: function () {
                return e
            }, notNeedUndo: 1
        }
    };
    UE.plugin.register("searchreplace", function () {
        function d(a, b, c) {
            var l = 0;
            a = a.firstChild;
            for (var k = 0; a;) {
                if (3 == a.nodeType) {
                    if (k = a.nodeValue.replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length, l += k, l >= b) return {
                        node: a,
                        index: k - (l - b)
                    }
                } else if (!v.$empty[a.tagName] && (k = a[r.ie ? "innerText" : "textContent"].replace(/(^[\t\r\n]+)|([\t\r\n]+$)/,
                    "").length, l += k, l >= b && (k = d(a, k - (l - b), c)))) return k;
                a = f.getNextDomNode(a)
            }
        }

        function c(c, h) {
            var g = c.selection.getRange(), l, k = h.searchStr, m = c.document.createElement("span");
            m.innerHTML = "$$ueditor_searchreplace_key$$";
            g.shrinkBoundary(!0);
            if (!g.collapsed) {
                g.select();
                var n = c.selection.getText();
                if (RegExp("^" + h.searchStr + "$", h.casesensitive ? "" : "i").test(n)) {
                    if (void 0 != h.replaceStr) return k = h.replaceStr, k = b.document.createTextNode(k), g.deleteContents().insertNode(k), g.select(), !0;
                    g.collapse(-1 == h.dir)
                }
            }
            g.insertNode(m);
            g.enlargeToBlockElm(!0);
            l = g.startContainer;
            n = l[r.ie ? "innerText" : "textContent"].indexOf("$$ueditor_searchreplace_key$$");
            g.setStartBefore(m);
            f.remove(m);
            a:{
                var m = l, q;
                l = h.all || 1 == h.dir ? "getNextDomNode" : "getPreDomNode";
                f.isBody(m) && (m = m.firstChild);
                for (; m;) {
                    q = 3 == m.nodeType ? m.nodeValue : m[r.ie ? "innerText" : "textContent"];
                    b:{
                        var t = h, p = n, y = t.searchStr;
                        -1 == t.dir && (q = q.split("").reverse().join(""), y = y.split("").reverse().join(""), p = q.length - p);
                        for (var y = RegExp(y, "g" + (t.casesensitive ? "" : "i")), u = void 0; u = y.exec(q);) if (u.index >=
                            p) {
                            q = -1 == t.dir ? q.length - u.index - t.searchStr.length : u.index;
                            break b
                        }
                        q = -1
                    }
                    if (-1 != q) {
                        n = {node: m, index: q};
                        break a
                    }
                    for (m = f[l](m); m && a[m.nodeName.toLowerCase()];) m = f[l](m, !0);
                    m && (n = -1 == h.dir ? (3 == m.nodeType ? m.nodeValue : m[r.ie ? "innerText" : "textContent"]).length : 0)
                }
                n = void 0
            }
            if (n) return m = d(n.node, n.index, k), k = d(n.node, n.index + k.length, k), g.setStart(m.node, m.index).setEnd(k.node, k.index), void 0 !== h.replaceStr && (k = h.replaceStr, k = b.document.createTextNode(k), g.deleteContents().insertNode(k)), g.select(), !0;
            g.setCursor()
        }

        var b = this, a = {table: 1, tbody: 1, tr: 1, ol: 1, ul: 1};
        return {
            commands: {
                searchreplace: {
                    execCommand: function (a, d) {
                        p.extend(d, {all: !1, casesensitive: !1, dir: 1}, !0);
                        var g = 0;
                        if (d.all) {
                            var f = b.selection.getRange(), k = b.body.firstChild;
                            k && 1 == k.nodeType ? (f.setStart(k, 0), f.shrinkBoundary(!0)) : 3 == k.nodeType && f.setStartBefore(k);
                            f.collapse(!0).select(!0);
                            for (void 0 !== d.replaceStr && b.fireEvent("saveScene"); c(this, d);) g++
                        } else void 0 !== d.replaceStr && b.fireEvent("saveScene"), c(this, d) && g++;
                        g && b.fireEvent("saveScene");
                        return g
                    },
                    notNeedUndo: 1
                }
            }
        }
    });
    UE.plugins.customstyle = function () {
        var d = this;
        d.setOpt({
            customstyle: [{
                tag: "h1",
                name: "tc",
                style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;"
            }, {
                tag: "h1",
                name: "tl",
                style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;"
            }, {
                tag: "span",
                name: "im",
                style: "font-size:16px;font-style:italic;font-weight:bold;line-height:18px;"
            }, {
                tag: "span",
                name: "hi",
                style: "font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;"
            }]
        });
        d.commands.customstyle = {
            execCommand: function (c, b) {
                var a = b.tag, e = f.findParent(this.selection.getStart(), function (a) {
                    return a.getAttribute("label")
                }, !0), d, g, l = {};
                for (d in b) void 0 !== b[d] && (l[d] = b[d]);
                delete l.tag;
                if (e && e.getAttribute("label") == b.label) {
                    d = this.selection.getRange();
                    g = d.createBookmark();
                    if (d.collapsed) if (v.$block[e.tagName]) {
                        var k = this.document.createElement("p");
                        f.moveChild(e, k);
                        e.parentNode.insertBefore(k, e);
                        f.remove(e)
                    } else f.remove(e, !0); else {
                        e = f.getCommonAncestor(g.start, g.end);
                        l =
                            f.getElementsByTagName(e, a);
                        RegExp(a, "i").test(e.tagName) && l.push(e);
                        for (var m = 0, n; n = l[m++];) if (n.getAttribute("label") == b.label) {
                            var k = f.getPosition(n, g.start), q = f.getPosition(n, g.end);
                            (k & f.POSITION_FOLLOWING || k & f.POSITION_CONTAINS) && (q & f.POSITION_PRECEDING || q & f.POSITION_CONTAINS) && v.$block[a] && (k = this.document.createElement("p"), f.moveChild(n, k), n.parentNode.insertBefore(k, n));
                            f.remove(n, !0)
                        }
                        (e = f.findParent(e, function (a) {
                            return a.getAttribute("label") == b.label
                        }, !0)) && f.remove(e, !0)
                    }
                    d.moveToBookmark(g).select()
                } else v.$block[a] ?
                    (this.execCommand("paragraph", a, l, "customstyle"), d = this.selection.getRange(), d.collapsed || (d.collapse(), e = f.findParent(this.selection.getStart(), function (a) {
                        return a.getAttribute("label") == b.label
                    }, !0), a = this.document.createElement("p"), f.insertAfter(e, a), f.fillNode(this.document, a), d.setStart(a, 0).setCursor())) : (d = this.selection.getRange(), d.collapsed ? (e = this.document.createElement(a), f.setAttributes(e, l), d.insertNode(e).setStart(e, 0).setCursor()) : (g = d.createBookmark(), d.applyInlineStyle(a, l).moveToBookmark(g).select()))
            },
            queryCommandValue: function () {
                var c = f.filterNodeList(this.selection.getStartElementPath(), function (b) {
                    return b.getAttribute("label")
                });
                return c ? c.getAttribute("label") : ""
            }
        };
        d.addListener("keyup", function (c, b) {
            var a = b.keyCode || b.which;
            if (32 == a || 13 == a) if (a = d.selection.getRange(), a.collapsed) {
                var e = f.findParent(d.selection.getStart(), function (a) {
                    return a.getAttribute("label")
                }, !0);
                if (e && v.$block[e.tagName] && f.isEmptyNode(e)) {
                    var h = d.document.createElement("p");
                    f.insertAfter(e, h);
                    f.fillNode(d.document,
                        h);
                    f.remove(e);
                    a.setStart(h, 0).setCursor()
                }
            }
        })
    };
    UE.plugins.catchremoteimage = function () {
        var d = this, c = UE.ajax;
        !1 !== d.options.catchRemoteImageEnable && (d.setOpt({catchRemoteImageEnable: !1}), d.addListener("afterpaste", function () {
            d.fireEvent("catchRemoteImage")
        }), d.addListener("catchRemoteImage", function () {
            function b(a, b) {
                var f = p.serializeParam(d.queryCommandValue("serverparam")) || "",
                    f = p.formatUrl(e + (-1 == e.indexOf("?") ? "?" : "&") + f), h = {
                        method: "POST", dataType: p.isCrossDomainUrl(f) ? "jsonp" : "", timeout: 6E4, onsuccess: b.success,
                        onerror: b.error
                    };
                h[g] = a;
                c.request(f, h)
            }

            for (var a = d.getOpt("catcherLocalDomain"), e = d.getActionUrl(d.getOpt("catcherActionName")), h = d.getOpt("catcherUrlPrefix"), g = d.getOpt("catcherFieldName"), l = [], k = f.getElementsByTagName(d.document, "img"), m = function (a, b) {
                if (-1 != a.indexOf(location.host) || /(^\.)|(^\/)/.test(a)) return !0;
                if (b) for (var c = 0, e; e = b[c++];) if (-1 !== a.indexOf(e)) return !0;
                return !1
            }, n = 0, q; q = k[n++];) q.getAttribute("word_img") || (q = q.getAttribute("_src") || q.src || "", /^(https?|ftp):/i.test(q) && !m(q, a) &&
            l.push(q));
            l.length && b(l, {
                success: function (a) {
                    try {
                        var b = void 0 !== a.state ? a : eval("(" + a.responseText + ")")
                    } catch (c) {
                        return
                    }
                    var e, g, n, l = b.list;
                    for (a = 0; b = k[a++];) for (n = b.getAttribute("_src") || b.src || "", e = 0; g = l[e++];) if (n == g.source && "SUCCESS" == g.state) {
                        e = h + g.url;
                        f.setAttributes(b, {src: e, _src: e});
                        break
                    }
                    d.fireEvent("catchremotesuccess")
                }, error: function () {
                    d.fireEvent("catchremoteerror")
                }
            })
        }))
    };
    UE.plugin.register("snapscreen", function () {
        function d(a) {
            var b = document.createElement("a"), d = p.serializeParam(c.queryCommandValue("serverparam")) ||
                "";
            b.href = a;
            r.ie && (b.href = b.href);
            a = b.search;
            d && (a = a + (-1 == a.indexOf("?") ? "?" : "&") + d, a = a.replace(/[&]+/ig, "&"));
            return {port: b.port, hostname: b.hostname, path: b.pathname + a || +b.hash}
        }

        var c = this, b;
        return {
            commands: {
                snapscreen: {
                    execCommand: function (a) {
                        function e(a) {
                            try {
                                if (a = eval("(" + a + ")"), "SUCCESS" == a.state) {
                                    var b = c.options;
                                    c.execCommand("insertimage", {
                                        src: b.snapscreenUrlPrefix + a.url,
                                        _src: b.snapscreenUrlPrefix + a.url,
                                        alt: a.title || "",
                                        floatStyle: b.snapscreenImgAlign
                                    })
                                } else alert(a.state)
                            } catch (e) {
                                alert(l.callBackErrorMsg)
                            }
                        }

                        var f, g, l = c.getLang("snapScreen_plugin");
                        if (!b) {
                            a = c.container;
                            b = (c.container.ownerDocument || c.container.document).createElement("object");
                            try {
                                b.type = "application/x-pluginbaidusnap"
                            } catch (k) {
                                return
                            }
                            b.style.cssText = "position:absolute;left:-9999px;width:0;height:0;";
                            b.setAttribute("width", "0");
                            b.setAttribute("height", "0");
                            a.appendChild(b)
                        }
                        a = c.getActionUrl(c.getOpt("snapscreenActionName"));
                        f = d(a);
                        setTimeout(function () {
                            try {
                                g = b.saveSnapshot(f.hostname, f.path, f.port)
                            } catch (a) {
                                c.ui._dialogs.snapscreenDialog.open();
                                return
                            }
                            e(g)
                        }, 50)
                    }, queryCommandState: function () {
                        return -1 != navigator.userAgent.indexOf("Windows", 0) ? 0 : -1
                    }
                }
            }
        }
    });
    UE.commands.insertparagraph = {
        execCommand: function (d, c) {
            for (var b = this.selection.getRange(), a = b.startContainer, e; a && !f.isBody(a);) e = a, a = a.parentNode;
            e && (a = this.document.createElement("p"), c ? e.parentNode.insertBefore(a, e) : e.parentNode.insertBefore(a, e.nextSibling), f.fillNode(this.document, a), b.setStart(a, 0).setCursor(!1, !0))
        }
    };
    UE.plugin.register("webapp", function () {
        function d(b, a) {
            return a ? '<iframe class="edui-faked-webapp" title="' +
                b.title + '" ' + (b.align && !b.cssfloat ? 'align="' + b.align + '"' : "") + (b.cssfloat ? 'style="float:' + b.cssfloat + '"' : "") + 'width="' + b.width + '" height="' + b.height + '"  scrolling="no" frameborder="0" src="' + b.url + '" logo_url = "' + b.logo + '"></iframe>' : '<img title="' + b.title + '" width="' + b.width + '" height="' + b.height + '" src="' + c.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" _logo_url="' + b.logo + '" style="background:url(' + b.logo + ') no-repeat center center; border:1px solid gray;" class="edui-faked-webapp" _url="' +
                b.url + '" ' + (b.align && !b.cssfloat ? 'align="' + b.align + '"' : "") + (b.cssfloat ? 'style="float:' + b.cssfloat + '"' : "") + "/>"
        }

        var c = this;
        return {
            outputRule: function (b) {
                p.each(b.getNodesByTagName("img"), function (a) {
                    var b;
                    "edui-faked-webapp" == a.getAttr("class") && (b = d({
                        title: a.getAttr("title"),
                        width: a.getAttr("width"),
                        height: a.getAttr("height"),
                        align: a.getAttr("align"),
                        cssfloat: a.getStyle("float"),
                        url: a.getAttr("_url"),
                        logo: a.getAttr("_logo_url")
                    }, !0), b = UE.uNode.createElement(b), a.parentNode.replaceChild(b, a))
                })
            }, inputRule: function (b) {
                p.each(b.getNodesByTagName("iframe"),
                    function (a) {
                        if ("edui-faked-webapp" == a.getAttr("class")) {
                            var b = UE.uNode.createElement(d({
                                title: a.getAttr("title"),
                                width: a.getAttr("width"),
                                height: a.getAttr("height"),
                                align: a.getAttr("align"),
                                cssfloat: a.getStyle("float"),
                                url: a.getAttr("src"),
                                logo: a.getAttr("logo_url")
                            }));
                            a.parentNode.replaceChild(b, a)
                        }
                    })
            }, commands: {
                webapp: {
                    execCommand: function (b, a) {
                        var c = d(p.extend(a, {align: "none"}), !1);
                        this.execCommand("inserthtml", c)
                    }, queryCommandState: function () {
                        var b = this.selection.getRange().getClosedNode();
                        return b &&
                        "edui-faked-webapp" == b.className ? 1 : 0
                    }
                }
            }
        }
    });
    UE.plugins.template = function () {
        UE.commands.template = {
            execCommand: function (d, c) {
                c.html && this.execCommand("inserthtml", c.html)
            }
        };
        this.addListener("click", function (d, c) {
            var b = c.target || c.srcElement, a = this.selection.getRange();
            (b = f.findParent(b, function (a) {
                if (a.className && f.hasClass(a, "ue_t")) return a
            }, !0)) && a.selectNode(b).shrinkBoundary().select()
        });
        this.addListener("keydown", function (d, c) {
            var b = this.selection.getRange();
            b.collapsed || c.ctrlKey || c.metaKey ||
            c.shiftKey || c.altKey || (b = f.findParent(b.startContainer, function (a) {
                if (a.className && f.hasClass(a, "ue_t")) return a
            }, !0)) && f.removeClasses(b, ["ue_t"])
        })
    };
    UE.plugin.register("music", function () {
        function d(b, a, e, d, g, f) {
            return f ? '<embed type="application/x-shockwave-flash" class="edui-faked-music" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + b + '" width="' + a + '" height="' + e + '" ' + (d && !g ? 'align="' + d + '"' : "") + (g ? 'style="float:' + g + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >' :
                "<img " + (d && !g ? 'align="' + d + '"' : "") + (g ? 'style="float:' + g + '"' : "") + ' width="' + a + '" height="' + e + '" _url="' + b + '" class="edui-faked-music" src="' + c.options.langPath + c.options.lang + '/images/music.png" />'
        }

        var c = this;
        return {
            outputRule: function (b) {
                p.each(b.getNodesByTagName("img"), function (a) {
                    var b;
                    if ("edui-faked-music" == a.getAttr("class")) {
                        b = a.getStyle("float");
                        var c = a.getAttr("align");
                        b = d(a.getAttr("_url"), a.getAttr("width"), a.getAttr("height"), c, b, !0);
                        b = UE.uNode.createElement(b);
                        a.parentNode.replaceChild(b,
                            a)
                    }
                })
            }, inputRule: function (b) {
                p.each(b.getNodesByTagName("embed"), function (a) {
                    if ("edui-faked-music" == a.getAttr("class")) {
                        var b = a.getStyle("float"), c = a.getAttr("align");
                        html = d(a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), c, b, !1);
                        b = UE.uNode.createElement(html);
                        a.parentNode.replaceChild(b, a)
                    }
                })
            }, commands: {
                music: {
                    execCommand: function (b, a) {
                        var c = d(a.url, a.width || 400, a.height || 95, "none", !1);
                        this.execCommand("inserthtml", c)
                    }, queryCommandState: function () {
                        var b = this.selection.getRange().getClosedNode();
                        return b && "edui-faked-music" == b.className ? 1 : 0
                    }
                }
            }
        }
    });
    UE.plugin.register("autoupload", function () {
        function d(c, b) {
            var a, e, d, g, l, k, m, n, q = /image\/\w+/i.test(c.type) ? "image" : "file",
                t = "loading_" + (+new Date).toString(36);
            a = b.getOpt(q + "FieldName");
            e = b.getOpt(q + "UrlPrefix");
            d = b.getOpt(q + "MaxSize");
            g = b.getOpt(q + "AllowFiles");
            l = b.getActionUrl(b.getOpt(q + "ActionName"));
            m = function (a) {
                var c = b.document.getElementById(t);
                c && f.remove(c);
                b.fireEvent("showmessage", {id: t, content: a, type: "error", timeout: 4E3})
            };
            "image" ==
            q ? (k = '<img class="loadingclass" id="' + t + '" src="' + b.options.themePath + b.options.theme + '/images/spacer.gif" title="' + (b.getLang("autoupload.loading") || "") + '" >', n = function (a) {
                var c = e + a.url, d = b.document.getElementById(t);
                d && (d.setAttribute("src", c), d.setAttribute("_src", c), d.setAttribute("title", a.title || ""), d.setAttribute("alt", a.original || ""), d.removeAttribute("id"), f.removeClasses(d, "loadingclass"))
            }) : (k = '<p><img class="loadingclass" id="' + t + '" src="' + b.options.themePath + b.options.theme + '/images/spacer.gif" title="' +
                (b.getLang("autoupload.loading") || "") + '" ></p>', n = function (a) {
                a = e + a.url;
                var c = b.document.getElementById(t), d = b.selection.getRange(), g = d.createBookmark();
                d.selectNode(c).select();
                b.execCommand("insertfile", {url: a});
                d.moveToBookmark(g).select()
            });
            b.execCommand("inserthtml", k);
            b.getOpt(q + "ActionName") ? c.size > d ? m(b.getLang("autoupload.exceedSizeError")) : (d = c.name ? c.name.substr(c.name.lastIndexOf(".")) : "") && "image" != q || g && -1 == (g.join("") + ".").indexOf(d.toLowerCase() + ".") ? m(b.getLang("autoupload.exceedTypeError")) :
                (g = new XMLHttpRequest, q = new FormData, d = p.serializeParam(b.queryCommandValue("serverparam")) || "", l = p.formatUrl(l + (-1 == l.indexOf("?") ? "?" : "&") + d), q.append(a, c, c.name || "blob." + c.type.substr(6)), q.append("type", "ajax"), g.open("post", l, !0), g.setRequestHeader("X-Requested-With", "XMLHttpRequest"), g.addEventListener("load", function (a) {
                    try {
                        var c = (new Function("return " + p.trim(a.target.response)))();
                        "SUCCESS" == c.state && c.url ? n(c) : m(c.state)
                    } catch (e) {
                        m(b.getLang("autoupload.loadError"))
                    }
                }), g.send(q)) : m(b.getLang("autoupload.errorLoadConfig"))
        }

        return {
            outputRule: function (c) {
                p.each(c.getNodesByTagName("img"), function (b) {
                    /\b(loaderrorclass)|(bloaderrorclass)\b/.test(b.getAttr("class")) && b.parentNode.removeChild(b)
                });
                p.each(c.getNodesByTagName("p"), function (b) {
                    /\bloadpara\b/.test(b.getAttr("class")) && b.parentNode.removeChild(b)
                })
            }, bindEvents: {
                ready: function (c) {
                    var b = this;
                    window.FormData && window.FileReader && (f.on(b.body, "paste drop", function (a) {
                        var c = !1, f;
                        if (f = "paste" == a.type ? a.clipboardData && a.clipboardData.items && 1 == a.clipboardData.items.length &&
                        /^image\//.test(a.clipboardData.items[0].type) ? a.clipboardData.items : null : a.dataTransfer && a.dataTransfer.files ? a.dataTransfer.files : null) {
                            for (var g = f.length, l; g--;) l = f[g], l.getAsFile && (l = l.getAsFile()), l && 0 < l.size && (d(l, b), c = !0);
                            c && a.preventDefault()
                        }
                    }), f.on(b.body, "dragover", function (a) {
                        "Files" == a.dataTransfer.types[0] && a.preventDefault()
                    }), p.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-left:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" +
                        this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document))
                }
            }
        }
    });
    UE.plugin.register("autosave", function () {
        function d(d) {
            var g;
            new Date - b < a || (d.hasContents() ? (b = new Date, d._saveFlag = null, g = c.body.innerHTML, !1 !== d.fireEvent("beforeautosave", {content: g}) && (c.setPreferences(e, g), d.fireEvent("afterautosave", {content: g}))) : e && c.removePreferences(e))
        }

        var c = this, b = new Date, a = 20,
            e = null;
        return {
            defaultOptions: {saveInterval: 500}, bindEvents: {
                ready: function () {
                    var a = null,
                        a = c.key ? c.key + "-drafts-data" : (c.container.parentNode.id || "ue-common") + "-drafts-data";
                    e = (location.protocol + location.host + location.pathname).replace(/[.:\/]/g, "_") + a
                }, contentchange: function () {
                    e && (c._saveFlag && window.clearTimeout(c._saveFlag), 0 < c.options.saveInterval ? c._saveFlag = window.setTimeout(function () {
                        d(c)
                    }, c.options.saveInterval) : d(c))
                }
            }, commands: {
                clearlocaldata: {
                    execCommand: function (a, b) {
                        e && c.getPreferences(e) &&
                        c.removePreferences(e)
                    }, notNeedUndo: !0, ignoreContentChange: !0
                }, getlocaldata: {
                    execCommand: function (a, b) {
                        return e ? c.getPreferences(e) || "" : ""
                    }, notNeedUndo: !0, ignoreContentChange: !0
                }, drafts: {
                    execCommand: function (a, b) {
                        e && (c.body.innerHTML = c.getPreferences(e) || "<p>" + f.fillHtml + "</p>", c.focus(!0))
                    }, queryCommandState: function () {
                        return e ? null === c.getPreferences(e) ? -1 : 0 : -1
                    }, notNeedUndo: !0, ignoreContentChange: !0
                }
            }
        }
    });
    UE.plugin.register("charts", function () {
        function d(b) {
            var a = null, c = 0;
            if (2 > b.rows.length || 2 > b.rows[0].cells.length) return !1;
            for (var a = b.rows[0].cells, c = a.length, d = 0, g; g = a[d]; d++) if ("th" !== g.tagName.toLowerCase()) return !1;
            for (d = 1; a = b.rows[d]; d++) {
                if (a.cells.length != c || "th" !== a.cells[0].tagName.toLowerCase()) return !1;
                for (var f = 1; g = a.cells[f]; f++) if (g = p.trim(g.innerText || g.textContent || ""), g = g.replace(RegExp(UE.dom.domUtils.fillChar, "g"), "").replace(/^\s+|\s+$/g, ""), !/^\d*\.?\d+$/.test(g)) return !1
            }
            return !0
        }

        var c = this;
        return {
            bindEvents: {
                chartserror: function () {
                }
            }, commands: {
                charts: {
                    execCommand: function (b, a) {
                        var e = f.findParentByTagName(this.selection.getRange().startContainer,
                            "table", !0), h = [], g = {};
                        if (!e) return !1;
                        if (!d(e)) return c.fireEvent("chartserror"), !1;
                        g.title = a.title || "";
                        g.subTitle = a.subTitle || "";
                        g.xTitle = a.xTitle || "";
                        g.yTitle = a.yTitle || "";
                        g.suffix = a.suffix || "";
                        g.tip = a.tip || "";
                        g.dataFormat = a.tableDataFormat || "";
                        g.chartType = a.chartType || 0;
                        for (var l in g) g.hasOwnProperty(l) && h.push(l + ":" + g[l]);
                        e.setAttribute("data-chart", h.join(";"));
                        f.addClass(e, "edui-charts-table")
                    }, queryCommandState: function (b, a) {
                        var c = f.findParentByTagName(this.selection.getRange().startContainer,
                            "table", !0);
                        return c && d(c) ? 0 : -1
                    }
                }
            }, inputRule: function (b) {
                p.each(b.getNodesByTagName("table"), function (a) {
                    void 0 !== a.getAttr("data-chart") && a.setAttr("style")
                })
            }, outputRule: function (b) {
                p.each(b.getNodesByTagName("table"), function (a) {
                    void 0 !== a.getAttr("data-chart") && a.setAttr("style", "display: none;")
                })
            }
        }
    });
    UE.plugin.register("section", function () {
        function d(a) {
            this.tag = "";
            this.level = -1;
            this.parentSection = this.previousSection = this.nextSection = this.dom = null;
            this.startAddress = [];
            this.endAddress = [];
            this.children =
                []
        }

        function c(a) {
            var b = new d;
            return p.extend(b, a)
        }

        function b(a, b) {
            for (var c = b, d = 0; d < a.length; d++) {
                if (!c.childNodes) return null;
                c = c.childNodes[a[d]]
            }
            return c
        }

        var a = this;
        return {
            bindMultiEvents: {
                type: "aftersetcontent afterscencerestore", handler: function () {
                    a.fireEvent("updateSections")
                }
            }, bindEvents: {
                ready: function () {
                    a.fireEvent("updateSections");
                    f.on(a.body, "drop paste", function () {
                        a.fireEvent("updateSections")
                    })
                }, afterexeccommand: function (b, c) {
                    "paragraph" == c && a.fireEvent("updateSections")
                }, keyup: function (a,
                                    b) {
                    if (!0 != this.selection.getRange().collapsed) this.fireEvent("updateSections"); else {
                        var c = b.keyCode || b.which;
                        13 != c && 8 != c && 46 != c || this.fireEvent("updateSections")
                    }
                }
            }, commands: {
                getsections: {
                    execCommand: function (a, b) {
                        function d(a, b) {
                            for (var e, k = null, h, r = a.childNodes, s = 0, v = r.length; s < v; s++) {
                                h = r[s];
                                a:{
                                    e = h;
                                    for (var A = 0; A < f.length; A++) if (f[A](e)) {
                                        e = A;
                                        break a
                                    }
                                    e = -1
                                }
                                if (0 <= e) {
                                    k = m.selection.getRange().selectNode(h).createAddress(!0).startAddress;
                                    k = c({
                                        tag: h.tagName, title: h.innerText || h.textContent || "", level: e,
                                        dom: h, startAddress: p.clone(k, []), endAddress: p.clone(k, []), children: []
                                    });
                                    n.nextSection = k;
                                    for (h = k.previousSection = n; e <= h.level;) h = h.parentSection;
                                    k.parentSection = h;
                                    h.children.push(k);
                                    k = n = k
                                } else 1 === h.nodeType && d(h, b), k && k.endAddress[k.endAddress.length - 1]++
                            }
                        }

                        for (var f = b || "h1 h2 h3 h4 h5 h6".split(" "), k = 0; k < f.length; k++) "string" == typeof f[k] ? f[k] = function (a) {
                            return function (b) {
                                return b.tagName == a.toUpperCase()
                            }
                        }(f[k]) : "function" != typeof f[k] && (f[k] = function (a) {
                            return null
                        });
                        var m = this, n = k = c({
                            level: -1,
                            title: "root"
                        });
                        d(m.body, k);
                        return k
                    }, notNeedUndo: !0
                }, movesection: {
                    execCommand: function (a, c, d, l) {
                        if (c && d && -1 != d.level) {
                            d = l ? d.endAddress : d.startAddress;
                            a = b(d, this.body);
                            var k;
                            if (!(k = !d) && !(k = !a)) {
                                k = c.startAddress;
                                for (var m = !1, n = !1, q = 0; q < k.length && !(q >= d.length); q++) if (d[q] > k[q]) {
                                    m = !0;
                                    break
                                } else if (d[q] < k[q]) break;
                                for (q = 0; q < c.endAddress.length && !(q >= d.length); q++) if (d[q] < k[q]) {
                                    n = !0;
                                    break
                                } else if (d[q] > k[q]) break;
                                k = m && n
                            }
                            if (!k) {
                                d = b(c.startAddress, this.body);
                                c = b(c.endAddress, this.body);
                                if (l) for (l = c; l && !(f.getPosition(d,
                                    l) & f.POSITION_FOLLOWING);) {
                                    k = l.previousSibling;
                                    f.insertAfter(a, l);
                                    if (l == d) break;
                                    l = k
                                } else for (l = d; l && !(f.getPosition(l, c) & f.POSITION_FOLLOWING);) {
                                    k = l.nextSibling;
                                    a.parentNode.insertBefore(l, a);
                                    if (l == c) break;
                                    l = k
                                }
                                this.fireEvent("updateSections")
                            }
                        }
                    }
                }, deletesection: {
                    execCommand: function (a, b, c) {
                        function d(a) {
                            for (var b = k.body, c = 0; c < a.length; c++) {
                                if (!b.childNodes) return null;
                                b = b.childNodes[a[c]]
                            }
                            return b
                        }

                        var k = this;
                        if (b) {
                            a = d(b.startAddress);
                            b = d(b.endAddress);
                            if (c) f.remove(a); else for (; a && f.inDoc(b, k.document) &&
                                                            !(f.getPosition(a, b) & f.POSITION_FOLLOWING);) c = a.nextSibling, f.remove(a), a = c;
                            k.fireEvent("updateSections")
                        }
                    }
                }, selectsection: {
                    execCommand: function (a, b) {
                        if (!b && !b.dom) return !1;
                        var c = this.selection.getRange(),
                            d = {startAddress: p.clone(b.startAddress, []), endAddress: p.clone(b.endAddress, [])};
                        d.endAddress[d.endAddress.length - 1]++;
                        c.moveToAddress(d).select().scrollToView();
                        return !0
                    }, notNeedUndo: !0
                }, scrolltosection: {
                    execCommand: function (a, b) {
                        if (!b && !b.dom) return !1;
                        var c = this.selection.getRange(), d = {
                            startAddress: b.startAddress,
                            endAddress: b.endAddress
                        };
                        d.endAddress[d.endAddress.length - 1]++;
                        c.moveToAddress(d).scrollToView();
                        return !0
                    }, notNeedUndo: !0
                }
            }
        }
    });
    UE.plugin.register("simpleupload", function () {
        function d() {
            var e = a.offsetWidth || 20, d = a.offsetHeight || 20, g = document.createElement("iframe"),
                l = "display:block;width:" + e + "px;height:" + d + "px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;";
            f.on(g, "load", function () {
                var a =
                    (+new Date).toString(36), m, n, q;
                n = g.contentDocument || g.contentWindow.document;
                q = n.body;
                m = n.createElement("div");
                m.innerHTML = '<form id="edui_form_' + a + '" target="edui_iframe_' + a + '" method="POST" enctype="multipart/form-data" action="' + c.getOpt("serverUrl") + '" style="' + l + '"><input id="edui_input_' + a + '" type="file" accept="image/*" name="' + c.options.imageFieldName + '" style="' + l + '"></form><iframe id="edui_iframe_' + a + '" name="edui_iframe_' + a + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>';
                m.className = "edui-" + c.options.theme;
                m.id = c.ui.id + "_iframeupload";
                q.style.cssText = l;
                q.style.width = e + "px";
                q.style.height = d + "px";
                q.appendChild(m);
                q.parentNode && (q.parentNode.style.width = e + "px", q.parentNode.style.height = e + "px");
                var t = n.getElementById("edui_form_" + a), w = n.getElementById("edui_input_" + a),
                    r = n.getElementById("edui_iframe_" + a);
                f.on(w, "change", function () {
                    function a() {
                        try {
                            var d, g, k, h = (r.contentDocument || r.contentWindow.document).body;
                            g = (new Function("return " + (h.innerText || h.textContent || "")))();
                            d = c.options.imageUrlPrefix + g.url;
                            "SUCCESS" == g.state && g.url ? (k = c.document.getElementById(e), k.setAttribute("src", d), k.setAttribute("_src", d), k.setAttribute("title", g.title || ""), k.setAttribute("alt", g.original || ""), k.removeAttribute("id"), f.removeClasses(k, "loadingclass")) : b && b(g.state)
                        } catch (n) {
                            b && b(c.getLang("simpleupload.loadError"))
                        }
                        t.reset();
                        f.un(r, "load", a)
                    }

                    function b(a) {
                        if (e) {
                            var d = c.document.getElementById(e);
                            d && f.remove(d);
                            c.fireEvent("showmessage", {id: e, content: a, type: "error", timeout: 4E3})
                        }
                    }

                    if (w.value) {
                        var e = "loading_" + (+new Date).toString(36),
                            d = p.serializeParam(c.queryCommandValue("serverparam")) || "",
                            g = c.getActionUrl(c.getOpt("imageActionName")), k = c.getOpt("imageAllowFiles");
                        c.focus();
                        c.execCommand("inserthtml", '<img class="loadingclass" id="' + e + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif" title="' + (c.getLang("simpleupload.loading") || "") + '" >');
                        if (c.getOpt("imageActionName")) {
                            var h = w.value, h = h ? h.substr(h.lastIndexOf(".")) : "";
                            !h || k && -1 == (k.join("") + ".").indexOf(h.toLowerCase() +
                                ".") ? b(c.getLang("simpleupload.exceedTypeError")) : (f.on(r, "load", a), t.action = p.formatUrl(g + (-1 == g.indexOf("?") ? "?" : "&") + d), t.submit())
                        } else errorHandler(c.getLang("autoupload.errorLoadConfig"))
                    }
                });
                var u;
                c.addListener("selectionchange", function () {
                    clearTimeout(u);
                    u = setTimeout(function () {
                        -1 == c.queryCommandState("simpleupload") ? w.disabled = "disabled" : w.disabled = !1
                    }, 400)
                });
                b = !0
            });
            g.style.cssText = l;
            a.appendChild(g)
        }

        var c = this, b = !1, a;
        return {
            bindEvents: {
                ready: function () {
                    p.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" +
                        this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document)
                }, simpleuploadbtnready: function (b, f) {
                    a = f;
                    c.afterConfigReady(d)
                }
            }, outputRule: function (a) {
                p.each(a.getNodesByTagName("img"),
                    function (a) {
                        /\b(loaderrorclass)|(bloaderrorclass)\b/.test(a.getAttr("class")) && a.parentNode.removeChild(a)
                    })
            }, commands: {
                simpleupload: {
                    queryCommandState: function () {
                        return b ? 0 : -1
                    }
                }
            }
        }
    });
    UE.plugin.register("serverparam", function () {
        var d = {};
        return {
            commands: {
                serverparam: {
                    execCommand: function (c, b, a) {
                        void 0 === b || null === b ? d = {} : p.isString(b) ? void 0 === a || null === a ? delete d[b] : d[b] = a : p.isObject(b) ? p.extend(d, b, !0) : p.isFunction(b) && p.extend(d, b(), !0)
                    }, queryCommandValue: function () {
                        return d || {}
                    }
                }
            }
        }
    });
    UE.plugin.register("insertfile",
        function () {
            var d = this;
            return {
                commands: {
                    insertfile: {
                        execCommand: function (c, b) {
                            b = p.isArray(b) ? b : [b];
                            var a, e, f, g, l = "";
                            a = d.getOpt("UEDITOR_HOME_URL");
                            var k = a + ("/" == a.substr(a.length - 1) ? "" : "/") + "dialogs/attachment/fileTypeImages/";
                            for (a = 0; a < b.length; a++) {
                                e = b[a];
                                f = k;
                                g = e.url;
                                g = g.substr(g.lastIndexOf(".") + 1).toLowerCase();
                                var m = {
                                    rar: "icon_rar.gif",
                                    zip: "icon_rar.gif",
                                    tar: "icon_rar.gif",
                                    gz: "icon_rar.gif",
                                    bz2: "icon_rar.gif",
                                    doc: "icon_doc.gif",
                                    docx: "icon_doc.gif",
                                    pdf: "icon_pdf.gif",
                                    mp3: "icon_mp3.gif",
                                    xls: "icon_xls.gif",
                                    chm: "icon_chm.gif",
                                    ppt: "icon_ppt.gif",
                                    pptx: "icon_ppt.gif",
                                    avi: "icon_mv.gif",
                                    rmvb: "icon_mv.gif",
                                    wmv: "icon_mv.gif",
                                    flv: "icon_mv.gif",
                                    swf: "icon_mv.gif",
                                    rm: "icon_mv.gif",
                                    exe: "icon_exe.gif",
                                    psd: "icon_psd.gif",
                                    txt: "icon_txt.gif",
                                    jpg: "icon_jpg.gif",
                                    png: "icon_jpg.gif",
                                    jpeg: "icon_jpg.gif",
                                    gif: "icon_jpg.gif",
                                    ico: "icon_jpg.gif",
                                    bmp: "icon_jpg.gif"
                                };
                                f += m[g] ? m[g] : m.txt;
                                g = e.title || e.url.substr(e.url.lastIndexOf("/") + 1);
                                l += '<p style="line-height: 16px;"><img style="vertical-align: middle; margin-right: 2px;" src="' +
                                    f + '" _src="' + f + '" /><a style="font-size:12px; color:#0066cc;" href="' + e.url + '" title="' + g + '">' + g + "</a></p>"
                            }
                            d.execCommand("insertHtml", l)
                        }
                    }
                }
            }
        });
    s = s || {};
    s.editor = s.editor || {};
    UE.ui = s.editor.ui = {};
    (function () {
        function d() {
            var a = document.getElementById("edui_fixedlayer");
            f.setViewportOffset(a, {left: 0, top: 0})
        }

        var c = s.editor.browser, b = s.editor.dom.domUtils, a = window.$EDITORUI = {}, e = 0,
            f = s.editor.ui.uiUtils = {
                uid: function (a) {
                    return a ? a.ID$EDITORUI || (a.ID$EDITORUI = ++e) : ++e
                }, hook: function (a, b) {
                    var c;
                    a && a._callbacks ?
                        c = a : (c = function () {
                            var b;
                            a && (b = a.apply(this, arguments));
                            for (var e = c._callbacks, d = e.length; d--;) {
                                var f = e[d].apply(this, arguments);
                                void 0 === b && (b = f)
                            }
                            return b
                        }, c._callbacks = []);
                    c._callbacks.push(b);
                    return c
                }, createElementByHtml: function (a) {
                    var b = document.createElement("div");
                    b.innerHTML = a;
                    b = b.firstChild;
                    b.parentNode.removeChild(b);
                    return b
                }, getViewportElement: function () {
                    return c.ie && c.quirks ? document.body : document.documentElement
                }, getClientRect: function (a) {
                    var c;
                    try {
                        c = a.getBoundingClientRect()
                    } catch (e) {
                        c =
                            {left: 0, top: 0, height: 0, width: 0}
                    }
                    for (var d = {
                        left: Math.round(c.left),
                        top: Math.round(c.top),
                        height: Math.round(c.bottom - c.top),
                        width: Math.round(c.right - c.left)
                    }, f; (f = a.ownerDocument) !== document && (a = b.getWindow(f).frameElement);) c = a.getBoundingClientRect(), d.left += c.left, d.top += c.top;
                    d.bottom = d.top + d.height;
                    d.right = d.left + d.width;
                    return d
                }, getViewportRect: function () {
                    var a = f.getViewportElement(), b = (window.innerWidth || a.clientWidth) | 0,
                        a = (window.innerHeight || a.clientHeight) | 0;
                    return {
                        left: 0, top: 0, height: a,
                        width: b, bottom: a, right: b
                    }
                }, setViewportOffset: function (a, c) {
                    var e = f.getFixedLayer();
                    a.parentNode === e ? (a.style.left = c.left + "px", a.style.top = c.top + "px") : b.setViewportOffset(a, c)
                }, getEventOffset: function (a) {
                    var b = f.getClientRect(a.target || a.srcElement);
                    a = f.getViewportOffsetByEvent(a);
                    return {left: a.left - b.left, top: a.top - b.top}
                }, getViewportOffsetByEvent: function (a) {
                    var c = a.target || a.srcElement, e = b.getWindow(c).frameElement;
                    a = {left: a.clientX, top: a.clientY};
                    e && c.ownerDocument !== document && (c = f.getClientRect(e),
                        a.left += c.left, a.top += c.top);
                    return a
                }, setGlobal: function (b, c) {
                    a[b] = c;
                    return '$EDITORUI["' + b + '"]'
                }, unsetGlobal: function (b) {
                    delete a[b]
                }, copyAttributes: function (a, e) {
                    for (var d = e.attributes, f = d.length; f--;) {
                        var h = d[f];
                        "style" == h.nodeName || "class" == h.nodeName || c.ie && !h.specified || a.setAttribute(h.nodeName, h.nodeValue)
                    }
                    e.className && b.addClass(a, e.className);
                    e.style.cssText && (a.style.cssText += ";" + e.style.cssText)
                }, removeStyle: function (a, b) {
                    if (a.style.removeProperty) a.style.removeProperty(b); else if (a.style.removeAttribute) a.style.removeAttribute(b);
                    else throw"";
                }, contains: function (a, b) {
                    return a && b && (a === b ? !1 : a.contains ? a.contains(b) : a.compareDocumentPosition(b) & 16)
                }, startDrag: function (a, b, c) {
                    function e(a) {
                        b.ondragmove(a.clientX - d, a.clientY - f, a);
                        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
                    }

                    c = c || document;
                    var d = a.clientX, f = a.clientY;
                    if (c.addEventListener) {
                        var h = function (a) {
                            c.removeEventListener("mousemove", e, !0);
                            c.removeEventListener("mouseup", h, !0);
                            window.removeEventListener("mouseup", h, !0);
                            b.ondragstop()
                        };
                        c.addEventListener("mousemove",
                            e, !0);
                        c.addEventListener("mouseup", h, !0);
                        window.addEventListener("mouseup", h, !0);
                        a.preventDefault()
                    } else {
                        var p = a.srcElement;
                        p.setCapture();
                        var r = function () {
                            p.releaseCapture();
                            p.detachEvent("onmousemove", e);
                            p.detachEvent("onmouseup", r);
                            p.detachEvent("onlosecaptrue", r);
                            b.ondragstop()
                        };
                        p.attachEvent("onmousemove", e);
                        p.attachEvent("onmouseup", r);
                        p.attachEvent("onlosecaptrue", r);
                        a.returnValue = !1
                    }
                    b.ondragstart()
                }, getFixedLayer: function () {
                    var a = document.getElementById("edui_fixedlayer");
                    null == a && (a = document.createElement("div"),
                        a.id = "edui_fixedlayer", document.body.appendChild(a), c.ie && 8 >= c.version ? (a.style.position = "absolute", b.on(window, "scroll", d), b.on(window, "resize", s.editor.utils.defer(d, 0, !0)), setTimeout(d)) : a.style.position = "fixed", a.style.left = "0", a.style.top = "0", a.style.width = "0", a.style.height = "0");
                    return a
                }, makeUnselectable: function (a) {
                    if (c.opera || c.ie && 9 > c.version) {
                        if (a.unselectable = "on", a.hasChildNodes()) for (var b = 0; b < a.childNodes.length; b++) 1 == a.childNodes[b].nodeType && f.makeUnselectable(a.childNodes[b])
                    } else void 0 !==
                    a.style.MozUserSelect ? a.style.MozUserSelect = "none" : void 0 !== a.style.WebkitUserSelect ? a.style.WebkitUserSelect = "none" : void 0 !== a.style.KhtmlUserSelect && (a.style.KhtmlUserSelect = "none")
                }
            }
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.uiUtils, b = s.editor.EventBase, a = s.editor.ui.UIBase = function () {
        };
        a.prototype = {
            className: "", uiName: "", initOptions: function (a) {
                for (var b in a) this[b] = a[b];
                this.id = this.id || "edui" + c.uid()
            }, initUIBase: function () {
                this._globalKey = d.unhtml(c.setGlobal(this.id, this))
            }, render: function (a) {
                for (var b =
                    this.renderHtml(), b = c.createElementByHtml(b), d = f.getElementsByTagName(b, "*"), l = "edui-" + (this.theme || this.editor.options.theme), k = document.getElementById("edui_fixedlayer"), m = 0, n; n = d[m++];) f.addClass(n, l);
                f.addClass(b, l);
                k && (k.className = "", f.addClass(k, l));
                d = this.getDom();
                null != d ? (d.parentNode.replaceChild(b, d), c.copyAttributes(b, d)) : ("string" == typeof a && (a = document.getElementById(a)), a = a || c.getFixedLayer(), f.addClass(a, l), a.appendChild(b));
                this.postRender()
            }, getDom: function (a) {
                return a ? document.getElementById(this.id +
                    "_" + a) : document.getElementById(this.id)
            }, postRender: function () {
                this.fireEvent("postrender")
            }, getHtmlTpl: function () {
                return ""
            }, formatHtml: function (a) {
                var b = "edui-" + this.uiName;
                return a.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? b + "-" : "").replace(/%%/g, (this.uiName ? b : "") + " " + this.className).replace(/\$\$/g, this._globalKey)
            }, renderHtml: function () {
                return this.formatHtml(this.getHtmlTpl())
            }, dispose: function () {
                var a = this.getDom();
                a && s.editor.dom.domUtils.remove(a);
                c.unsetGlobal(this.id)
            }
        };
        d.inherits(a,
            b)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.UIBase, b = s.editor.ui.Separator = function (a) {
            this.initOptions(a);
            this.initSeparator()
        };
        b.prototype = {
            uiName: "separator", initSeparator: function () {
                this.initUIBase()
            }, getHtmlTpl: function () {
                return '<div id="##" class="edui-box %%"></div>'
            }
        };
        d.inherits(b, c)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.dom.domUtils, b = s.editor.ui.UIBase, a = s.editor.ui.uiUtils,
            e = s.editor.ui.Mask = function (a) {
                this.initOptions(a);
                this.initUIBase()
            };
        e.prototype = {
            getHtmlTpl: function () {
                return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>'
            },
            postRender: function () {
                var a = this;
                c.on(window, "resize", function () {
                    setTimeout(function () {
                        a.isHidden() || a._fill()
                    })
                })
            }, show: function (a) {
                this._fill();
                this.getDom().style.display = "";
                this.getDom().style.zIndex = a
            }, hide: function () {
                this.getDom().style.display = "none";
                this.getDom().style.zIndex = ""
            }, isHidden: function () {
                return "none" == this.getDom().style.display
            }, _onMouseDown: function () {
                return !1
            }, _onClick: function (a, b) {
                this.fireEvent("click", a, b)
            }, _fill: function () {
                var b = this.getDom(), c = a.getViewportRect();
                b.style.width =
                    c.width + "px";
                b.style.height = c.height + "px"
            }
        };
        d.inherits(e, b)
    })();
    (function () {
        function d(a, b) {
            for (var c = 0; c < g.length; c++) {
                var e = g[c];
                if (!e.isHidden() && !1 !== e.queryAutoHide(b)) {
                    if (a && /scroll/ig.test(a.type) && "edui-wordpastepop" == e.className) return;
                    e.hide()
                }
            }
            g.length && e.editor.fireEvent("afterhidepop")
        }

        var c = s.editor.utils, b = s.editor.ui.uiUtils, a = s.editor.dom.domUtils, e = s.editor.ui.UIBase,
            f = s.editor.ui.Popup = function (a) {
                this.initOptions(a);
                this.initPopup()
            }, g = [];
        f.postHide = d;
        var l = ["edui-anchor-topleft",
            "edui-anchor-topright", "edui-anchor-bottomleft", "edui-anchor-bottomright"];
        f.prototype = {
            SHADOW_RADIUS: 5,
            content: null,
            _hidden: !1,
            autoRender: !0,
            canSideLeft: !0,
            canSideUp: !0,
            initPopup: function () {
                this.initUIBase();
                g.push(this)
            },
            getHtmlTpl: function () {
                return '<div id="##" class="edui-popup %%" onmousedown="return false;"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' +
                    this.getContentHtmlTpl() + "  </div> </div></div>"
            },
            getContentHtmlTpl: function () {
                return this.content ? "string" == typeof this.content ? this.content : this.content.renderHtml() : ""
            },
            _UIBase_postRender: e.prototype.postRender,
            postRender: function () {
                this.content instanceof e && this.content.postRender();
                if (this.captureWheel && !this.captured) {
                    this.captured = !0;
                    var c = (document.documentElement.clientHeight || document.body.clientHeight) - 80,
                        d = this.getDom().offsetHeight, f = b.getClientRect(this.combox.getDom()).top,
                        g = this.getDom("content"),
                        h = this.getDom("body").getElementsByTagName("iframe"), l = this;
                    for (h.length && (h = h[0]); f + d > c;) d -= 30;
                    g.style.height = d + "px";
                    h && (h.style.height = d + "px");
                    if (window.XMLHttpRequest) a.on(g, "onmousewheel" in document.body ? "mousewheel" : "DOMMouseScroll", function (a) {
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        g.scrollTop = a.wheelDelta ? g.scrollTop - a.wheelDelta / 120 * 60 : g.scrollTop - a.detail / -3 * 60
                    }); else a.on(this.getDom(), "mousewheel", function (a) {
                        a.returnValue = !1;
                        l.getDom("content").scrollTop -= a.wheelDelta / 120 *
                            60
                    })
                }
                this.fireEvent("postRenderAfter");
                this.hide(!0);
                this._UIBase_postRender()
            },
            _doAutoRender: function () {
                !this.getDom() && this.autoRender && this.render()
            },
            mesureSize: function () {
                var a = this.getDom("content");
                return b.getClientRect(a)
            },
            fitSize: function () {
                if (this.captureWheel && this.sized) return this.__size;
                this.sized = !0;
                var a = this.getDom("body");
                a.style.width = "";
                a.style.height = "";
                var b = this.mesureSize();
                if (this.captureWheel) {
                    a.style.width = -(-20 - b.width) + "px";
                    var c = parseInt(this.getDom("content").style.height,
                        10);
                    !window.isNaN(c) && (b.height = c)
                } else a.style.width = b.width + "px";
                a.style.height = b.height + "px";
                this.__size = b;
                this.captureWheel && (this.getDom("content").style.overflow = "auto");
                return b
            },
            showAnchor: function (a, c) {
                this.showAnchorRect(b.getClientRect(a), c)
            },
            showAnchorRect: function (c, e, d) {
                this._doAutoRender();
                var f = b.getViewportRect();
                this.getDom().style.visibility = "hidden";
                this._show();
                d = this.fitSize();
                var g;
                e ? (e = this.canSideLeft && c.right + d.width > f.right && c.left > d.width, f = this.canSideUp && c.top + d.height >
                    f.bottom && c.bottom > d.height, g = e ? c.left - d.width : c.right, c = f ? c.bottom - d.height : c.top) : (e = this.canSideLeft && c.right + d.width > f.right && c.left > d.width, f = this.canSideUp && c.top + d.height > f.bottom && c.bottom > d.height, g = e ? c.right - d.width : c.left, c = f ? c.top - d.height : c.bottom);
                d = this.getDom();
                b.setViewportOffset(d, {left: g, top: c});
                a.removeClasses(d, l);
                d.className += " " + l[2 * (f ? 1 : 0) + (e ? 1 : 0)];
                this.editor && (d.style.zIndex = 1 * this.editor.container.style.zIndex + 10, s.editor.ui.uiUtils.getFixedLayer().style.zIndex = d.style.zIndex -
                    1);
                this.getDom().style.visibility = "visible"
            },
            showAt: function (a) {
                var b = a.left;
                a = a.top;
                this.showAnchorRect({left: b, top: a, right: b, bottom: a, height: 0, width: 0}, !1, !0)
            },
            _show: function () {
                this._hidden && (this.getDom().style.display = "", this._hidden = !1, this.fireEvent("show"))
            },
            isHidden: function () {
                return this._hidden
            },
            show: function () {
                this._doAutoRender();
                this._show()
            },
            hide: function (a) {
                !this._hidden && this.getDom() && (this.getDom().style.display = "none", this._hidden = !0, a || this.fireEvent("hide"))
            },
            queryAutoHide: function (a) {
                return !a ||
                    !b.contains(this.getDom(), a)
            }
        };
        c.inherits(f, e);
        a.on(document, "mousedown", function (a) {
            d(a, a.target || a.srcElement)
        });
        a.on(window, "scroll", function (a, b) {
            d(a, b)
        })
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.UIBase, b = s.editor.ui.ColorPicker = function (a) {
            this.initOptions(a);
            this.noColorText = this.noColorText || this.editor.getLang("clearColor");
            this.initUIBase()
        };
        b.prototype = {
            getHtmlTpl: function () {
                for (var b = this.editor, c = '<div id="##" class="edui-colorpicker %%"><div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">' +
                    this.noColorText + '</div></div><table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0"><tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;padding-top: 2px"><td colspan="10">' + b.getLang("themeColor") + '</td> </tr><tr class="edui-colorpicker-tablefirstrow" >', d = 0; d < a.length; d++) d && 0 === d % 10 && (c += "</tr>" +
                    (60 == d ? '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;"><td colspan="10">' + b.getLang("standardColor") + "</td></tr>" : "") + "<tr" + (60 == d ? ' class="edui-colorpicker-tablefirstrow"' : "") + ">"), c += 70 > d ? '<td style="padding: 0 2px;"><a hidefocus title="' + a[d] + '" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell" data-color="#' + a[d] + '" style="background-color:#' + a[d] + ";border:solid #ccc;" + (10 > d || 60 <= d ? "border-width:1px;" :
                    10 <= d && 20 > d ? "border-width:1px 1px 0 1px;" : "border-width:0 1px 0 1px;") + '"></a></td>' : "";
                return c + "</tr></table></div>"
            }, _onTableClick: function (a) {
                (a = (a.target || a.srcElement).getAttribute("data-color")) && this.fireEvent("pickcolor", a)
            }, _onTableOver: function (a) {
                if (a = (a.target || a.srcElement).getAttribute("data-color")) this.getDom("preview").style.backgroundColor = a
            }, _onTableOut: function () {
                this.getDom("preview").style.backgroundColor = ""
            }, _onPickNoColor: function () {
                this.fireEvent("picknocolor")
            }
        };
        d.inherits(b,
            c);
        var a = "ffffff 000000 eeece1 1f497d 4f81bd c0504d 9bbb59 8064a2 4bacc6 f79646 f2f2f2 7f7f7f ddd9c3 c6d9f0 dbe5f1 f2dcdb ebf1dd e5e0ec dbeef3 fdeada d8d8d8 595959 c4bd97 8db3e2 b8cce4 e5b9b7 d7e3bc ccc1d9 b7dde8 fbd5b5 bfbfbf 3f3f3f 938953 548dd4 95b3d7 d99694 c3d69b b2a2c7 92cddc fac08f a5a5a5 262626 494429 17365d 366092 953734 76923c 5f497a 31859b e36c09 7f7f7f 0c0c0c 1d1b10 0f243e 244061 632423 4f6128 3f3151 205867 974806 c00000 ff0000 ffc000 ffff00 92d050 00b050 00b0f0 0070c0 002060 7030a0 ".split(" ")
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.uiUtils, b = s.editor.ui.UIBase,
            a = s.editor.ui.TablePicker = function (a) {
                this.initOptions(a);
                this.initTablePicker()
            };
        a.prototype = {
            defaultNumRows: 10,
            defaultNumCols: 10,
            maxNumRows: 20,
            maxNumCols: 20,
            numRows: 10,
            numCols: 10,
            lengthOfCellSide: 22,
            initTablePicker: function () {
                this.initUIBase()
            },
            getHtmlTpl: function () {
                return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'
            },
            _UIBase_render: b.prototype.render,
            render: function (a) {
                this._UIBase_render(a);
                this.getDom("label").innerHTML = "0" + this.editor.getLang("t_row") + " x 0" + this.editor.getLang("t_col")
            },
            _track: function (a, b) {
                var c = this.getDom("overlay").style, d = this.lengthOfCellSide;
                c.width = a * d + "px";
                c.height = b * d + "px";
                this.getDom("label").innerHTML = a + this.editor.getLang("t_col") + " x " + b + this.editor.getLang("t_row");
                this.numCols = a;
                this.numRows = b
            },
            _onMouseOver: function (a, b) {
                var d = a.relatedTarget || a.fromElement;
                c.contains(b, d) ||
                b === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "")
            },
            _onMouseOut: function (a, b) {
                var d = a.relatedTarget || a.toElement;
                c.contains(b, d) || b === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "hidden")
            },
            _onMouseMove: function (a, b) {
                this.getDom("overlay");
                var d = c.getEventOffset(a), f = this.lengthOfCellSide, k = Math.ceil(d.left /
                    f), d = Math.ceil(d.top / f);
                this._track(k, d)
            },
            _onClick: function () {
                this.fireEvent("picktable", this.numCols, this.numRows)
            }
        };
        d.inherits(a, b)
    })();
    (function () {
        var d = s.editor.dom.domUtils, c = s.editor.ui.uiUtils,
            b = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (s.editor.browser.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"' : ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"');
        s.editor.ui.Stateful = {
            alwalysHoverable: !1, target: null, Stateful_init: function () {
                this._Stateful_dGetHtmlTpl = this.getHtmlTpl;
                this.getHtmlTpl = this.Stateful_getHtmlTpl
            }, Stateful_getHtmlTpl: function () {
                return this._Stateful_dGetHtmlTpl().replace(/stateful/g, function () {
                    return b
                })
            }, Stateful_onMouseEnter: function (a, b) {
                this.target = b;
                if (!this.isDisabled() || this.alwalysHoverable) this.addState("hover"), this.fireEvent("over")
            }, Stateful_onMouseLeave: function (a, b) {
                if (!this.isDisabled() || this.alwalysHoverable) this.removeState("hover"),
                    this.removeState("active"), this.fireEvent("out")
            }, Stateful_onMouseOver: function (a, b) {
                var d = a.relatedTarget;
                c.contains(b, d) || b === d || this.Stateful_onMouseEnter(a, b)
            }, Stateful_onMouseOut: function (a, b) {
                var d = a.relatedTarget;
                c.contains(b, d) || b === d || this.Stateful_onMouseLeave(a, b)
            }, Stateful_onMouseDown: function (a, b) {
                this.isDisabled() || this.addState("active")
            }, Stateful_onMouseUp: function (a, b) {
                this.isDisabled() || this.removeState("active")
            }, Stateful_postRender: function () {
                this.disabled && !this.hasState("disabled") &&
                this.addState("disabled")
            }, hasState: function (a) {
                return d.hasClass(this.getStateDom(), "edui-state-" + a)
            }, addState: function (a) {
                this.hasState(a) || (this.getStateDom().className += " edui-state-" + a)
            }, removeState: function (a) {
                this.hasState(a) && d.removeClasses(this.getStateDom(), ["edui-state-" + a])
            }, getStateDom: function () {
                return this.getDom("state")
            }, isChecked: function () {
                return this.hasState("checked")
            }, setChecked: function (a) {
                !this.isDisabled() && a ? this.addState("checked") : this.removeState("checked")
            }, isDisabled: function () {
                return this.hasState("disabled")
            },
            setDisabled: function (a) {
                a ? (this.removeState("hover"), this.removeState("checked"), this.removeState("active"), this.addState("disabled")) : this.removeState("disabled")
            }
        }
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.UIBase, b = s.editor.ui.Stateful,
            a = s.editor.ui.Button = function (a) {
                if (a.name) {
                    var b = a.name, c = a.cssRules;
                    a.className || (a.className = "edui-for-" + b);
                    a.cssRules = ".edui-default  .edui-for-" + b + " .edui-icon {" + c + "}"
                }
                this.initOptions(a);
                this.initButton()
            };
        a.prototype = {
            uiName: "button", label: "", title: "",
            showIcon: !0, showText: !0, cssRules: "", initButton: function () {
                this.initUIBase();
                this.Stateful_init();
                this.cssRules && d.cssRule("edui-customize-" + this.name + "-style", this.cssRules)
            }, getHtmlTpl: function () {
                return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : "") + ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>' :
                    "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>" : "") + "</div></div></div></div>"
            }, postRender: function () {
                this.Stateful_postRender();
                this.setDisabled(this.disabled)
            }, _onMouseDown: function (a) {
                a = (a = a.target || a.srcElement) && a.tagName && a.tagName.toLowerCase();
                if ("input" == a || "object" == a || "object" == a) return !1
            }, _onClick: function () {
                this.isDisabled() || this.fireEvent("click")
            }, setTitle: function (a) {
                this.getDom("label").innerHTML = a
            }
        };
        d.inherits(a, c);
        d.extend(a.prototype, b)
    })();
    (function () {
        var d =
                s.editor.utils, c = s.editor.ui.uiUtils, b = s.editor.ui.UIBase, a = s.editor.ui.Stateful,
            e = s.editor.ui.SplitButton = function (a) {
                this.initOptions(a);
                this.initSplitButton()
            };
        e.prototype = {
            popup: null, uiName: "splitbutton", title: "", initSplitButton: function () {
                this.initUIBase();
                this.Stateful_init();
                if (null != this.popup) {
                    var a = this.popup;
                    this.popup = null;
                    this.setPopup(a)
                }
            }, _UIBase_postRender: b.prototype.postRender, postRender: function () {
                this.Stateful_postRender();
                this._UIBase_postRender()
            }, setPopup: function (a) {
                this.popup !==
                a && (null != this.popup && this.popup.dispose(), a.addListener("show", d.bind(this._onPopupShow, this)), a.addListener("hide", d.bind(this._onPopupHide, this)), a.addListener("postrender", d.bind(function () {
                    a.getDom("body").appendChild(c.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (c.getClientRect(this.getDom()).width + 20) + 'px"></div>'));
                    a.getDom().className += " " + this.className
                }, this)), this.popup = a)
            }, _onPopupShow: function () {
                this.addState("opened")
            },
            _onPopupHide: function () {
                this.removeState("opened")
            }, getHtmlTpl: function () {
                return '<div id="##" class="edui-box %%"><div ' + (this.title ? 'title="' + this.title + '"' : "") + ' id="##_state" stateful><div class="%%-body"><div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div><div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>'
            }, showPopup: function () {
                var a =
                    c.getClientRect(this.getDom());
                a.top -= this.popup.SHADOW_RADIUS;
                a.height += this.popup.SHADOW_RADIUS;
                this.popup.showAnchorRect(a)
            }, _onArrowClick: function (a, b) {
                this.isDisabled() || this.showPopup()
            }, _onButtonClick: function () {
                this.isDisabled() || this.fireEvent("buttonclick")
            }
        };
        d.inherits(e, b);
        d.extend(e.prototype, a, !0)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.uiUtils, b = s.editor.ui.ColorPicker, a = s.editor.ui.Popup,
            e = s.editor.ui.SplitButton, f = s.editor.ui.ColorButton = function (a) {
                this.initOptions(a);
                this.initColorButton()
            };
        f.prototype = {
            initColorButton: function () {
                var c = this;
                this.popup = new a({
                    content: new b({
                        noColorText: c.editor.getLang("clearColor"),
                        editor: c.editor,
                        onpickcolor: function (a, b) {
                            c._onPickColor(b)
                        },
                        onpicknocolor: function (a, b) {
                            c._onPickNoColor(b)
                        }
                    }), editor: c.editor
                });
                this.initSplitButton()
            }, _SplitButton_postRender: e.prototype.postRender, postRender: function () {
                this._SplitButton_postRender();
                this.getDom("button_body").appendChild(c.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>'));
                this.getDom().className += " edui-colorbutton"
            }, setColor: function (a) {
                this.color = this.getDom("colorlump").style.backgroundColor = a
            }, _onPickColor: function (a) {
                !1 !== this.fireEvent("pickcolor", a) && (this.setColor(a), this.popup.hide())
            }, _onPickNoColor: function (a) {
                !1 !== this.fireEvent("picknocolor") && this.popup.hide()
            }
        };
        d.inherits(f, e)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.Popup, b = s.editor.ui.TablePicker, a = s.editor.ui.SplitButton,
            e = s.editor.ui.TableButton = function (a) {
                this.initOptions(a);
                this.initTableButton()
            };
        e.prototype = {
            initTableButton: function () {
                var a = this;
                this.popup = new c({
                    content: new b({
                        editor: a.editor, onpicktable: function (b, c, d) {
                            a._onPickTable(c, d)
                        }
                    }), editor: a.editor
                });
                this.initSplitButton()
            }, _onPickTable: function (a, b) {
                !1 !== this.fireEvent("picktable", a, b) && this.popup.hide()
            }
        };
        d.inherits(e, a)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.UIBase, b = s.editor.ui.AutoTypeSetPicker = function (a) {
            this.initOptions(a);
            this.initAutoTypeSetPicker()
        };
        b.prototype = {
            initAutoTypeSetPicker: function () {
                this.initUIBase()
            },
            getHtmlTpl: function () {
                var a = this.editor, b = a.options.autotypeset, c = a.getLang("autoTypeSet"),
                    d = "textAlignValue" + a.uid, f = "imageBlockLineValue" + a.uid, k = "symbolConverValue" + a.uid;
                return '<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap><input type="checkbox" name="mergeEmptyline" ' + (b.mergeEmptyline ? "checked" : "") + ">" + c.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (b.removeEmptyline ? "checked" : "") + ">" + c.delLine +
                    '</td></tr><tr><td nowrap><input type="checkbox" name="removeClass" ' + (b.removeClass ? "checked" : "") + ">" + c.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (b.indent ? "checked" : "") + ">" + c.indent + '</td></tr><tr><td nowrap><input type="checkbox" name="textAlign" ' + (b.textAlign ? "checked" : "") + ">" + c.alignment + '</td><td colspan="2" id="' + d + '"><input type="radio" name="' + d + '" value="left" ' + (b.textAlign && "left" == b.textAlign ? "checked" : "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' +
                    d + '" value="center" ' + (b.textAlign && "center" == b.textAlign ? "checked" : "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + d + '" value="right" ' + (b.textAlign && "right" == b.textAlign ? "checked" : "") + ">" + a.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="imageBlockLine" ' + (b.imageBlockLine ? "checked" : "") + ">" + c.imageFloat + '</td><td nowrap id="' + f + '"><input type="radio" name="' + f + '" value="none" ' + (b.imageBlockLine && "none" == b.imageBlockLine ? "checked" : "") + ">" + a.getLang("default") +
                    '<input type="radio" name="' + f + '" value="left" ' + (b.imageBlockLine && "left" == b.imageBlockLine ? "checked" : "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' + f + '" value="center" ' + (b.imageBlockLine && "center" == b.imageBlockLine ? "checked" : "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + f + '" value="right" ' + (b.imageBlockLine && "right" == b.imageBlockLine ? "checked" : "") + ">" + a.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="clearFontSize" ' + (b.clearFontSize ?
                        "checked" : "") + ">" + c.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (b.clearFontFamily ? "checked" : "") + ">" + c.removeFontFamily + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="removeEmptyNode" ' + (b.removeEmptyNode ? "checked" : "") + ">" + c.removeHtml + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="pasteFilter" ' + (b.pasteFilter ? "checked" : "") + ">" + c.pasteFilter + '</td></tr><tr><td nowrap><input type="checkbox" name="symbolConver" ' + (b.bdc2sb ||
                    b.tobdc ? "checked" : "") + ">" + c.symbol + '</td><td id="' + k + '"><input type="radio" name="bdc" value="bdc2sb" ' + (b.bdc2sb ? "checked" : "") + ">" + c.bdc2sb + '<input type="radio" name="bdc" value="tobdc" ' + (b.tobdc ? "checked" : "") + ">" + c.tobdc + '</td><td nowrap align="right"><button >' + c.run + "</button></td></tr></table></div></div>"
            }, _UIBase_render: c.prototype.render
        };
        d.inherits(b, c)
    })();
    (function () {
        function d(a) {
            for (var b = {}, d = a.getDom(), e = a.editor.uid, h = null, h = null, q = f.getElementsByTagName(d, "input"), t = q.length - 1, p; p =
                q[t--];) if (h = p.getAttribute("type"), "checkbox" == h) if (h = p.getAttribute("name"), b[h] && delete b[h], p.checked) if (p = document.getElementById(h + "Value" + e)) if (/input/ig.test(p.tagName)) b[h] = p.value; else {
                p = p.getElementsByTagName("input");
                for (var r = p.length - 1, u; u = p[r--];) if (u.checked) {
                    b[h] = u.value;
                    break
                }
            } else b[h] = !0; else b[h] = !1; else b[p.getAttribute("value")] = p.checked;
            d = f.getElementsByTagName(d, "select");
            for (t = 0; e = d[t++];) q = e.getAttribute("name"), b[q] = b[q] ? e.value : "";
            c.extend(a.editor.options.autotypeset,
                b);
            a.editor.setPreferences("autotypeset", b)
        }

        var c = s.editor.utils, b = s.editor.ui.Popup, a = s.editor.ui.AutoTypeSetPicker, e = s.editor.ui.SplitButton,
            h = s.editor.ui.AutoTypeSetButton = function (a) {
                this.initOptions(a);
                this.initAutoTypeSetButton()
            };
        h.prototype = {
            initAutoTypeSetButton: function () {
                var c = this;
                this.popup = new b({
                    content: new a({editor: c.editor}), editor: c.editor, hide: function () {
                        !this._hidden && this.getDom() && (d(this), this.getDom().style.display = "none", this._hidden = !0, this.fireEvent("hide"))
                    }
                });
                var e = 0;
                this.popup.addListener("postRenderAfter", function () {
                    var a = this;
                    if (!e) {
                        var b = this.getDom();
                        b.getElementsByTagName("button")[0].onclick = function () {
                            d(a);
                            c.editor.execCommand("autotypeset");
                            a.hide()
                        };
                        f.on(b, "click", function (b) {
                            b = b.target || b.srcElement;
                            var e = c.editor.uid;
                            if (b && "INPUT" == b.tagName) {
                                if ("imageBlockLine" == b.name || "textAlign" == b.name || "symbolConver" == b.name) for (var f = b.checked, h = document.getElementById(b.name + "Value" + e).getElementsByTagName("input"), l = {
                                    imageBlockLine: "none", textAlign: "left",
                                    symbolConver: "tobdc"
                                }, m = 0; m < h.length; m++) f ? h[m].value == l[b.name] && (h[m].checked = "checked") : h[m].checked = !1;
                                (b.name == "imageBlockLineValue" + e || b.name == "textAlignValue" + e || "bdc" == b.name) && (b = b.parentNode.previousSibling.getElementsByTagName("input")) && (b[0].checked = !0);
                                d(a)
                            }
                        });
                        e = 1
                    }
                });
                this.initSplitButton()
            }
        };
        c.inherits(h, e)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.Popup, b = s.editor.ui.Stateful, a = s.editor.ui.UIBase,
            e = s.editor.ui.CellAlignPicker = function (a) {
                this.initOptions(a);
                this.initSelected();
                this.initCellAlignPicker()
            };
        e.prototype = {
            initSelected: function () {
                var a = {top: 0, middle: 1, bottom: 2}, b = {left: 0, center: 1, right: 2};
                this.selected && (this.selectedIndex = 3 * a[this.selected.valign] + b[this.selected.align])
            }, initCellAlignPicker: function () {
                this.initUIBase();
                this.Stateful_init()
            }, getHtmlTpl: function () {
                for (var a = ["left", "center", "right"], b = null, c = -1, d = [], e = 0; 9 > e; e++) b = this.selectedIndex === e ? ' class="edui-cellalign-selected" ' : "", c = e % 3, 0 === c && d.push("<tr>"), d.push('<td index="' + e + '" ' + b + ' stateful><div class="edui-icon edui-' +
                    a[c] + '"></div></td>'), 2 === c && d.push("</tr>");
                return '<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">' + d.join("") + "</table></div></div>"
            }, getStateDom: function () {
                return this.target
            }, _onClick: function (a) {
                var b = a.target || a.srcElement;
                /icon/.test(b.className) && (this.items[b.parentNode.getAttribute("index")].onclick(), c.postHide(a))
            }, _UIBase_render: a.prototype.render
        };
        d.inherits(e, a);
        d.extend(e.prototype, b, !0)
    })();
    (function () {
        var d =
                s.editor.utils, c = s.editor.ui.Stateful, b = s.editor.ui.uiUtils, a = s.editor.ui.UIBase,
            e = s.editor.ui.PastePicker = function (a) {
                this.initOptions(a);
                this.initPastePicker()
            };
        e.prototype = {
            initPastePicker: function () {
                this.initUIBase();
                this.Stateful_init()
            }, getHtmlTpl: function () {
                return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">' + this.editor.getLang("pasteOpt") + '</div><div class="edui-button"><div title="' + this.editor.getLang("pasteSourceFormat") +
                    '" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="' + this.editor.getLang("tagFormat") + '" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="' + this.editor.getLang("pasteTextFormat") + '" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>'
            }, getStateDom: function () {
                return this.target
            }, format: function (a) {
                this.editor.ui._isTransfer = !0;
                this.editor.fireEvent("pasteTransfer", a)
            }, _onClick: function (a) {
                var c =
                    f.getNextDomNode(a), d = b.getViewportRect().height, e = b.getClientRect(c);
                c.style.top = e.top + e.height > d ? -e.height - a.offsetHeight + "px" : "";
                /hidden/ig.test(f.getComputedStyle(c, "visibility")) ? (c.style.visibility = "visible", f.addClass(a, "edui-state-opened")) : (c.style.visibility = "hidden", f.removeClasses(a, "edui-state-opened"))
            }, _UIBase_render: a.prototype.render
        };
        d.inherits(e, a);
        d.extend(e.prototype, c, !0)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.uiUtils, b = s.editor.ui.UIBase,
            a = s.editor.ui.Toolbar = function (a) {
                this.initOptions(a);
                this.initToolbar()
            };
        a.prototype = {
            items: null, initToolbar: function () {
                this.items = this.items || [];
                this.initUIBase()
            }, add: function (a, b) {
                void 0 === b ? this.items.push(a) : this.items.splice(b, 0, a)
            }, getHtmlTpl: function () {
                for (var a = [], b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
                return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + a.join("") + "</div>"
            }, postRender: function () {
                for (var a = this.getDom(), b = 0; b < this.items.length; b++) this.items[b].postRender();
                c.makeUnselectable(a)
            }, _onMouseDown: function (a) {
                a = (a = a.target || a.srcElement) && a.tagName && a.tagName.toLowerCase();
                if ("input" == a || "object" == a || "object" == a) return !1
            }
        };
        d.inherits(a, b)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.dom.domUtils, b = s.editor.ui.uiUtils, a = s.editor.ui.UIBase,
            e = s.editor.ui.Popup, f = s.editor.ui.Stateful, g = s.editor.ui.CellAlignPicker,
            l = s.editor.ui.Menu = function (a) {
                this.initOptions(a);
                this.initMenu()
            }, k = {
                renderHtml: function () {
                    return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'
                },
                postRender: function () {
                }, queryAutoHide: function () {
                    return !0
                }
            };
        l.prototype = {
            items: null, uiName: "menu", initMenu: function () {
                this.items = this.items || [];
                this.initPopup();
                this.initItems()
            }, initItems: function () {
                for (var a = 0; a < this.items.length; a++) {
                    var b = this.items[a];
                    "-" == b ? this.items[a] = this.getSeparator() : b instanceof m || (b.editor = this.editor, b.theme = this.editor.options.theme, this.items[a] = this.createItem(b))
                }
            }, getSeparator: function () {
                return k
            }, createItem: function (a) {
                a.menu = this;
                return new m(a)
            }, _Popup_getContentHtmlTpl: e.prototype.getContentHtmlTpl,
            getContentHtmlTpl: function () {
                if (0 == this.items.length) return this._Popup_getContentHtmlTpl();
                for (var a = [], b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
                return '<div class="%%-body">' + a.join("") + "</div>"
            }, _Popup_postRender: e.prototype.postRender, postRender: function () {
                for (var a = this, d = 0; d < this.items.length; d++) {
                    var e = this.items[d];
                    e.ownerMenu = this;
                    e.postRender()
                }
                c.on(this.getDom(), "mouseover", function (c) {
                    c = c || event;
                    c = c.relatedTarget || c.fromElement;
                    var d = a.getDom();
                    b.contains(d, c) || d === c ||
                    a.fireEvent("over")
                });
                this._Popup_postRender()
            }, queryAutoHide: function (a) {
                if (a) {
                    if (b.contains(this.getDom(), a)) return !1;
                    for (var c = 0; c < this.items.length; c++) if (!1 === this.items[c].queryAutoHide(a)) return !1
                }
            }, clearItems: function () {
                for (var a = 0; a < this.items.length; a++) {
                    var b = this.items[a];
                    clearTimeout(b._showingTimer);
                    clearTimeout(b._closingTimer);
                    b.subMenu && b.subMenu.destroy()
                }
                this.items = []
            }, destroy: function () {
                this.getDom() && c.remove(this.getDom());
                this.clearItems()
            }, dispose: function () {
                this.destroy()
            }
        };
        d.inherits(l, e);
        var m = s.editor.ui.MenuItem = function (a) {
            this.initOptions(a);
            this.initUIBase();
            this.Stateful_init();
            if (this.subMenu && !(this.subMenu instanceof l)) if (a.className && -1 != a.className.indexOf("aligntd")) {
                var b = this;
                this.subMenu.selected = this.editor.queryCommandValue("cellalignment");
                this.subMenu = new e({
                    content: new g(this.subMenu),
                    parentMenu: b,
                    editor: b.editor,
                    destroy: function () {
                        this.getDom() && c.remove(this.getDom())
                    }
                });
                this.subMenu.addListener("postRenderAfter", function () {
                    c.on(this.getDom(),
                        "mouseover", function () {
                            b.addState("opened")
                        })
                })
            } else this.subMenu = new l(this.subMenu)
        };
        m.prototype = {
            label: "",
            subMenu: null,
            ownerMenu: null,
            uiName: "menuitem",
            alwalysHoverable: !0,
            getHtmlTpl: function () {
                return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + "</div></div>"
            },
            postRender: function () {
                var a = this;
                this.addListener("over", function () {
                    a.ownerMenu.fireEvent("submenuover", a);
                    a.subMenu && a.delayShowSubMenu()
                });
                this.subMenu && (this.getDom().className +=
                    " edui-hassubmenu", this.subMenu.render(), this.addListener("out", function () {
                    a.delayHideSubMenu()
                }), this.subMenu.addListener("over", function () {
                    clearTimeout(a._closingTimer);
                    a._closingTimer = null;
                    a.addState("opened")
                }), this.ownerMenu.addListener("hide", function () {
                    a.hideSubMenu()
                }), this.ownerMenu.addListener("submenuover", function (b, c) {
                    c !== a && a.delayHideSubMenu()
                }), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function (c) {
                    return c && b.contains(a.getDom(), c) ? !1 : this._bakQueryAutoHide(c)
                });
                this.getDom().style.tabIndex = "-1";
                b.makeUnselectable(this.getDom());
                this.Stateful_postRender()
            },
            delayShowSubMenu: function () {
                var a = this;
                a.isDisabled() || (a.addState("opened"), clearTimeout(a._showingTimer), clearTimeout(a._closingTimer), a._closingTimer = null, a._showingTimer = setTimeout(function () {
                    a.showSubMenu()
                }, 250))
            },
            delayHideSubMenu: function () {
                var a = this;
                a.isDisabled() || (a.removeState("opened"), clearTimeout(a._showingTimer), a._closingTimer || (a._closingTimer = setTimeout(function () {
                    a.hasState("opened") ||
                    a.hideSubMenu();
                    a._closingTimer = null
                }, 400)))
            },
            renderLabelHtml: function () {
                return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || "") + "</div>"
            },
            getStateDom: function () {
                return this.getDom()
            },
            queryAutoHide: function (a) {
                if (this.subMenu && this.hasState("opened")) return this.subMenu.queryAutoHide(a)
            },
            _onClick: function (a, b) {
                this.hasState("disabled") || !1 !== this.fireEvent("click", a, b) && (this.subMenu ? this.showSubMenu() : e.postHide(a))
            },
            showSubMenu: function () {
                var a = b.getClientRect(this.getDom());
                a.right -= 5;
                a.left += 2;
                a.width -= 7;
                a.top -= 4;
                a.bottom += 4;
                a.height += 8;
                this.subMenu.showAnchorRect(a, !0, !0)
            },
            hideSubMenu: function () {
                this.subMenu.hide()
            }
        };
        d.inherits(m, a);
        d.extend(m.prototype, f, !0)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.uiUtils, b = s.editor.ui.Menu, a = s.editor.ui.SplitButton,
            e = s.editor.ui.Combox = function (a) {
                this.initOptions(a);
                this.initCombox()
            };
        e.prototype = {
            uiName: "combox", onbuttonclick: function () {
                this.showPopup()
            }, initCombox: function () {
                var a =
                    this;
                this.items = this.items || [];
                for (var c = 0; c < this.items.length; c++) {
                    var d = this.items[c];
                    d.uiName = "listitem";
                    d.index = c;
                    d.onclick = function () {
                        a.selectByIndex(this.index)
                    }
                }
                this.popup = new b({
                    items: this.items,
                    uiName: "list",
                    editor: this.editor,
                    captureWheel: !0,
                    combox: this
                });
                this.initSplitButton()
            }, _SplitButton_postRender: a.prototype.postRender, postRender: function () {
                this._SplitButton_postRender();
                this.setLabel(this.label || "");
                this.setValue(this.initValue || "")
            }, showPopup: function () {
                var a = c.getClientRect(this.getDom());
                a.top += 1;
                a.bottom -= 1;
                a.height -= 2;
                this.popup.showAnchorRect(a)
            }, getValue: function () {
                return this.value
            }, setValue: function (a) {
                var b = this.indexByValue(a);
                -1 != b ? (this.selectedIndex = b, this.setLabel(this.items[b].label), this.value = this.items[b].value) : (this.selectedIndex = -1, this.setLabel(this.getLabelForUnknowValue(a)), this.value = a)
            }, setLabel: function (a) {
                this.label = this.getDom("button_body").innerHTML = a
            }, getLabelForUnknowValue: function (a) {
                return a
            }, indexByValue: function (a) {
                for (var b = 0; b < this.items.length; b++) if (a ==
                    this.items[b].value) return b;
                return -1
            }, getItem: function (a) {
                return this.items[a]
            }, selectByIndex: function (a) {
                a < this.items.length && !1 !== this.fireEvent("select", a) && (this.selectedIndex = a, this.value = this.items[a].value, this.setLabel(this.items[a].label))
            }
        };
        d.inherits(e, a)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.dom.domUtils, b = s.editor.ui.uiUtils, a = s.editor.ui.Mask,
            e = s.editor.ui.UIBase, f = s.editor.ui.Button, g = s.editor.ui.Dialog = function (a) {
                if (a.name) {
                    var b = a.name, c = a.cssRules;
                    a.className || (a.className =
                        "edui-for-" + b);
                    c && (a.cssRules = ".edui-default .edui-for-" + b + " .edui-dialog-content  {" + c + "}")
                }
                this.initOptions(d.extend({
                    autoReset: !0, draggable: !0, onok: function () {
                    }, oncancel: function () {
                    }, onclose: function (a, b) {
                        return b ? this.onok() : this.oncancel()
                    }, holdScroll: !1
                }, a));
                this.initDialog()
            }, l, k, m;
        g.prototype = {
            draggable: !1, uiName: "dialog", initDialog: function () {
                var b = this, c = this.editor.options.theme;
                this.cssRules && d.cssRule("edui-customize-" + this.name + "-style", this.cssRules);
                this.initUIBase();
                this.modalMask =
                    l || (l = new a({
                        className: "edui-dialog-modalmask", theme: c, onclick: function () {
                            m && m.close(!1)
                        }
                    }));
                this.dragMask = k || (k = new a({className: "edui-dialog-dragmask", theme: c}));
                this.closeButton = new f({
                    className: "edui-dialog-closebutton",
                    title: b.closeDialog,
                    theme: c,
                    onclick: function () {
                        b.close(!1)
                    }
                });
                this.fullscreen && this.initResizeEvent();
                if (this.buttons) for (c = 0; c < this.buttons.length; c++) this.buttons[c] instanceof f || (this.buttons[c] = new f(d.extend(this.buttons[c], {editor: this.editor}, !0)))
            }, initResizeEvent: function () {
                var a =
                    this;
                c.on(window, "resize", function () {
                    a._hidden || void 0 === a._hidden || (a.__resizeTimer && window.clearTimeout(a.__resizeTimer), a.__resizeTimer = window.setTimeout(function () {
                        a.__resizeTimer = null;
                        var c = a.getDom(), d = a.getDom("content"), e = UE.ui.uiUtils.getClientRect(c),
                            f = UE.ui.uiUtils.getClientRect(d), g = b.getViewportRect();
                        d.style.width = g.width - e.width + f.width + "px";
                        d.style.height = g.height - e.height + f.height + "px";
                        c.style.width = g.width + "px";
                        c.style.height = g.height + "px";
                        a.fireEvent("resize")
                    }, 100))
                })
            }, fitSize: function () {
                var a =
                    this.getDom("body"), b = this.mesureSize();
                a.style.width = b.width + "px";
                a.style.height = b.height + "px";
                return b
            }, safeSetOffset: function (a) {
                var c = this.getDom(), d = b.getViewportRect(), e = b.getClientRect(c), f = a.left;
                f + e.width > d.right && (f = d.right - e.width);
                a = a.top;
                a + e.height > d.bottom && (a = d.bottom - e.height);
                c.style.left = Math.max(f, 0) + "px";
                c.style.top = Math.max(a, 0) + "px"
            }, showAtCenter: function () {
                var a = b.getViewportRect();
                if (this.fullscreen) {
                    var d = this.getDom(), e = this.getDom("content");
                    d.style.display = "block";
                    var f =
                        UE.ui.uiUtils.getClientRect(d), g = UE.ui.uiUtils.getClientRect(e);
                    d.style.left = "-100000px";
                    e.style.width = a.width - f.width + g.width + "px";
                    e.style.height = a.height - f.height + g.height + "px";
                    d.style.width = a.width + "px";
                    d.style.height = a.height + "px";
                    d.style.left = 0;
                    this._originalContext = {
                        html: {
                            overflowX: document.documentElement.style.overflowX,
                            overflowY: document.documentElement.style.overflowY
                        }, body: {overflowX: document.body.style.overflowX, overflowY: document.body.style.overflowY}
                    };
                    document.documentElement.style.overflowX =
                        "hidden";
                    document.documentElement.style.overflowY = "hidden";
                    document.body.style.overflowX = "hidden";
                    document.body.style.overflowY = "hidden"
                } else this.getDom().style.display = "", e = this.fitSize(), f = this.getDom("titlebar").offsetHeight | 0, d = a.width / 2 - e.width / 2, a = a.height / 2 - (e.height - f) / 2 - f, e = this.getDom(), this.safeSetOffset({
                    left: Math.max(d | 0, 0),
                    top: Math.max(a | 0, 0)
                }), c.hasClass(e, "edui-state-centered") || (e.className += " edui-state-centered");
                this._show()
            }, getContentHtml: function () {
                var a = "";
                "string" == typeof this.content ?
                    a = this.content : this.iframeUrl && (a = '<span id="' + this.id + '_contmask" class="dialogcontmask"></span><iframe id="' + this.id + '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' + this.iframeUrl + '"></iframe>');
                return a
            }, getHtmlTpl: function () {
                var a = "";
                if (this.buttons) {
                    for (var a = [], b = 0; b < this.buttons.length; b++) a[b] = this.buttons[b].renderHtml();
                    a = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">' + a.join("") + "</div></div>"
                }
                return '<div id="##" class="%%"><div ' + (this.fullscreen ?
                    'class="%%-wrap edui-dialog-fullscreen-flag"' : 'class="%%"') + '><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">' + (this.title || "") + "</span></div>" + this.closeButton.renderHtml() + '</div><div id="##_content" class="%%-content">' + (this.autoReset ? "" : this.getContentHtml()) + "</div>" + a + "</div></div></div>"
            }, postRender: function () {
                this.modalMask.getDom() ||
                (this.modalMask.render(), this.modalMask.hide());
                this.dragMask.getDom() || (this.dragMask.render(), this.dragMask.hide());
                var a = this;
                this.addListener("show", function () {
                    a.modalMask.show(this.getDom().style.zIndex - 2)
                });
                this.addListener("hide", function () {
                    a.modalMask.hide()
                });
                if (this.buttons) for (var d = 0; d < this.buttons.length; d++) this.buttons[d].postRender();
                c.on(window, "resize", function () {
                    setTimeout(function () {
                        a.isHidden() || a.safeSetOffset(b.getClientRect(a.getDom()))
                    })
                });
                this._hide()
            }, mesureSize: function () {
                var a =
                    this.getDom("body"), c = b.getClientRect(this.getDom("content")).width;
                a.style.width = c;
                return b.getClientRect(a)
            }, _onTitlebarMouseDown: function (a, d) {
                if (this.draggable) {
                    var e;
                    b.getViewportRect();
                    var f = this;
                    b.startDrag(a, {
                        ondragstart: function () {
                            e = b.getClientRect(f.getDom());
                            f.getDom("contmask").style.visibility = "visible";
                            f.dragMask.show(f.getDom().style.zIndex - 1)
                        }, ondragmove: function (a, b) {
                            f.safeSetOffset({left: e.left + a, top: e.top + b})
                        }, ondragstop: function () {
                            f.getDom("contmask").style.visibility = "hidden";
                            c.removeClasses(f.getDom(), ["edui-state-centered"]);
                            f.dragMask.hide()
                        }
                    })
                }
            }, reset: function () {
                this.getDom("content").innerHTML = this.getContentHtml();
                this.fireEvent("dialogafterreset")
            }, _show: function () {
                this._hidden && (this.getDom().style.display = "", this.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * this.editor.container.style.zIndex + 10), this._hidden = !1, this.fireEvent("show"), s.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4)
            }, isHidden: function () {
                return this._hidden
            },
            _hide: function () {
                if (!this._hidden) {
                    var a = this.getDom();
                    a.style.display = "none";
                    a.style.zIndex = "";
                    a.style.width = "";
                    a.style.height = "";
                    this._hidden = !0;
                    this.fireEvent("hide")
                }
            }, open: function () {
                if (this.autoReset) try {
                    this.reset()
                } catch (a) {
                    this.render(), this.open()
                }
                this.showAtCenter();
                if (this.iframeUrl) try {
                    this.getDom("iframe").focus()
                } catch (b) {
                }
                m = this
            }, _onCloseButtonClick: function (a, b) {
                this.close(!1)
            }, close: function (a) {
                if (!1 !== this.fireEvent("close", a)) {
                    this.fullscreen && (document.documentElement.style.overflowX =
                        this._originalContext.html.overflowX, document.documentElement.style.overflowY = this._originalContext.html.overflowY, document.body.style.overflowX = this._originalContext.body.overflowX, document.body.style.overflowY = this._originalContext.body.overflowY, delete this._originalContext);
                    this._hide();
                    a = this.getDom("content");
                    var b = this.getDom("iframe");
                    a && b && ((b = b.contentDocument || b.contentWindow.document) && (b.body.innerHTML = ""), c.remove(a))
                }
            }
        };
        d.inherits(g, e)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.Menu,
            b = s.editor.ui.SplitButton, a = s.editor.ui.MenuButton = function (a) {
                this.initOptions(a);
                this.initMenuButton()
            };
        a.prototype = {
            initMenuButton: function () {
                var a = this;
                this.uiName = "menubutton";
                this.popup = new c({items: a.items, className: a.className, editor: a.editor});
                this.popup.addListener("show", function () {
                    for (var b = 0; b < this.items.length; b++) this.items[b].removeState("checked"), this.items[b].value == a._value && (this.items[b].addState("checked"), this.value = a._value)
                });
                this.initSplitButton()
            }, setValue: function (a) {
                this._value =
                    a
            }
        };
        d.inherits(a, b)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.Popup, b = s.editor.ui.SplitButton,
            a = s.editor.ui.MultiMenuPop = function (a) {
                this.initOptions(a);
                this.initMultiMenu()
            };
        a.prototype = {
            initMultiMenu: function () {
                var a = this;
                this.popup = new c({
                    content: "", editor: a.editor, iframe_rendered: !1, onshow: function () {
                        this.iframe_rendered || (this.iframe_rendered = !0, this.getDom("content").innerHTML = '<iframe id="' + a.id + '_iframe" src="' + a.iframeUrl + '" frameborder="0"></iframe>', a.editor.container.style.zIndex &&
                        (this.getDom().style.zIndex = 1 * a.editor.container.style.zIndex + 1))
                    }
                });
                this.onbuttonclick = function () {
                    this.showPopup()
                };
                this.initSplitButton()
            }
        };
        d.inherits(a, b)
    })();
    (function () {
        function d(a) {
            if (!f.findParent(a.target || a.srcElement, function (a) {
                return f.hasClass(a, "edui-shortcutmenu") || f.hasClass(a, "edui-popup")
            }, !0)) {
                a = 0;
                for (var b; b = g[a++];) b.hide()
            }
        }

        var c = s.editor.ui, b = c.UIBase, a = c.uiUtils, e = s.editor.utils, f = s.editor.dom.domUtils, g = [], l,
            k = !1, m = c.ShortCutMenu = function (a) {
                this.initOptions(a);
                this.initShortCutMenu()
            };
        m.postHide = d;
        m.prototype = {
            isHidden: !0, SPACE: 5, initShortCutMenu: function () {
                this.items = this.items || [];
                this.initUIBase();
                this.initItems();
                this.initEvent();
                g.push(this)
            }, initEvent: function () {
                var a = this, b = a.editor.document;
                f.on(b, "mousemove", function (b) {
                    if (!1 === a.isHidden && !a.getSubMenuMark() && "contextmenu" != a.eventType) {
                        var c = !0, d = a.getDom(), e = d.offsetWidth / 2 + a.SPACE, f = d.offsetHeight / 2,
                            g = Math.abs(b.screenX - a.left), k = Math.abs(b.screenY - a.top);
                        clearTimeout(l);
                        l = setTimeout(function () {
                            0 < k && k < f ? a.setOpacity(d,
                                "1") : k > f && k < f + 70 ? (a.setOpacity(d, "0.5"), c = !1) : k > f + 70 && k < f + 140 && a.hide();
                            c && 0 < g && g < e ? a.setOpacity(d, "1") : g > e && g < e + 70 ? a.setOpacity(d, "0.5") : g > e + 70 && g < e + 140 && a.hide()
                        })
                    }
                });
                if (r.chrome) f.on(b, "mouseout", function (b) {
                    b = b.relatedTarget || b.toElement;
                    null != b && "HTML" != b.tagName || a.hide()
                });
                a.editor.addListener("afterhidepop", function () {
                    a.isHidden || (k = !0)
                })
            }, initItems: function () {
                if (e.isArray(this.items)) for (var a = 0, b = this.items.length; a < b; a++) {
                    var d = this.items[a].toLowerCase();
                    c[d] && (this.items[a] = new c[d](this.editor),
                        this.items[a].className += " edui-shortcutsubmenu ")
                }
            }, setOpacity: function (a, b) {
                r.ie && 9 > r.version ? a.style.filter = "alpha(opacity = " + 100 * parseFloat(b) + ");" : a.style.opacity = b
            }, getSubMenuMark: function () {
                k = !1;
                for (var b = a.getFixedLayer(), b = f.getElementsByTagName(b, "div", function (a) {
                    return f.hasClass(a, "edui-shortcutsubmenu edui-popup")
                }), c = 0, d; d = b[c++];) "none" != d.style.display && (k = !0);
                return k
            }, show: function (b, c) {
                function d(a) {
                    0 > a.left && (a.left = 0);
                    0 > a.top && (a.top = 0);
                    k.style.cssText = "position:absolute;left:" +
                        a.left + "px;top:" + a.top + "px;"
                }

                function e(a) {
                    a.tagName || (a = a.getDom());
                    g.left = parseInt(a.style.left);
                    g.top = parseInt(a.style.top);
                    g.top -= k.offsetHeight + 15;
                    d(g)
                }

                var g = {}, k = this.getDom(), l = a.getFixedLayer();
                this.eventType = b.type;
                k.style.cssText = "display:block;left:-9999px";
                if ("contextmenu" == b.type && c) {
                    var m = f.getElementsByTagName(l, "div", "edui-contextmenu")[0];
                    m ? e(m) : this.editor.addListener("aftershowcontextmenu", function (a, b) {
                        e(b)
                    })
                } else g = a.getViewportOffsetByEvent(b), g.top -= k.offsetHeight + this.SPACE,
                    g.left += this.SPACE + 20, d(g), this.setOpacity(k, 0.2);
                this.isHidden = !1;
                this.left = b.screenX + k.offsetWidth / 2 - this.SPACE;
                this.top = b.screenY - k.offsetHeight / 2 - this.SPACE;
                this.editor && (k.style.zIndex = 1 * this.editor.container.style.zIndex + 10, l.style.zIndex = k.style.zIndex - 1)
            }, hide: function () {
                this.getDom() && (this.getDom().style.display = "none");
                this.isHidden = !0
            }, postRender: function () {
                if (e.isArray(this.items)) for (var a = 0, b; b = this.items[a++];) b.postRender()
            }, getHtmlTpl: function () {
                var a;
                if (e.isArray(this.items)) {
                    a =
                        [];
                    for (var b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
                    a = a.join("")
                } else a = this.items;
                return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' + a + "</div>"
            }
        };
        e.inherits(m, b);
        f.on(document, "mousedown", function (a) {
            d(a)
        });
        f.on(window, "scroll", function (a) {
            d(a)
        })
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui.UIBase, b = s.editor.ui.Breakline = function (a) {
            this.initOptions(a);
            this.initSeparator()
        };
        b.prototype = {
            uiName: "Breakline",
            initSeparator: function () {
                this.initUIBase()
            }, getHtmlTpl: function () {
                return "<br/>"
            }
        };
        d.inherits(b, c)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.dom.domUtils, b = s.editor.ui.UIBase,
            a = s.editor.ui.Message = function (a) {
                this.initOptions(a);
                this.initMessage()
            };
        a.prototype = {
            initMessage: function () {
                this.initUIBase()
            }, getHtmlTpl: function () {
                return '<div id="##" class="edui-message %%"> <div id="##_closer" class="edui-message-closer">\u00d7</div> <div id="##_body" class="edui-message-body edui-message-type-info"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-message-content">  </div> </div></div>'
            },
            reset: function (a) {
                var b = this;
                a.keepshow || (clearTimeout(this.timer), b.timer = setTimeout(function () {
                    b.hide()
                }, a.timeout || 4E3));
                void 0 !== a.content && b.setContent(a.content);
                void 0 !== a.type && b.setType(a.type);
                b.show()
            }, postRender: function () {
                var a = this, b = this.getDom("closer");
                b && c.on(b, "click", function () {
                    a.hide()
                })
            }, setContent: function (a) {
                this.getDom("content").innerHTML = a
            }, setType: function (a) {
                a = a || "info";
                var b = this.getDom("body");
                b.className = b.className.replace(/edui-message-type-[\w-]+/, "edui-message-type-" +
                    a)
            }, getContent: function () {
                return this.getDom("content").innerHTML
            }, getType: function () {
                var a = this.getDom("body").match(/edui-message-type-([\w-]+)/);
                return a ? a[1] : ""
            }, show: function () {
                this.getDom().style.display = "block"
            }, hide: function () {
                var a = this.getDom();
                a && (a.style.display = "none", a.parentNode && a.parentNode.removeChild(a))
            }
        };
        d.inherits(a, b)
    })();
    (function () {
        var d = s.editor.utils, c = s.editor.ui, b = c.Dialog;
        c.buttons = {};
        c.Dialog = function (a) {
            var c = new b(a);
            c.addListener("hide", function () {
                if (c.editor) {
                    var a =
                        c.editor;
                    try {
                        if (r.gecko) {
                            var b = a.window.scrollY, d = a.window.scrollX;
                            a.body.focus();
                            a.window.scrollTo(d, b)
                        } else a.focus()
                    } catch (e) {
                    }
                }
            });
            return c
        };
        for (var a = {
                anchor: "~/dialogs/anchor/anchor.html",
                insertimage: "~/dialogs/image/image.html",
                link: "~/dialogs/link/link.html",
                spechars: "~/dialogs/spechars/spechars.html",
                searchreplace: "~/dialogs/searchreplace/searchreplace.html",
                map: "~/dialogs/map/map.html",
                gmap: "~/dialogs/gmap/gmap.html",
                insertvideo: "~/dialogs/video/video.html",
                help: "~/dialogs/help/help.html",
                preview: "~/dialogs/preview/preview.html",
                emotion: "~/dialogs/emotion/emotion.html",
                wordimage: "~/dialogs/wordimage/wordimage.html",
                attachment: "~/dialogs/attachment/attachment.html",
                insertframe: "~/dialogs/insertframe/insertframe.html",
                edittip: "~/dialogs/table/edittip.html",
                edittable: "~/dialogs/table/edittable.html",
                edittd: "~/dialogs/table/edittd.html",
                webapp: "~/dialogs/webapp/webapp.html",
                snapscreen: "~/dialogs/snapscreen/snapscreen.html",
                scrawl: "~/dialogs/scrawl/scrawl.html",
                music: "~/dialogs/music/music.html",
                template: "~/dialogs/template/template.html",
                background: "~/dialogs/background/background.html",
                charts: "~/dialogs/charts/charts.html"
            }, e = "undo redo formatmatch bold italic underline fontborder touppercase tolowercase strikethrough subscript superscript source indent outdent blockquote pasteplain pagebreak selectall print horizontal removeformat time date unlink insertparagraphbeforetable insertrow insertcol mergeright mergedown deleterow deletecol splittorows splittocols splittocells mergecells deletetable drafts".split(" "),
                 f = 0, g; g = e[f++];) g = g.toLowerCase(), c[g] = function (a) {
            return function (b) {
                var d = new c.Button({
                    className: "edui-for-" + a,
                    title: b.options.labelMap[a] || b.getLang("labelMap." + a) || "",
                    onclick: function () {
                        b.execCommand(a)
                    },
                    theme: b.options.theme,
                    showText: !1
                });
                c.buttons[a] = d;
                b.addListener("selectionchange", function (c, e, f) {
                    c = b.queryCommandState(a);
                    -1 == c ? (d.setDisabled(!0), d.setChecked(!1)) : f || (d.setDisabled(!1), d.setChecked(c))
                });
                return d
            }
        }(g);
        c.cleardoc = function (a) {
            var b = new c.Button({
                className: "edui-for-cleardoc",
                title: a.options.labelMap.cleardoc || a.getLang("labelMap.cleardoc") || "",
                theme: a.options.theme,
                onclick: function () {
                    confirm(a.getLang("confirmClear")) && a.execCommand("cleardoc")
                }
            });
            c.buttons.cleardoc = b;
            a.addListener("selectionchange", function () {
                b.setDisabled(-1 == a.queryCommandState("cleardoc"))
            });
            return b
        };
        var e = {
            justify: ["left", "right", "center", "justify"],
            imagefloat: ["none", "left", "center", "right"],
            directionality: ["ltr", "rtl"]
        }, l;
        for (l in e) (function (a, b) {
            for (var d = 0, e; e = b[d++];) (function (b) {
                c[a.replace("float",
                    "") + b] = function (d) {
                    var e = new c.Button({
                        className: "edui-for-" + a.replace("float", "") + b,
                        title: d.options.labelMap[a.replace("float", "") + b] || d.getLang("labelMap." + a.replace("float", "") + b) || "",
                        theme: d.options.theme,
                        onclick: function () {
                            d.execCommand(a, b)
                        }
                    });
                    c.buttons[a] = e;
                    d.addListener("selectionchange", function (c, f, g) {
                        e.setDisabled(-1 == d.queryCommandState(a));
                        e.setChecked(d.queryCommandValue(a) == b && !g)
                    });
                    return e
                }
            })(e)
        })(l, e[l]);
        for (f = 0; g = ["backcolor", "forecolor"][f++];) c[g] = function (a) {
            return function (b) {
                var d =
                    new c.ColorButton({
                        className: "edui-for-" + a,
                        color: "default",
                        title: b.options.labelMap[a] || b.getLang("labelMap." + a) || "",
                        editor: b,
                        onpickcolor: function (c, d) {
                            b.execCommand(a, d)
                        },
                        onpicknocolor: function () {
                            b.execCommand(a, "default");
                            this.setColor("transparent");
                            this.color = "default"
                        },
                        onbuttonclick: function () {
                            b.execCommand(a, this.color)
                        }
                    });
                c.buttons[a] = d;
                b.addListener("selectionchange", function () {
                    d.setDisabled(-1 == b.queryCommandState(a))
                });
                return d
            }
        }(g);
        e = {
            noOk: ["searchreplace", "help", "spechars", "webapp", "preview"],
            ok: "attachment anchor link insertimage map gmap insertframe wordimage insertvideo insertframe edittip edittable edittd scrawl template music background charts".split(" ")
        };
        for (l in e) (function (b, e) {
            for (var f = 0, g; g = e[f++];) r.opera && "searchreplace" === g || function (e) {
                c[e] = function (f, g, h) {
                    g = g || (f.options.iframeUrlMap || {})[e] || a[e];
                    h = f.options.labelMap[e] || f.getLang("labelMap." + e) || "";
                    var l;
                    g && (l = new c.Dialog(d.extend({
                        iframeUrl: f.ui.mapUrl(g),
                        editor: f,
                        className: "edui-for-" + e,
                        title: h,
                        holdScroll: "insertimage" ===
                            e,
                        fullscreen: /charts|preview/.test(e),
                        closeDialog: f.getLang("closeDialog")
                    }, "ok" == b ? {
                        buttons: [{
                            className: "edui-okbutton",
                            label: f.getLang("ok"),
                            editor: f,
                            onclick: function () {
                                l.close(!0)
                            }
                        }, {
                            className: "edui-cancelbutton",
                            label: f.getLang("cancel"),
                            editor: f,
                            onclick: function () {
                                l.close(!1)
                            }
                        }]
                    } : {})), f.ui._dialogs[e + "Dialog"] = l);
                    var m = new c.Button({
                        className: "edui-for-" + e,
                        title: h,
                        onclick: function () {
                            if (l) switch (e) {
                                case "wordimage":
                                    var a = f.execCommand("wordimage");
                                    a && a.length && (l.render(), l.open());
                                    break;
                                case "scrawl":
                                    -1 !=
                                    f.queryCommandState("scrawl") && (l.render(), l.open());
                                    break;
                                default:
                                    l.render(), l.open()
                            }
                        },
                        theme: f.options.theme,
                        disabled: "scrawl" == e && -1 == f.queryCommandState("scrawl") || "charts" == e
                    });
                    c.buttons[e] = m;
                    f.addListener("selectionchange", function () {
                        if (!(e in {edittable: 1})) {
                            var a = f.queryCommandState(e);
                            m.getDom() && (m.setDisabled(-1 == a), m.setChecked(a))
                        }
                    });
                    return m
                }
            }(g.toLowerCase())
        })(l, e[l]);
        c.snapscreen = function (b, d, e) {
            e = b.options.labelMap.snapscreen || b.getLang("labelMap.snapscreen") || "";
            var f = new c.Button({
                className: "edui-for-snapscreen",
                title: e, onclick: function () {
                    b.execCommand("snapscreen")
                }, theme: b.options.theme
            });
            c.buttons.snapscreen = f;
            if (d = d || (b.options.iframeUrlMap || {}).snapscreen || a.snapscreen) {
                var g = new c.Dialog({
                    iframeUrl: b.ui.mapUrl(d),
                    editor: b,
                    className: "edui-for-snapscreen",
                    title: e,
                    buttons: [{
                        className: "edui-okbutton", label: b.getLang("ok"), editor: b, onclick: function () {
                            g.close(!0)
                        }
                    }, {
                        className: "edui-cancelbutton", label: b.getLang("cancel"), editor: b, onclick: function () {
                            g.close(!1)
                        }
                    }]
                });
                g.render();
                b.ui._dialogs.snapscreenDialog =
                    g
            }
            b.addListener("selectionchange", function () {
                f.setDisabled(-1 == b.queryCommandState("snapscreen"))
            });
            return f
        };
        c.insertcode = function (a, b, e) {
            b = a.options.insertcode || [];
            e = a.options.labelMap.insertcode || a.getLang("labelMap.insertcode") || "";
            var f = [];
            d.each(b, function (b, c) {
                f.push({
                    label: b, value: c, theme: a.options.theme, renderLabelHtml: function () {
                        return '<div class="edui-label %%-label" >' + (this.label || "") + "</div>"
                    }
                })
            });
            var g = new c.Combox({
                editor: a, items: f, onselect: function (b, c) {
                    a.execCommand("insertcode",
                        this.items[c].value)
                }, onbuttonclick: function () {
                    this.showPopup()
                }, title: e, initValue: e, className: "edui-for-insertcode", indexByValue: function (a) {
                    if (a) for (var b = 0, c; c = this.items[b]; b++) if (-1 != c.value.indexOf(a)) return b;
                    return -1
                }
            });
            c.buttons.insertcode = g;
            a.addListener("selectionchange", function (b, c, d) {
                d || (-1 == a.queryCommandState("insertcode") ? g.setDisabled(!0) : (g.setDisabled(!1), (b = a.queryCommandValue("insertcode")) ? (b && (b = b.replace(/['"]/g, "").split(",")[0]), g.setValue(b)) : g.setValue(e)))
            });
            return g
        };
        c.fontfamily = function (a, b, e) {
            b = a.options.fontfamily || [];
            e = a.options.labelMap.fontfamily || a.getLang("labelMap.fontfamily") || "";
            if (b.length) {
                for (var f = 0, g, h = []; g = b[f]; f++) {
                    var l = a.getLang("fontfamily")[g.name] || "";
                    (function (b, c) {
                        h.push({
                            label: b, value: c, theme: a.options.theme, renderLabelHtml: function () {
                                return '<div class="edui-label %%-label" style="font-family:' + d.unhtml(this.value) + '">' + (this.label || "") + "</div>"
                            }
                        })
                    })(g.label || l, g.val)
                }
                var p = new c.Combox({
                    editor: a, items: h, onselect: function (b, c) {
                        a.execCommand("FontFamily",
                            this.items[c].value)
                    }, onbuttonclick: function () {
                        this.showPopup()
                    }, title: e, initValue: e, className: "edui-for-fontfamily", indexByValue: function (a) {
                        if (a) for (var b = 0, c; c = this.items[b]; b++) if (-1 != c.value.indexOf(a)) return b;
                        return -1
                    }
                });
                c.buttons.fontfamily = p;
                a.addListener("selectionchange", function (b, c, d) {
                    d || (-1 == a.queryCommandState("FontFamily") ? p.setDisabled(!0) : (p.setDisabled(!1), (b = a.queryCommandValue("FontFamily")) && (b = b.replace(/['"]/g, "").split(",")[0]), p.setValue(b)))
                });
                return p
            }
        };
        c.fontsize = function (a,
                               b, d) {
            d = a.options.labelMap.fontsize || a.getLang("labelMap.fontsize") || "";
            b = b || a.options.fontsize || [];
            if (b.length) {
                for (var e = [], f = 0; f < b.length; f++) {
                    var g = b[f] + "px";
                    e.push({
                        label: g, value: g, theme: a.options.theme, renderLabelHtml: function () {
                            return '<div class="edui-label %%-label" style="line-height:1;font-size:' + this.value + '">' + (this.label || "") + "</div>"
                        }
                    })
                }
                var h = new c.Combox({
                    editor: a, items: e, title: d, initValue: d, onselect: function (b, c) {
                        a.execCommand("FontSize", this.items[c].value)
                    }, onbuttonclick: function () {
                        this.showPopup()
                    },
                    className: "edui-for-fontsize"
                });
                c.buttons.fontsize = h;
                a.addListener("selectionchange", function (b, c, d) {
                    d || (-1 == a.queryCommandState("FontSize") ? h.setDisabled(!0) : (h.setDisabled(!1), h.setValue(a.queryCommandValue("FontSize"))))
                });
                return h
            }
        };
        c.paragraph = function (a, b, e) {
            e = a.options.labelMap.paragraph || a.getLang("labelMap.paragraph") || "";
            b = a.options.paragraph || [];
            if (!d.isEmptyObject(b)) {
                var f = [], g;
                for (g in b) f.push({
                    value: g,
                    label: b[g] || a.getLang("paragraph")[g],
                    theme: a.options.theme,
                    renderLabelHtml: function () {
                        return '<div class="edui-label %%-label"><span class="edui-for-' +
                            this.value + '">' + (this.label || "") + "</span></div>"
                    }
                });
                var h = new c.Combox({
                    editor: a,
                    items: f,
                    title: e,
                    initValue: e,
                    className: "edui-for-paragraph",
                    onselect: function (b, c) {
                        a.execCommand("Paragraph", this.items[c].value)
                    },
                    onbuttonclick: function () {
                        this.showPopup()
                    }
                });
                c.buttons.paragraph = h;
                a.addListener("selectionchange", function (b, c, d) {
                    d || (-1 == a.queryCommandState("Paragraph") ? h.setDisabled(!0) : (h.setDisabled(!1), b = a.queryCommandValue("Paragraph"), -1 != h.indexByValue(b) ? h.setValue(b) : h.setValue(h.initValue)))
                });
                return h
            }
        };
        c.customstyle = function (a) {
            var b = a.options.customstyle || [],
                d = a.options.labelMap.customstyle || a.getLang("labelMap.customstyle") || "";
            if (b.length) {
                for (var e = a.getLang("customstyle"), f = 0, g = [], h; h = b[f++];) (function (b) {
                    var c = {};
                    c.label = b.label ? b.label : e[b.name];
                    c.style = b.style;
                    c.className = b.className;
                    c.tag = b.tag;
                    g.push({
                        label: c.label, value: c, theme: a.options.theme, renderLabelHtml: function () {
                            return '<div class="edui-label %%-label"><' + c.tag + " " + (c.className ? ' class="' + c.className + '"' : "") + (c.style ?
                                ' style="' + c.style + '"' : "") + ">" + c.label + "</" + c.tag + "></div>"
                        }
                    })
                })(h);
                var l = new c.Combox({
                    editor: a,
                    items: g,
                    title: d,
                    initValue: d,
                    className: "edui-for-customstyle",
                    onselect: function (b, c) {
                        a.execCommand("customstyle", this.items[c].value)
                    },
                    onbuttonclick: function () {
                        this.showPopup()
                    },
                    indexByValue: function (a) {
                        for (var b = 0, c; c = this.items[b++];) if (c.label == a) return b - 1;
                        return -1
                    }
                });
                c.buttons.customstyle = l;
                a.addListener("selectionchange", function (b, c, d) {
                    d || (-1 == a.queryCommandState("customstyle") ? l.setDisabled(!0) :
                        (l.setDisabled(!1), b = a.queryCommandValue("customstyle"), -1 != l.indexByValue(b) ? l.setValue(b) : l.setValue(l.initValue)))
                });
                return l
            }
        };
        c.inserttable = function (a, b, d) {
            d = a.options.labelMap.inserttable || a.getLang("labelMap.inserttable") || "";
            var e = new c.TableButton({
                editor: a,
                title: d,
                className: "edui-for-inserttable",
                onpicktable: function (b, c, d) {
                    a.execCommand("InsertTable", {numRows: d, numCols: c, border: 1})
                },
                onbuttonclick: function () {
                    this.showPopup()
                }
            });
            c.buttons.inserttable = e;
            a.addListener("selectionchange", function () {
                e.setDisabled(-1 ==
                    a.queryCommandState("inserttable"))
            });
            return e
        };
        c.lineheight = function (a) {
            var b = a.options.lineheight || [];
            if (b.length) {
                for (var d = 0, e, f = []; e = b[d++];) f.push({
                    label: e,
                    value: e,
                    theme: a.options.theme,
                    onclick: function () {
                        a.execCommand("lineheight", this.value)
                    }
                });
                var g = new c.MenuButton({
                    editor: a,
                    className: "edui-for-lineheight",
                    title: a.options.labelMap.lineheight || a.getLang("labelMap.lineheight") || "",
                    items: f,
                    onbuttonclick: function () {
                        var b = a.queryCommandValue("LineHeight") || this.value;
                        a.execCommand("LineHeight",
                            b)
                    }
                });
                c.buttons.lineheight = g;
                a.addListener("selectionchange", function () {
                    var b = a.queryCommandState("LineHeight");
                    if (-1 == b) g.setDisabled(!0); else {
                        g.setDisabled(!1);
                        var c = a.queryCommandValue("LineHeight");
                        c && g.setValue((c + "").replace(/cm/, ""));
                        g.setChecked(b)
                    }
                });
                return g
            }
        };
        l = ["top", "bottom"];
        for (e = 0; f = l[e++];) (function (a) {
            c["rowspacing" + a] = function (b) {
                var d = b.options["rowspacing" + a] || [];
                if (!d.length) return null;
                for (var e = 0, f, g = []; f = d[e++];) g.push({
                    label: f, value: f, theme: b.options.theme, onclick: function () {
                        b.execCommand("rowspacing",
                            this.value, a)
                    }
                });
                var h = new c.MenuButton({
                    editor: b,
                    className: "edui-for-rowspacing" + a,
                    title: b.options.labelMap["rowspacing" + a] || b.getLang("labelMap.rowspacing" + a) || "",
                    items: g,
                    onbuttonclick: function () {
                        var c = b.queryCommandValue("rowspacing", a) || this.value;
                        b.execCommand("rowspacing", c, a)
                    }
                });
                c.buttons[a] = h;
                b.addListener("selectionchange", function () {
                    var c = b.queryCommandState("rowspacing", a);
                    if (-1 == c) h.setDisabled(!0); else {
                        h.setDisabled(!1);
                        var d = b.queryCommandValue("rowspacing", a);
                        d && h.setValue((d + "").replace(/%/,
                            ""));
                        h.setChecked(c)
                    }
                });
                return h
            }
        })(f);
        l = ["insertorderedlist", "insertunorderedlist"];
        for (e = 0; f = l[e++];) (function (a) {
            c[a] = function (b) {
                var d = b.options[a], e = function () {
                    b.execCommand(a, this.value)
                }, f = [], g;
                for (g in d) f.push({
                    label: d[g] || b.getLang()[a][g] || "",
                    value: g,
                    theme: b.options.theme,
                    onclick: e
                });
                var h = new c.MenuButton({
                    editor: b,
                    className: "edui-for-" + a,
                    title: b.getLang("labelMap." + a) || "",
                    items: f,
                    onbuttonclick: function () {
                        var c = b.queryCommandValue(a) || this.value;
                        b.execCommand(a, c)
                    }
                });
                c.buttons[a] = h;
                b.addListener("selectionchange",
                    function () {
                        var c = b.queryCommandState(a);
                        if (-1 == c) h.setDisabled(!0); else {
                            h.setDisabled(!1);
                            var d = b.queryCommandValue(a);
                            h.setValue(d);
                            h.setChecked(c)
                        }
                    });
                return h
            }
        })(f);
        c.fullscreen = function (a, b) {
            b = a.options.labelMap.fullscreen || a.getLang("labelMap.fullscreen") || "";
            var d = new c.Button({
                className: "edui-for-fullscreen",
                title: b,
                theme: a.options.theme,
                onclick: function () {
                    a.ui && a.ui.setFullScreen(!a.ui.isFullScreen());
                    this.setChecked(a.ui.isFullScreen())
                }
            });
            c.buttons.fullscreen = d;
            a.addListener("selectionchange",
                function () {
                    var b = a.queryCommandState("fullscreen");
                    d.setDisabled(-1 == b);
                    d.setChecked(a.ui.isFullScreen())
                });
            return d
        };
        c.emotion = function (b, d) {
            var e = new c.MultiMenuPop({
                title: b.options.labelMap.emotion || b.getLang("labelMap.emotion") || "",
                editor: b,
                className: "edui-for-emotion",
                iframeUrl: b.ui.mapUrl(d || (b.options.iframeUrlMap || {}).emotion || a.emotion)
            });
            c.buttons.emotion = e;
            b.addListener("selectionchange", function () {
                e.setDisabled(-1 == b.queryCommandState("emotion"))
            });
            return e
        };
        c.autotypeset = function (a) {
            var b =
                new c.AutoTypeSetButton({
                    editor: a,
                    title: a.options.labelMap.autotypeset || a.getLang("labelMap.autotypeset") || "",
                    className: "edui-for-autotypeset",
                    onbuttonclick: function () {
                        a.execCommand("autotypeset")
                    }
                });
            c.buttons.autotypeset = b;
            a.addListener("selectionchange", function () {
                b.setDisabled(-1 == a.queryCommandState("autotypeset"))
            });
            return b
        };
        c.simpleupload = function (a) {
            var b = new c.Button({
                className: "edui-for-simpleupload",
                title: a.options.labelMap.simpleupload || a.getLang("labelMap.simpleupload") || "",
                onclick: function () {
                },
                theme: a.options.theme,
                showText: !1
            });
            c.buttons.simpleupload = b;
            a.addListener("ready", function () {
                var c = b.getDom("body").children[0];
                a.fireEvent("simpleuploadbtnready", c)
            });
            a.addListener("selectionchange", function (c, d, e) {
                c = a.queryCommandState("simpleupload");
                -1 == c ? (b.setDisabled(!0), b.setChecked(!1)) : e || (b.setDisabled(!1), b.setChecked(c))
            });
            return b
        }
    })();
    (function () {
        function d(a) {
            this.initOptions(a);
            this.initEditorUI()
        }

        var c = s.editor.utils, b = s.editor.ui.uiUtils, a = s.editor.ui.UIBase, e = s.editor.dom.domUtils,
            f = [];
        d.prototype = {
            uiName: "editor", initEditorUI: function () {
                function a(b, c) {
                    b.setOpt({
                        wordCount: !0,
                        maximumWords: 1E4,
                        wordCountMsg: b.options.wordCountMsg || b.getLang("wordCountMsg"),
                        wordOverFlowMsg: b.options.wordOverFlowMsg || b.getLang("wordOverFlowMsg")
                    });
                    var d = b.options, e = d.maximumWords, f = d.wordCountMsg, g = d.wordOverFlowMsg,
                        h = c.getDom("wordcount");
                    d.wordCount && (d = b.getContentLength(!0), d > e ? (h.innerHTML = g, b.fireEvent("wordcountoverflow")) : h.innerHTML = f.replace("{#leave}", e - d).replace("{#count}", d))
                }

                this.editor.ui =
                    this;
                this._dialogs = {};
                this.initUIBase();
                this._initToolbars();
                var b = this.editor,
                    c = this;
                b.addListener("ready", function () {
                    b.getDialog = function (a) {
                        return b.ui._dialogs[a + "Dialog"]
                    };
                    e.on(b.window, "scroll", function (a) {
                        s.editor.ui.Popup.postHide(a)
                    });
                    b.ui._actualFrameWidth = b.options.initialFrameWidth;
                    UE.browser.ie && 6 === UE.browser.version && b.container.ownerDocument.execCommand("BackgroundImageCache", !1, !0);
                    b.options.elementPathEnabled && (b.ui.getDom("elementpath").innerHTML = '<div class="edui-editor-breadcrumb">' +
                        b.getLang("elementPathTip") + ":</div>");
                    b.options.wordCount && (e.on(b.document, "click", function () {
                        a(b, c);
                        e.un(b.document, "click", arguments.callee)
                    }), b.ui.getDom("wordcount").innerHTML = b.getLang("wordCountTip"));
                    b.ui._scale();
                    b.options.scaleEnabled ? (b.autoHeightEnabled && b.disableAutoHeight(), c.enableScale()) : c.disableScale();
                    b.options.elementPathEnabled || b.options.wordCount || b.options.scaleEnabled || (b.ui.getDom("elementpath").style.display = "none", b.ui.getDom("wordcount").style.display = "none", b.ui.getDom("scale").style.display =
                        "none");
                    b.selection.isFocus() && b.fireEvent("selectionchange", !1, !0)
                });
                b.addListener("mousedown", function (a, b) {
                    s.editor.ui.Popup.postHide(b, b.target || b.srcElement);
                    s.editor.ui.ShortCutMenu.postHide(b)
                });
                b.addListener("delcells", function () {
                    UE.ui.edittip && new UE.ui.edittip(b);
                    b.getDialog("edittip").open()
                });
                var d, f = !1, g;
                b.addListener("afterpaste", function () {
                    b.queryCommandState("pasteplain") || (s.editor.ui.PastePicker && (d = new s.editor.ui.Popup({
                        content: new s.editor.ui.PastePicker({editor: b}), editor: b,
                        className: "edui-wordpastepop"
                    }), d.render()), f = !0)
                });
                b.addListener("afterinserthtml", function () {
                    clearTimeout(g);
                    g = setTimeout(function () {
                        if (d && (f || b.ui._isTransfer)) {
                            if (d.isHidden()) {
                                var a = e.createElement(b.document, "span", {
                                    style: "line-height:0px;",
                                    innerHTML: "\ufeff"
                                });
                                b.selection.getRange().insertNode(a);
                                var c = X(a, "firstChild", "previousSibling");
                                c && d.showAnchor(3 == c.nodeType ? c.parentNode : c);
                                e.remove(a)
                            } else d.show();
                            delete b.ui._isTransfer;
                            f = !1
                        }
                    }, 200)
                });
                b.addListener("contextmenu", function (a, b) {
                    s.editor.ui.Popup.postHide(b)
                });
                b.addListener("keydown", function (a, b) {
                    d && d.dispose(b);
                    var c = b.keyCode || b.which;
                    if (b.altKey && 90 == c) UE.ui.buttons.fullscreen.onclick()
                });
                b.addListener("wordcount", function (b) {
                    a(this, c)
                });
                b.addListener("selectionchange", function () {
                    if (b.options.elementPathEnabled) c[(-1 == b.queryCommandState("elementpath") ? "dis" : "en") + "ableElementPath"]();
                    if (b.options.scaleEnabled) c[(-1 == b.queryCommandState("scale") ? "dis" : "en") + "ableScale"]()
                });
                var h = new s.editor.ui.Popup({
                    editor: b, content: "", className: "edui-bubble", _onEditButtonClick: function () {
                        this.hide();
                        b.ui._dialogs.linkDialog.open()
                    }, _onImgEditButtonClick: function (a) {
                        this.hide();
                        b.ui._dialogs[a] && b.ui._dialogs[a].open()
                    }, _onImgSetFloat: function (a) {
                        this.hide();
                        b.execCommand("imagefloat", a)
                    }, _setIframeAlign: function (a) {
                        var b = h.anchorEl, c = b.cloneNode(!0);
                        switch (a) {
                            case -2:
                                c.setAttribute("align", "");
                                break;
                            case -1:
                                c.setAttribute("align", "left");
                                break;
                            case 1:
                                c.setAttribute("align", "right")
                        }
                        b.parentNode.insertBefore(c, b);
                        e.remove(b);
                        h.anchorEl = c;
                        h.showAnchor(h.anchorEl)
                    }, _updateIframe: function () {
                        var a =
                            b._iframe = h.anchorEl;
                        e.hasClass(a, "ueditor_baidumap") ? (b.selection.getRange().selectNode(a).select(), b.ui._dialogs.mapDialog.open()) : b.ui._dialogs.insertframeDialog.open();
                        h.hide()
                    }, _onRemoveButtonClick: function (a) {
                        b.execCommand(a);
                        this.hide()
                    }, queryAutoHide: function (a) {
                        return a && a.ownerDocument == b.document && ("img" == a.tagName.toLowerCase() || e.findParentByTagName(a, "a", !0)) ? a !== h.anchorEl : s.editor.ui.Popup.prototype.queryAutoHide.call(this, a)
                    }
                });
                h.render();
                b.options.imagePopup && (b.addListener("mouseover",
                    function (a, c) {
                        c = c || window.event;
                        var d = c.target || c.srcElement;
                        if (b.ui._dialogs.insertframeDialog && /iframe/ig.test(d.tagName)) {
                            var e = h.formatHtml("<nobr>" + b.getLang("property") + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + b.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + b.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + b.getLang("justifyright") + '</span>&nbsp;&nbsp; <span onclick="$$._updateIframe( this);" class="edui-clickable">' +
                                b.getLang("modify") + "</span></nobr>");
                            e ? (h.getDom("content").innerHTML = e, h.anchorEl = d, h.showAnchor(h.anchorEl)) : h.hide()
                        }
                    }), b.addListener("selectionchange", function (a, c) {
                    if (c) {
                        var d = "", f = "", g = b.selection.getRange().getClosedNode(), f = b.ui._dialogs;
                        if (g && "IMG" == g.tagName) {
                            var l = "insertimageDialog";
                            if (-1 != g.className.indexOf("edui-faked-video") || -1 != g.className.indexOf("edui-upload-video")) l = "insertvideoDialog";
                            -1 != g.className.indexOf("edui-faked-webapp") && (l = "webappDialog");
                            -1 != g.src.indexOf("http://api.map.baidu.com") &&
                            (l = "mapDialog");
                            -1 != g.className.indexOf("edui-faked-music") && (l = "musicDialog");
                            -1 != g.src.indexOf("http://maps.google.com/maps/api/staticmap") && (l = "gmapDialog");
                            g.getAttribute("anchorname") && (l = "anchorDialog", d = h.formatHtml("<nobr>" + b.getLang("property") + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + b.getLang("modify") + "</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">" + b.getLang("delete") + "</span></nobr>"));
                            g.getAttribute("word_img") &&
                            (b.word_img = [g.getAttribute("word_img")], l = "wordimageDialog");
                            if (e.hasClass(g, "loadingclass") || e.hasClass(g, "loaderrorclass")) l = "";
                            if (!f[l]) return;
                            f = "<nobr>" + b.getLang("property") + ': <span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + b.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + b.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + b.getLang("justifyright") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' +
                                b.getLang("justifycenter") + "</span>&nbsp;&nbsp;<span onclick=\"$$._onImgEditButtonClick('" + l + '\');" class="edui-clickable">' + b.getLang("modify") + "</span></nobr>";
                            !d && (d = h.formatHtml(f))
                        }
                        if (b.ui._dialogs.linkDialog) {
                            var m = b.queryCommandValue("link"), n;
                            m && (n = m.getAttribute("_href") || m.getAttribute("href", 2)) && (f = n, 30 < n.length && (f = n.substring(0, 20) + "..."), d && (d += '<div style="height:5px;"></div>'), d += h.formatHtml("<nobr>" + b.getLang("anthorMsg") + ': <a target="_blank" href="' + n + '" title="' + n + '" >' + f + '</a> <span class="edui-clickable" onclick="$$._onEditButtonClick();">' +
                                b.getLang("modify") + '</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + b.getLang("clear") + "</span></nobr>"), h.showAnchor(m))
                        }
                        d ? (h.getDom("content").innerHTML = d, h.anchorEl = g || m, h.showAnchor(h.anchorEl)) : h.hide()
                    }
                }))
            }, _initToolbars: function () {
                for (var a = this.editor, b = this.toolbars || [], d = [], e = 0; e < b.length; e++) {
                    for (var f = b[e], g = new s.editor.ui.Toolbar({theme: a.options.theme}), h = 0; h < f.length; h++) {
                        var p = f[h], r = null;
                        if ("string" == typeof p) {
                            if (p = p.toLowerCase(), "|" == p &&
                            (p = "Separator"), "||" == p && (p = "Breakline"), s.editor.ui[p] && (r = new s.editor.ui[p](a)), "fullscreen" == p) {
                                d && d[0] ? d[0].items.splice(0, 0, r) : r && g.items.splice(0, 0, r);
                                continue
                            }
                        } else r = p;
                        r && r.id && g.add(r)
                    }
                    d[e] = g
                }
                c.each(UE._customizeUI, function (b, c) {
                    var d, e;
                    if (b.id && b.id != a.key) return !1;
                    if (d = b.execFn.call(a, a, c)) e = b.index, void 0 === e && (e = g.items.length), g.add(d, e)
                });
                this.toolbars = d
            }, getHtmlTpl: function () {
                return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">' + (this.toolbars.length ? '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' +
                    this.renderToolbarBoxHtml() + "</div></div>" : "") + '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang("clickToUpload") + '</div><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div><div id="##_message_holder" class="%%-messageholder"></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottomContainer"><table><tr><td id="##_elementpath" class="%%-bottombar"></td><td id="##_wordcount" class="%%-wordcount"></td><td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td></tr></table></div><div id="##_scalelayer"></div></div>'
            },
            showWordImageDialog: function () {
                this._dialogs.wordimageDialog.open()
            }, renderToolbarBoxHtml: function () {
                for (var a = [], b = 0; b < this.toolbars.length; b++) a.push(this.toolbars[b].renderHtml());
                return a.join("")
            }, setFullScreen: function (a) {
                var b = this.editor, c = b.container.parentNode.parentNode;
                if (this._fullscreen != a) {
                    this._fullscreen = a;
                    this.editor.fireEvent("beforefullscreenchange", a);
                    if (s.editor.browser.gecko) var d = b.selection.getRange().createBookmark();
                    if (a) {
                        for (; "BODY" != c.tagName;) {
                            var e = s.editor.dom.domUtils.getComputedStyle(c,
                                "position");
                            f.push(e);
                            c.style.position = "static";
                            c = c.parentNode
                        }
                        this._bakHtmlOverflow = document.documentElement.style.overflow;
                        this._bakBodyOverflow = document.body.style.overflow;
                        this._bakAutoHeight = this.editor.autoHeightEnabled;
                        this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                        this._bakEditorContaninerWidth = b.iframe.parentNode.offsetWidth;
                        this._bakAutoHeight && (b.autoHeightEnabled = !1, this.editor.disableAutoHeight());
                        document.documentElement.style.overflow = "hidden";
                        window.scrollTo(0, window.scrollY);
                        this._bakCssText = this.getDom().style.cssText;
                        this._bakCssText1 = this.getDom("iframeholder").style.cssText;
                        b.iframe.parentNode.style.width = "";
                        this._updateFullScreen()
                    } else {
                        for (; "BODY" != c.tagName;) c.style.position = f.shift(), c = c.parentNode;
                        this.getDom().style.cssText = this._bakCssText;
                        this.getDom("iframeholder").style.cssText = this._bakCssText1;
                        this._bakAutoHeight && (b.autoHeightEnabled = !0, this.editor.enableAutoHeight());
                        document.documentElement.style.overflow = this._bakHtmlOverflow;
                        document.body.style.overflow = this._bakBodyOverflow;
                        b.iframe.parentNode.style.width = this._bakEditorContaninerWidth + "px";
                        window.scrollTo(0, this._bakScrollTop)
                    }
                    if (r.gecko && "true" === b.body.contentEditable) {
                        var g = document.createElement("input");
                        document.body.appendChild(g);
                        b.body.contentEditable = !1;
                        setTimeout(function () {
                            g.focus();
                            setTimeout(function () {
                                b.body.contentEditable = !0;
                                b.fireEvent("fullscreenchanged", a);
                                b.selection.getRange().moveToBookmark(d).select(!0);
                                s.editor.dom.domUtils.remove(g);
                                a && window.scroll(0,
                                    0)
                            }, 0)
                        }, 0)
                    }
                    "true" === b.body.contentEditable && (this.editor.fireEvent("fullscreenchanged", a), this.triggerLayout())
                }
            }, _updateFullScreen: function () {
                if (this._fullscreen) {
                    var a = b.getViewportRect();
                    this.getDom().style.cssText = "border:0;position:absolute;left:0;top:" + (this.editor.options.topOffset || 0) + "px;width:" + a.width + "px;height:" + a.height + "px;z-index:" + (1 * this.getDom().style.zIndex + 100);
                    b.setViewportOffset(this.getDom(), {left: 0, top: this.editor.options.topOffset || 0});
                    this.editor.setHeight(a.height - this.getDom("toolbarbox").offsetHeight -
                        this.getDom("bottombar").offsetHeight - (this.editor.options.topOffset || 0), !0);
                    if (r.gecko) try {
                        window.onresize()
                    } catch (c) {
                    }
                }
            }, _updateElementPath: function () {
                var a = this.getDom("elementpath"), b;
                if (this.elementPathEnabled && (b = this.editor.queryCommandValue("elementpath"))) {
                    for (var c = [], d = 0, e; e = b[d]; d++) c[d] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + d + '&quot;);">' + e + "</span>");
                    a.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' +
                        this.editor.getLang("elementPathTip") + ": " + c.join(" &gt; ") + "</div>"
                } else a.style.display = "none"
            }, disableElementPath: function () {
                var a = this.getDom("elementpath");
                a.innerHTML = "";
                a.style.display = "none";
                this.elementPathEnabled = !1
            }, enableElementPath: function () {
                this.getDom("elementpath").style.display = "";
                this.elementPathEnabled = !0;
                this._updateElementPath()
            }, _scale: function () {
                function a() {
                    I = e.getXY(h);
                    L || (L = g.options.minFrameHeight + s.offsetHeight + v.offsetHeight);
                    G.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" +
                        h.offsetWidth + "px;height:" + h.offsetHeight + "px;z-index:" + (g.options.zIndex + 1);
                    e.on(f, "mousemove", b);
                    e.on(p, "mouseup", c);
                    e.on(f, "mouseup", c)
                }

                function b(a) {
                    d();
                    a = a || window.event;
                    T = a.pageX || f.documentElement.scrollLeft + a.clientX;
                    z = a.pageY || f.documentElement.scrollTop + a.clientY;
                    H = T - I.x;
                    D = z - I.y;
                    H >= P && (A = !0, G.style.width = H + "px");
                    D >= L && (A = !0, G.style.height = D + "px")
                }

                function c() {
                    A && (A = !1, g.ui._actualFrameWidth = G.offsetWidth - 2, h.style.width = g.ui._actualFrameWidth + "px", g.setHeight(G.offsetHeight - v.offsetHeight -
                        s.offsetHeight - 2, !0));
                    G && (G.style.display = "none");
                    d();
                    e.un(f, "mousemove", b);
                    e.un(p, "mouseup", c);
                    e.un(f, "mouseup", c)
                }

                function d() {
                    r.ie ? f.selection.clear() : window.getSelection().removeAllRanges()
                }

                var f = document, g = this.editor, h = g.container, p = g.document, s = this.getDom("toolbarbox"),
                    v = this.getDom("bottombar"), E = this.getDom("scale"), G = this.getDom("scalelayer"), A = !1,
                    I = null, L = 0, P = g.options.minFrameWidth, T = 0, z = 0, H = 0, D = 0, B = this;
                this.editor.addListener("fullscreenchanged", function (a, b) {
                    if (b) B.disableScale();
                    else if (B.editor.options.scaleEnabled) {
                        B.enableScale();
                        var c = B.editor.document.createElement("span");
                        B.editor.body.appendChild(c);
                        B.editor.body.style.height = Math.max(e.getXY(c).y, B.editor.iframe.offsetHeight - 20) + "px";
                        e.remove(c)
                    }
                });
                this.enableScale = function () {
                    1 != g.queryCommandState("source") && (E.style.display = "", this.scaleEnabled = !0, e.on(E, "mousedown", a))
                };
                this.disableScale = function () {
                    E.style.display = "none";
                    this.scaleEnabled = !1;
                    e.un(E, "mousedown", a)
                }
            }, isFullScreen: function () {
                return this._fullscreen
            },
            postRender: function () {
                a.prototype.postRender.call(this);
                for (var b = 0; b < this.toolbars.length; b++) this.toolbars[b].postRender();
                var c = this, d, e = s.editor.dom.domUtils, f = function () {
                    clearTimeout(d);
                    d = setTimeout(function () {
                        c._updateFullScreen()
                    })
                };
                e.on(window, "resize", f);
                c.addListener("destroy", function () {
                    e.un(window, "resize", f);
                    clearTimeout(d)
                })
            }, showToolbarMsg: function (a, b) {
                this.getDom("toolbarmsg_label").innerHTML = a;
                this.getDom("toolbarmsg").style.display = "";
                b || (this.getDom("upload_dialog").style.display =
                    "none")
            }, hideToolbarMsg: function () {
                this.getDom("toolbarmsg").style.display = "none"
            }, mapUrl: function (a) {
                return a ? a.replace("~/", this.editor.options.UEDITOR_HOME_URL || "") : ""
            }, triggerLayout: function () {
                var a = this.getDom();
                a.style.zoom = "1" == a.style.zoom ? "100%" : "1"
            }
        };
        c.inherits(d, s.editor.ui.UIBase);
        var g = {};
        UE.ui.Editor = function (a) {
            var b = new UE.Editor(a);
            b.options.editor = b;
            c.loadFile(document, {
                href: b.options.themePath + b.options.theme + "/css/ueditor.css",
                tag: "link",
                type: "text/css",
                rel: "stylesheet"
            });
            var f =
                b.render;
            b.render = function (a) {
                a.constructor === String && (b.key = a, g[a] = b);
                c.domReady(function () {
                    function c() {
                        b.setOpt({labelMap: b.options.labelMap || b.getLang("labelMap")});
                        new d(b.options);
                        if (a && (a.constructor === String && (a = document.getElementById(a)), a && a.getAttribute("name") && (b.options.textarea = a.getAttribute("name")), a && /script|textarea/ig.test(a.tagName))) {
                            var g = document.createElement("div");
                            a.parentNode.insertBefore(g, a);
                            var h = a.value || a.innerHTML;
                            b.options.initialContent = /^[\t\r\n ]*$/.test(h) ?
                                b.options.initialContent : h.replace(/>[\n\r\t]+([ ]{4})+/g, ">").replace(/[\n\r\t]+([ ]{4})+</g, "<").replace(/>[\n\r\t]+</g, "><");
                            a.className && (g.className = a.className);
                            a.style.cssText && (g.style.cssText = a.style.cssText);
                            /textarea/i.test(a.tagName) ? (b.textarea = a, b.textarea.style.display = "none") : a.parentNode.removeChild(a);
                            a.id && (g.id = a.id, e.removeAttributes(a, "id"));
                            a = g;
                            a.innerHTML = ""
                        }
                        e.addClass(a, "edui-" + b.options.theme);
                        b.ui.render(a);
                        g = b.options;
                        b.container = b.ui.getDom();
                        for (var h = e.findParents(a,
                            !0), l = [], p = 0, q; q = h[p]; p++) l[p] = q.style.display, q.style.display = "block";
                        g.initialFrameWidth ? g.minFrameWidth = g.initialFrameWidth : (g.minFrameWidth = g.initialFrameWidth = a.offsetWidth, p = a.style.width, /%$/.test(p) && (g.initialFrameWidth = p));
                        g.initialFrameHeight ? g.minFrameHeight = g.initialFrameHeight : g.initialFrameHeight = g.minFrameHeight = a.offsetHeight;
                        for (p = 0; q = h[p]; p++) q.style.display = l[p];
                        a.style.height && (a.style.height = "");
                        b.container.style.width = g.initialFrameWidth + (/%$/.test(g.initialFrameWidth) ? "" : "px");
                        b.container.style.zIndex = g.zIndex;
                        f.call(b, b.ui.getDom("iframeholder"));
                        b.fireEvent("afteruiready")
                    }

                    b.langIsReady ? c() : b.addListener("langReady", c)
                })
            };
            return b
        };
        UE.getEditor = function (a, b) {
            var c = g[a];
            c || (c = g[a] = new UE.ui.Editor(b), c.render(a));
            return c
        };
        UE.delEditor = function (a) {
            var b;
            if (b = g[a]) b.key && b.destroy(), delete g[a]
        };
        UE.registerUI = function (a, b, d, e) {
            c.each(a.split(/\s+/), function (a) {
                UE._customizeUI[a] = {id: e, execFn: b, index: d}
            })
        }
    })();
    UE.registerUI("message", function (d) {
        function c() {
            var b = f.ui.getDom("toolbarbox");
            b && (a.style.top = b.offsetHeight + 3 + "px");
            a.style.zIndex = Math.max(f.options.zIndex, f.iframe.style.zIndex) + 1
        }

        var b = s.editor.ui.Message, a, e = [], f = d;
        f.addListener("ready", function () {
            a = document.getElementById(f.ui.id + "_message_holder");
            c();
            setTimeout(function () {
                c()
            }, 500)
        });
        f.addListener("showmessage", function (d, l) {
            l = p.isString(l) ? {content: l} : l;
            var k = new b({timeout: l.timeout, type: l.type, content: l.content, keepshow: l.keepshow, editor: f}),
                m = l.id || "msg_" + (+new Date).toString(36);
            k.render(a);
            e[m] = k;
            k.reset(l);
            c();
            return m
        });
        f.addListener("updatemessage", function (b, c, d) {
            d = p.isString(d) ? {content: d} : d;
            b = e[c];
            b.render(a);
            b && b.reset(d)
        });
        f.addListener("hidemessage", function (a, b) {
            var c = e[b];
            c && c.hide()
        })
    });
    UE.registerUI("autosave", function (d) {
        var c = null, b = null;
        d.on("afterautosave", function () {
            clearTimeout(c);
            c = setTimeout(function () {
                b && d.trigger("hidemessage", b);
                b = d.trigger("showmessage", {content: d.getLang("autosave.success"), timeout: 2E3})
            }, 2E3)
        })
    })
})();
