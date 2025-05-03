var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@sglkc/kuromoji/src/viterbi/ViterbiNode.js
var require_ViterbiNode = __commonJS({
  "node_modules/@sglkc/kuromoji/src/viterbi/ViterbiNode.js"(exports, module2) {
    "use strict";
    function ViterbiNode(node_name, node_cost, start_pos, length, type, left_id, right_id, surface_form) {
      this.name = node_name;
      this.cost = node_cost;
      this.start_pos = start_pos;
      this.length = length;
      this.left_id = left_id;
      this.right_id = right_id;
      this.prev = null;
      this.surface_form = surface_form;
      if (type === "BOS") {
        this.shortest_cost = 0;
      } else {
        this.shortest_cost = Number.MAX_VALUE;
      }
      this.type = type;
    }
    module2.exports = ViterbiNode;
  }
});

// node_modules/@sglkc/kuromoji/src/viterbi/ViterbiLattice.js
var require_ViterbiLattice = __commonJS({
  "node_modules/@sglkc/kuromoji/src/viterbi/ViterbiLattice.js"(exports, module2) {
    "use strict";
    var ViterbiNode = require_ViterbiNode();
    function ViterbiLattice() {
      this.nodes_end_at = [];
      this.nodes_end_at[0] = [new ViterbiNode(-1, 0, 0, 0, "BOS", 0, 0, "")];
      this.eos_pos = 1;
    }
    ViterbiLattice.prototype.append = function(node) {
      var last_pos = node.start_pos + node.length - 1;
      if (this.eos_pos < last_pos) {
        this.eos_pos = last_pos;
      }
      var prev_nodes = this.nodes_end_at[last_pos];
      if (prev_nodes == null) {
        prev_nodes = [];
      }
      prev_nodes.push(node);
      this.nodes_end_at[last_pos] = prev_nodes;
    };
    ViterbiLattice.prototype.appendEos = function() {
      var last_index = this.nodes_end_at.length;
      this.eos_pos++;
      this.nodes_end_at[last_index] = [new ViterbiNode(-1, 0, this.eos_pos, 0, "EOS", 0, 0, "")];
    };
    module2.exports = ViterbiLattice;
  }
});

// node_modules/@sglkc/kuromoji/src/util/SurrogateAwareString.js
var require_SurrogateAwareString = __commonJS({
  "node_modules/@sglkc/kuromoji/src/util/SurrogateAwareString.js"(exports, module2) {
    "use strict";
    function SurrogateAwareString(str) {
      this.str = str;
      this.index_mapping = [];
      for (var pos = 0; pos < str.length; pos++) {
        var ch = str.charAt(pos);
        this.index_mapping.push(pos);
        if (SurrogateAwareString.isSurrogatePair(ch)) {
          pos++;
        }
      }
      this.length = this.index_mapping.length;
    }
    SurrogateAwareString.prototype.slice = function(index) {
      if (this.index_mapping.length <= index) {
        return "";
      }
      var surrogate_aware_index = this.index_mapping[index];
      return this.str.slice(surrogate_aware_index);
    };
    SurrogateAwareString.prototype.charAt = function(index) {
      if (this.str.length <= index) {
        return "";
      }
      var surrogate_aware_start_index = this.index_mapping[index];
      var surrogate_aware_end_index = this.index_mapping[index + 1];
      if (surrogate_aware_end_index == null) {
        return this.str.slice(surrogate_aware_start_index);
      }
      return this.str.slice(surrogate_aware_start_index, surrogate_aware_end_index);
    };
    SurrogateAwareString.prototype.charCodeAt = function(index) {
      if (this.index_mapping.length <= index) {
        return NaN;
      }
      var surrogate_aware_index = this.index_mapping[index];
      var upper = this.str.charCodeAt(surrogate_aware_index);
      var lower;
      if (upper >= 55296 && upper <= 56319 && surrogate_aware_index < this.str.length) {
        lower = this.str.charCodeAt(surrogate_aware_index + 1);
        if (lower >= 56320 && lower <= 57343) {
          return (upper - 55296) * 1024 + lower - 56320 + 65536;
        }
      }
      return upper;
    };
    SurrogateAwareString.prototype.toString = function() {
      return this.str;
    };
    SurrogateAwareString.isSurrogatePair = function(ch) {
      var utf16_code = ch.charCodeAt(0);
      if (utf16_code >= 55296 && utf16_code <= 56319) {
        return true;
      } else {
        return false;
      }
    };
    module2.exports = SurrogateAwareString;
  }
});

// node_modules/@sglkc/kuromoji/src/viterbi/ViterbiBuilder.js
var require_ViterbiBuilder = __commonJS({
  "node_modules/@sglkc/kuromoji/src/viterbi/ViterbiBuilder.js"(exports, module2) {
    "use strict";
    var ViterbiNode = require_ViterbiNode();
    var ViterbiLattice = require_ViterbiLattice();
    var SurrogateAwareString = require_SurrogateAwareString();
    function ViterbiBuilder(dic) {
      this.trie = dic.trie;
      this.token_info_dictionary = dic.token_info_dictionary;
      this.unknown_dictionary = dic.unknown_dictionary;
    }
    ViterbiBuilder.prototype.build = function(sentence_str) {
      var lattice = new ViterbiLattice();
      var sentence = new SurrogateAwareString(sentence_str);
      var key, trie_id, left_id, right_id, word_cost;
      for (var pos = 0; pos < sentence.length; pos++) {
        var tail = sentence.slice(pos);
        var vocabulary = this.trie.commonPrefixSearch(tail);
        for (var n = 0; n < vocabulary.length; n++) {
          trie_id = vocabulary[n].v;
          key = vocabulary[n].k;
          var token_info_ids = this.token_info_dictionary.target_map[trie_id];
          for (var i = 0; i < token_info_ids.length; i++) {
            var token_info_id = parseInt(token_info_ids[i]);
            left_id = this.token_info_dictionary.dictionary.getShort(token_info_id);
            right_id = this.token_info_dictionary.dictionary.getShort(token_info_id + 2);
            word_cost = this.token_info_dictionary.dictionary.getShort(token_info_id + 4);
            lattice.append(new ViterbiNode(token_info_id, word_cost, pos + 1, key.length, "KNOWN", left_id, right_id, key));
          }
        }
        var surrogate_aware_tail = new SurrogateAwareString(tail);
        var head_char = new SurrogateAwareString(surrogate_aware_tail.charAt(0));
        var head_char_class = this.unknown_dictionary.lookup(head_char.toString());
        if (vocabulary == null || vocabulary.length === 0 || head_char_class.is_always_invoke === 1) {
          key = head_char;
          if (head_char_class.is_grouping === 1 && 1 < surrogate_aware_tail.length) {
            for (var k = 1; k < surrogate_aware_tail.length; k++) {
              var next_char = surrogate_aware_tail.charAt(k);
              var next_char_class = this.unknown_dictionary.lookup(next_char);
              if (head_char_class.class_name !== next_char_class.class_name) {
                break;
              }
              key += next_char;
            }
          }
          var unk_ids = this.unknown_dictionary.target_map[head_char_class.class_id];
          for (var j = 0; j < unk_ids.length; j++) {
            var unk_id = parseInt(unk_ids[j]);
            left_id = this.unknown_dictionary.dictionary.getShort(unk_id);
            right_id = this.unknown_dictionary.dictionary.getShort(unk_id + 2);
            word_cost = this.unknown_dictionary.dictionary.getShort(unk_id + 4);
            lattice.append(new ViterbiNode(unk_id, word_cost, pos + 1, key.length, "UNKNOWN", left_id, right_id, key.toString()));
          }
        }
      }
      lattice.appendEos();
      return lattice;
    };
    module2.exports = ViterbiBuilder;
  }
});

// node_modules/@sglkc/kuromoji/src/viterbi/ViterbiSearcher.js
var require_ViterbiSearcher = __commonJS({
  "node_modules/@sglkc/kuromoji/src/viterbi/ViterbiSearcher.js"(exports, module2) {
    "use strict";
    function ViterbiSearcher(connection_costs) {
      this.connection_costs = connection_costs;
    }
    ViterbiSearcher.prototype.search = function(lattice) {
      lattice = this.forward(lattice);
      return this.backward(lattice);
    };
    ViterbiSearcher.prototype.forward = function(lattice) {
      var i, j, k;
      for (i = 1; i <= lattice.eos_pos; i++) {
        var nodes = lattice.nodes_end_at[i];
        if (nodes == null) {
          continue;
        }
        for (j = 0; j < nodes.length; j++) {
          var node = nodes[j];
          var cost = Number.MAX_VALUE;
          var shortest_prev_node;
          var prev_nodes = lattice.nodes_end_at[node.start_pos - 1];
          if (prev_nodes == null) {
            continue;
          }
          for (k = 0; k < prev_nodes.length; k++) {
            var prev_node = prev_nodes[k];
            var edge_cost;
            if (node.left_id == null || prev_node.right_id == null) {
              console.log("Left or right is null");
              edge_cost = 0;
            } else {
              edge_cost = this.connection_costs.get(prev_node.right_id, node.left_id);
            }
            var _cost = prev_node.shortest_cost + edge_cost + node.cost;
            if (_cost < cost) {
              shortest_prev_node = prev_node;
              cost = _cost;
            }
          }
          node.prev = shortest_prev_node;
          node.shortest_cost = cost;
        }
      }
      return lattice;
    };
    ViterbiSearcher.prototype.backward = function(lattice) {
      var shortest_path = [];
      var eos = lattice.nodes_end_at[lattice.nodes_end_at.length - 1][0];
      var node_back = eos.prev;
      if (node_back == null) {
        return [];
      }
      while (node_back.type !== "BOS") {
        shortest_path.push(node_back);
        if (node_back.prev == null) {
          return [];
        }
        node_back = node_back.prev;
      }
      return shortest_path.reverse();
    };
    module2.exports = ViterbiSearcher;
  }
});

// node_modules/@sglkc/kuromoji/src/util/IpadicFormatter.js
var require_IpadicFormatter = __commonJS({
  "node_modules/@sglkc/kuromoji/src/util/IpadicFormatter.js"(exports, module2) {
    "use strict";
    function IpadicFormatter() {
    }
    IpadicFormatter.prototype.formatEntry = function(word_id, position, type, features) {
      var token = {};
      token.word_id = word_id;
      token.word_type = type;
      token.word_position = position;
      token.surface_form = features[0];
      token.pos = features[1];
      token.pos_detail_1 = features[2];
      token.pos_detail_2 = features[3];
      token.pos_detail_3 = features[4];
      token.conjugated_type = features[5];
      token.conjugated_form = features[6];
      token.basic_form = features[7];
      token.reading = features[8];
      token.pronunciation = features[9];
      return token;
    };
    IpadicFormatter.prototype.formatUnknownEntry = function(word_id, position, type, features, surface_form) {
      var token = {};
      token.word_id = word_id;
      token.word_type = type;
      token.word_position = position;
      token.surface_form = surface_form;
      token.pos = features[1];
      token.pos_detail_1 = features[2];
      token.pos_detail_2 = features[3];
      token.pos_detail_3 = features[4];
      token.conjugated_type = features[5];
      token.conjugated_form = features[6];
      token.basic_form = features[7];
      return token;
    };
    module2.exports = IpadicFormatter;
  }
});

// node_modules/@sglkc/kuromoji/src/Tokenizer.js
var require_Tokenizer = __commonJS({
  "node_modules/@sglkc/kuromoji/src/Tokenizer.js"(exports, module2) {
    "use strict";
    var ViterbiBuilder = require_ViterbiBuilder();
    var ViterbiSearcher = require_ViterbiSearcher();
    var IpadicFormatter = require_IpadicFormatter();
    var PUNCTUATION = /、|。/;
    function Tokenizer(dic) {
      this.token_info_dictionary = dic.token_info_dictionary;
      this.unknown_dictionary = dic.unknown_dictionary;
      this.viterbi_builder = new ViterbiBuilder(dic);
      this.viterbi_searcher = new ViterbiSearcher(dic.connection_costs);
      this.formatter = new IpadicFormatter();
    }
    Tokenizer.splitByPunctuation = function(input) {
      var sentences = [];
      var tail = input;
      while (true) {
        if (tail === "") {
          break;
        }
        var index = tail.search(PUNCTUATION);
        if (index < 0) {
          sentences.push(tail);
          break;
        }
        sentences.push(tail.substring(0, index + 1));
        tail = tail.substring(index + 1);
      }
      return sentences;
    };
    Tokenizer.prototype.tokenize = function(text) {
      var sentences = Tokenizer.splitByPunctuation(text);
      var tokens = [];
      for (var i = 0; i < sentences.length; i++) {
        var sentence = sentences[i];
        this.tokenizeForSentence(sentence, tokens);
      }
      return tokens;
    };
    Tokenizer.prototype.tokenizeForSentence = function(sentence, tokens) {
      if (tokens == null) {
        tokens = [];
      }
      var lattice = this.getLattice(sentence);
      var best_path = this.viterbi_searcher.search(lattice);
      var last_pos = 0;
      if (tokens.length > 0) {
        last_pos = tokens[tokens.length - 1].word_position;
      }
      for (var j = 0; j < best_path.length; j++) {
        var node = best_path[j];
        var token, features, features_line;
        if (node.type === "KNOWN") {
          features_line = this.token_info_dictionary.getFeatures(node.name);
          if (features_line == null) {
            features = [];
          } else {
            features = features_line.split(",");
          }
          token = this.formatter.formatEntry(node.name, last_pos + node.start_pos, node.type, features);
        } else if (node.type === "UNKNOWN") {
          features_line = this.unknown_dictionary.getFeatures(node.name);
          if (features_line == null) {
            features = [];
          } else {
            features = features_line.split(",");
          }
          token = this.formatter.formatUnknownEntry(node.name, last_pos + node.start_pos, node.type, features, node.surface_form);
        } else {
          token = this.formatter.formatEntry(node.name, last_pos + node.start_pos, node.type, []);
        }
        tokens.push(token);
      }
      return tokens;
    };
    Tokenizer.prototype.getLattice = function(text) {
      return this.viterbi_builder.build(text);
    };
    module2.exports = Tokenizer;
  }
});

