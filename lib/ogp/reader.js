let Og = require('./og')
class Reader {
  constructor() {

  }
  parse(input) {
    let metas = input.head && input.head.meta;
    let objOg = new Og();
    if (!Array.isArray(metas)) return {};
    metas.forEach(function(meta) {
      objOg.parse(meta);
    })
    return objOg;
  }
}

module.exports = Reader;