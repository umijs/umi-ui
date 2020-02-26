/**
 * Carrot Search FoamTree HTML5 (demo variant)
 * v3.4.5, 4fa198d722d767b68d0409e88290ea6de98d1eaa/4fa198d7, build FOAMTREE-SOFTWARE4-DIST-39, Jul 26, 2017
 *
 * Carrot Search confidential.
 * Copyright 2002-2017, Carrot Search s.c, All Rights Reserved.
 */
(function() {
  var v = (function() {
    const a = window.navigator.userAgent;
    let l;
    try {
      window.localStorage.setItem('ftap5caavc', 'ftap5caavc'),
        window.localStorage.removeItem('ftap5caavc'),
        (l = !0);
    } catch (k) {
      l = !1;
    }
    return {
      of() {
        return /webkit/i.test(a);
      },
      mf() {
        return /Mac/.test(a);
      },
      lf() {
        return /iPad|iPod|iPhone/.test(a);
      },
      hf() {
        return /Android/.test(a);
      },
      ii() {
        return (
          'ontouchstart' in window ||
          (!!window.DocumentTouch && document instanceof window.DocumentTouch)
        );
      },
      hi() {
        return l;
      },
      gi() {
        const a = document.createElement('canvas');
        return !(!a.getContext || !a.getContext('2d'));
      },
      Dd(a, d) {
        return [].forEach && v.gi() ? a && a() : d && d();
      },
    };
  })();
  const aa = (function() {
    function a() {
      return (
        (window.performance &&
          (window.performance.now ||
            window.performance.mozNow ||
            window.performance.msNow ||
            window.performance.oNow ||
            window.performance.webkitNow)) ||
        Date.now
      );
    }
    const l = a();
    return {
      create() {
        return {
          now: (function() {
            const k = a();
            return function() {
              return k.call(window.performance);
            };
          })(),
        };
      },
      now() {
        return l.call(window.performance);
      },
    };
  })();
  function da() {
    function a() {
      if (!c) throw 'AF0';
      let a = aa.now();
      g !== 0 && (k.Kd = a - g);
      g = a;
      d = d.filter(function(a) {
        return a !== null;
      });
      k.frames++;
      for (let e = 0; e < d.length; e++) {
        const b = d[e];
        b !== null &&
          (!0 === b.ye.call(b.Yg)
            ? (d[e] = null)
            : D.Sc(b.repeat) && ((b.repeat -= 1), b.repeat <= 0 && (d[e] = null)));
      }
      d = d.filter(function(a) {
        return a !== null;
      });
      c = !1;
      l();
      a = aa.now() - a;
      a !== 0 && (k.Jd = a);
      k.totalTime += a;
      k.Oe = (1e3 * k.frames) / k.totalTime;
      g = d.length === 0 ? 0 : aa.now();
    }
    function l() {
      d.length > 0 && !c && ((c = !0), f(a));
    }
    var k = (this.rg = { frames: 0, totalTime: 0, Jd: 0, Kd: 0, Oe: 0 });
    fa = k;
    var f = (function() {
      return v.lf()
        ? function(a) {
            window.setTimeout(a, 0);
          }
        : window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            (function() {
              const a = aa.create();
              return function(e) {
                let b = 0;
                window.setTimeout(
                  function() {
                    const d = a.now();
                    e();
                    b = a.now() - d;
                  },
                  b < 16 ? 16 - b : 0,
                );
              };
            })();
    })();
    var d = [];
    var c = !1;
    var g = 0;
    this.repeat = function(a, e, b) {
      this.cancel(a);
      d.push({ ye: a, Yg: b, repeat: e });
      l();
    };
    this.d = function(a, e) {
      this.repeat(a, 1, e);
    };
    this.cancel = function(a) {
      for (let e = 0; e < d.length; e++) {
        const b = d[e];
        b !== null && b.ye === a && (d[e] = null);
      }
    };
    this.k = function() {
      d = [];
    };
  }
  let fa;
  var ga = v.Dd(function() {
    function a() {
      this.buffer = [];
      this.oa = 0;
      this.Gc = D.extend({}, g);
    }
    function l(a) {
      return function() {
        let e;
        const b = this.buffer;
        let d = this.oa;
        b[d++] = 'call';
        b[d++] = a;
        b[d++] = arguments.length;
        for (e = 0; e < arguments.length; e++) b[d++] = arguments[e];
        this.oa = d;
      };
    }
    function k(a) {
      return function() {
        return d[a].apply(d, arguments);
      };
    }
    var f = document.createElement('canvas');
    f.width = 1;
    f.height = 1;
    var d = f.getContext('2d');
    var f = ['font'];
    const c = 'fillStyle globalAlpha globalCompositeOperation lineCap lineDashOffset lineJoin lineWidth miterLimit shadowBlur shadowColor shadowOffsetX shadowOffsetY strokeStyle textAlign textBaseline'.split(
      ' ',
    );
    var g = {};
    c.concat(f).forEach(function(a) {
      g[a] = d[a];
    });
    a.prototype.clear = function() {
      this.oa = 0;
    };
    a.prototype.Na = function() {
      return this.oa === 0;
    };
    a.prototype.Ta = function(a) {
      function e(a, b, e) {
        for (var d = 0, c = a.oa, f = a.buffer; d < e; ) f[c++] = b[d++];
        a.oa = c;
      }
      function b(a, b, e, d) {
        for (let c = 0; c < e; )
          switch (b[c++]) {
            case 'set':
              a[b[c++]] = b[c++];
              break;
            case 'setGlobalAlpha':
              a[b[c++]] = b[c++] * d;
              break;
            case 'call':
              var f = b[c++];
              switch (b[c++]) {
                case 0:
                  a[f]();
                  break;
                case 1:
                  a[f](b[c++]);
                  break;
                case 2:
                  a[f](b[c++], b[c++]);
                  break;
                case 3:
                  a[f](b[c++], b[c++], b[c++]);
                  break;
                case 4:
                  a[f](b[c++], b[c++], b[c++], b[c++]);
                  break;
                case 5:
                  a[f](b[c++], b[c++], b[c++], b[c++], b[c++]);
                  break;
                case 6:
                  a[f](b[c++], b[c++], b[c++], b[c++], b[c++], b[c++]);
                  break;
                case 7:
                  a[f](b[c++], b[c++], b[c++], b[c++], b[c++], b[c++], b[c++]);
                  break;
                case 8:
                  a[f](b[c++], b[c++], b[c++], b[c++], b[c++], b[c++], b[c++], b[c++]);
                  break;
                case 9:
                  a[f](b[c++], b[c++], b[c++], b[c++], b[c++], b[c++], b[c++], b[c++], b[c++]);
                  break;
                default:
                  throw 'CB0';
              }
          }
      }
      a instanceof ga
        ? e(a, this.buffer, this.oa)
        : b(a, this.buffer, this.oa, D.B(a.globalAlpha, 1));
    };
    a.prototype.replay = a.prototype.Ta;
    a.prototype.d = function() {
      return new a();
    };
    a.prototype.scratch = a.prototype.d;
    'arc arcTo beginPath bezierCurveTo clearRect clip closePath drawImage fill fillRect fillText lineTo moveTo putImageData quadraticCurveTo rect rotate scale setLineDash setTransform stroke strokeRect strokeText transform translate'
      .split(' ')
      .forEach(function(c) {
        a.prototype[c] = l(c);
      });
    [
      'measureText',
      'createLinearGradient',
      'createRadialGradient',
      'createPattern',
      'getLineDash',
    ].forEach(function(c) {
      a.prototype[c] = k(c);
    });
    ['save', 'restore'].forEach(function(c) {
      a.prototype[c] = (function(a, b) {
        return function() {
          a.apply(this, arguments);
          b.apply(this, arguments);
        };
      })(l(c), k(c));
    });
    f.forEach(function(c) {
      Object.defineProperty(a.prototype, c, {
        set(a) {
          d[c] = a;
          this.Gc[c] = a;
          const b = this.buffer;
          b[this.oa++] = 'set';
          b[this.oa++] = c;
          b[this.oa++] = a;
        },
        get() {
          return this.Gc[c];
        },
      });
    });
    c.forEach(function(c) {
      Object.defineProperty(a.prototype, c, {
        set(a) {
          this.Gc[c] = a;
          const b = this.buffer;
          b[this.oa++] = c === 'globalAlpha' ? 'setGlobalAlpha' : 'set';
          b[this.oa++] = c;
          b[this.oa++] = a;
        },
        get() {
          return this.Gc[c];
        },
      });
    });
    a.prototype.roundRect = function(a, c, b, d, f) {
      this.beginPath();
      this.moveTo(a + f, c);
      this.lineTo(a + b - f, c);
      this.quadraticCurveTo(a + b, c, a + b, c + f);
      this.lineTo(a + b, c + d - f);
      this.quadraticCurveTo(a + b, c + d, a + b - f, c + d);
      this.lineTo(a + f, c + d);
      this.quadraticCurveTo(a, c + d, a, c + d - f);
      this.lineTo(a, c + f);
      this.quadraticCurveTo(a, c, a + f, c);
      this.closePath();
    };
    a.prototype.fillPolygonWithText = function(a, c, b, d, f) {
      f || (f = {});
      const k = {
        sb: D.B(f.maxFontSize, G.Ea.sb),
        Zc: D.B(f.minFontSize, G.Ea.Zc),
        lineHeight: D.B(f.lineHeight, G.Ea.lineHeight),
        pb: D.B(f.horizontalPadding, G.Ea.pb),
        eb: D.B(f.verticalPadding, G.Ea.eb),
        tb: D.B(f.maxTotalTextHeight, G.Ea.tb),
        fontFamily: D.B(f.fontFamily, G.Ea.fontFamily),
        fontStyle: D.B(f.fontStyle, G.Ea.fontStyle),
        fontVariant: D.B(f.fontVariant, G.Ea.fontVariant),
        fontWeight: D.B(f.fontWeight, G.Ea.fontWeight),
        verticalAlign: D.B(f.verticalAlign, G.Ea.verticalAlign),
      };
      const g = f.cache;
      if (g && D.Q(f, 'area')) {
        g.jd || (g.jd = new ga());
        const r = f.area;
        const s = D.B(f.cacheInvalidationThreshold, 0.05);
        a = G.xe(
          k,
          this,
          d,
          a,
          M.q(a, {}),
          { x: c, y: b },
          f.allowForcedSplit || !1,
          f.allowEllipsis || !1,
          g,
          r,
          s,
          f.invalidateCache,
        );
      } else
        a = G.Le(
          k,
          this,
          d,
          a,
          M.q(a, {}),
          { x: c, y: b },
          f.allowForcedSplit || !1,
          f.allowEllipsis || !1,
        );
      return a.la
        ? {
            fit: !0,
            lineCount: a.mc,
            fontSize: a.fontSize,
            box: { x: a.da.x, y: a.da.y, w: a.da.f, h: a.da.i },
            ellipsis: a.ec,
          }
        : { fit: !1 };
    };
    return a;
  });
  const ha = v.Dd(function() {
    function a(a) {
      this.O = a;
      this.d = [];
      this.Ib = [void 0];
      this.Nc = ['#SIZE#px sans-serif'];
      this.Ld = [0];
      this.Md = [1];
      this.ie = [0];
      this.je = [0];
      this.ke = [0];
      this.Qd = [10];
      this.hc = [10];
      this.Sb = [this.Ib, this.Nc, this.hc, this.Ld, this.Md, this.ie, this.Qd, this.je, this.ke];
      this.ga = [1, 0, 0, 1, 0, 0];
    }
    function l(a) {
      const c = a.O;
      const d = a.Sb[0].length - 1;
      a.Ib[d] && (c.setLineDash(a.Ib[d]), (c.Tj = a.Ld[d]));
      c.miterLimit = a.Qd[d];
      c.lineWidth = a.Md[d];
      c.shadowBlur = a.ie[d];
      c.shadowOffsetX = a.je[d];
      c.shadowOffsetY = a.ke[d];
      c.font = a.Nc[d].replace('#SIZE#', a.hc[d].toString());
    }
    function k(a) {
      return function() {
        return this.O[a].apply(this.O, arguments);
      };
    }
    function f(a) {
      return function(d, e) {
        const f = this.ga;
        return this.O[a].call(this.O, c(d, e, f), g(d, e, f));
      };
    }
    function d(a) {
      return function(d, e, f, k) {
        const r = this.ga;
        return this.O[a].call(this.O, c(d, e, r), g(d, e, r), f * r[0], k * r[3]);
      };
    }
    function c(a, c, d) {
      return a * d[0] + c * d[2] + d[4];
    }
    function g(a, c, d) {
      return a * d[1] + c * d[3] + d[5];
    }
    function m(a, c) {
      for (let d = 0; d < a.length; d++) a[d] *= c[0];
      return a;
    }
    a.prototype.save = function() {
      this.d.push(this.ga.slice(0));
      for (let a = 0; a < this.Sb.length; a++) {
        const c = this.Sb[a];
        c.push(c[c.length - 1]);
      }
      this.O.save();
    };
    a.prototype.restore = function() {
      this.ga = this.d.pop();
      for (let a = 0; a < this.Sb.length; a++) this.Sb[a].pop();
      this.O.restore();
      l(this);
    };
    a.prototype.scale = function(a, c) {
      var d = this.ga;
      d[0] *= a;
      d[1] *= a;
      d[2] *= c;
      d[3] *= c;
      var d = this.ga;
      const e = this.Sb;
      const f = e[0].length - 1;
      let k = this.Ib[f];
      k && m(k, d);
      for (k = 2; k < e.length; k++) {
        const g = e[k];
        g[f] *= d[0];
      }
      l(this);
    };
    a.prototype.translate = function(a, c) {
      const d = this.ga;
      d[4] += d[0] * a + d[2] * c;
      d[5] += d[1] * a + d[3] * c;
    };
    ['moveTo', 'lineTo'].forEach(function(b) {
      a.prototype[b] = f(b);
    });
    ['clearRect', 'fillRect', 'strokeRect', 'rect'].forEach(function(b) {
      a.prototype[b] = d(b);
    });
    'fill stroke beginPath closePath clip createImageData createPattern getImageData putImageData getLineDash setLineDash'
      .split(' ')
      .forEach(function(b) {
        a.prototype[b] = k(b);
      });
    [
      {
        vb: 'lineDashOffset',
        zb(a) {
          return a.Ld;
        },
      },
      {
        vb: 'lineWidth',
        zb(a) {
          return a.Md;
        },
      },
      {
        vb: 'miterLimit',
        zb(a) {
          return a.Qd;
        },
      },
      {
        vb: 'shadowBlur',
        zb(a) {
          return a.ie;
        },
      },
      {
        vb: 'shadowOffsetX',
        zb(a) {
          return a.je;
        },
      },
      {
        vb: 'shadowOffsetY',
        zb(a) {
          return a.ke;
        },
      },
    ].forEach(function(b) {
      Object.defineProperty(a.prototype, b.vb, {
        set(a) {
          const c = b.zb(this);
          a *= this.ga[0];
          c[c.length - 1] = a;
          this.O[b.vb] = a;
        },
      });
    });
    const e = /(\d+(?:\.\d+)?)px/;
    Object.defineProperty(a.prototype, 'font', {
      set(a) {
        const c = e.exec(a);
        if (c.length > 1) {
          const d = this.hc.length - 1;
          this.hc[d] = parseFloat(c[1]);
          this.Nc[d] = a.replace(e, '#SIZE#px');
          this.O.font = this.Nc[d].replace('#SIZE#', (this.hc[d] * this.ga[0]).toString());
        }
      },
    });
    'fillStyle globalAlpha globalCompositeOperation lineCap lineJoin shadowColor strokeStyle textAlign textBaseline'
      .split(' ')
      .forEach(function(b) {
        Object.defineProperty(a.prototype, b, {
          set(a) {
            this.O[b] = a;
          },
        });
      });
    a.prototype.arc = function(a, d, e, f, k, r) {
      const s = this.ga;
      this.O.arc(c(a, d, s), g(a, d, s), e * s[0], f, k, r);
    };
    a.prototype.arcTo = function(a, d, e, f, k) {
      const r = this.ga;
      this.O.arc(c(a, d, r), g(a, d, r), c(e, f, r), g(e, f, r), k * r[0]);
    };
    a.prototype.bezierCurveTo = function(a, d, e, f, k, r) {
      const s = this.ga;
      this.O.bezierCurveTo(c(a, d, s), g(a, d, s), c(e, f, s), g(e, f, s), c(k, r, s), g(k, r, s));
    };
    a.prototype.drawImage = function(a, d, e, f, k, r, s, m, l) {
      function y(d, e, f, k) {
        A.push(c(d, e, x));
        A.push(g(d, e, x));
        f = D.V(f) ? a.width : f;
        k = D.V(k) ? a.height : k;
        A.push(f * x[0]);
        A.push(k * x[3]);
      }
      var x = this.ga;
      var A = [a];
      D.V(r) ? y(d, e, f, k) : y(r, s, m, l);
      this.O.drawImage.apply(this.O, A);
    };
    a.prototype.quadraticCurveTo = function(a, d, e, f) {
      const k = this.ga;
      this.O.quadraticCurveTo(c(a, d, k), g(a, d, k), c(e, f, k), g(e, f, k));
    };
    a.prototype.fillText = function(a, d, e, f) {
      const k = this.ga;
      this.O.fillText(a, c(d, e, k), g(d, e, k), D.Sc(f) ? f * k[0] : 1e20);
    };
    a.prototype.setLineDash = function(a) {
      a = m(a.slice(0), this.ga);
      this.Ib[this.Ib.length - 1] = a;
      this.O.setLineDash(a);
    };
    return a;
  });
  const ja = (function() {
    const a = !v.of() || v.lf() || v.hf() ? 1 : 7;
    return {
      eh() {
        function l(a) {
          a.beginPath();
          ia.le(a, m);
        }
        var k = document.createElement('canvas');
        k.width = 800;
        k.height = 600;
        const f = k.getContext('2d');
        const d = k.width;
        var k = k.height;
        let c;
        var g = 0;
        var m = [{ x: 0, y: 100 }];
        for (c = 1; c <= 6; c++)
          (g = (2 * c * Math.PI) / 6),
            m.push({ x: 0 + 100 * Math.sin(g), y: 0 + 100 * Math.cos(g) });
        c = {
          polygonPlainFill: [
            l,
            function(a) {
              a.fillStyle = 'rgb(255, 0, 0)';
              a.fill();
            },
          ],
          polygonPlainStroke: [
            l,
            function(a) {
              a.strokeStyle = 'rgb(128, 0, 0)';
              a.lineWidth = 2;
              a.closePath();
              a.stroke();
            },
          ],
          polygonGradientFill: [
            l,
            function(a) {
              const b = a.createRadialGradient(0, 0, 10, 0, 0, 60);
              b.addColorStop(0, 'rgb(255, 0, 0)');
              b.addColorStop(1, 'rgb(255, 255, 0)');
              a.fillStyle = b;
              a.fill();
            },
          ],
          polygonGradientStroke: [
            l,
            function(a) {
              const b = a.createLinearGradient(-100, -100, 100, 100);
              b.addColorStop(0, 'rgb(224, 0, 0)');
              b.addColorStop(1, 'rgb(32, 0, 0)');
              a.strokeStyle = b;
              a.lineWidth = 2;
              a.closePath();
              a.stroke();
            },
          ],
          polygonExposureShadow: [
            l,
            function(a) {
              a.shadowBlur = 50;
              a.shadowColor = 'rgba(0, 0, 0, 1)';
              a.fillStyle = 'rgba(0, 0, 0, 1)';
              a.globalCompositeOperation = 'source-over';
              a.fill();
              a.shadowBlur = 0;
              a.shadowColor = 'transparent';
              a.globalCompositeOperation = 'destination-out';
              a.fill();
            },
          ],
          labelPlainFill: [
            function(a) {
              a.fillStyle = '#000';
              a.font = '24px sans-serif';
              a.textAlign = 'center';
            },
            function(a) {
              a.fillText('Some text', 0, -16);
              a.fillText('for testing purposes', 0, 16);
            },
          ],
        };
        var g = 100 / Object.keys(c).length;
        const e = aa.now();
        const b = {};
        let h;
        for (h in c) {
          const n = c[h];
          const q = aa.now();
          var p;
          let r = 0;
          do {
            f.save();
            f.translate(Math.random() * d, Math.random() * k);
            p = 3 * Math.random() + 0.5;
            f.scale(p, p);
            for (p = 0; p < n.length; p++) n[p](f);
            f.restore();
            r++;
            p = aa.now();
          } while (p - q < g);
          b[h] = (a * (p - q)) / r;
        }
        b.total = aa.now() - e;
        return b;
      },
    };
  })();
  var ia = {
    le(a, l) {
      let k = l[0];
      a.moveTo(k.x, k.y);
      for (let f = l.length - 1; f > 0; f--) (k = l[f]), a.lineTo(k.x, k.y);
    },
    rj(a, l, k, f) {
      let d;
      let c;
      let g;
      const m = [];
      var e = 0;
      const b = l.length;
      for (g = 0; g < b; g++)
        (d = l[g]), (c = l[(g + 1) % b]), (d = M.d(d, c)), (d = Math.sqrt(d)), m.push(d), (e += d);
      k = f * (k + (0.5 * f * e) / b);
      let h;
      let n;
      f = {};
      var e = {};
      const q = {};
      let p = 0;
      for (g = 0; g < b; g++)
        (d = l[g]),
          (c = l[(g + 1) % b]),
          (h = l[(g + 2) % b]),
          (n = m[(g + 1) % b]),
          (n = Math.min(0.5, k / n)),
          M.Aa(1 - n, c, h, e),
          M.Aa(n, c, h, q),
          p++,
          g == 0 && ((h = Math.min(0.5, k / m[0])), M.Aa(h, d, c, f), p++, a.moveTo(f.x, f.y)),
          a.quadraticCurveTo(c.x, c.y, e.x, e.y),
          a.lineTo(q.x, q.y);
      return !0;
    },
  };
  function ka(a) {
    function l(a) {
      h[a].style.opacity = q * n[a];
    }
    function k(a) {
      a.width = Math.round(c * a.n);
      a.height = Math.round(g * a.n);
    }
    function f() {
      return /relative|absolute|fixed/.test(
        window.getComputedStyle(d, null).getPropertyValue('position'),
      );
    }
    let d;
    let c;
    let g;
    let m;
    let e;
    let b = [];
    var h = {};
    var n = {};
    var q = 0;
    this.H = function(b) {
      d = b;
      f() || (d.style.position = 'relative');
      (d.clientWidth != 0 && d.clientHeight != 0) ||
        na.Pa(`element has zero dimensions: ${d.clientWidth} x ${d.clientHeight}.`);
      d.innerHTML = '';
      c = d.clientWidth;
      g = d.clientHeight;
      m = c !== 0 ? c : void 0;
      e = g !== 0 ? g : void 0;
      d.getAttribute('data-foamtree') === 'embedded' &&
        na.Pa('visualization already embedded in the element.');
      d.setAttribute('data-foamtree', 'embedded');
      a.c.p('stage:initialized', this, d, c, g);
    };
    this.lb = function() {
      d.removeAttribute('data-foamtree');
      b = [];
      h = {};
      a.c.p('stage:disposed', this, d);
    };
    this.k = function() {
      f() || (d.style.position = 'relative');
      c = d.clientWidth;
      g = d.clientHeight;
      if (c !== 0 && g !== 0 && (c !== m || g !== e)) {
        for (let h = b.length - 1; h >= 0; h--) k(b[h]);
        a.c.p('stage:resized', m, e, c, g);
        m = c;
        e = g;
      }
    };
    this.fj = function(a, b) {
      a.n = b;
      k(a);
    };
    this.oc = function(c, e, f) {
      const g = document.createElement('canvas');
      g.setAttribute(
        'style',
        'position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;',
      );
      g.n = e;
      k(g);
      b.push(g);
      h[c] = g;
      n[c] = 1;
      l(c);
      f || d.appendChild(g);
      a.c.p('stage:newLayer', c, g);
      return g;
    };
    this.kc = function(a, b) {
      D.V(b) || ((n[a] = b), l(a));
      return n[a];
    };
    this.d = function(a) {
      D.V(a) ||
        ((q = a),
        D.Ga(h, function(a, b) {
          l(b);
        }));
      return q;
    };
  }
  function oa(a) {
    function l(a, b, e) {
      y = !0;
      q.x = 0;
      q.y = 0;
      p.x = 0;
      p.y = 0;
      d = h;
      c.x = n.x;
      c.y = n.y;
      b();
      g *= a;
      m = e ? g / d : a;
      m = Math.max(0.25 / d, m);
      return !0;
    }
    function k(a, b) {
      b.x = a.x / h + n.x;
      b.y = a.y / h + n.y;
      return b;
    }
    function f(a, b, c, d, e, f, k, h, g) {
      const s = (a - c) * (f - h) - (b - d) * (e - k);
      if (Math.abs(s) < 1e-5) return !1;
      g.x = ((a * d - b * c) * (e - k) - (a - c) * (e * h - f * k)) / s;
      g.y = ((a * d - b * c) * (f - h) - (b - d) * (e * h - f * k)) / s;
      return !0;
    }
    var d = 1;
    var c = { x: 0, y: 0 };
    var g = 1;
    var m = 1;
    let e = 1;
    const b = { x: 0, y: 0 };
    var h = 1;
    var n = { x: 0, y: 0 };
    var q = { x: 0, y: 0 };
    var p = { x: 0, y: 0 };
    let r;
    let s;
    const w = { x: 0, y: 0, f: 0, i: 0 };
    const t = { x: 0, y: 0, f: 0, i: 0, scale: 1 };
    var y = !0;
    a.c.j('stage:initialized', function(a, b, c, d) {
      r = c;
      s = d;
      w.x = 0;
      w.y = 0;
      w.f = c;
      w.i = d;
      t.x = 0;
      t.y = 0;
      t.f = c;
      t.i = d;
      t.scale = 1;
    });
    a.c.j('stage:resized', function(a, d, e, f) {
      function k(a) {
        a.x *= g;
        a.y *= m;
      }
      function h(a) {
        k(a);
        a.f *= g;
        a.i *= m;
      }
      r = e;
      s = f;
      var g = e / a;
      var m = f / d;
      k(c);
      k(n);
      k(b);
      k(q);
      k(p);
      h(w);
      h(t);
    });
    this.Yb = function(a, d) {
      return l(
        d,
        function() {
          k(a, b);
        },
        !0,
      );
    };
    this.Y = function(a, d) {
      if (Math.round(1e4 * d) / 1e4 === 1) {
        const c = w.x - n.x;
        const e = w.y - n.y;
        l(1, function() {}, !0);
        return this.d(-c, -e);
      }
      return l(
        d,
        function() {
          for (var d = !1; !d; ) var d = Math.random();
          const c = Math.random();
          const e = Math.random();
          const k = Math.random();
          var d = f(
            a.x + d * a.f,
            a.y + c * a.i,
            w.x + d * w.f,
            w.y + c * w.i,
            a.x + e * a.f,
            a.y + k * a.i,
            w.x + e * w.f,
            w.y + k * w.i,
            b,
          );
        },
        !0,
      );
    };
    this.sc = function(a, d) {
      let c;
      let e;
      let k;
      let g;
      c = a.f / a.i;
      e = r / s;
      c < e
        ? ((k = a.i * e), (g = a.i), (c = a.x - 0.5 * (k - a.f)), (e = a.y))
        : c > e
        ? ((k = a.f), (g = (a.f * s) / r), (c = a.x), (e = a.y - 0.5 * (g - a.i)))
        : ((c = a.x), (e = a.y), (k = a.f), (g = a.i));
      c -= k * d;
      e -= g * d;
      k *= 1 + 2 * d;
      if (f(c, e, n.x, n.y, c + k, e, n.x + r / h, n.y, b)) return l(r / h / k, D.ta, !1);
      y = !1;
      return this.d(h * (n.x - c), h * (n.y - e));
    };
    this.d = function(a, b) {
      const c = Math.round(1e4 * a) / 1e4;
      const d = Math.round(1e4 * b) / 1e4;
      p.x += c / h;
      p.y += d / h;
      return c !== 0 || d !== 0;
    };
    this.reset = function(a) {
      a && this.content(0, 0, r, s);
      return this.Y({ x: w.x + n.x, y: w.y + n.y, f: w.f / h, i: w.i / h }, e / g);
    };
    this.Qb = function(a) {
      e = Math.min(1, Math.round(1e4 * (a || g)) / 1e4);
    };
    this.k = function() {
      return n.x < w.x
        ? (w.x - n.x) * h
        : n.x + r / h > w.x + w.f
        ? -(n.x + r / h - w.x - w.f) * h
        : 0;
    };
    this.A = function() {
      return n.y < w.y
        ? (w.y - n.y) * h
        : n.y + s / h > w.y + w.i
        ? -(n.y + s / h - w.y - w.i) * h
        : 0;
    };
    this.update = function(a) {
      let e = Math.abs(Math.log(m));
      e < 6 ? (e = 2) : ((e /= 4), (e += 3 * e * (m > 1 ? a : 1 - a)));
      e = m > 1 ? Math.pow(a, e) : 1 - Math.pow(1 - a, e);
      e = (y ? e : 1) * (m - 1) + 1;
      h = d * e;
      n.x = b.x - (b.x - c.x) / e;
      n.y = b.y - (b.y - c.y) / e;
      n.x -= q.x * (1 - a) + p.x * a;
      n.y -= q.y * (1 - a) + p.y * a;
      a === 1 && ((q.x = p.x), (q.y = p.y));
      t.x = n.x;
      t.y = n.y;
      t.f = r / h;
      t.i = s / h;
      t.scale = h;
    };
    this.S = function(a) {
      a.x = t.x;
      a.y = t.y;
      a.scale = t.scale;
      return a;
    };
    this.absolute = function(a, b) {
      return k(a, b || {});
    };
    this.nd = function(a, b) {
      const c = b || {};
      c.x = (a.x - n.x) * h;
      c.y = (a.y - n.y) * h;
      return c;
    };
    this.Hc = function(a) {
      return this.scale() < e / a;
    };
    this.Rd = function() {
      return D.Fd(h, 1);
    };
    this.scale = function() {
      return Math.round(1e4 * h) / 1e4;
    };
    this.content = function(a, b, c, d) {
      w.x = a;
      w.y = b;
      w.f = c;
      w.i = d;
    };
    this.Jc = function(a, b) {
      let c;
      for (c = a.length - 1; c >= 0; c--) {
        var d = a[c];
        d.save();
        d.scale(h, h);
        d.translate(-n.x, -n.y);
      }
      b(t);
      for (c = a.length - 1; c >= 0; c--) (d = a[c]), d.restore();
    };
  }
  var S = new (function() {
    function a(a) {
      if (a.model == 'hsl' || a.model == 'hsla') return a;
      const f = (a.r /= 255);
      const d = (a.g /= 255);
      const c = (a.b /= 255);
      const g = Math.max(f, d, c);
      var m = Math.min(f, d, c);
      let e;
      const b = (g + m) / 2;
      if (g == m) e = m = 0;
      else {
        const h = g - m;
        var m = b > 0.5 ? h / (2 - g - m) : h / (g + m);
        switch (g) {
          case f:
            e = (d - c) / h + (d < c ? 6 : 0);
            break;
          case d:
            e = (c - f) / h + 2;
            break;
          case c:
            e = (f - d) / h + 4;
        }
        e /= 6;
      }
      a.h = 360 * e;
      a.s = 100 * m;
      a.l = 100 * b;
      a.model = 'hsl';
      return a;
    }
    const l = { h: 0, s: 0, l: 0, a: 1, model: 'hsla' };
    this.Ba = function(k) {
      return D.Tc(k) ? a(S.Hg(k)) : D.jc(k) ? a(k) : l;
    };
    this.Hg = function(a) {
      let f;
      return (f = /rgba\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(
        a,
      )) && f.length == 5
        ? {
            r: parseFloat(f[1]),
            g: parseFloat(f[2]),
            b: parseFloat(f[3]),
            a: parseFloat(f[4]),
            model: 'rgba',
          }
        : (f = /hsla\(\s*([^,\s]+)\s*,\s*([^,%\s]+)%\s*,\s*([^,\s%]+)%\s*,\s*([^,\s]+)\s*\)/.exec(
            a,
          )) && f.length == 5
        ? {
            h: parseFloat(f[1]),
            s: parseFloat(f[2]),
            l: parseFloat(f[3]),
            a: parseFloat(f[4]),
            model: 'hsla',
          }
        : (f = /rgb\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/.exec(a)) && f.length == 4
        ? {
            r: parseFloat(f[1]),
            g: parseFloat(f[2]),
            b: parseFloat(f[3]),
            a: 1,
            model: 'rgb',
          }
        : (f = /hsl\(\s*([^,\s]+)\s*,\s*([^,\s%]+)%\s*,\s*([^,\s%]+)%\s*\)/.exec(a)) &&
          f.length == 4
        ? {
            h: parseFloat(f[1]),
            s: parseFloat(f[2]),
            l: parseFloat(f[3]),
            a: 1,
            model: 'hsl',
          }
        : (f = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a)) && f.length == 4
        ? {
            r: parseInt(f[1], 16),
            g: parseInt(f[2], 16),
            b: parseInt(f[3], 16),
            a: 1,
            model: 'rgb',
          }
        : (f = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a)) && f.length == 4
        ? {
            r: 17 * parseInt(f[1], 16),
            g: 17 * parseInt(f[2], 16),
            b: 17 * parseInt(f[3], 16),
            a: 1,
            model: 'rgb',
          }
        : l;
    };
    this.Cg = function(a) {
      function f(a, b, c) {
        c < 0 && (c += 1);
        c > 1 && (c -= 1);
        return c < 1 / 6
          ? a + 6 * (b - a) * c
          : c < 0.5
          ? b
          : c < 2 / 3
          ? a + (b - a) * (2 / 3 - c) * 6
          : a;
      }
      if (a.model == 'rgb' || a.model == 'rgba')
        return Math.sqrt(a.r * a.r * 0.241 + a.g * a.g * 0.691 + a.b * a.b * 0.068) / 255;
      let d;
      let c;
      d = a.l / 100;
      var g = a.s / 100;
      c = a.h / 360;
      if (a.Wj == 0) d = a = c = d;
      else {
        var g = d < 0.5 ? d * (1 + g) : d + g - d * g;
        const m = 2 * d - g;
        d = f(m, g, c + 1 / 3);
        a = f(m, g, c);
        c = f(m, g, c - 1 / 3);
      }
      return Math.sqrt(65025 * d * d * 0.241 + 65025 * a * a * 0.691 + 65025 * c * c * 0.068) / 255;
    };
    this.Ng = function(a) {
      if (D.Tc(a)) return a;
      if (D.jc(a))
        switch (a.model) {
          case 'hsla':
            return S.Ig(a);
          case 'hsl':
            return S.Ac(a);
          case 'rgba':
            return S.Lg(a);
          case 'rgb':
            return S.Kg(a);
          default:
            return '#000';
        }
      else return '#000';
    };
    this.Lg = function(a) {
      return `rgba(${(0.5 + a.r) | 0},${(0.5 + a.g) | 0},${(0.5 + a.b) | 0},${a.a})`;
    };
    this.Kg = function(a) {
      return `rgba(${(0.5 + a.r) | 0},${(0.5 + a.g) | 0},${(0.5 + a.b) | 0})`;
    };
    this.Ig = function(a) {
      return `hsla(${(0.5 + a.h) | 0},${(0.5 + a.s) | 0}%,${(0.5 + a.l) | 0}%,${a.a})`;
    };
    this.Ac = function(a) {
      return `hsl(${(0.5 + a.h) | 0},${(0.5 + a.s) | 0}%,${(0.5 + a.l) | 0}%)`;
    };
    this.Y = function(a, f, d) {
      return `hsl(${(0.5 + a) | 0},${(0.5 + f) | 0}%,${(0.5 + d) | 0}%)`;
    };
  })();
  function V() {
    let a = !1;
    let l;
    const k = [];
    let f = this;
    const d = new (function() {
      this.N = function(c) {
        c && (a ? c.apply(f, l) : k.push(c));
        return this;
      };
      this.ih = function(a) {
        f = a;
        return { then: this.N };
      };
    })();
    this.J = function() {
      l = arguments;
      for (let c = 0; c < k.length; c++) k[c].apply(f, l);
      a = !0;
      return this;
    };
    this.L = function() {
      return d;
    };
  }
  function pa(a) {
    const l = new V();
    let k = a.length;
    if (a.length > 0)
      for (let f = a.length - 1; f >= 0; f--)
        a[f].N(function() {
          --k === 0 && l.J();
        });
    else l.J();
    return l.L();
  }
  function qa(a) {
    let l = 0;
    this.d = function() {
      l++;
    };
    this.k = function() {
      l--;
      l === 0 && a();
    };
    this.clear = function() {
      l = 0;
    };
    this.A = function() {
      return l === 0;
    };
  }
  const ra = {
    Ie(a, l, k, f) {
      f = f || {};
      a = a.getBoundingClientRect();
      f.x = l - a.left;
      f.y = k - a.top;
      return f;
    },
  };
  function sa() {
    const a = document;
    const l = {};
    this.addEventListener = function(k, f) {
      let d = l[k];
      d || ((d = []), (l[k] = d));
      d.push(f);
      a.addEventListener(k, f);
    };
    this.d = function() {
      D.Ga(l, function(k, f) {
        for (let d = k.length - 1; d >= 0; d--) a.removeEventListener(f, k[d]);
      });
    };
  }
  function ta(a) {
    function l(a) {
      return function(b) {
        k(b) && a.apply(this, arguments);
      };
    }
    function k(b) {
      for (b = b.target; b; ) {
        if (b === a) return !0;
        b = b.parentElement;
      }
      return !1;
    }
    function f(a, b, c) {
      c = c || {};
      d(a, c);
      for (let e = 0; e < b.length; e++) b[e].call(a.target, c);
      ((void 0 === c.Mb && c.zi) || c.Mb === 'prevent') && a.preventDefault();
      return c;
    }
    function d(b, c) {
      ra.Ie(a, b.clientX, b.clientY, c);
      c.altKey = b.altKey;
      c.metaKey = b.metaKey;
      c.ctrlKey = b.ctrlKey;
      c.shiftKey = b.shiftKey;
      c.xb = b.which === 3;
      return c;
    }
    const c = new sa();
    const g = [];
    const m = [];
    const e = [];
    const b = [];
    const h = [];
    const n = [];
    const q = [];
    const p = [];
    const r = [];
    const s = [];
    const w = [];
    this.d = function(a) {
      g.push(a);
    };
    this.k = function(a) {
      h.push(a);
    };
    this.ya = function(a) {
      m.push(a);
    };
    this.Ba = function(a) {
      e.push(a);
    };
    this.Pa = function(a) {
      b.push(a);
    };
    this.Aa = function(a) {
      w.push(a);
    };
    this.za = function(a) {
      n.push(a);
    };
    this.Ja = function(a) {
      q.push(a);
    };
    this.Y = function(a) {
      p.push(a);
    };
    this.A = function(a) {
      r.push(a);
    };
    this.S = function(a) {
      s.push(a);
    };
    this.lb = function() {
      c.d();
    };
    let t;
    let y;
    let x;
    let A;
    const B = { x: 0, y: 0 };
    const K = { x: 0, y: 0 };
    let C = !1;
    let H = !1;
    c.addEventListener(
      'mousedown',
      l(function(b) {
        if (b.target !== a) {
          const c = f(b, e);
          K.x = c.x;
          K.y = c.y;
          B.x = c.x;
          B.y = c.y;
          C = !0;
          f(b, p);
          y = !1;
          t = window.setTimeout(function() {
            M.d(B, c) < 100 && (window.clearTimeout(A), f(b, m), (y = !0));
          }, 400);
        }
      }),
    );
    c.addEventListener('mouseup', function(a) {
      function c(a) {
        const b = {};
        b.x = a.pageX;
        b.y = a.pageY;
        return b;
      }
      f(a, b);
      if (C) {
        H && f(a, s);
        window.clearTimeout(t);
        if (!y && !H && k(a)) {
          const d = c(a);
          x && M.d(d, x) < 100 ? f(a, h) : f(a, g);
          x = d;
          A = window.setTimeout(function() {
            x = null;
          }, 350);
        }
        H = C = !1;
      }
    });
    c.addEventListener('mousemove', function(a) {
      const b = d(a, {});
      k(a) && f(a, n, { type: 'move' });
      B.x = b.x;
      B.y = b.y;
      C && !H && M.d(K, B) > 100 && (H = !0);
      H && f(a, r, b);
    });
    c.addEventListener(
      'mouseout',
      l(function(a) {
        f(a, q, { type: 'out' });
      }),
    );
    c.addEventListener(
      void 0 !== document.onmousewheel ? 'mousewheel' : 'MozMousePixelScroll',
      l(function(a) {
        const b = a.wheelDelta;
        const c = a.detail;
        f(a, w, {
          wd: (c ? (b ? ((b / c / 40) * c > 0 ? 1 : -1) : -c / (v.mf() ? 40 : 19)) : b / 40) / 3,
          zi: !0,
        });
      }),
    );
    c.addEventListener(
      'contextmenu',
      l(function(a) {
        a.preventDefault();
      }),
    );
  }
  var X = (function() {
    function a(a) {
      return function(c) {
        return Math.pow(c, a);
      };
    }
    function l(a) {
      return function(c) {
        return 1 - Math.pow(1 - c, a);
      };
    }
    function k(a) {
      return function(c) {
        return (c *= 2) < 1 ? 0.5 * Math.pow(c, a) : 1 - 0.5 * Math.abs(Math.pow(2 - c, a));
      };
    }
    function f(a) {
      return function(c) {
        for (let f = 0; f < a.length; f++) c = (0, a[f])(c);
        return c;
      };
    }
    return {
      pa(a) {
        switch (a) {
          case 'linear':
            return X.Jb;
          case 'bounce':
            return X.Vg;
          case 'squareIn':
            return X.og;
          case 'squareOut':
            return X.Rb;
          case 'squareInOut':
            return X.pg;
          case 'cubicIn':
            return X.Zg;
          case 'cubicOut':
            return X.ze;
          case 'cubicInOut':
            return X.$g;
          case 'quadIn':
            return X.Ri;
          case 'quadOut':
            return X.Ti;
          case 'quadInOut':
            return X.Si;
          default:
            return X.Jb;
        }
      },
      Jb(a) {
        return a;
      },
      Vg: f([
        k(2),
        function(a) {
          return a === 0
            ? 0
            : a === 1
            ? 1
            : a * (a * (a * (a * (25.9425 * a - 85.88) + 105.78) - 58.69) + 13.8475);
        },
      ]),
      og: a(2),
      Rb: l(2),
      pg: k(2),
      Zg: a(3),
      ze: l(3),
      $g: k(3),
      Ri: a(2),
      Ti: l(2),
      Si: k(2),
      d: f,
    };
  })();
  var D = {
    V(a) {
      return void 0 === a;
    },
    nf(a) {
      return a === null;
    },
    Sc(a) {
      return Object.prototype.toString.call(a) === '[object Number]';
    },
    Tc(a) {
      return Object.prototype.toString.call(a) === '[object String]';
    },
    Gd(a) {
      return typeof a === 'function';
    },
    jc(a) {
      return a === Object(a);
    },
    Fd(a, l) {
      return a - l < 1e-6 && a - l > -1e-6;
    },
    jf(a) {
      return D.V(a) || D.nf(a) || (D.Tc(a) && !/\S/.test(a));
    },
    Q(a, l) {
      return a && a.hasOwnProperty(l);
    },
    ob(a, l) {
      if (a) for (let k = l.length - 1; k >= 0; k--) if (a.hasOwnProperty(l[k])) return !0;
      return !1;
    },
    extend(a) {
      D.dh(Array.prototype.slice.call(arguments, 1), function(l) {
        if (l) for (const k in l) l.hasOwnProperty(k) && (a[k] = l[k]);
      });
      return a;
    },
    A(a, l) {
      return a.map(function(a) {
        return a[l];
      }, []);
    },
    dh(a, l, k) {
      a != null && (a.forEach ? a.forEach(l, k) : D.Ga(a, l, k));
    },
    Ga(a, l, k) {
      for (const f in a) if (a.hasOwnProperty(f) && !1 === l.call(k, a[f], f, a)) break;
    },
    B() {
      for (let a = 0; a < arguments.length; a++) {
        const l = arguments[a];
        if (!(D.V(l) || (D.Sc(l) && isNaN(l)) || (D.Tc(l) && D.jf(l)))) return l;
      }
    },
    cg(a, l) {
      const k = a.indexOf(l);
      k >= 0 && a.splice(k, 1);
    },
    ah(a, l, k) {
      let f;
      return function() {
        const d = this;
        const c = arguments;
        const g = k && !f;
        clearTimeout(f);
        f = setTimeout(function() {
          f = null;
          k || a.apply(d, c);
        }, l);
        g && a.apply(d, c);
      };
    },
    defer(a) {
      setTimeout(a, 1);
    },
    k(a) {
      return a;
    },
    ta() {},
  };
  const ua = {
    ji(a, l, k) {
      return v.hi()
        ? function() {
            const f = `${l}:${JSON.stringify(arguments)}`;
            let d = window.localStorage.getItem(f);
            d && (d = JSON.parse(d));
            if (d && Date.now() - d.t < k) return d.v;
            d = a.apply(this, arguments);
            window.localStorage.setItem(f, JSON.stringify({ v: d, t: Date.now() }));
            return d;
          }
        : a;
    },
  };
  const va = {
    m(a, l) {
      function k() {
        const f = [];
        if (Array.isArray(a))
          for (let d = 0; d < a.length; d++) {
            const c = a[d];
            c && f.push(c.apply(l, arguments));
          }
        else a && f.push(a.apply(l, arguments));
        return f;
      }
      k.empty = function() {
        return a.length === 0 && !D.Gd(a);
      };
      return k;
    },
  };
  function wa() {
    const a = {};
    this.j = function(l, k) {
      let f = a[l];
      f || ((f = []), (a[l] = f));
      f.push(k);
    };
    this.p = function(l, k) {
      const f = a[l];
      if (f)
        for (let d = Array.prototype.slice.call(arguments, 1), c = 0; c < f.length; c++)
          f[c].apply(this, d);
    };
  }
  const xa = {
    kg(a) {
      for (var l = '', k = 0; k < a.length; k++) l += String.fromCharCode(a.charCodeAt(k) ^ 1);
      return l;
    },
  };
  function ya(a) {
    function l(b, d, k) {
      const l = this;
      let p;
      let r = 0;
      this.id = g++;
      this.name = k || `{unnamed on ${b}}`;
      this.target = function() {
        return b;
      };
      this.Gb = function() {
        return e.indexOf(l) != -1;
      };
      this.start = function() {
        if (!l.Gb()) {
          if (e.indexOf(l) == -1) {
            const b = m.now();
            !0 === l.xf(b) && ((e = e.slice()), e.push(l));
          }
          e.length > 0 && a.repeat(f);
        }
        return this;
      };
      this.stop = function() {
        for (c(l); p < d.length; p++) {
          const a = d[p];
          a.jb && a.Ya.call();
        }
        return this;
      };
      this.eg = function() {
        p = void 0;
      };
      this.xf = function(a) {
        r++;
        if (d.length !== 0) {
          let b;
          D.V(p) ? ((p = 0), (b = d[p]), b.W && b.W.call(b, a, r, l)) : (b = d[p]);
          for (; p < d.length; ) {
            if (b.Ya && b.Ya.call(b, a, r, l)) return !0;
            b.Da && b.Da.call(b, a, r, l);
            D.V(p) && (p = -1);
            ++p < d.length && ((b = d[p]), b.W && b.W.call(b, a, r, l));
          }
        }
        return !1;
      };
    }
    function k(a) {
      return D.V(a)
        ? e.slice()
        : e.filter(function(c) {
            return c.target() === a;
          });
    }
    function f() {
      d();
      e.length == 0 && a.cancel(f);
    }
    function d() {
      const a = m.now();
      e.forEach(function(d) {
        !0 !== d.xf(a) && c(d);
      });
    }
    function c(a) {
      e = e.filter(function(c) {
        return c !== a;
      });
    }
    var g = 0;
    var m = aa.create();
    var e = [];
    this.d = function() {
      for (let a = e.length - 1; a >= 0; a--) e[a].stop();
      e = [];
    };
    this.D = (function() {
      function a() {}
      function c(a) {
        const b = a.target;
        const d = a.duration;
        const e = a.ca;
        let f;
        let g;
        this.W = function() {
          f = {};
          for (const c in a.G)
            b.hasOwnProperty(c) &&
              (f[c] = {
                start: D.V(a.G[c].start)
                  ? b[c]
                  : D.Gd(a.G[c].start)
                  ? a.G[c].start.call(void 0)
                  : a.G[c].start,
                end: D.V(a.G[c].end)
                  ? b[c]
                  : D.Gd(a.G[c].end)
                  ? a.G[c].end.call(void 0)
                  : a.G[c].end,
                P: D.V(a.G[c].P) ? X.Jb : a.G[c].P,
              });
          g = m.now();
        };
        this.Ya = function() {
          var a = m.now() - g;
          var a = d === 0 ? 1 : Math.min(d, a) / d;
          let c;
          for (c in f) {
            const k = f[c];
            b[c] = k.start + (k.end - k.start) * k.P(a);
          }
          e && e.call(b, a);
          return a < 1;
        };
      }
      function d(a, b, c) {
        this.jb = c;
        this.Ya = function() {
          a.call(b);
          return !1;
        };
      }
      function e(a) {
        let b;
        this.W = function(c, d) {
          b = d + a;
        };
        this.Ya = function(a, c) {
          return c < b;
        };
      }
      function f(a) {
        let b;
        this.W = function(c) {
          b = c + a;
        };
        this.Ya = function(a) {
          return a < b;
        };
      }
      function g(a) {
        this.W = function() {
          a.forEach(function(a) {
            a.start();
          });
        };
        this.Ya = function() {
          for (let b = 0; b < a.length; b++) if (a[b].Gb()) return !0;
          return !1;
        };
      }
      a.m = function(a, b) {
        return new (function() {
          function k(b, c, e, f) {
            return c ? (D.V(e) && (e = a), b.Bb(new d(c, e, f))) : b;
          }
          const m = [];
          this.Bb = function(a) {
            m.push(a);
            return this;
          };
          this.fb = function(a) {
            return this.Bb(new f(a));
          };
          this.oe = function(a) {
            return this.Bb(new e(a || 1));
          };
          this.call = function(a, b) {
            return k(this, a, b, !1);
          };
          this.jb = function(a, b) {
            return k(this, a, b, !0);
          };
          this.ia = function(b) {
            D.V(b.target) && (b.target = a);
            return this.Bb(new c(b));
          };
          this.Za = function(a) {
            return this.Bb(new g(a));
          };
          this.eg = function() {
            return this.Bb({
              Ya(a, b) {
                b.eg();
                return !0;
              },
            });
          };
          this.xa = function() {
            return new l(a, m, b);
          };
          this.start = function() {
            return this.xa().start();
          };
          this.Fg = function() {
            const a = new V();
            this.oe()
              .call(a.J)
              .xa();
            return a.L();
          };
          this.bb = function() {
            const a = this.Fg();
            this.start();
            return a;
          };
        })();
      };
      a.tc = function(c) {
        k(c).forEach(function(a) {
          a.stop();
        });
        return a.m(c, void 0);
      };
      return a;
    })();
  }
  const Z = (function() {
    var a = {
      He(a, k) {
        if (a.e) for (let f = a.e, d = 0; d < f.length; d++) k(f[d], d);
      },
      Kc(l, k) {
        if (l.e)
          for (let f = l.e, d = 0; d < f.length; d++)
            if (!1 === a.Kc(f[d], k) || !1 === k(f[d], d)) return !1;
      },
    };
    a.F = a.Kc;
    a.Lc = function(l, k) {
      if (l.e)
        for (let f = l.e, d = 0; d < f.length; d++)
          if (!1 === k(f[d], d) || !1 === a.Lc(f[d], k)) return !1;
    };
    a.Fa = function(l, k) {
      if (l.e) for (let f = l.e, d = 0; d < f.length; d++) if (!1 === a.Fa(f[d], k)) return !1;
      return k(l);
    };
    a.Nj = a.Fa;
    a.xd = function(l, k) {
      !1 !== k(l) && a.Lc(l, k);
    };
    a.Mc = function(l, k) {
      const f = [];
      a.Lc(l, function(a) {
        f.push(a);
      });
      return k ? f.filter(k) : f;
    };
    a.Ge = function(a, k) {
      for (let f = a.parent; f && !1 !== k(f); ) f = f.parent;
    };
    a.ki = function(a, k) {
      for (var f = a.parent; f && f !== k; ) f = f.parent;
      return !!f;
    };
    return a;
  })();
  var M = new (function() {
    function a(a, f) {
      const d = a.x - f.x;
      const c = a.y - f.y;
      return d * d + c * c;
    }
    function l(a, f, d) {
      for (let c = 0; c < a.length; c++) {
        const g = M.za(a[c], a[c + 1] || a[0], f, d, !0);
        if (g) return g;
      }
    }
    this.za = function(a, f, d, c, g) {
      const m = a.x;
      a = a.y;
      const e = f.x - m;
      f = f.y - a;
      let b = d.x;
      let h = d.y;
      d = c.x - b;
      const n = c.y - h;
      c = e * n - d * f;
      if (
        !(c <= 1e-12 && c >= -1e-12) &&
        ((b -= m),
        (h -= a),
        (d = (b * n - d * h) / c),
        (c = (b * f - e * h) / c),
        c >= 0 && (g || c <= 1) && d >= 0 && d <= 1)
      )
        return { x: m + e * d, y: a + f * d };
    };
    this.Jg = function(a, f, d, c) {
      const g = a.x;
      a = a.y;
      const m = f.x - g;
      f = f.y - a;
      const e = d.x;
      d = d.y;
      const b = c.x - e;
      c = c.y - d;
      const h = m * c - b * f;
      if (!(h <= 1e-12 && h >= -1e-12) && ((c = ((e - g) * c - b * (d - a)) / h), c >= 0 && c <= 1))
        return { x: g + m * c, y: a + f * c };
    };
    this.Bc = function(a, f, d) {
      for (
        var c = M.k(f, {}), g = M.k(d, {}), m, e = g.x - c.x, b = g.y - c.y, h = [], g = 0;
        g < d.length;
        g++
      )
        (m = d[g]), h.push({ x: m.x - e, y: m.y - b });
      d = [];
      m = [];
      for (g = 0; g < a.length; g++) {
        var n = a[g];
        var q = l(f, c, n);
        q ? (d.push(q), m.push(l(h, c, n))) : (d.push(null), m.push(null));
      }
      for (g = 0; g < a.length; g++)
        if (((q = d[g]), (n = m[g]), q && n)) {
          f = a[g];
          var h = c;
          var p = q.x - c.x;
          var q = q.y - c.y;
          var q = Math.sqrt(p * p + q * q);
          if (q > 1e-12) {
            var p = f.x - c.x;
            const r = f.y - c.y;
            var q = Math.sqrt(p * p + r * r) / q;
            f.x = h.x + q * (n.x - h.x);
            f.y = h.y + q * (n.y - h.y);
          } else (f.x = h.x), (f.y = h.y);
        }
      for (g = 0; g < a.length; g++) (m = a[g]), (m.x += e), (m.y += b);
    };
    this.q = function(a, f) {
      if (a.length !== 0) {
        let d;
        let c;
        let g;
        let m;
        d = c = a[0].x;
        g = m = a[0].y;
        for (let e = a.length; --e > 0; )
          (d = Math.min(d, a[e].x)),
            (c = Math.max(c, a[e].x)),
            (g = Math.min(g, a[e].y)),
            (m = Math.max(m, a[e].y));
        f.x = d;
        f.y = g;
        f.f = c - d;
        f.i = m - g;
        return f;
      }
    };
    this.A = function(a) {
      return [
        { x: a.x, y: a.y },
        { x: a.x + a.f, y: a.y },
        { x: a.x + a.f, y: a.y + a.i },
        { x: a.x, y: a.y + a.i },
      ];
    };
    this.k = function(a, f) {
      for (var d = 0, c = 0, g = a.length, m = a[0], e = 0, b = 1; b < g - 1; b++) var h = a[b];
      const n = a[b + 1];
      const l = m.y + h.y + n.y;
      const p = (h.x - m.x) * (n.y - m.y) - (n.x - m.x) * (h.y - m.y);
      var d = d + p * (m.x + h.x + n.x);
      var c = c + p * l;
      var e = e + p;
      f.x = d / (3 * e);
      f.y = c / (3 * e);
      f.ja = e / 2;
      return f;
    };
    this.re = function(a, f) {
      this.k(a, f);
      f.Ob = Math.sqrt(f.ja / Math.PI);
    };
    this.Va = function(a, f) {
      for (let d = 0; d < a.length; d++) {
        const c = a[d];
        const g = a[d + 1] || a[0];
        if ((f.y - c.y) * (g.x - c.x) - (f.x - c.x) * (g.y - c.y) < 0) return !1;
      }
      return !0;
    };
    this.Mg = function(a, f, d) {
      let c = a.x;
      let g = f.x;
      a.x > f.x && ((c = f.x), (g = a.x));
      g > d.x + d.f && (g = d.x + d.f);
      c < d.x && (c = d.x);
      if (c > g) return !1;
      let m = a.y;
      let e = f.y;
      const b = f.x - a.x;
      Math.abs(b) > 1e-7 &&
        ((e = (f.y - a.y) / b), (a = a.y - e * a.x), (m = e * c + a), (e = e * g + a));
      m > e && ((c = e), (e = m), (m = c));
      e > d.y + d.i && (e = d.y + d.i);
      m < d.y && (m = d.y);
      return m <= e;
    };
    this.se = function(k, f, d, c, g) {
      let m;
      let e;
      function b(b, c, d) {
        if (f.x === n.x && f.y === n.y) return d;
        const g = l(k, f, n);
        const p = Math.sqrt(a(g, f) / (b * b + c * c));
        return p < h
          ? ((h = p),
            (m = g.x),
            (e = g.y),
            c !== 0 ? Math.abs(e - f.y) / Math.abs(c) : Math.abs(m - f.x) / Math.abs(b))
          : d;
      }
      c = D.B(c, 0.5);
      g = D.B(g, 0.5);
      d = D.B(d, 1);
      var h = Number.MAX_VALUE;
      e = m = 0;
      var n = { x: 0, y: 0 };
      let q;
      const p = c * d;
      d = (1 - c) * d;
      c = 1 - g;
      n.x = f.x - p;
      n.y = f.y - g;
      q = b(p, g, q);
      n.x = f.x + d;
      n.y = f.y - g;
      q = b(d, g, q);
      n.x = f.x - p;
      n.y = f.y + c;
      q = b(p, c, q);
      n.x = f.x + d;
      n.y = f.y + c;
      return (q = b(d, c, q));
    };
    this.Eg = function(a, f) {
      function d(a, c, d) {
        const e = c.x;
        const f = d.x;
        c = c.y;
        d = d.y;
        const g = f - e;
        const k = d - c;
        return Math.abs(k * a.x - g * a.y - e * d + f * c) / Math.sqrt(g * g + k * k);
      }
      for (var c = a.length, g = d(f, a[c - 1], a[0]), m = 0; m < c - 1; m++) {
        const e = d(f, a[m], a[m + 1]);
        e < g && (g = e);
      }
      return g;
    };
    this.Wb = function(a, f, d) {
      let c;
      d = { x: f.x + Math.cos(d), y: f.y - Math.sin(d) };
      var g = [];
      var m = [];
      let e = a.length;
      for (c = 0; c < e; c++) {
        var b = M.Jg(a[c], a[(c + 1) % e], f, d);
        if (b && (g.push(b), m.push(c) == 2)) break;
      }
      if (g.length == 2) {
        var b = g[0];
        var g = g[1];
        const h = m[0];
        var m = m[1];
        const n = [g, b];
        for (c = h + 1; c <= m; c++) n.push(a[c]);
        for (c = [b, g]; m != h; ) (m = (m + 1) % e), c.push(a[m]);
        a = [n, c];
        e = d.x - f.x;
        c = g.x - b.x;
        e === 0 && ((e = d.y - f.y), (c = g.y - b.y));
        (e < 0 ? -1 : e > 0 ? 1 : 0) !== (c < 0 ? -1 : c > 0 ? 1 : 0) && a.reverse();
        return a;
      }
    };
    this.Aa = function(a, f, d, c) {
      c.x = a * (f.x - d.x) + d.x;
      c.y = a * (f.y - d.y) + d.y;
      return c;
    };
    this.d = a;
    this.qe = function(a, f, d) {
      if (D.Sc(f)) f = (2 * Math.PI * f) / 360;
      else {
        var c = M.q(a, {});
        switch (f) {
          case 'random':
            f = Math.random() * Math.PI * 2;
            break;
          case 'top':
            f = Math.atan2(-c.i, 0);
            break;
          case 'bottom':
            f = Math.atan2(c.i, 0);
            break;
          case 'topleft':
            f = Math.atan2(-c.i, -c.f);
            break;
          default:
            f = Math.atan2(c.i, c.f);
        }
      }
      c = M.k(a, {});
      return M.Aa(d, l(a, c, { x: c.x + Math.cos(f), y: c.y + Math.sin(f) }), c, {});
    };
    return this;
  })();
  const za = new (function() {
    function a(a, d) {
      this.face = a;
      this.kd = d;
      this.pc = this.dd = null;
    }
    function l(a, d, f) {
      this.ma = [a, d, f];
      this.C = Array(3);
      const e = d.y - a.y;
      const b = f.z - a.z;
      const h = d.x - a.x;
      d = d.z - a.z;
      const k = f.x - a.x;
      a = f.y - a.y;
      this.Oa = { x: e * b - d * a, y: d * k - h * b, z: h * a - e * k };
      this.kb = [];
      this.td = this.visible = !1;
    }
    this.S = function(c) {
      function f(b, c, d) {
        let g;
        let h;
        const k = b.ma[0];
        var m = b.Oa;
        const r = m.x;
        const s = m.y;
        var m = m.z;
        const l = Array(n);
        c = c.kb;
        g = c.length;
        for (e = 0; e < g; e++)
          (h = c[e].kd),
            (l[h.index] = !0),
            r * (h.x - k.x) + s * (h.y - k.y) + m * (h.z - k.z) < 0 && a.d(b, h);
        c = d.kb;
        g = c.length;
        for (e = 0; e < g; e++)
          (h = c[e].kd),
            !0 !== l[h.index] &&
              r * (h.x - k.x) + s * (h.y - k.y) + m * (h.z - k.z) < 0 &&
              a.d(b, h);
      }
      let m;
      let e;
      let b;
      let h;
      var n = c.length;
      for (m = 0; m < n; m++) (c[m].index = m), (c[m].$b = null);
      let q = [];
      let p;
      if (
        (p = (function() {
          function b(a, c, d, e) {
            const f = (c.y - a.y) * (d.z - a.z) - (c.z - a.z) * (d.y - a.y);
            const g = (c.z - a.z) * (d.x - a.x) - (c.x - a.x) * (d.z - a.z);
            const h = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
            return f * e.x + g * e.y + h * e.z > f * a.x + g * a.y + h * a.z
              ? new l(a, c, d)
              : new l(d, c, a);
          }
          function d(a, b, c, e) {
            function f(a, b, c) {
              a = a.ma;
              b = a[0] == b ? 0 : a[1] == b ? 1 : 2;
              return a[(b + 1) % 3] != c ? (b + 2) % 3 : b;
            }
            b.C[f(b, c, e)] = a;
            a.C[f(a, e, c)] = b;
          }
          if (n < 4) return 0;
          let e = c[0];
          let f = c[1];
          let g = c[2];
          let h = c[3];
          let k = b(e, f, g, h);
          let m = b(e, g, h, f);
          const r = b(e, f, h, g);
          const s = b(f, g, h, e);
          d(k, m, g, e);
          d(k, r, e, f);
          d(k, s, f, g);
          d(m, r, h, e);
          d(m, s, g, h);
          d(r, s, h, f);
          q.push(k, m, r, s);
          for (e = 4; e < n; e++)
            for (f = c[e], g = 0; g < 4; g++)
              (h = q[g]),
                (k = h.ma[0]),
                (m = h.Oa),
                m.x * (f.x - k.x) + m.y * (f.y - k.y) + m.z * (f.z - k.z) < 0 && a.d(h, f);
          return 4;
        })()) > 0
      ) {
        for (; p < n; ) {
          b = c[p];
          if (b.$b) {
            for (m = b.$b; m !== null; ) (m.face.visible = !0), (m = m.pc);
            var r;
            var s;
            m = 0;
            a: for (; m < q.length; m++)
              if (((h = q[m]), !1 === h.visible)) {
                var w = h.C;
                for (e = 0; e < 3; e++)
                  if (!0 === w[e].visible) {
                    r = h;
                    s = e;
                    break a;
                  }
              }
            h = [];
            var w = [];
            var t = r;
            var y = s;
            do
              if ((h.push(t), w.push(y), (y = (y + 1) % 3), !1 === t.C[y].visible)) {
                do for (m = t.ma[y], t = t.C[y], e = 0; e < 3; e++) t.ma[e] == m && (y = e);
                while (!1 === t.C[y].visible && (t !== r || y !== s));
              }
            while (t !== r || y !== s);
            let x = null;
            let A = null;
            for (m = 0; m < h.length; m++) {
              var t = h[m];
              var y = w[m];
              const B = t.C[y];
              const K = t.ma[(y + 1) % 3];
              const C = t.ma[y];
              const H = K.y - b.y;
              const Q = C.z - b.z;
              const O = K.x - b.x;
              const P = K.z - b.z;
              const F = C.x - b.x;
              const T = C.y - b.y;
              var N;
              d.length > 0
                ? ((N = d.pop()),
                  (N.ma[0] = b),
                  (N.ma[1] = K),
                  (N.ma[2] = C),
                  (N.Oa.x = H * Q - P * T),
                  (N.Oa.y = P * F - O * Q),
                  (N.Oa.z = O * T - H * F),
                  (N.kb.length = 0),
                  (N.visible = !1),
                  (N.td = !0))
                : (N = {
                    ma: [b, K, C],
                    C: Array(3),
                    Oa: {
                      x: H * Q - P * T,
                      y: P * F - O * Q,
                      z: O * T - H * F,
                    },
                    kb: [],
                    visible: !1,
                  });
              q.push(N);
              t.C[y] = N;
              N.C[1] = t;
              A !== null && ((A.C[0] = N), (N.C[2] = A));
              A = N;
              x === null && (x = N);
              f(N, t, B);
            }
            A.C[0] = x;
            x.C[2] = A;
            m = [];
            for (e = 0; e < q.length; e++)
              if (((h = q[e]), !0 === h.visible)) {
                w = h.kb;
                t = w.length;
                for (b = 0; b < t; b++)
                  (y = w[b]),
                    (x = y.dd),
                    (A = y.pc),
                    x !== null && (x.pc = A),
                    A !== null && (A.dd = x),
                    x === null && (y.kd.$b = A),
                    k.push(y);
                h.td && d.push(h);
              } else m.push(h);
            q = m;
          }
          p++;
        }
        for (m = 0; m < q.length; m++) (h = q[m]), h.td && d.push(h);
      }
      return { Je: q };
    };
    a.d = function(c, d) {
      let f;
      k.length > 0
        ? ((f = k.pop()), (f.face = c), (f.kd = d), (f.pc = null), (f.dd = null))
        : (f = new a(c, d));
      c.kb.push(f);
      const e = d.$b;
      e !== null && (e.dd = f);
      f.pc = e;
      d.$b = f;
    };
    for (var k = Array(2e3), f = 0; f < k.length; f++) k[f] = new a(null, null);
    for (var d = Array(1e3), f = 0; f < d.length; f++)
      d[f] = {
        ma: Array(3),
        C: Array(3),
        Oa: { x: 0, y: 0, z: 0 },
        kb: [],
        visible: !1,
      };
  })();
  const Aa = new (function() {
    function a(a, f, d, c, g, m, e, b) {
      const h = (a - d) * (m - b) - (f - c) * (g - e);
      return Math.abs(h) < l
        ? void 0
        : {
            x: ((a * c - f * d) * (g - e) - (a - d) * (g * b - m * e)) / h,
            y: ((a * c - f * d) * (m - b) - (f - c) * (g * b - m * e)) / h,
          };
    }
    var l = 1e-12;
    this.cb = function(k, f) {
      for (var d = k[0], c = d.x, g = d.y, m = d.x, e = d.y, b = k.length - 1; b > 0; b--)
        (d = k[b]),
          (c = Math.min(c, d.x)),
          (g = Math.min(g, d.y)),
          (m = Math.max(m, d.x)),
          (e = Math.max(e, d.y));
      if (m - c < 3 * f || e - g < 3 * f) d = void 0;
      else {
        a: {
          d = !0;
          void 0 == d && (d = !1);
          c = [];
          g = k.length;
          for (m = 0; m <= g; m++) {
            var e = k[m % g];
            var b = k[(m + 1) % g];
            var h = k[(m + 2) % g];
            var n;
            var q;
            var p;
            n = b.x - e.x;
            q = b.y - e.y;
            p = Math.sqrt(n * n + q * q);
            var r = (f * n) / p;
            var s = (f * q) / p;
            n = h.x - b.x;
            q = h.y - b.y;
            p = Math.sqrt(n * n + q * q);
            n = (f * n) / p;
            q = (f * q) / p;
            if ((e = a(e.x - s, e.y + r, b.x - s, b.y + r, b.x - q, b.y + n, h.x - q, h.y + n)))
              if (
                (c.push(e),
                (h = c.length),
                d &&
                  h >= 3 &&
                  ((e = c[h - 3]),
                  (b = c[h - 2]),
                  (h = c[h - 1]),
                  (b.x - e.x) * (h.y - e.y) - (h.x - e.x) * (b.y - e.y) < 0))
              ) {
                d = void 0;
                break a;
              }
          }
          c.shift();
          d = c.length < 3 ? void 0 : c;
        }
        if (!d)
          a: {
            c = k.slice(0);
            for (d = 0; d < k.length; d++) {
              m = k[d % k.length];
              b = k[(d + 1) % k.length];
              h = b.x - m.x;
              g = b.y - m.y;
              e = Math.sqrt(h * h + g * g);
              h = (f * h) / e;
              e = (f * g) / e;
              g = m.x - e;
              m = m.y + h;
              e = b.x - e;
              b = b.y + h;
              if (c.length != 0) {
                s = g - e;
                q = m - b;
                h = [];
                n = p = !0;
                r = void 0;
                for (r = 0; r < c.length; r++) {
                  let w = s * (m - c[r].y) - (g - c[r].x) * q;
                  w <= l && w >= -l && (w = 0);
                  h.push(w);
                  w > 0 && (p = !1);
                  w < 0 && (n = !1);
                }
                if (p) c = [];
                else if (!n) {
                  s = [];
                  for (r = 0; r < c.length; r++)
                    (q = (r + 1) % c.length),
                      (p = h[r]),
                      (n = h[q]),
                      p >= 0 && s.push(c[r]),
                      ((p > 0 && n < 0) || (p < 0 && n > 0)) &&
                        s.push(a(c[r].x, c[r].y, c[q].x, c[q].y, g, m, e, b));
                  c = s;
                }
              }
              if (c.length < 3) {
                d = void 0;
                break a;
              }
            }
            d = c;
          }
      }
      return d;
    };
    return this;
  })();
  const Ba = new (function() {
    function a(a) {
      for (var f = a[0].x, d = a[0].y, c = f, g = d, m = 1; m < a.length; m++) var e = a[m];
      var f = Math.min(f, e.x);
      var d = Math.min(d, e.y);
      var c = Math.max(c, e.x);
      var g = Math.max(g, e.y);
      a = c - f;
      g -= d;
      return [
        { x: f + 2 * a, y: d + 2 * g, f: 0 },
        { x: f + 2 * a, y: d - 2 * g, f: 0 },
        { x: f - 2 * a, y: d + 2 * g, f: 0 },
      ];
    }
    const l = 1e-12;
    this.S = function(k, f) {
      function d() {
        for (b = 0; b < p.length; b++) {
          const a = p[b];
          var c = a.ma;
          var d = c[0];
          var e = c[1];
          var f = c[2];
          var c = d.x;
          const g = d.y;
          var d = d.z;
          const h = e.x;
          const k = e.y;
          var e = e.z;
          const r = f.x;
          const m = f.y;
          var f = f.z;
          const s = c * (k - m) + h * (m - g) + r * (g - k);
          a.ha = {
            x: -(g * (e - f) + k * (f - d) + m * (d - e)) / s / 2,
            y: -(d * (h - r) + e * (r - c) + f * (c - h)) / s / 2,
          };
        }
      }
      function c(a) {
        for (b = 0; b < p.length; b++) {
          const c = p[b];
          c.ub = !M.Va(a, c.ha);
        }
      }
      function g(a, b) {
        const c = Array(b.length);
        let d;
        for (d = 0; d < c.length; d++) c[d] = [];
        for (d = 0; d < a.length; d++) {
          const e = a[d];
          if (!(e.Oa.z < 0))
            for (let f = e.C, g = 0; g < f.length; g++) {
              const h = f[g];
              if (!(h.Oa.z < 0)) {
                var k = e.ma;
                const r = k[(g + 1) % 3].index;
                var k = k[g].index;
                r > 2 && c[r - 3].push([e, h, k > 2 ? b[k - 3] : null]);
              }
            }
        }
        return c;
      }
      function m(a) {
        const b = [a[0]];
        let c = a[0][0];
        let d = a[0][1];
        const e = a.length;
        let f = 1;
        a: for (; f < e; f++)
          for (let g = 1; g < e; g++) {
            const h = a[g];
            if (h !== null) {
              if (h[1] === c)
                if ((b.unshift(h), (c = h[0]), (a[g] = null), b.length === e)) break a;
                else continue;
              if (h[0] === d && (b.push(h), (d = h[1]), (a[g] = null), b.length === e)) break a;
            }
          }
        b[0][0] != b[e - 1][1] && b.push([b[e - 1][1], b[0][0]]);
        return b;
      }
      function e(a, b, c, d) {
        let e = [];
        let f = [];
        const g = c.length;
        let h;
        const k = b.length;
        let r = 0;
        let m = -1;
        let s = -1;
        let n = -1;
        let p = null;
        let q = d;
        for (d = 0; d < g; d++) {
          const w = (q + 1) % g;
          let t = c[q][0];
          const E = c[w][0];
          if (M.d(t.ha, E.ha) > l)
            if (t.ub && E.ub) {
              var I = [];
              const J = [];
              for (h = 0; h < k; h++) {
                m = (r + 1) % k;
                if ((p = M.za(b[r], b[m], t.ha, E.ha, !1))) if ((J.push(r), I.push(p) === 2)) break;
                r = m;
              }
              if (I.length === 2) {
                m = I[1];
                p = M.d(t.ha, I[0]);
                m = M.d(t.ha, m);
                t = p < m ? 0 : 1;
                p = p < m ? 1 : 0;
                m = J[t];
                s === -1 && (s = m);
                if (n !== -1) for (; m != n; ) (n = (n + 1) % k), e.push(b[n]), f.push(null);
                e.push(I[t], I[p]);
                f.push(c[q][2], null);
                n = J[p];
              }
            } else if (t.ub && !E.ub)
              for (h = 0; h < k; h++) {
                m = (r + 1) % k;
                if ((p = M.za(b[r], b[m], t.ha, E.ha, !1))) {
                  if (n !== -1) for (I = n; r != I; ) (I = (I + 1) % k), e.push(b[I]), f.push(null);
                  e.push(p);
                  f.push(c[q][2]);
                  s === -1 && (s = r);
                  break;
                }
                r = m;
              }
            else if (!t.ub && E.ub)
              for (h = 0; h < k; h++) {
                m = (r + 1) % k;
                if ((p = M.za(b[r], b[m], t.ha, E.ha, !1))) {
                  e.push(t.ha, p);
                  f.push(c[q][2], null);
                  n = r;
                  break;
                }
                r = m;
              }
            else e.push(t.ha), f.push(c[q][2]);
          q = w;
        }
        if (e.length == 0) f = e = null;
        else if (n !== -1) for (; s != n; ) (n = (n + 1) % k), e.push(b[n]), f.push(null);
        a.o = e;
        a.C = f;
      }
      if (k.length === 1) (k[0].o = f.slice(0)), (k[0].C = []);
      else {
        var b;
        let h;
        h = a(f);
        let n = [];
        let q;
        for (b = 0; b < h.length; b++)
          (q = h[b]), n.push({ x: q.x, y: q.y, z: q.x * q.x + q.y * q.y - q.f });
        for (b = 0; b < k.length; b++)
          (q = k[b]), (q.o = null), n.push({ x: q.x, y: q.y, z: q.x * q.x + q.y * q.y - q.f });
        var p = za.S(n).Je;
        d();
        c(f);
        n = g(p, k);
        for (b = 0; b < k.length; b++)
          if (((q = n[b]), q.length !== 0)) {
            const r = k[b];
            q = m(q);
            const s = q.length;
            var w = -1;
            for (h = 0; h < s; h++) q[h][0].ub && (w = h);
            if (w >= 0) e(r, f, q, w);
            else {
              var w = [];
              const t = [];
              for (h = 0; h < s; h++)
                M.d(q[h][0].ha, q[(h + 1) % s][0].ha) > l && (w.push(q[h][0].ha), t.push(q[h][2]));
              r.o = w;
              r.C = t;
            }
            r.o && r.o.length < 3 && ((r.o = null), (r.C = null));
          }
      }
    };
    this.zc = function(k, f) {
      let d;
      let c;
      var g = !1;
      const m = k.length;
      for (c = 0; c < m; c++) (d = k[c]), d.o === null && (g = !0), (d.pe = d.f);
      if (g) {
        var g = a(f);
        var e = [];
        let b;
        let h;
        c = k.length;
        for (d = 0; d < g.length; d++)
          (b = g[d]), e.push({ x: b.x, y: b.y, z: b.x * b.x + b.y * b.y });
        for (d = 0; d < c; d++) (b = k[d]), e.push({ x: b.x, y: b.y, z: b.x * b.x + b.y * b.y });
        b = za.S(e).Je;
        g = Array(c);
        for (d = 0; d < c; d++) g[d] = {};
        e = b.length;
        for (d = 0; d < e; d++)
          if (((h = b[d]), h.Oa.z > 0)) {
            var n = h.ma;
            const l = n.length;
            for (h = 0; h < l - 1; h++) {
              const p = n[h].index - 3;
              var r = n[h + 1].index - 3;
              p >= 0 && r >= 0 && ((g[p][r] = !0), (g[r][p] = !0));
            }
            h = n[0].index - 3;
            r >= 0 && h >= 0 && ((g[r][h] = !0), (g[h][r] = !0));
          }
        for (d = 0; d < c; d++) {
          h = g[d];
          b = k[d];
          var r = Number.MAX_VALUE;
          var e = null;
          var s;
          for (s in h) (h = k[s]), (n = M.d(b, h)), r > n && ((r = n), (e = h));
          b.Uj = e;
          b.vf = Math.sqrt(r);
        }
        for (c = 0; c < m; c++)
          (d = k[c]), (s = Math.min(Math.sqrt(d.f), 0.95 * d.vf)), (d.f = s * s);
        this.S(k, f);
        for (c = 0; c < m; c++)
          (d = k[c]),
            d.pe !== d.f && d.uc > 0 && ((s = Math.min(d.uc, d.pe - d.f)), (d.f += s), (d.uc -= s));
      }
    };
  })();
  const Ca = new (function() {
    this.Dg = function(a) {
      a = a.e;
      for (var l = 0, k = a.length, f = 0; f < k; f++) {
        let d = a[f];
        if (d.o) {
          let c = d.x;
          const g = d.y;
          M.k(d.o, d);
          c -= d.x;
          d = g - d.y;
          d = (c > 0 ? c : -c) + (d > 0 ? d : -d);
          l < d && (l = d);
        }
      }
      return l;
    };
    this.ya = function(a, l) {
      const k = a.e;
      let f;
      let d;
      let c;
      let g;
      switch (l) {
        case 'random':
          return a.e[Math.floor(k.length * Math.random())];
        case 'topleft':
          f = k[0];
          var m = f.x + f.y;
          for (g = 1; g < k.length; g++) (d = k[g]), (c = d.x + d.y), c < m && ((m = c), (f = d));
          return f;
        case 'bottomright':
          f = k[0];
          m = f.x + f.y;
          for (g = 1; g < k.length; g++) (d = k[g]), (c = d.x + d.y), c > m && ((m = c), (f = d));
          return f;
        default:
          f = k[0];
          c = d = M.d(a, f);
          for (g = k.length - 1; g >= 1; g--)
            (m = k[g]), (d = M.d(a, m)), d < c && ((c = d), (f = m));
          return f;
      }
    };
    this.Ja = function(a, l, k) {
      let f = a.e;
      if (f[0].C) {
        var d = f.length;
        for (a = 0; a < d; a++) (f[a].ld = !1), (f[a].ic = 0);
        var d = [];
        let c;
        let g;
        g = c = 0;
        d[c++] = l || f[0];
        for (l = l.ic = 0; g < c; )
          if (((f = d[g++]), !f.ld && f.C)) {
            k(f, l++, f.ic);
            f.ld = !0;
            const m = f.C;
            const e = m.length;
            for (a = 0; a < e; a++) {
              const b = m[a];
              b && !0 !== b.ld && (b.ic === 0 && (b.ic = f.ic + 1), (d[c++] = b));
            }
          }
      } else for (a = 0; a < f.length; a++) k(f[a], a, 1);
    };
  })();
  var G = (function() {
    function a(a, e, h, r, s, p, w, P) {
      const F = D.extend({}, m, a);
      a.lineHeight < 1 && (a.lineHeight = 1);
      a = F.fontFamily;
      const T = `${F.fontStyle} ${F.fontVariant} ${F.fontWeight}`;
      const N = F.sb;
      const U = F.Zc;
      const u = `${T} ${a}`;
      F.Ne = u;
      const z = { la: !1, mc: 0, fontSize: 0 };
      e.save();
      e.font = `${T} ${x}px ${a}`;
      e.textBaseline = 'middle';
      e.textAlign = 'center';
      l(e, F);
      h = h.trim();
      t.text = h;
      d(r, s, p, y);
      if (
        /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(h)
      )
        f(t), k(e, t, u), c(F, t, y, U, N, !0, z);
      else if ((k(e, t, u), c(F, t, y, U, N, !1, z), !z.la && (w && (f(t), k(e, t, u)), P || w)))
        P && (z.ec = !0), c(F, t, y, U, U, !0, z);
      if (z.la) {
        let L = '';
        let E = 0;
        let I = Number.MAX_VALUE;
        let J = Number.MIN_VALUE;
        g(
          F,
          t,
          z.mc,
          z.fontSize,
          y,
          z.ec,
          function(a, c) {
            L.length > 0 && c === b && (L += b);
            L += a;
          },
          function(a, b, c, d, f) {
            d === q && (L += n);
            e.save();
            e.translate(p.x, b);
            a = z.fontSize / x;
            e.scale(a, a);
            e.fillText(L, 0, 0);
            e.restore();
            L = c;
            E < f && (E = f);
            I > b && (I = b);
            J < b && (J = b);
          },
        );
        z.da = {
          x: p.x - E / 2,
          y: I - z.fontSize / 2,
          f: E,
          i: J - I + z.fontSize,
        };
        e.restore();
      } else e.clear && e.clear();
      return z;
    }
    function l(a, c) {
      const d = c.Ne;
      let f = e[d];
      void 0 === f && ((f = {}), (e[d] = f));
      f[b] = a.measureText(b).width;
      f[h] = a.measureText(h).width;
    }
    function k(a, b, c) {
      let d;
      let f = b.text.split(/(\n|[ \f\r\t\v\u2028\u2029]+|\u00ad+|\u200b+)/);
      const g = [];
      const h = [];
      let k = f.length >>> 1;
      for (d = 0; d < k; d++) g.push(f[2 * d]), h.push(f[2 * d + 1]);
      2 * d < f.length && (g.push(f[2 * d]), h.push(void 0));
      c = e[c];
      for (d = 0; d < g.length; d++)
        (f = g[d]), (k = c[f]), void 0 === k && ((k = a.measureText(f).width), (c[f] = k));
      b.md = g;
      b.lg = h;
    }
    function f(a) {
      for (
        var c = a.text.split(/\s+/),
          d = [],
          e = {
            '.': !0,
            ',': !0,
            ';': !0,
            '?': !0,
            '!': !0,
            ':': !0,
            '\u3002': !0,
          },
          f = 0;
        f < c.length;
        f++
      ) {
        const g = c[f];
        if (g.length > 3) {
          for (var h = '', h = h + g.charAt(0), h = h + g.charAt(1), k = 2; k < g.length - 2; k++) {
            const r = g.charAt(k);
            e[r] || (h += p);
            h += r;
          }
          h += p;
          h += g.charAt(g.length - 2);
          h += g.charAt(g.length - 1);
          d.push(h);
        } else d.push(g);
      }
      a.text = d.join(b);
    }
    function d(a, b, c, d) {
      for (var e, f, g = 0; g < a.length; g++) a[g].y === b.y && (void 0 === e ? (e = g) : (f = g));
      void 0 === f && (f = e);
      e !== f && a[f].x < a[e].x && ((g = e), (e = f), (f = g));
      d.o = a;
      d.q = b;
      d.vd = c;
      d.tf = e;
      d.uf = f;
    }
    function c(a, b, c, d, e, f, h) {
      const k = a.lineHeight;
      const r = Math.max(a.eb, 0.001);
      let m = a.tb;
      const n = b.md;
      let s = c.vd;
      let p = c.q;
      let l = void 0;
      let q = void 0;
      switch (a.verticalAlign) {
        case 'top':
          s = p.y + p.i - s.y;
          break;
        case 'bottom':
          s = s.y - p.y;
          break;
        default:
          s = 2 * Math.min(s.y - p.y, p.y + p.i - s.y);
      }
      m = Math.min(s, m * c.q.i);
      if (m <= 0) h.la = !1;
      else {
        s = d;
        e = Math.min(e, m);
        p = Math.min(1, m / Math.max(20, b.md.length));
        do {
          var w = (s + e) / 2;
          const t = Math.min(n.length, Math.floor((m + w * (k - 1 - 2 * r)) / (w * k)));
          let y = void 0;
          if (t > 0) {
            let x = 1;
            let Y = t;
            do {
              const $ = Math.floor((x + Y) / 2);
              if (g(a, b, $, w, c, f && w === d && $ === t, null, null)) {
                if (((Y = l = y = $), x === Y)) break;
              } else if (((x = $ + 1), x > Y)) break;
            } while (1);
          }
          void 0 !== y ? (s = q = w) : (e = w);
        } while (e - s > p);
        void 0 === q
          ? ((h.la = !1), (h.fontSize = 0))
          : ((h.la = !0), (h.fontSize = q), (h.mc = l), (h.ec = f && w === s));
      }
    }
    function g(a, c, d, f, g, k, m, n) {
      let p = a.pb;
      const l = f * (a.lineHeight - 1);
      let q = a.verticalAlign;
      let t = Math.max(a.eb, 0.001);
      a = e[a.Ne];
      const y = c.md;
      c = c.lg;
      let z = g.o;
      let L = g.vd;
      var E = g.tf;
      var I = g.uf;
      let J;
      switch (q) {
        case 'top':
          g = L.y + f / 2 + f * t;
          J = 1;
          break;
        case 'bottom':
          g = L.y - (f * d + l * (d - 1)) + f / 2 - f * t;
          J = -1;
          break;
        default:
          (g = L.y - ((f * (d - 1)) / 2 + (l * (d - 1)) / 2)), (J = 1);
      }
      q = g;
      for (t = 0; t < d; t++)
        (r[2 * t] = g - f / 2), (r[2 * t + 1] = g + f / 2), (g += J * f), (g += J * l);
      for (; s.length < r.length; ) s.push(Array(2));
      t = r;
      g = 2 * d;
      J = s;
      for (var R = z.length, Y = E, E = (E - 1 + R) % R, $ = I, I = (I + 1) % R, W = 0; W < g; ) {
        for (var ea = t[W], ba = z[E]; ba.y < ea; ) (Y = E), (E = (E - 1 + R) % R), (ba = z[E]);
        for (var ca = z[I]; ca.y < ea; ) ($ = I), (I = (I + 1) % R), (ca = z[I]);
        const la = z[Y];
        const ma = z[$];
        var ca = ma.x + ((ca.x - ma.x) * (ea - ma.y)) / (ca.y - ma.y);
        J[W][0] = la.x + ((ba.x - la.x) * (ea - la.y)) / (ba.y - la.y);
        J[W][1] = ca;
        W++;
      }
      for (t = 0; t < d; t++)
        (z = 2 * t),
          (g = L.x),
          (J = g - s[z][0]),
          (R = s[z][1] - g),
          (J = J < R ? J : R),
          (R = g - s[z + 1][0]),
          (z = s[z + 1][1] - g),
          (z = R < z ? R : z),
          (w[t] = 2 * (J < z ? J : z) - p * f);
      Y = (a[b] * f) / x;
      J = (a[h] * f) / x;
      p = 0;
      E = w[p];
      L = 0;
      z = void 0;
      for (t = 0; t < y.length; t++) {
        g = y[t];
        $ = c[t];
        R = (a[g] * f) / x;
        if (L + R < E && y.length - t >= d - p && z != '\n')
          (L += R), $ === ' ' && (L += Y), m && m(g, z);
        else {
          if (R > E && (p !== d - 1 || !k)) return !1;
          if (p + 1 >= d) {
            if (k) {
              d = E - L - J;
              if (d > J || R > J)
                (d = Math.floor((g.length * d) / R)), d > 0 && m && m(g.substring(0, d), z);
              m && m(h, void 0);
              n && n(p, q, g, z, L);
              return !0;
            }
            return !1;
          }
          p++;
          n && n(p, q, g, z, L);
          q += f;
          q += l;
          E = w[p];
          L = R;
          $ === ' ' && (L += Y);
          if (R > E && (p !== d || !k)) return !1;
        }
        z = $;
      }
      n && n(p, q, void 0, void 0, L);
      return !0;
    }
    var m = {
      sb: 72,
      Zc: 0,
      lineHeight: 1.05,
      pb: 1,
      eb: 0.5,
      tb: 0.9,
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      verticalAlign: 'center',
    };
    var e = {};
    var b = ' ';
    var h = '\u2026';
    var n = '\u2010';
    var q = '\u00ad';
    var p = '\u200b';
    var r = [];
    var s = [];
    var w = [];
    var t = { text: '', md: void 0, lg: void 0 };
    var y = { o: void 0, q: void 0, vd: void 0, tf: 0, uf: 0 };
    var x = 100;
    return {
      Le: a,
      xe(b, c, d, e, f, g, h, k, m, r, s, n) {
        let p;
        let l = 0;
        let q = 0;
        d = d.toString().trim();
        !n &&
          m.result &&
          d === m.sg &&
          Math.abs(r - m.ue) / r <= s &&
          ((p = m.result),
          p.la &&
            ((l = g.x - m.zg),
            (q = g.y - m.Ag),
            (s = m.jd),
            c.save(),
            c.translate(l, q),
            s.Ta(c),
            c.restore()));
        p ||
          ((s = m.jd),
          s.clear(),
          (p = a(b, s, d, e, f, g, h, k)),
          p.la && s.Ta(c),
          (m.ue = r),
          (m.zg = g.x),
          (m.Ag = g.y),
          (m.result = p),
          (m.sg = d));
        return p.la
          ? {
              la: !0,
              mc: p.mc,
              fontSize: p.fontSize,
              da: { x: p.da.x + l, y: p.da.y + q, f: p.da.f, i: p.da.i },
              ec: p.ec,
            }
          : { la: !1 };
      },
      yi() {
        return {
          ue: 0,
          zg: 0,
          Ag: 0,
          result: void 0,
          jd: new ga(),
          sg: void 0,
        };
      },
      Ea: m,
    };
  })();
  const Da = new (function() {
    function a(a, d) {
      return function(c, g, m, e) {
        function b(a, c, e, f, g) {
          if (a.length != 0) {
            const r = a.shift();
            let s = k(r);
            let n;
            let p;
            let l;
            let q;
            if (d(f, g)) {
              n = c;
              l = s / f;
              do {
                s = r.shift();
                p = s.vc;
                q = p / l;
                p = s;
                var P = e;
                var F = l;
                p.x = n + q / 2;
                p.y = P + F / 2;
                m && h(s, n, e, q, l);
                n += q;
              } while (r.length > 0);
              return b(a, c, e + l, f, g - l);
            }
            n = e;
            q = s / g;
            do
              (s = r.shift()),
                (p = s.vc),
                (l = p / q),
                (p = s),
                (P = n),
                (F = l),
                (p.x = c + q / 2),
                (p.y = P + F / 2),
                m && h(s, c, n, q, l),
                (n += l);
            while (r.length > 0);
            return b(a, c + q, e, f - q, g);
          }
        }
        function h(a, b, c, d, e) {
          a.o = [
            { x: b, y: c },
            { x: b + d, y: c },
            { x: b + d, y: c + e },
            { x: b, y: c + e },
          ];
        }
        const n = g.x;
        const l = g.y;
        const p = g.f;
        g = g.i;
        if (c.length != 0)
          if (c.length == 1)
            (c[0].x = n + p / 2), (c[0].y = l + g / 2), (c[0].Ed = 0), m && h(c[0], n, l, p, g);
          else {
            c = c.slice(0);
            for (var r = 0, s = 0; s < c.length; s++) r += c[s].T;
            r = (p * g) / r;
            for (s = 0; s < c.length; s++) c[s].vc = c[s].T * r;
            e = a(c, p, g, [[c.shift()]], e);
            b(e, n, l, p, g);
          }
      };
    }
    function l(a, d, c, g) {
      function m(a) {
        return Math.max(Math.pow((h * a) / b, c), Math.pow(b / (h * a), g));
      }
      let e = k(a);
      var b = e * e;
      var h = d * d;
      d = m(a[0].vc);
      for (e = 1; e < a.length; e++) d = Math.max(d, m(a[e].vc));
      return d;
    }
    function k(a) {
      for (var d = 0, c = 0; c < a.length; c++) d += a[c].vc;
      return d;
    }
    this.te = a(
      function(a, d, c, g, m) {
        m = Math.pow(2, m);
        for (let e = 1 / m, b = d < c; a.length > 0; ) {
          const h = g[g.length - 1];
          const n = a.shift();
          let q = b ? d : c;
          const p = b ? m : e;
          const r = b ? e : m;
          const s = l(h, q, p, r);
          h.push(n);
          q = l(h, q, p, r);
          s < q && (h.pop(), g.push([n]), b ? (c -= k(h) / d) : (d -= k(h) / c), (b = d < c));
        }
        return g;
      },
      function(a, d) {
        return a < d;
      },
    );
    this.Xb = a(
      function(a, d, c, g, k) {
        function e(a) {
          if (g.length > 1) {
            for (var c = g[g.length - 1], e = g[g.length - 2].slice(0), f = 0; f < c.length; f++)
              e.push(c[f]);
            l(e, d, b, h) < a && g.splice(-2, 2, e);
          }
        }
        for (var b = Math.pow(2, k), h = 1 / b; a.length > 0; ) {
          c = g[g.length - 1];
          k = l(c, d, b, h);
          if (a.length == 0) return;
          const n = a.shift();
          c.push(n);
          const q = l(c, d, b, h);
          k < q && (c.pop(), e(k), g.push([n]));
        }
        e(l(g[g.length - 1], d, b, h));
        return g;
      },
      function() {
        return !0;
      },
    );
  })();
  function Ea(a) {
    const l = {};
    const k = a.Ud;
    let f;
    a.c.j('model:loaded', function(a) {
      f = a;
    });
    this.H = function() {
      a.c.p('api:initialized', this);
    };
    this.Dc = function(a, c, f, m) {
      this.pd(l, c);
      this.qd(l, c);
      this.od(l, c, !1);
      m && m(l);
      a(k, l, f);
    };
    this.ud = function(a, c, g, k, e, b, h) {
      if (a) {
        for (a = c.length - 1; a >= 0; a--) {
          const n = c[a];
          const l = D.extend({ group: n.group }, e);
          l[g] = k(n);
          b(l);
        }
        c.length > 0 &&
          h(
            D.extend(
              {
                groups: Z.Mc(f, k).map(function(a) {
                  return a.group;
                }),
              },
              e,
            ),
          );
      }
    };
    this.qd = function(a, c) {
      a.selected = c.selected;
      a.hovered = c.Eb;
      a.open = c.open;
      a.openness = c.Lb;
      a.exposed = c.U;
      a.exposure = c.ka;
      a.transitionProgress = c.ua;
      a.revealed = !c.ba.Na();
      a.browseable = c.Qa ? c.M : void 0;
      a.visible = c.ea;
      a.labelDrawn = c.ra && c.ra.la;
      return a;
    };
    this.pd = function(a, c) {
      const f = c.parent;
      a.group = c.group;
      a.parent = f && f.group;
      a.weightNormalized = c.xg;
      a.level = c.R - 1;
      a.siblingCount = f && f.e.length;
      a.hasChildren = !c.empty();
      a.index = c.index;
      a.indexByWeight = c.Ed;
      a.description = c.description;
      a.attribution = c.na;
      return a;
    };
    this.od = function(a, c, f) {
      a.polygonCenterX = c.K.x;
      a.polygonCenterY = c.K.y;
      a.polygonArea = c.K.ja;
      a.boxLeft = c.q.x;
      a.boxTop = c.q.y;
      a.boxWidth = c.q.f;
      a.boxHeight = c.q.i;
      if (c.ra && c.ra.la) {
        const k = c.ra.da;
        a.labelBoxLeft = k.x;
        a.labelBoxTop = k.y;
        a.labelBoxWidth = k.f;
        a.labelBoxHeight = k.i;
        a.labelFontSize = c.ra.fontSize;
      }
      f &&
        c.aa &&
        ((a.polygon = c.aa.map(function(a) {
          return { x: a.x, y: a.y };
        })),
        (a.neighbors =
          c.C &&
          c.C.map(function(a) {
            return a && a.group;
          })));
      return a;
    };
  }
  var na = new (function() {
    const a = window.console;
    this.Pa = function(a) {
      throw `FoamTree: ${a}`;
    };
    this.info = function(l) {
      a.info(`FoamTree: ${l}`);
    };
    this.warn = function(l) {
      a.warn(`FoamTree: ${l}`);
    };
  })();
  function Fa(a) {
    function l(b, c) {
      b.e = [];
      b.La = !0;
      const e = d(c);
      let f = 0;
      if (a.Ua == 'flattened' && c.length > 0 && b.R > 0) {
        var g = c.reduce(function(a, b) {
          return a + D.B(b.weight, 1);
        }, 0);
        var h = k(b.group, !1);
        h.description = !0;
        h.T = g * a.cc;
        h.index = f++;
        h.parent = b;
        h.R = b.R + 1;
        h.id += '_d';
        b.e.push(h);
      }
      for (g = 0; g < c.length; g++) {
        let r = c[g];
        var h = D.B(r.weight, 1);
        if (h <= 0)
          if (a.uj) h = 0.9 * e;
          else continue;
        r = k(r, !0);
        r.T = h;
        r.index = f;
        r.parent = b;
        r.R = b.R + 1;
        b.e.push(r);
        f++;
      }
    }
    function k(a, b) {
      const c = new Ga();
      f(a);
      c.id = a.__id;
      c.group = a;
      b && (n[a.__id] = c);
      return c;
    }
    function f(a) {
      D.Q(a, '__id') ||
        (Object.defineProperty(a, '__id', {
          enumerable: !1,
          configurable: !1,
          writable: !1,
          value: h,
        }),
        h++);
    }
    function d(a) {
      for (var b = Number.MAX_VALUE, c = 0; c < a.length; c++) {
        const d = a[c].weight;
        d > 0 && b > d && (b = d);
      }
      b === Number.MAX_VALUE && (b = 1);
      return b;
    }
    function c(a) {
      if (!a.empty()) {
        a = a.e;
        let b = 0;
        let c;
        for (c = a.length - 1; c >= 0; c--) {
          var d = a[c].T;
          b < d && (b = d);
        }
        for (c = a.length - 1; c >= 0; c--) (d = a[c]), (d.xg = d.T / b);
      }
    }
    function g(a) {
      if (!a.empty()) {
        a = a.e.slice(0).sort(function(a, b) {
          return a.T < b.T ? 1 : a.T > b.T ? -1 : a.index - b.index;
        });
        for (let b = 0; b < a.length; b++) a[b].Ed = b;
      }
    }
    function m() {
      for (
        let c = b.e.reduce(function(a, b) {
            return a + b.T;
          }, 0),
          d = 0;
        d < b.e.length;
        d++
      ) {
        const e = b.e[d];
        e.na && (e.T = Math.max(0.025, a.Ug) * c);
      }
    }
    const e = this;
    var b = new Ga();
    let h;
    let n;
    let q;
    let p;
    let r;
    this.H = function() {
      return b;
    };
    this.S = function(b) {
      const d = b.group.groups;
      const e = a.qi;
      return !b.e && !b.description && d && d.length > 0 && r + d.length <= e
        ? ((r += d.length), l(b, d), c(b), g(b), !0)
        : !1;
    };
    this.Y = function(a) {
      function d(a) {
        const b = a.groups;
        if (b)
          for (let c = 0; c < b.length; c++) {
            const e = b[c];
            f(e);
            let g = e.__id;
            n[g] = null;
            p[g] = a;
            g = e.id;
            D.V(g) || (q[g] = e);
            d(e);
          }
      }
      function e(a, b) {
        if (!a) return b;
        let c = Math.max(b, a.__id || 0);
        const d = a.groups;
        if (d && d.length > 0) for (let f = d.length - 1; f >= 0; f--) c = e(d[f], c);
        return c;
      }
      b.group = a;
      b.Ca = !1;
      b.M = !1;
      b.Qa = !1;
      b.open = !0;
      b.Lb = 1;
      h = e(a, 0) + 1;
      n = {};
      q = {};
      p = {};
      r = 0;
      a && (f(a), (n[a.__id] = b), D.V(a.id) || (q[a.id] = a), d(a));
      l(b, (a && a.groups) || []);
      (function(a) {
        if (!a.empty()) {
          const b = k({ attribution: !0 });
          b.index = a.e.length;
          b.parent = a;
          b.R = a.R + 1;
          b.na = !0;
          a.e.push(b);
        }
      })(b);
      c(b);
      m();
      g(b);
    };
    this.update = function() {
      Z.Fa(b, function(a) {
        if (!a.empty()) {
          a = a.e;
          for (
            let b = d(
                a.map(function(a) {
                  return a.group;
                }),
              ),
              c = 0;
            c < a.length;
            c++
          ) {
            const e = a[c];
            e.T = e.group.weight > 0 ? e.group.weight : 0.9 * b;
          }
        }
      });
      c(b);
      m();
      g(b);
    };
    this.k = function(a) {
      return (function() {
        if (D.V(a) || D.nf(a)) return [];
        if (Array.isArray(a)) return a.map(e.d, e);
        if (D.jc(a)) {
          if (D.Q(a, '__id')) return [e.d(a)];
          if (D.Q(a, 'all')) {
            const c = [];
            Z.F(b, function(a) {
              c.push(a);
            });
            return c;
          }
          if (D.Q(a, 'groups')) return e.k(a.groups);
        }
        return [e.d(a)];
      })().filter(function(a) {
        return void 0 !== a;
      });
    };
    this.d = function(a) {
      if (D.jc(a) && D.Q(a, '__id')) {
        if (((a = a.__id), D.Q(n, a))) {
          if (n[a] === null) {
            for (var b = p[a], c = []; b; ) {
              b = b.__id;
              c.push(b);
              if (n[b]) break;
              b = p[b];
            }
            for (b = c.length - 1; b >= 0; b--) this.S(n[c[b]]);
          }
          return n[a];
        }
      } else if (D.Q(q, a)) return this.d(q[a]);
    };
    this.A = function(a, b, c) {
      return {
        e: e.k(a),
        Ia: D.B(a && a[b], !0),
        Ha: D.B(a && a.keepPrevious, c),
      };
    };
  }
  function Ha(a, l, k) {
    const f = {};
    l.Ha &&
      Z.F(a, function(a) {
        k(a) && (f[a.id] = a);
      });
    a = l.e;
    l = l.Ia;
    for (let d = a.length - 1; d >= 0; d--) {
      const c = a[d];
      f[c.id] = l ? c : void 0;
    }
    const g = [];
    D.Ga(f, function(a) {
      void 0 !== a && g.push(a);
    });
    return g;
  }
  function Ia(a) {
    function l(a, b) {
      const c = a.ka;
      b.opacity = 1;
      b.Ka = 1;
      b.va = c < 0 ? 1 - (p.ei / 100) * c : 1;
      b.wa = c < 0 ? 1 - (p.fi / 100) * c : 1;
      b.fa = c < 0 ? 1 + 0.5 * c : 1;
    }
    function k(a) {
      a = a.ka;
      return Math.max(0.001, a === 0 ? 1 : 1 + a * (p.Xa - 1));
    }
    function f(a, b) {
      for (
        var c = a.reduce(function(a, b) {
            a[b.id] = b;
            return a;
          }, {}),
          d = a.length - 1;
        d >= 0;
        d--
      )
        Z.F(a[d], function(a) {
          c[a.id] = void 0;
        });
      const e = [];
      D.Ga(c, function(a) {
        a &&
          Z.Ge(a, function(a) {
            a.open || e.push(a);
          });
      });
      const f = [];
      D.Ga(c, function(a) {
        a && a.open && f.push(a);
      });
      d = [];
      e.length !== 0 && d.push(x.Kb({ e, Ia: !0, Ha: !0 }, b, !0));
      return pa(d);
    }
    function d(d, f, k, n) {
      const l = m();
      if (d.length === 0 && !l) return new V().J().L();
      const q = d.reduce(function(a, b) {
        a[b.id] = !0;
        return a;
      }, {});
      const s = [];
      d = [];
      if (
        A.reduce(function(a, b) {
          return (
            a ||
            (q[b.id] && (!b.U || b.ka !== 1)) ||
            (!q[b.id] && !b.parent.U && (b.U || b.ka !== -1))
          );
        }, !1)
      ) {
        const x = [];
        const C = {};
        A.forEach(function(a) {
          q[a.id] &&
            (a.U || s.push(a),
            (a.U = !0),
            Z.Fa(a, function(a) {
              x.push(b(a, 1));
              C[a.id] = !0;
            }));
        });
        x.length > 0
          ? (Z.F(r, function(a) {
              q[a.id] || (a.U && s.push(a), (a.U = !1));
              C[a.id] || x.push(b(a, -1));
            }),
            d.push(
              y.D.m({})
                .Za(x)
                .call(h)
                .bb(),
            ),
            c(q),
            d.push(g(l)),
            k && (t.sc(B, p.Qc, p.Wa, X.pa(p.gc)), t.Qb()))
          : (d.push(e(k)),
            f &&
              Z.F(r, function(a) {
                a.U && s.push(a);
              }));
      }
      return pa(d).N(function() {
        w.ud(
          f,
          s,
          'exposed',
          function(a) {
            return a.U;
          },
          { indirect: n },
          a.options.Ef,
          a.options.Df,
        );
      });
    }
    function c(a) {
      A.reduce(
        n(!0, void 0, function(b) {
          return b.U || a[b.id];
        }),
        q(B),
      );
      B.x -= (B.f * (p.Xa - 1)) / 2;
      B.y -= (B.i * (p.Xa - 1)) / 2;
      B.f *= p.Xa;
      B.i *= p.Xa;
    }
    function g(b) {
      if (b || !t.Rd())
        return y.D.m(s)
          .ia({
            duration: 0.7 * p.Wa,
            G: {
              x: { end: B.x + B.f / 2, P: X.pa(p.gc) },
              y: { end: B.y + B.i / 2, P: X.pa(p.gc) },
            },
            ca() {
              a.c.p('foamtree:dirty', !0);
            },
          })
          .bb();
      s.x = B.x + B.f / 2;
      s.y = B.y + B.i / 2;
      return new V().J().L();
    }
    function m() {
      return (
        !!A &&
        A.reduce(function(a, b) {
          return a || b.ka !== 0;
        }, !1)
      );
    }
    function e(a) {
      const c = [];
      const d = [];
      Z.F(r, function(a) {
        a.ka !== 0 &&
          d.push(
            b(a, 0, function() {
              this.U = !1;
            }),
          );
      });
      c.push(
        y.D.m({})
          .Za(d)
          .bb(),
      );
      t.content(0, 0, K, C);
      a && (c.push(t.reset(p.Wa, X.pa(p.gc))), t.Qb());
      return pa(c);
    }
    function b(b, c, d) {
      const e = y.D.m(b);
      b.ka === 0 &&
        c !== 0 &&
        e.call(function() {
          this.Cc(H);
          this.Ab(l);
        });
      e.ia({
        duration: p.Wa,
        G: { ka: { end: c, P: X.pa(p.gc) } },
        ca() {
          r.I = !0;
          r.Ma = !0;
          a.c.p('foamtree:dirty', !0);
        },
      });
      c === 0 &&
        e.call(function() {
          this.Nd();
          this.nc();
          this.fd(H);
          this.ed(l);
        });
      return e.call(d).xa();
    }
    function h() {
      var a = r.e.reduce(n(!1, H.Ub, void 0), q({})).da;
      const b = p.Qc;
      const c = Math.min(a.x, B.x - B.f * b);
      const d = Math.max(a.x + a.f, B.x + B.f * (1 + b));
      const e = Math.min(a.y, B.y - B.i * b);
      var a = Math.max(a.y + a.i, B.y + B.i * (1 + b));
      t.content(c, e, d - c, a - e);
    }
    function n(a, b, c) {
      const d = {};
      return function(e, f) {
        if (!c || c(f)) {
          for (var g = a ? f.aa || f.o : f.o, h, k = g.length - 1; k >= 0; k--)
            (h = void 0 !== b ? b(f, g[k], d) : g[k]),
              (e.$c = Math.min(e.$c, h.x)),
              (e.Od = Math.max(e.Od, h.x)),
              (e.ad = Math.min(e.ad, h.y)),
              (e.Pd = Math.max(e.Pd, h.y));
          e.da.x = e.$c;
          e.da.y = e.ad;
          e.da.f = e.Od - e.$c;
          e.da.i = e.Pd - e.ad;
        }
        return e;
      };
    }
    function q(a) {
      return {
        $c: Number.MAX_VALUE,
        Od: Number.MIN_VALUE,
        ad: Number.MAX_VALUE,
        Pd: Number.MIN_VALUE,
        da: a,
      };
    }
    var p = a.options;
    let r;
    let s;
    let w;
    let t;
    let y;
    let x;
    let A;
    let B;
    let K;
    let C;
    var H = {
      rf(a, b) {
        b.scale = k(a);
        return !1;
      },
      Tb(a, b) {
        const c = k(a);
        const d = s.x;
        const e = s.y;
        b.translate(d, e);
        b.scale(c, c);
        b.translate(-d, -e);
      },
      Vb(a, b, c) {
        a = k(a);
        const d = s.x;
        const e = s.y;
        c.x = (b.x - d) / a + d;
        c.y = (b.y - e) / a + e;
      },
      Ub(a, b, c) {
        a = k(a);
        const d = s.x;
        const e = s.y;
        c.x = (b.x - d) * a + d;
        c.y = (b.y - e) * a + e;
        return c;
      },
    };
    a.c.j('stage:initialized', function(a, b, c, d) {
      s = { x: c / 2, y: d / 2 };
      K = c;
      C = d;
      B = { x: 0, y: 0, f: K, i: C };
    });
    a.c.j('stage:resized', function(a, b, c, d) {
      s.x *= c / a;
      s.y *= d / b;
      K = c;
      C = d;
    });
    a.c.j('api:initialized', function(a) {
      w = a;
    });
    a.c.j('zoom:initialized', function(a) {
      t = a;
    });
    a.c.j('model:loaded', function(a, b) {
      r = a;
      A = b;
    });
    a.c.j('model:childrenAttached', function(a) {
      A = a;
    });
    a.c.j('timeline:initialized', function(a) {
      y = a;
    });
    a.c.j('openclose:initialized', function(a) {
      x = a;
    });
    const Q = ['groupExposureScale', 'groupUnexposureScale', 'groupExposureZoomMargin'];
    a.c.j('options:changed', function(a) {
      D.ob(a, Q) && m() && (c({}), t.Bj(B, p.Qc), t.Qb());
    });
    this.H = function() {
      a.c.p('expose:initialized', this);
    };
    this.fc = function(a, b, c, e) {
      const g = a.e.reduce(function(a, b) {
        for (let c = b; (c = c.parent); ) a[c.id] = !0;
        return a;
      }, {});
      const h = Ha(r, a, function(a) {
        return a.U && !a.open && !g[a.id];
      });
      const k = new V();
      f(h, b).N(function() {
        d(
          h.filter(function(a) {
            return a.o && a.aa;
          }),
          b,
          c,
          e,
        ).N(k.J);
      });
      return k.L();
    };
  }
  function Ja(a) {
    function l(d) {
      function b(a, b) {
        const c = Math.min(1, Math.max(0, a.ua));
        b.opacity = c;
        b.va = 1;
        b.wa = c;
        b.Ka = c;
        b.fa = a.Hb;
      }
      const h = a.options;
      const k = h.pj;
      const l = h.qj;
      const p = h.mj;
      const r = h.nj;
      const s = h.oj;
      let w = h.fe;
      let t = k + l + p + r + s;
      const y = t > 0 ? w / t : 0;
      const x = [];
      m.hb(h.hg, h.gg, h.ig, h.jg, h.fg);
      if (y === 0 && d.e && d.M) {
        w = d.e;
        for (t = 0; t < w.length; t++) {
          const A = w[t];
          A.ua = 1;
          A.Hb = 1;
          A.Ab(b);
          A.nc();
          A.ed(b);
        }
        d.I = !0;
        a.c.p('foamtree:dirty', y > 0);
        return new V().J().L();
      }
      if (d.e && d.M) {
        Ca.Ja(d, Ca.ya(d, a.options.he), function(c, d, e) {
          c.Cc(m);
          c.Ab(b);
          e = a.options.ge === 'groups' ? e : d;
          d = f.D.m(c)
            .fb(e * y * k)
            .ia({
              duration: y * l,
              G: { ua: { end: 1, P: X.pa(h.lj) } },
              ca() {
                this.I = !0;
                a.c.p('foamtree:dirty', y > 0);
              },
            })
            .xa();
          e = f.D.m(c)
            .fb(g ? y * (p + e * r) : 0)
            .ia({
              duration: g ? y * s : 0,
              G: { Hb: { end: 1, P: X.Jb } },
              ca() {
                this.I = !0;
                a.c.p('foamtree:dirty', y > 0);
              },
            })
            .xa();
          c = f.D.m(c)
            .Za([d, e])
            .oe()
            .jb(function() {
              this.Nd();
              this.nc();
              this.fd(m);
              this.ed(b);
            })
            .xa();
          x.push(c);
        });
        c.d();
        const B = new V();
        f.D.m({})
          .Za(x)
          .call(function() {
            c.k();
            B.J();
          })
          .start();
        return B.L();
      }
      return new V().J().L();
    }
    let k;
    let f;
    const d = [];
    var c = new qa(D.ta);
    a.c.j('stage:initialized', function() {});
    a.c.j('stage:resized', function() {});
    a.c.j('stage:newLayer', function(a, b) {
      d.push(b);
    });
    a.c.j('model:loaded', function(a) {
      k = a;
      c.clear();
    });
    a.c.j('zoom:initialized', function() {});
    a.c.j('timeline:initialized', function(a) {
      f = a;
    });
    var g = !1;
    a.c.j('render:renderers:resolved', function(a) {
      g = a.labelPlainFill || !1;
    });
    var m = new (function() {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      let f = 0;
      let g = 0;
      this.hb = function(k, m, l, t, y) {
        a = 1 + m;
        b = 1 - a;
        c = l;
        d = t;
        f = y;
        g = k;
      };
      this.rf = function(g, k) {
        k.scale = a + b * g.ua;
        return f !== 0 || c !== 0 || d !== 0;
      };
      this.Tb = function(k, m) {
        let l = a + b * k.ua;
        const t = k.parent;
        const y = g * k.x + (1 - g) * t.x;
        const x = g * k.y + (1 - g) * t.y;
        m.translate(y, x);
        m.scale(l, l);
        l = 1 - k.ua;
        m.rotate(f * Math.PI * l);
        m.translate(-y, -x);
        m.translate(t.q.f * c * l, t.q.i * d * l);
      };
      this.Vb = function(f, k, m) {
        const l = a + b * f.ua;
        const q = g * f.x + (1 - g) * f.parent.x;
        const x = g * f.y + (1 - g) * f.parent.y;
        const A = 1 - f.ua;
        f = f.parent;
        m.x = (k.x - q) / l + q - f.q.f * c * A;
        m.y = (k.y - x) / l + x - f.q.i * d * A;
      };
      this.Ub = function(f, k, m) {
        const l = a + b * f.ua;
        const q = g * f.x + (1 - g) * f.parent.x;
        const x = g * f.y + (1 - g) * f.parent.y;
        const A = 1 - f.ua;
        f = f.parent;
        m.x = (k.x - q) * l + q - f.q.f * c * A;
        m.y = (k.y - x) * l + x - f.q.i * d * A;
      };
    })();
    this.H = function() {};
    this.k = function() {
      function d(a, b) {
        const c = Math.min(1, Math.max(0, a.ua));
        b.opacity = c;
        b.va = 1;
        b.wa = c;
        b.Ka = c;
        b.fa = a.Hb;
      }
      function b(a, b) {
        const c = Math.min(1, Math.max(0, a.Zd));
        b.opacity = c;
        b.Ka = c;
        b.va = 1;
        b.wa = 1;
        b.fa = a.Hb;
      }
      const h = a.options;
      const n = h.Yd;
      const l = h.Ii;
      const p = h.Ji;
      const r = h.Ki;
      const s = h.Ei;
      const w = h.Fi;
      const t = h.Gi;
      const y = h.Ai;
      const x = h.Bi;
      const A = h.Ci;
      const B = s + w + t + y + x + A + l + p + r;
      const K = B > 0 ? n / B : 0;
      const C = [];
      c.A() ? m.hb(h.Oi, h.Mi, h.Pi, h.Qi, h.Li) : m.hb(h.hg, h.gg, h.ig, h.jg, h.fg);
      Ca.Ja(k, Ca.ya(k, a.options.Ni), function(c, k, n) {
        const B = a.options.Hi === 'groups' ? n : k;
        C.push(
          f.D.m(c)
            .call(function() {
              this.Ab(d);
            })
            .fb(g ? K * (s + B * w) : 0)
            .ia({
              duration: g ? K * t : 0,
              G: { Hb: { end: 0, P: X.Jb } },
              ca() {
                this.I = !0;
                a.c.p('foamtree:dirty', !0);
              },
            })
            .xa(),
        );
        Z.F(c, function(c) {
          C.push(
            f.D.m(c)
              .call(function() {
                this.Cc(m);
                this.Ab(b);
              })
              .fb(K * (y + x * B))
              .ia({
                duration: K * A,
                G: { Zd: { end: 0, P: X.Jb } },
                ca() {
                  this.I = !0;
                  a.c.p('foamtree:dirty', !0);
                },
              })
              .jb(function() {
                this.selected = !1;
                this.fd(m);
              })
              .xa(),
          );
        });
        C.push(
          f.D.m(c)
            .call(function() {
              this.Cc(m);
            })
            .fb(K * (l + p * B))
            .ia({
              duration: K * r,
              G: { ua: { end: 0, P: X.pa(h.Di) } },
              ca() {
                this.I = !0;
                a.c.p('foamtree:dirty', !0);
              },
            })
            .jb(function() {
              this.selected = !1;
              this.fd(m);
            })
            .xa(),
        );
      });
      return f.D.m({})
        .Za(C)
        .bb();
    };
    this.d = function(a) {
      return l(a);
    };
  }
  function Ka(a) {
    function l(a, b) {
      const d = [];
      Z.F(g, function(b) {
        if (b.e) {
          const c = D.Q(a, b.id);
          b.open !== c &&
            (c ||
              b.U ||
              Z.F(b, function(a) {
                if (a.U) return d.push(b), !1;
              }));
        }
      });
      if (d.length === 0) return new V().J().L();
      let f;
      for (f = d.length - 1; f >= 0; f--) d[f].open = !1;
      const k = c.fc({ e: d, Ia: !0, Ha: !0 }, b, !0, !0);
      for (f = d.length - 1; f >= 0; f--) d[f].open = !0;
      return k;
    }
    function k(c, b, h) {
      function k(b, c) {
        b.Ab(l);
        const e = d.D.m(b)
          .ia({
            duration: a.options.cd,
            G: { Lb: { end: c ? 1 : 0, P: X.ze } },
            ca() {
              this.I = !0;
              a.c.p('foamtree:dirty', !0);
            },
          })
          .call(function() {
            this.open = c;
            b.gb = !1;
          })
          .jb(function() {
            this.nc();
            this.ed(l);
            delete f[this.id];
          })
          .xa();
        return (f[b.id] = e);
      }
      function l(a, b) {
        b.opacity = 1 - a.Lb;
        b.va = 1;
        b.wa = 1;
        b.fa = 1;
        b.Ka = 1;
      }
      const p = [];
      const r = [];
      Z.F(g, function(a) {
        if (a.M && a.X) {
          const b = D.Q(c, a.id);
          const d = f[a.id];
          if (d && d.Gb()) d.stop();
          else if (a.open === b) return;
          a.gb = b;
          b || ((a.open = b), (a.Td = !1));
          r.push(a);
          p.push(k(a, b));
        }
      });
      return p.length > 0
        ? (a.c.p('openclose:changing'),
          d.D.m({})
            .Za(p)
            .bb()
            .N(function() {
              m.ud(
                b,
                r,
                'open',
                function(a) {
                  return a.open;
                },
                { indirect: h },
                a.options.Mf,
                a.options.Lf,
              );
            }))
        : new V().J().L();
    }
    let f;
    let d;
    let c;
    let g;
    let m;
    a.c.j('api:initialized', function(a) {
      m = a;
    });
    a.c.j('model:loaded', function(a) {
      g = a;
      f = {};
    });
    a.c.j('timeline:initialized', function(a) {
      d = a;
    });
    a.c.j('expose:initialized', function(a) {
      c = a;
    });
    this.H = function() {
      a.c.p('openclose:initialized', this);
    };
    this.Kb = function(c, b, d) {
      if (a.options.Ua == 'flattened') return new V().J().L();
      c = Ha(g, c, function(a) {
        return a.open || a.gb;
      });
      for (var f = new V(), m = 0; m < c.length; m++) c[m].gb = !0;
      c.length > 0 && a.c.p('foamtree:attachChildren', c);
      const p = c.reduce(function(a, b) {
        a[b.id] = !0;
        return a;
      }, {});
      l(p, b).N(function() {
        k(p, b, d).N(f.J);
      });
      return f.L();
    };
  }
  function La(a) {
    function l(d, c) {
      const g = Ha(k, d, function(a) {
        return a.selected;
      });
      Z.F(k, function(a) {
        !0 === a.selected && ((a.selected = !a.selected), (a.I = !a.I), (a.ab = !a.ab));
      });
      let m;
      for (m = g.length - 1; m >= 0; m--) {
        const e = g[m];
        e.selected = !e.selected;
        e.I = !e.I;
        e.ab = !e.ab;
      }
      const b = [];
      Z.F(k, function(a) {
        a.I && b.push(a);
      });
      b.length > 0 && a.c.p('foamtree:dirty', !1);
      f.ud(
        c,
        b,
        'selected',
        function(a) {
          return a.selected;
        },
        {},
        a.options.Of,
        a.options.Nf,
      );
    }
    let k;
    let f;
    a.c.j('api:initialized', function(a) {
      f = a;
    });
    a.c.j('model:loaded', function(a) {
      k = a;
    });
    this.H = function() {
      a.c.p('select:initialized', this);
    };
    this.select = function(a, c) {
      return l(a, c);
    };
  }
  function Ma(a) {
    function l(a) {
      return function(b) {
        a.call(this, {
          x: b.x,
          y: b.y,
          scale: b.scale,
          wd: b.delta,
          ctrlKey: b.ctrlKey,
          metaKey: b.metaKey,
          altKey: b.altKey,
          shiftKey: b.shiftKey,
          xb: b.secondary,
          touches: b.touches,
        });
      };
    }
    function k() {
      function b(a) {
        return function(b) {
          b.x *= N / q.clientWidth;
          b.y *= U / q.clientHeight;
          return a(b);
        };
      }
      n.gf !== 'external' &&
        (n.gf === 'hammerjs' &&
          D.Q(window, 'Hammer') &&
          (E.H(q),
          E.m('tap', b(h.d), !0),
          E.m('doubletap', b(h.k), !0),
          E.m('hold', b(h.ya), !0),
          E.m('touch', b(h.Aa), !1),
          E.m('release', b(h.Ba), !1),
          E.m('dragstart', b(h.Y), !0),
          E.m('drag', b(h.A), !0),
          E.m('dragend', b(h.S), !0),
          E.m('transformstart', b(h.Va), !0),
          E.m('transform', b(h.Ja), !0),
          E.m('transformend', b(h.cb), !0)),
        (F = new ta(q)),
        (T = new sa()),
        F.d(b(h.d)),
        F.k(b(h.k)),
        F.ya(b(h.ya)),
        F.Ba(b(h.Aa)),
        F.Pa(b(h.Ba)),
        F.Y(b(h.Y)),
        F.A(b(h.A)),
        F.S(b(h.S)),
        F.za(b(h.za)),
        F.Ja(b(h.za)),
        F.Aa(b(h.Pa)),
        T.addEventListener('keyup', function(b) {
          let c = !1;
          let d = void 0;
          const e = n.Sf({
            keyCode: b.keyCode,
            preventDefault() {
              c = !0;
            },
            preventOriginalEventDefault() {
              d = 'prevent';
            },
            allowOriginalEventDefault() {
              d = 'allow';
            },
          });
          d === 'prevent' && b.preventDefault();
          (c = c || e.indexOf(!1) >= 0) || (b.keyCode === 27 && a.c.p('interaction:reset'));
        }));
    }
    function f() {
      p.Hc(2) ? a.c.p('interaction:reset') : p.normalize(n.wc, X.pa(n.xc));
    }
    function d(a) {
      return function() {
        x.empty() || a.apply(this, arguments);
      };
    }
    function c(a, b, c) {
      const d = {};
      const f = {};
      return function(g) {
        let h;
        switch (a) {
          case 'click':
            h = n.yf;
            break;
          case 'doubleclick':
            h = n.zf;
            break;
          case 'hold':
            h = n.Ff;
            break;
          case 'hover':
            h = n.Gf;
            break;
          case 'mousemove':
            h = n.If;
            break;
          case 'mousewheel':
            h = n.Kf;
            break;
          case 'mousedown':
            h = n.Hf;
            break;
          case 'mouseup':
            h = n.Jf;
            break;
          case 'dragstart':
            h = n.Cf;
            break;
          case 'drag':
            h = n.Af;
            break;
          case 'dragend':
            h = n.Bf;
            break;
          case 'transformstart':
            h = n.Rf;
            break;
          case 'transform':
            h = n.Pf;
            break;
          case 'transformend':
            h = n.Qf;
        }
        let k = !1;
        let l = !h.empty();
        let r = p.absolute(g, d);
        const q = (b || l) && m(r);
        const s = (b || l) && e(r);
        l &&
          ((l = q ? q.group : null),
          (r = q ? q.Vb(r, f) : r),
          (g.Mb = void 0),
          (h = h({
            type: a,
            group: l,
            topmostClosedGroup: l,
            bottommostOpenGroup: s ? s.group : null,
            x: g.x,
            y: g.y,
            xAbsolute: r.x,
            yAbsolute: r.y,
            scale: D.B(g.scale, 1),
            secondary: g.xb,
            touches: D.B(g.touches, 1),
            delta: D.B(g.wd, 0),
            ctrlKey: g.ctrlKey,
            metaKey: g.metaKey,
            altKey: g.altKey,
            shiftKey: g.shiftKey,
            preventDefault() {
              k = !0;
            },
            preventOriginalEventDefault() {
              g.Mb = 'prevent';
            },
            allowOriginalEventDefault() {
              g.Mb = 'allow';
            },
          })),
          (k = k || h.indexOf(!1) >= 0),
          q && q.na && a === 'click' && (k = !1));
        k || (c && c({ Ec: q, Wg: s }, g));
      };
    }
    function g(a) {
      function b(a, c) {
        const d = c.e;
        if (d) {
          for (var e = -Number.MAX_VALUE, f, g = 0; g < d.length; g++) {
            const h = d[g];
            !h.description && h.ea && I(h, a) && h.scale > e && ((f = h), (e = h.scale));
          }
          let k;
          f && (k = b(a, f));
          return k || f;
        }
      }
      return b(a, x);
    }
    function m(a, b) {
      let c;
      if (n.Ua == 'flattened') c = g(a);
      else {
        c = b || 0;
        for (var d = u.length, e = void 0, f = 0; f < d; f++) {
          const h = u[f];
          h.scale > c && !1 === h.open && h.ea && I(h, a) && ((e = h), (c = h.scale));
        }
        c = e;
      }
      return c;
    }
    function e(a) {
      let b = void 0;
      let c = 0;
      Z.Kc(x, function(d) {
        !0 === d.open && d.ea && d.scale > c && I(d, a) && ((b = d), (c = d.scale));
      });
      return b;
    }
    const b = v.mf();
    var h = this;
    var n = a.options;
    let q;
    let p;
    let r;
    let s;
    let w;
    let t;
    let y;
    let x;
    let A = !1;
    let B;
    let K;
    let C;
    let H;
    let Q;
    let O;
    let P;
    let F;
    let T;
    let N;
    let U;
    a.c.j('stage:initialized', function(a, b, c, d) {
      q = b;
      N = c;
      U = d;
      k();
    });
    a.c.j('stage:resized', function(a, b, c, d) {
      N = c;
      U = d;
    });
    a.c.j('stage:disposed', function() {
      F.lb();
      E.lb();
      T.d();
    });
    a.c.j('expose:initialized', function(a) {
      s = a;
    });
    a.c.j('zoom:initialized', function(a) {
      p = a;
    });
    a.c.j('openclose:initialized', function(a) {
      w = a;
    });
    a.c.j('select:initialized', function(a) {
      t = a;
    });
    a.c.j('titlebar:initialized', function(a) {
      y = a;
    });
    a.c.j('timeline:initialized', function(a) {
      r = a;
    });
    let u;
    a.c.j('model:loaded', function(a, b) {
      x = a;
      u = b;
    });
    a.c.j('model:childrenAttached', function(a) {
      u = a;
    });
    this.H = function() {};
    this.Aa = d(
      c('mousedown', !1, function() {
        p.vi();
      }),
    );
    this.Ba = d(c('mouseup', !1, void 0));
    this.d = d(
      c('click', !0, function(a, b) {
        if (!b.xb && !b.shiftKey) {
          const c = a.Ec;
          c &&
            (c.na
              ? (document.location.href = xa.kg('iuuq;..b`ssnurd`sbi/bnl.gn`lusdd'))
              : t.select({ e: [c], Ia: !c.selected, Ha: b.metaKey || b.ctrlKey }, !0));
        }
      }),
    );
    this.k = d(
      c('doubleclick', !0, function(b, c) {
        let d;
        let e;
        if (c.xb || c.shiftKey) {
          if ((d = b.Ec))
            d.parent.U && (d = d.parent),
              (e = { e: d.parent !== x ? [d.parent] : [], Ia: !0, Ha: !1 }),
              t.select(e, !0),
              s.fc(e, !0, !0, !1);
        } else if ((d = b.Ec)) (e = { e: [d], Ia: !0, Ha: !1 }), (d.gb = !0), a.c.p('foamtree:attachChildren', [d]), s.fc(e, !0, !0, !1);
        d &&
          r.D.m({})
            .fb(n.Wa / 2)
            .call(function() {
              w.Kb(
                {
                  e: Z.Mc(x, function(a) {
                    return a.Td && !Z.ki(d, a);
                  }),
                  Ia: !1,
                  Ha: !0,
                },
                !0,
                !0,
              );
              d.Td = !0;
              w.Kb({ e: [d], Ia: !(c.xb || c.shiftKey), Ha: !0 }, !0, !0);
            })
            .start();
      }),
    );
    this.ya = d(
      c('hold', !0, function(a, b) {
        const c = !(b.metaKey || b.ctrlKey || b.shiftKey) && !b.xb;
        let d;
        (d = c ? a.Ec : a.Wg) && d !== x && w.Kb({ e: [d], Ia: c, Ha: !0 }, !0, !1);
      }),
    );
    this.Y = d(
      c('dragstart', !1, function(a, b) {
        B = b.x;
        K = b.y;
        C = Date.now();
        A = !0;
      }),
    );
    this.A = d(
      c('drag', !1, function(a, b) {
        if (A) {
          var c = Date.now();
          O = Math.min(1, c - C);
          C = c;
          var c = b.x - B;
          const d = b.y - K;
          p.ti(c, d);
          H = c;
          Q = d;
          B = b.x;
          K = b.y;
        }
      }),
    );
    this.S = d(
      c('dragend', !1, function() {
        if (A) {
          A = !1;
          const a = Math.sqrt(H * H + Q * Q) / O;
          a >= 4 ? p.ui(a, H, Q) : p.wf();
        }
      }),
    );
    this.Va = d(
      c('transformstart', !1, function(a, b) {
        P = 1;
        B = b.x;
        K = b.y;
      }),
    );
    let z = 1;
    let L = !1;
    this.Ja = d(
      c('transform', !1, function(a, b) {
        const c = b.scale - 0.01;
        p.Qg(b, c / P, b.x - B, b.y - K);
        P = c;
        B = b.x;
        K = b.y;
        z = P;
        L = L || b.touches > 2;
      }),
    );
    this.cb = d(
      c('transformend', !1, function() {
        L && z < 0.8 ? a.c.p('interaction:reset') : f();
        L = !1;
      }),
    );
    this.Pa = d(
      c(
        'mousewheel',
        !1,
        (function() {
          const a = D.ah(function() {
            f();
          }, 300);
          return function(c, d) {
            let e = n.Hj;
            e !== 1 &&
              ((e = Math.pow(e, d.wd)), b ? (p.Rg(d, e), a()) : p.Yb(d, e, n.wc, X.pa(n.xc)).N(f));
          };
        })(),
      ),
    );
    this.za = d(
      (function() {
        let b = void 0;
        const d = {};
        let e = !1;
        let f;
        const g = c('hover', !1, function() {
          b && ((b.Eb = !1), (b.I = !0));
          f && ((f.Eb = !0), (f.I = !0));
          y.update(f);
          a.c.p('foamtree:dirty', !1);
        });
        const h = c('mousemove', !1, void 0);
        return function(a) {
          if (a.type === 'out') (f = void 0), (e = f !== b);
          else if ((p.absolute(a, d), b && !b.open && I(b, d))) {
            const c = m(d, b.scale);
            c && c != b ? ((e = !0), (f = c)) : (e = !1);
          } else (f = m(d)), (e = f !== b);
          e && (g(a), (b = f), (e = !1));
          b && h(a);
        };
      })(),
    );
    this.hb = {
      click: l(this.d),
      doubleclick: l(this.k),
      hold: l(this.ya),
      mouseup: l(this.Ba),
      mousedown: l(this.Aa),
      dragstart: l(this.Y),
      drag: l(this.A),
      dragend: l(this.S),
      transformstart: l(this.Va),
      transform: l(this.Ja),
      transformend: l(this.cb),
      hover: l(this.za),
      mousewheel: l(this.Pa),
    };
    var E = (function() {
      function a(b, c) {
        return function(a) {
          a = a.gesture;
          var d = a.center;
          var d = ra.Ie(q, d.pageX, d.pageY, {});
          d.scale = a.scale;
          d.xb = a.touches.length > 1;
          d.touches = a.touches.length;
          b.call(q, d);
          ((void 0 === d.Mb && c) || d.Mb === 'prevent') && a.preventDefault();
        };
      }
      let b;
      const c = {};
      return {
        H(a) {
          b = window.Hammer(a, {
            doubletap_interval: 350,
            hold_timeout: 400,
            doubletap_distance: 10,
          });
        },
        m(d, e, f) {
          c[d] = e;
          b.on(d, a(e, f));
        },
        lb() {
          b &&
            D.Ga(c, function(a, c) {
              b.off(c, a);
            });
        },
      };
    })();
    var I = (function() {
      const a = {};
      return function(b, c) {
        b.Vb(c, a);
        return b.aa && M.Va(b.aa, a);
      };
    })();
  }
  function Na(a) {
    function l(a, c, f, k) {
      let e;
      var b = 0;
      const h = [];
      for (e = 0; e < c.length; e++) {
        var l = Math.sqrt(M.d(c[e], c[(e + 1) % c.length]));
        h.push(l);
        b += l;
      }
      for (e = 0; e < h.length; e++) h[e] /= b;
      a[0].x = f.x;
      a[0].y = f.y;
      let q = (l = b = 0);
      for (e = 1; e < a.length; e++) {
        for (var p = a[e], r = 0.95 * Math.pow(e / a.length, k), b = b + 0.3819; l < b; )
          (l += h[q]), (q = (q + 1) % h.length);
        var s = (q - 1 + h.length) % h.length;
        const w = 1 - (l - b) / h[s];
        var t = c[s].x;
        var s = c[s].y;
        var y = c[q].x;
        var x = c[q].y;
        var t = (t - f.x) * r + f.x;
        var s = (s - f.y) * r + f.y;
        var y = (y - f.x) * r + f.x;
        var x = (x - f.y) * r + f.y;
        p.x = t * (1 - w) + y * w;
        p.y = s * (1 - w) + x * w;
      }
    }
    const k = {
      random: {
        Fb(a, c) {
          for (let f = 0; f < a.length; f++) {
            const k = a[f];
            k.x = c.x + Math.random() * c.f;
            k.y = c.y + Math.random() * c.i;
          }
        },
        Zb: 'box',
      },
      ordered: {
        Fb(a, c) {
          const g = a.slice(0);
          f.lc && g.sort(Oa);
          Da.Xb(g, c, !1, f.ce);
        },
        Zb: 'box',
      },
      squarified: {
        Fb(a, c) {
          const g = a.slice(0);
          f.lc && g.sort(Oa);
          Da.te(g, c, !1, f.ce);
        },
        Zb: 'box',
      },
      fisheye: {
        Fb(a, c, g) {
          a = a.slice(0);
          f.lc && a.sort(Oa);
          l(a, c, g, 0.25);
        },
        Zb: 'polygon',
      },
      blackhole: {
        Fb(a, c, g) {
          a = a.slice(0);
          f.lc && a.sort(Oa).reverse();
          l(a, c, g, 1);
        },
        Zb: 'polygon',
      },
    };
    k.order = k.ordered;
    k.treemap = k.squarified;
    var f = a.options;
    this.d = function(a, c, g) {
      if (a.length > 0) {
        g = k[g.relaxationInitializer || g.initializer || f.gj || 'random'];
        if (g.Zb === 'box') {
          var m = M.q(c, {});
          g.Fb(a, m);
          M.Bc(a, M.A(m), c);
        } else g.Fb(a, c, M.k(c, {}));
        for (m = a.length - 1; m >= 0; m--) {
          g = a[m];
          if (g.description) {
            a = M.qe(c, f.Ic, f.bh);
            g.x = a.x;
            g.y = a.y;
            break;
          }
          if (g.na) {
            a = M.qe(c, f.ve, f.Sg);
            g.x = a.x;
            g.y = a.y;
            break;
          }
        }
      }
    };
  }
  function Pa(a) {
    let l;
    const k = a.options;
    const f = new Qa(a, this);
    const d = new Ra(a, this);
    const c = { relaxed: f, ordered: d, squarified: d };
    let g = c[a.options.Wc] || f;
    this.Bg = 5e-5;
    a.c.j('model:loaded', function(a) {
      l = a;
    });
    a.c.j('options:changed', function(a) {
      a.layout && D.Q(c, k.Wc) && (g = c[k.Wc]);
    });
    this.step = function(a, c, b, d) {
      return g.step(a, c, b, d);
    };
    this.complete = function(a) {
      g.complete(a);
    };
    this.kf = function(a) {
      return a === l ? !0 : 2 * Math.sqrt(a.K.ja / (Math.PI * a.e.length)) >= Math.max(k.Ve, 5e-5);
    };
    this.yd = function(a, c) {
      for (
        var b = Math.pow(k.Ra, a.R), d = k.mb * b, b = k.Ad * b, f = a.e, l = f.length - 1;
        l >= 0;
        l--
      ) {
        const p = f[l];
        g.we(p, b);
        const r = p;
        r.aa = d > 0 ? Aa.cb(r.o, d) : r.o;
        r.aa && (M.q(r.aa, r.q), M.re(r.aa, r.K));
        p.e && c.push(p);
      }
    };
    this.qc = function(a) {
      g.qc(a);
    };
    this.Nb = function(a) {
      g.Nb(a);
    };
  }
  function Qa(a, l) {
    function k(a) {
      if (a.e) {
        a = a.e;
        for (let b = 0; b < a.length; b++) {
          const c = a[b];
          c.uc = c.rc * n.Rh;
        }
      }
    }
    function f(a, c) {
      l.kf(a) &&
        (a.u ||
          ((a.u = Aa.cb(a.o, n.Ad * Math.pow(n.Ra, a.R - 1))),
          a.u && n.Ua == 'flattened' && n.dc == 'stab' && m(a)),
        a.u && (b.Nb(a), q.d(d(a), a.u, a.group), (a.M = !0), c(a)),
        k(a));
    }
    function d(a) {
      return n.dc == 'stab' && a.e.length > 0 && a.e[0].description ? a.e.slice(1) : a.e;
    }
    function c(a) {
      const b = d(a);
      Ba.S(b, a.u);
      Ba.zc(b, a.u);
      return Ca.Dg(a) * Math.sqrt(h.K.ja / a.K.ja);
    }
    function g(a) {
      return a < n.bg || a < 1e-4;
    }
    function m(a) {
      var b = n.cc / (1 + n.cc);
      const c = M.q(a.u, {});
      const d = { x: c.x, y: 0 };
      let e = c.y;
      let f = c.i;
      const g = n.Ce * Math.pow(n.Ra, a.R - 1);
      const h = f * n.Be;
      let k = n.Ic;
      k == 'bottom' || (k >= 0 && k < 180)
        ? ((k = Math.PI), (e += f), (f = -1))
        : ((k = 0), (f = 1));
      for (
        var l, m = a.u, p = k, q = 0, P = 1, F = M.k(m, {}), T = F.ja, b = T * b, N = 0;
        q < P && N++ < 20;

      ) {
        const U = (q + P) / 2;
        d.y = c.y + c.i * U;
        l = M.Wb(m, d, p);
        M.k(l[0], F);
        const u = F.ja - b;
        if (Math.abs(u) / T <= 0.01) break;
        else (p == 0 ? 1 : -1) * u > 0 ? (P = U) : (q = U);
      }
      M.q(l[0], c);
      if (c.i < g || c.i > h)
        (d.y = c.i < g ? e + f * Math.min(g, h) : e + f * h), (l = M.Wb(a.u, d, k));
      a.e[0].o = l[0];
      a.u = l[1];
    }
    function e(a) {
      a !== h &&
        2 * Math.sqrt(a.K.ja / (Math.PI * a.e.length)) < Math.max(0.85 * n.Ve, l.Bg) &&
        ((a.M = !1), (a.Ca = !1), (a.Qa = !0), (a.u = null));
    }
    var b = this;
    let h;
    var n = a.options;
    var q = new Na(a);
    let p = 0;
    a.c.j('model:loaded', function(a) {
      h = a;
      p = 0;
    });
    this.step = function(a, b, k, m) {
      function q(b) {
        b.M && b.Ca
          ? e(b)
          : b.Qa &&
            b.o &&
            f(b, function() {
              const c = d(b);
              Ba.S(c, b.u);
              Ba.zc(c, b.u);
              a(b);
            });
        if (!b.u || !b.M) return 0;
        let h;
        (b.parent && b.parent.Z) || b.La
          ? ((h = c(b)), m && m(b), (b.La = !g(h) && !k), (b.Z = !0))
          : (h = 0);
        l.yd(b, B);
        return h;
      }
      function x(a, b, c) {
        p < a && (p = a);
        const d = n.bg;
        n.Sd(b ? 1 : 1 - (a - d) / (p - d || 1), b, c);
        b && (p = 0);
      }
      for (var A = 0, B = [h]; B.length > 0; ) A = Math.max(A, q(B.shift()));
      const K = g(A);
      b && x(A, K, k);
      return K;
    };
    this.complete = function(a) {
      for (let b = [h]; b.length > 0; ) {
        const d = b.shift();
        !d.M && d.Qa && d.o && f(d, a);
        if (d.u) {
          if ((d.parent && d.parent.Z) || d.La) {
            for (let e = d.K.ja < 1e-4, k = 0; !(g(c(d)) || (e && k++ > 32)); );
            d.Z = !0;
            d.La = !1;
          }
          l.yd(d, b);
        }
      }
    };
    this.qc = function(a) {
      Z.F(a, k);
    };
    this.we = function(a, b) {
      if (a.M) {
        const c = a.u;
        c && (a.Xd = c);
        a.u = Aa.cb(a.o, b);
        a.u && n.Ua == 'flattened' && n.dc == 'stab' && m(a);
        c && !a.u && (a.Z = !0);
        a.u && a.Xd && M.Bc(d(a), a.Xd, a.u);
      }
    };
    this.Nb = function(a) {
      for (var b = d(a), c = a.ja, e, f = (e = 0); f < b.length; f++) e += b[f].T;
      a.ak = e;
      for (a = 0; a < b.length; a++)
        (f = b[a]), (f.qg = f.f), (f.rc = (c / Math.PI) * (e > 0 ? f.T / e : 1 / b.length));
    };
  }
  function Ra(a, l) {
    function k(a, c) {
      if (l.kf(a)) {
        if (!a.u || (a.parent && a.parent.Z)) {
          const e = m.Ad * Math.pow(m.Ra, a.R - 1);
          a.u = M.A(d(M.q(a.o, {}), e));
        }
        a.u && ((a.M = !0), c(a));
      } else
        (a.M = !1),
          Z.Fa(a, function(a) {
            a.u = null;
          });
    }
    function f(a) {
      function d(a) {
        function b() {
          e.o = M.A(f);
          e.x = f.x + f.f / 2;
          e.y = f.y + f.i / 2;
        }
        var c = m.cc / (1 + m.cc);
        var e = a.e[0];
        var f = M.q(a.u, {});
        const g = f.i;
        var c = Math.min(Math.max(g * c, m.Ce * Math.pow(m.Ra, a.R - 1)), g * m.Be);
        const h = m.Ic;
        h == 'bottom' || (h >= 0 && h < 180)
          ? ((f.i = g - c), (a.u = M.A(f)), (f.y += g - c), (f.i = c), b())
          : ((f.i = c), b(), (f.y += c), (f.i = g - c), (a.u = M.A(f)));
      }
      let f;
      m.dc == 'stab' && a.e.length > 0 && a.e[0].description
        ? ((f = a.e.slice(1)), d(a))
        : (f = a.e);
      m.lc && f.sort(Oa);
      m.dc == 'floating' &&
        c(f, m.Ic, function(a) {
          return a.description;
        });
      c(f, m.ve, function(a) {
        return a.na;
      });
      const g = M.q(a.u, {});
      (e[m.Wc] || Da.Xb)(f, g, !0, m.ce);
      a.La = !1;
      a.Z = !0;
      a.I = !0;
      a.Ma = !0;
    }
    function d(a, c) {
      const d = 2 * c;
      a.x += c;
      a.y += c;
      a.f -= d;
      a.i -= d;
      return a;
    }
    function c(a, c, d) {
      for (let e = 0; e < a.length; e++) {
        const f = a[e];
        if (d(f)) {
          a.splice(e, 1);
          c == 'topleft' || (c >= 135 && c < 315) ? a.unshift(f) : a.push(f);
          break;
        }
      }
    }
    let g;
    var m = a.options;
    var e = { squarified: Da.te, ordered: Da.Xb };
    a.c.j('model:loaded', function(a) {
      g = a;
    });
    this.step = function(a, c, d) {
      this.complete(a);
      c && m.Sd(1, !0, d);
      return !0;
    };
    this.complete = function(a) {
      for (let c = [g]; c.length > 0; ) {
        const d = c.shift();
        (!d.M || (d.parent && d.parent.Z)) && d.Qa && d.o && k(d, a);
        d.u && (((d.parent && d.parent.Z) || d.La) && f(d), l.yd(d, c));
      }
    };
    this.Nb = this.qc = this.we = D.ta;
  }
  const Sa = new (function() {
    this.Gg = function(a) {
      a.beginPath();
      a.moveTo(3.2, 497);
      a.bezierCurveTo(0.1, 495.1, 0, 494.1, 0, 449.6);
      a.bezierCurveTo(0, 403.5, -0.1, 404.8, 4.1, 402.6);
      a.bezierCurveTo(5.2, 402, 7.4, 401.4, 9, 401.2);
      a.bezierCurveTo(10.6, 401, 31.2, 400.6, 54.7, 400.2);
      a.bezierCurveTo(99.5, 399.4, 101, 399.5, 104.6, 402.3);
      a.bezierCurveTo(107.9, 404.9, 107.6, 404, 129.3, 473.2);
      a.bezierCurveTo(131, 478.6, 132.9, 484.4, 133.4, 486.1);
      a.bezierCurveTo(135.2, 491.4, 135.4, 494.9, 134, 496.4);
      a.bezierCurveTo(132.8, 497.7, 131.7, 497.7, 68.6, 497.7);
      a.bezierCurveTo(24.2, 497.7, 4, 497.5, 3.2, 497);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(162.1, 497);
      a.bezierCurveTo(159.5, 496.3, 157.7, 494.6, 156.2, 491.6);
      a.bezierCurveTo(155.5, 490.3, 148.7, 469.4, 141.1, 445.2);
      a.bezierCurveTo(126.1, 397.5, 125.6, 395.4, 128.1, 389.8);
      a.bezierCurveTo(129.5, 386.7, 164.1, 339, 168, 334.9);
      a.bezierCurveTo(170.3, 332.5, 172.2, 332.1, 175.1, 333.7);
      a.bezierCurveTo(176.1, 334.2, 189.3, 347, 204.3, 362.1);
      a.bezierCurveTo(229.4, 387.4, 231.8, 390, 233.5, 394);
      a.bezierCurveTo(235.2, 397.8, 235.4, 399.2, 235.4, 404.3);
      a.bezierCurveTo(235.3, 415, 230.5, 489.9, 229.8, 492.5);
      a.bezierCurveTo(228.4, 497.5, 229.2, 497.4, 194.7, 497.5);
      a.bezierCurveTo(177.8, 497.6, 163.1, 497.4, 162.1, 497);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(258.7, 497);
      a.bezierCurveTo(255.8, 496.1, 252.6, 492.3, 252, 489.1);
      a.bezierCurveTo(251.4, 484.8, 256.8, 405.2, 258.1, 401.1);
      a.bezierCurveTo(260.4, 393.4, 262.7, 391.1, 300.4, 359.2);
      a.bezierCurveTo(319.9, 342.6, 337.7, 327.9, 339.9, 326.5);
      a.bezierCurveTo(347.4, 321.6, 350.4, 321, 372, 320.5);
      a.bezierCurveTo(393.4, 320, 400.5, 320.4, 407.5, 322.5);
      a.bezierCurveTo(413.9, 324.4, 487.4, 359.5, 490.6, 362.1);
      a.bezierCurveTo(492, 363.3, 493.9, 365.8, 495, 367.7);
      a.lineTo(496.8, 371.2);
      a.lineTo(497, 419.3);
      a.bezierCurveTo(497.1, 445.7, 497, 468, 496.8, 468.8);
      a.bezierCurveTo(496.2, 471.6, 489.6, 480.8, 485, 485.3);
      a.bezierCurveTo(478.6, 491.7, 474.9, 494.1, 468.2, 496);
      a.lineTo(462.3, 497.7);
      a.lineTo(361.6, 497.7);
      a.bezierCurveTo(303.1, 497.6, 259.9, 497.3, 258.7, 497);
      a.closePath();
      a.fillStyle = 'rgba(200,200,200,1)';
      a.fill();
      a.beginPath();
      a.moveTo(4.4, 380.8);
      a.bezierCurveTo(2.9, 380.2, 1.7, 379.8, 1.6, 379.8);
      a.bezierCurveTo(1.5, 379.8, 1.2, 378.8, 0.7, 377.6);
      a.bezierCurveTo(0.2, 376.1, 0, 361.6, 0, 331.2);
      a.bezierCurveTo(0, 281.2, -0.2, 283.1, 4.9, 280.9);
      a.bezierCurveTo(7.1, 279.9, 19.3, 278.2, 54.8, 274.1);
      a.bezierCurveTo(80.6, 271.1, 102.9, 268.6, 104.4, 268.6);
      a.bezierCurveTo(105.8, 268.6, 109.1, 269.4, 111.7, 270.4);
      a.bezierCurveTo(116, 272.1, 117.2, 273.2, 133.4, 289.3);
      a.bezierCurveTo(150.9, 306.8, 153.4, 310, 153.4, 314.5);
      a.bezierCurveTo(153.4, 317.6, 151.1, 321.3, 136.4, 341.2);
      a.bezierCurveTo(109.4, 377.8, 111.6, 375.3, 105.4, 378.1);
      a.lineTo(101.3, 380);
      a.lineTo(75.7, 380.5);
      a.bezierCurveTo(6.8, 381.8, 7.3, 381.8, 4.4, 380.8);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(243.5, 372.4);
      a.bezierCurveTo(240.2, 370.8, 136.6, 266.7, 134.2, 262.6);
      a.bezierCurveTo(132.1, 259, 131.7, 254.9, 133.2, 251.3);
      a.bezierCurveTo(134.5, 248.2, 166.3, 206, 169.3, 203.4);
      a.bezierCurveTo(172.6, 200.5, 178.5, 198.4, 183.2, 198.4);
      a.bezierCurveTo(187.1, 198.4, 275.2, 204.1, 281.6, 204.8);
      a.bezierCurveTo(289.7, 205.7, 294.6, 208.7, 297.6, 214.6);
      a.bezierCurveTo(300.5, 220.3, 327.4, 297.4, 327.8, 301.1);
      a.bezierCurveTo(328.3, 305.7, 326.7, 310.4, 323.4, 314);
      a.bezierCurveTo(322, 315.6, 307.8, 327.9, 291.9, 341.3);
      a.bezierCurveTo(256.2, 371.4, 256.6, 371.2, 253.9, 372.5);
      a.bezierCurveTo(251.1, 373.9, 246.5, 373.9, 243.5, 372.4);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(489.3, 339.1);
      a.bezierCurveTo(488.6, 338.9, 473.7, 331.9, 456.3, 323.6);
      a.bezierCurveTo(435.9, 313.9, 423.8, 307.8, 422.4, 306.4);
      a.bezierCurveTo(419.5, 303.7, 418, 300.2, 418, 296.1);
      a.bezierCurveTo(418, 292.5, 438, 185, 439.3, 181.6);
      a.bezierCurveTo(441.2, 176.6, 445.5, 173.1, 450.8, 172.1);
      a.bezierCurveTo(456, 171.2, 487.1, 169.2, 489.6, 169.7);
      a.bezierCurveTo(493.1, 170.3, 495.5, 171.9, 497, 174.7);
      a.bezierCurveTo(498.1, 176.7, 498.2, 181.7, 498.4, 253.2);
      a.bezierCurveTo(498.5, 295.3, 498.4, 330.9, 498.2, 332.5);
      a.bezierCurveTo(497.5, 337.4, 493.7, 340.2, 489.3, 339.1);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(353.2, 300.7);
      a.bezierCurveTo(350.4, 299.8, 347.9, 297.9, 346.5, 295.6);
      a.bezierCurveTo(345.8, 294.5, 338.2, 273.7, 329.6, 249.5);
      a.bezierCurveTo(314.6, 207.1, 314.1, 205.3, 314.1, 200.4);
      a.bezierCurveTo(314.1, 196.7, 314.4, 194.6, 315.3, 193);
      a.bezierCurveTo(316, 191.7, 322.5, 181.6, 329.8, 170.6);
      a.bezierCurveTo(346.8, 144.8, 345.4, 145.8, 365.8, 144.4);
      a.bezierCurveTo(380.9, 143.4, 385.7, 143.7, 390.6, 146.3);
      a.bezierCurveTo(397.3, 149.8, 417.4, 164.4, 419.2, 167);
      a.bezierCurveTo(422.4, 171.8, 422.4, 171.8, 410.6, 234.4);
      a.bezierCurveTo(402.3, 278.6, 399.3, 293.2, 398.1, 295.3);
      a.bezierCurveTo(395.4, 300.1, 393.7, 300.5, 373, 300.9);
      a.bezierCurveTo(363.1, 301.1, 354.2, 301, 353.2, 300.7);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(6.2, 259.9);
      a.bezierCurveTo(4.9, 259.2, 3.2, 257.8, 2.4, 256.8);
      a.bezierCurveTo(1, 254.9, 1, 254.8, 0.8, 148.7);
      a.bezierCurveTo(0.7, 74, 0.9, 40.8, 1.4, 36.7);
      a.bezierCurveTo(2.3, 29.6, 4.7, 24.4, 9.8, 18.3);
      a.bezierCurveTo(14.1, 13.1, 20.9, 7.3, 25, 5.3);
      a.bezierCurveTo(26.5, 4.6, 31, 3.3, 34.9, 2.6);
      a.bezierCurveTo(41.3, 1.3, 44.2, 1.2, 68.5, 1.4);
      a.lineTo(95.1, 1.6);
      a.lineTo(99, 3.5);
      a.bezierCurveTo(101.2, 4.6, 103.9, 6.6, 105.2, 8.1);
      a.bezierCurveTo(107.7, 11, 153.1, 88.2, 155.8, 94);
      a.bezierCurveTo(159.1, 101.4, 159.6, 104.7, 159.5, 121.6);
      a.bezierCurveTo(159.5, 147.8, 158.4, 177.2, 157.3, 181);
      a.bezierCurveTo(156.8, 182.8, 155.6, 186.1, 154.6, 188.1);
      a.bezierCurveTo(152.6, 192.2, 119.5, 237.2, 115.1, 241.8);
      a.bezierCurveTo(112.1, 244.9, 106.3, 248.3, 102, 249.4);
      a.bezierCurveTo(99.2, 250.1, 13, 261.1, 10.1, 261.1);
      a.bezierCurveTo(9.2, 261.1, 7.5, 260.6, 6.2, 259.9);
      a.closePath();
      a.fillStyle = 'rgba(200,200,200,1)';
      a.fill();
      a.beginPath();
      a.moveTo(234.1, 183.4);
      a.bezierCurveTo(180.2, 179.7, 182.3, 180, 179.5, 174.5);
      a.lineTo(178, 171.4);
      a.lineTo(178.7, 142.4);
      a.bezierCurveTo(179.4, 114.8, 179.5, 113.3, 180.9, 110.4);
      a.bezierCurveTo(183.5, 105, 182.7, 105.2, 237.9, 95.3);
      a.bezierCurveTo(285.1, 86.7, 287.9, 86.3, 291, 87.1);
      a.bezierCurveTo(292.8, 87.6, 295.3, 88.8, 296.7, 89.9);
      a.bezierCurveTo(299.1, 91.8, 321.9, 124.4, 325, 130.3);
      a.bezierCurveTo(326.9, 134, 327.2, 139.1, 325.7, 142.6);
      a.bezierCurveTo(324.5, 145.5, 302.5, 179.1, 300.2, 181.5);
      a.bezierCurveTo(297, 184.9, 293.5, 186.3, 287.4, 186.5);
      a.bezierCurveTo(284.4, 186.6, 260.4, 185.2, 234.1, 183.4);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(435.8, 153.4);
      a.bezierCurveTo(434.8, 153.1, 433, 152.3, 431.7, 151.6);
      a.bezierCurveTo(428.4, 150, 410.1, 137.1, 407, 134.4);
      a.bezierCurveTo(404.1, 131.8, 402.7, 128.3, 403.2, 125.1);
      a.bezierCurveTo(403.6, 122.9, 420.3, 81.3, 423, 75.9);
      a.bezierCurveTo(424.7, 72.6, 426.6, 70.4, 429.3, 68.9);
      a.bezierCurveTo(431.1, 67.9, 435, 67.7, 462.2, 67.6);
      a.lineTo(493.1, 67.3);
      a.lineTo(495.4, 69.6);
      a.bezierCurveTo(497, 71.3, 497.8, 72.8, 498.1, 75);
      a.bezierCurveTo(498.4, 76.6, 498.5, 92.9, 498.4, 111.1);
      a.bezierCurveTo(498.2, 141.2, 498.1, 144.3, 497, 146.3);
      a.bezierCurveTo(494.8, 150.3, 493.3, 150.6, 470.3, 152.4);
      a.bezierCurveTo(448.6, 154, 438.8, 154.3, 435.8, 153.4);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(346.6, 125.3);
      a.bezierCurveTo(345, 124.5, 342.6, 122.6, 341.4, 121);
      a.bezierCurveTo(337.1, 115.7, 313, 79.8, 311.6, 76.7);
      a.bezierCurveTo(309.4, 71.7, 309.3, 68, 311.2, 58.2);
      a.bezierCurveTo(319.2, 16.9, 321.3, 7.1, 322.4, 5.2);
      a.bezierCurveTo(323.1, 4, 324.7, 2.4, 326, 1.6);
      a.bezierCurveTo(328.3, 0.3, 329.4, 0.3, 353.9, 0.3);
      a.bezierCurveTo(379.2, 0.3, 379.5, 0.3, 382.4, 1.8);
      a.bezierCurveTo(384, 2.7, 386, 4.5, 386.9, 5.9);
      a.bezierCurveTo(388.6, 8.6, 405.1, 46.3, 407.2, 52.2);
      a.bezierCurveTo(408.7, 56.3, 408.8, 60.7, 407.7, 64.1);
      a.bezierCurveTo(407.3, 65.4, 402.2, 78.2, 396.3, 92.7);
      a.bezierCurveTo(382.6, 126.3, 384.1, 124.6, 366.6, 126);
      a.bezierCurveTo(353.4, 127.1, 350, 127, 346.6, 125.3);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(179.2, 85.6);
      a.bezierCurveTo(175.7, 84.6, 171.9, 82, 170, 79.2);
      a.bezierCurveTo(167.2, 75.2, 130.6, 12.4, 129.3, 9.3);
      a.bezierCurveTo(128.2, 6.7, 128.1, 5.9, 128.8, 4.2);
      a.bezierCurveTo(130.5, 0, 125.2, 0.3, 211.7, 0);
      a.bezierCurveTo(255.3, -0.1, 292.2, 0, 293.9, 0.3);
      a.bezierCurveTo(297.7, 0.8, 301.1, 4, 301.8, 7.6);
      a.bezierCurveTo(302.3, 10.5, 293.9, 55.2, 291.9, 59.6);
      a.bezierCurveTo(290.4, 63, 286.1, 66.9, 282.3, 68.3);
      a.bezierCurveTo(279.6, 69.3, 193.5, 85.1, 185.5, 86.1);
      a.bezierCurveTo(183.8, 86.3, 181, 86.1, 179.2, 85.6);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(431.9, 47.7);
      a.bezierCurveTo(428.7, 46.9, 426.4, 45.2, 424.6, 42.3);
      a.bezierCurveTo(421.8, 37.8, 409.2, 7.7, 409.2, 5.5);
      a.bezierCurveTo(409.2, 1.2, 408, 1.3, 451.6, 1.3);
      a.bezierCurveTo(495, 1.3, 494, 1.2, 496.1, 5.4);
      a.bezierCurveTo(497, 7.2, 497.2, 10.2, 497, 25.5);
      a.lineTo(496.8, 43.5);
      a.lineTo(494.9, 45.4);
      a.lineTo(493, 47.3);
      a.lineTo(474.8, 47.7);
      a.bezierCurveTo(450.1, 48.3, 434.5, 48.3, 431.9, 47.7);
      a.closePath();
      a.fillStyle = 'rgba(200,200,200,1)';
      a.fill();
      a.beginPath();
      a.moveTo(1.3, 511.9);
      a.lineTo(1.3, 514.3);
      a.lineTo(3.7, 514.3);
      a.bezierCurveTo(7.2, 514.4, 9.5, 515.5, 10.6, 517.6);
      a.bezierCurveTo(11.7, 519.8, 12.1, 522.7, 12, 526.3);
      a.lineTo(12, 591);
      a.lineTo(22.8, 591);
      a.lineTo(22.8, 553.2);
      a.lineTo(49.9, 553.2);
      a.lineTo(49.9, 548.5);
      a.lineTo(22.8, 548.5);
      a.lineTo(22.8, 516.7);
      a.lineTo(41.9, 516.7);
      a.bezierCurveTo(46.7, 516.7, 50.4, 517.8, 52.9, 520);
      a.bezierCurveTo(55.5, 522.2, 56.8, 525.7, 56.8, 530.5);
      a.lineTo(59.2, 530.5);
      a.lineTo(59.2, 521.5);
      a.bezierCurveTo(59.3, 519, 58.7, 516.8, 57.3, 514.9);
      a.bezierCurveTo(55.9, 513, 53.1, 512, 49, 511.9);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(107.6, 562.8);
      a.bezierCurveTo(107.6, 569.9, 106.2, 575.7, 103.5, 580.3);
      a.bezierCurveTo(100.8, 584.8, 97.2, 587.2, 92.7, 587.4);
      a.bezierCurveTo(88.1, 587.2, 84.5, 584.8, 81.8, 580.3);
      a.bezierCurveTo(79.1, 575.7, 77.8, 569.9, 77.7, 562.8);
      a.bezierCurveTo(77.8, 555.8, 79.1, 550, 81.8, 545.4);
      a.bezierCurveTo(84.5, 540.8, 88.1, 538.4, 92.7, 538.3);
      a.bezierCurveTo(97.2, 538.4, 100.8, 540.8, 103.5, 545.4);
      a.bezierCurveTo(106.2, 550, 107.6, 555.8, 107.6, 562.8);
      a.moveTo(66.3, 562.8);
      a.bezierCurveTo(66.4, 571.1, 68.7, 578, 73.2, 583.5);
      a.bezierCurveTo(77.8, 589.1, 84.2, 591.9, 92.7, 592.1);
      a.bezierCurveTo(101.1, 591.9, 107.6, 589.1, 112.1, 583.5);
      a.bezierCurveTo(116.7, 578, 118.9, 571.1, 119, 562.8);
      a.bezierCurveTo(118.9, 554.5, 116.7, 547.6, 112.1, 542.1);
      a.bezierCurveTo(107.6, 536.6, 101.1, 533.7, 92.7, 533.5);
      a.bezierCurveTo(84.2, 533.7, 77.8, 536.6, 73.2, 542.1);
      a.bezierCurveTo(68.7, 547.6, 66.4, 554.5, 66.3, 562.8);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(161.5, 579.6);
      a.bezierCurveTo(160.3, 581.4, 158.9, 583.1, 157.2, 584.5);
      a.bezierCurveTo(155.4, 585.9, 153.1, 586.7, 150.1, 586.8);
      a.bezierCurveTo(147, 586.8, 144.4, 585.9, 142.2, 584);
      a.bezierCurveTo(140, 582.1, 138.9, 579.3, 138.8, 575.4);
      a.bezierCurveTo(138.8, 571.7, 140.5, 568.9, 143.8, 566.7);
      a.bezierCurveTo(147.2, 564.6, 151.9, 563.5, 157.9, 563.4);
      a.lineTo(161.5, 563.4);
      a.moveTo(172.3, 591);
      a.lineTo(172.3, 558.6);
      a.bezierCurveTo(172.1, 548.2, 169.9, 541.3, 165.8, 538);
      a.bezierCurveTo(161.7, 534.7, 156.9, 533.2, 151.3, 533.5);
      a.bezierCurveTo(147.6, 533.5, 144.1, 533.8, 140.8, 534.5);
      a.bezierCurveTo(137.4, 535.1, 135, 536.2, 133.4, 537.7);
      a.bezierCurveTo(131.9, 539.2, 131.1, 540.8, 130.7, 542.6);
      a.bezierCurveTo(130.4, 544.4, 130.3, 546.4, 130.4, 548.5);
      a.lineTo(135.8, 548.5);
      a.bezierCurveTo(136.7, 544.6, 138.3, 542, 140.5, 540.5);
      a.bezierCurveTo(142.8, 538.9, 145.6, 538.2, 148.9, 538.3);
      a.bezierCurveTo(152.6, 538.1, 155.6, 539.4, 157.9, 542.2);
      a.bezierCurveTo(160.2, 545, 161.4, 550.5, 161.5, 558.6);
      a.lineTo(157.9, 558.6);
      a.bezierCurveTo(149.6, 558.5, 142.5, 559.7, 136.6, 562.1);
      a.bezierCurveTo(130.7, 564.5, 127.6, 568.9, 127.4, 575.4);
      a.bezierCurveTo(127.7, 581.8, 129.8, 586.3, 133.6, 588.7);
      a.bezierCurveTo(137.4, 591.1, 141.1, 592.3, 144.7, 592.1);
      a.bezierCurveTo(149.2, 592.1, 152.8, 591.3, 155.6, 590);
      a.bezierCurveTo(158.3, 588.6, 160.3, 587.1, 161.5, 585.6);
      a.lineTo(162.1, 585.6);
      a.lineTo(166.3, 591);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(200.3, 539.5);
      a.bezierCurveTo(199.8, 538, 198.7, 536.8, 197, 536);
      a.bezierCurveTo(195.4, 535.1, 193.1, 534.7, 190.2, 534.7);
      a.lineTo(179.4, 534.7);
      a.lineTo(179.4, 537.1);
      a.lineTo(181.8, 537.1);
      a.bezierCurveTo(185.3, 537.1, 187.6, 538.2, 188.7, 540.4);
      a.bezierCurveTo(189.8, 542.5, 190.3, 545.4, 190.2, 549.1);
      a.lineTo(190.2, 591);
      a.lineTo(200.9, 591);
      a.lineTo(200.9, 545.2);
      a.bezierCurveTo(202.4, 543.5, 204.2, 542, 206.2, 540.8);
      a.bezierCurveTo(208.3, 539.6, 210.5, 538.9, 212.9, 538.9);
      a.bezierCurveTo(215.9, 538.8, 218.3, 540, 219.9, 542.5);
      a.bezierCurveTo(221.6, 544.9, 222.4, 549.1, 222.5, 555);
      a.lineTo(222.5, 591);
      a.lineTo(233.2, 591);
      a.lineTo(233.2, 555);
      a.bezierCurveTo(233.3, 553.8, 233.2, 552.3, 233.2, 550.6);
      a.bezierCurveTo(233.1, 549, 232.9, 547.6, 232.6, 546.7);
      a.bezierCurveTo(233.9, 544.8, 235.7, 543, 238, 541.4);
      a.bezierCurveTo(240.4, 539.8, 242.7, 539, 245.2, 538.9);
      a.bezierCurveTo(248.2, 538.8, 250.6, 540, 252.3, 542.5);
      a.bezierCurveTo(253.9, 544.9, 254.8, 549.1, 254.8, 555);
      a.lineTo(254.8, 591);
      a.lineTo(265.6, 591);
      a.lineTo(265.6, 555);
      a.bezierCurveTo(265.4, 546.5, 263.8, 540.8, 260.6, 537.8);
      a.bezierCurveTo(257.4, 534.7, 253.4, 533.3, 248.8, 533.5);
      a.bezierCurveTo(245.4, 533.5, 242.2, 534.2, 238.9, 535.7);
      a.bezierCurveTo(235.7, 537.1, 233, 539.2, 230.9, 541.9);
      a.bezierCurveTo(229.3, 538.6, 227.3, 536.4, 224.8, 535.2);
      a.bezierCurveTo(222.3, 534, 219.5, 533.4, 216.5, 533.5);
      a.bezierCurveTo(212.9, 533.6, 209.8, 534.2, 207.1, 535.4);
      a.bezierCurveTo(204.5, 536.5, 202.4, 537.9, 200.9, 539.5);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(284, 511.9);
      a.bezierCurveTo(279.9, 512, 277.2, 513, 275.8, 514.9);
      a.bezierCurveTo(274.4, 516.8, 273.7, 519, 273.8, 521.5);
      a.lineTo(273.8, 530.5);
      a.lineTo(276.2, 530.5);
      a.bezierCurveTo(276.3, 525.7, 277.6, 522.2, 280.1, 520);
      a.bezierCurveTo(282.7, 517.8, 286.4, 516.7, 291.2, 516.7);
      a.lineTo(302, 516.7);
      a.lineTo(302, 590.9);
      a.lineTo(312.7, 590.9);
      a.lineTo(312.7, 516.7);
      a.lineTo(339.7, 516.7);
      a.lineTo(339.7, 511.9);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(349.4, 590.9);
      a.lineTo(360.2, 590.9);
      a.lineTo(360.2, 546.7);
      a.bezierCurveTo(361.4, 544.8, 363, 543.4, 364.9, 542.3);
      a.bezierCurveTo(366.9, 541.2, 369.1, 540.7, 371.5, 540.7);
      a.bezierCurveTo(373.7, 540.7, 375.5, 541, 377.2, 541.6);
      a.bezierCurveTo(378.9, 542.2, 380.2, 543.1, 381.1, 544.3);
      a.lineTo(385.9, 540.7);
      a.bezierCurveTo(385.3, 539.5, 384.7, 538.4, 384, 537.5);
      a.bezierCurveTo(383.4, 536.6, 382.6, 535.9, 381.7, 535.3);
      a.bezierCurveTo(380.8, 534.7, 379.7, 534.2, 378.3, 533.9);
      a.bezierCurveTo(377, 533.6, 375.8, 533.5, 374.5, 533.5);
      a.bezierCurveTo(370.9, 533.6, 367.9, 534.3, 365.5, 535.7);
      a.bezierCurveTo(363.2, 537, 361.4, 538.5, 360.2, 540.1);
      a.lineTo(359.6, 540.1);
      a.bezierCurveTo(359, 538.3, 357.9, 536.9, 356.3, 536);
      a.bezierCurveTo(354.6, 535.1, 352.4, 534.7, 349.4, 534.7);
      a.lineTo(339.8, 534.7);
      a.lineTo(339.8, 537.1);
      a.lineTo(341, 537.1);
      a.bezierCurveTo(344.5, 537.1, 346.8, 538.2, 347.9, 540.4);
      a.bezierCurveTo(349, 542.5, 349.5, 545.4, 349.4, 549.1);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(440.3, 559.8);
      a.bezierCurveTo(440.3, 551.4, 438.3, 544.9, 434.4, 540.4);
      a.bezierCurveTo(430.4, 535.8, 424.4, 533.5, 416.3, 533.5);
      a.bezierCurveTo(408.8, 533.7, 403, 536.6, 399, 542.1);
      a.bezierCurveTo(395, 547.6, 393, 554.5, 393, 562.8);
      a.bezierCurveTo(393, 571.1, 395.1, 578, 399.3, 583.5);
      a.bezierCurveTo(403.5, 589.1, 409.7, 591.9, 418.1, 592.1);
      a.bezierCurveTo(422.6, 592.2, 426.7, 591.2, 430.2, 589.2);
      a.bezierCurveTo(433.8, 587.2, 437, 584, 439.7, 579.6);
      a.lineTo(437.3, 577.8);
      a.bezierCurveTo(435.2, 580.8, 432.9, 583.1, 430.2, 584.8);
      a.bezierCurveTo(427.6, 586.5, 424.4, 587.3, 420.5, 587.4);
      a.bezierCurveTo(415.4, 587.2, 411.4, 585.1, 408.6, 580.9);
      a.bezierCurveTo(405.8, 576.8, 404.4, 571.3, 404.4, 564.6);
      a.lineTo(440, 564.6);
      a.moveTo(404.4, 559.8);
      a.bezierCurveTo(404.4, 553.7, 405.6, 548.7, 407.9, 544.9);
      a.bezierCurveTo(410.3, 541, 413.3, 539, 416.9, 538.9);
      a.bezierCurveTo(421.1, 538.9, 424.3, 540.8, 426.4, 544.4);
      a.bezierCurveTo(428.4, 548.1, 429.5, 553.2, 429.5, 559.8);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
      a.beginPath();
      a.moveTo(497.1, 559.8);
      a.bezierCurveTo(497.1, 551.4, 495.1, 544.9, 491.2, 540.4);
      a.bezierCurveTo(487.2, 535.8, 481.2, 533.5, 473.1, 533.5);
      a.bezierCurveTo(465.6, 533.7, 459.9, 536.6, 455.9, 542.1);
      a.bezierCurveTo(451.9, 547.6, 449.8, 554.5, 449.8, 562.8);
      a.bezierCurveTo(449.8, 571.1, 451.9, 578, 456.1, 583.5);
      a.bezierCurveTo(460.3, 589.1, 466.6, 591.9, 474.9, 592.1);
      a.bezierCurveTo(479.4, 592.2, 483.5, 591.2, 487.1, 589.2);
      a.bezierCurveTo(490.6, 587.2, 493.8, 584, 496.5, 579.6);
      a.lineTo(494.1, 577.8);
      a.bezierCurveTo(492, 580.8, 489.7, 583.1, 487.1, 584.8);
      a.bezierCurveTo(484.4, 586.5, 481.2, 587.3, 477.3, 587.4);
      a.bezierCurveTo(472.2, 587.2, 468.2, 585.1, 465.4, 580.9);
      a.bezierCurveTo(462.6, 576.8, 461.2, 571.3, 461.2, 564.6);
      a.lineTo(496.8, 564.6);
      a.moveTo(461.2, 559.8);
      a.bezierCurveTo(461.2, 553.7, 462.4, 548.7, 464.8, 544.9);
      a.bezierCurveTo(467.1, 541, 470.1, 539, 473.7, 538.9);
      a.bezierCurveTo(477.9, 538.9, 481.1, 540.8, 483.2, 544.4);
      a.bezierCurveTo(485.3, 548.1, 486.3, 553.2, 486.3, 559.8);
      a.closePath();
      a.fillStyle = 'rgba(220,20,3,1)';
      a.fill();
    };
  })();
  Sa.yc = { width: 498, height: 592 };
  function Ta(a, l) {
    function k(a, b) {
      var c = a.K.Ob;
      const d = c / 15;
      const e = (0.5 * c) / 15;
      var c = c / 5;
      const f = a.K.x;
      const g = a.K.y;
      b.fillRect(f - e, g - e, d, d);
      b.fillRect(f - e - c, g - e, d, d);
      b.fillRect(f - e + c, g - e, d, d);
    }
    function f(a, b, c, d) {
      a === null && c.clearRect(0, 0, H, Q);
      let e;
      const f = Array(W.length);
      for (e = W.length - 1; e >= 0; e--) f[e] = W[e].qa(c, d);
      for (e = W.length - 1; e >= 0; e--) f[e] && W[e].W(c, d);
      T.Jc([c, C], function(d) {
        let e;
        if (a !== null) {
          c.save();
          c.globalCompositeOperation = 'destination-out';
          c.fillStyle = c.strokeStyle = 'rgba(255, 255, 255, 1)';
          for (e = a.length - 1; e >= 0; e--) {
            var g = a[e];
            var h = g.o;
            h &&
              (c.save(),
              c.beginPath(),
              g.Tb(c),
              ia.le(c, h),
              c.fill(),
              (g = u.mb * Math.pow(u.Ra, g.R - 1)),
              g > 0 && ((c.lineWidth = g / 2), c.stroke()),
              c.restore());
          }
          c.restore();
        }
        d = d.scale;
        if (b.length !== 0) {
          e = {};
          for (h = W.length - 1; h >= 0; h--) W[h].Og(e);
          for (g = $.length - 1; g >= 0; g--)
            if (((h = $[g]), e[h.id]))
              for (var k = h.be, h = 0; h < b.length; h++) {
                const l = b[h];
                !l.parent || (l.parent.Ca && l.parent.M) ? k(l, d) : l.ba.clear();
              }
        }
        for (e = W.length - 1; e >= 0; e--) (g = W[e]), f[e] && g.ee(b, c, d);
      });
      for (e = W.length - 1; e >= 0; e--) f[e] && W[e].Da(c);
      u.rd &&
        ((c.canvas.style.opacity = 0.99),
        setTimeout(function() {
          c.canvas.style.opacity = 1;
        }, 1));
    }
    function d(a) {
      s === t ? a < 0.9 * q && ((s = w), (x = A), e()) : a >= q && ((s = t), (x = B), e());
    }
    function c() {
      function a(b, c, d) {
        b.Cb = Math.floor(1e3 * b.scale) - d * c;
        b.opacity > 0 && !b.open && c++;
        const { e } = b;
        if (e) for (let f = e.length - 1; f >= 0; f--) b.$ && a(e[f], c, d);
      }
      let b = null;
      let c = null;
      let e = null;
      T.Jc([], function(f) {
        d(f.scale);
        let h = !1;
        Z.F(z, function(a) {
          a.$ && ((h = a.Nd() || h), a.nc(), (a.Sa = P.d(a) || a.Sa));
        });
        h && (z.I = !0);
        const k = u.oh === 'onSurfaceDirty';
        Z.xd(z, function(a) {
          a.parent && a.parent.Z && (a.ba.clear(), (a.Sa = !0), k || ((a.Fc = !0), a.ac.clear()));
          k && ((a.Fc = !0), a.ac.clear());
        });
        const l = f.scale * f.scale;
        Z.xd(z, function(a) {
          if (a.M) {
            for (let b = a.e, c = 0; c < b.length; c++)
              if (b[c].K.ja * l > 5) {
                a.X = !0;
                return;
              }
            a.X = !1;
          }
        });
        n(f);
        e = [];
        Z.Lc(z, function(a) {
          if (a.parent.X && a.ea && a.$) {
            e.push(a);
            for (var b = a.parent; b !== z && (b.open || b.opacity === 0); ) b = b.parent;
            b !== z && Math.abs(b.scale - a.scale) < 0.02 && (a.scale = Math.min(a.scale, b.scale));
          }
        });
        a(z, 0, u.Ua == 'flattened' ? -1 : 1);
        e.sort(function(a, b) {
          return a.Cb - b.Cb;
        });
        if (g()) (b = e), (c = null);
        else {
          const m = {};
          const p = {};
          const q = u.Cd != 'none' && u.mb < u.nb / 2;
          const r = u.mb < u.Rc / 2 + u.Bd * u.Xe.a;
          Z.F(z, function(a) {
            if (a.$ && !a.description && (a.Z || a.I || (a.Yc && a.parent.X && a.Sa))) {
              let b;
              let c;
              const d = [a];
              const e = a.C || a.parent.e;
              if (q) for (b = 0; b < e.length; b++) (c = e[b]) && d.push(c);
              else if (r)
                if (!a.selected && a.ab) {
                  c = !0;
                  for (b = 0; b < e.length; b++) e[b] ? d.push(e[b]) : (c = !1);
                  !c && a.R > 1 && d.push(a.parent);
                } else for (b = 0; b < e.length; b++) (c = e[b]) && c.selected && d.push(c);
              let f;
              for (b = a.parent; b != z; ) b.selected && (f = b), (b = b.parent);
              f && d.push(f);
              for (b = 0; b < d.length; b++) {
                f = d[b];
                for (a = f.parent; a && a !== z; ) a.opacity > 0 && (f = a), (a = a.parent);
                p[f.id] = !0;
                Z.Fa(f, function(a) {
                  m[a.id] = !0;
                });
              }
            }
          });
          b = e.filter(function(a) {
            return m[a.id];
          });
          c = b.filter(function(a) {
            return p[a.id];
          });
        }
      });
      (function() {
        let a = !1;
        u.ag &&
          Z.F(z, function(b) {
            if (b.$ && b.sa.a !== 0 && b.sa.a !== 1) return (a = !0), !1;
          });
        a
          ? (Z.Kc(z, function(a) {
              if (a.$ && (a.opacity !== a.bd || a.Ma)) {
                const b = a.e;
                if (b) {
                  for (var c = 0, d = b.length - 1; d >= 0; d--) c = Math.max(c, b[d].Xc);
                  a.Xc = c + a.opacity * a.sa.a;
                } else a.Xc = a.opacity * a.sa.a;
              }
            }),
            Z.F(z, function(a) {
              if (a.$ && (a.opacity !== a.bd || a.Ma)) {
                for (var b = a.Xc, c = a; (c = c.parent) && c !== z; )
                  b += c.opacity * c.sa.a * u.Zf;
                a.sd = b > 0 ? 1 - Math.pow(1 - a.sa.a, 1 / b) : 0;
                a.bd = a.opacity;
              }
            }))
          : Z.F(z, function(a) {
              a.$ && ((a.sd = 1), (a.bd = -1));
            });
      })();
      return { wg: b, vg: c, ea: e };
    }
    function g() {
      let a = z.Z || z.I || u.ef == 'none';
      if (!a && !z.empty()) {
        const b = z.e[0].scale;
        Z.F(z, function(c) {
          if (c.$ && c.ea && c.scale !== b) return (a = !0), !1;
        });
      }
      !a &&
        u.Re > 0 &&
        u.Xa != 1 &&
        Z.F(z, function(b) {
          if (b.$ && b.ka > 0) return (a = !0), !1;
        });
      u.ef == 'accurate' &&
        ((a = (a = a || u.mb === 0) || (u.Cd != 'none' && u.mb < u.nb / 2)),
        !a &&
          u.mb < u.Rc / 2 + u.Bd * u.Xe.a &&
          Z.F(z, function(b) {
            if (b.$ && ((b.selected && !b.ab) || (!b.selected && b.ab))) return (a = !0), !1;
          }));
      return a;
    }
    function m() {
      if (u.n !== u.yb) return !0;
      const a = 'polygonPlainFill polygonPlainStroke polygonGradientFill polygonGradientStroke labelPlainFill contentDecoration'.split(
        ' ',
      );
      Z.F(z, function(b) {
        if (b.$ && b.U) return a.push('polygonExposureShadow'), !1;
      });
      for (let b = a.length - 1; b >= 0; b--) {
        const c = a[b];
        if (!!E[c] !== !!J[c]) return !0;
      }
      return !1;
    }
    function e() {
      function a(c, d, e, f, g) {
        function h(a, b, c, d, e) {
          a[d] && ((b -= c * p[d]), (a[d] = !1), e && ((b += c * p[e]), (a[e] = !0)));
          return b;
        }
        c = D.extend({}, c);
        switch (e) {
          case 'never':
            c.labelPlainFill = !1;
            break;
          case 'always':
          case 'auto':
            c.labelPlainFill = !0;
        }
        if (u.Pc)
          switch (f) {
            case 'never':
              c.contentDecoration = !1;
              break;
            case 'always':
            case 'auto':
              c.contentDecoration = !0;
          }
        else c.contentDecoration = !1;
        let k = 0;
        D.Ga(c, function(a, b) {
          a && (k += d * p[b === 'contentDecoration' ? 'labelPlainFill' : b]);
        });
        c.polygonExposureShadow = b;
        k += 2 * p.polygonExposureShadow;
        if (
          k <= g ||
          (k = h(c, k, 2, 'polygonExposureShadow')) <= g ||
          (k = h(c, k, d, 'polygonGradientFill', 'polygonPlainFill')) <= g ||
          (k = h(c, k, d, 'polygonGradientStroke')) <= g ||
          (k = h(c, k, d, 'polygonPlainStroke')) <= g ||
          (f === 'auto' && (k = h(c, k, d, 'contentDecoration')) <= g)
        )
          return c;
        e === 'auto' && (k = h(c, k, d, 'labelPlainFill'));
        return c;
      }
      var b = s === w;
      let c = 0;
      let d = 0;
      Z.He(z, function(a) {
        let b = 1;
        Z.F(a, function() {
          b++;
        });
        c += b;
        d = Math.max(d, b);
      });
      const e = {};
      switch (u.xh) {
        case 'plain':
          e.polygonPlainFill = !0;
          break;
        case 'gradient':
          (e.polygonPlainFill = !b), (e.polygonGradientFill = b);
      }
      switch (u.Cd) {
        case 'plain':
          e.polygonPlainStroke = !0;
          break;
        case 'gradient':
          (e.polygonPlainStroke = !b), (e.polygonGradientStroke = b);
      }
      E = a(e, c, u.Fj, u.Dj, u.Ej);
      J = a(e, 2 * d, 'always', 'always', u.hh);
      I = a(e, c, 'always', 'always', u.gh);
    }
    function b(a) {
      return function(b, c) {
        return b === s ? !0 === E[a] : !0 === (c ? J : I)[a];
      };
    }
    function h(a, b) {
      return function(c, d) {
        return a(c, d) && b(c, d);
      };
    }
    function n(a) {
      z.ea = !0;
      Z.xd(z, function(b) {
        if (b.$ && b.X && b.Ca && b.M && (z.I || b.Z || b.me)) {
          b.me = !1;
          const c = b.e;
          const d = { x: 0, y: 0, f: 0, i: 0 };
          var e = !!b.u;
          if (H / a.f > 1) {
            var f;
            for (f = c.length - 1; f >= 0; f--) c[f].ea = !1;
            if (b.ea && e)
              for (f = c.length - 1; f >= 0; f--)
                if (
                  ((b = c[f]),
                  b.scale !== 1 && (b.Vb(a, d), (d.f = a.f / b.scale), (d.i = a.i / b.scale)),
                  !1 === b.ea && b.o)
                ) {
                  var e = b.o;
                  const g = e.length;
                  if (M.Va(b.o, b.scale === 1 ? a : d)) b.ea = !0;
                  else
                    for (let h = 0; h < g; h++)
                      if (M.Mg(e[h], e[(h + 1) % g], b.scale === 1 ? a : d)) {
                        b.ea = !0;
                        b.C && (b = b.C[h]) && (c[b.index].ea = !0);
                        break;
                      }
                }
          } else for (f = 0; f < c.length; f++) c[f].ea = e;
        }
      });
    }
    var q = v.of() ? 50 : 1e4;
    let p;
    let r;
    let s;
    let w;
    let t;
    let y;
    let x;
    let A;
    let B;
    let K;
    let C;
    let H;
    let Q;
    let O;
    var P = new Ua(a);
    const F = new Va(a);
    let T;
    let N;
    let U;
    var u = a.options;
    let z;
    let L;
    let E;
    let I;
    let J;
    a.c.j('stage:initialized', function(a, b, c, d) {
      O = a;
      H = c;
      Q = d;
      r = O.oc('wireframe', u.yb, !1);
      w = r.getContext('2d');
      t = new ha(w);
      y = O.oc('hifi', u.n, !1);
      A = y.getContext('2d');
      B = new ha(A);
      s = w;
      x = A;
      w.n = u.yb;
      t.n = u.yb;
      A.n = u.n;
      B.n = u.n;
      K = O.oc('tmp', Math.max(u.n, u.yb), !0);
      C = K.getContext('2d');
      C.n = 1;
      [w, A, C].forEach(function(a) {
        a.scale(a.n, a.n);
      });
    });
    a.c.j('stage:resized', function(a, b, c, d) {
      H = c;
      Q = d;
      [w, A, C].forEach(function(a) {
        a.scale(a.n, a.n);
      });
    });
    a.c.j('model:loaded', function(b) {
      function c(a) {
        let b = 0;
        if (!a.empty()) {
          for (let d = a.e, e = d.length - 1; e >= 0; e--) b = Math.max(b, c(d[e]));
          b += 1;
        }
        return (a.ng = b);
      }
      z = b;
      L = !0;
      c(z);
      e();
      a.c.p('render:renderers:resolved', E, J, I);
    });
    const R = 'groupFillType groupStrokeType wireframeDrawMaxDuration wireframeLabelDrawing wireframeContentDecorationDrawing finalCompleteDrawMaxDuration finalIncrementalDrawMaxDuration groupContentDecorator'.split(
      ' ',
    );
    const Y = [
      'groupLabelLightColor',
      'groupLabelDarkColor',
      'groupLabelColorThreshold',
      'groupUnexposureLabelColorThreshold',
    ];
    a.c.j('options:changed', function(a) {
      function b(a, c, d, e) {
        O.fj(a, d);
        c.n = d;
        e && c.scale(d, d);
      }
      a.dataObject ||
        (D.ob(a, R) && e(),
        D.ob(a, Y) &&
          Z.F(z, function(a) {
            a.zd = -1;
          }));
      const c = D.Q(a, 'pixelRatio');
      a = D.Q(a, 'wireframePixelRatio');
      if (c || a) c && b(y, x, u.n, !0), a && b(r, s, u.yb, !0), b(K, C, Math.max(u.n, u.yb), !1);
    });
    a.c.j('zoom:initialized', function(a) {
      T = a;
    });
    a.c.j('timeline:initialized', function(a) {
      N = a;
    });
    a.c.j('api:initialized', function(a) {
      U = a;
    });
    var $ = [
      {
        id: 'offsetPolygon',
        be(a) {
          if ((a.selected || (a.opacity > 0 && !1 === a.open) || !a.X) && a.ba.Na()) {
            const b = a.ba;
            b.clear();
            if (a.aa) {
              const c = a.aa;
              let d = u.jh;
              d > 0
                ? ((d = Math.min(1, d * Math.pow(1 - u.kh * d, a.ng))),
                  ia.rj(b, c, a.parent.K.Ob / 32, d))
                : ia.le(b, c);
            }
            a.Vd = !0;
          }
        },
      },
      {
        id: 'label',
        be(a) {
          a.Sa && a.Yc && P.k(a);
        },
      },
      {
        id: 'custom',
        be(b, c) {
          if (
            b.aa &&
            ((b.opacity > 0 && (!1 === b.open || !0 === b.selected)) || !b.X) &&
            b.Fc &&
            a.options.Pc &&
            !b.na
          ) {
            const d = {};
            U.pd(d, b);
            U.qd(d, b);
            U.od(d, b, !0);
            d.context = b.ac;
            d.polygonContext = b.ba;
            d.labelContext = b.Uc;
            d.shapeDirty = b.Vd;
            d.viewportScale = c;
            const e = { groupLabelDrawn: !0, groupPolygonDrawn: !0 };
            a.options.nh(a.Ud, d, e);
            e.groupLabelDrawn || (b.pf = !1);
            e.groupPolygonDrawn || (b.Wd = !1);
            b.Vd = !1;
            b.Fc = !1;
          }
        },
      },
    ].reverse();
    var W = [
      new (function(a) {
        const b = Array(a.length);
        this.ee = function(c, d, e) {
          if (c.length !== 0) {
            let f;
            let g;
            const h = [];
            let k = c[0].Cb;
            for (f = 0; f < c.length; f++) (g = c[f]), g.Cb !== k && (h.push(f), (k = g.Cb));
            h.push(f);
            for (let l = (k = 0); l < h.length; l++) {
              for (var m = h[l], p = a.length - 1; p >= 0; p--)
                if (b[p]) {
                  const n = a[p];
                  d.save();
                  for (f = k; f < m; f++)
                    (g = c[f]), d.save(), g.Tb(d), n.wb.call(n, g, d, e), d.restore();
                  n.ib.call(n, d, e);
                  d.restore();
                }
              k = m;
            }
          }
        };
        this.qa = function(c, d) {
          for (var e = !1, f = a.length - 1; f >= 0; f--) (b[f] = a[f].qa(c, d)), (e |= b[f]);
          return e;
        };
        this.W = function(c, d) {
          for (let e = a.length - 1; e >= 0; e--)
            if (b[e]) {
              const f = a[e];
              f.W.call(f, c, d);
            }
        };
        this.Da = function(c) {
          for (let d = a.length - 1; d >= 0; d--)
            if (b[d]) {
              const e = a[d];
              e.Da.call(e, c);
            }
        };
        this.Og = function(c) {
          for (let d = a.length - 1; d >= 0; d--) {
            const e = a[d];
            if (b[d]) for (let f = e.$a.length - 1; f >= 0; f--) c[e.$a[f]] = !0;
          }
        };
      })(
        [
          {
            $a: ['offsetPolygon'],
            qa: b('polygonExposureShadow'),
            W(a) {
              C.save();
              C.scale(a.n, a.n);
            },
            Da() {
              C.restore();
            },
            d() {},
            ib(a) {
              this.mg &&
                ((this.mg = !1),
                a.save(),
                a.setTransform(1, 0, 0, 1, 0, 0),
                a.drawImage(
                  K,
                  0,
                  0,
                  a.canvas.width,
                  a.canvas.height,
                  0,
                  0,
                  a.canvas.width,
                  a.canvas.height,
                ),
                a.restore(),
                C.save(),
                C.setTransform(1, 0, 0, 1, 0, 0),
                C.clearRect(0, 0, K.width, K.height),
                C.restore());
            },
            wb(a, b, c) {
              if (!((a.open && a.X) || a.ba.Na())) {
                const d =
                  u.Re *
                  a.opacity *
                  a.ka *
                  (u.Ua == 'flattened' ? 1 - a.parent.ka : (1 - a.Lb) * a.parent.Lb) *
                  (u.Xa >= 1.1 ? 1 : (u.Xa - 1) / 0.1);
                d > 0 &&
                  (C.save(),
                  C.beginPath(),
                  a.Tb(C),
                  a.ba.Ta(C),
                  (C.shadowBlur = c * b.n * d),
                  (C.shadowColor = u.ph),
                  (C.fillStyle = 'rgba(0, 0, 0, 1)'),
                  (C.globalCompositeOperation = 'source-over'),
                  (C.globalAlpha = a.opacity),
                  C.fill(),
                  (C.shadowBlur = 0),
                  (C.shadowColor = 'transparent'),
                  (C.globalCompositeOperation = 'destination-out'),
                  C.fill(),
                  C.restore(),
                  (this.mg = !0));
              }
            },
          },
          {
            $a: ['offsetPolygon'],
            qa() {
              return !0;
            },
            W: (function() {
              function a(b) {
                const d = b.sa;
                const e = b.Eb;
                const f = b.selected;
                const g = c(d.l * b.va + (e ? u.Ch : 0) + (f ? u.Th : 0));
                const h = c(d.s * b.wa + (e ? u.Dh : 0) + (f ? u.Uh : 0));
                b = b.Qe;
                b.h = (d.h + (e ? u.Bh : 0) + (f ? u.Sh : 0)) % 360;
                b.s = h;
                b.l = g;
                return b;
              }
              function c(a) {
                return a > 100 ? 100 : a < 0 ? 0 : a;
              }
              const d = [
                {
                  type: 'fill',
                  qa: b('polygonPlainFill'),
                  hd(b, c) {
                    c.fillStyle = S.Ac(a(b));
                  },
                },
                {
                  type: 'fill',
                  qa: b('polygonGradientFill'),
                  hd(b, d) {
                    var e = b.K.Ob;
                    const f = a(b);
                    var e = d.createRadialGradient(b.x, b.y, 0, b.x, b.y, e * u.th);
                    e.addColorStop(0, S.Y((f.h + u.qh) % 360, c(f.s + u.sh), c(f.l + u.rh)));
                    e.addColorStop(1, S.Y((f.h + u.uh) % 360, c(f.s + u.wh), c(f.l + u.vh)));
                    b.ba.Ta(d);
                    d.fillStyle = e;
                  },
                },
                {
                  type: 'stroke',
                  qa: h(b('polygonPlainStroke'), function() {
                    return u.nb > 0;
                  }),
                  hd(a, b) {
                    const d = a.sa;
                    const e = a.Eb;
                    const f = a.selected;
                    b.strokeStyle = S.Y(
                      (d.h + u.af + (e ? u.Se : 0) + (f ? u.Ye : 0)) % 360,
                      c(d.s * a.wa + u.cf + (e ? u.Ue : 0) + (f ? u.$e : 0)),
                      c(d.l * a.va + u.bf + (e ? u.Te : 0) + (f ? u.Ze : 0)),
                    );
                    b.lineWidth = u.nb * Math.pow(u.Ra, a.R - 1);
                  },
                },
                {
                  type: 'stroke',
                  qa: h(b('polygonGradientStroke'), function() {
                    return u.nb > 0;
                  }),
                  hd(a, b) {
                    var d = a.K.Ob * u.$h;
                    var e = a.sa;
                    var f = (Math.PI * u.Wh) / 180;
                    var d = b.createLinearGradient(
                      a.x + d * Math.cos(f),
                      a.y + d * Math.sin(f),
                      a.x + d * Math.cos(f + Math.PI),
                      a.y + d * Math.sin(f + Math.PI),
                    );
                    const g = a.Eb;
                    const h = a.selected;
                    var f = (e.h + u.af + (g ? u.Se : 0) + (h ? u.Ye : 0)) % 360;
                    const k = c(e.s * a.wa + u.cf + (g ? u.Ue : 0) + (h ? u.$e : 0));
                    var e = c(e.l * a.va + u.bf + (g ? u.Te : 0) + (h ? u.Ze : 0));
                    d.addColorStop(0, S.Y((f + u.Xh) % 360, c(k + u.Zh), c(e + u.Yh)));
                    d.addColorStop(1, S.Y((f + u.ai) % 360, c(k + u.ci), c(e + u.bi)));
                    b.strokeStyle = d;
                    b.lineWidth = u.nb * Math.pow(u.Ra, a.R - 1);
                  },
                },
              ];
              const e = Array(d.length);
              return function(a, b) {
                for (let c = d.length - 1; c >= 0; c--) e[c] = d[c].qa(a, b);
                this.vj = d;
                this.Xg = e;
              };
            })(),
            Da() {},
            d() {},
            ib() {},
            wb(a, b) {
              if (
                a.Wd &&
                !(((a.opacity === 0 || a.open) && a.X) || a.ba.Na() || (!u.De && a.description))
              ) {
                let c = this.vj;
                let d = this.Xg;
                b.beginPath();
                a.ba.Ta(b);
                for (var e = !1, f = !1, g = c.length - 1; g >= 0; g--) {
                  const h = c[g];
                  if (d[g])
                    switch ((h.hd(a, b), h.type)) {
                      case 'fill':
                        e = !0;
                        break;
                      case 'stroke':
                        f = !0;
                    }
                }
                c = (a.X ? a.opacity : 1) * a.sa.a;
                d = !a.empty();
                g = u.ag ? a.sd : 1;
                e &&
                  ((e =
                    d && a.X && a.M && a.e[0].$
                      ? 1 -
                        (a.e.reduce(function(a, b) {
                          return a + b.ua * b.Zd;
                        }, 0) /
                          a.e.length) *
                          (1 - u.Zf)
                      : 1),
                  (b.globalAlpha = c * e * g),
                  Wa(b));
                f && ((b.globalAlpha = c * (d ? u.wi : 1) * g), b.closePath(), Xa(b), b.stroke());
              }
            },
          },
          {
            $a: ['offsetPolygon'],
            qa() {
              return u.Rc > 0;
            },
            W() {},
            Da() {},
            d() {},
            ib() {},
            wb(a, b, c) {
              if (a.Wd && a.selected && !a.ba.Na()) {
                b.globalAlpha = a.Ka;
                b.beginPath();
                const d = Math.pow(u.Ra, a.R - 1);
                b.lineWidth = u.Rc * d;
                b.strokeStyle = u.Vh;
                const e = u.Bd;
                e > 0 && ((b.shadowBlur = e * d * c * b.n), (b.shadowColor = u.We));
                a.ba.Ta(b);
                b.closePath();
                b.stroke();
              }
            },
          },
          {
            $a: [],
            qa() {
              return !0;
            },
            W() {},
            Da() {},
            d() {},
            ib() {},
            wb(a, b) {
              function c(d) {
                const e = Sa.yc.width;
                const f = Sa.yc.height;
                var g = M.se(a.aa, a.K, e / f);
                var g = Math.min(Math.min(0.9 * g, 0.5 * a.q.i) / f, (0.5 * a.q.f) / e);
                b.save();
                b.translate(a.x, a.y);
                b.globalAlpha = a.opacity * a.fa;
                b.scale(g, g);
                b.translate(-e / 2, -f / 2);
                d(b);
                b.restore();
              }
              a.na &&
                !a.ba.Na() &&
                c(function(a) {
                  Sa.Gg(a);
                });
            },
          },
          {
            $a: [],
            qa: (function(a, b) {
              return function(c, d) {
                return a(c, d) || b(c, d);
              };
            })(
              b('labelPlainFill'),
              h(b('contentDecoration'), function() {
                return u.Pc;
              }),
            ),
            W() {},
            Da() {},
            d() {},
            ib() {},
            wb(a, b, c) {
              ((a.opacity > 0 && a.fa > 0 && !a.open) || !a.X) &&
                !a.ba.Na() &&
                ((a.Vc = a.ra && a.ra.la && u.n * a.ra.fontSize * a.scale * c >= u.Ph),
                !u.De && a.description
                  ? (a.rb = a.parent.rb)
                  : a.Hd === 'auto'
                  ? ((b = a.Qe),
                    (c = b.h + (b.s << 9) + (b.l << 16)),
                    a.zd !== c &&
                      ((a.rb = S.Cg(b) > (a.ka < 0 ? u.di : u.Eh) ? u.Fh : u.Oh), (a.zd = c)))
                  : (a.rb = a.Hd));
            },
          },
          {
            $a: ['custom'],
            qa: h(b('contentDecoration'), function() {
              return u.Pc;
            }),
            W() {},
            Da() {},
            d() {},
            ib() {},
            wb(a, b) {
              !((a.opacity > 0 && a.fa > 0 && !a.open) || !a.X) ||
                a.ac.Na() ||
                a.ba.Na() ||
                (a.Vc || void 0 === a.ra
                  ? ((b.globalAlpha = a.fa * (a.X ? a.opacity : 1) * (a.empty() ? 1 : u.$f)),
                    (b.fillStyle = a.rb),
                    (b.strokeStyle = a.rb),
                    a.ac.Ta(b))
                  : k(a, b));
            },
          },
          {
            $a: ['label'],
            qa: b('labelPlainFill'),
            W() {},
            Da() {},
            d() {},
            ib() {},
            wb(a, b, c) {
              a.pf &&
                a.Yc &&
                ((a.opacity > 0 && a.fa > 0 && !a.open) || !a.X) &&
                !a.ba.Na() &&
                a.ra &&
                ((b.fillStyle = a.rb),
                (b.globalAlpha = a.fa * (a.X ? a.opacity : 1) * (a.empty() ? 1 : u.$f)),
                a.Vc ? Ya(a, b, c) : k(a, b));
            },
          },
        ].reverse(),
      ),
    ];
    this.H = function() {
      p = ua.ji(
        function() {
          return ja.eh();
        },
        'CarrotSearchFoamTree',
        12096e5,
      )($a());
      F.H();
    };
    this.clear = function() {
      s.clearRect(0, 0, H, Q);
      x.clearRect(0, 0, H, Q);
    };
    let ea = !1;
    let ba = void 0;
    this.k = function(a) {
      ea ? (ba = a) : a();
    };
    this.ee = (function() {
      function a() {
        window.clearTimeout(b);
        ea = !0;
        b = setTimeout(function() {
          ea = !1;
          if (m()) {
            const a = !g();
            f(null, d.ea, x, a);
            D.defer(function() {
              ca.sj();
              ba && (ba(), (ba = void 0));
            });
          }
        }, Math.max(u.Gj, 3 * l.rg.Kd, 3 * l.rg.Jd));
      }
      let b;
      let d;
      return function(b) {
        ab(F);
        d = c();
        const e = d.vg !== null;
        const g = O.kc('hifi') > 0;
        const h = g && (e || !b);
        b = e || L || !b;
        L = !1;
        g && !h && ca.tj();
        f(d.vg, d.wg, h ? x : s, b);
        Z.Fa(z, function(a) {
          a.Z = !1;
          a.I = !1;
          a.ab = !1;
        });
        h || a();
        u.Vf(e);
      };
    })();
    this.d = function(a) {
      a = a || {};
      ab(F);
      z.I = !0;
      const b = c();
      const d = u.n;
      try {
        const e = D.B(a.pixelRatio, u.n);
        u.n = e;
        var g = O.oc('export', e, !0);
        let h = g.getContext('2d');
        s === t && (h = new ha(h));
        h.scale(e, e);
        const k = D.Q(a, 'backgroundColor');
        k && (h.save(), (h.fillStyle = a.backgroundColor), h.fillRect(0, 0, H, Q), h.restore());
        f(k ? [] : null, b.wg, h, !0);
      } finally {
        u.n = d;
      }
      return g.toDataURL(D.B(a.format, 'image/png'), D.B(a.quality, 0.8));
    };
    var ca = (function() {
      function a(b, d, e, f) {
        function g(a, b, c, d) {
          return N.D.m({ opacity: O.kc(a) })
            .ia({
              duration: c,
              G: { opacity: { end: b, P: d } },
              ca() {
                O.kc(a, this.opacity);
              },
            })
            .xa();
        }
        const h = D.Fd(O.kc(b), 1);
        const k = D.Fd(O.kc(e), 0);
        if (!h || !k) {
          for (let l = c.length - 1; l >= 0; l--) c[l].stop();
          c = [];
          h || c.push(g(b, 1, d, X.Rb));
          k || c.push(g(e, 0, f, X.og));
          return N.D.m({})
            .Za(c)
            .start();
        }
      }
      let b;
      var c = [];
      return {
        tj() {
          u.rd
            ? r.style.opacity !== 1 &&
              ((r.style.visibility = 'visible'),
              (y.style.visibility = 'hidden'),
              (r.style.opacity = 1),
              (y.style.opacity = 0))
            : (b && b.Gb()) || (b = a('wireframe', u.Me, 'hifi', u.Me));
        },
        sj() {
          u.rd
            ? ((y.style.visibility = 'visible'),
              (r.style.visibility = 'hidden'),
              (r.style.opacity = 0),
              (y.style.opacity = 1))
            : a('hifi', u.yg, 'wireframe', u.yg);
        },
      };
    })();
    ab = function(a) {
      a.apply();
    };
    Wa = function(a) {
      a.fill();
    };
    Xa = function(a) {
      a.stroke();
    };
    return this;
  }
  let Wa;
  let Xa;
  let ab;
  function Ua(a) {
    function l(a) {
      return f.Nh
        ? ((e.fontFamily = d.fontFamily),
          (e.fontStyle = d.fontStyle),
          (e.fontVariant = d.fontVariant),
          (e.fontWeight = d.fontWeight),
          (e.lineHeight = d.lineHeight),
          (e.horizontalPadding = d.pb),
          (e.verticalPadding = d.eb),
          (e.maxTotalTextHeight = d.tb),
          (e.maxFontSize = d.sb),
          g.Dc(f.Mh, a, e),
          (c.fontFamily = e.fontFamily),
          (c.fontStyle = e.fontStyle),
          (c.fontVariant = e.fontVariant),
          (c.fontWeight = e.fontWeight),
          (c.lineHeight = e.lineHeight),
          (c.pb = e.horizontalPadding),
          (c.eb = e.verticalPadding),
          (c.tb = e.maxTotalTextHeight),
          (c.sb = e.maxFontSize),
          c)
        : d;
    }
    function k(a) {
      typeof a.groupLabelFontFamily !== 'undefined' && (d.fontFamily = a.groupLabelFontFamily);
      typeof a.groupLabelFontStyle !== 'undefined' && (d.fontStyle = a.groupLabelFontStyle);
      typeof a.groupLabelFontVariant !== 'undefined' && (d.fontVariant = a.groupLabelFontVariant);
      typeof a.groupLabelFontWeight !== 'undefined' && (d.fontWeight = a.groupLabelFontWeight);
      typeof a.groupLabelLineHeight !== 'undefined' && (d.lineHeight = a.groupLabelLineHeight);
      typeof a.groupLabelHorizontalPadding !== 'undefined' &&
        (d.pb = a.groupLabelHorizontalPadding);
      typeof a.groupLabelVerticalPadding !== 'undefined' && (d.eb = a.groupLabelVerticalPadding);
      typeof a.groupLabelMaxTotalHeight !== 'undefined' && (d.tb = a.groupLabelMaxTotalHeight);
      typeof a.groupLabelMaxFontSize !== 'undefined' && (d.sb = a.groupLabelMaxFontSize);
    }
    var f = a.options;
    var d = {};
    var c = {};
    let g;
    const m = { groupLabel: '' };
    var e = {};
    a.c.j('api:initialized', function(a) {
      g = a;
    });
    a.c.j('options:changed', k);
    k(a.Ud);
    this.d = function(a) {
      if (!a.aa) return !1;
      let c = a.group.label;
      f.Hh && !a.na && ((m.labelText = c), g.Dc(f.Gh, a, m), (c = m.labelText));
      a.qf = c;
      return a.Id != c;
    };
    this.k = function(a) {
      const c = a.qf;
      a.Id = c;
      a.Uc.clear();
      a.ra = void 0;
      !a.aa ||
        D.jf(c) ||
        (f.Ua == 'flattened' && !a.empty() && a.M) ||
        (a.ra = G.xe(l(a), a.Uc, c, a.aa, a.q, a.K, !1, !1, a.li, a.K.ja, f.Qh, a.Sa));
      a.Sa = !1;
    };
    Ya = this.A = function(a, c) {
      a.Uc.Ta(c);
    };
  }
  let Ya;
  function Va(a) {
    function l(a, c) {
      const d = a.e;
      const e = d.length;
      let f;
      let g;
      const k = m.K.Ob;
      for (f = 0; f < e; f++)
        (g = d[f]),
          (g.Db = ((180 * (Math.atan2(g.x - a.x, g.y - a.y) + c)) / Math.PI + 180) / 360),
          (g.Oc = Math.min(1, Math.sqrt(M.d(g, a)) / k));
    }
    function k(a, c) {
      const d = a.e;
      const e = d.length;
      if (e === 1 || (e === 2 && d[0].description)) d[0].Db = 0.5;
      else {
        let f;
        let g;
        let k = 0;
        let l = Number.MAX_VALUE;
        const m = Math.sin(c);
        const y = Math.cos(c);
        for (f = 0; f < e; f++) {
          g = d[f];
          const x = g.x * m + g.y * y;
          k < x && (k = x);
          l > x && (l = x);
          g.Db = x;
          g.Oc = 1;
        }
        for (f = 0; f < e; f++) (g = d[f]), (g.Db = (g.Db - l) / (k - l));
      }
    }
    function f(a, c, d, e) {
      c = c[e];
      return c + (d[e] - c) * a;
    }
    const d = { radial: l, linear: k };
    const c = a.options;
    let g;
    let m;
    const e = { groupColor: null, labelColor: null };
    a.c.j('model:loaded', function(a) {
      m = a;
    });
    a.c.j('api:initialized', function(a) {
      g = a;
    });
    this.H = function() {};
    this.apply = function() {
      function a(d) {
        if (d.M && d.Ca) {
          const k = d.e;
          let l;
          let m;
          if (d.Z || d.Ma || w) {
            d.R === 0 ? n(d, (c.Vi * Math.PI) / 180) : q(d, (c.Zi * Math.PI) / 180);
            for (l = k.length - 1; l >= 0; l--) {
              m = k[l];
              m.Ma = !0;
              var C = m.Db;
              var H;
              var Q;
              var O;
              var P;
              const F = m.Pe;
              d.R === 0
                ? ((H = f(C, p, r, 'h')),
                  (Q = (y + (1 - y) * m.Oc) * f(C, p, r, 's')),
                  (O = (1 + (m.ka < 0 ? t * (m.ka + 1) : t) * (1 - m.Oc)) * f(C, p, r, 'l')),
                  (P = f(C, p, r, 'a')))
                : ((O = d.sa), (H = O.h), (Q = O.s), (O = h(O.l, C, c.$i, c.aj)), (P = d.Pe.a));
              F.h = H;
              F.s = Q;
              F.l = O;
              F.a = P;
              H = m.sa;
              m.na
                ? ((H.h = 0), (H.s = 0), (H.l = c.Tg == 'light' ? 90 : 10), (H.a = 1))
                : ((H.h = F.h), (H.s = F.s), (H.l = F.l), (H.a = F.a));
              w &&
                !m.na &&
                ((e.groupColor = H),
                (e.labelColor = 'auto'),
                g.Dc(s, m, e, function(a) {
                  a.ratio = C;
                }),
                (m.sa = S.Ba(e.groupColor)),
                (m.sa.a = D.Q(e.groupColor, 'a') ? e.groupColor.a : 1),
                e.labelColor !== 'auto' && (m.Hd = S.Ng(e.labelColor)));
            }
            d.Ma = !1;
          }
          for (l = k.length - 1; l >= 0; l--) a(k[l]);
        }
      }
      function h(a, b, c, d) {
        const e = a + c * d < 0 ? 0 : a + c * d > 100 ? 100 : a + c * d;
        return (
          e + b * ((a - c * (1 - d) < 0 ? 0 : a - c * (1 - d) > 100 ? 100 : a - c * (1 - d)) - e)
        );
      }
      var n = d[c.Ui] || l;
      var q = k;
      var p = c.dj;
      var r = c.Xi;
      var s = c.lh;
      var w = c.mh;
      var t = c.Yi;
      var y = c.bj;
      a(m);
    };
    return this;
  }
  function Ga() {
    this.uc = this.pe = this.rc = this.qg = this.f = this.xg = this.T = this.y = this.x = this.id = 0;
    this.o = this.parent = this.e = null;
    this.q = { x: 0, y: 0, f: 0, i: 0 };
    this.C = null;
    this.Id = this.qf = void 0;
    this.ld = !1;
    this.Oc = this.Db = 0;
    this.Pe = { h: 0, s: 0, l: 0, a: 0, model: 'hsla' };
    this.sa = { h: 0, s: 0, l: 0, a: 0, model: 'hsla' };
    this.Qe = { h: 0, s: 0, l: 0, model: 'hsl' };
    this.zd = -1;
    this.Hd = 'auto';
    this.rb = '#000';
    this.ng = this.R = this.Ed = this.index = 0;
    this.na = !1;
    this.ja = this.vf = 0;
    this.ea = !1;
    this.aa = null;
    this.K = { x: 0, y: 0, ja: 0, Ob: 0 };
    this.Xd = this.u = null;
    this.Yc = this.$ = this.ab = this.Fc = this.me = this.Vd = this.Sa = this.Ma = this.I = this.Z = this.La = this.Ca = this.M = this.Qa = !1;
    this.wa = this.va = this.Ka = this.fa = this.opacity = this.scale = 1;
    this.ua = 0;
    this.Zd = 1;
    this.Lb = this.ka = this.Hb = 0;
    this.description = this.selected = this.Eb = this.Td = this.open = this.U = !1;
    this.Cb = 0;
    this.pf = this.Wd = this.X = !0;
    this.ra = void 0;
    this.Vc = !1;
    this.Uc = new ga();
    this.ba = new ga();
    this.ac = new ga();
    this.li = G.yi();
    this.Xc = 0;
    this.sd = 1;
    this.bd = -1;
    this.empty = function() {
      return !this.e || this.e.length === 0;
    };
    const a = [];
    this.Cc = function(d) {
      a.push(d);
    };
    this.fd = function(d) {
      D.cg(a, d);
    };
    const l = { scale: 1 };
    this.Nd = function() {
      let d = !1;
      this.scale = 1;
      for (let c = 0; c < a.length; c++) (d = a[c].rf(this, l) || d), (this.scale *= l.scale);
      return d;
    };
    this.Tb = function(d) {
      for (let c = 0; c < a.length; c++) a[c].Tb(this, d);
    };
    this.Ub = function(d, c) {
      c.x = d.x;
      c.y = d.y;
      for (let f = 0; f < a.length; f++) a[f].Ub(this, c, c);
      return c;
    };
    this.Vb = function(d, c) {
      c.x = d.x;
      c.y = d.y;
      for (let f = 0; f < a.length; f++) a[f].Vb(this, c, c);
      return c;
    };
    const k = [];
    this.Ab = function(a) {
      k.push(a);
    };
    this.ed = function(a) {
      D.cg(k, a);
    };
    const f = { opacity: 1, wa: 1, va: 1, fa: 1, Ka: 1 };
    this.nc = function() {
      if (k.length !== 0) {
        this.Ka = this.fa = this.va = this.wa = this.opacity = 1;
        for (let a = k.length - 1; a >= 0; a--)
          (0, k[a])(this, f),
            (this.opacity *= f.opacity),
            (this.va *= f.va),
            (this.wa *= f.wa),
            (this.fa *= f.fa),
            (this.Ka *= f.Ka);
      }
    };
  }
  function Oa(a, l) {
    return l.T > a.T ? 1 : l.T < a.T ? -1 : a.index - l.index;
  }
  function bb(a) {
    const l = this;
    let k;
    let f;
    let d;
    let c;
    const g = a.options;
    let m;
    let e;
    a.c.j('stage:initialized', function(b, e, m, q) {
      d = m;
      c = q;
      k = b.oc('titlebar', g.n, !1);
      f = k.getContext('2d');
      f.n = g.n;
      f.scale(f.n, f.n);
      a.c.p('titlebar:initialized', l);
    });
    a.c.j('stage:resized', function(a, e, g, k) {
      d = g;
      c = k;
      f.scale(f.n, f.n);
    });
    a.c.j('zoom:initialized', function(a) {
      e = a;
    });
    a.c.j('api:initialized', function(a) {
      m = a;
    });
    a.c.j('model:loaded', function() {
      f.clearRect(0, 0, d, c);
    });
    this.update = function(a) {
      f.clearRect(0, 0, d, c);
      if (a) {
        !a.empty() && a.e[0].description && (a = a.e[0]);
        let h = g.Aj;
        let k = g.zj;
        const l = Math.min(c / 2, g.ne + 2 * h);
        const p = l - 2 * h;
        const r = d - 2 * k;
        if (!(p <= 0 || r <= 0)) {
          const s = a.Vc ? a.ra.fontSize * a.scale * e.scale() : 0;
          let w;
          const t = {
            titleBarText: a.Id,
            titleBarTextColor: g.ug,
            titleBarBackgroundColor: g.tg,
            titleBarMaxFontSize: g.ne,
            titleBarShown: s < g.ri,
          };
          a.na
            ? (w = xa.kg(
                'B`ssnu!Rd`sbi!Gn`lUsdd!whrt`mh{`uhno/!Bmhbj!uid!mnfn!un!fn!un!iuuq;..b`ssnurd`sbi/bnl.gn`lusdd!gns!lnsd!edu`hmr/',
              ))
            : (m.Dc(g.wj, a, t, function(a) {
                a.titleBarWidth = r;
                a.titleBarHeight = p;
                a.labelFontSize = s;
                a.viewportScale = e.scale();
              }),
              (w = t.titleBarText));
          w &&
            w.length !== 0 &&
            t.titleBarShown &&
            ((a = e.nd(a.Ub(a, {}), {}).y > c / 2),
            (h = { x: k, y: a ? h : c - l + h, f: r, i: p }),
            (k = M.A(h)),
            (f.fillStyle = g.tg),
            f.fillRect(0, a ? 0 : c - l, d, l),
            (f.fillStyle = g.ug),
            G.Le(
              {
                fontFamily: g.xj || g.Ih,
                fontStyle: g.Yj || g.Jh,
                fontWeight: g.$j || g.Lh,
                fontVariant: g.Zj || g.Kh,
                sb: g.ne,
                Zc: g.yj,
                pb: 0,
                eb: 0,
                tb: 1,
              },
              f,
              w,
              k,
              h,
              { x: h.x + h.f / 2, y: h.y + h.i / 2 },
              !0,
              !0,
            ).la || f.clearRect(0, 0, d, c));
        }
      }
    };
  }
  function cb(a) {
    function l(a, b, c) {
      t = !0;
      h && h.stop();
      q && q.stop();
      return g(e.reset(a), b, c).N(function() {
        t = !1;
      });
    }
    function k(b) {
      e.update(b);
      s.I = !0;
      a.c.p('foamtree:dirty', !0);
    }
    function f(a, b) {
      return e.d((e.k() !== 0 ? 0.35 : 1) * a, (e.A() !== 0 ? 0.35 : 1) * b);
    }
    function d() {
      if (b.Pb === 1) {
        const a = Math.round(1e4 * e.k()) / 1e4;
        a !== 0 &&
          ((n.$d = a),
          (h = w.D.tc(n)
            .ia({
              duration: 500,
              G: { x: { start: a, end: 0, P: X.Rb } },
              ca() {
                e.d(n.x - n.$d, 0);
                k(1);
                n.$d = n.x;
              },
            })
            .start()));
      }
    }
    function c() {
      if (b.Pb === 1) {
        const a = Math.round(1e4 * e.A()) / 1e4;
        a !== 0 &&
          ((p.ae = a),
          (q = w.D.tc(p)
            .ia({
              duration: 500,
              G: { y: { start: a, end: 0, P: X.Rb } },
              ca() {
                e.d(0, p.y - p.ae);
                k(1);
                p.ae = p.y;
              },
            })
            .start()));
      }
    }
    function g(a, c, d) {
      return a
        ? w.D.tc(b)
            .ia({
              duration: void 0 === c ? 700 : c,
              G: { Pb: { start: 0, end: 1, P: d || X.pg } },
              ca() {
                k(b.Pb);
              },
            })
            .bb()
        : new V().J().L();
    }
    function m(a) {
      return function() {
        return t ? new V().J().L() : a.apply(this, arguments);
      };
    }
    var e = new oa(a);
    var b = { Pb: 1 };
    let h;
    var n = { Ee: 0, x: 0, $d: 0 };
    let q;
    var p = { Fe: 0, y: 0, ae: 0 };
    const r = this;
    let s;
    let w;
    var t = !1;
    a.c.j('model:loaded', function(a) {
      s = a;
      e.reset(!1);
      e.update(1);
    });
    a.c.j('timeline:initialized', function(a) {
      w = a;
    });
    this.H = function() {
      a.c.p('zoom:initialized', this);
    };
    this.reset = function(a, b) {
      e.Qb(1);
      return l(!0, a, b);
    };
    this.normalize = m(function(a, b) {
      e.Hc(1) ? l(!1, a, b) : r.wf();
    });
    this.wf = function() {
      d();
      c();
    };
    this.k = m(function(a, b, c, d) {
      return r.sc(a.q, b, c, d);
    });
    this.Yb = m(function(a, b, c, d) {
      return g(e.Yb(a, b), c, d);
    });
    this.sc = m(function(a, b, c, d) {
      return g(e.sc(a, b), c, d);
    });
    this.Bj = m(function(a, b) {
      e.sc(a, b) && k(1);
    });
    this.ti = m(function(a, c) {
      b.Pb === 1 && f(a, c) && k(1);
    });
    this.Rg = m(function(a, b) {
      e.Yb(a, b) && k(1);
    });
    this.Qg = m(function(a, b, c, d) {
      a = 0 | e.Yb(a, b);
      (a |= f(c, d)) && k(1);
    });
    this.ui = m(function(a, g, l) {
      b.Pb === 1 &&
        ((h = w.D.tc(n)
          .ia({
            duration: a / 0.03,
            G: { Ee: { start: g, end: 0, P: X.Rb } },
            ca() {
              e.d(n.Ee, 0) && k(1);
              d();
            },
          })
          .start()),
        (q = w.D.tc(p)
          .ia({
            duration: a / 0.03,
            G: { Fe: { start: l, end: 0, P: X.Rb } },
            ca() {
              f(0, p.Fe) && k(1);
              c();
            },
          })
          .start()));
    });
    this.vi = function() {
      h && e.k() === 0 && h.stop();
      q && e.A() === 0 && q.stop();
    };
    this.Jc = function(a, b) {
      e.Jc(a, b);
    };
    this.Qb = function(a) {
      return e.Qb(a);
    };
    this.Hc = function(a) {
      return e.Hc(a);
    };
    this.Rd = function() {
      return e.Rd();
    };
    this.absolute = function(a, b) {
      return e.absolute(a, b);
    };
    this.nd = function(a, b) {
      return e.nd(a, b);
    };
    this.scale = function() {
      return e.scale();
    };
    this.d = function(a) {
      return e.S(a);
    };
    this.content = function(a, b, c, d) {
      e.content(a, b, c, d);
    };
  }
  function db(a, l, k) {
    function f(a) {
      const b = [];
      Z.F(q, function(c) {
        a(c) && b.push(c.group);
      });
      return { groups: b };
    }
    function d(a, b) {
      var c = n.options;
      const d = c.kj;
      const e = c.jj;
      var c = c.fe;
      const f = d + e > 0 ? c : 0;
      const g = [];
      Ca.Ja(a, Ca.ya(a, n.options.he), function(a, c, h) {
        c = n.options.ge === 'groups' ? h : c;
        a.e &&
          ((a = r.D.m(a)
            .fb(f * (e + d * c))
            .call(b)
            .xa()),
          g.push(a));
      });
      return r.D.m({})
        .Za(g)
        .bb();
    }
    function c(a) {
      Y ||
        ((Y = !0),
        p.d(
          function() {
            Y = !1;
            n.c.p('repaint:before');
            B.ee(this.Pg);
          },
          { Pg: a },
        ));
    }
    function g(a) {
      function c(a, b) {
        let f = a.$;
        a.$ = b <= d;
        a.Yc = b <= e;
        a.$ !== f &&
          Z.Ge(a, function(a) {
            a.me = !0;
          });
        a.open || a.gb || b++;
        if ((f = a.e)) for (let g = 0; g < f.length; g++) c(f[g], b);
      }
      var d = n.options.sf;
      var e = Math.min(n.options.sf, n.options.oi);
      if (a)
        for (let f = 0; f < a.length; f++) {
          const g = a[f];
          c(g, b(g));
        }
      else c(q, 0);
    }
    function m(a, b) {
      const c = [];
      let d = e(a, b);
      d.si && n.c.p('model:childrenAttached', Z.Mc(q));
      d.ej &&
        A.complete(function(a) {
          J.qb(a);
          c.push(a);
        });
      for (let f = (d = 0); f < c.length; f++) {
        const g = c[f];
        g.e && (d += g.e.length);
        g.Ca = !0;
        H.d(g);
      }
      return d;
    }
    function e(a, b) {
      function c(a, b) {
        let k = !a.na && b - (a.gb ? 1 : 0) < d;
        f = f || k;
        a.Qa = a.Qa || k;
        a.open || a.gb || b++;
        let l = a.e;
        !l && k && ((e = x.S(a) || e), (l = a.e), h && (a.Sa = !0));
        if (l) for (k = 0; k < l.length; k++) g.push(l[k], b);
      }
      var d = b || n.options.pi;
      var e = !1;
      var f = !1;
      let g;
      var h = l.Ua === 'flattened';
      for (
        g = a
          ? a.reduce(function(a, b) {
              a.push(b, 1);
              return a;
            }, [])
          : [q, 1];
        g.length > 0;

      )
        c(g.shift(), g.shift());
      return { si: e, ej: f };
    }
    function b(a) {
      for (var b = 0; a.parent; ) a.open || a.gb || b++, (a = a.parent);
      return b;
    }
    const h = this;
    var n = { c: new wa(), options: l, Ud: k };
    let q;
    var p = new da();
    var r = new ya(p);
    const s = aa.create();
    const w = new ka(n);
    const t = new cb(n);
    const y = new Ea(n);
    var x = new Fa(n.options);
    var A = new Pa(n);
    var B = new Ta(n, p);
    const K = new Ma(n);
    new bb(n);
    const C = new Ia(n);
    var H = new Ja(n);
    const Q = new Ka(n);
    const O = new La(n);
    n.c.j('stage:initialized', function(a, b, c, d) {
      u.ff(c, d);
    });
    n.c.j('stage:resized', function(a, b, c, d) {
      u.ij(a, b, c, d);
    });
    n.c.j('foamtree:attachChildren', m);
    n.c.j('openclose:changing', g);
    n.c.j('interaction:reset', function() {
      R(!0);
    });
    n.c.j('foamtree:dirty', c);
    this.H = function() {
      n.c.p('timeline:initialized', r);
      q = x.H();
      w.H(a);
      y.H();
      B.H();
      K.H();
      C.H();
      H.H();
      t.H();
      Q.H();
      O.H();
    };
    this.lb = function() {
      r.d();
      I.stop();
      p.k();
      w.lb();
    };
    const P = 'groupLabelFontFamily groupLabelFontStyle groupLabelFontVariant groupLabelFontWeight groupLabelLineHeight groupLabelHorizontalPadding groupLabelVerticalPadding groupLabelDottingThreshold groupLabelMaxTotalHeight groupLabelMinFontSize groupLabelMaxFontSize groupLabelDecorator'.split(
      ' ',
    );
    const F = 'rainbowColorDistribution rainbowLightnessDistribution rainbowColorDistributionAngle rainbowLightnessDistributionAngle rainbowColorModelStartPoint rainbowLightnessCorrection rainbowSaturationCorrection rainbowStartColor rainbowEndColor rainbowHueShift rainbowHueShiftCenter rainbowSaturationShift rainbowSaturationShiftCenter rainbowLightnessShift rainbowLightnessShiftCenter attributionTheme'.split(
      ' ',
    );
    let T = !1;
    const N = [
      'groupBorderRadius',
      'groupBorderRadiusCorrection',
      'groupBorderWidth',
      'groupInsetWidth',
      'groupBorderWidthScaling',
    ];
    const U = ['maxGroupLevelsDrawn', 'maxGroupLabelLevelsDrawn'];
    this.Xb = function(a) {
      n.c.p('options:changed', a);
      D.ob(a, P) &&
        Z.F(q, function(a) {
          a.Sa = !0;
        });
      D.ob(a, F) && (q.Ma = !0);
      D.ob(a, N) && (T = !0);
      D.ob(a, U) && (g(), m());
    };
    this.reload = function() {
      z.reload();
    };
    this.yc = function(a, b) {
      D.defer(function() {
        if (T) u.mi(a), (T = !1);
        else {
          if (b) for (let d = x.k(b), e = d.length - 1; e >= 0; e--) d[e].I = !0;
          else q.I = !0;
          c(a);
        }
      });
    };
    this.Y = function() {
      w.k();
    };
    this.update = function() {
      x.update();
      u.Cj();
    };
    this.reset = function() {
      return R(!1);
    };
    this.S = B.d;
    this.Ja = (function() {
      const a = {};
      return function(b, c) {
        const d = x.d(b);
        return d ? y.od(a, d, c) : null;
      };
    })();
    this.Ba = (function() {
      const a = { x: 0, y: 0 };
      const b = { x: 0, y: 0 };
      return function(c, d) {
        const e = x.d(c);
        return e
          ? ((a.x = d.x), (a.y = d.y), e.Ub(a, a), t.nd(a, a), (b.x = a.x), (b.y = a.y), b)
          : null;
      };
    })();
    this.ya = (function() {
      const a = {};
      return function(b) {
        return (b = x.d(b)) ? y.qd(a, b) : null;
      };
    })();
    this.Wb = (function() {
      const a = {};
      return function(b) {
        return (b = x.d(b)) ? y.pd(a, b) : null;
      };
    })();
    this.za = (function() {
      const a = {};
      return function() {
        return t.d(a);
      };
    })();
    this.zc = function() {
      this.A({
        groups: f(function(a) {
          return a.group.selected;
        }),
        newState: !0,
        keepPrevious: !1,
      });
      this.k({
        groups: f(function(a) {
          return a.group.open;
        }),
        newState: !0,
        keepPrevious: !1,
      });
      this.d({
        groups: f(function(a) {
          return a.group.exposed;
        }),
        newState: !0,
        keepPrevious: !1,
      });
    };
    this.Pa = function() {
      return f(function(a) {
        return a.U;
      });
    };
    this.d = function(a) {
      return z.submit(function() {
        return C.fc(x.A(a, 'exposed', !1), !1, !0, !1);
      });
    };
    this.cb = function() {
      return f(function(a) {
        return a.open;
      });
    };
    this.k = function(a) {
      return z.submit(function() {
        return Q.Kb(x.A(a, 'open', !0), !1, !1);
      });
    };
    this.Va = function() {
      return f(function(a) {
        return a.selected;
      });
    };
    this.A = function(a) {
      return z.submit(function() {
        O.select(x.A(a, 'selected', !0), !1);
        return new V().J().L();
      });
    };
    this.Bc = function(a) {
      return (a = x.d(a))
        ? a === q
          ? t.reset(l.wc, X.pa(l.xc))
          : t.k(a, l.Qc, l.wc, X.pa(l.xc))
        : new V().J().L();
    };
    this.Aa = function(a, b) {
      const c = x.k(a);
      if (c) {
        const d = m(c, b);
        g(c);
        return d;
      }
      return 0;
    };
    this.hb = function(a) {
      return K.hb[a];
    };
    this.Ac = function() {
      const a = fa;
      return {
        frames: a.frames,
        totalTime: a.totalTime,
        lastFrameTime: a.Jd,
        lastInterFrameTime: a.Kd,
        fps: a.Oe,
      };
    };
    var u = (function() {
      function a(c, f) {
        const g = c || d;
        const h = f || e;
        d = g;
        e = h;
        const k = l.bc && l.bc.boundary;
        k && k.length > 2
          ? (q.o = k.map(function(a) {
              return { x: g * a.x, y: h * a.y };
            }))
          : (q.o = [
              { x: 0, y: 0 },
              { x: g, y: 0 },
              { x: g, y: h },
              { x: 0, y: h },
            ]);
        b();
      }
      function b() {
        q.Z = !0;
        q.u = q.o;
        q.q = M.q(q.o, q.q);
        q.K = q;
        M.re(q.o, q.K);
      }
      let d;
      let e;
      return {
        ff: a,
        ij(b, d, e, f) {
          J.stop();
          const g = e / b;
          const h = f / d;
          Z.He(q, function(a) {
            a.x = a.x * g + ((Math.random() - 0.5) * e) / 1e3;
            a.y = a.y * h + ((Math.random() - 0.5) * f) / 1e3;
          });
          a(e, f);
          q.La = !0;
          A.step(J.qb, !0, !1, function(a) {
            const b = a.e;
            if (b) {
              A.Nb(a);
              for (let c = b.length - 1; c >= 0; c--) {
                const d = b[c];
                d.f = d.rc;
              }
              a.La = !0;
            }
          })
            ? c(!1)
            : (A.qc(q),
              n.options.de ? (c(!1), I.dg(), I.gd()) : (A.complete(J.qb), (q.Ma = !0), c(!1)));
        },
        mi(a) {
          let d = !1;
          q.empty() || (b(), I.Gb() || ((d = A.step(J.qb, !1, !1)), c(a)));
          return d;
        },
        Cj() {
          Z.Fa(q, function(a) {
            a.empty() || A.Nb(a);
          });
          A.qc(q);
          n.options.de
            ? (I.dg(),
              Z.Fa(q, function(a) {
                a.empty() || J.df(a);
              }))
            : (Z.Fa(q, function(a) {
                a.empty() || J.qb(q);
              }),
              A.complete(J.qb),
              (q.Ma = !0),
              c(!1));
        },
      };
    })();
    var z = (function() {
      function a() {
        l.Yd === 0 && t.reset(0);
        n.options.Uf(l.bc);
        u.ff();
        x.Y(l.bc);
        e();
        g();
        n.c.p('model:loaded', q, Z.Mc(q));
        let d;
        q.empty() ||
          ((q.open = !0),
          (q.Qa = !0),
          l.de ? (d = I.gd()) : (I.xi(), (d = f())),
          b(),
          l.fe > 0 ? (B.clear(), w.d(1)) : (d = pa([d, c(1)])));
        n.options.Tf(l.bc);
        d &&
          (n.options.Xf(),
          d.N(function() {
            B.k(function() {
              p.d(n.options.Wf);
            });
          }));
      }
      function b() {
        const a = l.Wa;
        const c = l.cd;
        l.Wa = 0;
        l.cd = 0;
        h.zc();
        l.Wa = a;
        l.cd = c;
      }
      function c(a, b) {
        return l.Ke === 0 || b
          ? (w.d(a), new V().J().L())
          : r.D.m({ opacity: w.d() })
              .oe(2)
              .ia({
                duration: l.Ke,
                G: { opacity: { end: a, P: X.pa(l.fh) } },
                ca() {
                  w.d(this.opacity);
                },
              })
              .bb();
      }
      function f() {
        Z.Fa(q, function(a) {
          a.Ca = !1;
        });
        const a = new V();
        const b = new qa(a.J);
        b.d();
        q.Ca = !0;
        H.d(q).N(b.k);
        d(q, function Za() {
          this.M &&
            this.o &&
            ((this.Z = this.Ca = !0), b.d(), H.d(this).N(b.k), b.d(), d(this, Za).N(b.k));
        });
        return a.L();
      }
      function k() {
        for (let a = 0; a < s.length; a++) {
          const b = s[a];
          const c = b.action();
          D.Q(c, 'then') ? c.N(b.Ae.J) : b.Ae.J();
        }
        s = [];
      }
      let m = !1;
      var s = [];
      return {
        reload() {
          m ||
            (q.empty()
              ? a()
              : (J.stop(),
                r.d(),
                I.stop(),
                (m = !0),
                pa(l.Yd > 0 ? [H.k(), R(!1)] : [c(0)]).N(function() {
                  c(0, !0);
                  m = !1;
                  a();
                  D.defer(k);
                })));
        },
        submit(a) {
          if (m) {
            const b = new V();
            s.push({ action: a, Ae: b });
            return b.L();
          }
          return a();
        },
      };
    })();
    let L;
    const E = new qa(function() {
      L.J();
    });
    var I = (function() {
      function a() {
        f || (E.A() && (L = new V()), E.d(), b(), (f = !0), p.repeat(e));
        return L.L();
      }
      function b() {
        g = s.now();
      }
      function e() {
        var b = s.now() - g > l.hj;
        var b =
          A.step(
            function(b) {
              b.Ca = !0;
              J.df(b);
              E.d();
              H.d(b).N(E.k);
              E.d();
              d(b, function() {
                this.Qa = !0;
                a();
              }).N(E.k);
            },
            !0,
            b,
          ) || b;
        c(!0);
        b && ((f = !1), E.k());
        return b;
      }
      var f = !1;
      let g;
      return {
        xi() {
          A.complete(J.qb);
        },
        gd: a,
        dg: b,
        Gb() {
          return !E.A();
        },
        stop() {
          p.cancel(e);
          f = !1;
          E.clear();
        },
      };
    })();
    var J = (function() {
      function a(b) {
        const c = !b.empty();
        b.Ca = !0;
        if (c) {
          for (let d = b.e, e = d.length - 1; e >= 0; e--) {
            const f = d[e];
            f.f = f.rc;
          }
          b.La = !0;
        }
        return c;
      }
      let b = [];
      return {
        df(c) {
          const d = n.options;
          const e = d.zh;
          e > 0
            ? Ca.Ja(c, Ca.ya(c, n.options.he), function(a, c, f) {
                c = n.options.ge === 'groups' ? f : c;
                E.d();
                b.push(
                  r.D.m(a)
                    .fb(c * d.yh * e)
                    .ia({
                      duration: e,
                      G: { f: { start: a.qg, end: a.rc, P: X.pa(d.Ah) } },
                      ca() {
                        this.f = Math.max(0, this.f);
                        this.parent.La = !0;
                        I.gd();
                      },
                    })
                    .jb(E.k)
                    .start(),
                );
              })
            : a(c) && I.gd();
        },
        qb: a,
        stop() {
          for (let a = b.length - 1; a >= 0; a--) b[a].stop();
          b = [];
        },
      };
    })();
    var R = (function() {
      let a = !1;
      return function(b) {
        if (a) return new V().J().L();
        a = !0;
        const c = [];
        c.push(t.reset(l.wc, X.pa(l.xc)));
        const d = new V();
        C.fc({ e: [], Ia: !1, Ha: !1 }, b, !1, !0).N(function() {
          Q.Kb({ e: [], Ia: !1, Ha: !1 }, b, !1).N(d.J);
        });
        c.push(d.L());
        return pa(c).N(function() {
          a = !1;
          b && l.Yf();
        });
      };
    })();
    var Y = !1;
  }
  function $a() {
    return {
      version: '3.4.5',
      build: '4fa198d722d767b68d0409e88290ea6de98d1eaa/4fa198d7',
      brandingAllowed: !1,
    };
  }
  v.Dd(
    function() {
      window.CarrotSearchFoamTree = function(a) {
        function l(a, b) {
          if (!m || m.exists(a))
            switch (a) {
              case 'selection':
                return h.Va();
              case 'open':
                return h.cb();
              case 'exposure':
                return h.Pa();
              case 'state':
                return h.ya.apply(this, b);
              case 'geometry':
                return h.Ja.apply(this, b);
              case 'hierarchy':
                return h.Wb.apply(this, b);
              case 'containerCoordinates':
                return h.Ba.apply(this, b);
              case 'imageData':
                return h.S.apply(this, b);
              case 'viewport':
                return h.za();
              case 'times':
                return h.Ac();
              case 'onModelChanged':
              case 'onRedraw':
              case 'onRolloutStart':
              case 'onRolloutComplete':
              case 'onRelaxationStep':
              case 'onGroupHover':
              case 'onGroupOpenOrCloseChanging':
              case 'onGroupExposureChanging':
              case 'onGroupSelectionChanging':
              case 'onGroupSelectionChanged':
              case 'onGroupClick':
              case 'onGroupDoubleClick':
              case 'onGroupHold':
                var c = e[a];
                return Array.isArray(c) ? c : [c];
              default:
                return e[a];
            }
        }
        function k(a) {
          function c(a, b) {
            return D.Q(f, a) ? (b(f[a]), delete f[a], 1) : 0;
          }
          let f;
          if (arguments.length === 0) return 0;
          arguments.length === 1
            ? (f = D.extend({}, arguments[0]))
            : arguments.length === 2 && ((f = {}), (f[arguments[0]] = arguments[1]));
          m && m.validate(f, b.ni);
          let g = 0;
          h && ((g += c('selection', h.A)), (g += c('open', h.k)), (g += c('exposure', h.d)));
          const k = {};
          D.Ga(f, function(a, b) {
            if (e[b] !== a || D.jc(a)) (k[b] = a), g++;
            e[b] = a;
          });
          g > 0 && d(k);
          return g;
        }
        function f(a, b) {
          const c = `on${a.charAt(0).toUpperCase()}${a.slice(1)}`;
          let f = e[c];
          e[c] = b(Array.isArray(f) ? f : [f]);
          f = {};
          f[c] = e[c];
          d(f);
        }
        function d(a) {
          (function() {
            function c(b, d) {
              return D.Q(a, b) || void 0 === d ? va.m(e[b], g) : d;
            }
            b.ni = e.logging;
            b.bc = e.dataObject;
            b.n = e.pixelRatio;
            b.yb = e.wireframePixelRatio;
            b.Ua = e.stacking;
            b.dc = e.descriptionGroupType;
            b.Ic = e.descriptionGroupPosition;
            b.bh = e.descriptionGroupDistanceFromCenter;
            b.cc = e.descriptionGroupSize;
            b.Ce = e.descriptionGroupMinHeight;
            b.Be = e.descriptionGroupMaxHeight;
            b.De = e.descriptionGroupPolygonDrawn;
            b.Wc = e.layout;
            b.lc = e.layoutByWeightOrder;
            b.uj = e.showZeroWeightGroups;
            b.Ve = e.groupMinDiameter;
            b.ce = e.rectangleAspectRatioPreference;
            b.gj = e.initializer || e.relaxationInitializer;
            b.hj = e.relaxationMaxDuration;
            b.de = e.relaxationVisible;
            b.bg = e.relaxationQualityThreshold;
            b.Rh = e.groupResizingBudget;
            b.zh = e.groupGrowingDuration;
            b.yh = e.groupGrowingDrag;
            b.Ah = e.groupGrowingEasing;
            b.jh = e.groupBorderRadius;
            b.mb = e.groupBorderWidth;
            b.Ra = e.groupBorderWidthScaling;
            b.Ad = e.groupInsetWidth;
            b.kh = e.groupBorderRadiusCorrection;
            b.nb = e.groupStrokeWidth;
            b.Rc = e.groupSelectionOutlineWidth;
            b.Vh = e.groupSelectionOutlineColor;
            b.Bd = e.groupSelectionOutlineShadowSize;
            b.We = e.groupSelectionOutlineShadowColor;
            b.Sh = e.groupSelectionFillHueShift;
            b.Uh = e.groupSelectionFillSaturationShift;
            b.Th = e.groupSelectionFillLightnessShift;
            b.Ye = e.groupSelectionStrokeHueShift;
            b.$e = e.groupSelectionStrokeSaturationShift;
            b.Ze = e.groupSelectionStrokeLightnessShift;
            b.xh = e.groupFillType;
            b.th = e.groupFillGradientRadius;
            b.qh = e.groupFillGradientCenterHueShift;
            b.sh = e.groupFillGradientCenterSaturationShift;
            b.rh = e.groupFillGradientCenterLightnessShift;
            b.uh = e.groupFillGradientRimHueShift;
            b.wh = e.groupFillGradientRimSaturationShift;
            b.vh = e.groupFillGradientRimLightnessShift;
            b.Cd = e.groupStrokeType;
            b.nb = e.groupStrokeWidth;
            b.af = e.groupStrokePlainHueShift;
            b.cf = e.groupStrokePlainSaturationShift;
            b.bf = e.groupStrokePlainLightnessShift;
            b.$h = e.groupStrokeGradientRadius;
            b.Wh = e.groupStrokeGradientAngle;
            b.ai = e.groupStrokeGradientUpperHueShift;
            b.ci = e.groupStrokeGradientUpperSaturationShift;
            b.bi = e.groupStrokeGradientUpperLightnessShift;
            b.Xh = e.groupStrokeGradientLowerHueShift;
            b.Zh = e.groupStrokeGradientLowerSaturationShift;
            b.Yh = e.groupStrokeGradientLowerLightnessShift;
            b.Bh = e.groupHoverFillHueShift;
            b.Dh = e.groupHoverFillSaturationShift;
            b.Ch = e.groupHoverFillLightnessShift;
            b.Se = e.groupHoverStrokeHueShift;
            b.Ue = e.groupHoverStrokeSaturationShift;
            b.Te = e.groupHoverStrokeLightnessShift;
            b.Xa = e.groupExposureScale;
            b.ph = e.groupExposureShadowColor;
            b.Re = e.groupExposureShadowSize;
            b.Qc = e.groupExposureZoomMargin;
            b.ei = e.groupUnexposureLightnessShift;
            b.fi = e.groupUnexposureSaturationShift;
            b.di = e.groupUnexposureLabelColorThreshold;
            b.Wa = e.exposeDuration;
            b.gc = e.exposeEasing;
            b.cd = e.openCloseDuration;
            b.lh = va.m(e.groupColorDecorator, g);
            b.mh = e.groupColorDecorator !== D.ta;
            b.Gh = va.m(e.groupLabelDecorator, g);
            b.Hh = e.groupLabelDecorator !== D.ta;
            b.Mh = va.m(e.groupLabelLayoutDecorator, g);
            b.Nh = e.groupLabelLayoutDecorator !== D.ta;
            b.nh = va.m(e.groupContentDecorator, g);
            b.Pc = e.groupContentDecorator !== D.ta;
            b.oh = e.groupContentDecoratorTriggering;
            b.cj = e.rainbowStartColor;
            b.Wi = e.rainbowEndColor;
            b.Ui = e.rainbowColorDistribution;
            b.Vi = e.rainbowColorDistributionAngle;
            b.Zi = e.rainbowLightnessDistributionAngle;
            b.$i = e.rainbowLightnessShift;
            b.aj = e.rainbowLightnessShiftCenter;
            b.bj = e.rainbowSaturationCorrection;
            b.Yi = e.rainbowLightnessCorrection;
            b.Zf = e.parentFillOpacity;
            b.wi = e.parentStrokeOpacity;
            b.$f = e.parentLabelOpacity;
            b.ag = e.parentOpacityBalancing;
            b.Qh = e.groupLabelUpdateThreshold;
            b.Ih = e.groupLabelFontFamily;
            b.Jh = e.groupLabelFontStyle;
            b.Kh = e.groupLabelFontVariant;
            b.Lh = e.groupLabelFontWeight;
            b.Ph = e.groupLabelMinFontSize;
            b.Qj = e.groupLabelMaxFontSize;
            b.Pj = e.groupLabelLineHeight;
            b.Oj = e.groupLabelHorizontalPadding;
            b.Sj = e.groupLabelVerticalPadding;
            b.Rj = e.groupLabelMaxTotalHeight;
            b.Fh = e.groupLabelDarkColor;
            b.Oh = e.groupLabelLightColor;
            b.Eh = e.groupLabelColorThreshold;
            b.Ej = e.wireframeDrawMaxDuration;
            b.Fj = e.wireframeLabelDrawing;
            b.Dj = e.wireframeContentDecorationDrawing;
            b.yg = e.wireframeToFinalFadeDuration;
            b.Gj = e.wireframeToFinalFadeDelay;
            b.gh = e.finalCompleteDrawMaxDuration;
            b.hh = e.finalIncrementalDrawMaxDuration;
            b.Me = e.finalToWireframeFadeDuration;
            b.rd = e.androidStockBrowserWorkaround;
            b.ef = e.incrementalDraw;
            b.qi = e.maxGroups;
            b.pi = e.maxGroupLevelsAttached;
            b.sf = e.maxGroupLevelsDrawn;
            b.oi = e.maxGroupLabelLevelsDrawn;
            b.he = e.rolloutStartPoint;
            b.ge = e.rolloutMethod;
            b.lj = e.rolloutEasing;
            b.fe = e.rolloutDuration;
            b.gg = e.rolloutScalingStrength;
            b.ig = e.rolloutTranslationXStrength;
            b.jg = e.rolloutTranslationYStrength;
            b.fg = e.rolloutRotationStrength;
            b.hg = e.rolloutTransformationCenter;
            b.pj = e.rolloutPolygonDrag;
            b.qj = e.rolloutPolygonDuration;
            b.mj = e.rolloutLabelDelay;
            b.nj = e.rolloutLabelDrag;
            b.oj = e.rolloutLabelDuration;
            b.kj = e.rolloutChildGroupsDrag;
            b.jj = e.rolloutChildGroupsDelay;
            b.Ni = e.pullbackStartPoint;
            b.Hi = e.pullbackMethod;
            b.Di = e.pullbackEasing;
            b.Vj = e.pullbackType;
            b.Yd = e.pullbackDuration;
            b.Mi = e.pullbackScalingStrength;
            b.Pi = e.pullbackTranslationXStrength;
            b.Qi = e.pullbackTranslationYStrength;
            b.Li = e.pullbackRotationStrength;
            b.Oi = e.pullbackTransformationCenter;
            b.Ii = e.pullbackPolygonDelay;
            b.Ji = e.pullbackPolygonDrag;
            b.Ki = e.pullbackPolygonDuration;
            b.Ei = e.pullbackLabelDelay;
            b.Fi = e.pullbackLabelDrag;
            b.Gi = e.pullbackLabelDuration;
            b.Ai = e.pullbackChildGroupsDelay;
            b.Bi = e.pullbackChildGroupsDrag;
            b.Ci = e.pullbackChildGroupsDuration;
            b.Ke = e.fadeDuration;
            b.fh = e.fadeEasing;
            b.Hj = e.zoomMouseWheelFactor;
            b.wc = e.zoomMouseWheelDuration;
            b.xc = e.zoomMouseWheelEasing;
            b.ri = e.maxLabelSizeForTitleBar;
            b.xj = e.titleBarFontFamily;
            b.tg = e.titleBarBackgroundColor;
            b.ug = e.titleBarTextColor;
            b.yj = e.titleBarMinFontSize;
            b.ne = e.titleBarMaxFontSize;
            b.zj = e.titleBarTextPaddingLeftRight;
            b.Aj = e.titleBarTextPaddingTopBottom;
            b.wj = e.titleBarDecorator;
            b.Lj = e.attributionText;
            b.Ij = e.attributionLogo;
            b.Kj = e.attributionLogoScale;
            b.Mj = e.attributionUrl;
            b.ve = e.attributionPosition;
            b.Sg = e.attributionDistanceFromCenter;
            b.Ug = e.attributionWeight;
            b.Tg = e.attributionTheme;
            b.gf = e.interactionHandler;
            b.Uf = c('onModelChanging', b.Uf);
            b.Tf = c('onModelChanged', b.Tf);
            b.Vf = c('onRedraw', b.Vf);
            b.Xf = c('onRolloutStart', b.Xf);
            b.Wf = c('onRolloutComplete', b.Wf);
            b.Sd = c('onRelaxationStep', b.Sd);
            b.Yf = c('onViewReset', b.Yf);
            b.Mf = c('onGroupOpenOrCloseChanging', b.Mf);
            b.Lf = c('onGroupOpenOrCloseChanged', b.Lf);
            b.Ef = c('onGroupExposureChanging', b.Ef);
            b.Df = c('onGroupExposureChanged', b.Df);
            b.Of = c('onGroupSelectionChanging', b.Of);
            b.Nf = c('onGroupSelectionChanged', b.Nf);
            b.Gf = c('onGroupHover', b.Gf);
            b.If = c('onGroupMouseMove', b.If);
            b.yf = c('onGroupClick', b.yf);
            b.zf = c('onGroupDoubleClick', b.zf);
            b.Ff = c('onGroupHold', b.Ff);
            b.Kf = c('onGroupMouseWheel', b.Kf);
            b.Jf = c('onGroupMouseUp', b.Jf);
            b.Hf = c('onGroupMouseDown', b.Hf);
            b.Cf = c('onGroupDragStart', b.Cf);
            b.Af = c('onGroupDrag', b.Af);
            b.Bf = c('onGroupDragEnd', b.Bf);
            b.Rf = c('onGroupTransformStart', b.Rf);
            b.Pf = c('onGroupTransform', b.Pf);
            b.Qf = c('onGroupTransformEnd', b.Qf);
            b.Sf = c('onKeyUp', b.Sf);
          })();
          b.dj = S.Ba(b.cj);
          b.Xi = S.Ba(b.Wi);
          b.Xe = S.Ba(b.We);
          b.Jj = null;
          h && (h.Xb(a), D.Q(a, 'dataObject') && h.reload());
        }
        function c(a) {
          return function() {
            return a.apply(this, arguments).ih(g);
          };
        }
        var g = this;
        var m = window.CarrotSearchFoamTree.asserts;
        var e = D.extend({}, window.CarrotSearchFoamTree.defaults);
        var b = {};
        k(a);
        (a = e.element || document.getElementById(e.id)) ||
          na.Pa('Element to embed FoamTree in not found.');
        e.element = a;
        var h = new db(a, b, e);
        h.H();
        var n = {
          get(a) {
            return arguments.length === 0
              ? D.extend({}, e)
              : l(arguments[0], Array.prototype.slice.call(arguments, 1));
          },
          set: k,
          on(a, b) {
            f(a, function(a) {
              a.push(b);
              return a;
            });
          },
          off(a, b) {
            f(a, function(a) {
              return a.filter(function(a) {
                return a !== b;
              });
            });
          },
          resize: h.Y,
          redraw: h.yc,
          update: h.update,
          attach: h.Aa,
          select: c(h.A),
          expose: c(h.d),
          open: c(h.k),
          reset: c(h.reset),
          zoom: c(h.Bc),
          trigger(a, b) {
            const c = h.hb(a);
            c && c(b);
          },
          dispose() {
            function a() {
              throw 'FoamTree instance disposed';
            }
            h.lb();
            D.Ga(n, function(b, c) {
              c !== 'dispose' && (g[c] = a);
            });
          },
        };
        D.Ga(n, function(a, b) {
          g[b] = a;
        });
        h.reload();
      };
      window['CarrotSearchFoamTree.asserts'] &&
        ((window.CarrotSearchFoamTree.asserts = window['CarrotSearchFoamTree.asserts']),
        delete window['CarrotSearchFoamTree.asserts']);
      window.CarrotSearchFoamTree.supported = !0;
      window.CarrotSearchFoamTree.version = $a;
      window.CarrotSearchFoamTree.defaults = Object.freeze({
        id: void 0,
        element: void 0,
        logging: !1,
        dataObject: void 0,
        pixelRatio: 1,
        wireframePixelRatio: 1,
        layout: 'relaxed',
        layoutByWeightOrder: !0,
        showZeroWeightGroups: !0,
        groupMinDiameter: 10,
        rectangleAspectRatioPreference: -1,
        relaxationInitializer: 'fisheye',
        relaxationMaxDuration: 3e3,
        relaxationVisible: !1,
        relaxationQualityThreshold: 1,
        stacking: 'hierarchical',
        descriptionGroupType: 'stab',
        descriptionGroupPosition: 225,
        descriptionGroupDistanceFromCenter: 1,
        descriptionGroupSize: 0.125,
        descriptionGroupMinHeight: 35,
        descriptionGroupMaxHeight: 0.5,
        descriptionGroupPolygonDrawn: !1,
        maxGroups: 5e4,
        maxGroupLevelsAttached: 4,
        maxGroupLevelsDrawn: 4,
        maxGroupLabelLevelsDrawn: 3,
        groupGrowingDuration: 0,
        groupGrowingEasing: 'bounce',
        groupGrowingDrag: 0,
        groupResizingBudget: 2,
        groupBorderRadius: 0.15,
        groupBorderWidth: 4,
        groupBorderWidthScaling: 0.6,
        groupInsetWidth: 6,
        groupBorderRadiusCorrection: 1,
        groupSelectionOutlineWidth: 5,
        groupSelectionOutlineColor: '#222',
        groupSelectionOutlineShadowSize: 0,
        groupSelectionOutlineShadowColor: '#fff',
        groupSelectionFillHueShift: 0,
        groupSelectionFillSaturationShift: 0,
        groupSelectionFillLightnessShift: 0,
        groupSelectionStrokeHueShift: 0,
        groupSelectionStrokeSaturationShift: 0,
        groupSelectionStrokeLightnessShift: -10,
        groupFillType: 'gradient',
        groupFillGradientRadius: 1,
        groupFillGradientCenterHueShift: 0,
        groupFillGradientCenterSaturationShift: 0,
        groupFillGradientCenterLightnessShift: 20,
        groupFillGradientRimHueShift: 0,
        groupFillGradientRimSaturationShift: 0,
        groupFillGradientRimLightnessShift: -5,
        groupStrokeType: 'plain',
        groupStrokeWidth: 1.5,
        groupStrokePlainHueShift: 0,
        groupStrokePlainSaturationShift: 0,
        groupStrokePlainLightnessShift: -10,
        groupStrokeGradientRadius: 1,
        groupStrokeGradientAngle: 45,
        groupStrokeGradientUpperHueShift: 0,
        groupStrokeGradientUpperSaturationShift: 0,
        groupStrokeGradientUpperLightnessShift: 20,
        groupStrokeGradientLowerHueShift: 0,
        groupStrokeGradientLowerSaturationShift: 0,
        groupStrokeGradientLowerLightnessShift: -20,
        groupHoverFillHueShift: 0,
        groupHoverFillSaturationShift: 0,
        groupHoverFillLightnessShift: 20,
        groupHoverStrokeHueShift: 0,
        groupHoverStrokeSaturationShift: 0,
        groupHoverStrokeLightnessShift: -10,
        groupExposureScale: 1.15,
        groupExposureShadowColor: 'rgba(0, 0, 0, 0.5)',
        groupExposureShadowSize: 50,
        groupExposureZoomMargin: 0.1,
        groupUnexposureLightnessShift: 65,
        groupUnexposureSaturationShift: -65,
        groupUnexposureLabelColorThreshold: 0.35,
        exposeDuration: 700,
        exposeEasing: 'squareInOut',
        groupColorDecorator: D.ta,
        groupLabelDecorator: D.ta,
        groupLabelLayoutDecorator: D.ta,
        groupContentDecorator: D.ta,
        groupContentDecoratorTriggering: 'onLayoutDirty',
        openCloseDuration: 500,
        rainbowColorDistribution: 'radial',
        rainbowColorDistributionAngle: -45,
        rainbowLightnessDistributionAngle: 45,
        rainbowSaturationCorrection: 0.1,
        rainbowLightnessCorrection: 0.4,
        rainbowStartColor: 'hsla(0, 100%, 55%, 1)',
        rainbowEndColor: 'hsla(359, 100%, 55%, 1)',
        rainbowLightnessShift: 30,
        rainbowLightnessShiftCenter: 0.4,
        parentFillOpacity: 0.7,
        parentStrokeOpacity: 1,
        parentLabelOpacity: 1,
        parentOpacityBalancing: !0,
        wireframeDrawMaxDuration: 15,
        wireframeLabelDrawing: 'auto',
        wireframeContentDecorationDrawing: 'auto',
        wireframeToFinalFadeDuration: 500,
        wireframeToFinalFadeDelay: 300,
        finalCompleteDrawMaxDuration: 80,
        finalIncrementalDrawMaxDuration: 100,
        finalToWireframeFadeDuration: 200,
        androidStockBrowserWorkaround: v.hf(),
        incrementalDraw: 'fast',
        groupLabelFontFamily: 'sans-serif',
        groupLabelFontStyle: 'normal',
        groupLabelFontWeight: 'normal',
        groupLabelFontVariant: 'normal',
        groupLabelLineHeight: 1.05,
        groupLabelHorizontalPadding: 1,
        groupLabelVerticalPadding: 1,
        groupLabelMinFontSize: 6,
        groupLabelMaxFontSize: 160,
        groupLabelMaxTotalHeight: 0.9,
        groupLabelUpdateThreshold: 0.05,
        groupLabelDarkColor: '#000',
        groupLabelLightColor: '#fff',
        groupLabelColorThreshold: 0.35,
        rolloutStartPoint: 'center',
        rolloutEasing: 'squareOut',
        rolloutMethod: 'groups',
        rolloutDuration: 2e3,
        rolloutScalingStrength: -0.7,
        rolloutTranslationXStrength: 0,
        rolloutTranslationYStrength: 0,
        rolloutRotationStrength: -0.7,
        rolloutTransformationCenter: 0.7,
        rolloutPolygonDrag: 0.1,
        rolloutPolygonDuration: 0.5,
        rolloutLabelDelay: 0.8,
        rolloutLabelDrag: 0.1,
        rolloutLabelDuration: 0.5,
        rolloutChildGroupsDrag: 0.1,
        rolloutChildGroupsDelay: 0.2,
        pullbackStartPoint: 'center',
        pullbackEasing: 'squareIn',
        pullbackMethod: 'groups',
        pullbackDuration: 1500,
        pullbackScalingStrength: -0.7,
        pullbackTranslationXStrength: 0,
        pullbackTranslationYStrength: 0,
        pullbackRotationStrength: -0.7,
        pullbackTransformationCenter: 0.7,
        pullbackPolygonDelay: 0.3,
        pullbackPolygonDrag: 0.1,
        pullbackPolygonDuration: 0.8,
        pullbackLabelDelay: 0,
        pullbackLabelDrag: 0.1,
        pullbackLabelDuration: 0.3,
        pullbackChildGroupsDelay: 0.1,
        pullbackChildGroupsDrag: 0.1,
        pullbackChildGroupsDuration: 0.3,
        fadeDuration: 700,
        fadeEasing: 'cubicInOut',
        zoomMouseWheelFactor: 1.5,
        zoomMouseWheelDuration: 500,
        zoomMouseWheelEasing: 'squareOut',
        maxLabelSizeForTitleBar: 8,
        titleBarFontFamily: null,
        titleBarFontStyle: 'normal',
        titleBarFontWeight: 'normal',
        titleBarFontVariant: 'normal',
        titleBarBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        titleBarTextColor: 'rgba(255, 255, 255, 1)',
        titleBarMinFontSize: 10,
        titleBarMaxFontSize: 40,
        titleBarTextPaddingLeftRight: 20,
        titleBarTextPaddingTopBottom: 15,
        titleBarDecorator: D.ta,
        attributionText: null,
        attributionLogo: null,
        attributionLogoScale: 0.5,
        attributionUrl: 'http://carrotsearch.com/foamtree',
        attributionPosition: 'bottom-right',
        attributionDistanceFromCenter: 1,
        attributionWeight: 0.025,
        attributionTheme: 'light',
        interactionHandler: v.ii() ? 'hammerjs' : 'builtin',
        onModelChanging: [],
        onModelChanged: [],
        onRedraw: [],
        onRolloutStart: [],
        onRolloutComplete: [],
        onRelaxationStep: [],
        onViewReset: [],
        onGroupOpenOrCloseChanging: [],
        onGroupOpenOrCloseChanged: [],
        onGroupExposureChanging: [],
        onGroupExposureChanged: [],
        onGroupSelectionChanging: [],
        onGroupSelectionChanged: [],
        onGroupHover: [],
        onGroupMouseMove: [],
        onGroupClick: [],
        onGroupDoubleClick: [],
        onGroupHold: [],
        onGroupMouseWheel: [],
        onGroupMouseUp: [],
        onGroupMouseDown: [],
        onGroupDragStart: [],
        onGroupDrag: [],
        onGroupDragEnd: [],
        onGroupTransformStart: [],
        onGroupTransform: [],
        onGroupTransformEnd: [],
        onKeyUp: [],
        selection: null,
        open: null,
        exposure: null,
        imageData: null,
        hierarchy: null,
        geometry: null,
        containerCoordinates: null,
        state: null,
        viewport: null,
        times: null,
      });
      window.CarrotSearchFoamTree.geometry = Object.freeze(
        (function() {
          return {
            rectangleInPolygon(a, l, k, f, d, c, g) {
              d = D.B(d, 1);
              c = D.B(c, 0.5);
              g = D.B(g, 0.5);
              a = M.se(a, { x: l, y: k }, f, c, g) * d;
              return { x: l - a * f * c, y: k - a * g, w: a * f, h: a };
            },
            circleInPolygon(a, l, k) {
              return M.Eg(a, { x: l, y: k });
            },
            stabPolygon(a, l, k, f) {
              return M.Wb(a, { x: l, y: k }, f);
            },
            polygonCentroid(a) {
              a = M.k(a, {});
              return { x: a.x, y: a.y, area: a.ja };
            },
            boundingBox(a) {
              for (var l = a[0].x, k = a[0].y, f = a[0].x, d = a[0].y, c = 1; c < a.length; c++) {
                const g = a[c];
                g.x < l && (l = g.x);
                g.y < k && (k = g.y);
                g.x > f && (f = g.x);
                g.y > d && (d = g.y);
              }
              return { x: l, y: k, w: f - l, h: d - k };
            },
          };
        })(),
      );
    },
    function() {
      window.CarrotSearchFoamTree = function() {
        window.console.error('FoamTree is not supported on this browser.');
      };
      window.CarrotSearchFoamTree.Xj = !1;
    },
  );
})();

export default CarrotSearchFoamTree;
