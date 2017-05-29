/* ScrollMagic v1.1.2 | (c) 2014 Jan Paepke (@janpaepke) | license & info: http://janpaepke.github.io/ScrollMagic */
import jQuery from '../../../_libs/jquery-1.11.0.min';

!function (e, t) {
    "use strict";
    var r = function (r) {
        var s, a = "ScrollMagic", l = {
            container: t,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }, c = this, u = e.extend({}, l, r), g = [], f = !1, h = 0, d = "PAUSED", p = !0, v = 0, m = !1, w = !0, E = function () {
            if (e.each(u, function (e) {
                    l.hasOwnProperty(e) || delete u[e]
                }), u.container = e(u.container).first(), 0 === u.container.length)throw a + " init failed.";
            p = !e.contains(document, u.container.get(0)), v = u.vertical ? u.container.height() : u.container.width(), u.container.on("scroll resize", b);
            try {
                TweenLite.ticker.addEventListener("tick", F), m = !0
            } catch (r) {
                u.container.on("scroll resize", F), m = !1
            }
            u.refreshInterval = parseInt(u.refreshInterval), u.refreshInterval > 0 && (s = t.setInterval(T, u.refreshInterval))
        }, S = function () {
            return u.vertical ? u.container.scrollTop() : u.container.scrollLeft()
        }, y = function (e) {
            u.vertical ? u.container.scrollTop(e) : u.container.scrollLeft(e)
        }, F = function () {
            if (f && w) {
                var t = e.isArray(f) ? f : g.slice(0), r = h;
                h = c.scrollPos();
                var n = h - r;
                d = 0 === n ? "PAUSED" : n > 0 ? "FORWARD" : "REVERSE", 0 > n && t.reverse(), e.each(t, function (e, t) {
                    t.update(!0)
                }), 0 === t.length && u.loglevel >= 3, f = !1
            }
        }, b = function (e) {
            "resize" == e.type && (v = u.vertical ? u.container.height() : u.container.width()), f = !0
        }, T = function () {
            p || v != (u.vertical ? u.container.height() : u.container.width()) && u.container.trigger("resize"), e.each(g, function (e, t) {
                t.refresh()
            })
        }, z = function (e) {
            if (e.length <= 1)return e;
            var t = e.slice(0);
            return t.sort(function (e, t) {
                return e.scrollOffset() > t.scrollOffset() ? 1 : -1
            }), t
        };
        return this.addScene = function (t) {
            return e.isArray(t) ? e.each(t, function (e, t) {
                    c.addScene(t)
                }) : t instanceof n && (t.parent() != c ? t.addTo(c) : e.inArray(t, g) < 0 && (g.push(t), g = z(g), t.on("shift." + a + "_sort", function () {
                        g = z(g)
                    }), e.each(u.globalSceneOptions, function (e, r) {
                        t[e] && t[e].call(t, r)
                    }))), c
        }, this.removeScene = function (t) {
            if (e.isArray(t)) e.each(t, function (e, t) {
                c.removeScene(t)
            }); else {
                var r = e.inArray(t, g);
                r > -1 && (t.off("shift." + a + "_sort"), g.splice(r, 1), t.remove())
            }
            return c
        }, this.updateScene = function (t, r) {
            return e.isArray(t) ? e.each(t, function (e, t) {
                    c.updateScene(t, r)
                }) : r ? t.update(!0) : (e.isArray(f) || (f = []), -1 == e.inArray(t, f) && f.push(t), f = z(f)), c
        }, this.update = function (e) {
            return b({type: "resize"}), e && F(), c
        }, this.scrollTo = function (t) {
            if (t instanceof n) t.parent() === c ? c.scrollTo(t.scrollOffset()) : log(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", t); else if ("string" === e.type(t) || o(t) || t instanceof e) {
                var r = e(t).first();
                if (r[0]) {
                    var s = u.vertical ? "top" : "left", a = i(u.container), l = i(r);
                    p || (a[s] -= c.scrollPos()), c.scrollTo(l[s] - a[s])
                } else log(2, "scrollTo(): The supplied element could not be found. Scroll cancelled.", t)
            } else e.isFunction(t) ? y = t : y.call(u.container[0], t);
            return c
        }, this.scrollPos = function (t) {
            return arguments.length ? (e.isFunction(t) && (S = t), c) : S.call(c)
        }, this.info = function (e) {
            var t = {
                size: v,
                vertical: u.vertical,
                scrollPos: h,
                scrollDirection: d,
                container: u.container,
                isDocument: p
            };
            return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t
        }, this.loglevel = function (e) {
            return arguments.length ? (u.loglevel != e && (u.loglevel = e), c) : u.loglevel
        }, this.enabled = function (e) {
            return arguments.length ? (w != e && (w = !!e, c.updateScene(g, !0)), c) : w
        }, this.destroy = function (e) {
            t.clearTimeout(s);
            for (var r = g.length; r--;)g[r].destroy(e);
            return u.container.off("scroll resize", b), m ? TweenLite.ticker.removeEventListener("tick", F) : u.container.off("scroll resize", F), null
        }, E(), c
    }, n = function (n) {
        var o, a, l, c, u, g, f, h = {onCenter: .5, onEnter: 1, onLeave: 0}, d = "ScrollScene", p = {
            duration: 0,
            offset: 0,
            triggerElement: null,
            triggerHook: "onCenter",
            reverse: !0,
            tweenChanges: !1,
            loglevel: 2
        }, v = this, m = e.extend({}, p, n), w = "BEFORE", E = 0, S = {
            start: 0,
            end: 0
        }, y = 0, F = !0, b = {
            unknownOptionSupplied: function () {
                e.each(m, function (e) {
                    p.hasOwnProperty(e) || delete m[e]
                })
            }, duration: function () {
                if (e.isFunction(m.duration)) {
                    o = m.duration;
                    try {
                        m.duration = parseFloat(o())
                    } catch (t) {
                        o = void 0, m.duration = p.duration
                    }
                } else m.duration = parseFloat(m.duration), (!e.isNumeric(m.duration) || m.duration < 0) && (m.duration = p.duration)
            }, offset: function () {
                m.offset = parseFloat(m.offset), e.isNumeric(m.offset) || (m.offset = p.offset)
            }, triggerElement: function () {
                null !== m.triggerElement && 0 === e(m.triggerElement).length && (m.triggerElement = p.triggerElement)
            }, triggerHook: function () {
                m.triggerHook in h || (m.triggerHook = e.isNumeric(m.triggerHook) ? Math.max(0, Math.min(parseFloat(m.triggerHook), 1)) : p.triggerHook)
            }, reverse: function () {
                m.reverse = !!m.reverse
            }, tweenChanges: function () {
                m.tweenChanges = !!m.tweenChanges
            }
        }, T = function () {
            z(), v.on("change.internal", function (e) {
                "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? I() : "reverse" === e.what && v.update())
            }).on("shift.internal", function (e) {
                C(), v.update(), ("AFTER" === w && "duration" === e.reason || "DURING" === w && 0 === m.duration) && x()
            }).on("progress.internal", function () {
                P(), x()
            }).on("destroy", function (e) {
                e.preventDefault()
            })
        }, z = function (t) {
            if (arguments.length) e.isArray(t) || (t = [t]); else {
                t = [];
                for (var r in b)t.push(r)
            }
            e.each(t, function (e, t) {
                b[t] && b[t]()
            })
        }, R = function (e, t) {
            var r = !1, n = m[e];
            return m[e] != t && (m[e] = t, z(e), r = n != m[e]), r
        }, C = function () {
            S = {start: y + m.offset}, a && m.triggerElement && (S.start -= a.info("size") * v.triggerHook()), S.end = S.start + m.duration
        }, D = function (e) {
            if (o) {
                var t = "duration";
                R(t, o.call(v)) && !e && (v.trigger("change", {what: t, newval: m[t]}), v.trigger("shift", {reason: t}))
            }
        }, I = function (t) {
            var r = 0;
            if (a && m.triggerElement) {
                for (var n = e(m.triggerElement).first(), o = a.info(), s = i(o.container), l = o.vertical ? "top" : "left"; n.parent().data("ScrollMagicPinSpacer");)n = n.parent();
                var c = i(n);
                o.isDocument || (s[l] -= a.scrollPos()), r = c[l] - s[l]
            }
            var u = r != y;
            y = r, u && !t && v.trigger("shift", {reason: "triggerElementPosition"})
        }, P = function (e) {
            if (l) {
                var t = e >= 0 && 1 >= e ? e : E;
                if (-1 === l.repeat())if ("DURING" === w && l.paused()) l.play(); else {
                    if ("DURING" === w || l.paused())return !1;
                    l.pause()
                } else {
                    if (t == l.progress())return !1;
                    0 === m.duration ? "DURING" === w ? l.play() : l.reverse() : m.tweenChanges ? l.tweenTo(t * l.duration()) : l.progress(t).pause()
                }
                return !0
            }
            return !1
        }, x = function (e) {
            if (c && a) {
                var t = a.info();
                if (e || "DURING" !== w) {
                    var r = {
                        position: u.inFlow ? "relative" : "absolute",
                        top: 0,
                        left: 0
                    }, n = c.css("position") != r.position;
                    u.pushFollowers ? m.duration > 0 && ("AFTER" === w && 0 === parseFloat(u.spacer.css("padding-top")) ? n = !0 : "BEFORE" === w && 0 === parseFloat(u.spacer.css("padding-bottom")) && (n = !0)) : r[t.vertical ? "top" : "left"] = m.duration * E, c.css(r), n && (c.removeClass(u.pinnedClass), k())
                } else {
                    "fixed" != c.css("position") && (c.css("position", "fixed"), k(), c.addClass(u.pinnedClass));
                    var o = i(u.spacer, !0), s = m.reverse || 0 === m.duration ? t.scrollPos - S.start : Math.round(E * m.duration * 10) / 10;
                    o.top -= parseFloat(u.spacer.css("margin-top")), o[t.vertical ? "top" : "left"] += s, c.css({
                        top: o.top,
                        left: o.left
                    })
                }
            }
        }, k = function () {
            if (c && a && u.inFlow) {
                var r = "AFTER" === w, n = "BEFORE" === w, i = "DURING" === w, o = "fixed" == c.css("position"), l = a.info("vertical"), g = u.spacer.children().first(), f = s(u.spacer.css("display")), h = {};
                f ? (h["margin-top"] = n || i && o ? c.css("margin-top") : "auto", h["margin-bottom"] = r || i && o ? c.css("margin-bottom") : "auto") : h["margin-top"] = h["margin-bottom"] = "auto", u.relSize.width || u.relSize.autoFullWidth ? o ? e(t).width() == u.spacer.parent().width() ? c.css("width", u.relSize.autoFullWidth ? "100%" : "inherit") : c.css("width", u.spacer.width()) : c.css("width", "100%") : (h["min-width"] = g.outerWidth(!g.is(c)), h.width = o ? h["min-width"] : "auto"), u.relSize.height ? o ? e(t).height() == u.spacer.parent().height() ? c.css("height", "inherit") : c.css("height", u.spacer.height()) : c.css("height", "100%") : (h["min-height"] = g.outerHeight(!f), h.height = o ? h["min-height"] : "auto"), u.pushFollowers && (h["padding" + (l ? "Top" : "Left")] = m.duration * E, h["padding" + (l ? "Bottom" : "Right")] = m.duration * (1 - E)), u.spacer.css(h)
            }
        }, O = function () {
            a && c && "DURING" === w && !a.info("isDocument") && x()
        }, N = function () {
            a && c && "DURING" === w && ((u.relSize.width || u.relSize.autoFullWidth) && e(t).width() != u.spacer.parent().width() || u.relSize.height && e(t).height() != u.spacer.parent().height()) && k()
        }, U = function (e) {
            a && c && "DURING" === w && a.scrollTo(a.info("scrollPos") - (e.originalEvent.wheelDelta / 3 || 30 * -e.originalEvent.detail))
        };
        return this.parent = function () {
            return a
        }, this.duration = function (t) {
            var r = "duration";
            return arguments.length ? (e.isFunction(t) || (o = void 0), R(r, t) && (v.trigger("change", {
                    what: r,
                    newval: m[r]
                }), v.trigger("shift", {reason: r})), v) : m[r]
        }, this.offset = function (e) {
            var t = "offset";
            return arguments.length ? (R(t, e) && (v.trigger("change", {
                    what: t,
                    newval: m[t]
                }), v.trigger("shift", {reason: t})), v) : m[t]
        }, this.triggerElement = function (e) {
            var t = "triggerElement";
            return arguments.length ? (R(t, e) && v.trigger("change", {what: t, newval: m[t]}), v) : m[t]
        }, this.triggerHook = function (t) {
            var r = "triggerHook";
            return arguments.length ? (R(r, t) && (v.trigger("change", {
                    what: r,
                    newval: m[r]
                }), v.trigger("shift", {reason: r})), v) : e.isNumeric(m[r]) ? m[r] : h[m[r]]
        }, this.reverse = function (e) {
            var t = "reverse";
            return arguments.length ? (R(t, e) && v.trigger("change", {what: t, newval: m[t]}), v) : m[t]
        }, this.tweenChanges = function (e) {
            var t = "tweenChanges";
            return arguments.length ? (R(t, e) && v.trigger("change", {what: t, newval: m[t]}), v) : m[t]
        }, this.loglevel = function (e) {
            var t = "loglevel";
            return arguments.length ? (R(t, e) && v.trigger("change", {what: t, newval: m[t]}), v) : m[t]
        }, this.state = function () {
            return w
        }, this.triggerPosition = function () {
            var e = m.offset;
            return a && (e += m.triggerElement ? y : a.info("size") * v.triggerHook()), e
        }, this.triggerOffset = function () {
            return v.triggerPosition()
        }, this.scrollOffset = function () {
            return S.start
        }, this.update = function (e) {
            if (a)if (e)if (a.enabled() && F) {
                var t, r = a.info("scrollPos");
                t = m.duration > 0 ? (r - S.start) / (S.end - S.start) : r >= S.start ? 1 : 0, v.trigger("update", {
                    startPos: S.start,
                    endPos: S.end,
                    scrollPos: r
                }), v.progress(t)
            } else c && "DURING" === w && x(!0); else a.updateScene(v, !1);
            return v
        }, this.refresh = function () {
            return D(), I(), v
        }, this.progress = function (e) {
            if (arguments.length) {
                var t = !1, r = w, n = a ? a.info("scrollDirection") : "PAUSED", i = m.reverse || e >= E;
                if (0 === m.duration ? (t = E != e, E = 1 > e && i ? 0 : 1, w = 0 === E ? "BEFORE" : "DURING") : 0 >= e && "BEFORE" !== w && i ? (E = 0, w = "BEFORE", t = !0) : e > 0 && 1 > e && i ? (E = e, w = "DURING", t = !0) : e >= 1 && "AFTER" !== w ? (E = 1, w = "AFTER", t = !0) : "DURING" !== w || i || x(), t) {
                    var o = {progress: E, state: w, scrollDirection: n}, s = w != r, l = function (e) {
                        v.trigger(e, o)
                    };
                    s && "DURING" !== r && (l("enter"), l("BEFORE" === r ? "start" : "end")), l("progress"), s && "DURING" !== w && (l("BEFORE" === w ? "start" : "end"), l("leave"))
                }
                return v
            }
            return E
        }, this.setTween = function (e) {
            l && v.removeTween();
            try {
                l = new TimelineMax({smoothChildTiming: !0}).add(e).pause()
            } catch (t) {
            } finally {
                return e.repeat && -1 === e.repeat() && (l.repeat(-1), l.yoyo(e.yoyo())), z("checkIfTriggerElementIsTweened"), P(), v
            }
        }, this.removeTween = function (e) {
            return l && (e && P(0), l.kill(), l = void 0), v
        }, this.setPin = function (r, n) {
            var i = {pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer", pinnedClass: ""};
            if (n = e.extend({}, i, n), r = e(r).first(), 0 === r.length)return v;
            if ("fixed" == r.css("position"))return v;
            if (c) {
                if (c === r)return v;
                v.removePin()
            }
            c = r, c.parent().hide();
            var o = "absolute" != c.css("position"), a = c.css(["display", "top", "left", "bottom", "right"]), l = c.css(["width", "height"]);
            c.parent().show(), "0px" === l.width && o && s(a.display), !o && n.pushFollowers && (n.pushFollowers = !1);
            var g = e("<div></div>").addClass(n.spacerClass).css(a).data("ScrollMagicPinSpacer", !0).css({
                position: o ? "relative" : "absolute",
                "margin-left": "auto",
                "margin-right": "auto",
                "box-sizing": "content-box"
            }), f = c[0].style;
            return u = {
                spacer: g,
                relSize: {
                    width: "%" === l.width.slice(-1),
                    height: "%" === l.height.slice(-1),
                    autoFullWidth: "0px" === l.width && o && s(a.display)
                },
                pushFollowers: n.pushFollowers,
                inFlow: o,
                origStyle: {
                    width: f.width || "",
                    position: f.position || "",
                    top: f.top || "",
                    left: f.left || "",
                    bottom: f.bottom || "",
                    right: f.right || "",
                    "box-sizing": f["box-sizing"] || "",
                    "-moz-box-sizing": f["-moz-box-sizing"] || "",
                    "-webkit-box-sizing": f["-webkit-box-sizing"] || ""
                },
                pinnedClass: n.pinnedClass
            }, u.relSize.width && g.css("width", l.width), u.relSize.height && g.css("height", l.height), c.before(g).appendTo(g).css({
                position: o ? "relative" : "absolute",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }), (u.relSize.width || u.relSize.autoFullWidth) && c.css("box-sizing", "border-box"), e(t).on("scroll." + d + "_pin resize." + d + "_pin", O), c.on("mousewheel DOMMouseScroll", U), x(), v
        }, this.removePin = function (r) {
            return c && (r || !a ? (c.insertBefore(u.spacer).css(u.origStyle), u.spacer.remove()) : "DURING" === w && x(!0), e(t).off("scroll." + d + "_pin resize." + d + "_pin"), c.off("mousewheel DOMMouseScroll", U), c = void 0), v
        }, this.setClassToggle = function (t, r) {
            var n = e(t);
            return 0 === n.length || "string" !== e.type(r) ? v : (g = r, f = n, v.on("enter.internal_class leave.internal_class", function (e) {
                    f.toggleClass(g, "enter" === e.type)
                }), v)
        }, this.removeClassToggle = function (e) {
            return f && e && f.removeClass(g), v.off("start.internal_class end.internal_class"), g = void 0, f = void 0, v
        }, this.addTo = function (e) {
            return e instanceof r && a != e && (a && a.removeScene(v), a = e, z(), D(!0), I(!0), C(), k(), a.info("container").on("resize." + d, function () {
                N(), v.triggerHook() > 0 && v.trigger("shift", {reason: "containerSize"})
            }), e.addScene(v), v.update()), v
        }, this.enabled = function (e) {
            return arguments.length ? (F != e && (F = !!e, v.update(!0)), v) : F
        }, this.remove = function () {
            if (a) {
                a.info("container").off("resize." + d);
                var e = a;
                a = void 0, e.removeScene(v)
            }
            return v
        }, this.destroy = function (e) {
            return v.removeTween(e), v.removePin(e), v.removeClassToggle(e), v.trigger("destroy", {reset: e}), v.remove(), v.off("start end enter leave progress change update shift destroy shift.internal change.internal progress.internal"), null
        }, this.on = function (t, r) {
            if (e.isFunction(r)) {
                var n = e.trim(t).toLowerCase().replace(/(\w+)\.(\w+)/g, "$1." + d + "_$2").replace(/( |^)(\w+)(?= |$)/g, "$1$2." + d);
                e(v).on(n, r)
            }
            return v
        }, this.off = function (t, r) {
            var n = e.trim(t).toLowerCase().replace(/(\w+)\.(\w+)/g, "$1." + d + "_$2").replace(/( |^)(\w+)(?= |$)/g, "$1$2." + d + "$3");
            return e(v).off(n, r), v
        }, this.trigger = function (t, r) {
            var n = e.Event(e.trim(t).toLowerCase(), r);
            return e(v).trigger(n), v
        }, T(), v
    };
    r.prototype.version = "1.1.2", t.ScrollScene = n, t.ScrollMagic = r;
    var i = function (t, r) {
        var n = {top: 0, left: 0}, i = t[0];
        if (i)if (i.getBoundingClientRect) {
            var o = i.getBoundingClientRect();
            n.top = o.top, n.left = o.left, r || (n.top += e(document).scrollTop(), n.left += e(document).scrollLeft())
        } else n = t.offset() || n, r && (n.top -= e(document).scrollTop(), n.left -= e(document).scrollLeft());
        return n
    }, o = function (e) {
        return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
    }, s = function (e) {
        return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
    }
}(jQuery, window);