// node_modules/fflate/lib/browser.cjs
var require_browser = __commonJS({
  "node_modules/fflate/lib/browser.cjs"(exports) {
    "use strict";
    var ch2 = {};
    var node_worker_1 = {};
    node_worker_1["default"] = function(c, id, msg, transfer, cb) {
      var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
        c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
      ], { type: "text/javascript" }))));
      w.onmessage = function(e) {
        var d = e.data, ed = d.$e$;
        if (ed) {
          var err2 = new Error(ed[0]);
          err2["code"] = ed[1];
          err2.stack = ed[2];
          cb(err2, null);
        } else
          cb(null, d);
      };
      w.postMessage(msg, transfer);
      return w;
    };
    var u8 = Uint8Array;
    var u16 = Uint16Array;
    var i32 = Int32Array;
    var fleb = new u8([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      0,
      /* unused */
      0,
      0,
      /* impossible */
      0
    ]);
    var fdeb = new u8([
      0,
      0,
      0,
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      /* unused */
      0,
      0
    ]);
    var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    var freb = function(eb, start) {
      var b = new u16(31);
      for (var i2 = 0; i2 < 31; ++i2) {
        b[i2] = start += 1 << eb[i2 - 1];
      }
      var r = new i32(b[30]);
      for (var i2 = 1; i2 < 30; ++i2) {
        for (var j = b[i2]; j < b[i2 + 1]; ++j) {
          r[j] = j - b[i2] << 5 | i2;
        }
      }
      return { b, r };
    };
    var _a = freb(fleb, 2);
    var fl = _a.b;
    var revfl = _a.r;
    fl[28] = 258, revfl[258] = 28;
    var _b = freb(fdeb, 0);
    var fd = _b.b;
    var revfd = _b.r;
    var rev = new u16(32768);
    for (i = 0; i < 32768; ++i) {
      x = (i & 43690) >> 1 | (i & 21845) << 1;
      x = (x & 52428) >> 2 | (x & 13107) << 2;
      x = (x & 61680) >> 4 | (x & 3855) << 4;
      rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
    }
    var x;
    var i;
    var hMap = function(cd, mb, r) {
      var s = cd.length;
      var i2 = 0;
      var l = new u16(mb);
      for (; i2 < s; ++i2) {
        if (cd[i2])
          ++l[cd[i2] - 1];
      }
      var le = new u16(mb);
      for (i2 = 1; i2 < mb; ++i2) {
        le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
      }
      var co;
      if (r) {
        co = new u16(1 << mb);
        var rvb = 15 - mb;
        for (i2 = 0; i2 < s; ++i2) {
          if (cd[i2]) {
            var sv = i2 << 4 | cd[i2];
            var r_1 = mb - cd[i2];
            var v = le[cd[i2] - 1]++ << r_1;
            for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
              co[rev[v] >> rvb] = sv;
            }
          }
        }
      } else {
        co = new u16(s);
        for (i2 = 0; i2 < s; ++i2) {
          if (cd[i2]) {
            co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
          }
        }
      }
      return co;
    };
    var flt = new u8(288);
    for (i = 0; i < 144; ++i)
      flt[i] = 8;
    var i;
    for (i = 144; i < 256; ++i)
      flt[i] = 9;
    var i;
    for (i = 256; i < 280; ++i)
      flt[i] = 7;
    var i;
    for (i = 280; i < 288; ++i)
      flt[i] = 8;
    var i;
    var fdt = new u8(32);
    for (i = 0; i < 32; ++i)
      fdt[i] = 5;
    var i;
    var flm = /* @__PURE__ */ hMap(flt, 9, 0);
    var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
    var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
    var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
    var max = function(a) {
      var m = a[0];
      for (var i2 = 1; i2 < a.length; ++i2) {
        if (a[i2] > m)
          m = a[i2];
      }
      return m;
    };
    var bits = function(d, p, m) {
      var o = p / 8 | 0;
      return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
    };
    var bits16 = function(d, p) {
      var o = p / 8 | 0;
      return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
    };
    var shft = function(p) {
      return (p + 7) / 8 | 0;
    };
    var slc = function(v, s, e) {
      if (s == null || s < 0)
        s = 0;
      if (e == null || e > v.length)
        e = v.length;
      return new u8(v.subarray(s, e));
    };
    exports.FlateErrorCode = {
      UnexpectedEOF: 0,
      InvalidBlockType: 1,
      InvalidLengthLiteral: 2,
      InvalidDistance: 3,
      StreamFinished: 4,
      NoStreamHandler: 5,
      InvalidHeader: 6,
      NoCallback: 7,
      InvalidUTF8: 8,
      ExtraFieldTooLong: 9,
      InvalidDate: 10,
      FilenameTooLong: 11,
      StreamFinishing: 12,
      InvalidZipData: 13,
      UnknownCompressionMethod: 14
    };
    var ec = [
      "unexpected EOF",
      "invalid block type",
      "invalid length/literal",
      "invalid distance",
      "stream finished",
      "no stream handler",
      ,
      "no callback",
      "invalid UTF-8 data",
      "extra field too long",
      "date not in range 1980-2099",
      "filename too long",
      "stream finishing",
      "invalid zip data"
      // determined by unknown compression method
    ];
    var err = function(ind, msg, nt) {
      var e = new Error(msg || ec[ind]);
      e.code = ind;
      if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
      if (!nt)
        throw e;
      return e;
    };
    var inflt = function(dat, st, buf, dict) {
      var sl = dat.length, dl = dict ? dict.length : 0;
      if (!sl || st.f && !st.l)
        return buf || new u8(0);
      var noBuf = !buf;
      var resize = noBuf || st.i != 2;
      var noSt = st.i;
      if (noBuf)
        buf = new u8(sl * 3);
      var cbuf = function(l2) {
        var bl = buf.length;
        if (l2 > bl) {
          var nbuf = new u8(Math.max(bl * 2, l2));
          nbuf.set(buf);
          buf = nbuf;
        }
      };
      var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
      var tbts = sl * 8;
      do {
        if (!lm) {
          final = bits(dat, pos, 1);
          var type = bits(dat, pos + 1, 3);
          pos += 3;
          if (!type) {
            var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
            if (t > sl) {
              if (noSt)
                err(0);
              break;
            }
            if (resize)
              cbuf(bt + l);
            buf.set(dat.subarray(s, t), bt);
            st.b = bt += l, st.p = pos = t * 8, st.f = final;
            continue;
          } else if (type == 1)
            lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
          else if (type == 2) {
            var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
            var tl = hLit + bits(dat, pos + 5, 31) + 1;
            pos += 14;
            var ldt = new u8(tl);
            var clt = new u8(19);
            for (var i2 = 0; i2 < hcLen; ++i2) {
              clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
            }
            pos += hcLen * 3;
            var clb = max(clt), clbmsk = (1 << clb) - 1;
            var clm = hMap(clt, clb, 1);
            for (var i2 = 0; i2 < tl; ) {
              var r = clm[bits(dat, pos, clbmsk)];
              pos += r & 15;
              var s = r >> 4;
              if (s < 16) {
                ldt[i2++] = s;
              } else {
                var c = 0, n = 0;
                if (s == 16)
                  n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
                else if (s == 17)
                  n = 3 + bits(dat, pos, 7), pos += 3;
                else if (s == 18)
                  n = 11 + bits(dat, pos, 127), pos += 7;
                while (n--)
                  ldt[i2++] = c;
              }
            }
            var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
            lbt = max(lt);
            dbt = max(dt);
            lm = hMap(lt, lbt, 1);
            dm = hMap(dt, dbt, 1);
          } else
            err(1);
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
        }
        if (resize)
          cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for (; ; lpos = pos) {
          var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
          pos += c & 15;
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (!c)
            err(2);
          if (sym < 256)
            buf[bt++] = sym;
          else if (sym == 256) {
            lpos = pos, lm = null;
            break;
          } else {
            var add = sym - 254;
            if (sym > 264) {
              var i2 = sym - 257, b = fleb[i2];
              add = bits(dat, pos, (1 << b) - 1) + fl[i2];
              pos += b;
            }
            var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
            if (!d)
              err(3);
            pos += d & 15;
            var dt = fd[dsym];
            if (dsym > 3) {
              var b = fdeb[dsym];
              dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
            }
            if (pos > tbts) {
              if (noSt)
                err(0);
              break;
            }
            if (resize)
              cbuf(bt + 131072);
            var end = bt + add;
            if (bt < dt) {
              var shift = dl - dt, dend = Math.min(dt, end);
              if (shift + bt < 0)
                err(3);
              for (; bt < dend; ++bt)
                buf[bt] = dict[shift + bt];
            }
            for (; bt < end; ++bt)
              buf[bt] = buf[bt - dt];
          }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm)
          final = 1, st.m = lbt, st.d = dm, st.n = dbt;
      } while (!final);
      return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
    };
    var wbits = function(d, p, v) {
      v <<= p & 7;
      var o = p / 8 | 0;
      d[o] |= v;
      d[o + 1] |= v >> 8;
    };
    var wbits16 = function(d, p, v) {
      v <<= p & 7;
      var o = p / 8 | 0;
      d[o] |= v;
      d[o + 1] |= v >> 8;
      d[o + 2] |= v >> 16;
    };
    var hTree = function(d, mb) {
      var t = [];
      for (var i2 = 0; i2 < d.length; ++i2) {
        if (d[i2])
          t.push({ s: i2, f: d[i2] });
      }
      var s = t.length;
      var t2 = t.slice();
      if (!s)
        return { t: et, l: 0 };
      if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return { t: v, l: 1 };
      }
      t.sort(function(a, b) {
        return a.f - b.f;
      });
      t.push({ s: -1, f: 25001 });
      var l = t[0], r = t[1], i0 = 0, i1 = 1, i22 = 2;
      t[0] = { s: -1, f: l.f + r.f, l, r };
      while (i1 != s - 1) {
        l = t[t[i0].f < t[i22].f ? i0++ : i22++];
        r = t[i0 != i1 && t[i0].f < t[i22].f ? i0++ : i22++];
        t[i1++] = { s: -1, f: l.f + r.f, l, r };
      }
      var maxSym = t2[0].s;
      for (var i2 = 1; i2 < s; ++i2) {
        if (t2[i2].s > maxSym)
          maxSym = t2[i2].s;
      }
      var tr = new u16(maxSym + 1);
      var mbt = ln(t[i1 - 1], tr, 0);
      if (mbt > mb) {
        var i2 = 0, dt = 0;
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function(a, b) {
          return tr[b.s] - tr[a.s] || a.f - b.f;
        });
        for (; i2 < s; ++i2) {
          var i2_1 = t2[i2].s;
          if (tr[i2_1] > mb) {
            dt += cst - (1 << mbt - tr[i2_1]);
            tr[i2_1] = mb;
          } else
            break;
        }
        dt >>= lft;
        while (dt > 0) {
          var i2_2 = t2[i2].s;
          if (tr[i2_2] < mb)
            dt -= 1 << mb - tr[i2_2]++ - 1;
          else
            ++i2;
        }
        for (; i2 >= 0 && dt; --i2) {
          var i2_3 = t2[i2].s;
          if (tr[i2_3] == mb) {
            --tr[i2_3];
            ++dt;
          }
        }
        mbt = mb;
      }
      return { t: new u8(tr), l: mbt };
    };
    var ln = function(n, l, d) {
      return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
    };
    var lc = function(c) {
      var s = c.length;
      while (s && !c[--s])
        ;
      var cl = new u16(++s);
      var cli = 0, cln = c[0], cls = 1;
      var w = function(v) {
        cl[cli++] = v;
      };
      for (var i2 = 1; i2 <= s; ++i2) {
        if (c[i2] == cln && i2 != s)
          ++cls;
        else {
          if (!cln && cls > 2) {
            for (; cls > 138; cls -= 138)
              w(32754);
            if (cls > 2) {
              w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
              cls = 0;
            }
          } else if (cls > 3) {
            w(cln), --cls;
            for (; cls > 6; cls -= 6)
              w(8304);
            if (cls > 2)
              w(cls - 3 << 5 | 8208), cls = 0;
          }
          while (cls--)
            w(cln);
          cls = 1;
          cln = c[i2];
        }
      }
      return { c: cl.subarray(0, cli), n: s };
    };
    var clen = function(cf, cl) {
      var l = 0;
      for (var i2 = 0; i2 < cl.length; ++i2)
        l += cf[i2] * cl[i2];
      return l;
    };
    var wfblk = function(out, pos, dat) {
      var s = dat.length;
      var o = shft(pos + 2);
      out[o] = s & 255;
      out[o + 1] = s >> 8;
      out[o + 2] = out[o] ^ 255;
      out[o + 3] = out[o + 1] ^ 255;
      for (var i2 = 0; i2 < s; ++i2)
        out[o + i2 + 4] = dat[i2];
      return (o + 4 + s) * 8;
    };
    var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
      wbits(out, p++, final);
      ++lf[256];
      var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
      var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
      var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
      var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
      var lcfreq = new u16(19);
      for (var i2 = 0; i2 < lclt.length; ++i2)
        ++lcfreq[lclt[i2] & 31];
      for (var i2 = 0; i2 < lcdt.length; ++i2)
        ++lcfreq[lcdt[i2] & 31];
      var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
      var nlcc = 19;
      for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
      var flen = bl + 5 << 3;
      var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
      var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
      if (bs >= 0 && flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
      var lm, ll, dm, dl;
      wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
      if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i2 = 0; i2 < nlcc; ++i2)
          wbits(out, p + 3 * i2, lct[clim[i2]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
          var clct = lcts[it];
          for (var i2 = 0; i2 < clct.length; ++i2) {
            var len = clct[i2] & 31;
            wbits(out, p, llm[len]), p += lct[len];
            if (len > 15)
              wbits(out, p, clct[i2] >> 5 & 127), p += clct[i2] >> 12;
          }
        }
      } else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
      }
      for (var i2 = 0; i2 < li; ++i2) {
        var sym = syms[i2];
        if (sym > 255) {
          var len = sym >> 18 & 31;
          wbits16(out, p, lm[len + 257]), p += ll[len + 257];
          if (len > 7)
            wbits(out, p, sym >> 23 & 31), p += fleb[len];
          var dst = sym & 31;
          wbits16(out, p, dm[dst]), p += dl[dst];
          if (dst > 3)
            wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
        } else {
          wbits16(out, p, lm[sym]), p += ll[sym];
        }
      }
      wbits16(out, p, lm[256]);
      return p + ll[256];
    };
    var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
    var et = /* @__PURE__ */ new u8(0);
    var dflt = function(dat, lvl, plvl, pre, post, st) {
      var s = st.z || dat.length;
      var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
      var w = o.subarray(pre, o.length - post);
      var lst = st.l;
      var pos = (st.r || 0) & 7;
      if (lvl) {
        if (pos)
          w[0] = st.r >> 3;
        var opt = deo[lvl - 1];
        var n = opt >> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function(i3) {
          return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
        };
        var syms = new i32(25e3);
        var lf = new u16(288), df = new u16(32);
        var lc_1 = 0, eb = 0, i2 = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
        for (; i2 + 2 < s; ++i2) {
          var hv = hsh(i2);
          var imod = i2 & 32767, pimod = head[hv];
          prev[imod] = pimod;
          head[hv] = imod;
          if (wi <= i2) {
            var rem = s - i2;
            if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
              pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
              li = lc_1 = eb = 0, bs = i2;
              for (var j = 0; j < 286; ++j)
                lf[j] = 0;
              for (var j = 0; j < 30; ++j)
                df[j] = 0;
            }
            var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
            if (rem > 2 && hv == hsh(i2 - dif)) {
              var maxn = Math.min(n, rem) - 1;
              var maxd = Math.min(32767, i2);
              var ml = Math.min(258, rem);
              while (dif <= maxd && --ch_1 && imod != pimod) {
                if (dat[i2 + l] == dat[i2 + l - dif]) {
                  var nl = 0;
                  for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                    ;
                  if (nl > l) {
                    l = nl, d = dif;
                    if (nl > maxn)
                      break;
                    var mmd = Math.min(dif, nl - 2);
                    var md = 0;
                    for (var j = 0; j < mmd; ++j) {
                      var ti = i2 - dif + j & 32767;
                      var pti = prev[ti];
                      var cd = ti - pti & 32767;
                      if (cd > md)
                        md = cd, pimod = ti;
                    }
                  }
                }
                imod = pimod, pimod = prev[imod];
                dif += imod - pimod & 32767;
              }
            }
            if (d) {
              syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
              var lin = revfl[l] & 31, din = revfd[d] & 31;
              eb += fleb[lin] + fdeb[din];
              ++lf[257 + lin];
              ++df[din];
              wi = i2 + l;
              ++lc_1;
            } else {
              syms[li++] = dat[i2];
              ++lf[dat[i2]];
            }
          }
        }
        for (i2 = Math.max(i2, wi); i2 < s; ++i2) {
          syms[li++] = dat[i2];
          ++lf[dat[i2]];
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
        if (!lst) {
          st.r = pos & 7 | w[pos / 8 | 0] << 3;
          pos -= 7;
          st.h = head, st.p = prev, st.i = i2, st.w = wi;
        }
      } else {
        for (var i2 = st.w || 0; i2 < s + lst; i2 += 65535) {
          var e = i2 + 65535;
          if (e >= s) {
            w[pos / 8 | 0] = lst;
            e = s;
          }
          pos = wfblk(w, pos + 1, dat.subarray(i2, e));
        }
        st.i = s;
      }
      return slc(o, 0, pre + shft(pos) + post);
    };
    var crct = /* @__PURE__ */ function() {
      var t = new Int32Array(256);
      for (var i2 = 0; i2 < 256; ++i2) {
        var c = i2, k = 9;
        while (--k)
          c = (c & 1 && -306674912) ^ c >>> 1;
        t[i2] = c;
      }
      return t;
    }();
    var crc = function() {
      var c = -1;
      return {
        p: function(d) {
          var cr = c;
          for (var i2 = 0; i2 < d.length; ++i2)
            cr = crct[cr & 255 ^ d[i2]] ^ cr >>> 8;
          c = cr;
        },
        d: function() {
          return ~c;
        }
      };
    };
    var adler = function() {
      var a = 1, b = 0;
      return {
        p: function(d) {
          var n = a, m = b;
          var l = d.length | 0;
          for (var i2 = 0; i2 != l; ) {
            var e = Math.min(i2 + 2655, l);
            for (; i2 < e; ++i2)
              m += n += d[i2];
            n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
          }
          a = n, b = m;
        },
        d: function() {
          a %= 65521, b %= 65521;
          return (a & 255) << 24 | (a & 65280) << 8 | (b & 255) << 8 | b >> 8;
        }
      };
    };
    var dopt = function(dat, opt, pre, post, st) {
      if (!st) {
        st = { l: 1 };
        if (opt.dictionary) {
          var dict = opt.dictionary.subarray(-32768);
          var newDat = new u8(dict.length + dat.length);
          newDat.set(dict);
          newDat.set(dat, dict.length);
          dat = newDat;
          st.w = dict.length;
        }
      }
      return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
    };
    var mrg = function(a, b) {
      var o = {};
      for (var k in a)
        o[k] = a[k];
      for (var k in b)
        o[k] = b[k];
      return o;
    };
    var wcln = function(fn, fnStr, td2) {
      var dt = fn();
      var st = fn.toString();
      var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
      for (var i2 = 0; i2 < dt.length; ++i2) {
        var v = dt[i2], k = ks[i2];
        if (typeof v == "function") {
          fnStr += ";" + k + "=";
          var st_1 = v.toString();
          if (v.prototype) {
            if (st_1.indexOf("[native code]") != -1) {
              var spInd = st_1.indexOf(" ", 8) + 1;
              fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
            } else {
              fnStr += st_1;
              for (var t in v.prototype)
                fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
            }
          } else
            fnStr += st_1;
        } else
          td2[k] = v;
      }
      return fnStr;
    };
    var ch = [];
    var cbfs = function(v) {
      var tl = [];
      for (var k in v) {
        if (v[k].buffer) {
          tl.push((v[k] = new v[k].constructor(v[k])).buffer);
        }
      }
      return tl;
    };
    var wrkr = function(fns, init, id, cb) {
      if (!ch[id]) {
        var fnStr = "", td_1 = {}, m = fns.length - 1;
        for (var i2 = 0; i2 < m; ++i2)
          fnStr = wcln(fns[i2], fnStr, td_1);
        ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };
      }
      var td2 = mrg({}, ch[id].e);
      return (0, node_worker_1.default)(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
    };
    var bInflt = function() {
      return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt];
    };
    var bDflt = function() {
      return [u8, u16, i32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf];
    };
    var gze = function() {
      return [gzh, gzhl, wbytes, crc, crct];
    };
    var guze = function() {
      return [gzs, gzl];
    };
    var zle = function() {
      return [zlh, wbytes, adler];
    };
    var zule = function() {
      return [zls];
    };
    var pbf = function(msg) {
      return postMessage(msg, [msg.buffer]);
    };
    var gopt = function(o) {
      return o && {
        out: o.size && new u8(o.size),
        dictionary: o.dictionary
      };
    };
    var cbify = function(dat, opts, fns, init, id, cb) {
      var w = wrkr(fns, init, id, function(err2, dat2) {
        w.terminate();
        cb(err2, dat2);
      });
      w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
      return function() {
        w.terminate();
      };
    };
    var astrm = function(strm) {
      strm.ondata = function(dat, final) {
        return postMessage([dat, final], [dat.buffer]);
      };
      return function(ev) {
        if (ev.data.length) {
          strm.push(ev.data[0], ev.data[1]);
          postMessage([ev.data[0].length]);
        } else
          strm.flush();
      };
    };
    var astrmify = function(fns, strm, opts, init, id, flush, ext) {
      var t;
      var w = wrkr(fns, init, id, function(err2, dat) {
        if (err2)
          w.terminate(), strm.ondata.call(strm, err2);
        else if (!Array.isArray(dat))
          ext(dat);
        else if (dat.length == 1) {
          strm.queuedSize -= dat[0];
          if (strm.ondrain)
            strm.ondrain(dat[0]);
        } else {
          if (dat[1])
            w.terminate();
          strm.ondata.call(strm, err2, dat[0], dat[1]);
        }
      });
      w.postMessage(opts);
      strm.queuedSize = 0;
      strm.push = function(d, f) {
        if (!strm.ondata)
          err(5);
        if (t)
          strm.ondata(err(4, 0, 1), null, !!f);
        strm.queuedSize += d.length;
        w.postMessage([d, t = f], [d.buffer]);
      };
      strm.terminate = function() {
        w.terminate();
      };
      if (flush) {
        strm.flush = function() {
          w.postMessage([]);
        };
      }
    };
    var b2 = function(d, b) {
      return d[b] | d[b + 1] << 8;
    };
    var b4 = function(d, b) {
      return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
    };
    var b8 = function(d, b) {
      return b4(d, b) + b4(d, b + 4) * 4294967296;
    };
    var wbytes = function(d, b, v) {
      for (; v; ++b)
        d[b] = v, v >>>= 8;
    };
    var gzh = function(c, o) {
      var fn = o.filename;
      c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3;
      if (o.mtime != 0)
        wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3));
      if (fn) {
        c[3] = 8;
        for (var i2 = 0; i2 <= fn.length; ++i2)
          c[i2 + 10] = fn.charCodeAt(i2);
      }
    };
    var gzs = function(d) {
      if (d[0] != 31 || d[1] != 139 || d[2] != 8)
        err(6, "invalid gzip data");
      var flg = d[3];
      var st = 10;
      if (flg & 4)
        st += (d[10] | d[11] << 8) + 2;
      for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
        ;
      return st + (flg & 2);
    };
    var gzl = function(d) {
      var l = d.length;
      return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
    };
    var gzhl = function(o) {
      return 10 + (o.filename ? o.filename.length + 1 : 0);
    };
    var zlh = function(c, o) {
      var lv = o.level, fl2 = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
      c[0] = 120, c[1] = fl2 << 6 | (o.dictionary && 32);
      c[1] |= 31 - (c[0] << 8 | c[1]) % 31;
      if (o.dictionary) {
        var h = adler();
        h.p(o.dictionary);
        wbytes(c, 2, h.d());
      }
    };
    var zls = function(d, dict) {
      if ((d[0] & 15) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31)
        err(6, "invalid zlib data");
      if ((d[1] >> 5 & 1) == +!dict)
        err(6, "invalid zlib data: " + (d[1] & 32 ? "need" : "unexpected") + " dictionary");
      return (d[1] >> 3 & 4) + 2;
    };
    function StrmOpt(opts, cb) {
      if (typeof opts == "function")
        cb = opts, opts = {};
      this.ondata = cb;
      return opts;
    }
    var Deflate = /* @__PURE__ */ function() {
      function Deflate2(opts, cb) {
        if (typeof opts == "function")
          cb = opts, opts = {};
        this.ondata = cb;
        this.o = opts || {};
        this.s = { l: 0, i: 32768, w: 32768, z: 32768 };
        this.b = new u8(98304);
        if (this.o.dictionary) {
          var dict = this.o.dictionary.subarray(-32768);
          this.b.set(dict, 32768 - dict.length);
          this.s.i = 32768 - dict.length;
        }
      }
      Deflate2.prototype.p = function(c, f) {
        this.ondata(dopt(c, this.o, 0, 0, this.s), f);
      };
      Deflate2.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        if (this.s.l)
          err(4);
        var endLen = chunk.length + this.s.z;
        if (endLen > this.b.length) {
          if (endLen > 2 * this.b.length - 32768) {
            var newBuf = new u8(endLen & -32768);
            newBuf.set(this.b.subarray(0, this.s.z));
            this.b = newBuf;
          }
          var split = this.b.length - this.s.z;
          this.b.set(chunk.subarray(0, split), this.s.z);
          this.s.z = this.b.length;
          this.p(this.b, false);
          this.b.set(this.b.subarray(-32768));
          this.b.set(chunk.subarray(split), 32768);
          this.s.z = chunk.length - split + 32768;
          this.s.i = 32766, this.s.w = 32768;
        } else {
          this.b.set(chunk, this.s.z);
          this.s.z += chunk.length;
        }
        this.s.l = final & 1;
        if (this.s.z > this.s.w + 8191 || final) {
          this.p(this.b, final || false);
          this.s.w = this.s.i, this.s.i -= 2;
        }
      };
      Deflate2.prototype.flush = function() {
        if (!this.ondata)
          err(5);
        if (this.s.l)
          err(4);
        this.p(this.b, false);
        this.s.w = this.s.i, this.s.i -= 2;
      };
      return Deflate2;
    }();
    exports.Deflate = Deflate;
    var AsyncDeflate = /* @__PURE__ */ function() {
      function AsyncDeflate2(opts, cb) {
        astrmify([
          bDflt,
          function() {
            return [astrm, Deflate];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Deflate(ev.data);
          onmessage = astrm(strm);
        }, 6, 1);
      }
      return AsyncDeflate2;
    }();
    exports.AsyncDeflate = AsyncDeflate;
    function deflate(data, opts, cb) {
      if (!cb)
        cb = opts, opts = {};
      if (typeof cb != "function")
        err(7);
      return cbify(data, opts, [
        bDflt
      ], function(ev) {
        return pbf(deflateSync(ev.data[0], ev.data[1]));
      }, 0, cb);
    }
    exports.deflate = deflate;
    function deflateSync(data, opts) {
      return dopt(data, opts || {}, 0, 0);
    }
    exports.deflateSync = deflateSync;
    var Inflate = /* @__PURE__ */ function() {
      function Inflate2(opts, cb) {
        if (typeof opts == "function")
          cb = opts, opts = {};
        this.ondata = cb;
        var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
        this.s = { i: 0, b: dict ? dict.length : 0 };
        this.o = new u8(32768);
        this.p = new u8(0);
        if (dict)
          this.o.set(dict);
      }
      Inflate2.prototype.e = function(c) {
        if (!this.ondata)
          err(5);
        if (this.d)
          err(4);
        if (!this.p.length)
          this.p = c;
        else if (c.length) {
          var n = new u8(this.p.length + c.length);
          n.set(this.p), n.set(c, this.p.length), this.p = n;
        }
      };
      Inflate2.prototype.c = function(final) {
        this.s.i = +(this.d = final || false);
        var bts = this.s.b;
        var dt = inflt(this.p, this.s, this.o);
        this.ondata(slc(dt, bts, this.s.b), this.d);
        this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
        this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
      };
      Inflate2.prototype.push = function(chunk, final) {
        this.e(chunk), this.c(final);
      };
      return Inflate2;
    }();
    exports.Inflate = Inflate;
    var AsyncInflate = /* @__PURE__ */ function() {
      function AsyncInflate2(opts, cb) {
        astrmify([
          bInflt,
          function() {
            return [astrm, Inflate];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Inflate(ev.data);
          onmessage = astrm(strm);
        }, 7, 0);
      }
      return AsyncInflate2;
    }();
    exports.AsyncInflate = AsyncInflate;
    function inflate(data, opts, cb) {
      if (!cb)
        cb = opts, opts = {};
      if (typeof cb != "function")
        err(7);
      return cbify(data, opts, [
        bInflt
      ], function(ev) {
        return pbf(inflateSync(ev.data[0], gopt(ev.data[1])));
      }, 1, cb);
    }
    exports.inflate = inflate;
    function inflateSync(data, opts) {
      return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
    }
    exports.inflateSync = inflateSync;
    var Gzip = /* @__PURE__ */ function() {
      function Gzip2(opts, cb) {
        this.c = crc();
        this.l = 0;
        this.v = 1;
        Deflate.call(this, opts, cb);
      }
      Gzip2.prototype.push = function(chunk, final) {
        this.c.p(chunk);
        this.l += chunk.length;
        Deflate.prototype.push.call(this, chunk, final);
      };
      Gzip2.prototype.p = function(c, f) {
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, this.s);
        if (this.v)
          gzh(raw, this.o), this.v = 0;
        if (f)
          wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
        this.ondata(raw, f);
      };
      Gzip2.prototype.flush = function() {
        Deflate.prototype.flush.call(this);
      };
      return Gzip2;
    }();
    exports.Gzip = Gzip;
    exports.Compress = Gzip;
    var AsyncGzip = /* @__PURE__ */ function() {
      function AsyncGzip2(opts, cb) {
        astrmify([
          bDflt,
          gze,
          function() {
            return [astrm, Deflate, Gzip];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Gzip(ev.data);
          onmessage = astrm(strm);
        }, 8, 1);
      }
      return AsyncGzip2;
    }();
    exports.AsyncGzip = AsyncGzip;
    exports.AsyncCompress = AsyncGzip;
    function gzip(data, opts, cb) {
      if (!cb)
        cb = opts, opts = {};
      if (typeof cb != "function")
        err(7);
      return cbify(data, opts, [
        bDflt,
        gze,
        function() {
          return [gzipSync];
        }
      ], function(ev) {
        return pbf(gzipSync(ev.data[0], ev.data[1]));
      }, 2, cb);
    }
    exports.gzip = gzip;
    exports.compress = gzip;
    function gzipSync(data, opts) {
      if (!opts)
        opts = {};
      var c = crc(), l = data.length;
      c.p(data);
      var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
      return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
    }
    exports.gzipSync = gzipSync;
    exports.compressSync = gzipSync;
    var Gunzip = /* @__PURE__ */ function() {
      function Gunzip2(opts, cb) {
        this.v = 1;
        this.r = 0;
        Inflate.call(this, opts, cb);
      }
      Gunzip2.prototype.push = function(chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        this.r += chunk.length;
        if (this.v) {
          var p = this.p.subarray(this.v - 1);
          var s = p.length > 3 ? gzs(p) : 4;
          if (s > p.length) {
            if (!final)
              return;
          } else if (this.v > 1 && this.onmember) {
            this.onmember(this.r - p.length);
          }
          this.p = p.subarray(s), this.v = 0;
        }
        Inflate.prototype.c.call(this, final);
        if (this.s.f && !this.s.l && !final) {
          this.v = shft(this.s.p) + 9;
          this.s = { i: 0 };
          this.o = new u8(0);
          this.push(new u8(0), final);
        }
      };
      return Gunzip2;
    }();
    exports.Gunzip = Gunzip;
    var AsyncGunzip = /* @__PURE__ */ function() {
      function AsyncGunzip2(opts, cb) {
        var _this = this;
        astrmify([
          bInflt,
          guze,
          function() {
            return [astrm, Inflate, Gunzip];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Gunzip(ev.data);
          strm.onmember = function(offset) {
            return postMessage(offset);
          };
          onmessage = astrm(strm);
        }, 9, 0, function(offset) {
          return _this.onmember && _this.onmember(offset);
        });
      }
      return AsyncGunzip2;
    }();
    exports.AsyncGunzip = AsyncGunzip;
    function gunzip(data, opts, cb) {
      if (!cb)
        cb = opts, opts = {};
      if (typeof cb != "function")
        err(7);
      return cbify(data, opts, [
        bInflt,
        guze,
        function() {
          return [gunzipSync];
        }
      ], function(ev) {
        return pbf(gunzipSync(ev.data[0], ev.data[1]));
      }, 3, cb);
    }
    exports.gunzip = gunzip;
    function gunzipSync(data, opts) {
      var st = gzs(data);
      if (st + 8 > data.length)
        err(6, "invalid gzip data");
      return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
    }
    exports.gunzipSync = gunzipSync;
    var Zlib = /* @__PURE__ */ function() {
      function Zlib2(opts, cb) {
        this.c = adler();
        this.v = 1;
        Deflate.call(this, opts, cb);
      }
      Zlib2.prototype.push = function(chunk, final) {
        this.c.p(chunk);
        Deflate.prototype.push.call(this, chunk, final);
      };
      Zlib2.prototype.p = function(c, f) {
        var raw = dopt(c, this.o, this.v && (this.o.dictionary ? 6 : 2), f && 4, this.s);
        if (this.v)
          zlh(raw, this.o), this.v = 0;
        if (f)
          wbytes(raw, raw.length - 4, this.c.d());
        this.ondata(raw, f);
      };
      Zlib2.prototype.flush = function() {
        Deflate.prototype.flush.call(this);
      };
      return Zlib2;
    }();
    exports.Zlib = Zlib;
    var AsyncZlib = /* @__PURE__ */ function() {
      function AsyncZlib2(opts, cb) {
        astrmify([
          bDflt,
          zle,
          function() {
            return [astrm, Deflate, Zlib];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Zlib(ev.data);
          onmessage = astrm(strm);
        }, 10, 1);
      }
      return AsyncZlib2;
    }();
    exports.AsyncZlib = AsyncZlib;
    function zlib(data, opts, cb) {
      if (!cb)
        cb = opts, opts = {};
      if (typeof cb != "function")
        err(7);
      return cbify(data, opts, [
        bDflt,
        zle,
        function() {
          return [zlibSync];
        }
      ], function(ev) {
        return pbf(zlibSync(ev.data[0], ev.data[1]));
      }, 4, cb);
    }
    exports.zlib = zlib;
    function zlibSync(data, opts) {
      if (!opts)
        opts = {};
      var a = adler();
      a.p(data);
      var d = dopt(data, opts, opts.dictionary ? 6 : 2, 4);
      return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
    }
    exports.zlibSync = zlibSync;
    var Unzlib = /* @__PURE__ */ function() {
      function Unzlib2(opts, cb) {
        Inflate.call(this, opts, cb);
        this.v = opts && opts.dictionary ? 2 : 1;
      }
      Unzlib2.prototype.push = function(chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
          if (this.p.length < 6 && !final)
            return;
          this.p = this.p.subarray(zls(this.p, this.v - 1)), this.v = 0;
        }
        if (final) {
          if (this.p.length < 4)
            err(6, "invalid zlib data");
          this.p = this.p.subarray(0, -4);
        }
        Inflate.prototype.c.call(this, final);
      };
      return Unzlib2;
    }();
    exports.Unzlib = Unzlib;
    var AsyncUnzlib = /* @__PURE__ */ function() {
      function AsyncUnzlib2(opts, cb) {
        astrmify([
          bInflt,
          zule,
          function() {
            return [astrm, Inflate, Unzlib];
          }
        ], this, StrmOpt.call(this, opts, cb), function(ev) {
          var strm = new Unzlib(ev.data);
          onmessage = astrm(strm);
        }, 11, 0);
      }
      return AsyncUnzlib2;
    }();
    exports.AsyncUnzlib = AsyncUnzlib;
    function unzlib(data, opts, cb) {
      if (!cb)
        cb = opts, opts = {};
      if (typeof cb != "function")
        err(7);
      return cbify(data, opts, [
        bInflt,
        zule,
        function() {
          return [unzlibSync];
        }
      ], function(ev) {
        return pbf(unzlibSync(ev.data[0], gopt(ev.data[1])));
      }, 5, cb);
    }
    exports.unzlib = unzlib;
    function unzlibSync(data, opts) {
      return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
    }
    exports.unzlibSync = unzlibSync;
    var Decompress = /* @__PURE__ */ function() {
      function Decompress2(opts, cb) {
        this.o = StrmOpt.call(this, opts, cb) || {};
        this.G = Gunzip;
        this.I = Inflate;
        this.Z = Unzlib;
      }
      Decompress2.prototype.i = function() {
        var _this = this;
        this.s.ondata = function(dat, final) {
          _this.ondata(dat, final);
        };
      };
      Decompress2.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        if (!this.s) {
          if (this.p && this.p.length) {
            var n = new u8(this.p.length + chunk.length);
            n.set(this.p), n.set(chunk, this.p.length);
          } else
            this.p = chunk;
          if (this.p.length > 2) {
            this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(this.o) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(this.o) : new this.Z(this.o);
            this.i();
            this.s.push(this.p, final);
            this.p = null;
          }
        } else
          this.s.push(chunk, final);
      };
      return Decompress2;
    }();
    exports.Decompress = Decompress;
    var AsyncDecompress = /* @__PURE__ */ function() {
      function AsyncDecompress2(opts, cb) {
        Decompress.call(this, opts, cb);
        this.queuedSize = 0;
        this.G = AsyncGunzip;
        this.I = AsyncInflate;
        this.Z = AsyncUnzlib;
      }
      AsyncDecompress2.prototype.i = function() {
        var _this = this;
        this.s.ondata = function(err2, dat, final) {
          _this.ondata(err2, dat, final);
        };
        this.s.ondrain = function(size) {
          _this.queuedSize -= size;
          if (_this.ondrain)
            _this.ondrain(size);
        };
      };
      AsyncDecompress2.prototype.push = function(chunk, final) {
        this.queuedSize += chunk.length;
        Decompress.prototype.push.call(this, chunk, final);
      };
      return AsyncDecompress2;
    }();
    exports.AsyncDecompress = AsyncDecompress;
    function decompress(data, opts, cb) {
      if (!cb)
        cb = opts, opts = {};
      if (typeof cb != "function")
        err(7);
      return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzip(data, opts, cb) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflate(data, opts, cb) : unzlib(data, opts, cb);
    }
    exports.decompress = decompress;
    function decompressSync(data, opts) {
      return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, opts) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, opts) : unzlibSync(data, opts);
    }
    exports.decompressSync = decompressSync;
    var fltn = function(d, p, t, o) {
      for (var k in d) {
        var val = d[k], n = p + k, op = o;
        if (Array.isArray(val))
          op = mrg(o, val[1]), val = val[0];
        if (val instanceof u8)
          t[n] = [val, op];
        else {
          t[n += "/"] = [new u8(0), op];
          fltn(val, n, t, o);
        }
      }
    };
    var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
    var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
    var tds = 0;
    try {
      td.decode(et, { stream: true });
      tds = 1;
    } catch (e) {
    }
    var dutf8 = function(d) {
      for (var r = "", i2 = 0; ; ) {
        var c = d[i2++];
        var eb = (c > 127) + (c > 223) + (c > 239);
        if (i2 + eb > d.length)
          return { s: r, r: slc(d, i2 - 1) };
        if (!eb)
          r += String.fromCharCode(c);
        else if (eb == 3) {
          c = ((c & 15) << 18 | (d[i2++] & 63) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
        } else if (eb & 1)
          r += String.fromCharCode((c & 31) << 6 | d[i2++] & 63);
        else
          r += String.fromCharCode((c & 15) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63);
      }
    };
    var DecodeUTF8 = /* @__PURE__ */ function() {
      function DecodeUTF82(cb) {
        this.ondata = cb;
        if (tds)
          this.t = new TextDecoder();
        else
          this.p = et;
      }
      DecodeUTF82.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        final = !!final;
        if (this.t) {
          this.ondata(this.t.decode(chunk, { stream: true }), final);
          if (final) {
            if (this.t.decode().length)
              err(8);
            this.t = null;
          }
          return;
        }
        if (!this.p)
          err(4);
        var dat = new u8(this.p.length + chunk.length);
        dat.set(this.p);
        dat.set(chunk, this.p.length);
        var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
        if (final) {
          if (r.length)
            err(8);
          this.p = null;
        } else
          this.p = r;
        this.ondata(s, final);
      };
      return DecodeUTF82;
    }();
    exports.DecodeUTF8 = DecodeUTF8;
    var EncodeUTF8 = /* @__PURE__ */ function() {
      function EncodeUTF82(cb) {
        this.ondata = cb;
      }
      EncodeUTF82.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        if (this.d)
          err(4);
        this.ondata(strToU8(chunk), this.d = final || false);
      };
      return EncodeUTF82;
    }();
    exports.EncodeUTF8 = EncodeUTF8;
    function strToU8(str, latin1) {
      if (latin1) {
        var ar_1 = new u8(str.length);
        for (var i2 = 0; i2 < str.length; ++i2)
          ar_1[i2] = str.charCodeAt(i2);
        return ar_1;
      }
      if (te)
        return te.encode(str);
      var l = str.length;
      var ar = new u8(str.length + (str.length >> 1));
      var ai = 0;
      var w = function(v) {
        ar[ai++] = v;
      };
      for (var i2 = 0; i2 < l; ++i2) {
        if (ai + 5 > ar.length) {
          var n = new u8(ai + 8 + (l - i2 << 1));
          n.set(ar);
          ar = n;
        }
        var c = str.charCodeAt(i2);
        if (c < 128 || latin1)
          w(c);
        else if (c < 2048)
          w(192 | c >> 6), w(128 | c & 63);
        else if (c > 55295 && c < 57344)
          c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i2) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
        else
          w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
      }
      return slc(ar, 0, ai);
    }
    exports.strToU8 = strToU8;
    function strFromU8(dat, latin1) {
      if (latin1) {
        var r = "";
        for (var i2 = 0; i2 < dat.length; i2 += 16384)
          r += String.fromCharCode.apply(null, dat.subarray(i2, i2 + 16384));
        return r;
      } else if (td) {
        return td.decode(dat);
      } else {
        var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
        if (r.length)
          err(8);
        return s;
      }
    }
    exports.strFromU8 = strFromU8;
    var dbf = function(l) {
      return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0;
    };
    var slzh = function(d, b) {
      return b + 30 + b2(d, b + 26) + b2(d, b + 28);
    };
    var zh = function(d, b, z) {
      var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
      var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
      return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
    };
    var z64e = function(d, b) {
      for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
        ;
      return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
    };
    var exfl = function(ex) {
      var le = 0;
      if (ex) {
        for (var k in ex) {
          var l = ex[k].length;
          if (l > 65535)
            err(9);
          le += l + 4;
        }
      }
      return le;
    };
    var wzh = function(d, b, f, fn, u, c, ce, co) {
      var fl2 = fn.length, ex = f.extra, col = co && co.length;
      var exl = exfl(ex);
      wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
      if (ce != null)
        d[b++] = 20, d[b++] = f.os;
      d[b] = 20, b += 2;
      d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
      d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
      var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
      if (y < 0 || y > 119)
        err(10);
      wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
      if (c != -1) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c < 0 ? -c - 2 : c);
        wbytes(d, b + 8, f.size);
      }
      wbytes(d, b + 12, fl2);
      wbytes(d, b + 14, exl), b += 16;
      if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
      }
      d.set(fn, b);
      b += fl2;
      if (exl) {
        for (var k in ex) {
          var exf = ex[k], l = exf.length;
          wbytes(d, b, +k);
          wbytes(d, b + 2, l);
          d.set(exf, b + 4), b += 4 + l;
        }
      }
      if (col)
        d.set(co, b), b += col;
      return b;
    };
    var wzf = function(o, b, c, d, e) {
      wbytes(o, b, 101010256);
      wbytes(o, b + 8, c);
      wbytes(o, b + 10, c);
      wbytes(o, b + 12, d);
      wbytes(o, b + 16, e);
    };
    var ZipPassThrough = /* @__PURE__ */ function() {
      function ZipPassThrough2(filename) {
        this.filename = filename;
        this.c = crc();
        this.size = 0;
        this.compression = 0;
      }
      ZipPassThrough2.prototype.process = function(chunk, final) {
        this.ondata(null, chunk, final);
      };
      ZipPassThrough2.prototype.push = function(chunk, final) {
        if (!this.ondata)
          err(5);
        this.c.p(chunk);
        this.size += chunk.length;
        if (final)
          this.crc = this.c.d();
        this.process(chunk, final || false);
      };
      return ZipPassThrough2;
    }();
    exports.ZipPassThrough = ZipPassThrough;
    var ZipDeflate = /* @__PURE__ */ function() {
      function ZipDeflate2(filename, opts) {
        var _this = this;
        if (!opts)
          opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new Deflate(opts, function(dat, final) {
          _this.ondata(null, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
      }
      ZipDeflate2.prototype.process = function(chunk, final) {
        try {
          this.d.push(chunk, final);
        } catch (e) {
          this.ondata(e, null, final);
        }
      };
      ZipDeflate2.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return ZipDeflate2;
    }();
    exports.ZipDeflate = ZipDeflate;
    var AsyncZipDeflate = /* @__PURE__ */ function() {
      function AsyncZipDeflate2(filename, opts) {
        var _this = this;
        if (!opts)
          opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new AsyncDeflate(opts, function(err2, dat, final) {
          _this.ondata(err2, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
        this.terminate = this.d.terminate;
      }
      AsyncZipDeflate2.prototype.process = function(chunk, final) {
        this.d.push(chunk, final);
      };
      AsyncZipDeflate2.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return AsyncZipDeflate2;
    }();
    exports.AsyncZipDeflate = AsyncZipDeflate;
    var Zip = /* @__PURE__ */ function() {
      function Zip2(cb) {
        this.ondata = cb;
        this.u = [];
        this.d = 1;
      }
      Zip2.prototype.add = function(file) {
        var _this = this;
        if (!this.ondata)
          err(5);
        if (this.d & 2)
          this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
        else {
          var f = strToU8(file.filename), fl_1 = f.length;
          var com = file.comment, o = com && strToU8(com);
          var u = fl_1 != file.filename.length || o && com.length != o.length;
          var hl_1 = fl_1 + exfl(file.extra) + 30;
          if (fl_1 > 65535)
            this.ondata(err(11, 0, 1), null, false);
          var header = new u8(hl_1);
          wzh(header, 0, file, f, u, -1);
          var chks_1 = [header];
          var pAll_1 = function() {
            for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
              var chk = chks_2[_i];
              _this.ondata(null, chk, false);
            }
            chks_1 = [];
          };
          var tr_1 = this.d;
          this.d = 0;
          var ind_1 = this.u.length;
          var uf_1 = mrg(file, {
            f,
            u,
            o,
            t: function() {
              if (file.terminate)
                file.terminate();
            },
            r: function() {
              pAll_1();
              if (tr_1) {
                var nxt = _this.u[ind_1 + 1];
                if (nxt)
                  nxt.r();
                else
                  _this.d = 1;
              }
              tr_1 = 1;
            }
          });
          var cl_1 = 0;
          file.ondata = function(err2, dat, final) {
            if (err2) {
              _this.ondata(err2, dat, final);
              _this.terminate();
            } else {
              cl_1 += dat.length;
              chks_1.push(dat);
              if (final) {
                var dd = new u8(16);
                wbytes(dd, 0, 134695760);
                wbytes(dd, 4, file.crc);
                wbytes(dd, 8, cl_1);
                wbytes(dd, 12, file.size);
                chks_1.push(dd);
                uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                if (tr_1)
                  uf_1.r();
                tr_1 = 1;
              } else if (tr_1)
                pAll_1();
            }
          };
          this.u.push(uf_1);
        }
      };
      Zip2.prototype.end = function() {
        var _this = this;
        if (this.d & 2) {
          this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
          return;
        }
        if (this.d)
          this.e();
        else
          this.u.push({
            r: function() {
              if (!(_this.d & 1))
                return;
              _this.u.splice(-1, 1);
              _this.e();
            },
            t: function() {
            }
          });
        this.d = 3;
      };
      Zip2.prototype.e = function() {
        var bt = 0, l = 0, tl = 0;
        for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
          var f = _a2[_i];
          tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
        }
        var out = new u8(tl + 22);
        for (var _b2 = 0, _c = this.u; _b2 < _c.length; _b2++) {
          var f = _c[_b2];
          wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
          bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
        }
        wzf(out, bt, this.u.length, tl, l);
        this.ondata(null, out, true);
        this.d = 2;
      };
      Zip2.prototype.terminate = function() {
        for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
          var f = _a2[_i];
          f.t();
        }
        this.d = 2;
      };
      return Zip2;
    }();
    exports.Zip = Zip;
    function zip(data, opts, cb) {
      if (!cb)
        cb = opts, opts = {};
      if (typeof cb != "function")
        err(7);
      var r = {};
      fltn(data, "", r, opts);
      var k = Object.keys(r);
      var lft = k.length, o = 0, tot = 0;
      var slft = lft, files = new Array(lft);
      var term = [];
      var tAll = function() {
        for (var i3 = 0; i3 < term.length; ++i3)
          term[i3]();
      };
      var cbd = function(a, b) {
        mt(function() {
          cb(a, b);
        });
      };
      mt(function() {
        cbd = cb;
      });
      var cbf = function() {
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        tot = 0;
        for (var i3 = 0; i3 < slft; ++i3) {
          var f = files[i3];
          try {
            var l = f.c.length;
            wzh(out, tot, f, f.f, f.u, l);
            var badd = 30 + f.f.length + exfl(f.extra);
            var loc = tot + badd;
            out.set(f.c, loc);
            wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
          } catch (e) {
            return cbd(e, null);
          }
        }
        wzf(out, o, files.length, cdl, oe);
        cbd(null, out);
      };
      if (!lft)
        cbf();
      var _loop_1 = function(i3) {
        var fn = k[i3];
        var _a2 = r[fn], file = _a2[0], p = _a2[1];
        var c = crc(), size = file.length;
        c.p(file);
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        var compression = p.level == 0 ? 0 : 8;
        var cbl = function(e, d) {
          if (e) {
            tAll();
            cbd(e, null);
          } else {
            var l = d.length;
            files[i3] = mrg(p, {
              size,
              crc: c.d(),
              c: d,
              f,
              m,
              u: s != fn.length || m && com.length != ms,
              compression
            });
            o += 30 + s + exl + l;
            tot += 76 + 2 * (s + exl) + (ms || 0) + l;
            if (!--lft)
              cbf();
          }
        };
        if (s > 65535)
          cbl(err(11, 0, 1), null);
        if (!compression)
          cbl(null, file);
        else if (size < 16e4) {
          try {
            cbl(null, deflateSync(file, p));
          } catch (e) {
            cbl(e, null);
          }
        } else
          term.push(deflate(file, p, cbl));
      };
      for (var i2 = 0; i2 < slft; ++i2) {
        _loop_1(i2);
      }
      return tAll;
    }
    exports.zip = zip;
    function zipSync(data, opts) {
      if (!opts)
        opts = {};
      var r = {};
      var files = [];
      fltn(data, "", r, opts);
      var o = 0;
      var tot = 0;
      for (var fn in r) {
        var _a2 = r[fn], file = _a2[0], p = _a2[1];
        var compression = p.level == 0 ? 0 : 8;
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        if (s > 65535)
          err(11);
        var d = compression ? deflateSync(file, p) : file, l = d.length;
        var c = crc();
        c.p(file);
        files.push(mrg(p, {
          size: file.length,
          crc: c.d(),
          c: d,
          f,
          m,
          u: s != fn.length || m && com.length != ms,
          o,
          compression
        }));
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
      }
      var out = new u8(tot + 22), oe = o, cdl = tot - o;
      for (var i2 = 0; i2 < files.length; ++i2) {
        var f = files[i2];
        wzh(out, f.o, f, f.f, f.u, f.c.length);
        var badd = 30 + f.f.length + exfl(f.extra);
        out.set(f.c, f.o + badd);
        wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
      }
      wzf(out, o, files.length, cdl, oe);
      return out;
    }
    exports.zipSync = zipSync;
    var UnzipPassThrough = /* @__PURE__ */ function() {
      function UnzipPassThrough2() {
      }
      UnzipPassThrough2.prototype.push = function(data, final) {
        this.ondata(null, data, final);
      };
      UnzipPassThrough2.compression = 0;
      return UnzipPassThrough2;
    }();
    exports.UnzipPassThrough = UnzipPassThrough;
    var UnzipInflate = /* @__PURE__ */ function() {
      function UnzipInflate2() {
        var _this = this;
        this.i = new Inflate(function(dat, final) {
          _this.ondata(null, dat, final);
        });
      }
      UnzipInflate2.prototype.push = function(data, final) {
        try {
          this.i.push(data, final);
        } catch (e) {
          this.ondata(e, null, final);
        }
      };
      UnzipInflate2.compression = 8;
      return UnzipInflate2;
    }();
    exports.UnzipInflate = UnzipInflate;
    var AsyncUnzipInflate = /* @__PURE__ */ function() {
      function AsyncUnzipInflate2(_, sz) {
        var _this = this;
        if (sz < 32e4) {
          this.i = new Inflate(function(dat, final) {
            _this.ondata(null, dat, final);
          });
        } else {
          this.i = new AsyncInflate(function(err2, dat, final) {
            _this.ondata(err2, dat, final);
          });
          this.terminate = this.i.terminate;
        }
      }
      AsyncUnzipInflate2.prototype.push = function(data, final) {
        if (this.i.terminate)
          data = slc(data, 0);
        this.i.push(data, final);
      };
      AsyncUnzipInflate2.compression = 8;
      return AsyncUnzipInflate2;
    }();
    exports.AsyncUnzipInflate = AsyncUnzipInflate;
    var Unzip = /* @__PURE__ */ function() {
      function Unzip2(cb) {
        this.onfile = cb;
        this.k = [];
        this.o = {
          0: UnzipPassThrough
        };
        this.p = et;
      }
      Unzip2.prototype.push = function(chunk, final) {
        var _this = this;
        if (!this.onfile)
          err(5);
        if (!this.p)
          err(4);
        if (this.c > 0) {
          var len = Math.min(this.c, chunk.length);
          var toAdd = chunk.subarray(0, len);
          this.c -= len;
          if (this.d)
            this.d.push(toAdd, !this.c);
          else
            this.k[0].push(toAdd);
          chunk = chunk.subarray(len);
          if (chunk.length)
            return this.push(chunk, final);
        } else {
          var f = 0, i2 = 0, is = void 0, buf = void 0;
          if (!this.p.length)
            buf = chunk;
          else if (!chunk.length)
            buf = this.p;
          else {
            buf = new u8(this.p.length + chunk.length);
            buf.set(this.p), buf.set(chunk, this.p.length);
          }
          var l = buf.length, oc = this.c, add = oc && this.d;
          var _loop_2 = function() {
            var _a2;
            var sig = b4(buf, i2);
            if (sig == 67324752) {
              f = 1, is = i2;
              this_1.d = null;
              this_1.c = 0;
              var bf = b2(buf, i2 + 6), cmp_1 = b2(buf, i2 + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i2 + 26), es = b2(buf, i2 + 28);
              if (l > i2 + 30 + fnl + es) {
                var chks_3 = [];
                this_1.k.unshift(chks_3);
                f = 2;
                var sc_1 = b4(buf, i2 + 18), su_1 = b4(buf, i2 + 22);
                var fn_1 = strFromU8(buf.subarray(i2 + 30, i2 += 30 + fnl), !u);
                if (sc_1 == 4294967295) {
                  _a2 = dd ? [-2] : z64e(buf, i2), sc_1 = _a2[0], su_1 = _a2[1];
                } else if (dd)
                  sc_1 = -1;
                i2 += es;
                this_1.c = sc_1;
                var d_1;
                var file_1 = {
                  name: fn_1,
                  compression: cmp_1,
                  start: function() {
                    if (!file_1.ondata)
                      err(5);
                    if (!sc_1)
                      file_1.ondata(null, et, true);
                    else {
                      var ctr = _this.o[cmp_1];
                      if (!ctr)
                        file_1.ondata(err(14, "unknown compression type " + cmp_1, 1), null, false);
                      d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                      d_1.ondata = function(err2, dat3, final2) {
                        file_1.ondata(err2, dat3, final2);
                      };
                      for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                        var dat2 = chks_4[_i];
                        d_1.push(dat2, false);
                      }
                      if (_this.k[0] == chks_3 && _this.c)
                        _this.d = d_1;
                      else
                        d_1.push(et, true);
                    }
                  },
                  terminate: function() {
                    if (d_1 && d_1.terminate)
                      d_1.terminate();
                  }
                };
                if (sc_1 >= 0)
                  file_1.size = sc_1, file_1.originalSize = su_1;
                this_1.onfile(file_1);
              }
              return "break";
            } else if (oc) {
              if (sig == 134695760) {
                is = i2 += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                return "break";
              } else if (sig == 33639248) {
                is = i2 -= 4, f = 3, this_1.c = 0;
                return "break";
              }
            }
          };
          var this_1 = this;
          for (; i2 < l - 4; ++i2) {
            var state_1 = _loop_2();
            if (state_1 === "break")
              break;
          }
          this.p = et;
          if (oc < 0) {
            var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 134695760 && 4)) : buf.subarray(0, i2);
            if (add)
              add.push(dat, !!f);
            else
              this.k[+(f == 2)].push(dat);
          }
          if (f & 2)
            return this.push(buf.subarray(i2), final);
          this.p = buf.subarray(i2);
        }
        if (final) {
          if (this.c)
            err(13);
          this.p = null;
        }
      };
      Unzip2.prototype.register = function(decoder) {
        this.o[decoder.compression] = decoder;
      };
      return Unzip2;
    }();
    exports.Unzip = Unzip;
    var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
      fn();
    };
    function unzip(data, opts, cb) {
      if (!cb)
        cb = opts, opts = {};
      if (typeof cb != "function")
        err(7);
      var term = [];
      var tAll = function() {
        for (var i3 = 0; i3 < term.length; ++i3)
          term[i3]();
      };
      var files = {};
      var cbd = function(a, b) {
        mt(function() {
          cb(a, b);
        });
      };
      mt(function() {
        cbd = cb;
      });
      var e = data.length - 22;
      for (; b4(data, e) != 101010256; --e) {
        if (!e || data.length - e > 65558) {
          cbd(err(13, 0, 1), null);
          return tAll;
        }
      }
      ;
      var lft = b2(data, e + 8);
      if (lft) {
        var c = lft;
        var o = b4(data, e + 16);
        var z = o == 4294967295 || c == 65535;
        if (z) {
          var ze = b4(data, e - 12);
          z = b4(data, ze) == 101075792;
          if (z) {
            c = lft = b4(data, ze + 32);
            o = b4(data, ze + 48);
          }
        }
        var fltr = opts && opts.filter;
        var _loop_3 = function(i3) {
          var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
          o = no;
          var cbl = function(e2, d) {
            if (e2) {
              tAll();
              cbd(e2, null);
            } else {
              if (d)
                files[fn] = d;
              if (!--lft)
                cbd(null, files);
            }
          };
          if (!fltr || fltr({
            name: fn,
            size: sc,
            originalSize: su,
            compression: c_1
          })) {
            if (!c_1)
              cbl(null, slc(data, b, b + sc));
            else if (c_1 == 8) {
              var infl = data.subarray(b, b + sc);
              if (su < 524288 || sc > 0.8 * su) {
                try {
                  cbl(null, inflateSync(infl, { out: new u8(su) }));
                } catch (e2) {
                  cbl(e2, null);
                }
              } else
                term.push(inflate(infl, { size: su }, cbl));
            } else
              cbl(err(14, "unknown compression type " + c_1, 1), null);
          } else
            cbl(null, null);
        };
        for (var i2 = 0; i2 < c; ++i2) {
          _loop_3(i2);
        }
      } else
        cbd(null, {});
      return tAll;
    }
    exports.unzip = unzip;
    function unzipSync(data, opts) {
      var files = {};
      var e = data.length - 22;
      for (; b4(data, e) != 101010256; --e) {
        if (!e || data.length - e > 65558)
          err(13);
      }
      ;
      var c = b2(data, e + 8);
      if (!c)
        return {};
      var o = b4(data, e + 16);
      var z = o == 4294967295 || c == 65535;
      if (z) {
        var ze = b4(data, e - 12);
        z = b4(data, ze) == 101075792;
        if (z) {
          c = b4(data, ze + 32);
          o = b4(data, ze + 48);
        }
      }
      var fltr = opts && opts.filter;
      for (var i2 = 0; i2 < c; ++i2) {
        var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
        o = no;
        if (!fltr || fltr({
          name: fn,
          size: sc,
          originalSize: su,
          compression: c_2
        })) {
          if (!c_2)
            files[fn] = slc(data, b, b + sc);
          else if (c_2 == 8)
            files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
          else
            err(14, "unknown compression type " + c_2);
        }
      }
      return files;
    }
    exports.unzipSync = unzipSync;
  }
});

