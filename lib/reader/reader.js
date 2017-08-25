const xs = require('xml2js'),
  request = require("request"),
  http = require('http'),
  OpenGraphReader =  new require('../ogp').Reader;

class MetaReader {
  constructor() {
  }
}

MetaReader.prototype.parseBase = async function (jsObj) {
  const ogp = new OpenGraphReader();
  return await ogp.parse(jsObj);
}

MetaReader.prototype.parse = async function (input) {
  const result = await parseXmlString(input);
  return await this.parseBase(result);
}
MetaReader.prototype.parseUrl = async function (url) {
  const req = new Promise(function(resolve, reject) {
    request(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error || new Error(http.STATUS_CODES[response.statusCode]));
        return;
      }
      resolve(body);
    });
  });
  const result  = await req;
  const metas = parseHtmlString(result);
  return await this.parseBase({
    head: {
      meta: metas
    }
  });
}

find = (inNodes, tag, filter) => {
  var nodes = [];
  for(let n = 0; n < inNodes.length; n++) {
    let node = inNodes[n];
    if(node.tagName === tag) {
      if (filter) {
        node = filter(node)
        if (node) {
          nodes.push(node);
        }
        continue;
      }
      nodes.push(node);
    }
  }
  return (nodes.length > 1 ? nodes : (nodes[0] || null))
}

parseHtmlString = (input) => {
  const parse5 = require('parse5');
  const document = parse5.parse(input);
  let html = find(document.childNodes, 'html'), head, metas; 
  if (html) {
    head = find(html.childNodes, 'head');
  }

  if (head) {
    metas = find(head.childNodes, 'meta', (n) => {
      const attr = n.attrs || [];
      let isOgMeta = false, node;
      attr.map(function(a) {
        if (a.name === 'property' && /og:/.test(a.value)) {
          node = {
            $: {
              property: a.value
            }
          };
          isOgMeta = true;
        }
        if (isOgMeta) {
          node.$.content = a.value;
        }
      });
      return node;
    });
  }

  return metas;
}

parseXmlString = (input) => new Promise(function(resolve, reject) {
  xs.parseString(input, function(err, result) {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  })
});

module.exports = MetaReader;
