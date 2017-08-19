let assert = require('assert');
let Reader = new require('../').Reader;

describe('Meta Reader', function() {
  describe('Open Graph Reader', function() {
    it('parse required', function(done) {
      let reader = new Reader();
      let input = `<head>
      <meta property="og:title" content="Test title" />
      <meta property="og:description" content="Description" />
      <meta property="og:url" content="http://example.com" /></head>`;
      reader.parse(input)
        .then(
          (result)  => console.log(result) & done(),
          (err) => console.log(err) & done()
        );
    });
  
    it('parse optional', function(done) {
      let reader = new Reader();
      let input = `<head>
      <meta property="og:title" content="Test title" />
      <meta property="og:description" content="Description" />
      <meta property="og:url" content="http://example.com" />
      <meta property="og:image" content="http://example.com/ogp.jpg" />
      <meta property="og:image:secure_url" content="https://secure.example.com/ogp.jpg" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
      <meta property="og:image:alt" content="A shiny red apple with a bite taken out" /></head>`;
      console.log(input);
      reader.parse(input)
        .then(
          (result)  => console.log(result) & done(),
          (err) => console.log(err) & done()
        );
    });
  });
});