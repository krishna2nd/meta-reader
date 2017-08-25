const Og = require('./og')
class Reader {
  constructor() {

  }
  parse(input) {
    const metas = input.head && input.head.meta;
    const objOg = new Og();
    if (!Array.isArray(metas)) return {};
    metas.forEach(function(meta) {
      objOg.parse(meta);
    })
    return objOg;
  }
}

module.exports = Reader;