// node_modules/async/dist/async.js
var require_async = __commonJS({
  "node_modules/async/dist/async.js"(exports, module2) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.async = global2.async || {});
    })(exports, function(exports2) {
      "use strict";
      function slice(arrayLike, start) {
        start = start | 0;
        var newLen = Math.max(arrayLike.length - start, 0);
        var newArr = Array(newLen);
        for (var idx = 0; idx < newLen; idx++) {
          newArr[idx] = arrayLike[start + idx];
        }
        return newArr;
      }
      var apply = function(fn) {
        var args = slice(arguments, 1);
        return function() {
          var callArgs = slice(arguments);
          return fn.apply(null, args.concat(callArgs));
        };
      };
      var initialParams = function(fn) {
        return function() {
          var args = slice(arguments);
          var callback = args.pop();
          fn.call(this, args, callback);
        };
      };
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      var hasSetImmediate = typeof setImmediate === "function" && setImmediate;
      var hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
      function fallback(fn) {
        setTimeout(fn, 0);
      }
      function wrap(defer) {
        return function(fn) {
          var args = slice(arguments, 1);
          defer(function() {
            fn.apply(null, args);
          });
        };
      }
      var _defer;
      if (hasSetImmediate) {
        _defer = setImmediate;
      } else if (hasNextTick) {
        _defer = process.nextTick;
      } else {
        _defer = fallback;
      }
      var setImmediate$1 = wrap(_defer);
      function asyncify(func) {
        return initialParams(function(args, callback) {
          var result;
          try {
            result = func.apply(this, args);
          } catch (e) {
            return callback(e);
          }
          if (isObject(result) && typeof result.then === "function") {
            result.then(function(value) {
              invokeCallback(callback, null, value);
            }, function(err) {
              invokeCallback(callback, err.message ? err : new Error(err));
            });
          } else {
            callback(null, result);
          }
        });
      }
      function invokeCallback(callback, error, value) {
        try {
          callback(error, value);
        } catch (e) {
          setImmediate$1(rethrow, e);
        }
      }
      function rethrow(error) {
        throw error;
      }
      var supportsSymbol = typeof Symbol === "function";
      function isAsync(fn) {
        return supportsSymbol && fn[Symbol.toStringTag] === "AsyncFunction";
      }
      function wrapAsync(asyncFn) {
        return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
      }
      function applyEach$1(eachfn) {
        return function(fns) {
          var args = slice(arguments, 1);
          var go = initialParams(function(args2, callback) {
            var that = this;
            return eachfn(fns, function(fn, cb) {
              wrapAsync(fn).apply(that, args2.concat(cb));
            }, callback);
          });
          if (args.length) {
            return go.apply(this, args);
          } else {
            return go;
          }
        };
      }
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var Symbol$1 = root.Symbol;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
        try {
          value[symToStringTag$1] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag$1] = tag;
          } else {
            delete value[symToStringTag$1];
          }
        }
        return result;
      }
      var objectProto$1 = Object.prototype;
      var nativeObjectToString$1 = objectProto$1.toString;
      function objectToString(value) {
        return nativeObjectToString$1.call(value);
      }
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      var breakLoop = {};
      function noop() {
      }
      function once(fn) {
        return function() {
          if (fn === null)
            return;
          var callFn = fn;
          fn = null;
          callFn.apply(this, arguments);
        };
      }
      var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator;
      var getIterator = function(coll) {
        return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
      };
      function baseTimes(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var argsTag = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      var objectProto$3 = Object.prototype;
      var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
      var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
      var isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array.isArray;
      function stubFalse() {
        return false;
      }
      var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      var MAX_SAFE_INTEGER$1 = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER$1 : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      var argsTag$1 = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag$1 = "[object Function]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      var freeExports$1 = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
      var freeModule$1 = freeExports$1 && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
      var freeProcess = moduleExports$1 && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      var objectProto$2 = Object.prototype;
      var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      var objectProto$5 = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
        return value === proto;
      }
      function overArg(func, transform2) {
        return function(arg) {
          return func(transform2(arg));
        };
      }
      var nativeKeys = overArg(Object.keys, Object);
      var objectProto$4 = Object.prototype;
      var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty$3.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function createArrayIterator(coll) {
        var i = -1;
        var len = coll.length;
        return function next() {
          return ++i < len ? { value: coll[i], key: i } : null;
        };
      }
      function createES2015Iterator(iterator2) {
        var i = -1;
        return function next() {
          var item = iterator2.next();
          if (item.done)
            return null;
          i++;
          return { value: item.value, key: i };
        };
      }
      function createObjectIterator(obj) {
        var okeys = keys(obj);
        var i = -1;
        var len = okeys.length;
        return function next() {
          var key = okeys[++i];
          if (key === "__proto__") {
            return next();
          }
          return i < len ? { value: obj[key], key } : null;
        };
      }
      function iterator(coll) {
        if (isArrayLike(coll)) {
          return createArrayIterator(coll);
        }
        var iterator2 = getIterator(coll);
        return iterator2 ? createES2015Iterator(iterator2) : createObjectIterator(coll);
      }
      function onlyOnce(fn) {
        return function() {
          if (fn === null)
            throw new Error("Callback was already called.");
          var callFn = fn;
          fn = null;
          callFn.apply(this, arguments);
        };
      }
      function _eachOfLimit(limit) {
        return function(obj, iteratee, callback) {
          callback = once(callback || noop);
          if (limit <= 0 || !obj) {
            return callback(null);
          }
          var nextElem = iterator(obj);
          var done = false;
          var running = 0;
          var looping = false;
          function iterateeCallback(err, value) {
            running -= 1;
            if (err) {
              done = true;
              callback(err);
            } else if (value === breakLoop || done && running <= 0) {
              done = true;
              return callback(null);
            } else if (!looping) {
              replenish();
            }
          }
          function replenish() {
            looping = true;
            while (running < limit && !done) {
              var elem = nextElem();
              if (elem === null) {
                done = true;
                if (running <= 0) {
                  callback(null);
                }
                return;
              }
              running += 1;
              iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
          }
          replenish();
        };
      }
      function eachOfLimit(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
      }
      function doLimit(fn, limit) {
        return function(iterable, iteratee, callback) {
          return fn(iterable, limit, iteratee, callback);
        };
      }
      function eachOfArrayLike(coll, iteratee, callback) {
        callback = once(callback || noop);
        var index2 = 0, completed = 0, length = coll.length;
        if (length === 0) {
          callback(null);
        }
        function iteratorCallback(err, value) {
          if (err) {
            callback(err);
          } else if (++completed === length || value === breakLoop) {
            callback(null);
          }
        }
        for (; index2 < length; index2++) {
          iteratee(coll[index2], index2, onlyOnce(iteratorCallback));
        }
      }
      var eachOfGeneric = doLimit(eachOfLimit, Infinity);
      var eachOf = function(coll, iteratee, callback) {
        var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
        eachOfImplementation(coll, wrapAsync(iteratee), callback);
      };
      function doParallel(fn) {
        return function(obj, iteratee, callback) {
          return fn(eachOf, obj, wrapAsync(iteratee), callback);
        };
      }
      function _asyncMap(eachfn, arr, iteratee, callback) {
        callback = callback || noop;
        arr = arr || [];
        var results = [];
        var counter = 0;
        var _iteratee = wrapAsync(iteratee);
        eachfn(arr, function(value, _, callback2) {
          var index2 = counter++;
          _iteratee(value, function(err, v) {
            results[index2] = v;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
      var map = doParallel(_asyncMap);
      var applyEach = applyEach$1(map);
      function doParallelLimit(fn) {
        return function(obj, limit, iteratee, callback) {
          return fn(_eachOfLimit(limit), obj, wrapAsync(iteratee), callback);
        };
      }
      var mapLimit = doParallelLimit(_asyncMap);
      var mapSeries = doLimit(mapLimit, 1);
      var applyEachSeries = applyEach$1(mapSeries);
      function arrayEach(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (iteratee(array[index2], index2, array) === false) {
            break;
          }
        }
        return array;
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index2];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      var baseFor = createBaseFor();
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index2-- : ++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var auto = function(tasks, concurrency, callback) {
        if (typeof concurrency === "function") {
          callback = concurrency;
          concurrency = null;
        }
        callback = once(callback || noop);
        var keys$$1 = keys(tasks);
        var numTasks = keys$$1.length;
        if (!numTasks) {
          return callback(null);
        }
        if (!concurrency) {
          concurrency = numTasks;
        }
        var results = {};
        var runningTasks = 0;
        var hasError = false;
        var listeners = /* @__PURE__ */ Object.create(null);
        var readyTasks = [];
        var readyToCheck = [];
        var uncheckedDependencies = {};
        baseForOwn(tasks, function(task, key) {
          if (!isArray(task)) {
            enqueueTask(key, [task]);
            readyToCheck.push(key);
            return;
          }
          var dependencies = task.slice(0, task.length - 1);
          var remainingDependencies = dependencies.length;
          if (remainingDependencies === 0) {
            enqueueTask(key, task);
            readyToCheck.push(key);
            return;
          }
          uncheckedDependencies[key] = remainingDependencies;
          arrayEach(dependencies, function(dependencyName) {
            if (!tasks[dependencyName]) {
              throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
            }
            addListener(dependencyName, function() {
              remainingDependencies--;
              if (remainingDependencies === 0) {
                enqueueTask(key, task);
              }
            });
          });
        });
        checkForDeadlocks();
        processQueue();
        function enqueueTask(key, task) {
          readyTasks.push(function() {
            runTask(key, task);
          });
        }
        function processQueue() {
          if (readyTasks.length === 0 && runningTasks === 0) {
            return callback(null, results);
          }
          while (readyTasks.length && runningTasks < concurrency) {
            var run = readyTasks.shift();
            run();
          }
        }
        function addListener(taskName, fn) {
          var taskListeners = listeners[taskName];
          if (!taskListeners) {
            taskListeners = listeners[taskName] = [];
          }
          taskListeners.push(fn);
        }
        function taskComplete(taskName) {
          var taskListeners = listeners[taskName] || [];
          arrayEach(taskListeners, function(fn) {
            fn();
          });
          processQueue();
        }
        function runTask(key, task) {
          if (hasError)
            return;
          var taskCallback = onlyOnce(function(err, result) {
            runningTasks--;
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            }
            if (err) {
              var safeResults = {};
              baseForOwn(results, function(val, rkey) {
                safeResults[rkey] = val;
              });
              safeResults[key] = result;
              hasError = true;
              listeners = /* @__PURE__ */ Object.create(null);
              callback(err, safeResults);
            } else {
              results[key] = result;
              taskComplete(key);
            }
          });
          runningTasks++;
          var taskFn = wrapAsync(task[task.length - 1]);
          if (task.length > 1) {
            taskFn(results, taskCallback);
          } else {
            taskFn(taskCallback);
          }
        }
        function checkForDeadlocks() {
          var currentTask;
          var counter = 0;
          while (readyToCheck.length) {
            currentTask = readyToCheck.pop();
            counter++;
            arrayEach(getDependents(currentTask), function(dependent) {
              if (--uncheckedDependencies[dependent] === 0) {
                readyToCheck.push(dependent);
              }
            });
          }
          if (counter !== numTasks) {
            throw new Error(
              "async.auto cannot execute tasks due to a recursive dependency"
            );
          }
        }
        function getDependents(taskName) {
          var result = [];
          baseForOwn(tasks, function(task, key) {
            if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
              result.push(key);
            }
          });
          return result;
        }
      };
      function arrayMap(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var INFINITY = 1 / 0;
      var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function baseSlice(array, start, end) {
        var index2 = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index2 < length) {
          result[index2] = array[index2 + start];
        }
        return result;
      }
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === void 0 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index2 = strSymbols.length;
        while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index2 = -1, length = strSymbols.length;
        while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function asciiToArray(string) {
        return string.split("");
      }
      var rsAstralRange = "\\ud800-\\udfff";
      var rsComboMarksRange = "\\u0300-\\u036f";
      var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
      var rsComboSymbolsRange = "\\u20d0-\\u20ff";
      var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
      var rsVarRange = "\\ufe0e\\ufe0f";
      var rsZWJ = "\\u200d";
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      var rsAstralRange$1 = "\\ud800-\\udfff";
      var rsComboMarksRange$1 = "\\u0300-\\u036f";
      var reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f";
      var rsComboSymbolsRange$1 = "\\u20d0-\\u20ff";
      var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
      var rsVarRange$1 = "\\ufe0e\\ufe0f";
      var rsAstral = "[" + rsAstralRange$1 + "]";
      var rsCombo = "[" + rsComboRange$1 + "]";
      var rsFitz = "\\ud83c[\\udffb-\\udfff]";
      var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
      var rsNonAstral = "[^" + rsAstralRange$1 + "]";
      var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
      var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
      var rsZWJ$1 = "\\u200d";
      var reOptMod = rsModifier + "?";
      var rsOptVar = "[" + rsVarRange$1 + "]?";
      var rsOptJoin = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
      var rsSeq = rsOptVar + reOptMod + rsOptJoin;
      var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var reTrim = /^\s+|\s+$/g;
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === void 0)) {
          return string.replace(reTrim, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      var FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
      var FN_ARG_SPLIT = /,/;
      var FN_ARG = /(=.+)?(\s*)$/;
      var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
      function parseParams(func) {
        func = func.toString().replace(STRIP_COMMENTS, "");
        func = func.match(FN_ARGS)[2].replace(" ", "");
        func = func ? func.split(FN_ARG_SPLIT) : [];
        func = func.map(function(arg) {
          return trim(arg.replace(FN_ARG, ""));
        });
        return func;
      }
      function autoInject(tasks, callback) {
        var newTasks = {};
        baseForOwn(tasks, function(taskFn, key) {
          var params;
          var fnIsAsync = isAsync(taskFn);
          var hasNoDeps = !fnIsAsync && taskFn.length === 1 || fnIsAsync && taskFn.length === 0;
          if (isArray(taskFn)) {
            params = taskFn.slice(0, -1);
            taskFn = taskFn[taskFn.length - 1];
            newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
          } else if (hasNoDeps) {
            newTasks[key] = taskFn;
          } else {
            params = parseParams(taskFn);
            if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
              throw new Error("autoInject task functions require explicit parameters.");
            }
            if (!fnIsAsync)
              params.pop();
            newTasks[key] = params.concat(newTask);
          }
          function newTask(results, taskCb) {
            var newArgs = arrayMap(params, function(name) {
              return results[name];
            });
            newArgs.push(taskCb);
            wrapAsync(taskFn).apply(null, newArgs);
          }
        });
        auto(newTasks, callback);
      }
      function DLL() {
        this.head = this.tail = null;
        this.length = 0;
      }
      function setInitial(dll, node) {
        dll.length = 1;
        dll.head = dll.tail = node;
      }
      DLL.prototype.removeLink = function(node) {
        if (node.prev)
          node.prev.next = node.next;
        else
          this.head = node.next;
        if (node.next)
          node.next.prev = node.prev;
        else
          this.tail = node.prev;
        node.prev = node.next = null;
        this.length -= 1;
        return node;
      };
      DLL.prototype.empty = function() {
        while (this.head)
          this.shift();
        return this;
      };
      DLL.prototype.insertAfter = function(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next)
          node.next.prev = newNode;
        else
          this.tail = newNode;
        node.next = newNode;
        this.length += 1;
      };
      DLL.prototype.insertBefore = function(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev)
          node.prev.next = newNode;
        else
          this.head = newNode;
        node.prev = newNode;
        this.length += 1;
      };
      DLL.prototype.unshift = function(node) {
        if (this.head)
          this.insertBefore(this.head, node);
        else
          setInitial(this, node);
      };
      DLL.prototype.push = function(node) {
        if (this.tail)
          this.insertAfter(this.tail, node);
        else
          setInitial(this, node);
      };
      DLL.prototype.shift = function() {
        return this.head && this.removeLink(this.head);
      };
      DLL.prototype.pop = function() {
        return this.tail && this.removeLink(this.tail);
      };
      DLL.prototype.toArray = function() {
        var arr = Array(this.length);
        var curr = this.head;
        for (var idx = 0; idx < this.length; idx++) {
          arr[idx] = curr.data;
          curr = curr.next;
        }
        return arr;
      };
      DLL.prototype.remove = function(testFn) {
        var curr = this.head;
        while (!!curr) {
          var next = curr.next;
          if (testFn(curr)) {
            this.removeLink(curr);
          }
          curr = next;
        }
        return this;
      };
      function queue(worker, concurrency, payload) {
        if (concurrency == null) {
          concurrency = 1;
        } else if (concurrency === 0) {
          throw new Error("Concurrency must not be zero");
        }
        var _worker = wrapAsync(worker);
        var numRunning = 0;
        var workersList = [];
        var processingScheduled = false;
        function _insert(data, insertAtFront, callback) {
          if (callback != null && typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!isArray(data)) {
            data = [data];
          }
          if (data.length === 0 && q.idle()) {
            return setImmediate$1(function() {
              q.drain();
            });
          }
          for (var i = 0, l = data.length; i < l; i++) {
            var item = {
              data: data[i],
              callback: callback || noop
            };
            if (insertAtFront) {
              q._tasks.unshift(item);
            } else {
              q._tasks.push(item);
            }
          }
          if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(function() {
              processingScheduled = false;
              q.process();
            });
          }
        }
        function _next(tasks) {
          return function(err) {
            numRunning -= 1;
            for (var i = 0, l = tasks.length; i < l; i++) {
              var task = tasks[i];
              var index2 = baseIndexOf(workersList, task, 0);
              if (index2 === 0) {
                workersList.shift();
              } else if (index2 > 0) {
                workersList.splice(index2, 1);
              }
              task.callback.apply(task, arguments);
              if (err != null) {
                q.error(err, task.data);
              }
            }
            if (numRunning <= q.concurrency - q.buffer) {
              q.unsaturated();
            }
            if (q.idle()) {
              q.drain();
            }
            q.process();
          };
        }
        var isProcessing = false;
        var q = {
          _tasks: new DLL(),
          concurrency,
          payload,
          saturated: noop,
          unsaturated: noop,
          buffer: concurrency / 4,
          empty: noop,
          drain: noop,
          error: noop,
          started: false,
          paused: false,
          push: function(data, callback) {
            _insert(data, false, callback);
          },
          kill: function() {
            q.drain = noop;
            q._tasks.empty();
          },
          unshift: function(data, callback) {
            _insert(data, true, callback);
          },
          remove: function(testFn) {
            q._tasks.remove(testFn);
          },
          process: function() {
            if (isProcessing) {
              return;
            }
            isProcessing = true;
            while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
              var tasks = [], data = [];
              var l = q._tasks.length;
              if (q.payload)
                l = Math.min(l, q.payload);
              for (var i = 0; i < l; i++) {
                var node = q._tasks.shift();
                tasks.push(node);
                workersList.push(node);
                data.push(node.data);
              }
              numRunning += 1;
              if (q._tasks.length === 0) {
                q.empty();
              }
              if (numRunning === q.concurrency) {
                q.saturated();
              }
              var cb = onlyOnce(_next(tasks));
              _worker(data, cb);
            }
            isProcessing = false;
          },
          length: function() {
            return q._tasks.length;
          },
          running: function() {
            return numRunning;
          },
          workersList: function() {
            return workersList;
          },
          idle: function() {
            return q._tasks.length + numRunning === 0;
          },
          pause: function() {
            q.paused = true;
          },
          resume: function() {
            if (q.paused === false) {
              return;
            }
            q.paused = false;
            setImmediate$1(q.process);
          }
        };
        return q;
      }
      function cargo(worker, payload) {
        return queue(worker, 1, payload);
      }
      var eachOfSeries = doLimit(eachOfLimit, 1);
      function reduce(coll, memo, iteratee, callback) {
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        eachOfSeries(coll, function(x, i, callback2) {
          _iteratee(memo, x, function(err, v) {
            memo = v;
            callback2(err);
          });
        }, function(err) {
          callback(err, memo);
        });
      }
      function seq() {
        var _functions = arrayMap(arguments, wrapAsync);
        return function() {
          var args = slice(arguments);
          var that = this;
          var cb = args[args.length - 1];
          if (typeof cb == "function") {
            args.pop();
          } else {
            cb = noop;
          }
          reduce(
            _functions,
            args,
            function(newargs, fn, cb2) {
              fn.apply(that, newargs.concat(function(err) {
                var nextargs = slice(arguments, 1);
                cb2(err, nextargs);
              }));
            },
            function(err, results) {
              cb.apply(that, [err].concat(results));
            }
          );
        };
      }
      var compose = function() {
        return seq.apply(null, slice(arguments).reverse());
      };
      var _concat = Array.prototype.concat;
      var concatLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback2) {
          _iteratee(val, function(err) {
            if (err)
              return callback2(err);
            return callback2(null, slice(arguments, 1));
          });
        }, function(err, mapResults) {
          var result = [];
          for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
              result = _concat.apply(result, mapResults[i]);
            }
          }
          return callback(err, result);
        });
      };
      var concat = doLimit(concatLimit, Infinity);
      var concatSeries = doLimit(concatLimit, 1);
      var constant = function() {
        var values = slice(arguments);
        var args = [null].concat(values);
        return function() {
          var callback = arguments[arguments.length - 1];
          return callback.apply(this, args);
        };
      };
      function identity(value) {
        return value;
      }
      function _createTester(check, getResult) {
        return function(eachfn, arr, iteratee, cb) {
          cb = cb || noop;
          var testPassed = false;
          var testResult;
          eachfn(arr, function(value, _, callback) {
            iteratee(value, function(err, result) {
              if (err) {
                callback(err);
              } else if (check(result) && !testResult) {
                testPassed = true;
                testResult = getResult(true, value);
                callback(null, breakLoop);
              } else {
                callback();
              }
            });
          }, function(err) {
            if (err) {
              cb(err);
            } else {
              cb(null, testPassed ? testResult : getResult(false));
            }
          });
        };
      }
      function _findGetResult(v, x) {
        return x;
      }
      var detect = doParallel(_createTester(identity, _findGetResult));
      var detectLimit = doParallelLimit(_createTester(identity, _findGetResult));
      var detectSeries = doLimit(detectLimit, 1);
      function consoleFunc(name) {
        return function(fn) {
          var args = slice(arguments, 1);
          args.push(function(err) {
            var args2 = slice(arguments, 1);
            if (typeof console === "object") {
              if (err) {
                if (console.error) {
                  console.error(err);
                }
              } else if (console[name]) {
                arrayEach(args2, function(x) {
                  console[name](x);
                });
              }
            }
          });
          wrapAsync(fn).apply(null, args);
        };
      }
      var dir = consoleFunc("dir");
      function doDuring(fn, test, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn);
        var _test = wrapAsync(test);
        function next(err) {
          if (err)
            return callback(err);
          var args = slice(arguments, 1);
          args.push(check);
          _test.apply(this, args);
        }
        function check(err, truth) {
          if (err)
            return callback(err);
          if (!truth)
            return callback(null);
          _fn(next);
        }
        check(null, true);
      }
      function doWhilst(iteratee, test, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        var next = function(err) {
          if (err)
            return callback(err);
          var args = slice(arguments, 1);
          if (test.apply(this, args))
            return _iteratee(next);
          callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
      }
      function doUntil(iteratee, test, callback) {
        doWhilst(iteratee, function() {
          return !test.apply(this, arguments);
        }, callback);
      }
      function during(test, fn, callback) {
        callback = onlyOnce(callback || noop);
        var _fn = wrapAsync(fn);
        var _test = wrapAsync(test);
        function next(err) {
          if (err)
            return callback(err);
          _test(check);
        }
        function check(err, truth) {
          if (err)
            return callback(err);
          if (!truth)
            return callback(null);
          _fn(next);
        }
        _test(check);
      }
      function _withoutIndex(iteratee) {
        return function(value, index2, callback) {
          return iteratee(value, callback);
        };
      }
      function eachLimit(coll, iteratee, callback) {
        eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      function eachLimit$1(coll, limit, iteratee, callback) {
        _eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
      }
      var eachSeries = doLimit(eachLimit$1, 1);
      function ensureAsync(fn) {
        if (isAsync(fn))
          return fn;
        return initialParams(function(args, callback) {
          var sync = true;
          args.push(function() {
            var innerArgs = arguments;
            if (sync) {
              setImmediate$1(function() {
                callback.apply(null, innerArgs);
              });
            } else {
              callback.apply(null, innerArgs);
            }
          });
          fn.apply(this, args);
          sync = false;
        });
      }
      function notId(v) {
        return !v;
      }
      var every = doParallel(_createTester(notId, notId));
      var everyLimit = doParallelLimit(_createTester(notId, notId));
      var everySeries = doLimit(everyLimit, 1);
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      function filterArray(eachfn, arr, iteratee, callback) {
        var truthValues = new Array(arr.length);
        eachfn(arr, function(x, index2, callback2) {
          iteratee(x, function(err, v) {
            truthValues[index2] = !!v;
            callback2(err);
          });
        }, function(err) {
          if (err)
            return callback(err);
          var results = [];
          for (var i = 0; i < arr.length; i++) {
            if (truthValues[i])
              results.push(arr[i]);
          }
          callback(null, results);
        });
      }
      function filterGeneric(eachfn, coll, iteratee, callback) {
        var results = [];
        eachfn(coll, function(x, index2, callback2) {
          iteratee(x, function(err, v) {
            if (err) {
              callback2(err);
            } else {
              if (v) {
                results.push({ index: index2, value: x });
              }
              callback2();
            }
          });
        }, function(err) {
          if (err) {
            callback(err);
          } else {
            callback(null, arrayMap(results.sort(function(a, b) {
              return a.index - b.index;
            }), baseProperty("value")));
          }
        });
      }
      function _filter(eachfn, coll, iteratee, callback) {
        var filter2 = isArrayLike(coll) ? filterArray : filterGeneric;
        filter2(eachfn, coll, wrapAsync(iteratee), callback || noop);
      }
      var filter = doParallel(_filter);
      var filterLimit = doParallelLimit(_filter);
      var filterSeries = doLimit(filterLimit, 1);
      function forever(fn, errback) {
        var done = onlyOnce(errback || noop);
        var task = wrapAsync(ensureAsync(fn));
        function next(err) {
          if (err)
            return done(err);
          task(next);
        }
        next();
      }
      var groupByLimit = function(coll, limit, iteratee, callback) {
        callback = callback || noop;
        var _iteratee = wrapAsync(iteratee);
        mapLimit(coll, limit, function(val, callback2) {
          _iteratee(val, function(err, key) {
            if (err)
              return callback2(err);
            return callback2(null, { key, val });
          });
        }, function(err, mapResults) {
          var result = {};
          var hasOwnProperty2 = Object.prototype.hasOwnProperty;
          for (var i = 0; i < mapResults.length; i++) {
            if (mapResults[i]) {
              var key = mapResults[i].key;
              var val = mapResults[i].val;
              if (hasOwnProperty2.call(result, key)) {
                result[key].push(val);
              } else {
                result[key] = [val];
              }
            }
          }
          return callback(err, result);
        });
      };
      var groupBy = doLimit(groupByLimit, Infinity);
      var groupBySeries = doLimit(groupByLimit, 1);
      var log = consoleFunc("log");
      function mapValuesLimit(obj, limit, iteratee, callback) {
        callback = once(callback || noop);
        var newObj = {};
        var _iteratee = wrapAsync(iteratee);
        eachOfLimit(obj, limit, function(val, key, next) {
          _iteratee(val, key, function(err, result) {
            if (err)
              return next(err);
            newObj[key] = result;
            next();
          });
        }, function(err) {
          callback(err, newObj);
        });
      }
      var mapValues = doLimit(mapValuesLimit, Infinity);
      var mapValuesSeries = doLimit(mapValuesLimit, 1);
      function has(obj, key) {
        return key in obj;
      }
      function memoize(fn, hasher) {
        var memo = /* @__PURE__ */ Object.create(null);
        var queues = /* @__PURE__ */ Object.create(null);
        hasher = hasher || identity;
        var _fn = wrapAsync(fn);
        var memoized = initialParams(function memoized2(args, callback) {
          var key = hasher.apply(null, args);
          if (has(memo, key)) {
            setImmediate$1(function() {
              callback.apply(null, memo[key]);
            });
          } else if (has(queues, key)) {
            queues[key].push(callback);
          } else {
            queues[key] = [callback];
            _fn.apply(null, args.concat(function() {
              var args2 = slice(arguments);
              memo[key] = args2;
              var q = queues[key];
              delete queues[key];
              for (var i = 0, l = q.length; i < l; i++) {
                q[i].apply(null, args2);
              }
            }));
          }
        });
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
      }
      var _defer$1;
      if (hasNextTick) {
        _defer$1 = process.nextTick;
      } else if (hasSetImmediate) {
        _defer$1 = setImmediate;
      } else {
        _defer$1 = fallback;
      }
      var nextTick = wrap(_defer$1);
      function _parallel(eachfn, tasks, callback) {
        callback = callback || noop;
        var results = isArrayLike(tasks) ? [] : {};
        eachfn(tasks, function(task, key, callback2) {
          wrapAsync(task)(function(err, result) {
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            }
            results[key] = result;
            callback2(err);
          });
        }, function(err) {
          callback(err, results);
        });
      }
      function parallelLimit(tasks, callback) {
        _parallel(eachOf, tasks, callback);
      }
      function parallelLimit$1(tasks, limit, callback) {
        _parallel(_eachOfLimit(limit), tasks, callback);
      }
      var queue$1 = function(worker, concurrency) {
        var _worker = wrapAsync(worker);
        return queue(function(items, cb) {
          _worker(items[0], cb);
        }, concurrency, 1);
      };
      var priorityQueue = function(worker, concurrency) {
        var q = queue$1(worker, concurrency);
        q.push = function(data, priority, callback) {
          if (callback == null)
            callback = noop;
          if (typeof callback !== "function") {
            throw new Error("task callback must be a function");
          }
          q.started = true;
          if (!isArray(data)) {
            data = [data];
          }
          if (data.length === 0) {
            return setImmediate$1(function() {
              q.drain();
            });
          }
          priority = priority || 0;
          var nextNode = q._tasks.head;
          while (nextNode && priority >= nextNode.priority) {
            nextNode = nextNode.next;
          }
          for (var i = 0, l = data.length; i < l; i++) {
            var item = {
              data: data[i],
              priority,
              callback
            };
            if (nextNode) {
              q._tasks.insertBefore(nextNode, item);
            } else {
              q._tasks.push(item);
            }
          }
          setImmediate$1(q.process);
        };
        delete q.unshift;
        return q;
      };
      function race(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks))
          return callback(new TypeError("First argument to race must be an array of functions"));
        if (!tasks.length)
          return callback();
        for (var i = 0, l = tasks.length; i < l; i++) {
          wrapAsync(tasks[i])(callback);
        }
      }
      function reduceRight(array, memo, iteratee, callback) {
        var reversed = slice(array).reverse();
        reduce(reversed, memo, iteratee, callback);
      }
      function reflect(fn) {
        var _fn = wrapAsync(fn);
        return initialParams(function reflectOn(args, reflectCallback) {
          args.push(function callback(error, cbArg) {
            if (error) {
              reflectCallback(null, { error });
            } else {
              var value;
              if (arguments.length <= 2) {
                value = cbArg;
              } else {
                value = slice(arguments, 1);
              }
              reflectCallback(null, { value });
            }
          });
          return _fn.apply(this, args);
        });
      }
      function reflectAll(tasks) {
        var results;
        if (isArray(tasks)) {
          results = arrayMap(tasks, reflect);
        } else {
          results = {};
          baseForOwn(tasks, function(task, key) {
            results[key] = reflect.call(this, task);
          });
        }
        return results;
      }
      function reject$1(eachfn, arr, iteratee, callback) {
        _filter(eachfn, arr, function(value, cb) {
          iteratee(value, function(err, v) {
            cb(err, !v);
          });
        }, callback);
      }
      var reject = doParallel(reject$1);
      var rejectLimit = doParallelLimit(reject$1);
      var rejectSeries = doLimit(rejectLimit, 1);
      function constant$1(value) {
        return function() {
          return value;
        };
      }
      function retry(opts, task, callback) {
        var DEFAULT_TIMES = 5;
        var DEFAULT_INTERVAL = 0;
        var options = {
          times: DEFAULT_TIMES,
          intervalFunc: constant$1(DEFAULT_INTERVAL)
        };
        function parseTimes(acc, t) {
          if (typeof t === "object") {
            acc.times = +t.times || DEFAULT_TIMES;
            acc.intervalFunc = typeof t.interval === "function" ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
            acc.errorFilter = t.errorFilter;
          } else if (typeof t === "number" || typeof t === "string") {
            acc.times = +t || DEFAULT_TIMES;
          } else {
            throw new Error("Invalid arguments for async.retry");
          }
        }
        if (arguments.length < 3 && typeof opts === "function") {
          callback = task || noop;
          task = opts;
        } else {
          parseTimes(options, opts);
          callback = callback || noop;
        }
        if (typeof task !== "function") {
          throw new Error("Invalid arguments for async.retry");
        }
        var _task = wrapAsync(task);
        var attempt = 1;
        function retryAttempt() {
          _task(function(err) {
            if (err && attempt++ < options.times && (typeof options.errorFilter != "function" || options.errorFilter(err))) {
              setTimeout(retryAttempt, options.intervalFunc(attempt));
            } else {
              callback.apply(null, arguments);
            }
          });
        }
        retryAttempt();
      }
      var retryable = function(opts, task) {
        if (!task) {
          task = opts;
          opts = null;
        }
        var _task = wrapAsync(task);
        return initialParams(function(args, callback) {
          function taskFn(cb) {
            _task.apply(null, args.concat(cb));
          }
          if (opts)
            retry(opts, taskFn, callback);
          else
            retry(taskFn, callback);
        });
      };
      function series(tasks, callback) {
        _parallel(eachOfSeries, tasks, callback);
      }
      var some = doParallel(_createTester(Boolean, identity));
      var someLimit = doParallelLimit(_createTester(Boolean, identity));
      var someSeries = doLimit(someLimit, 1);
      function sortBy(coll, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        map(coll, function(x, callback2) {
          _iteratee(x, function(err, criteria) {
            if (err)
              return callback2(err);
            callback2(null, { value: x, criteria });
          });
        }, function(err, results) {
          if (err)
            return callback(err);
          callback(null, arrayMap(results.sort(comparator), baseProperty("value")));
        });
        function comparator(left, right) {
          var a = left.criteria, b = right.criteria;
          return a < b ? -1 : a > b ? 1 : 0;
        }
      }
      function timeout(asyncFn, milliseconds, info) {
        var fn = wrapAsync(asyncFn);
        return initialParams(function(args, callback) {
          var timedOut = false;
          var timer;
          function timeoutCallback() {
            var name = asyncFn.name || "anonymous";
            var error = new Error('Callback function "' + name + '" timed out.');
            error.code = "ETIMEDOUT";
            if (info) {
              error.info = info;
            }
            timedOut = true;
            callback(error);
          }
          args.push(function() {
            if (!timedOut) {
              callback.apply(null, arguments);
              clearTimeout(timer);
            }
          });
          timer = setTimeout(timeoutCallback, milliseconds);
          fn.apply(null, args);
        });
      }
      var nativeCeil = Math.ceil;
      var nativeMax = Math.max;
      function baseRange(start, end, step, fromRight) {
        var index2 = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
        while (length--) {
          result[fromRight ? length : ++index2] = start;
          start += step;
        }
        return result;
      }
      function timeLimit(count, limit, iteratee, callback) {
        var _iteratee = wrapAsync(iteratee);
        mapLimit(baseRange(0, count, 1), limit, _iteratee, callback);
      }
      var times = doLimit(timeLimit, Infinity);
      var timesSeries = doLimit(timeLimit, 1);
      function transform(coll, accumulator, iteratee, callback) {
        if (arguments.length <= 3) {
          callback = iteratee;
          iteratee = accumulator;
          accumulator = isArray(coll) ? [] : {};
        }
        callback = once(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        eachOf(coll, function(v, k, cb) {
          _iteratee(accumulator, v, k, cb);
        }, function(err) {
          callback(err, accumulator);
        });
      }
      function tryEach(tasks, callback) {
        var error = null;
        var result;
        callback = callback || noop;
        eachSeries(tasks, function(task, callback2) {
          wrapAsync(task)(function(err, res) {
            if (arguments.length > 2) {
              result = slice(arguments, 1);
            } else {
              result = res;
            }
            error = err;
            callback2(!err);
          });
        }, function() {
          callback(error, result);
        });
      }
      function unmemoize(fn) {
        return function() {
          return (fn.unmemoized || fn).apply(null, arguments);
        };
      }
      function whilst(test, iteratee, callback) {
        callback = onlyOnce(callback || noop);
        var _iteratee = wrapAsync(iteratee);
        if (!test())
          return callback(null);
        var next = function(err) {
          if (err)
            return callback(err);
          if (test())
            return _iteratee(next);
          var args = slice(arguments, 1);
          callback.apply(null, [null].concat(args));
        };
        _iteratee(next);
      }
      function until(test, iteratee, callback) {
        whilst(function() {
          return !test.apply(this, arguments);
        }, iteratee, callback);
      }
      var waterfall = function(tasks, callback) {
        callback = once(callback || noop);
        if (!isArray(tasks))
          return callback(new Error("First argument to waterfall must be an array of functions"));
        if (!tasks.length)
          return callback();
        var taskIndex = 0;
        function nextTask(args) {
          var task = wrapAsync(tasks[taskIndex++]);
          args.push(onlyOnce(next));
          task.apply(null, args);
        }
        function next(err) {
          if (err || taskIndex === tasks.length) {
            return callback.apply(null, arguments);
          }
          nextTask(slice(arguments, 1));
        }
        nextTask([]);
      };
      var index = {
        apply,
        applyEach,
        applyEachSeries,
        asyncify,
        auto,
        autoInject,
        cargo,
        compose,
        concat,
        concatLimit,
        concatSeries,
        constant,
        detect,
        detectLimit,
        detectSeries,
        dir,
        doDuring,
        doUntil,
        doWhilst,
        during,
        each: eachLimit,
        eachLimit: eachLimit$1,
        eachOf,
        eachOfLimit,
        eachOfSeries,
        eachSeries,
        ensureAsync,
        every,
        everyLimit,
        everySeries,
        filter,
        filterLimit,
        filterSeries,
        forever,
        groupBy,
        groupByLimit,
        groupBySeries,
        log,
        map,
        mapLimit,
        mapSeries,
        mapValues,
        mapValuesLimit,
        mapValuesSeries,
        memoize,
        nextTick,
        parallel: parallelLimit,
        parallelLimit: parallelLimit$1,
        priorityQueue,
        queue: queue$1,
        race,
        reduce,
        reduceRight,
        reflect,
        reflectAll,
        reject,
        rejectLimit,
        rejectSeries,
        retry,
        retryable,
        seq,
        series,
        setImmediate: setImmediate$1,
        some,
        someLimit,
        someSeries,
        sortBy,
        timeout,
        times,
        timesLimit: timeLimit,
        timesSeries,
        transform,
        tryEach,
        unmemoize,
        until,
        waterfall,
        whilst,
        // aliases
        all: every,
        allLimit: everyLimit,
        allSeries: everySeries,
        any: some,
        anyLimit: someLimit,
        anySeries: someSeries,
        find: detect,
        findLimit: detectLimit,
        findSeries: detectSeries,
        forEach: eachLimit,
        forEachSeries: eachSeries,
        forEachLimit: eachLimit$1,
        forEachOf: eachOf,
        forEachOfSeries: eachOfSeries,
        forEachOfLimit: eachOfLimit,
        inject: reduce,
        foldl: reduce,
        foldr: reduceRight,
        select: filter,
        selectLimit: filterLimit,
        selectSeries: filterSeries,
        wrapSync: asyncify
      };
      exports2["default"] = index;
      exports2.apply = apply;
      exports2.applyEach = applyEach;
      exports2.applyEachSeries = applyEachSeries;
      exports2.asyncify = asyncify;
      exports2.auto = auto;
      exports2.autoInject = autoInject;
      exports2.cargo = cargo;
      exports2.compose = compose;
      exports2.concat = concat;
      exports2.concatLimit = concatLimit;
      exports2.concatSeries = concatSeries;
      exports2.constant = constant;
      exports2.detect = detect;
      exports2.detectLimit = detectLimit;
      exports2.detectSeries = detectSeries;
      exports2.dir = dir;
      exports2.doDuring = doDuring;
      exports2.doUntil = doUntil;
      exports2.doWhilst = doWhilst;
      exports2.during = during;
      exports2.each = eachLimit;
      exports2.eachLimit = eachLimit$1;
      exports2.eachOf = eachOf;
      exports2.eachOfLimit = eachOfLimit;
      exports2.eachOfSeries = eachOfSeries;
      exports2.eachSeries = eachSeries;
      exports2.ensureAsync = ensureAsync;
      exports2.every = every;
      exports2.everyLimit = everyLimit;
      exports2.everySeries = everySeries;
      exports2.filter = filter;
      exports2.filterLimit = filterLimit;
      exports2.filterSeries = filterSeries;
      exports2.forever = forever;
      exports2.groupBy = groupBy;
      exports2.groupByLimit = groupByLimit;
      exports2.groupBySeries = groupBySeries;
      exports2.log = log;
      exports2.map = map;
      exports2.mapLimit = mapLimit;
      exports2.mapSeries = mapSeries;
      exports2.mapValues = mapValues;
      exports2.mapValuesLimit = mapValuesLimit;
      exports2.mapValuesSeries = mapValuesSeries;
      exports2.memoize = memoize;
      exports2.nextTick = nextTick;
      exports2.parallel = parallelLimit;
      exports2.parallelLimit = parallelLimit$1;
      exports2.priorityQueue = priorityQueue;
      exports2.queue = queue$1;
      exports2.race = race;
      exports2.reduce = reduce;
      exports2.reduceRight = reduceRight;
      exports2.reflect = reflect;
      exports2.reflectAll = reflectAll;
      exports2.reject = reject;
      exports2.rejectLimit = rejectLimit;
      exports2.rejectSeries = rejectSeries;
      exports2.retry = retry;
      exports2.retryable = retryable;
      exports2.seq = seq;
      exports2.series = series;
      exports2.setImmediate = setImmediate$1;
      exports2.some = some;
      exports2.someLimit = someLimit;
      exports2.someSeries = someSeries;
      exports2.sortBy = sortBy;
      exports2.timeout = timeout;
      exports2.times = times;
      exports2.timesLimit = timeLimit;
      exports2.timesSeries = timesSeries;
      exports2.transform = transform;
      exports2.tryEach = tryEach;
      exports2.unmemoize = unmemoize;
      exports2.until = until;
      exports2.waterfall = waterfall;
      exports2.whilst = whilst;
      exports2.all = every;
      exports2.allLimit = everyLimit;
      exports2.allSeries = everySeries;
      exports2.any = some;
      exports2.anyLimit = someLimit;
      exports2.anySeries = someSeries;
      exports2.find = detect;
      exports2.findLimit = detectLimit;
      exports2.findSeries = detectSeries;
      exports2.forEach = eachLimit;
      exports2.forEachSeries = eachSeries;
      exports2.forEachLimit = eachLimit$1;
      exports2.forEachOf = eachOf;
      exports2.forEachOfSeries = eachOfSeries;
      exports2.forEachOfLimit = eachOfLimit;
      exports2.inject = reduce;
      exports2.foldl = reduce;
      exports2.foldr = reduceRight;
      exports2.select = filter;
      exports2.selectLimit = filterLimit;
      exports2.selectSeries = filterSeries;
      exports2.wrapSync = asyncify;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/doublearray/doublearray.js
var require_doublearray = __commonJS({
  "node_modules/doublearray/doublearray.js"(exports, module2) {
    (function() {
      "use strict";
      var TERM_CHAR = "\0", TERM_CODE = 0, ROOT_ID = 0, NOT_FOUND = -1, BASE_SIGNED = true, CHECK_SIGNED = true, BASE_BYTES = 4, CHECK_BYTES = 4, MEMORY_EXPAND_RATIO = 2;
      var newBC = function(initial_size) {
        if (initial_size == null) {
          initial_size = 1024;
        }
        var initBase = function(_base, start, end) {
          for (var i = start; i < end; i++) {
            _base[i] = -i + 1;
          }
          if (0 < check.array[check.array.length - 1]) {
            var last_used_id = check.array.length - 2;
            while (0 < check.array[last_used_id]) {
              last_used_id--;
            }
            _base[start] = -last_used_id;
          }
        };
        var initCheck = function(_check, start, end) {
          for (var i = start; i < end; i++) {
            _check[i] = -i - 1;
          }
        };
        var realloc = function(min_size) {
          var new_size = min_size * MEMORY_EXPAND_RATIO;
          var base_new_array = newArrayBuffer(base.signed, base.bytes, new_size);
          initBase(base_new_array, base.array.length, new_size);
          base_new_array.set(base.array);
          base.array = null;
          base.array = base_new_array;
          var check_new_array = newArrayBuffer(check.signed, check.bytes, new_size);
          initCheck(check_new_array, check.array.length, new_size);
          check_new_array.set(check.array);
          check.array = null;
          check.array = check_new_array;
        };
        var first_unused_node = ROOT_ID + 1;
        var base = {
          signed: BASE_SIGNED,
          bytes: BASE_BYTES,
          array: newArrayBuffer(BASE_SIGNED, BASE_BYTES, initial_size)
        };
        var check = {
          signed: CHECK_SIGNED,
          bytes: CHECK_BYTES,
          array: newArrayBuffer(CHECK_SIGNED, CHECK_BYTES, initial_size)
        };
        base.array[ROOT_ID] = 1;
        check.array[ROOT_ID] = ROOT_ID;
        initBase(base.array, ROOT_ID + 1, base.array.length);
        initCheck(check.array, ROOT_ID + 1, check.array.length);
        return {
          getBaseBuffer: function() {
            return base.array;
          },
          getCheckBuffer: function() {
            return check.array;
          },
          loadBaseBuffer: function(base_buffer) {
            base.array = base_buffer;
            return this;
          },
          loadCheckBuffer: function(check_buffer) {
            check.array = check_buffer;
            return this;
          },
          size: function() {
            return Math.max(base.array.length, check.array.length);
          },
          getBase: function(index) {
            if (base.array.length - 1 < index) {
              return -index + 1;
            }
            return base.array[index];
          },
          getCheck: function(index) {
            if (check.array.length - 1 < index) {
              return -index - 1;
            }
            return check.array[index];
          },
          setBase: function(index, base_value) {
            if (base.array.length - 1 < index) {
              realloc(index);
            }
            base.array[index] = base_value;
          },
          setCheck: function(index, check_value) {
            if (check.array.length - 1 < index) {
              realloc(index);
            }
            check.array[index] = check_value;
          },
          setFirstUnusedNode: function(index) {
            first_unused_node = index;
          },
          getFirstUnusedNode: function() {
            return first_unused_node;
          },
          shrink: function() {
            var last_index = this.size() - 1;
            while (true) {
              if (0 <= check.array[last_index]) {
                break;
              }
              last_index--;
            }
            base.array = base.array.subarray(0, last_index + 2);
            check.array = check.array.subarray(0, last_index + 2);
          },
          calc: function() {
            var unused_count = 0;
            var size = check.array.length;
            for (var i = 0; i < size; i++) {
              if (check.array[i] < 0) {
                unused_count++;
              }
            }
            return {
              all: size,
              unused: unused_count,
              efficiency: (size - unused_count) / size
            };
          },
          dump: function() {
            var dump_base = "";
            var dump_check = "";
            var i;
            for (i = 0; i < base.array.length; i++) {
              dump_base = dump_base + " " + this.getBase(i);
            }
            for (i = 0; i < check.array.length; i++) {
              dump_check = dump_check + " " + this.getCheck(i);
            }
            console.log("base:" + dump_base);
            console.log("chck:" + dump_check);
            return "base:" + dump_base + " chck:" + dump_check;
          }
        };
      };
      function DoubleArrayBuilder(initial_size) {
        this.bc = newBC(initial_size);
        this.keys = [];
      }
      DoubleArrayBuilder.prototype.append = function(key, record) {
        this.keys.push({ k: key, v: record });
        return this;
      };
      DoubleArrayBuilder.prototype.build = function(keys, sorted) {
        if (keys == null) {
          keys = this.keys;
        }
        if (keys == null) {
          return new DoubleArray(this.bc);
        }
        if (sorted == null) {
          sorted = false;
        }
        var buff_keys = keys.map(function(k) {
          return {
            k: stringToUtf8Bytes(k.k + TERM_CHAR),
            v: k.v
          };
        });
        if (sorted) {
          this.keys = buff_keys;
        } else {
          this.keys = buff_keys.sort(function(k1, k2) {
            var b1 = k1.k;
            var b2 = k2.k;
            var min_length = Math.min(b1.length, b2.length);
            for (var pos = 0; pos < min_length; pos++) {
              if (b1[pos] === b2[pos]) {
                continue;
              }
              return b1[pos] - b2[pos];
            }
            return b1.length - b2.length;
          });
        }
        buff_keys = null;
        this._build(ROOT_ID, 0, 0, this.keys.length);
        return new DoubleArray(this.bc);
      };
      DoubleArrayBuilder.prototype._build = function(parent_index, position, start, length) {
        var children_info = this.getChildrenInfo(position, start, length);
        var _base = this.findAllocatableBase(children_info);
        this.setBC(parent_index, children_info, _base);
        for (var i = 0; i < children_info.length; i = i + 3) {
          var child_code = children_info[i];
          if (child_code === TERM_CODE) {
            continue;
          }
          var child_start = children_info[i + 1];
          var child_len = children_info[i + 2];
          var child_index = _base + child_code;
          this._build(child_index, position + 1, child_start, child_len);
        }
      };
      DoubleArrayBuilder.prototype.getChildrenInfo = function(position, start, length) {
        var current_char = this.keys[start].k[position];
        var i = 0;
        var children_info = new Int32Array(length * 3);
        children_info[i++] = current_char;
        children_info[i++] = start;
        var next_pos = start;
        var start_pos = start;
        for (; next_pos < start + length; next_pos++) {
          var next_char = this.keys[next_pos].k[position];
          if (current_char !== next_char) {
            children_info[i++] = next_pos - start_pos;
            children_info[i++] = next_char;
            children_info[i++] = next_pos;
            current_char = next_char;
            start_pos = next_pos;
          }
        }
        children_info[i++] = next_pos - start_pos;
        children_info = children_info.subarray(0, i);
        return children_info;
      };
      DoubleArrayBuilder.prototype.setBC = function(parent_id, children_info, _base) {
        var bc = this.bc;
        bc.setBase(parent_id, _base);
        var i;
        for (i = 0; i < children_info.length; i = i + 3) {
          var code = children_info[i];
          var child_id = _base + code;
          var prev_unused_id = -bc.getBase(child_id);
          var next_unused_id = -bc.getCheck(child_id);
          if (child_id !== bc.getFirstUnusedNode()) {
            bc.setCheck(prev_unused_id, -next_unused_id);
          } else {
            bc.setFirstUnusedNode(next_unused_id);
          }
          bc.setBase(next_unused_id, -prev_unused_id);
          var check = parent_id;
          bc.setCheck(child_id, check);
          if (code === TERM_CODE) {
            var start_pos = children_info[i + 1];
            var value = this.keys[start_pos].v;
            if (value == null) {
              value = 0;
            }
            var base = -value - 1;
            bc.setBase(child_id, base);
          }
        }
      };
      DoubleArrayBuilder.prototype.findAllocatableBase = function(children_info) {
        var bc = this.bc;
        var _base;
        var curr = bc.getFirstUnusedNode();
        while (true) {
          _base = curr - children_info[0];
          if (_base < 0) {
            curr = -bc.getCheck(curr);
            continue;
          }
          var empty_area_found = true;
          for (var i = 0; i < children_info.length; i = i + 3) {
            var code = children_info[i];
            var candidate_id = _base + code;
            if (!this.isUnusedNode(candidate_id)) {
              curr = -bc.getCheck(curr);
              empty_area_found = false;
              break;
            }
          }
          if (empty_area_found) {
            return _base;
          }
        }
      };
      DoubleArrayBuilder.prototype.isUnusedNode = function(index) {
        var bc = this.bc;
        var check = bc.getCheck(index);
        if (index === ROOT_ID) {
          return false;
        }
        if (check < 0) {
          return true;
        }
        return false;
      };
      function DoubleArray(bc) {
        this.bc = bc;
        this.bc.shrink();
      }
      DoubleArray.prototype.contain = function(key) {
        var bc = this.bc;
        key += TERM_CHAR;
        var buffer = stringToUtf8Bytes(key);
        var parent = ROOT_ID;
        var child = NOT_FOUND;
        for (var i = 0; i < buffer.length; i++) {
          var code = buffer[i];
          child = this.traverse(parent, code);
          if (child === NOT_FOUND) {
            return false;
          }
          if (bc.getBase(child) <= 0) {
            return true;
          } else {
            parent = child;
            continue;
          }
        }
        return false;
      };
      DoubleArray.prototype.lookup = function(key) {
        key += TERM_CHAR;
        var buffer = stringToUtf8Bytes(key);
        var parent = ROOT_ID;
        var child = NOT_FOUND;
        for (var i = 0; i < buffer.length; i++) {
          var code = buffer[i];
          child = this.traverse(parent, code);
          if (child === NOT_FOUND) {
            return NOT_FOUND;
          }
          parent = child;
        }
        var base = this.bc.getBase(child);
        if (base <= 0) {
          return -base - 1;
        } else {
          return NOT_FOUND;
        }
      };
      DoubleArray.prototype.commonPrefixSearch = function(key) {
        var buffer = stringToUtf8Bytes(key);
        var parent = ROOT_ID;
        var child = NOT_FOUND;
        var result = [];
        for (var i = 0; i < buffer.length; i++) {
          var code = buffer[i];
          child = this.traverse(parent, code);
          if (child !== NOT_FOUND) {
            parent = child;
            var grand_child = this.traverse(child, TERM_CODE);
            if (grand_child !== NOT_FOUND) {
              var base = this.bc.getBase(grand_child);
              var r = {};
              if (base <= 0) {
                r.v = -base - 1;
              }
              r.k = utf8BytesToString(arrayCopy(buffer, 0, i + 1));
              result.push(r);
            }
            continue;
          } else {
            break;
          }
        }
        return result;
      };
      DoubleArray.prototype.traverse = function(parent, code) {
        var child = this.bc.getBase(parent) + code;
        if (this.bc.getCheck(child) === parent) {
          return child;
        } else {
          return NOT_FOUND;
        }
      };
      DoubleArray.prototype.size = function() {
        return this.bc.size();
      };
      DoubleArray.prototype.calc = function() {
        return this.bc.calc();
      };
      DoubleArray.prototype.dump = function() {
        return this.bc.dump();
      };
      var newArrayBuffer = function(signed, bytes, size) {
        if (signed) {
          switch (bytes) {
            case 1:
              return new Int8Array(size);
            case 2:
              return new Int16Array(size);
            case 4:
              return new Int32Array(size);
            default:
              throw new RangeError("Invalid newArray parameter element_bytes:" + bytes);
          }
        } else {
          switch (bytes) {
            case 1:
              return new Uint8Array(size);
            case 2:
              return new Uint16Array(size);
            case 4:
              return new Uint32Array(size);
            default:
              throw new RangeError("Invalid newArray parameter element_bytes:" + bytes);
          }
        }
      };
      var arrayCopy = function(src, src_offset, length) {
        var buffer = new ArrayBuffer(length);
        var dstU8 = new Uint8Array(buffer, 0, length);
        var srcU8 = src.subarray(src_offset, length);
        dstU8.set(srcU8);
        return dstU8;
      };
      var stringToUtf8Bytes = function(str) {
        var bytes = new Uint8Array(new ArrayBuffer(str.length * 4));
        var i = 0, j = 0;
        while (i < str.length) {
          var unicode_code;
          var utf16_code = str.charCodeAt(i++);
          if (utf16_code >= 55296 && utf16_code <= 56319) {
            var upper = utf16_code;
            var lower = str.charCodeAt(i++);
            if (lower >= 56320 && lower <= 57343) {
              unicode_code = (upper - 55296) * (1 << 10) + (1 << 16) + (lower - 56320);
            } else {
              return null;
            }
          } else {
            unicode_code = utf16_code;
          }
          if (unicode_code < 128) {
            bytes[j++] = unicode_code;
          } else if (unicode_code < 1 << 11) {
            bytes[j++] = unicode_code >>> 6 | 192;
            bytes[j++] = unicode_code & 63 | 128;
          } else if (unicode_code < 1 << 16) {
            bytes[j++] = unicode_code >>> 12 | 224;
            bytes[j++] = unicode_code >> 6 & 63 | 128;
            bytes[j++] = unicode_code & 63 | 128;
          } else if (unicode_code < 1 << 21) {
            bytes[j++] = unicode_code >>> 18 | 240;
            bytes[j++] = unicode_code >> 12 & 63 | 128;
            bytes[j++] = unicode_code >> 6 & 63 | 128;
            bytes[j++] = unicode_code & 63 | 128;
          } else {
          }
        }
        return bytes.subarray(0, j);
      };
      var utf8BytesToString = function(bytes) {
        var str = "";
        var code, b1, b2, b3, b4, upper, lower;
        var i = 0;
        while (i < bytes.length) {
          b1 = bytes[i++];
          if (b1 < 128) {
            code = b1;
          } else if (b1 >> 5 === 6) {
            b2 = bytes[i++];
            code = (b1 & 31) << 6 | b2 & 63;
          } else if (b1 >> 4 === 14) {
            b2 = bytes[i++];
            b3 = bytes[i++];
            code = (b1 & 15) << 12 | (b2 & 63) << 6 | b3 & 63;
          } else {
            b2 = bytes[i++];
            b3 = bytes[i++];
            b4 = bytes[i++];
            code = (b1 & 7) << 18 | (b2 & 63) << 12 | (b3 & 63) << 6 | b4 & 63;
          }
          if (code < 65536) {
            str += String.fromCharCode(code);
          } else {
            code -= 65536;
            upper = 55296 | code >> 10;
            lower = 56320 | code & 1023;
            str += String.fromCharCode(upper, lower);
          }
        }
        return str;
      };
      var doublearray = {
        builder: function(initial_size) {
          return new DoubleArrayBuilder(initial_size);
        },
        load: function(base_buffer, check_buffer) {
          var bc = newBC(0);
          bc.loadBaseBuffer(base_buffer);
          bc.loadCheckBuffer(check_buffer);
          return new DoubleArray(bc);
        }
      };
      if ("undefined" === typeof module2) {
        window.doublearray = doublearray;
      } else {
        module2.exports = doublearray;
      }
    })();
  }
});

// node_modules/@sglkc/kuromoji/src/util/ByteBuffer.js
var require_ByteBuffer = __commonJS({
  "node_modules/@sglkc/kuromoji/src/util/ByteBuffer.js"(exports, module2) {
    "use strict";
    var stringToUtf8Bytes = function(str) {
      var bytes = new Uint8Array(str.length * 4);
      var i = 0, j = 0;
      while (i < str.length) {
        var unicode_code;
        var utf16_code = str.charCodeAt(i++);
        if (utf16_code >= 55296 && utf16_code <= 56319) {
          var upper = utf16_code;
          var lower = str.charCodeAt(i++);
          if (lower >= 56320 && lower <= 57343) {
            unicode_code = (upper - 55296) * (1 << 10) + (1 << 16) + (lower - 56320);
          } else {
            return null;
          }
        } else {
          unicode_code = utf16_code;
        }
        if (unicode_code < 128) {
          bytes[j++] = unicode_code;
        } else if (unicode_code < 1 << 11) {
          bytes[j++] = unicode_code >>> 6 | 192;
          bytes[j++] = unicode_code & 63 | 128;
        } else if (unicode_code < 1 << 16) {
          bytes[j++] = unicode_code >>> 12 | 224;
          bytes[j++] = unicode_code >> 6 & 63 | 128;
          bytes[j++] = unicode_code & 63 | 128;
        } else if (unicode_code < 1 << 21) {
          bytes[j++] = unicode_code >>> 18 | 240;
          bytes[j++] = unicode_code >> 12 & 63 | 128;
          bytes[j++] = unicode_code >> 6 & 63 | 128;
          bytes[j++] = unicode_code & 63 | 128;
        } else {
        }
      }
      return bytes.subarray(0, j);
    };
    var utf8BytesToString = function(bytes) {
      var str = "";
      var code, b1, b2, b3, b4, upper, lower;
      var i = 0;
      while (i < bytes.length) {
        b1 = bytes[i++];
        if (b1 < 128) {
          code = b1;
        } else if (b1 >> 5 === 6) {
          b2 = bytes[i++];
          code = (b1 & 31) << 6 | b2 & 63;
        } else if (b1 >> 4 === 14) {
          b2 = bytes[i++];
          b3 = bytes[i++];
          code = (b1 & 15) << 12 | (b2 & 63) << 6 | b3 & 63;
        } else {
          b2 = bytes[i++];
          b3 = bytes[i++];
          b4 = bytes[i++];
          code = (b1 & 7) << 18 | (b2 & 63) << 12 | (b3 & 63) << 6 | b4 & 63;
        }
        if (code < 65536) {
          str += String.fromCharCode(code);
        } else {
          code -= 65536;
          upper = 55296 | code >> 10;
          lower = 56320 | code & 1023;
          str += String.fromCharCode(upper, lower);
        }
      }
      return str;
    };
    function ByteBuffer(arg) {
      var initial_size;
      if (arg == null) {
        initial_size = 1024 * 1024;
      } else if (typeof arg === "number") {
        initial_size = arg;
      } else if (arg instanceof Uint8Array) {
        this.buffer = arg;
        this.position = 0;
        return;
      } else {
        throw typeof arg + " is invalid parameter type for ByteBuffer constructor";
      }
      this.buffer = new Uint8Array(initial_size);
      this.position = 0;
    }
    ByteBuffer.prototype.size = function() {
      return this.buffer.length;
    };
    ByteBuffer.prototype.reallocate = function() {
      var new_array = new Uint8Array(this.buffer.length * 2);
      new_array.set(this.buffer);
      this.buffer = new_array;
    };
    ByteBuffer.prototype.shrink = function() {
      this.buffer = this.buffer.subarray(0, this.position);
      return this.buffer;
    };
    ByteBuffer.prototype.put = function(b) {
      if (this.buffer.length < this.position + 1) {
        this.reallocate();
      }
      this.buffer[this.position++] = b;
    };
    ByteBuffer.prototype.get = function(index) {
      if (index == null) {
        index = this.position;
        this.position += 1;
      }
      if (this.buffer.length < index + 1) {
        return 0;
      }
      return this.buffer[index];
    };
    ByteBuffer.prototype.putShort = function(num) {
      if (65535 < num) {
        throw num + " is over short value";
      }
      var lower = 255 & num;
      var upper = (65280 & num) >> 8;
      this.put(lower);
      this.put(upper);
    };
    ByteBuffer.prototype.getShort = function(index) {
      if (index == null) {
        index = this.position;
        this.position += 2;
      }
      if (this.buffer.length < index + 2) {
        return 0;
      }
      var lower = this.buffer[index];
      var upper = this.buffer[index + 1];
      var value = (upper << 8) + lower;
      if (value & 32768) {
        value = -(value - 1 ^ 65535);
      }
      return value;
    };
    ByteBuffer.prototype.putInt = function(num) {
      if (4294967295 < num) {
        throw num + " is over integer value";
      }
      var b0 = 255 & num;
      var b1 = (65280 & num) >> 8;
      var b2 = (16711680 & num) >> 16;
      var b3 = (4278190080 & num) >> 24;
      this.put(b0);
      this.put(b1);
      this.put(b2);
      this.put(b3);
    };
    ByteBuffer.prototype.getInt = function(index) {
      if (index == null) {
        index = this.position;
        this.position += 4;
      }
      if (this.buffer.length < index + 4) {
        return 0;
      }
      var b0 = this.buffer[index];
      var b1 = this.buffer[index + 1];
      var b2 = this.buffer[index + 2];
      var b3 = this.buffer[index + 3];
      return (b3 << 24) + (b2 << 16) + (b1 << 8) + b0;
    };
    ByteBuffer.prototype.readInt = function() {
      var pos = this.position;
      this.position += 4;
      return this.getInt(pos);
    };
    ByteBuffer.prototype.putString = function(str) {
      var bytes = stringToUtf8Bytes(str);
      for (var i = 0; i < bytes.length; i++) {
        this.put(bytes[i]);
      }
      this.put(0);
    };
    ByteBuffer.prototype.getString = function(index) {
      var buf = [], ch;
      if (index == null) {
        index = this.position;
      }
      while (true) {
        if (this.buffer.length < index + 1) {
          break;
        }
        ch = this.get(index++);
        if (ch === 0) {
          break;
        } else {
          buf.push(ch);
        }
      }
      this.position = index;
      return utf8BytesToString(buf);
    };
    module2.exports = ByteBuffer;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/TokenInfoDictionary.js
var require_TokenInfoDictionary = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/TokenInfoDictionary.js"(exports, module2) {
    "use strict";
    var ByteBuffer = require_ByteBuffer();
    function TokenInfoDictionary() {
      this.dictionary = new ByteBuffer(10 * 1024 * 1024);
      this.target_map = {};
      this.pos_buffer = new ByteBuffer(10 * 1024 * 1024);
    }
    TokenInfoDictionary.prototype.buildDictionary = function(entries) {
      var dictionary_entries = {};
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (entry.length < 4) {
          continue;
        }
        var surface_form = entry[0];
        var left_id = entry[1];
        var right_id = entry[2];
        var word_cost = entry[3];
        var feature = entry.slice(4).join(",");
        if (!isFinite(left_id) || !isFinite(right_id) || !isFinite(word_cost)) {
          console.log(entry);
        }
        var token_info_id = this.put(left_id, right_id, word_cost, surface_form, feature);
        dictionary_entries[token_info_id] = surface_form;
      }
      this.dictionary.shrink();
      this.pos_buffer.shrink();
      return dictionary_entries;
    };
    TokenInfoDictionary.prototype.put = function(left_id, right_id, word_cost, surface_form, feature) {
      var token_info_id = this.dictionary.position;
      var pos_id = this.pos_buffer.position;
      this.dictionary.putShort(left_id);
      this.dictionary.putShort(right_id);
      this.dictionary.putShort(word_cost);
      this.dictionary.putInt(pos_id);
      this.pos_buffer.putString(surface_form + "," + feature);
      return token_info_id;
    };
    TokenInfoDictionary.prototype.addMapping = function(source, target) {
      var mapping = this.target_map[source];
      if (mapping == null) {
        mapping = [];
      }
      mapping.push(target);
      this.target_map[source] = mapping;
    };
    TokenInfoDictionary.prototype.targetMapToBuffer = function() {
      var buffer = new ByteBuffer();
      var map_keys_size = Object.keys(this.target_map).length;
      buffer.putInt(map_keys_size);
      for (var key in this.target_map) {
        var values = this.target_map[key];
        var map_values_size = values.length;
        buffer.putInt(parseInt(key));
        buffer.putInt(map_values_size);
        for (var i = 0; i < values.length; i++) {
          buffer.putInt(values[i]);
        }
      }
      return buffer.shrink();
    };
    TokenInfoDictionary.prototype.loadDictionary = function(array_buffer) {
      this.dictionary = new ByteBuffer(array_buffer);
      return this;
    };
    TokenInfoDictionary.prototype.loadPosVector = function(array_buffer) {
      this.pos_buffer = new ByteBuffer(array_buffer);
      return this;
    };
    TokenInfoDictionary.prototype.loadTargetMap = function(array_buffer) {
      var buffer = new ByteBuffer(array_buffer);
      buffer.position = 0;
      this.target_map = {};
      buffer.readInt();
      while (true) {
        if (buffer.buffer.length < buffer.position + 1) {
          break;
        }
        var key = buffer.readInt();
        var map_values_size = buffer.readInt();
        for (var i = 0; i < map_values_size; i++) {
          var value = buffer.readInt();
          this.addMapping(key, value);
        }
      }
      return this;
    };
    TokenInfoDictionary.prototype.getFeatures = function(token_info_id_str) {
      var token_info_id = parseInt(token_info_id_str);
      if (isNaN(token_info_id)) {
        return "";
      }
      var pos_id = this.dictionary.getInt(token_info_id + 6);
      return this.pos_buffer.getString(pos_id);
    };
    module2.exports = TokenInfoDictionary;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/ConnectionCosts.js
var require_ConnectionCosts = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/ConnectionCosts.js"(exports, module2) {
    "use strict";
    function ConnectionCosts(forward_dimension, backward_dimension) {
      this.forward_dimension = forward_dimension;
      this.backward_dimension = backward_dimension;
      this.buffer = new Int16Array(forward_dimension * backward_dimension + 2);
      this.buffer[0] = forward_dimension;
      this.buffer[1] = backward_dimension;
    }
    ConnectionCosts.prototype.put = function(forward_id, backward_id, cost) {
      var index = forward_id * this.backward_dimension + backward_id + 2;
      if (this.buffer.length < index + 1) {
        throw "ConnectionCosts buffer overflow";
      }
      this.buffer[index] = cost;
    };
    ConnectionCosts.prototype.get = function(forward_id, backward_id) {
      var index = forward_id * this.backward_dimension + backward_id + 2;
      if (this.buffer.length < index + 1) {
        throw "ConnectionCosts buffer overflow";
      }
      return this.buffer[index];
    };
    ConnectionCosts.prototype.loadConnectionCosts = function(connection_costs_buffer) {
      this.forward_dimension = connection_costs_buffer[0];
      this.backward_dimension = connection_costs_buffer[1];
      this.buffer = connection_costs_buffer;
    };
    module2.exports = ConnectionCosts;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/CharacterClass.js
var require_CharacterClass = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/CharacterClass.js"(exports, module2) {
    "use strict";
    function CharacterClass(class_id, class_name, is_always_invoke, is_grouping, max_length) {
      this.class_id = class_id;
      this.class_name = class_name;
      this.is_always_invoke = is_always_invoke;
      this.is_grouping = is_grouping;
      this.max_length = max_length;
    }
    module2.exports = CharacterClass;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/InvokeDefinitionMap.js
var require_InvokeDefinitionMap = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/InvokeDefinitionMap.js"(exports, module2) {
    "use strict";
    var ByteBuffer = require_ByteBuffer();
    var CharacterClass = require_CharacterClass();
    function InvokeDefinitionMap() {
      this.map = [];
      this.lookup_table = {};
    }
    InvokeDefinitionMap.load = function(invoke_def_buffer) {
      var invoke_def = new InvokeDefinitionMap();
      var character_category_definition = [];
      var buffer = new ByteBuffer(invoke_def_buffer);
      while (buffer.position + 1 < buffer.size()) {
        var class_id = character_category_definition.length;
        var is_always_invoke = buffer.get();
        var is_grouping = buffer.get();
        var max_length = buffer.getInt();
        var class_name = buffer.getString();
        character_category_definition.push(new CharacterClass(class_id, class_name, is_always_invoke, is_grouping, max_length));
      }
      invoke_def.init(character_category_definition);
      return invoke_def;
    };
    InvokeDefinitionMap.prototype.init = function(character_category_definition) {
      if (character_category_definition == null) {
        return;
      }
      for (var i = 0; i < character_category_definition.length; i++) {
        var character_class = character_category_definition[i];
        this.map[i] = character_class;
        this.lookup_table[character_class.class_name] = i;
      }
    };
    InvokeDefinitionMap.prototype.getCharacterClass = function(class_id) {
      return this.map[class_id];
    };
    InvokeDefinitionMap.prototype.lookup = function(class_name) {
      var class_id = this.lookup_table[class_name];
      if (class_id == null) {
        return null;
      }
      return class_id;
    };
    InvokeDefinitionMap.prototype.toBuffer = function() {
      var buffer = new ByteBuffer();
      for (var i = 0; i < this.map.length; i++) {
        var char_class = this.map[i];
        buffer.put(char_class.is_always_invoke);
        buffer.put(char_class.is_grouping);
        buffer.putInt(char_class.max_length);
        buffer.putString(char_class.class_name);
      }
      buffer.shrink();
      return buffer.buffer;
    };
    module2.exports = InvokeDefinitionMap;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/CharacterDefinition.js
var require_CharacterDefinition = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/CharacterDefinition.js"(exports, module2) {
    "use strict";
    var InvokeDefinitionMap = require_InvokeDefinitionMap();
    var CharacterClass = require_CharacterClass();
    var SurrogateAwareString = require_SurrogateAwareString();
    var DEFAULT_CATEGORY = "DEFAULT";
    function CharacterDefinition() {
      this.character_category_map = new Uint8Array(65536);
      this.compatible_category_map = new Uint32Array(65536);
      this.invoke_definition_map = null;
    }
    CharacterDefinition.load = function(cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer) {
      var char_def = new CharacterDefinition();
      char_def.character_category_map = cat_map_buffer;
      char_def.compatible_category_map = compat_cat_map_buffer;
      char_def.invoke_definition_map = InvokeDefinitionMap.load(invoke_def_buffer);
      return char_def;
    };
    CharacterDefinition.parseCharCategory = function(class_id, parsed_category_def) {
      var category = parsed_category_def[1];
      var invoke = parseInt(parsed_category_def[2]);
      var grouping = parseInt(parsed_category_def[3]);
      var max_length = parseInt(parsed_category_def[4]);
      if (!isFinite(invoke) || invoke !== 0 && invoke !== 1) {
        console.log("char.def parse error. INVOKE is 0 or 1 in:" + invoke);
        return null;
      }
      if (!isFinite(grouping) || grouping !== 0 && grouping !== 1) {
        console.log("char.def parse error. GROUP is 0 or 1 in:" + grouping);
        return null;
      }
      if (!isFinite(max_length) || max_length < 0) {
        console.log("char.def parse error. LENGTH is 1 to n:" + max_length);
        return null;
      }
      var is_invoke = invoke === 1;
      var is_grouping = grouping === 1;
      return new CharacterClass(class_id, category, is_invoke, is_grouping, max_length);
    };
    CharacterDefinition.parseCategoryMapping = function(parsed_category_mapping) {
      var start = parseInt(parsed_category_mapping[1]);
      var default_category = parsed_category_mapping[2];
      var compatible_category = 3 < parsed_category_mapping.length ? parsed_category_mapping.slice(3) : [];
      if (!isFinite(start) || start < 0 || start > 65535) {
        console.log("char.def parse error. CODE is invalid:" + start);
      }
      return { start, default: default_category, compatible: compatible_category };
    };
    CharacterDefinition.parseRangeCategoryMapping = function(parsed_category_mapping) {
      var start = parseInt(parsed_category_mapping[1]);
      var end = parseInt(parsed_category_mapping[2]);
      var default_category = parsed_category_mapping[3];
      var compatible_category = 4 < parsed_category_mapping.length ? parsed_category_mapping.slice(4) : [];
      if (!isFinite(start) || start < 0 || start > 65535) {
        console.log("char.def parse error. CODE is invalid:" + start);
      }
      if (!isFinite(end) || end < 0 || end > 65535) {
        console.log("char.def parse error. CODE is invalid:" + end);
      }
      return { start, end, default: default_category, compatible: compatible_category };
    };
    CharacterDefinition.prototype.initCategoryMappings = function(category_mapping) {
      var code_point;
      if (category_mapping != null) {
        for (var i = 0; i < category_mapping.length; i++) {
          var mapping = category_mapping[i];
          var end = mapping.end || mapping.start;
          for (code_point = mapping.start; code_point <= end; code_point++) {
            this.character_category_map[code_point] = this.invoke_definition_map.lookup(mapping.default);
            for (var j = 0; j < mapping.compatible.length; j++) {
              var bitset = this.compatible_category_map[code_point];
              var compatible_category = mapping.compatible[j];
              if (compatible_category == null) {
                continue;
              }
              var class_id = this.invoke_definition_map.lookup(compatible_category);
              if (class_id == null) {
                continue;
              }
              var class_id_bit = 1 << class_id;
              bitset = bitset | class_id_bit;
              this.compatible_category_map[code_point] = bitset;
            }
          }
        }
      }
      var default_id = this.invoke_definition_map.lookup(DEFAULT_CATEGORY);
      if (default_id == null) {
        return;
      }
      for (code_point = 0; code_point < this.character_category_map.length; code_point++) {
        if (this.character_category_map[code_point] === 0) {
          this.character_category_map[code_point] = 1 << default_id;
        }
      }
    };
    CharacterDefinition.prototype.lookupCompatibleCategory = function(ch) {
      var classes = [];
      var code = ch.charCodeAt(0);
      var integer;
      if (code < this.compatible_category_map.length) {
        integer = this.compatible_category_map[code];
      }
      if (integer == null || integer === 0) {
        return classes;
      }
      for (var bit = 0; bit < 32; bit++) {
        if (integer << 31 - bit >>> 31 === 1) {
          var character_class = this.invoke_definition_map.getCharacterClass(bit);
          if (character_class == null) {
            continue;
          }
          classes.push(character_class);
        }
      }
      return classes;
    };
    CharacterDefinition.prototype.lookup = function(ch) {
      var class_id;
      var code = ch.charCodeAt(0);
      if (SurrogateAwareString.isSurrogatePair(ch)) {
        class_id = this.invoke_definition_map.lookup(DEFAULT_CATEGORY);
      } else if (code < this.character_category_map.length) {
        class_id = this.character_category_map[code];
      }
      if (class_id == null) {
        class_id = this.invoke_definition_map.lookup(DEFAULT_CATEGORY);
      }
      return this.invoke_definition_map.getCharacterClass(class_id);
    };
    module2.exports = CharacterDefinition;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/UnknownDictionary.js
var require_UnknownDictionary = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/UnknownDictionary.js"(exports, module2) {
    "use strict";
    var TokenInfoDictionary = require_TokenInfoDictionary();
    var CharacterDefinition = require_CharacterDefinition();
    var ByteBuffer = require_ByteBuffer();
    function UnknownDictionary() {
      this.dictionary = new ByteBuffer(10 * 1024 * 1024);
      this.target_map = {};
      this.pos_buffer = new ByteBuffer(10 * 1024 * 1024);
      this.character_definition = null;
    }
    UnknownDictionary.prototype = Object.create(TokenInfoDictionary.prototype);
    UnknownDictionary.prototype.characterDefinition = function(character_definition) {
      this.character_definition = character_definition;
      return this;
    };
    UnknownDictionary.prototype.lookup = function(ch) {
      return this.character_definition.lookup(ch);
    };
    UnknownDictionary.prototype.lookupCompatibleCategory = function(ch) {
      return this.character_definition.lookupCompatibleCategory(ch);
    };
    UnknownDictionary.prototype.loadUnknownDictionaries = function(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer) {
      this.loadDictionary(unk_buffer);
      this.loadPosVector(unk_pos_buffer);
      this.loadTargetMap(unk_map_buffer);
      this.character_definition = CharacterDefinition.load(cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer);
    };
    module2.exports = UnknownDictionary;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/DynamicDictionaries.js
var require_DynamicDictionaries = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/DynamicDictionaries.js"(exports, module2) {
    "use strict";
    var doublearray = require_doublearray();
    var TokenInfoDictionary = require_TokenInfoDictionary();
    var ConnectionCosts = require_ConnectionCosts();
    var UnknownDictionary = require_UnknownDictionary();
    function DynamicDictionaries(trie, token_info_dictionary, connection_costs, unknown_dictionary) {
      if (trie != null) {
        this.trie = trie;
      } else {
        this.trie = doublearray.builder(0).build([
          { k: "", v: 1 }
        ]);
      }
      if (token_info_dictionary != null) {
        this.token_info_dictionary = token_info_dictionary;
      } else {
        this.token_info_dictionary = new TokenInfoDictionary();
      }
      if (connection_costs != null) {
        this.connection_costs = connection_costs;
      } else {
        this.connection_costs = new ConnectionCosts(0, 0);
      }
      if (unknown_dictionary != null) {
        this.unknown_dictionary = unknown_dictionary;
      } else {
        this.unknown_dictionary = new UnknownDictionary();
      }
    }
    DynamicDictionaries.prototype.loadTrie = function(base_buffer, check_buffer) {
      this.trie = doublearray.load(base_buffer, check_buffer);
      return this;
    };
    DynamicDictionaries.prototype.loadTokenInfoDictionaries = function(token_info_buffer, pos_buffer, target_map_buffer) {
      this.token_info_dictionary.loadDictionary(token_info_buffer);
      this.token_info_dictionary.loadPosVector(pos_buffer);
      this.token_info_dictionary.loadTargetMap(target_map_buffer);
      return this;
    };
    DynamicDictionaries.prototype.loadConnectionCosts = function(cc_buffer) {
      this.connection_costs.loadConnectionCosts(cc_buffer);
      return this;
    };
    DynamicDictionaries.prototype.loadUnknownDictionaries = function(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer) {
      this.unknown_dictionary.loadUnknownDictionaries(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer);
      return this;
    };
    module2.exports = DynamicDictionaries;
  }
});

