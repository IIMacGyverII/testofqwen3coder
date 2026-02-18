// Muse asset checking function (externalized from inline script)
window.Muse.assets.check = function(c) {
    if (!window.Muse.assets.checked) {
        window.Muse.assets.checked = !0;
        var b = {},
            d = function(a, b) {
                if (window.getComputedStyle) {
                    var c = window.getComputedStyle(a, null);
                    return c && c.getPropertyValue(b) || c && c[b] || ""
                }
                if (document.documentElement.currentStyle) return (c = a.currentStyle) && c[b] || a.style && a.style[b] || "";
                return ""
            },
            a = function(a) {
                if (a.match(/^rgb/)) return a = a.replace(/\s+/g, "").match(/([\d\,]+)/gi)[0].split(","), (parseInt(a[0]) << 16) + (parseInt(a[1]) << 8) + parseInt(a[2]);
                if (a.match(/^\#/)) return parseInt(a.substr(1, 16));
                return 0
            },
            f = function(f) {
                for (var g = document.getElementsByTagName("link"), j = 0; j < g.length; j++) if ("text/css" == g[j].type) {
                    var l = (g[j].href || "").match(/\/?css\/([\w\-]+\.css)\?crc=(\d+)/);
                    if (!l || !l[1] || !l[2]) break;
                    b[l[1]] = l[2]
                }
                g = document.createElement("div");
                g.className = "version";
                g.style.cssText = "display:none; width:1px; height:1px;";
                document.getElementsByTagName("body")[0].appendChild(g);
                for (j = 0; j < Muse.assets.required.length;) {
                    var l = Muse.assets.required[j],
                        k = l.match(/([\w\-\.]+)\.(\w+)$/),
                        i = k && k[1] ? k[1] : null,
                        k = k && k[2] ? k[2] : null;
                    switch (k.toLowerCase()) {
                        case "css":
                            i = i.replace(/\W/gi, "_").replace(/^([^a-z])/gi, "_$1");
                            g.className += " " + i;
                            i = a(d(g, "color"));
                            k = a(d(g, "backgroundColor"));
                            i != 0 || k != 0 ? (Muse.assets.required.splice(j, 1), "undefined" != typeof b[l] && (i != b[l] >>> 24 || k != (b[l] & 16777215)) && Muse.assets.outOfDate.push(l)) : j++;
                            g.className = "version";
                            break;
                        case "js":
                            j++;
                            break;
                        default:
                            throw Error("Unsupported file type: " + k);
                    }
                }
                c ? c().jquery != "1.8.3" && Muse.assets.outOfDate.push("jquery-1.8.3.min.js") : Muse.assets.required.push("jquery-1.8.3.min.js");
                g.parentNode.removeChild(g);
                if (Muse.assets.outOfDate.length || Muse.assets.required.length) g = "Some files on the server may be missing or incorrect. Clear browser cache and try again. If the problem persists please contact website author.", console.log(g);
                location && location.search && location.search.match && location.search.match(/muse_debug/gi) ? setTimeout(function() {
                    f(!0)
                }, 5E3) : f()
            };
        location && location.search && location.search.match && location.search.match(/muse_debug/gi) ? setTimeout(function() {
            f(!0)
        }, 5E3) : f()
    }
};

// Muse init function (externalized from inline script)
var muse_init = function() {
    require.config({
        baseUrl: ""
    });
    require(["jquery", "museutils", "whatinput", "jquery.watch", "jquery.musepolyfill.bgsize", "webpro", "musewpslideshow", "jquery.museoverlay", "touchswipe", "jquery.musemenu"], function(c) {
        var $ = c;
        $(document).ready(function() {
            try {
                window.Muse.assets.check($); /* body */
                Muse.Utils.transformMarkupToFixBrowserProblemsPreInit(); /* body */
                Muse.Utils.prepHyperlinks(true); /* body */
                Muse.Utils.resizeHeight('.browser_width'); /* resize height */
                Muse.Utils.requestAnimationFrame(function() {
                    $('body').addClass('initialized');
                }); /* mark body as initialized */
                Muse.Utils.makeButtonsVisibleAfterSettingMinWidth(); /* body */
                Muse.Utils.initWidget('#slideshowu177', ['#bp_infinity'], function(elem) {
                    var widget = new WebPro.Widget.ContentSlideShow(elem, {
                        autoPlay: true,
                        displayInterval: 3500,
                        slideLinkStopsSlideShow: false,
                        transitionStyle: 'fading',
                        lightboxEnabled_runtime: false,
                        shuffle: false,
                        transitionDuration: 1000,
                        enableSwipe: true,
                        elastic: 'off',
                        resumeAutoplay: true,
                        resumeAutoplayInterval: 3000,
                        playOnce: false,
                        autoActivate_runtime: false,
                        isResponsive: false
                    });
                    $(elem).data('widget', widget);
                    return widget;
                }); /* #slideshowu177 */
                Muse.Utils.initWidget('.MenuBar', ['#bp_infinity'], function(elem) {
                    return $(elem).museMenu();
                }); /* unifiedNavBar */
                Muse.Utils.initWidget('#pamphletu1216', ['#bp_infinity'], function(elem) {
                    return new WebPro.Widget.ContentSlideShow(elem, {
                        contentLayout_runtime: 'stack',
                        event: 'click',
                        deactivationEvent: '',
                        autoPlay: true,
                        displayInterval: 3000,
                        transitionStyle: 'fading',
                        transitionDuration: 500,
                        hideAllContentsFirst: false,
                        triggersOnTop: false,
                        shuffle: false,
                        enableSwipe: true,
                        resumeAutoplay: false,
                        resumeAutoplayInterval: 3000,
                        playOnce: false,
                        autoActivate_runtime: false,
                        isResponsive: false
                    });
                }); /* #pamphletu1216 */
                Muse.Utils.fullPage('#page'); /* 100% height page */
                Muse.Utils.showWidgetsWhenReady(); /* body */
                Muse.Utils.transformMarkupToFixBrowserProblems(); /* body */
            } catch (b) {
                if (b && "function" == typeof b.notify ? b.notify() : Muse.Assert.fail("Error calling selector function: " + b), false) throw b;
            }
        })
    })
};
