let OpenGraphReader =  new require('../ogp').Reader;

class MetaReader {
  constructor() {

  }
}

MetaReader.prototype.parse = function (input) {
  console.log('reader:: MetaReader: parse')
  let ogp = new OpenGraphReader();
  ogp.parse(input);
}
module.exports = MetaReader;