// node_modules/@sglkc/kuromoji/src/loader/DictionaryLoader.js
var require_DictionaryLoader = __commonJS({
  "node_modules/@sglkc/kuromoji/src/loader/DictionaryLoader.js"(exports, module2) {
    "use strict";
    var async = require_async();
    var DynamicDictionaries = require_DynamicDictionaries();
    function DictionaryLoader(dic_path) {
      this.dic = new DynamicDictionaries();
      this.dic_path = dic_path;
    }
    DictionaryLoader.prototype.loadArrayBuffer = function(file, callback) {
      throw new Error("DictionaryLoader#loadArrayBuffer should be overwrite");
    };
    DictionaryLoader.prototype.load = function(load_callback) {
      var dic = this.dic;
      var dic_path = this.dic_path;
      var loadArrayBuffer = this.loadArrayBuffer;
      var dic_path_url = function(filename) {
        var separator = "/";
        var replace = new RegExp(separator + "{1,}", "g");
        var path = [dic_path, filename].join(separator).replace(replace, separator);
        return path;
      };
      async.parallel([
        // Trie
        function(callback) {
          async.map(["base.dat.gz", "check.dat.gz"], function(filename, _callback) {
            loadArrayBuffer(dic_path_url(filename), function(err, buffer) {
              if (err) {
                return _callback(err);
              }
              _callback(null, buffer);
            });
          }, function(err, buffers) {
            if (err) {
              return callback(err);
            }
            var base_buffer = new Int32Array(buffers[0]);
            var check_buffer = new Int32Array(buffers[1]);
            dic.loadTrie(base_buffer, check_buffer);
            callback(null);
          });
        },
        // Token info dictionaries
        function(callback) {
          async.map(["tid.dat.gz", "tid_pos.dat.gz", "tid_map.dat.gz"], function(filename, _callback) {
            loadArrayBuffer(dic_path_url(filename), function(err, buffer) {
              if (err) {
                return _callback(err);
              }
              _callback(null, buffer);
            });
          }, function(err, buffers) {
            if (err) {
              return callback(err);
            }
            var token_info_buffer = new Uint8Array(buffers[0]);
            var pos_buffer = new Uint8Array(buffers[1]);
            var target_map_buffer = new Uint8Array(buffers[2]);
            dic.loadTokenInfoDictionaries(token_info_buffer, pos_buffer, target_map_buffer);
            callback(null);
          });
        },
        // Connection cost matrix
        function(callback) {
          loadArrayBuffer(dic_path_url("cc.dat.gz"), function(err, buffer) {
            if (err) {
              return callback(err);
            }
            var cc_buffer = new Int16Array(buffer);
            dic.loadConnectionCosts(cc_buffer);
            callback(null);
          });
        },
        // Unknown dictionaries
        function(callback) {
          async.map(["unk.dat.gz", "unk_pos.dat.gz", "unk_map.dat.gz", "unk_char.dat.gz", "unk_compat.dat.gz", "unk_invoke.dat.gz"], function(filename, _callback) {
            loadArrayBuffer(dic_path_url(filename), function(err, buffer) {
              if (err) {
                return _callback(err);
              }
              _callback(null, buffer);
            });
          }, function(err, buffers) {
            if (err) {
              return callback(err);
            }
            var unk_buffer = new Uint8Array(buffers[0]);
            var unk_pos_buffer = new Uint8Array(buffers[1]);
            var unk_map_buffer = new Uint8Array(buffers[2]);
            var cat_map_buffer = new Uint8Array(buffers[3]);
            var compat_cat_map_buffer = new Uint32Array(buffers[4]);
            var invoke_def_buffer = new Uint8Array(buffers[5]);
            dic.loadUnknownDictionaries(unk_buffer, unk_pos_buffer, unk_map_buffer, cat_map_buffer, compat_cat_map_buffer, invoke_def_buffer);
            callback(null);
          });
        }
      ], function(err) {
        load_callback(err, dic);
      });
    };
    module2.exports = DictionaryLoader;
  }
});

