let xs = require('xml2js');
let OpenGraphReader =  new require('../ogp').Reader;

class MetaReader {
  constructor() {

  }
}

MetaReader.prototype.parse = async function (input) {
  console.log('reader:: MetaReader: parse')
  let ogp = new OpenGraphReader();
  let result = await parseXmlString(input);
  return await ogp.parse(result);
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