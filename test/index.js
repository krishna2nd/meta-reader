let assert = require('assert');
let Reader = new require('../').Reader;

describe('Meta Reader', function() {
  describe('Open Graph Reader', function() {
    it('parse', function() {
      let reader = new Reader();
      console.log(reader.parse("test"));
    });
  });
});