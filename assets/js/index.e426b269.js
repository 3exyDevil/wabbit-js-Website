var t;
import {
    H as e,
    r as s,
    c as o,
    a as n,
    u as r,
    d as a,
    o as l,
    b as i,
    e as c,
    t as d,
    f as u,
    g as p,
    h,
    w as m,
    i as g,
    j as f,
    k as b,
    l as v,
    m as w,
    v as x,
    n as y,
    p as k,
    F as S,
    q as _,
    T as j,
    s as C,
    x as R,
    y as M,
    z as O,
    A as T,
    B as E,
    C as z,
    D as L,
    E as W,
    G as $,
    I as P,
    J as A,
    K as D,
    L as N,
} from "./vendor.1e3f7553.js";
const U = (t) => {
    if (!t.ok) throw new Error("Failed to fetch documentation data. Choose another version or category.\nCannot see the existing documentation? Let me know at https://discord.gg/umKEVEWNpN, I will help!");
    return t.json();
};
class I {
    constructor(t) {
        var e, s, o, n, r;
        (this.options = t),
            (this.id = this.options.id),
            (this.name = this.options.name),
            (this.global = this.options.global),
            (this.repo = this.options.repo),
            (this.defaultTag = null != (e = this.options.defaultTag) ? e : "master"),
            (this.defaultFile = null != (s = this.options.defaultFile) ? s : { category: "general", id: "welcome" }),
            (this.source = null != (o = this.options.source) ? o : `https://github.com/${this.repo}/blob/`),
            (this.branchFilter = null != (n = this.options.branchFilter) ? n : (t) => "master" !== t),
            (this.tagFilter = null != (r = this.options.tagFilter) ? r : () => !0),
            (this.tags = null),
            (this.recentTag = null);
    }
    fetchTags() {
        return this.tags
            ? Promise.resolve(this.tags)
            : Promise.all([fetch(`https://api.github.com/repos/${this.repo}/branches`).then(U), fetch(`https://api.github.com/repos/${this.repo}/tags`).then(U)])
                  .catch((t) => {
                      if (localStorage[`source-${this.id}`]) {
                          console.error(t);
                          const e = JSON.parse(localStorage[`source-${this.id}`]);
                          return [e.branches, e.tags];
                      }
                      throw t;
                  })
                  .then((t) => {
                      const [s, o] = t;
                      (this.tags = [this.defaultTag]), (localStorage[`source-${this.id}`] = JSON.stringify({ branches: s, tags: o }));
                      for (const e of s) e.name !== this.defaultTag && this.branchFilter(e.name) && this.tags.push(e.name);
                      const n = {};
                      for (const r of o)
                          if (e.valid(r.name)) {
                              const t = `${e.major(r.name)}.${e.minor(r.name)}`,
                                  s = e.patch(r.name);
                              if (s < n[t]) continue;
                              n[t] = s;
                          }
                      for (const r of o)
                          if (r.name !== this.defaultTag && this.tagFilter(r.name)) {
                              if (e.valid(r.name)) {
                                  const t = `${e.major(r.name)}.${e.minor(r.name)}`;
                                  if (e.patch(r.name) < n[t]) continue;
                              }
                              this.tags.push(r.name);
                          }
                      return this.tags;
                  });
    }
    async fetchDocs(t) {
        const e = await fetch(`https://raw.githubusercontent.com/${this.repo}/docs/${t}.json`);
        return U(e);
    }
}
fetch("https://api.github.com/repos/shadowplay1/test/branches")
    .then((t) => t.json())
    .then((t) => {
        const e = t
            .map((t) => t.name)
            .filter((t) => "main" !== t && "readme" !== t && "stable" !== t)
            .sort((t, e) => {
                const s = Number(t.split(".").join(""));
                return Number(e.split(".").join("")) - s;
            })[0];
        (document.cookie = `latestVersion=${e}; path=/`), localStorage.setItem("latestVersion", e);
    });
const G = new Set(["docs", "webpack", "v8"]);
var J = new I({
    id: "main",
    name: "Main library",
    global: "Economy",
    repo: "kermit_xaro/test",
    defaultTag: localStorage.latestVersion || (null == (t = document.cookie.split("; ").find((t) => t.includes("latestVersion="))) ? void 0 : t.slice("latestVersion=".length)),
    branchFilter: (t) => !G.has(t) && !t.startsWith("dependabot/"),
    tagFilter: (t) => e.gte(t, "9.0.0"),
});
const B = new Set(["docs"]);
var F = new I({ id: "collection", name: "Collection", global: "Collection", repo: "discordjs/collection", defaultTag: "master", branchFilter: (t) => !B.has(t) && !t.startsWith("dependabot/") });
const V = new Set(["gh-pages", "docs"]);
var q = new I({ id: "commando", name: "Commando", global: "Commando", repo: "discordjs/Commando", branchFilter: (t) => !V.has(t) && !t.startsWith("dependabot/"), tagFilter: (t) => e.gt(t.replace(/^v/, ""), "0.4.1") }),
    H = new I({ id: "rpc", name: "RPC", global: "RPC", repo: "discordjs/RPC", defaultTag: "master", branchFilter: (t) => "docs" !== t && !t.includes("greenkeeper"), tagFilter: (t) => e.gte(t.replace(/^v/, ""), "3.0.0") });