// node_modules/@sglkc/kuromoji/src/loader/BrowserDictionaryLoader.js
var require_BrowserDictionaryLoader = __commonJS({
  "node_modules/@sglkc/kuromoji/src/loader/BrowserDictionaryLoader.js"(exports, module2) {
    "use strict";
    var fflate = require_browser();
    var DictionaryLoader = require_DictionaryLoader();
    function BrowserDictionaryLoader(dic_path) {
      DictionaryLoader.apply(this, [dic_path]);
    }
    BrowserDictionaryLoader.prototype = Object.create(DictionaryLoader.prototype);
    BrowserDictionaryLoader.prototype.loadArrayBuffer = function(url, callback) {
      fetch(url).then(function(response) {
        if (!response.ok) {
          callback(response.statusText, null);
        }
        response.arrayBuffer().then(function(arraybuffer) {
          var gz = fflate.gunzipSync(new Uint8Array(arraybuffer));
          callback(null, gz.buffer);
        });
      }).catch(function(exception) {
        callback(exception, null);
      });
    };
    module2.exports = BrowserDictionaryLoader;
  }
});

// node_modules/@sglkc/kuromoji/src/TokenizerBuilder.js
var require_TokenizerBuilder = __commonJS({
  "node_modules/@sglkc/kuromoji/src/TokenizerBuilder.js"(exports, module2) {
    "use strict";
    var Tokenizer = require_Tokenizer();
    var DictionaryLoader = require_BrowserDictionaryLoader();
    function TokenizerBuilder(option) {
      if (option.dicPath == null) {
        this.dic_path = "dict/";
      } else {
        this.dic_path = option.dicPath;
      }
    }
    TokenizerBuilder.prototype.build = function(callback) {
      var loader = new DictionaryLoader(this.dic_path);
      loader.load(function(err, dic) {
        callback(err, new Tokenizer(dic));
      });
    };
    module2.exports = TokenizerBuilder;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/builder/ConnectionCostsBuilder.js
var require_ConnectionCostsBuilder = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/builder/ConnectionCostsBuilder.js"(exports, module2) {
    "use strict";
    var ConnectionCosts = require_ConnectionCosts();
    function ConnectionCostsBuilder() {
      this.lines = 0;
      this.connection_cost = null;
    }
    ConnectionCostsBuilder.prototype.putLine = function(line) {
      if (this.lines === 0) {
        var dimensions = line.split(" ");
        var forward_dimension = dimensions[0];
        var backward_dimension = dimensions[1];
        if (forward_dimension < 0 || backward_dimension < 0) {
          throw "Parse error of matrix.def";
        }
        this.connection_cost = new ConnectionCosts(forward_dimension, backward_dimension);
        this.lines++;
        return this;
      }
      var costs = line.split(" ");
      if (costs.length !== 3) {
        return this;
      }
      var forward_id = parseInt(costs[0]);
      var backward_id = parseInt(costs[1]);
      var cost = parseInt(costs[2]);
      if (forward_id < 0 || backward_id < 0 || !isFinite(forward_id) || !isFinite(backward_id) || this.connection_cost.forward_dimension <= forward_id || this.connection_cost.backward_dimension <= backward_id) {
        throw "Parse error of matrix.def";
      }
      this.connection_cost.put(forward_id, backward_id, cost);
      this.lines++;
      return this;
    };
    ConnectionCostsBuilder.prototype.build = function() {
      return this.connection_cost;
    };
    module2.exports = ConnectionCostsBuilder;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/builder/CharacterDefinitionBuilder.js
var require_CharacterDefinitionBuilder = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/builder/CharacterDefinitionBuilder.js"(exports, module2) {
    "use strict";
    var CharacterDefinition = require_CharacterDefinition();
    var InvokeDefinitionMap = require_InvokeDefinitionMap();
    var CATEGORY_DEF_PATTERN = /^(\w+)\s+(\d)\s+(\d)\s+(\d)/;
    var CATEGORY_MAPPING_PATTERN = /^(0x[0-9A-F]{4})(?:\s+([^#\s]+))(?:\s+([^#\s]+))*/;
    var RANGE_CATEGORY_MAPPING_PATTERN = /^(0x[0-9A-F]{4})\.\.(0x[0-9A-F]{4})(?:\s+([^#\s]+))(?:\s+([^#\s]+))*/;
    function CharacterDefinitionBuilder() {
      this.char_def = new CharacterDefinition();
      this.char_def.invoke_definition_map = new InvokeDefinitionMap();
      this.character_category_definition = [];
      this.category_mapping = [];
    }
    CharacterDefinitionBuilder.prototype.putLine = function(line) {
      var parsed_category_def = CATEGORY_DEF_PATTERN.exec(line);
      if (parsed_category_def != null) {
        var class_id = this.character_category_definition.length;
        var char_class = CharacterDefinition.parseCharCategory(class_id, parsed_category_def);
        if (char_class == null) {
          return;
        }
        this.character_category_definition.push(char_class);
        return;
      }
      var parsed_category_mapping = CATEGORY_MAPPING_PATTERN.exec(line);
      if (parsed_category_mapping != null) {
        var mapping = CharacterDefinition.parseCategoryMapping(parsed_category_mapping);
        this.category_mapping.push(mapping);
      }
      var parsed_range_category_mapping = RANGE_CATEGORY_MAPPING_PATTERN.exec(line);
      if (parsed_range_category_mapping != null) {
        var range_mapping = CharacterDefinition.parseRangeCategoryMapping(parsed_range_category_mapping);
        this.category_mapping.push(range_mapping);
      }
    };
    CharacterDefinitionBuilder.prototype.build = function() {
      this.char_def.invoke_definition_map.init(this.character_category_definition);
      this.char_def.initCategoryMappings(this.category_mapping);
      return this.char_def;
    };
    module2.exports = CharacterDefinitionBuilder;
  }
});

// node_modules/@sglkc/kuromoji/src/dict/builder/DictionaryBuilder.js
var require_DictionaryBuilder = __commonJS({
  "node_modules/@sglkc/kuromoji/src/dict/builder/DictionaryBuilder.js"(exports, module2) {
    "use strict";
    var doublearray = require_doublearray();
    var DynamicDictionaries = require_DynamicDictionaries();
    var TokenInfoDictionary = require_TokenInfoDictionary();
    var ConnectionCostsBuilder = require_ConnectionCostsBuilder();
    var CharacterDefinitionBuilder = require_CharacterDefinitionBuilder();
    var UnknownDictionary = require_UnknownDictionary();
    function DictionaryBuilder() {
      this.tid_entries = [];
      this.unk_entries = [];
      this.cc_builder = new ConnectionCostsBuilder();
      this.cd_builder = new CharacterDefinitionBuilder();
    }
    DictionaryBuilder.prototype.addTokenInfoDictionary = function(line) {
      var new_entry = line.split(",");
      this.tid_entries.push(new_entry);
      return this;
    };
    DictionaryBuilder.prototype.putCostMatrixLine = function(line) {
      this.cc_builder.putLine(line);
      return this;
    };
    DictionaryBuilder.prototype.putCharDefLine = function(line) {
      this.cd_builder.putLine(line);
      return this;
    };
    DictionaryBuilder.prototype.putUnkDefLine = function(line) {
      this.unk_entries.push(line.split(","));
      return this;
    };
    DictionaryBuilder.prototype.build = function() {
      var dictionaries = this.buildTokenInfoDictionary();
      var unknown_dictionary = this.buildUnknownDictionary();
      return new DynamicDictionaries(dictionaries.trie, dictionaries.token_info_dictionary, this.cc_builder.build(), unknown_dictionary);
    };
    DictionaryBuilder.prototype.buildTokenInfoDictionary = function() {
      var token_info_dictionary = new TokenInfoDictionary();
      var dictionary_entries = token_info_dictionary.buildDictionary(this.tid_entries);
      var trie = this.buildDoubleArray();
      for (var token_info_id in dictionary_entries) {
        var surface_form = dictionary_entries[token_info_id];
        var trie_id = trie.lookup(surface_form);
        token_info_dictionary.addMapping(trie_id, token_info_id);
      }
      return {
        trie,
        token_info_dictionary
      };
    };
    DictionaryBuilder.prototype.buildUnknownDictionary = function() {
      var unk_dictionary = new UnknownDictionary();
      var dictionary_entries = unk_dictionary.buildDictionary(this.unk_entries);
      var char_def = this.cd_builder.build();
      unk_dictionary.characterDefinition(char_def);
      for (var token_info_id in dictionary_entries) {
        var class_name = dictionary_entries[token_info_id];
        var class_id = char_def.invoke_definition_map.lookup(class_name);
        unk_dictionary.addMapping(class_id, token_info_id);
      }
      return unk_dictionary;
    };
    DictionaryBuilder.prototype.buildDoubleArray = function() {
      var trie_id = 0;
      var words = this.tid_entries.map(function(entry) {
        var surface_form = entry[0];
        return { k: surface_form, v: trie_id++ };
      });
      var builder = doublearray.builder(1024 * 1024);
      return builder.build(words);
    };
    module2.exports = DictionaryBuilder;
  }
});

// node_modules/@sglkc/kuromoji/src/kuromoji.js
var require_kuromoji = __commonJS({
  "node_modules/@sglkc/kuromoji/src/kuromoji.js"(exports, module2) {
    "use strict";
    var TokenizerBuilder = require_TokenizerBuilder();
    var DictionaryBuilder = require_DictionaryBuilder();
    var kuromoji2 = {
      builder: function(option) {
        return new TokenizerBuilder(option);
      },
      dictionaryBuilder: function() {
        return new DictionaryBuilder();
      }
    };
    module2.exports = kuromoji2;
  }
});

// node_modules/kuroshiro/src/util.js
var KATAKANA_HIRAGANA_SHIFT = "\u3041".charCodeAt(0) - "\u30A1".charCodeAt(0);
var HIRAGANA_KATAKANA_SHIFT = "\u30A1".charCodeAt(0) - "\u3041".charCodeAt(0);
var ROMANIZATION_SYSTEM = {
  NIPPON: "nippon",
  PASSPORT: "passport",
  HEPBURN: "hepburn"
};
var isHiragana = function(ch) {
  ch = ch[0];
  return ch >= "\u3040" && ch <= "\u309F";
};
var isKatakana = function(ch) {
  ch = ch[0];
  return ch >= "\u30A0" && ch <= "\u30FF";
};
var isKana = function(ch) {
  return isHiragana(ch) || isKatakana(ch);
};
var isKanji = function(ch) {
  ch = ch[0];
  return ch >= "\u4E00" && ch <= "\u9FCF" || ch >= "\uF900" && ch <= "\uFAFF" || ch >= "\u3400" && ch <= "\u4DBF";
};
var isJapanese = function(ch) {
  return isKana(ch) || isKanji(ch);
};
var hasHiragana = function(str) {
  for (let i = 0; i < str.length; i++) {
    if (isHiragana(str[i]))
      return true;
  }
  return false;
};
var hasKatakana = function(str) {
  for (let i = 0; i < str.length; i++) {
    if (isKatakana(str[i]))
      return true;
  }
  return false;
};
var hasKana = function(str) {
  for (let i = 0; i < str.length; i++) {
    if (isKana(str[i]))
      return true;
  }
  return false;
};
var hasKanji = function(str) {
  for (let i = 0; i < str.length; i++) {
    if (isKanji(str[i]))
      return true;
  }
  return false;
};
var hasJapanese = function(str) {
  for (let i = 0; i < str.length; i++) {
    if (isJapanese(str[i]))
      return true;
  }
  return false;
};
var toRawHiragana = function(str) {
  return [...str].map((ch) => {
    if (ch > "\u30A0" && ch < "\u30F7") {
      return String.fromCharCode(ch.charCodeAt(0) + KATAKANA_HIRAGANA_SHIFT);
    }
    return ch;
  }).join("");
};
var toRawKatakana = function(str) {
  return [...str].map((ch) => {
    if (ch > "\u3040" && ch < "\u3097") {
      return String.fromCharCode(ch.charCodeAt(0) + HIRAGANA_KATAKANA_SHIFT);
    }
    return ch;
  }).join("");
};
var toRawRomaji = function(str, system) {
  system = system || ROMANIZATION_SYSTEM.HEPBURN;
  const romajiSystem = {
    nippon: {
      // 数字と記号
      "\uFF11": "1",
      "\uFF12": "2",
      "\uFF13": "3",
      "\uFF14": "4",
      "\uFF15": "5",
      "\uFF16": "6",
      "\uFF17": "7",
      "\uFF18": "8",
      "\uFF19": "9",
      "\uFF10": "0",
      "\uFF01": "!",
      "\u201C": '"',
      "\u201D": '"',
      "\uFF03": "#",
      "\uFF04": "$",
      "\uFF05": "%",
      "\uFF06": "&",
      "\u2019": "'",
      "\uFF08": "(",
      "\uFF09": ")",
      "\uFF1D": "=",
      "\uFF5E": "~",
      "\uFF5C": "|",
      "\uFF20": "@",
      "\u2018": "`",
      "\uFF0B": "+",
      "\uFF0A": "*",
      "\uFF1B": ";",
      "\uFF1A": ":",
      "\uFF1C": "<",
      "\uFF1E": ">",
      "\u3001": ",",
      "\u3002": ".",
      "\uFF0F": "/",
      "\uFF1F": "?",
      "\uFF3F": "_",
      "\u30FB": "\uFF65",
      "\u300C": '"',
      "\u300D": '"',
      "\uFF5B": "{",
      "\uFF5D": "}",
      "\uFFE5": "\\",
      "\uFF3E": "^",
      // 直音-清音(ア～ノ)
      \u3042: "a",
      \u3044: "i",
      \u3046: "u",
      \u3048: "e",
      \u304A: "o",
      \u30A2: "a",
      \u30A4: "i",
      \u30A6: "u",
      \u30A8: "e",
      \u30AA: "o",
      \u304B: "ka",
      \u304D: "ki",
      \u304F: "ku",
      \u3051: "ke",
      \u3053: "ko",
      \u30AB: "ka",
      \u30AD: "ki",
      \u30AF: "ku",
      \u30B1: "ke",
      \u30B3: "ko",
      \u3055: "sa",
      \u3057: "si",
      \u3059: "su",
      \u305B: "se",
      \u305D: "so",
      \u30B5: "sa",
      \u30B7: "si",
      \u30B9: "su",
      \u30BB: "se",
      \u30BD: "so",
      \u305F: "ta",
      \u3061: "ti",
      \u3064: "tu",
      \u3066: "te",
      \u3068: "to",
      \u30BF: "ta",
      \u30C1: "ti",
      \u30C4: "tu",
      \u30C6: "te",
      \u30C8: "to",
      \u306A: "na",
      \u306B: "ni",
      \u306C: "nu",
      \u306D: "ne",
      \u306E: "no",
      \u30CA: "na",
      \u30CB: "ni",
      \u30CC: "nu",
      \u30CD: "ne",
      \u30CE: "no",
      // 直音-清音(ハ～ヲ)
      \u306F: "ha",
      \u3072: "hi",
      \u3075: "hu",
      \u3078: "he",
      \u307B: "ho",
      \u30CF: "ha",
      \u30D2: "hi",
      \u30D5: "hu",
      \u30D8: "he",
      \u30DB: "ho",
      \u307E: "ma",
      \u307F: "mi",
      \u3080: "mu",
      \u3081: "me",
      \u3082: "mo",
      \u30DE: "ma",
      \u30DF: "mi",
      \u30E0: "mu",
      \u30E1: "me",
      \u30E2: "mo",
      \u3084: "ya",
      \u3086: "yu",
      \u3088: "yo",
      \u30E4: "ya",
      \u30E6: "yu",
      \u30E8: "yo",
      \u3089: "ra",
      \u308A: "ri",
      \u308B: "ru",
      \u308C: "re",
      \u308D: "ro",
      \u30E9: "ra",
      \u30EA: "ri",
      \u30EB: "ru",
      \u30EC: "re",
      \u30ED: "ro",
      \u308F: "wa",
      \u3090: "wi",
      \u3091: "we",
      \u3092: "wo",
      \u30EF: "wa",
      \u30F0: "wi",
      \u30F1: "we",
      \u30F2: "wo",
      // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
      \u304C: "ga",
      \u304E: "gi",
      \u3050: "gu",
      \u3052: "ge",
      \u3054: "go",
      \u30AC: "ga",
      \u30AE: "gi",
      \u30B0: "gu",
      \u30B2: "ge",
      \u30B4: "go",
      \u3056: "za",
      \u3058: "zi",
      \u305A: "zu",
      \u305C: "ze",
      \u305E: "zo",
      \u30B6: "za",
      \u30B8: "zi",
      \u30BA: "zu",
      \u30BC: "ze",
      \u30BE: "zo",
      \u3060: "da",
      \u3062: "di",
      \u3065: "du",
      \u3067: "de",
      \u3069: "do",
      \u30C0: "da",
      \u30C2: "di",
      \u30C5: "du",
      \u30C7: "de",
      \u30C9: "do",
      \u3070: "ba",
      \u3073: "bi",
      \u3076: "bu",
      \u3079: "be",
      \u307C: "bo",
      \u30D0: "ba",
      \u30D3: "bi",
      \u30D6: "bu",
      \u30D9: "be",
      \u30DC: "bo",
      \u3071: "pa",
      \u3074: "pi",
      \u3077: "pu",
      \u307A: "pe",
      \u307D: "po",
      \u30D1: "pa",
      \u30D4: "pi",
      \u30D7: "pu",
      \u30DA: "pe",
      \u30DD: "po",
      // 拗音-清音(キャ～リョ)
      \u304D\u3083: "kya",
      \u304D\u3085: "kyu",
      \u304D\u3087: "kyo",
      \u3057\u3083: "sya",
      \u3057\u3085: "syu",
      \u3057\u3087: "syo",
      \u3061\u3083: "tya",
      \u3061\u3085: "tyu",
      \u3061\u3087: "tyo",
      \u306B\u3083: "nya",
      \u306B\u3085: "nyu",
      \u306B\u3087: "nyo",
      \u3072\u3083: "hya",
      \u3072\u3085: "hyu",
      \u3072\u3087: "hyo",
      \u307F\u3083: "mya",
      \u307F\u3085: "myu",
      \u307F\u3087: "myo",
      \u308A\u3083: "rya",
      \u308A\u3085: "ryu",
      \u308A\u3087: "ryo",
      \u30AD\u30E3: "kya",
      \u30AD\u30E5: "kyu",
      \u30AD\u30E7: "kyo",
      \u30B7\u30E3: "sya",
      \u30B7\u30E5: "syu",
      \u30B7\u30E7: "syo",
      \u30C1\u30E3: "tya",
      \u30C1\u30E5: "tyu",
      \u30C1\u30E7: "tyo",
      \u30CB\u30E3: "nya",
      \u30CB\u30E5: "nyu",
      \u30CB\u30E7: "nyo",
      \u30D2\u30E3: "hya",
      \u30D2\u30E5: "hyu",
      \u30D2\u30E7: "hyo",
      \u30DF\u30E3: "mya",
      \u30DF\u30E5: "myu",
      \u30DF\u30E7: "myo",
      \u30EA\u30E3: "rya",
      \u30EA\u30E5: "ryu",
      \u30EA\u30E7: "ryo",
      // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
      \u304E\u3083: "gya",
      \u304E\u3085: "gyu",
      \u304E\u3087: "gyo",
      \u3058\u3083: "zya",
      \u3058\u3085: "zyu",
      \u3058\u3087: "zyo",
      \u3062\u3083: "dya",
      \u3062\u3085: "dyu",
      \u3062\u3087: "dyo",
      \u3073\u3083: "bya",
      \u3073\u3085: "byu",
      \u3073\u3087: "byo",
      \u3074\u3083: "pya",
      \u3074\u3085: "pyu",
      \u3074\u3087: "pyo",
      \u304F\u308E: "kwa",
      \u3050\u308E: "gwa",
      \u30AE\u30E3: "gya",
      \u30AE\u30E5: "gyu",
      \u30AE\u30E7: "gyo",
      \u30B8\u30E3: "zya",
      \u30B8\u30E5: "zyu",
      \u30B8\u30E7: "zyo",
      \u30C2\u30E3: "dya",
      \u30C2\u30E5: "dyu",
      \u30C2\u30E7: "dyo",
      \u30D3\u30E3: "bya",
      \u30D3\u30E5: "byu",
      \u30D3\u30E7: "byo",
      \u30D4\u30E3: "pya",
      \u30D4\u30E5: "pyu",
      \u30D4\u30E7: "pyo",
      \u30AF\u30EE: "kwa",
      \u30B0\u30EE: "gwa",
      // 小書きの仮名、符号
      \u3041: "a",
      \u3043: "i",
      \u3045: "u",
      \u3047: "e",
      \u3049: "o",
      \u3083: "ya",
      \u3085: "yu",
      \u3087: "yo",
      \u308E: "wa",
      \u30A1: "a",
      \u30A3: "i",
      \u30A5: "u",
      \u30A7: "e",
      \u30A9: "o",
      \u30E3: "ya",
      \u30E5: "yu",
      \u30E7: "yo",
      \u30EE: "wa",
      \u30F5: "ka",
      \u30F6: "ke",
      \u3093: "n",
      \u30F3: "n",
      // ー: "",
      "\u3000": " ",
      // 外来音(イェ～グォ)
      \u3044\u3047: "ye",
      // うぃ: "",
      // うぇ: "",
      // うぉ: "",
      \u304D\u3047: "kye",
      // くぁ: "",
      \u304F\u3043: "kwi",
      \u304F\u3047: "kwe",
      \u304F\u3049: "kwo",
      // ぐぁ: "",
      \u3050\u3043: "gwi",
      \u3050\u3047: "gwe",
      \u3050\u3049: "gwo",
      \u30A4\u30A7: "ye",
      // ウィ: "",
      // ウェ: "",
      // ウォ: "",
      // ヴ: "",
      // ヴァ: "",
      // ヴィ: "",
      // ヴェ: "",
      // ヴォ: "",
      // ヴュ: "",
      // ヴョ: "",
      \u30AD\u30A7: "kya",
      // クァ: "",
      \u30AF\u30A3: "kwi",
      \u30AF\u30A7: "kwe",
      \u30AF\u30A9: "kwo",
      // グァ: "",
      \u30B0\u30A3: "gwi",
      \u30B0\u30A7: "gwe",
      \u30B0\u30A9: "gwo",
      // 外来音(シェ～フョ)
      \u3057\u3047: "sye",
      \u3058\u3047: "zye",
      \u3059\u3043: "swi",
      \u305A\u3043: "zwi",
      \u3061\u3047: "tye",
      \u3064\u3041: "twa",
      \u3064\u3043: "twi",
      \u3064\u3047: "twe",
      \u3064\u3049: "two",
      // てぃ: "ti",
      // てゅ: "tyu",
      // でぃ: "di",
      // でゅ: "dyu",
      // とぅ: "tu",
      // どぅ: "du",
      \u306B\u3047: "nye",
      \u3072\u3047: "hye",
      \u3075\u3041: "hwa",
      \u3075\u3043: "hwi",
      \u3075\u3047: "hwe",
      \u3075\u3049: "hwo",
      \u3075\u3085: "hwyu",
      \u3075\u3087: "hwyo",
      \u30B7\u30A7: "sye",
      \u30B8\u30A7: "zye",
      \u30B9\u30A3: "swi",
      \u30BA\u30A3: "zwi",
      \u30C1\u30A7: "tye",
      \u30C4\u30A1: "twa",
      \u30C4\u30A3: "twi",
      \u30C4\u30A7: "twe",
      \u30C4\u30A9: "two",
      // ティ: "ti",
      // テュ: "tyu",
      // ディ: "di",
      // デュ: "dyu",
      // トゥ: "tu",
      // ドゥ: "du",
      \u30CB\u30A7: "nye",
      \u30D2\u30A7: "hye",
      \u30D5\u30A1: "hwa",
      \u30D5\u30A3: "hwi",
      \u30D5\u30A7: "hwe",
      \u30D5\u30A9: "hwo",
      \u30D5\u30E5: "hwyu",
      \u30D5\u30E7: "hwyo"
    },
    passport: {
      // 数字と記号
      "\uFF11": "1",
      "\uFF12": "2",
      "\uFF13": "3",
      "\uFF14": "4",
      "\uFF15": "5",
      "\uFF16": "6",
      "\uFF17": "7",
      "\uFF18": "8",
      "\uFF19": "9",
      "\uFF10": "0",
      "\uFF01": "!",
      "\u201C": '"',
      "\u201D": '"',
      "\uFF03": "#",
      "\uFF04": "$",
      "\uFF05": "%",
      "\uFF06": "&",
      "\u2019": "'",
      "\uFF08": "(",
      "\uFF09": ")",
      "\uFF1D": "=",
      "\uFF5E": "~",
      "\uFF5C": "|",
      "\uFF20": "@",
      "\u2018": "`",
      "\uFF0B": "+",
      "\uFF0A": "*",
      "\uFF1B": ";",
      "\uFF1A": ":",
      "\uFF1C": "<",
      "\uFF1E": ">",
      "\u3001": ",",
      "\u3002": ".",
      "\uFF0F": "/",
      "\uFF1F": "?",
      "\uFF3F": "_",
      "\u30FB": "\uFF65",
      "\u300C": '"',
      "\u300D": '"',
      "\uFF5B": "{",
      "\uFF5D": "}",
      "\uFFE5": "\\",
      "\uFF3E": "^",
      // 直音-清音(ア～ノ)
      \u3042: "a",
      \u3044: "i",
      \u3046: "u",
      \u3048: "e",
      \u304A: "o",
      \u30A2: "a",
      \u30A4: "i",
      \u30A6: "u",
      \u30A8: "e",
      \u30AA: "o",
      \u304B: "ka",
      \u304D: "ki",
      \u304F: "ku",
      \u3051: "ke",
      \u3053: "ko",
      \u30AB: "ka",
      \u30AD: "ki",
      \u30AF: "ku",
      \u30B1: "ke",
      \u30B3: "ko",
      \u3055: "sa",
      \u3057: "shi",
      \u3059: "su",
      \u305B: "se",
      \u305D: "so",
      \u30B5: "sa",
      \u30B7: "shi",
      \u30B9: "su",
      \u30BB: "se",
      \u30BD: "so",
      \u305F: "ta",
      \u3061: "chi",
      \u3064: "tsu",
      \u3066: "te",
      \u3068: "to",
      \u30BF: "ta",
      \u30C1: "chi",
      \u30C4: "tsu",
      \u30C6: "te",
      \u30C8: "to",
      \u306A: "na",
      \u306B: "ni",
      \u306C: "nu",
      \u306D: "ne",
      \u306E: "no",
      \u30CA: "na",
      \u30CB: "ni",
      \u30CC: "nu",
      \u30CD: "ne",
      \u30CE: "no",
      // 直音-清音(ハ～ヲ)
      \u306F: "ha",
      \u3072: "hi",
      \u3075: "fu",
      \u3078: "he",
      \u307B: "ho",
      \u30CF: "ha",
      \u30D2: "hi",
      \u30D5: "fu",
      \u30D8: "he",
      \u30DB: "ho",
      \u307E: "ma",
      \u307F: "mi",
      \u3080: "mu",
      \u3081: "me",
      \u3082: "mo",
      \u30DE: "ma",
      \u30DF: "mi",
      \u30E0: "mu",
      \u30E1: "me",
      \u30E2: "mo",
      \u3084: "ya",
      \u3086: "yu",
      \u3088: "yo",
      \u30E4: "ya",
      \u30E6: "yu",
      \u30E8: "yo",
      \u3089: "ra",
      \u308A: "ri",
      \u308B: "ru",
      \u308C: "re",
      \u308D: "ro",
      \u30E9: "ra",
      \u30EA: "ri",
      \u30EB: "ru",
      \u30EC: "re",
      \u30ED: "ro",
      \u308F: "wa",
      \u3090: "i",
      \u3091: "e",
      \u3092: "o",
      \u30EF: "wa",
      \u30F0: "i",
      \u30F1: "e",
      \u30F2: "o",
      // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
      \u304C: "ga",
      \u304E: "gi",
      \u3050: "gu",
      \u3052: "ge",
      \u3054: "go",
      \u30AC: "ga",
      \u30AE: "gi",
      \u30B0: "gu",
      \u30B2: "ge",
      \u30B4: "go",
      \u3056: "za",
      \u3058: "ji",
      \u305A: "zu",
      \u305C: "ze",
      \u305E: "zo",
      \u30B6: "za",
      \u30B8: "ji",
      \u30BA: "zu",
      \u30BC: "ze",
      \u30BE: "zo",
      \u3060: "da",
      \u3062: "ji",
      \u3065: "zu",
      \u3067: "de",
      \u3069: "do",
      \u30C0: "da",
      \u30C2: "ji",
      \u30C5: "zu",
      \u30C7: "de",
      \u30C9: "do",
      \u3070: "ba",
      \u3073: "bi",
      \u3076: "bu",
      \u3079: "be",
      \u307C: "bo",
      \u30D0: "ba",
      \u30D3: "bi",
      \u30D6: "bu",
      \u30D9: "be",
      \u30DC: "bo",
      \u3071: "pa",
      \u3074: "pi",
      \u3077: "pu",
      \u307A: "pe",
      \u307D: "po",
      \u30D1: "pa",
      \u30D4: "pi",
      \u30D7: "pu",
      \u30DA: "pe",
      \u30DD: "po",
      // 拗音-清音(キャ～リョ)
      \u304D\u3083: "kya",
      \u304D\u3085: "kyu",
      \u304D\u3087: "kyo",
      \u3057\u3083: "sha",
      \u3057\u3085: "shu",
      \u3057\u3087: "sho",
      \u3061\u3083: "cha",
      \u3061\u3085: "chu",
      \u3061\u3087: "cho",
      \u306B\u3083: "nya",
      \u306B\u3085: "nyu",
      \u306B\u3087: "nyo",
      \u3072\u3083: "hya",
      \u3072\u3085: "hyu",
      \u3072\u3087: "hyo",
      \u307F\u3083: "mya",
      \u307F\u3085: "myu",
      \u307F\u3087: "myo",
      \u308A\u3083: "rya",
      \u308A\u3085: "ryu",
      \u308A\u3087: "ryo",
      \u30AD\u30E3: "kya",
      \u30AD\u30E5: "kyu",
      \u30AD\u30E7: "kyo",
      \u30B7\u30E3: "sha",
      \u30B7\u30E5: "shu",
      \u30B7\u30E7: "sho",
      \u30C1\u30E3: "cha",
      \u30C1\u30E5: "chu",
      \u30C1\u30E7: "cho",
      \u30CB\u30E3: "nya",
      \u30CB\u30E5: "nyu",
      \u30CB\u30E7: "nyo",
      \u30D2\u30E3: "hya",
      \u30D2\u30E5: "hyu",
      \u30D2\u30E7: "hyo",
      \u30DF\u30E3: "mya",
      \u30DF\u30E5: "myu",
      \u30DF\u30E7: "myo",
      \u30EA\u30E3: "rya",
      \u30EA\u30E5: "ryu",
      \u30EA\u30E7: "ryo",
      // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
      \u304E\u3083: "gya",
      \u304E\u3085: "gyu",
      \u304E\u3087: "gyo",
      \u3058\u3083: "ja",
      \u3058\u3085: "ju",
      \u3058\u3087: "jo",
      \u3062\u3083: "ja",
      \u3062\u3085: "ju",
      \u3062\u3087: "jo",
      \u3073\u3083: "bya",
      \u3073\u3085: "byu",
      \u3073\u3087: "byo",
      \u3074\u3083: "pya",
      \u3074\u3085: "pyu",
      \u3074\u3087: "pyo",
      // くゎ: "",
      // ぐゎ: "",
      \u30AE\u30E3: "gya",
      \u30AE\u30E5: "gyu",
      \u30AE\u30E7: "gyo",
      \u30B8\u30E3: "ja",
      \u30B8\u30E5: "ju",
      \u30B8\u30E7: "jo",
      \u30C2\u30E3: "ja",
      \u30C2\u30E5: "ju",
      \u30C2\u30E7: "jo",
      \u30D3\u30E3: "bya",
      \u30D3\u30E5: "byu",
      \u30D3\u30E7: "byo",
      \u30D4\u30E3: "pya",
      \u30D4\u30E5: "pyu",
      \u30D4\u30E7: "pyo",
      // クヮ: "",
      // グヮ: "",
      // 小書きの仮名、符号
      \u3041: "a",
      \u3043: "i",
      \u3045: "u",
      \u3047: "e",
      \u3049: "o",
      \u3083: "ya",
      \u3085: "yu",
      \u3087: "yo",
      \u308E: "wa",
      \u30A1: "a",
      \u30A3: "i",
      \u30A5: "u",
      \u30A7: "e",
      \u30A9: "o",
      \u30E3: "ya",
      \u30E5: "yu",
      \u30E7: "yo",
      \u30EE: "wa",
      \u30F5: "ka",
      \u30F6: "ke",
      \u3093: "n",
      \u30F3: "n",
      // ー: "",
      "\u3000": " ",
      // 外来音(イェ～グォ)
      // いぇ: "",
      // うぃ: "",
      // うぇ: "",
      // うぉ: "",
      // きぇ: "",
      // くぁ: "",
      // くぃ: "",
      // くぇ: "",
      // くぉ: "",
      // ぐぁ: "",
      // ぐぃ: "",
      // ぐぇ: "",
      // ぐぉ: "",
      // イェ: "",
      // ウィ: "",
      // ウェ: "",
      // ウォ: "",
      \u30F4: "b"
      // ヴァ: "",
      // ヴィ: "",
      // ヴェ: "",
      // ヴォ: "",
      // ヴュ: "",
      // ヴョ: "",
      // キェ: "",
      // クァ: "",
      // クィ: "",
      // クェ: "",
      // クォ: "",
      // グァ: "",
      // グィ: "",
      // グェ: "",
      // グォ: "",
      // 外来音(シェ～フョ)
      // しぇ: "",
      // じぇ: "",
      // すぃ: "",
      // ずぃ: "",
      // ちぇ: "",
      // つぁ: "",
      // つぃ: "",
      // つぇ: "",
      // つぉ: "",
      // てぃ: "",
      // てゅ: "",
      // でぃ: "",
      // でゅ: "",
      // とぅ: "",
      // どぅ: "",
      // にぇ: "",
      // ひぇ: "",
      // ふぁ: "",
      // ふぃ: "",
      // ふぇ: "",
      // ふぉ: "",
      // ふゅ: "",
      // ふょ: "",
      // シェ: "",
      // ジェ: "",
      // スィ: "",
      // ズィ: "",
      // チェ: "",
      // ツァ: "",
      // ツィ: "",
      // ツェ: "",
      // ツォ: "",
      // ティ: "",
      // テュ: "",
      // ディ: "",
      // デュ: "",
      // トゥ: "",
      // ドゥ: "",
      // ニェ: "",
      // ヒェ: "",
      // ファ: "",
      // フィ: "",
      // フェ: "",
      // フォ: "",
      // フュ: "",
      // フョ: ""
    },
    hepburn: {
      // 数字と記号
      "\uFF11": "1",
      "\uFF12": "2",
      "\uFF13": "3",
      "\uFF14": "4",
      "\uFF15": "5",
      "\uFF16": "6",
      "\uFF17": "7",
      "\uFF18": "8",
      "\uFF19": "9",
      "\uFF10": "0",
      "\uFF01": "!",
      "\u201C": '"',
      "\u201D": '"',
      "\uFF03": "#",
      "\uFF04": "$",
      "\uFF05": "%",
      "\uFF06": "&",
      "\u2019": "'",
      "\uFF08": "(",
      "\uFF09": ")",
      "\uFF1D": "=",
      "\uFF5E": "~",
      "\uFF5C": "|",
      "\uFF20": "@",
      "\u2018": "`",
      "\uFF0B": "+",
      "\uFF0A": "*",
      "\uFF1B": ";",
      "\uFF1A": ":",
      "\uFF1C": "<",
      "\uFF1E": ">",
      "\u3001": ",",
      "\u3002": ".",
      "\uFF0F": "/",
      "\uFF1F": "?",
      "\uFF3F": "_",
      "\u30FB": "\uFF65",
      "\u300C": '"',
      "\u300D": '"',
      "\uFF5B": "{",
      "\uFF5D": "}",
      "\uFFE5": "\\",
      "\uFF3E": "^",
      // 直音-清音(ア～ノ)
      \u3042: "a",
      \u3044: "i",
      \u3046: "u",
      \u3048: "e",
      \u304A: "o",
      \u30A2: "a",
      \u30A4: "i",
      \u30A6: "u",
      \u30A8: "e",
      \u30AA: "o",
      \u304B: "ka",
      \u304D: "ki",
      \u304F: "ku",
      \u3051: "ke",
      \u3053: "ko",
      \u30AB: "ka",
      \u30AD: "ki",
      \u30AF: "ku",
      \u30B1: "ke",
      \u30B3: "ko",
      \u3055: "sa",
      \u3057: "shi",
      \u3059: "su",
      \u305B: "se",
      \u305D: "so",
      \u30B5: "sa",
      \u30B7: "shi",
      \u30B9: "su",
      \u30BB: "se",
      \u30BD: "so",
      \u305F: "ta",
      \u3061: "chi",
      \u3064: "tsu",
      \u3066: "te",
      \u3068: "to",
      \u30BF: "ta",
      \u30C1: "chi",
      \u30C4: "tsu",
      \u30C6: "te",
      \u30C8: "to",
      \u306A: "na",
      \u306B: "ni",
      \u306C: "nu",
      \u306D: "ne",
      \u306E: "no",
      \u30CA: "na",
      \u30CB: "ni",
      \u30CC: "nu",
      \u30CD: "ne",
      \u30CE: "no",
      // 直音-清音(ハ～ヲ)
      \u306F: "ha",
      \u3072: "hi",
      \u3075: "fu",
      \u3078: "he",
      \u307B: "ho",
      \u30CF: "ha",
      \u30D2: "hi",
      \u30D5: "fu",
      \u30D8: "he",
      \u30DB: "ho",
      \u307E: "ma",
      \u307F: "mi",
      \u3080: "mu",
      \u3081: "me",
      \u3082: "mo",
      \u30DE: "ma",
      \u30DF: "mi",
      \u30E0: "mu",
      \u30E1: "me",
      \u30E2: "mo",
      \u3084: "ya",
      \u3086: "yu",
      \u3088: "yo",
      \u30E4: "ya",
      \u30E6: "yu",
      \u30E8: "yo",
      \u3089: "ra",
      \u308A: "ri",
      \u308B: "ru",
      \u308C: "re",
      \u308D: "ro",
      \u30E9: "ra",
      \u30EA: "ri",
      \u30EB: "ru",
      \u30EC: "re",
      \u30ED: "ro",
      \u308F: "wa",
      \u3090: "i",
      \u3091: "e",
      \u3092: "o",
      \u30EF: "wa",
      \u30F0: "i",
      \u30F1: "e",
      \u30F2: "o",
      // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
      \u304C: "ga",
      \u304E: "gi",
      \u3050: "gu",
      \u3052: "ge",
      \u3054: "go",
      \u30AC: "ga",
      \u30AE: "gi",
      \u30B0: "gu",
      \u30B2: "ge",
      \u30B4: "go",
      \u3056: "za",
      \u3058: "ji",
      \u305A: "zu",
      \u305C: "ze",
      \u305E: "zo",
      \u30B6: "za",
      \u30B8: "ji",
      \u30BA: "zu",
      \u30BC: "ze",
      \u30BE: "zo",
      \u3060: "da",
      \u3062: "ji",
      \u3065: "zu",
      \u3067: "de",
      \u3069: "do",
      \u30C0: "da",
      \u30C2: "ji",
      \u30C5: "zu",
      \u30C7: "de",
      \u30C9: "do",
      \u3070: "ba",
      \u3073: "bi",
      \u3076: "bu",
      \u3079: "be",
      \u307C: "bo",
      \u30D0: "ba",
      \u30D3: "bi",
      \u30D6: "bu",
      \u30D9: "be",
      \u30DC: "bo",
      \u3071: "pa",
      \u3074: "pi",
      \u3077: "pu",
      \u307A: "pe",
      \u307D: "po",
      \u30D1: "pa",
      \u30D4: "pi",
      \u30D7: "pu",
      \u30DA: "pe",
      \u30DD: "po",
      // 拗音-清音(キャ～リョ)
      \u304D\u3083: "kya",
      \u304D\u3085: "kyu",
      \u304D\u3087: "kyo",
      \u3057\u3083: "sha",
      \u3057\u3085: "shu",
      \u3057\u3087: "sho",
      \u3061\u3083: "cha",
      \u3061\u3085: "chu",
      \u3061\u3087: "cho",
      \u306B\u3083: "nya",
      \u306B\u3085: "nyu",
      \u306B\u3087: "nyo",
      \u3072\u3083: "hya",
      \u3072\u3085: "hyu",
      \u3072\u3087: "hyo",
      \u307F\u3083: "mya",
      \u307F\u3085: "myu",
      \u307F\u3087: "myo",
      \u308A\u3083: "rya",
      \u308A\u3085: "ryu",
      \u308A\u3087: "ryo",
      \u30AD\u30E3: "kya",
      \u30AD\u30E5: "kyu",
      \u30AD\u30E7: "kyo",
      \u30B7\u30E3: "sha",
      \u30B7\u30E5: "shu",
      \u30B7\u30E7: "sho",
      \u30C1\u30E3: "cha",
      \u30C1\u30E5: "chu",
      \u30C1\u30E7: "cho",
      \u30CB\u30E3: "nya",
      \u30CB\u30E5: "nyu",
      \u30CB\u30E7: "nyo",
      \u30D2\u30E3: "hya",
      \u30D2\u30E5: "hyu",
      \u30D2\u30E7: "hyo",
      \u30DF\u30E3: "mya",
      \u30DF\u30E5: "myu",
      \u30DF\u30E7: "myo",
      \u30EA\u30E3: "rya",
      \u30EA\u30E5: "ryu",
      \u30EA\u30E7: "ryo",
      // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
      \u304E\u3083: "gya",
      \u304E\u3085: "gyu",
      \u304E\u3087: "gyo",
      \u3058\u3083: "ja",
      \u3058\u3085: "ju",
      \u3058\u3087: "jo",
      \u3062\u3083: "ja",
      \u3062\u3085: "ju",
      \u3062\u3087: "jo",
      \u3073\u3083: "bya",
      \u3073\u3085: "byu",
      \u3073\u3087: "byo",
      \u3074\u3083: "pya",
      \u3074\u3085: "pyu",
      \u3074\u3087: "pyo",
      // くゎ: "",
      // ぐゎ: "",
      \u30AE\u30E3: "gya",
      \u30AE\u30E5: "gyu",
      \u30AE\u30E7: "gyo",
      \u30B8\u30E3: "ja",
      \u30B8\u30E5: "ju",
      \u30B8\u30E7: "jo",
      \u30C2\u30E3: "ja",
      \u30C2\u30E5: "ju",
      \u30C2\u30E7: "jo",
      \u30D3\u30E3: "bya",
      \u30D3\u30E5: "byu",
      \u30D3\u30E7: "byo",
      \u30D4\u30E3: "pya",
      \u30D4\u30E5: "pyu",
      \u30D4\u30E7: "pyo",
      // クヮ: "",
      // グヮ: "",
      // 小書きの仮名、符号
      \u3041: "a",
      \u3043: "i",
      \u3045: "u",
      \u3047: "e",
      \u3049: "o",
      \u3083: "ya",
      \u3085: "yu",
      \u3087: "yo",
      \u308E: "wa",
      \u30A1: "a",
      \u30A3: "i",
      \u30A5: "u",
      \u30A7: "e",
      \u30A9: "o",
      \u30E3: "ya",
      \u30E5: "yu",
      \u30E7: "yo",
      \u30EE: "wa",
      \u30F5: "ka",
      \u30F6: "ke",
      \u3093: "n",
      \u30F3: "n",
      // ー: "",
      "\u3000": " ",
      // 外来音(イェ～グォ)
      \u3044\u3047: "ye",
      \u3046\u3043: "wi",
      \u3046\u3047: "we",
      \u3046\u3049: "wo",
      \u304D\u3047: "kye",
      \u304F\u3041: "kwa",
      \u304F\u3043: "kwi",
      \u304F\u3047: "kwe",
      \u304F\u3049: "kwo",
      \u3050\u3041: "gwa",
      \u3050\u3043: "gwi",
      \u3050\u3047: "gwe",
      \u3050\u3049: "gwo",
      \u30A4\u30A7: "ye",
      \u30A6\u30A3: "wi",
      \u30A6\u30A7: "we",
      \u30A6\u30A9: "wo",
      \u30F4: "vu",
      \u30F4\u30A1: "va",
      \u30F4\u30A3: "vi",
      \u30F4\u30A7: "ve",
      \u30F4\u30A9: "vo",
      \u30F4\u30E5: "vyu",
      \u30F4\u30E7: "vyo",
      \u30AD\u30A7: "kya",
      \u30AF\u30A1: "kwa",
      \u30AF\u30A3: "kwi",
      \u30AF\u30A7: "kwe",
      \u30AF\u30A9: "kwo",
      \u30B0\u30A1: "gwa",
      \u30B0\u30A3: "gwi",
      \u30B0\u30A7: "gwe",
      \u30B0\u30A9: "gwo",
      // 外来音(シェ～フョ)
      \u3057\u3047: "she",
      \u3058\u3047: "je",
      // すぃ: "",
      // ずぃ: "",
      \u3061\u3047: "che",
      \u3064\u3041: "tsa",
      \u3064\u3043: "tsi",
      \u3064\u3047: "tse",
      \u3064\u3049: "tso",
      \u3066\u3043: "ti",
      \u3066\u3085: "tyu",
      \u3067\u3043: "di",
      \u3067\u3085: "dyu",
      \u3068\u3045: "tu",
      \u3069\u3045: "du",
      \u306B\u3047: "nye",
      \u3072\u3047: "hye",
      \u3075\u3041: "fa",
      \u3075\u3043: "fi",
      \u3075\u3047: "fe",
      \u3075\u3049: "fo",
      \u3075\u3085: "fyu",
      \u3075\u3087: "fyo",
      \u30B7\u30A7: "she",
      \u30B8\u30A7: "je",
      // スィ: "",
      // ズィ: "",
      \u30C1\u30A7: "che",
      \u30C4\u30A1: "tsa",
      \u30C4\u30A3: "tsi",
      \u30C4\u30A7: "tse",
      \u30C4\u30A9: "tso",
      \u30C6\u30A3: "ti",
      \u30C6\u30E5: "tyu",
      \u30C7\u30A3: "di",
      \u30C7\u30E5: "dyu",
      \u30C8\u30A5: "tu",
      \u30C9\u30A5: "du",
      \u30CB\u30A7: "nye",
      \u30D2\u30A7: "hye",
      \u30D5\u30A1: "fa",
      \u30D5\u30A3: "fi",
      \u30D5\u30A7: "fe",
      \u30D5\u30A9: "fo",
      \u30D5\u30E5: "fyu",
      \u30D5\u30E7: "fyo"
    }
  };
  const reg_tsu = /(っ|ッ)([bcdfghijklmnopqrstuvwyz])/gm;
  const reg_xtsu = /っ|ッ/gm;
  let pnt = 0;
  let ch;
  let r;
  let result = "";
  if (system === ROMANIZATION_SYSTEM.PASSPORT) {
    str = str.replace(/ー/gm, "");
  }
  if (system === ROMANIZATION_SYSTEM.NIPPON || system === ROMANIZATION_SYSTEM.HEPBURN) {
    const reg_hatu = new RegExp(/(ん|ン)(?=あ|い|う|え|お|ア|イ|ウ|エ|オ|ぁ|ぃ|ぅ|ぇ|ぉ|ァ|ィ|ゥ|ェ|ォ|や|ゆ|よ|ヤ|ユ|ヨ|ゃ|ゅ|ょ|ャ|ュ|ョ)/g);
    let match;
    const indices = [];
    while ((match = reg_hatu.exec(str)) !== null) {
      indices.push(match.index + 1);
    }
    if (indices.length !== 0) {
      let mStr = "";
      for (let i = 0; i < indices.length; i++) {
        if (i === 0) {
          mStr += `${str.slice(0, indices[i])}'`;
        } else {
          mStr += `${str.slice(indices[i - 1], indices[i])}'`;
        }
      }
      mStr += str.slice(indices[indices.length - 1]);
      str = mStr;
    }
  }
  const max = str.length;
  while (pnt <= max) {
    if (r = romajiSystem[system][str.substring(pnt, pnt + 2)]) {
      result += r;
      pnt += 2;
    } else {
      result += (r = romajiSystem[system][ch = str.substring(pnt, pnt + 1)]) ? r : ch;
      pnt += 1;
    }
  }
  result = result.replace(reg_tsu, "$2$2");
  if (system === ROMANIZATION_SYSTEM.PASSPORT || system === ROMANIZATION_SYSTEM.HEPBURN) {
    result = result.replace(/cc/gm, "tc");
  }
  result = result.replace(reg_xtsu, "tsu");
  if (system === ROMANIZATION_SYSTEM.PASSPORT || system === ROMANIZATION_SYSTEM.HEPBURN) {
    result = result.replace(/nm/gm, "mm");
    result = result.replace(/nb/gm, "mb");
    result = result.replace(/np/gm, "mp");
  }
  if (system === ROMANIZATION_SYSTEM.NIPPON) {
    result = result.replace(/aー/gm, "\xE2");
    result = result.replace(/iー/gm, "\xEE");
    result = result.replace(/uー/gm, "\xFB");
    result = result.replace(/eー/gm, "\xEA");
    result = result.replace(/oー/gm, "\xF4");
  }
  if (system === ROMANIZATION_SYSTEM.HEPBURN) {
    result = result.replace(/aー/gm, "\u0101");
    result = result.replace(/iー/gm, "\u012B");
    result = result.replace(/uー/gm, "\u016B");
    result = result.replace(/eー/gm, "\u0113");
    result = result.replace(/oー/gm, "\u014D");
  }
  return result;
};
var getStrType = function(str) {
  let hasKJ = false;
  let hasHK = false;
  for (let i = 0; i < str.length; i++) {
    if (isKanji(str[i])) {
      hasKJ = true;
    } else if (isHiragana(str[i]) || isKatakana(str[i])) {
      hasHK = true;
    }
  }
  if (hasKJ && hasHK)
    return 1;
  if (hasKJ)
    return 0;
  if (hasHK)
    return 2;
  return 3;
};
var patchTokens = function(tokens) {
  for (let cr = 0; cr < tokens.length; cr++) {
    if (hasJapanese(tokens[cr].surface_form)) {
      if (!tokens[cr].reading) {
        if (tokens[cr].surface_form.split("").every(isKana)) {
          tokens[cr].reading = toRawKatakana(tokens[cr].surface_form);
        } else {
          tokens[cr].reading = tokens[cr].surface_form;
        }
      } else if (hasHiragana(tokens[cr].reading)) {
        tokens[cr].reading = toRawKatakana(tokens[cr].reading);
      }
    } else {
      tokens[cr].reading = tokens[cr].surface_form;
    }
  }
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].pos && tokens[i].pos === "\u52A9\u52D5\u8A5E" && (tokens[i].surface_form === "\u3046" || tokens[i].surface_form === "\u30A6")) {
      if (i - 1 >= 0 && tokens[i - 1].pos && tokens[i - 1].pos === "\u52D5\u8A5E") {
        tokens[i - 1].surface_form += "\u3046";
        if (tokens[i - 1].pronunciation) {
          tokens[i - 1].pronunciation += "\u30FC";
        } else {
          tokens[i - 1].pronunciation = `${tokens[i - 1].reading}\u30FC`;
        }
        tokens[i - 1].reading += "\u30A6";
        tokens.splice(i, 1);
        i--;
      }
    }
  }
  for (let j = 0; j < tokens.length; j++) {
    if (tokens[j].pos && (tokens[j].pos === "\u52D5\u8A5E" || tokens[j].pos === "\u5F62\u5BB9\u8A5E") && tokens[j].surface_form.length > 1 && (tokens[j].surface_form[tokens[j].surface_form.length - 1] === "\u3063" || tokens[j].surface_form[tokens[j].surface_form.length - 1] === "\u30C3")) {
      if (j + 1 < tokens.length) {
        tokens[j].surface_form += tokens[j + 1].surface_form;
        if (tokens[j].pronunciation) {
          tokens[j].pronunciation += tokens[j + 1].pronunciation;
        } else {
          tokens[j].pronunciation = `${tokens[j].reading}${tokens[j + 1].reading}`;
        }
        tokens[j].reading += tokens[j + 1].reading;
        tokens.splice(j + 1, 1);
        j--;
      }
    }
  }
  return tokens;
};
var kanaToHiragna = function(str) {
  return toRawHiragana(str);
};
var kanaToKatakana = function(str) {
  return toRawKatakana(str);
};
var kanaToRomaji = function(str, system) {
  return toRawRomaji(str, system);
};

// node_modules/kuroshiro/src/core.js
var Kuroshiro = class {
  /**
   * Constructor
   * @constructs Kuroshiro
   */
  constructor() {
    this._analyzer = null;
  }
  /**
   * Initialize Kuroshiro
   * @memberOf Kuroshiro
   * @instance
   * @returns {Promise} Promise object represents the result of initialization
   */
  async init(analyzer) {
    if (!analyzer || typeof analyzer !== "object" || typeof analyzer.init !== "function" || typeof analyzer.parse !== "function") {
      throw new Error("Invalid initialization parameter.");
    } else if (this._analyzer == null) {
      await analyzer.init();
      this._analyzer = analyzer;
    } else {
      throw new Error("Kuroshiro has already been initialized.");
    }
  }
  /**
   * Convert given string to target syllabary with options available
   * @memberOf Kuroshiro
   * @instance
   * @param {string} str Given String
   * @param {Object} [options] Settings Object
   * @param {string} [options.to="hiragana"] Target syllabary ["hiragana"|"katakana"|"romaji"]
   * @param {string} [options.mode="normal"] Convert mode ["normal"|"spaced"|"okurigana"|"furigana"]
   * @param {string} [options.romajiSystem="hepburn"] Romanization System ["nippon"|"passport"|"hepburn"]
   * @param {string} [options.delimiter_start="("] Delimiter(Start)
   * @param {string} [options.delimiter_end=")"] Delimiter(End)
   * @returns {Promise} Promise object represents the result of conversion
   */
  async convert(str, options) {
    options = options || {};
    options.to = options.to || "hiragana";
    options.mode = options.mode || "normal";
    options.romajiSystem = options.romajiSystem || ROMANIZATION_SYSTEM.HEPBURN;
    options.delimiter_start = options.delimiter_start || "(";
    options.delimiter_end = options.delimiter_end || ")";
    str = str || "";
    if (["hiragana", "katakana", "romaji"].indexOf(options.to) === -1) {
      throw new Error("Invalid Target Syllabary.");
    }
    if (["normal", "spaced", "okurigana", "furigana"].indexOf(options.mode) === -1) {
      throw new Error("Invalid Conversion Mode.");
    }
    const ROMAJI_SYSTEMS = Object.keys(ROMANIZATION_SYSTEM).map((e) => ROMANIZATION_SYSTEM[e]);
    if (ROMAJI_SYSTEMS.indexOf(options.romajiSystem) === -1) {
      throw new Error("Invalid Romanization System.");
    }
    const rawTokens = await this._analyzer.parse(str);
    const tokens = patchTokens(rawTokens);
    if (options.mode === "normal" || options.mode === "spaced") {
      switch (options.to) {
        case "katakana":
          if (options.mode === "normal") {
            return tokens.map((token) => token.reading).join("");
          }
          return tokens.map((token) => token.reading).join(" ");
        case "romaji":
          const romajiConv = (token) => {
            let preToken;
            if (hasJapanese(token.surface_form)) {
              preToken = token.pronunciation || token.reading;
            } else {
              preToken = token.surface_form;
            }
            return toRawRomaji(preToken, options.romajiSystem);
          };
          if (options.mode === "normal") {
            return tokens.map(romajiConv).join("");
          }
          return tokens.map(romajiConv).join(" ");
        case "hiragana":
          for (let hi = 0; hi < tokens.length; hi++) {
            if (hasKanji(tokens[hi].surface_form)) {
              if (!hasKatakana(tokens[hi].surface_form)) {
                tokens[hi].reading = toRawHiragana(tokens[hi].reading);
              } else {
                tokens[hi].reading = toRawHiragana(tokens[hi].reading);
                let tmp = "";
                let hpattern = "";
                for (let hc = 0; hc < tokens[hi].surface_form.length; hc++) {
                  if (isKanji(tokens[hi].surface_form[hc])) {
                    hpattern += "(.*)";
                  } else {
                    hpattern += isKatakana(tokens[hi].surface_form[hc]) ? toRawHiragana(tokens[hi].surface_form[hc]) : tokens[hi].surface_form[hc];
                  }
                }
                const hreg = new RegExp(hpattern);
                const hmatches = hreg.exec(tokens[hi].reading);
                if (hmatches) {
                  let pickKJ = 0;
                  for (let hc1 = 0; hc1 < tokens[hi].surface_form.length; hc1++) {
                    if (isKanji(tokens[hi].surface_form[hc1])) {
                      tmp += hmatches[pickKJ + 1];
                      pickKJ++;
                    } else {
                      tmp += tokens[hi].surface_form[hc1];
                    }
                  }
                  tokens[hi].reading = tmp;
                }
              }
            } else {
              tokens[hi].reading = tokens[hi].surface_form;
            }
          }
          if (options.mode === "normal") {
            return tokens.map((token) => token.reading).join("");
          }
          return tokens.map((token) => token.reading).join(" ");
        default:
          throw new Error("Unknown option.to param");
      }
    } else if (options.mode === "okurigana" || options.mode === "furigana") {
      const notations = [];
      for (let i = 0; i < tokens.length; i++) {
        const strType = getStrType(tokens[i].surface_form);
        switch (strType) {
          case 0:
            notations.push([tokens[i].surface_form, 1, toRawHiragana(tokens[i].reading), tokens[i].pronunciation || tokens[i].reading]);
            break;
          case 1:
            let pattern = "";
            let isLastTokenKanji = false;
            const subs = [];
            for (let c = 0; c < tokens[i].surface_form.length; c++) {
              if (isKanji(tokens[i].surface_form[c])) {
                if (!isLastTokenKanji) {
                  isLastTokenKanji = true;
                  pattern += "(.+)";
                  subs.push(tokens[i].surface_form[c]);
                } else {
                  subs[subs.length - 1] += tokens[i].surface_form[c];
                }
              } else {
                isLastTokenKanji = false;
                subs.push(tokens[i].surface_form[c]);
                pattern += isKatakana(tokens[i].surface_form[c]) ? toRawHiragana(tokens[i].surface_form[c]) : tokens[i].surface_form[c];
              }
            }
            const reg = new RegExp(`^${pattern}$`);
            const matches = reg.exec(toRawHiragana(tokens[i].reading));
            if (matches) {
              let pickKanji = 1;
              for (let c1 = 0; c1 < subs.length; c1++) {
                if (isKanji(subs[c1][0])) {
                  notations.push([subs[c1], 1, matches[pickKanji], toRawKatakana(matches[pickKanji])]);
                  pickKanji += 1;
                } else {
                  notations.push([subs[c1], 2, toRawHiragana(subs[c1]), toRawKatakana(subs[c1])]);
                }
              }
            } else {
              notations.push([tokens[i].surface_form, 1, toRawHiragana(tokens[i].reading), tokens[i].pronunciation || tokens[i].reading]);
            }
            break;
          case 2:
            for (let c2 = 0; c2 < tokens[i].surface_form.length; c2++) {
              notations.push([tokens[i].surface_form[c2], 2, toRawHiragana(tokens[i].reading[c2]), tokens[i].pronunciation && tokens[i].pronunciation[c2] || tokens[i].reading[c2]]);
            }
            break;
          case 3:
            for (let c3 = 0; c3 < tokens[i].surface_form.length; c3++) {
              notations.push([tokens[i].surface_form[c3], 3, tokens[i].surface_form[c3], tokens[i].surface_form[c3]]);
            }
            break;
          default:
            throw new Error("Unknown strType");
        }
      }
      let result = "";
      switch (options.to) {
        case "katakana":
          if (options.mode === "okurigana") {
            for (let n0 = 0; n0 < notations.length; n0++) {
              if (notations[n0][1] !== 1) {
                result += notations[n0][0];
              } else {
                result += notations[n0][0] + options.delimiter_start + toRawKatakana(notations[n0][2]) + options.delimiter_end;
              }
            }
          } else {
            for (let n1 = 0; n1 < notations.length; n1++) {
              if (notations[n1][1] !== 1) {
                result += notations[n1][0];
              } else {
                result += `<ruby>${notations[n1][0]}<rp>${options.delimiter_start}</rp><rt>${toRawKatakana(notations[n1][2])}</rt><rp>${options.delimiter_end}</rp></ruby>`;
              }
            }
          }
          return result;
        case "romaji":
          if (options.mode === "okurigana") {
            for (let n2 = 0; n2 < notations.length; n2++) {
              if (notations[n2][1] !== 1) {
                result += notations[n2][0];
              } else {
                result += notations[n2][0] + options.delimiter_start + toRawRomaji(notations[n2][3], options.romajiSystem) + options.delimiter_end;
              }
            }
          } else {
            result += "<ruby>";
            for (let n3 = 0; n3 < notations.length; n3++) {
              result += `${notations[n3][0]}<rp>${options.delimiter_start}</rp><rt>${toRawRomaji(notations[n3][3], options.romajiSystem)}</rt><rp>${options.delimiter_end}</rp>`;
            }
            result += "</ruby>";
          }
          return result;
        case "hiragana":
          if (options.mode === "okurigana") {
            for (let n4 = 0; n4 < notations.length; n4++) {
              if (notations[n4][1] !== 1) {
                result += notations[n4][0];
              } else {
                result += notations[n4][0] + options.delimiter_start + notations[n4][2] + options.delimiter_end;
              }
            }
          } else {
            for (let n5 = 0; n5 < notations.length; n5++) {
              if (notations[n5][1] !== 1) {
                result += notations[n5][0];
              } else {
                result += `<ruby>${notations[n5][0]}<rp>${options.delimiter_start}</rp><rt>${notations[n5][2]}</rt><rp>${options.delimiter_end}</rp></ruby>`;
              }
            }
          }
          return result;
        default:
          throw new Error("Invalid Target Syllabary.");
      }
    }
  }
};
var Util = {
  isHiragana,
  isKatakana,
  isKana,
  isKanji,
  isJapanese,
  hasHiragana,
  hasKatakana,
  hasKana,
  hasKanji,
  hasJapanese,
  kanaToHiragna,
  kanaToKatakana,
  kanaToRomaji
};
Kuroshiro.Util = Util;
var core_default = Kuroshiro;

// node_modules/kuroshiro/src/index.js
var src_default = core_default;

// node_modules/@sglkc/kuroshiro-analyzer-kuromoji/src/index.js
var import_kuromoji = __toESM(require_kuromoji());
var isNode = false;
var isBrowser = typeof window !== "undefined";
if (!isBrowser && typeof module !== "undefined" && module.exports) {
  isNode = true;
}
var Analyzer = class {
  /**
   * Constructor
   * @param {Object} [options] JSON object which have key-value pairs settings
   * @param {string} [options.dictPath] Path of the dictionary files
   */
  constructor({ dictPath } = {}) {
    this._analyzer = null;
    if (!dictPath) {
      if (isNode)
        this._dictPath = __require.resolve("@sglkc/kuromoji").replace(/src(?!.*src).*/, "dict/");
      else
        this._dictPath = "node_modules/@sglkc/kuromoji/dict/";
    } else {
      this._dictPath = dictPath;
    }
  }
  /**
   * Initialize the analyzer
   * @returns {Promise} Promise object represents the result of initialization
   */
  init() {
    return new Promise((resolve, reject) => {
      const self2 = this;
      if (this._analyzer == null) {
        import_kuromoji.default.builder({ dicPath: this._dictPath }).build((err, newAnalyzer) => {
          if (err) {
            return reject(err);
          }
          self2._analyzer = newAnalyzer;
          resolve();
        });
      } else {
        reject(new Error("This analyzer has already been initialized."));
      }
    });
  }
  /**
   * Parse the given string
   * @param {string} str input string
   * @returns {Promise} Promise object represents the result of parsing
   * @example The result of parsing
   * [{
   *     "surface_form": "黒白",    // 表層形
   *     "pos": "名詞",               // 品詞 (part of speech)
   *     "pos_detail_1": "一般",      // 品詞細分類1
   *     "pos_detail_2": "*",        // 品詞細分類2
   *     "pos_detail_3": "*",        // 品詞細分類3
   *     "conjugated_type": "*",     // 活用型
   *     "conjugated_form": "*",     // 活用形
   *     "basic_form": "黒白",      // 基本形
   *     "reading": "クロシロ",       // 読み
   *     "pronunciation": "クロシロ",  // 発音
   *     "verbose": {                 // Other properties
   *         "word_id": 413560,
   *         "word_type": "KNOWN",
   *         "word_position": 1
   *     }
   * }]
   */
  parse(str = "") {
    return new Promise((resolve, reject) => {
      if (str.trim() === "")
        return resolve([]);
      const result = this._analyzer.tokenize(str);
      for (let i = 0; i < result.length; i++) {
        result[i].verbose = {};
        result[i].verbose.word_id = result[i].word_id;
        result[i].verbose.word_type = result[i].word_type;
        result[i].verbose.word_position = result[i].word_position;
        delete result[i].word_id;
        delete result[i].word_type;
        delete result[i].word_position;
      }
      resolve(result);
    });
  }
};
var src_default2 = Analyzer;

// src/index.ts
globalThis.XMLHttpRequest = class {
  constructor() {
    this._headers = {};
    this.responseType = "";
    this.onload = null;
    this.onerror = null;
  }
  open(method, url) {
    this._method = method;
    this._url = url;
  }
  setRequestHeader(name, value) {
    this._headers[name] = value;
  }
  async send() {
    try {
      const res = await fetch(this._url, {
        method: this._method,
        headers: this._headers
      });
      this.status = res.status;
      this.response = await res.arrayBuffer();
      if (this.onload)
        this.onload();
    } catch (e) {
      if (this.onerror)
        this.onerror(e);
    }
  }
  get responseText() {
    return new TextDecoder().decode(new Uint8Array(this.response));
  }
};
var kuro = null;
async function ensureInitialized() {
  if (!kuro) {
    kuro = new src_default();
    await kuro.init(new src_default2({
      dictPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/"
    }));
  }
}
var src_default3 = {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(JSON.stringify({ uuid: crypto.randomUUID() }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    if (url.pathname === "/v1/chat/completions") {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({
          error: "Method Not Allowed",
          message: "Use POST on /v1/chat/completions"
        }), { status: 405, headers: { "Content-Type": "application/json" } });
      }
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const messages = body.messages;
      if (!Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({
          error: "Invalid format",
          message: "`messages` must be a non-empty array"
        }), { status: 400, headers: { "Content-Type": "application/json" } });
      }
      const last = messages[messages.length - 1];
      if (last.role !== "user" || typeof last.content !== "string") {
        return new Response(JSON.stringify({
          error: "Invalid message",
          message: "Last message must be { role: 'user', content: string }"
        }), { status: 400, headers: { "Content-Type": "application/json" } });
      }
      const prompt = last.content;
      let to;
      let mode;
      if (typeof body.model === "string" && body.model.includes("-")) {
        const parts = body.model.split("-");
        const validTo = ["hiragana", "katakana", "romaji"];
        const validMode = ["normal", "spaced", "okurigana", "furigana"];
        if (parts.length === 2 && validTo.includes(parts[0]) && validMode.includes(parts[1])) {
          to = parts[0];
          mode = parts[1];
        } else {
          to = validTo.includes(parts[0]) ? parts[0] : "hiragana";
          mode = validMode.includes(parts[1]) ? parts[1] : "normal";
        }
      } else {
        to = ["hiragana", "katakana", "romaji"].includes(body.model) ? body.model : "hiragana";
        mode = ["normal", "spaced", "okurigana", "furigana"].includes(body.mode) ? body.mode : "normal";
      }
      const stream = body.stream === true;
      try {
        await ensureInitialized();
      } catch (e) {
        return new Response(JSON.stringify({
          error: "Initialization failed",
          detail: e.toString()
        }), { status: 500, headers: { "Content-Type": "application/json" } });
      }
      let converted;
      try {
        converted = await kuro.convert(prompt, { to, mode });
      } catch (e) {
        return new Response(JSON.stringify({
          error: "Conversion failed",
          detail: e.toString()
        }), { status: 500, headers: { "Content-Type": "application/json" } });
      }
      if (!stream) {
        const responseBody = {
          id: `chatcmpl-${crypto.randomUUID()}`,
          object: "chat.completion",
          created: Math.floor(Date.now() / 1e3),
          model: body.model || to,
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: converted },
              finish_reason: "stop"
            }
          ],
          usage: {
            prompt_tokens: prompt.length,
            completion_tokens: converted.length,
            total_tokens: prompt.length + converted.length
          }
        };
        return new Response(JSON.stringify(responseBody), {
          headers: { "Content-Type": "application/json" }
        });
      }
      const encoder = new TextEncoder();
      const streamBody = new ReadableStream({
        async start(controller) {
          for (const ch of converted) {
            const chunk = {
              id: `chatcmpl-${crypto.randomUUID()}`,
              object: "chat.completion.chunk",
              created: Math.floor(Date.now() / 1e3),
              model: body.model || to,
              choices: [
                {
                  delta: { content: ch },
                  index: 0,
                  finish_reason: null
                }
              ]
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}

`));
            await new Promise((r) => setTimeout(r, 10));
          }
          const done = { choices: [{ delta: {}, index: 0, finish_reason: "stop" }] };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(done)}

`));
          controller.close();
        }
      });
      return new Response(streamBody, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive"
        }
      });
    }
    if (request.method === "POST" && url.pathname === "/") {
      let payload;
      try {
        payload = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const { text, to = "hiragana", mode = "normal" } = payload;
      if (typeof text !== "string") {
        return new Response(JSON.stringify({ error: "`text` must be a string" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      try {
        await ensureInitialized();
      } catch (e) {
        return new Response(JSON.stringify({ error: "Initialization failed", detail: e.toString() }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      try {
        const converted = await kuro.convert(text, { to, mode });
        return new Response(JSON.stringify({ converted }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: "Conversion failed", detail: e.toString() }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    return new Response(JSON.stringify({
      error: "Not Found",
      message: "Supported: GET /, POST /, POST /v1/chat/completions"
    }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
};
export {
  src_default3 as default
};