const K = s(!1);
class Y {
    constructor(t, e) {
        (this.name = t.toLowerCase()), (this.related = new Set([e]));
    }
    addRelated(t) {
        this.related.add(t);
    }
    matches(t) {
        return t.includes(this.name);
    }
}
var Z, Q;
((Q = Z || (Z = {}))[(Q.Class = 0)] = "Class"), (Q[(Q.Method = 1)] = "Method"), (Q[(Q.Property = 2)] = "Property"), (Q[(Q.Events = 3)] = "Events"), (Q[(Q.Typedefs = 4)] = "Typedefs");
class X {
    constructor(t, e, s, o, n, r) {
        switch (((this.name = t), (this.type = e), (this.parentName = s), (this.parentType = o), (this.access = n), (this.scope = r), e)) {
            case 0:
            case 4:
                this.computedName = t;
                break;
            case 1:
                this.computedName = `${null != s ? s : ""}.${t}()`;
                break;
            case 2:
                this.computedName = `${null != s ? s : ""}.${t}`;
                break;
            case 3:
                this.computedName = `${null != s ? s : ""}#${t}`;
        }
        (this.nameLowerCase = t.toLowerCase()), (this.cleanedComputedName = this.computedName.replace(/[().#]/, "").toLowerCase());
    }
    get isPriority() {
        return 0 === this.type || 4 === this.type;
    }
    getLinkPath() {
        var t, e;
        if (4 === this.type || 4 === this.parentType) return { name: "docs-source-tag-typedef-typedef", params: { typedef: null != (t = this.parentName) ? t : this.name } };
        const s = { name: "docs-source-tag-class-class", params: { class: null != (e = this.parentName) ? e : this.name } };
        return (1 !== this.type && 2 !== this.type) || (s.query = { scrollTo: this.name }), 3 === this.type && (s.query = { scrollTo: `e-${this.name}` }), s;
    }
}
const tt = o(() => rt.state.searchIndex),
    et = o(() => rt.state.searchRef);
function st(t) {
    const e = t.replace(/[\s().#]/g, "").toLowerCase();
    if ("" === e) return [];
    let s = tt.value.reduce((t, s) => {
        if (e.includes(s.name)) for (const e of s.related) t[e] ? t[e]++ : (t[e] = 1);
        return t;
    }, {});
    0 === Object.keys(s).length &&
        e.length < 10 &&
        (s = tt.value.reduce((t, s) => {
            if (s.name.includes(e)) for (const e of s.related) t[e] ? t[e]++ : (t[e] = 1);
            return t;
        }, {}));
    return Object.entries(s)
        .map(([t, e]) => [et.value[parseInt(t, 10)], e])
        .filter(([t]) => "private" !== t.access || K.value)
        .sort(([t, s], [o, n]) => {
            let r = 0;
            return (
                t.nameLowerCase === e ? (r += t.isPriority ? -10 : -4) : o.nameLowerCase === e && (r += o.isPriority ? 10 : 4),
                e.length > 7 && (t.cleanedComputedName.includes(e) && (r -= 30), o.cleanedComputedName.includes(e) && (r += 30)),
                s === n && (t.isPriority && (r -= 6), o.isPriority && (r += 6), s > 1 && (r += Math.abs(e.length - t.computedName.length) - Math.abs(e.length - o.computedName.length))),
                n - s + r
            );
        })
        .map(([t, e]) => t);
}
const ot = s(null),
    nt = Symbol("docs"),
    rt = n({
        state: {
            sources: [
                { source: J, name: J.name, id: J.id },
                { source: F, name: F.name, id: F.id },
                { source: q, name: q.name, id: q.id },
                { source: H, name: H.name, id: H.id },
            ],
            source: J,
            tag: J.defaultTag,
            docs: null,
            branches: [],
            file: null,
            stats: { downloads: `${(0).toLocaleString()}`, weeklyDownloads: `${(0).toLocaleString()}`, stars: `${(0).toLocaleString()}`, contributors: `${(1).toLocaleString()}` },
            searchIndex: [],
            searchRef: [],
        },
        mutations: {
            setSource(t, { source: e }) {
                t.source = e;
            },
            setTag(t, { tag: e }) {
                t.tag = e;
            },
            setDocs(t, { docs: e }) {
                t.docs = e;
            },
            setBranches(t, { branches: e }) {
                t.branches = e;
            },
            setFile(t, { file: e }) {
                t.file = e;
            },
            setStats(t, { stats: e }) {
                t.stats = e;
            },
            setSearchIndex(t, { searchIndex: e, searchRef: s }) {
                (t.searchIndex = e), (t.searchRef = s);
            },
        },
        actions: {
            fetchStats: async ({ commit: t }) => {
                let e = 0,
                    s = 0,
                    o = 0,
                    n = 0;
                const r = (t) => t.json(),
                    a = () => {},
                    [l, i, c] = await Promise.all([
                        fetch("https://api.npmjs.org/downloads/range/2021-03-01:2100-08-21/wabbit-js").then(r, a),
                        fetch("https://api.github.com/repos/Kermit-hastam/wabbit-js").then(r, a).catch(console.error),
                        fetch("https://api.github.com/repos/Kermit-hastam/wabbit-js/stats/contributors").then(r, a).catch(console.error),
                    ]);
                if (l) {
                    e = 0;
                    for (const t of l.downloads) e += t.downloads;
                    s = l.downloads
                        .map((t) => t.downloads)
                        .filter((t) => 0 !== t)
                        .slice(-7)
                        .reduce((t, e) => t + e);
                }
                i && (o = i.stargazers_count),
                    c && (n = c.length),
                    t({ type: "setStats", stats: { downloads: `${e.toLocaleString()}`, weeklyDownloads: `${s.toLocaleString()}`, stars: `${o.toLocaleString()}`, contributors: `${n.toLocaleString()}` } });
            },
            fetchDocs: async ({ commit: t }, { inputSource: e, inputTag: s = e.defaultTag }) => {
                var o, n, r, a;
                let l;
                try {
                    l = await e.fetchDocs(s);
                } catch (p) {
                    return t({ type: "setDocs", docs: null }), t({ type: "setTag", docs: null }), void (ot.value = p);
                }
                const i = [],
                    c = [];
                let d = 0;
                const u = (t, e, s, o, n, r) => {
                    const a = (function (t) {
                            var e;
                            return null != (e = t.match(/(([A-Z]{2,})(?=[A-Z]))|[A-Z][a-z]+|[a-z]+/g)) ? e : [];
                        })(t),
                        l = new X(t, e, s, o, n, r);
                    i.push(l);
                    const u = [];
                    for (const i of a) {
                        const t = i.toLowerCase();
                        let e = c.findIndex((e) => e.name === t);
                        e > -1 ? c[e].addRelated(d) : (e = c.push(new Y(t, d)) - 1), u.push(e);
                    }
                    return (d += 1), u;
                };
                for (const h of l.classes) {
                    const t = u(h.name, Z.Class, void 0, void 0, h.access, h.scope),
                        e = [];
                    for (const s of null != (o = h.methods) ? o : []) u(s.name, Z.Method, h.name, Z.Class, s.access, s.scope), e.push(d - 1);
                    for (const s of null != (n = h.props) ? n : []) u(s.name, Z.Property, h.name, Z.Class, s.access, s.scope), e.push(d - 1);
                    for (const s of null != (r = h.events) ? r : []) u(s.name, Z.Events, h.name, Z.Class, s.access, s.scope), e.push(d - 1);
                    for (const s of t) for (const t of e) c[s].related.add(t);
                }
                for (const h of l.typedefs) {
                    const t = u(h.name, Z.Typedefs, void 0, void 0, h.access, h.scope),
                        e = [];
                    for (const s of null != (a = h.props) ? a : []) u(s.name, Z.Property, h.name, Z.Typedefs, s.access, s.scope), e.push(d - 1);
                    for (const s of t) for (const t of e) c[s].related.add(t);
                }
                t({ type: "setSearchIndex", searchIndex: c, searchRef: i }), l.classes.sort((t, e) => t.name.localeCompare(e.name)), l.typedefs.sort((t, e) => t.name.localeCompare(e.name));
                for (const h of l.classes)
                    h.props && h.props.sort((t, e) => t.name.localeCompare(e.name)), h.methods && h.methods.sort((t, e) => t.name.localeCompare(e.name)), h.events && h.events.sort((t, e) => t.name.localeCompare(e.name));
                (l.links = {
                    String: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
                    Number: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
                    BigInt: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
                    Boolean: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
                    true: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
                    false: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
                    Symbol: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
                    Void: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
                    void: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
                    undefined: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
                    Undefined: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
                    Object: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
                    Function: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
                    function: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
                    Array: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
                    Set: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
                    Map: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
                    Date: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
                    RegExp: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp",
                    Promise: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
                    Error: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
                    EventEmitter: "https://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter",
                    Timeout: "https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout",
                    NodeJSTimeout: "https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout",
                    "NodeJS.Timeout": "https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout",
                    Immediate: "https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_immediate",
                    Buffer: "https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_class_buffer",
                    ReadableStream: "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_readable",
                    ChildProcess: "https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_class_childprocess",
                    Worker: "https://nodejs.org/api/worker_threads.html#worker_threads_class_worker",
                    MessagePort: "https://nodejs.org/api/worker_threads.html#worker_threads_class_messageport",
                }),
                    (l.externals = l.externals || []),
                    (l.classes = l.classes || []),
                    (l.typedefs = l.typedefs || []);
                for (const h of l.externals) l.links[h.name] = h.see[0].replace(/\{@link\s+(.+?)\s*\}/i, "$1");
                for (const h of l.classes) l.links[h.name] = { name: "docs-source-tag-class-class", params: { class: h.name } };
                for (const h of l.typedefs) l.links[h.name] = { name: "docs-source-tag-typedef-typedef", params: { typedef: h.name } };
                "commando" === e.id && (l.links.Message = { name: "docs-source-tag-class-class", params: { source: "main", tag: "master", class: "Message" } }),
                    (l.global = e.global),
                    (l.source = e.source),
                    (l.id = e.id),
                    (l.tag = s),
                    t({ type: "setDocs", docs: l });
            },
            fetchTags: async ({ commit: t }, { currentSource: e }) => {
                t({ type: "setBranches", branches: await e.fetchTags() });
            },
        },
    });
function at() {
    return r(nt);
}

const lt = p(" downloads "),
    it = p(" weekly downloads "),
    ct = p(" Designed with love by SexyDevil 💗"),
    dt = p(" contributors ");
var ut = a({
    expose: [],
    setup(t) {
        const e = at(),
            s = o(() => e.state.stats.downloads),
            n = o(() => e.state.stats.weeklyDownloads),
            r = o(() => e.state.stats.stars),
            a = o(() => e.state.stats.contributors);
        return (t, e) => (l(), i("ul", null, [c("li", null, [c("b", null, d(u(s)), 1), lt]), c("li", null, [c("b", null, d(u(a)), 1), dt]),c("br", null, [c("b", null, d(u(n)), 1), it]), c("li", null, [("b", null, d(u(r)), 1), ct])]));
    },
});
const pt = {},
    ht = { class: "bg-discord-blurple-560" },
    mt = { class: "max-w-3xl mx-auto text-center px-16 pt-10 pb-4 text-gray-200" },
    gt = p("Wabbit-js"),
    ft = c("p", { class: "mb-4" }, "Easy and framework for your Discord Bot.", -1);
pt.render = function (t, e) {
    const s = h("router-link"),
        o = ut;
    return l(), i("footer", ht, [c("div", mt, [c("strong", null, [c(s, { to: "/" }, { default: m(() => [gt]), _: 1 })]), ft, c(o, { class: "mb-4" })])]);
};
const bt = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    vt = c(
        "g",
        { fill: "none" },
        [
            c("path", {
                d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0z",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
            }),
        ],
        -1
    );
var wt = {
    name: "heroicons-outline-sun",
    render: function (t, e) {
        return l(), i("svg", bt, [vt]);
    },
};
const xt = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    yt = c(
        "g",
        { fill: "none" },
        [c("path", { d: "M20.354 15.354A9 9 0 0 1 8.646 3.646A9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })],
        -1
    );
var kt = {
    name: "heroicons-outline-moon",
    render: function (t, e) {
        return l(), i("svg", xt, [yt]);
    },
};
const St = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    _t = c("g", { fill: "none" }, [c("path", { d: "M21 21l-6-6m2-5a7 7 0 1 1-14 0a7 7 0 0 1 14 0z", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })], -1);
var jt = {
    name: "heroicons-outline-search",
    render: function (t, e) {
        return l(), i("svg", St, [_t]);
    },
};
const Ct = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    Rt = c("g", { fill: "none" }, [c("path", { d: "M14 5l7 7m0 0l-7 7m7-7H3", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })], -1);
var Mt = {
    name: "heroicons-outline-arrow-right",
    render: function (t, e) {
        return l(), i("svg", Ct, [Rt]);
    },
};
const Ot = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    Tt = c("g", { fill: "none" }, [c("path", { d: "M4 6h16M4 12h16M4 18h16", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })], -1);
var Et = {
    name: "heroicons-outline-menu",
    render: function (t, e) {
        return l(), i("svg", Ot, [Tt]);
    },
};
const zt = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    Lt = c("g", { fill: "none" }, [c("path", { d: "M6 18L18 6M6 6l12 12", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })], -1);
var Wt = {
    name: "heroicons-outline-x",
    render: function (t, e) {
        return l(), i("svg", zt, [Lt]);
    },
};
const $t = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    Pt = c(
        "g",
        { fill: "none" },
        [c("path", { d: "M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })],
        -1
    );
var At = {
    name: "heroicons-outline-external-link",
    render: function (t, e) {
        return l(), i("svg", $t, [Pt]);
    },
};
const Dt = g({ storageKey: "theme" }),
    Nt = f(Dt),
    Ut = { class: "sticky top-0 z-20" },
    It = { class: "bg-discord-blurple-560" },
    Gt = { class: "max-w-7xl mx-auto px-2 sm:px-4 md:flex md:justify-between lg:px-8" },
    Jt = { class: "hidden md:flex md:py-2 md:space-x-4 lg:space-x-8", "aria-label": "Global navigation" },
    Bt = p(" Wabbit-js "),
    Ft = p(" Dashboard "),
    Vt = { class: "relative h-16 flex md:max-w-md md:w-full lg:max-w-lg" },
    qt = { class: "relative z-10 flex items-center md:hidden" },
    Ht = { class: "relative z-0 flex-1 px-2 flex lg:gap-2 items-center justify-center md:justify-end" },
    Kt = c("label", { for: "search", class: "sr-only" }, "Search", -1),
    Yt = { class: "relative" },
    Zt = { class: "pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center", "aria-hidden": "true" },
    Qt = { class: "relative z-10 flex items-center md:hidden" },
    Xt = c("span", { class: "sr-only" }, "Open menu", -1),
    te = { key: 0, id: "mobile-menu", class: "md:hidden", "aria-label": "Global navigation" },
    ee = { class: "pt-2 pb-3 px-2 space-y-1" },
    se = p("Wafw-js"),
    oe = p("Dashboard"),
    ne = c("span", { class: "mr-2" }, "About Developer", -1);
var re = a({
    expose: [],
    setup(t) {
        const e = O(),
            n = C(),
            r = R(M).greater("md"),
            a = s(!1),
            g = s(),
            f = s(""),
            T = s(!1),
            E = s(-1),
            z = "kermit_xaro/Wabbit-js",
            L = o(() => ((E.value = -1), st(f.value).slice(0, 7))),
            W = () => {
                if (L.value.length) return (T.value = !1), E.value >= 0 ? (e.push(L.value[E.value].getLinkPath()), void (E.value = -1)) : e.push({ name: "docs-source-tag-search", query: { query: f.value } });
            },
            $ = (t) => {
                (E.value += 1), E.value > Math.min(6, L.value.length - 1) && (E.value = 0), t.preventDefault();
            },
            P = (t) => {
                (E.value -= 1), E.value < 0 && (E.value = Math.min(6, L.value.length - 1)), t.preventDefault();
            },
            A = (t) => {
                if (!t.target) return;
                const e = t.target.getAttribute("data-index");
                e && (E.value = parseInt(e, 10));
            };
        return (
            b(r, () => (a.value = !1)),
            v(g, () => {
                (T.value = !1), (E.value = -1);
            }),
            (t, e) => {
                const s = h("router-link"),
                    o = wt,
                    r = kt,
                    b = jt,
                    v = Mt,
                    C = Et,
                    R = Wt,
                    M = At;
                return (
                    l(),
                    i("div", Ut, [
                        c("header", It, [
                            c("div", Gt, [
                                c("nav", Jt, [
                                    c(
                                        s,
                                        {
                                            to: "/",
                                            class:
                                                "\n\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t",
                                            "active-class": "bg-discord-blurple-600",
                                        },
                                        { default: m(() => [Bt]), _: 1 }
                                    ),
                                    c(
                                        "a",
                                        {
                                            href: "/dashboard.html",
                                            class:
                                                "\n\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t",
                                            target: "",
                                            rel: "noopener",
                                        },
                                        " Dashboard ",
                                        8,
                                        ["href"]
                                    ),
                                    c(
                                        "a",
                                        {
                                            href: `/aboutdev.html`,
                                            class:
                                                "\n\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t",
                                            target: "",
                                            rel: "noopener",
                                        },
                                        " About Developer ",
                                        8,
                                        ["href"]
                                    ),
                                    c(
                                        "a",
                                        {
                                            href: "https://discord.gg/4pWKq8vUnb",
                                            class:
                                                "\n\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t",
                                            target: "_blank",
                                            rel: "noopener",
                                        },
                                        " Support Server ",
                                        8,
                                        ["href"]
                                    ),
                                ]),
                                c("div", Vt, [
                                    c("div", qt, [
                                        c(
                                            "button",
                                            {
                                                class:
                                                    "\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tp-2\n\t\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\t\tjustify-center\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630\n\t\t\t\t\t\t\t\tfocus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:bg-discord-blurple-630\n\t\t\t\t\t\t\t",
                                                "aria-label": "Switch to " + (u(Dt) ? "light theme" : "dark theme"),
                                                onClick: e[1] || (e[1] = (t) => u(Nt)()),
                                            },
                                            [
                                                u(Dt)
                                                    ? (l(), i(r, { key: 1, class: "fill-current text-gray-200 hover:text-white h-6 w-6", "aria-hidden": "true" }))
                                                    : (l(), i(o, { key: 0, class: "fill-current text-gray-200 hover:text-white h-6 w-6", "aria-hidden": "true" })),
                                            ],
                                            8,
                                            ["aria-label"]
                                        ),
                                    ]),
                                    c("div", Ht, [
                                        c(
                                            "button",
                                            {
                                                class:
                                                    "\n\t\t\t\t\t\t\t\thidden\n\t\t\t\t\t\t\t\tmd:block\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tp-2\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630\n\t\t\t\t\t\t\t\tfocus:outline-none focus:ring-1 focus:ring-inset focus:ring-white\n\t\t\t\t\t\t\t",
                                                "aria-label": "Switch to " + (u(Dt) ? "light theme" : "dark theme"),
                                                onClick: e[2] || (e[2] = (t) => u(Nt)()),
                                            },
                                            [
                                                u(Dt)
                                                    ? (l(), i(r, { key: 1, class: "fill-current text-gray-200 hover:text-white h-6 w-6", "aria-hidden": "true" }))
                                                    : (l(), i(o, { key: 0, class: "fill-current text-gray-200 hover:text-white h-6 w-6", "aria-hidden": "true" })),
                                            ],
                                            8,
                                            ["aria-label"]
                                        ),
                                        "/" !== u(n).path
                                            ? (l(),
                                              i(
                                                  "div",
                                                  { key: 0, ref: g, class: "w-full sm:max-w-lg lg:max-w-xs" },
                                                  [
                                                      Kt,
                                                      c("div", Yt, [
                                                          c("div", Zt, [c(b, { class: "h-5 w-5 text-gray-200" })]),
                                                          w(
                                                              c(
                                                                  "input",
                                                                  {
                                                                      id: "search",
                                                                      "onUpdate:modelValue": e[3] || (e[3] = (t) => (f.value = t)),
                                                                      name: "search",
                                                                      class:
                                                                          "\n\t\t\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\t\t\tw-full\n\t\t\t\t\t\t\t\t\t\tbg-discord-blurple-600\n\t\t\t\t\t\t\t\t\t\tborder border-transparent\n\t\t\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\t\t\tpl-10\n\t\t\t\t\t\t\t\t\t\tpr-3\n\t\t\t\t\t\t\t\t\t\ttext-base text-white\n\t\t\t\t\t\t\t\t\t\tplaceholder-gray-200\n\t\t\t\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\t\t\t\tfocus:bg-discord-blurple-630\n\t\t\t\t\t\t\t\t\t\tfocus:text-gray-200\n\t\t\t\t\t\t\t\t\t\tfocus:placeholder-gray-200\n\t\t\t\t\t\t\t\t\t\tfocus:ring-2\n\t\t\t\t\t\t\t\t\t\tfocus:ring-inset\n\t\t\t\t\t\t\t\t\t\tfocus:ring-white\n\t\t\t\t\t\t\t\t\t\tlg:focus:ring-1\n\t\t\t\t\t\t\t\t\t",
                                                                      placeholder: "Search",
                                                                      type: "search",
                                                                      autocomplete: "off",
                                                                      autocapitalize: "off",
                                                                      autocorrect: "off",
                                                                      onFocus: e[4] || (e[4] = (t) => (T.value = !0)),
                                                                      onInput: e[5] || (e[5] = (t) => (T.value = !0)),
                                                                      onKeyup: y(W, ["enter"]),
                                                                      onKeydown: [y(P, ["up"]), y($, ["down"])],
                                                                  },
                                                                  null,
                                                                  40,
                                                                  ["onKeyup", "onKeydown"]
                                                              ),
                                                              [[x, f.value]]
                                                          ),
                                                          T.value && f.value && u(L).length
                                                              ? (l(),
                                                                i("div", { key: 0, class: "absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center", "aria-hidden": "true", onClick: W }, [c(v, { class: "h-5 w-5 text-gray-200" })]))
                                                              : k("", !0),
                                                          T.value && f.value && u(L).length
                                                              ? (l(),
                                                                i(
                                                                    "div",
                                                                    { key: 1, class: "absolute mt-1 w-full break-words-legacy border bg-discord-blurple-600 rounded-md", onMouseover: A },
                                                                    [
                                                                        c("ul", null, [
                                                                            (l(!0),
                                                                            i(
                                                                                S,
                                                                                null,
                                                                                _(
                                                                                    u(L),
                                                                                    (t, o) => (
                                                                                        l(),
                                                                                        i(
                                                                                            "li",
                                                                                            {
                                                                                                key: t.computedName,
                                                                                                class: [
                                                                                                    "\n\t\t\t\t\t\t\t\t\t\t\t\teven:bg-discord-blurple-560\n\t\t\t\t\t\t\t\t\t\t\t\tdark:even:bg-discord-blurple-630\n\t\t\t\t\t\t\t\t\t\t\t\thover:bg-discord-blurple-630\n\t\t\t\t\t\t\t\t\t\t\t\tdark:hover:bg-discord-blurple-660\n\t\t\t\t\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\t\t\t\t",
                                                                                                    {
                                                                                                        "ring-1 ring-gray-200 even:bg-discord-blurple-630 dark:even:bg-discord-blurple-660 bg-discord-blurple-630 dark:bg-discord-blurple-660":
                                                                                                            o === E.value,
                                                                                                    },
                                                                                                ],
                                                                                            },
                                                                                            [
                                                                                                c(
                                                                                                    s,
                                                                                                    {
                                                                                                        class:
                                                                                                            "\n\t\t\t\t\t\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\t\t\t\t\t\t\tpy-3\n\t\t\t\t\t\t\t\t\t\t\t\t\tpx-4\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus-visible:ring-1\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus-visible:ring-gray-200\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus-visible:rounded-md\n\t\t\t\t\t\t\t\t\t\t\t\t\tfocus-visible:bg-discord-blurple-630\n\t\t\t\t\t\t\t\t\t\t\t\t\tdark:focus-visible:bg-discord-blurple-660\n\t\t\t\t\t\t\t\t\t\t\t\t",
                                                                                                        exact: "",
                                                                                                        to: t.getLinkPath(),
                                                                                                        "data-index": o,
                                                                                                        onClick: e[6] || (e[6] = (t) => (T.value = !1)),
                                                                                                    },
                                                                                                    { default: m(() => [p(d(t.computedName), 1)]), _: 2 },
                                                                                                    1032,
                                                                                                    ["to", "data-index"]
                                                                                                ),
                                                                                            ],
                                                                                            2
                                                                                        )
                                                                                    )
                                                                                ),
                                                                                128
                                                                            )),
                                                                        ]),
                                                                    ],
                                                                    32
                                                                ))
                                                              : k("", !0),
                                                      ]),
                                                  ],
                                                  512
                                              ))
                                            : k("", !0),
                                    ]),
                                    c("div", Qt, [
                                        c(
                                            "button",
                                            {
                                                type: "button",
                                                class:
                                                    "\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tp-2\n\t\t\t\t\t\t\t\tinline-flex\n\t\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\t\tjustify-center\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\t\tfocus:outline-none focus:ring-2 focus:ring-inset focus:ring-white\n\t\t\t\t\t\t\t",
                                                "aria-controls": "mobile-menu",
                                                "aria-expanded": a.value,
                                                onClick: e[7] || (e[7] = (t) => (a.value = !a.value)),
                                            },
                                            [
                                                Xt,
                                                c(C, { class: { hidden: a.value, block: !a.value }, "aria-hidden": "true" }, null, 8, ["class"]),
                                                c(R, { class: { block: a.value, hidden: !a.value }, "aria-hidden": "true" }, null, 8, ["class"]),
                                            ],
                                            8,
                                            ["aria-expanded"]
                                        ),
                                    ]),
                                ]),
                            ]),
                            c(
                                j,
                                { "enter-active-class": "transition transform-gpu duration-300 ease-out", "enter-from-class": "translate-x-12 opacity-0", "enter-to-class": "translate-x-0 opacity-100" },
                                {
                                    default: m(() => [
                                        a.value
                                            ? (l(),
                                              i("nav", te, [
                                                  c("div", ee, [
                                                      c(
                                                          s,
                                                          {
                                                              to: "/",
                                                              class:
                                                                  "\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\t\ttext-base\n\t\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\t",
                                                              onClick: e[8] || (e[8] = (t) => (a.value = !a.value)),
                                                          },
                                                          { default: m(() => [se]), _: 1 }
                                                      ),
                                                      c(
                                                          "a",
                                                          {
                                                              href: "/dashboard.html",
                                                              class:
                                                                  "\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\t\ttext-base\n\t\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\t",
                                                              onClick: e[9] || (e[9] = (t) => (a.value = !a.value)),
                                                          },
                                                          { default: m(() => [oe]), _: 1 }
                                                      ),
                                                      c(
                                                          "a",
                                                          {
                                                              href: `./aboutdev.html`,
                                                              class:
                                                                  "\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-630 hover:text-white\n\t\t\t\t\t\t\t\tblock\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\tpx-3\n\t\t\t\t\t\t\t\ttext-base\n\t\t\t\t\t\t\t\tfont-semibold\n\t\t\t\t\t\t\t",
                                                              target: "_blank",
                                                              rel: "noopener",
                                                              onClick: e[10] || (e[10] = (t) => (a.value = !a.value)),
                                                          },
                                                          [ne, c(M, { class: "h-5 w-5 inline-block" })],
                                                          8,
                                                          ["href"]
                                                      ),
                                                  ]),
                                              ]))
                                            : k("", !0),
                                    ]),
                                    _: 1,
                                }
                            ),
                        ]),
                    ])
                );
            }
        );
    },
});
const ae = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    le = c("g", { fill: "none" }, [c("path", { d: "M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })], -1);
var ie = {
    name: "heroicons-outline-download",
    render: function (t, e) {
        return l(), i("svg", ae, [le]);
    },
};
function ce(t = {}) {
    const { immediate: e = !0, onNeedRefresh: o, onOfflineReady: n } = t,
        r = s(!1),
        a = s(!1);
    return {
        updateServiceWorker: (function (t = {}) {
            const { immediate: e = !1, onNeedRefresh: s, onOfflineReady: o } = t;
            let n;
            return (
                "serviceWorker" in navigator &&
                    ((n = new T("/sw.js", { scope: "/" })),
                    n.addEventListener("activated", (t) => {
                        t.isUpdate ? window.location.reload() : null == o || o();
                    }),
                    n.register({ immediate: e }).then((t) => t)),
                async (t = !0) => {}
            );
        })({
            immediate: e,
            onNeedRefresh() {
                (r.value = !0), null == o || o();
            },
            onOfflineReady() {
                (a.value = !0), null == n || n();
            },
        }),
        offlineReady: a,
        needRefresh: r,
    };
}
const de = { key: 0, class: "fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-20" },
    ue = { class: "max-w-7xl mx-auto px-2 sm:px-6 lg:px-8" },
    pe = { class: "p-2 rounded-lg bg-discord-blurple-600 dark:bg-discord-blurple-700 shadow-lg sm:p-3" },
    he = { class: "flex items-center justify-between flex-wrap" },
    me = { class: "w-0 flex-1 flex items-center" },
    ge = { class: "flex p-2 rounded-lg bg-discord-blurple-530 dark:bg-discord-blurple-630" },
    fe = { class: "ml-3 font-medium text-white truncate" },
    be = { class: "sm:hidden" },
    ve = { class: "hidden sm:inline" },
    we = { key: 0, class: "order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto" },
    xe = { class: "order-2 flex-shrink-0 sm:order-3 sm:ml-2" },
    ye = c("span", { class: "sr-only" }, "Dismiss", -1);
var ke = a({
    expose: [],
    setup(t) {
        const { offlineReady: e, needRefresh: s, updateServiceWorker: o } = ce(),
            n = () => {
                (e.value = !1), (s.value = !1);
            };
        return (t, r) => {
            const a = ie,
                p = Wt;
            return u(e) || u(s)
                ? (l(),
                  i("div", de, [
                      c("div", ue, [
                          c("div", pe, [
                              c("div", he, [
                                  c("div", me, [
                                      c("span", ge, [c(a, { class: "fill-current text-gray-200 h-6 w-6", "aria-hidden": "true" })]),
                                      c("p", fe, [
                                          c("span", be, d(u(e) ? "App ready to work offline." : "New content available."), 1),
                                          c("span", ve, d(u(e) ? "App ready to work offline." : "New content available, click refresh to update."), 1),
                                      ]),
                                  ]),
                                  u(s)
                                      ? (l(),
                                        i("div", we, [
                                            c(
                                                "button",
                                                {
                                                    class:
                                                        "\n\t\t\t\t\t\t\t\tflex\n\t\t\t\t\t\t\t\titems-center\n\t\t\t\t\t\t\t\tjustify-center\n\t\t\t\t\t\t\t\tpx-4\n\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\tborder border-transparent\n\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\ttext-sm\n\t\t\t\t\t\t\t\tfont-medium\n\t\t\t\t\t\t\t\ttext-gray-200\n\t\t\t\t\t\t\t\tbg-discord-blurple-530\n\t\t\t\t\t\t\t\tdark:bg-discord-blurple-630\n\t\t\t\t\t\t\t\thover:bg-discord-blurple-460\n\t\t\t\t\t\t\t\tdark:hover:bg-discord-blurple-600\n\t\t\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-white\n\t\t\t\t\t\t\t",
                                                    onClick: r[1] || (r[1] = (t) => u(o)(!0)),
                                                },
                                                " Refresh "
                                            ),
                                        ]))
                                      : k("", !0),
                                  c("div", xe, [
                                      c("button", { type: "button", class: "-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white", onClick: n }, [
                                          ye,
                                          c(p, { class: "fill-current text-gray-200 h-6 w-6", "aria-hidden": "true" }),
                                      ]),
                                  ]),
                              ]),
                          ]),
                      ]),
                  ]))
                : k("", !0);
        };
    },
});
const Se = { class: "min-h-full grid grid-layout" },
    _e = { id: "container", class: "grid grid-layout-container lg:custom-scroll" },
    je = { class: "bg-white dark:bg-[#1d1d1d]" };
var Ce = a({
    expose: [],
    setup: (t) => (
        at().dispatch("fetchStats"),
        (t, e) => {
            const s = h("router-view"),
                o = pt;
            return l(), i(S, null, [c("div", Se, [c(re), c("div", _e, [c("div", je, [c(s)]), c(o)])]), c(ke)], 64);
        }
    ),
});
let Re;
const Me = {},
    Oe = function (t, e) {
        if (!e) return t();
        if (void 0 === Re) {
            const t = document.createElement("link").relList;
            Re = t && t.supports && t.supports("modulepreload") ? "modulepreload" : "preload";
        }
        return Promise.all(
            e.map((t) => {
                if (t in Me) return;
                Me[t] = !0;
                const e = t.endsWith(".css"),
                    s = e ? '[rel="stylesheet"]' : "";
                if (document.querySelector(`link[href="${t}"]${s}`)) return;
                const o = document.createElement("link");
                return (
                    (o.rel = e ? "stylesheet" : Re),
                    e || ((o.as = "script"), (o.crossOrigin = "")),
                    (o.href = t),
                    document.head.appendChild(o),
                    e
                        ? new Promise((t, e) => {
                              o.addEventListener("load", t), o.addEventListener("error", e);
                          })
                        : void 0
                );
            })
        ).then(() => t());
    },
    Te = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    Ee = c(
        "g",
        { fill: "none" },
        [
            c("path", {
                d: "M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3m2 4H10m0 0l3-3m-3 3l3 3",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
            }),
        ],
        -1
    );
var ze = {
    name: "heroicons-outline-clipboard-copy",
    render: function (t, e) {
        return l(), i("svg", Te, [Ee]);
    },
};
const Le = { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", width: "1.2em", height: "1.2em", preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 24 24" },
    We = c(
        "g",
        { fill: "none" },
        [
            c("path", {
                d: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2l4-4",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
            }),
        ],
        -1
    );
var $e = {
    name: "heroicons-outline-clipboard-check",
    render: function (t, e) {
        return l(), i("svg", Le, [We]);
    },
};
const Pe = { class: "text-gray-200 bg-discord-blurple-560 p-4 md:text-lg mx-auto rounded-md shadow flex items-center" },
    Ae = c("span", { class: "hover:text-white mr-2" }, "npm install Wabbit-js", -1);
var De = a({
    expose: [],
    setup(t) {
        const e = s(),
            o = s(!1),
            n = E((t) => {
                t(), (o.value = !1);
            }, 1e3),
            { show: r, hide: a } = z(e, { theme: "discord", content: "Copied", trigger: "manual", hideOnClick: !1 }),
            d = async () => {
                try {
                    await navigator.clipboard.writeText("npm install Wabbit-js"), r();
                } catch {}
                (o.value = !0), n(a);
            };
        return (t, s) => {
            const n = ze,
                r = $e;
            return (
                l(),
                i("code", Pe, [
                    Ae,
                    c(
                        "button",
                        { ref: e, class: "focus:outline-none", "aria-label": "Copy install command" },
                        [
                            o.value
                                ? (l(), i(r, { key: 1, class: "inline-block fill-current text-discord-green-500 cursor-pointer mb-1", "aria-hidden": "true", onClick: d }))
                                : (l(), i(n, { key: 0, class: "inline-block fill-current text-gray-200 cursor-pointer hover:text-white mb-1", "aria-hidden": "true", onClick: d })),
                        ],
                        512
                    ),
                ])
            );
        };
    },
});
const Ne = { class: "grid" },
    Ue = { class: "overflow-x-auto lg:custom-scroll" },
    Ie = { class: "relative" },
    Ge = { class: "my-0 javascript" };
var Je = a({
    expose: [],
    props: { code: { type: String, required: !0 } },
    setup(t) {
        const e = t,
            o = s(),
            n = s(!1),
            r = E((t) => {
                t(), (n.value = !1);
            }, 1e3),
            { show: a, hide: d } = z(o, { theme: "discord", content: "Copied", trigger: "manual", hideOnClick: !1 }),
            p = async () => {
                try {
                    await navigator.clipboard.writeText(e.code), a();
                } catch {}
                (n.value = !0), r(d);
            };
        return (e, s) => {
            const r = ze,
                a = $e;
            return (
                l(),
                i("div", Ne, [
                    c("div", Ue, [
                        c("div", Ie, [
                            c("pre", Ge, [c("code", { innerHTML: u(L).highlight(t.code, { language: "javascript" }).value }, null, 8, ["innerHTML"])]),
                            c(
                                "button",
                                {
                                    ref: o,
                                    class:
                                        "\n\t\t\t\t\t\tabsolute\n\t\t\t\t\t\tright-0\n\t\t\t\t\t\ttop-0\n\t\t\t\t\t\tmt-4\n\t\t\t\t\t\tmr-4\n\t\t\t\t\t\tinline-block\n\t\t\t\t\t\thover:text-white\n\t\t\t\t\t\tfocus:outline-none\n\t\t\t\t\t\tfocus-visible:ring-1 focus-visible:ring-gray-200\n\t\t\t\t\t",
                                    "aria-label": "Copy code",
                                },
                                [
                                    n.value
                                        ? (l(), i(a, { key: 1, class: "fill-current text-discord-green-600 dark:text-discord-green-500", "aria-hidden": "true", onClick: p }))
                                        : (l(), i(r, { key: 0, class: "fill-current text-gray-700 dark:text-gray-200", "aria-hidden": "true", onClick: p })),
                                ],
                                512
                            ),
                        ]),
                    ]),
                ])
            );
        };
    },
});
const Be = p(" downloads "),
    Fe = p(" weekly downloads "),
    Ve = p(" stars "),
    qe = p(" contributors "),
    He = c("li", null, [p("Developer: "), c("b", null, "kermit_xaro")], -1),
    Ke = c("li", null, [p("Support Server: "), c("a", { href: "https://discord.gg/umKEVEWNpN" }, "https://discord.gg/umKEVEWNpN")], -1);
var Ye = a({
    expose: [],
    setup(t) {
        const e = at(),
            s = o(() => e.state.stats.downloads),
            n = o(() => e.state.stats.weeklyDownloads),
            r = o(() => e.state.stats.stars),
            a = o(() => e.state.stats.contributors);
        return (t, e) => (
            l(), i("ul", null, [c("li", null, [c("b", null, d(u(s)), 1), Be]), c("li", null, [c("b", null, d(u(n)), 1), Fe]), c("li", null, [c("b", null, d(u(r)), 1), Ve]), c("li", null, [c("b", null, d(u(a)), 1), qe]), He, Ke])
        );
    },
});
const Ze = { class: "bg-discord-blurple-500 py-20" },
    Qe = { class: "max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex flex-col gap-10 md:px-12" },
    Xe = c("img", { src: "./favicon.png" }, null, -1),
    ts = { class: "\n\t\t\tprose prose-discord\n\t\t\tdark:prose-light\n\t\t\tlg:prose-lg\n\t\t\tpx-6\n\t\t\tmx-auto\n\t\t\tpb-8\n\t\t\tw-full\n\t\t\txl:grid xl:grid-cols-2 xl:gap-x-12 xl:max-w-7xl\n\t\t" },
    es = c("h2", null, "About", -1),
    ss = c("h3", null, "Wabbit.js Creat your bot easily", -1),
    os = p(" Wabbit-js is a powerful "),
    ns = { href: "https://nodejs.org", target: "_blank", rel: "noopener" },
    rs = p("Node.js "),
    as = p(
        " module that allows you to make an Discord Bot easier in your Project . It takes a much more object-oriented approach than most other libraries, making your bot's code much cleaner and easier to understand. It's also beginner friendly, "
    ),
    ls = c("p", null, " Usability, consistency, and performance are key focuses of Wabbit-js. If you found a bug or want to give me an idea, feel free to create an issue or pull request on module's GitHub page! ", -1),
    is = c("h2", null, "Example", -1),
    cs = $(
        "<div><h2>Why?</h2><ul><li>You can write v13 discord.js classes in v12</li><li>With Web Support</li><li>With actually (mod - welcomer and ...) commands</li><li>Easy to use</li><li>Beginner friendly</li><li>Dashboard</li></ul></div>",
        1
    ),
    ds = c("h2", null, "Stats and Info", -1);
const us = [
    { name: "all", path: "/:all(.*)", component: () => Oe(() => import("./[...all].1210b549.js"), ["/assets/[...all].1210b549.js", "/assets/vendor.1e3f7553.js"]), props: !0 },
    {
        name: "index",
        path: "/",
        component: a({
            expose: [],
            setup(t) {
                const e = at(),
                    n = s(W`
                    const wabbit = require("wabbit-js")  // defined wabbit
                    const client = wabbit.client // defined client
                    wabbit.voiceConnect('channelid') // connect to voice channel when you run script
                    wabbit.autorole('roleid') // gives member role when joined into your server
                    wabbit.status('status') // choose your bot activity
                    wabbit.welcomer('channel','text') // make custom welcomer for server
                    
                    wabbit.login('token')`);
                return (
                    o(() => e.state.docs).value || (e.dispatch("fetchDocs", { inputSource: J }), e.dispatch("fetchTags", { currentSource: J })),
                    (t, e) => {
                        const s = De,
                            o = At,
                            r = Je,
                            a = Ye;
                        return (
                            l(),
                            i(
                                S,
                                null,
                                [
                                    c("div", Ze, [c("div", Qe, [Xe, c(s)])]),
                                    c("div", ts, [
                                        c("div", null, [es, ss, c("p", null, [os, c("a", ns, [rs, c(o, { class: "h-5 w-5 inline-block mb-1", "aria-hidden": "true" })]), as]), ls]),
                                        c("div", null, [is, c(r, { code: n.value }, null, 8, ["code"])]),
                                        cs,
                                        c("div", null, [ds, c(a)]),
                                    ]),
                                ],
                                64
                            )
                        );
                    }
                );
            },
        }),
        props: !0,
    },
    {
        path: "/docs",
        component: () =>
            Oe(() => import("./docs.0fefe98c.js"), [
                "/assets/docs.0fefe98c.js",
                "/assets/docs.5a672fae.css",
                "/assets/vendor.1e3f7553.js",
                "/assets/chevron-down.d1640a5c.js",
                "/assets/headlessui.esm.c7f83aa7.js",
                "/assets/Spinner.4ff578c2.js",
                "/assets/Spinner.af24072b.css",
            ]),
        children: [
            {
                name: "docs-source",
                path: ":source",
                component: () => Oe(() => import("/assets/js/index.c1438fb5.js"), ["/assets/js/index.c1438fb5.js", "/assets/js/Spinner.4ff578c2.js", "/assets/js/Spinner.af24072b.css", "/assets/js/vendor.1e3f7553.js"]),
                props: !0,
            },
            { name: "docs-source-tag-search", path: ":source/:tag/search", component: () => Oe(() => import("/assets/js/search.b0b97873.js"), ["/assets/js/search.b0b97873.js", "/assets/js/search.055dc457.css", "/assets/js/vendor.1e3f7553.js"]), props: !0 },
            {
                name: "docs-source-tag-class-class",
                path: ":source/:tag/class/:class",
                component: () =>
                    Oe(() => import("./[class].88ee1ede.js"), [
                        "/assets/[class].88ee1ede.js",
                        "/assets/[class].32241939.css",
                        "/assets/vendor.1e3f7553.js",
                        "/assets/SourceButton.vue_vue&type=script&setup=true&lang.834a1b58.js",
                        "/assets/See.vue_vue&type=script&setup=true&lang.b0fb5fea.js",
                        "/assets/See.vue_vue&type=script&setup=true&lang.9c59f874.css",
                        "/assets/chevron-down.d1640a5c.js",
                        "/assets/headlessui.esm.c7f83aa7.js",
                    ]),
                props: !0,
            },
            {
                name: "docs-source-tag-typedef-typedef",
                path: ":source/:tag/typedef/:typedef",
                component: () =>
                    Oe(() => import("./[typedef].631665fd.js"), [
                        "/assets/[typedef].631665fd.js",
                        "/assets/vendor.1e3f7553.js",
                        "/assets/SourceButton.vue_vue&type=script&setup=true&lang.834a1b58.js",
                        "/assets/See.vue_vue&type=script&setup=true&lang.b0fb5fea.js",
                        "/assets/See.vue_vue&type=script&setup=true&lang.9c59f874.css",
                        "/assets/headlessui.esm.c7f83aa7.js",
                    ]),
                props: !0,
            },
            {
                name: "docs-source-tag-category-file",
                path: ":source/:tag/:category/:file",
                component: () => Oe(() => import("./[file].652ed464.js"), ["/assets/[file].652ed464.js", "/assets/vendor.1e3f7553.js", "/assets/SourceButton.vue_vue&type=script&setup=true&lang.834a1b58.js"]),
                props: !0,
            },
        ],
        props: !0,
    },
];
var ps = P({ history: A(), routes: us });
const hs = D(Ce);
hs.use(rt, nt), hs.use(ps), hs.use(N), hs.mount("#app");
export { F as C, Z as D, J as M, H as R, Je as _, q as a, At as b, ot as f, K as i, st as s, at as u };
