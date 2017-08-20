let assert = require('assert');
let Reader = new require('../').Reader;

describe('Meta Reader', function() {
  describe('Open Graph Reader XML', function() {
    it('parse required', function(done) {
      let reader = new Reader();
      let input = `<head>
      <meta property="og:title" content="Test title" />
      <meta property="og:description" content="Description" />
      <meta property="og:url" content="http://example.com" /></head>`;
      let output = {
        title: 'Test title',
        description: 'Description',
        url: 'http://example.com' 
      };
      reader.parse(input)
        .then(
          (result)  => assert.deepEqual(result, output) & done(), done
        );
    });
    it('parse image', function(done) {
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
      let output = {
        title: 'Test title',
        description: 'Description',
        url: 'http://example.com',
        image:{
           url: 'http://example.com/ogp.jpg',
           secure_url: 'https://secure.example.com/ogp.jpg',
           type: 'image/jpeg',
           width: '400',
           height: '300',
           alt: 'A shiny red apple with a bite taken out' 
          }
        };
      reader.parse(input)
        .then(
          (result)  => assert.deepEqual(result, output) & done(), done
        );
    });
    it('parse video.movie', function(done) {
      let reader = new Reader();
      let input = `<head>
      <meta property="og:title" content="The Rock" />
      <meta property="og:type" content="video.movie" />
      <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
      <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
      </head>`;
      let output = {
        title: 'The Rock',
        type: 'video.movie',
        url: 'http://www.imdb.com/title/tt0117500/',
        image: {
          url: 'http://ia.media-imdb.com/images/rock.jpg'
        }
      };
      reader.parse(input)
        .then(
          (result)  => assert.deepEqual(result, output) & done(), done
        );
    });
    it('parse audio', function(done) {
      let reader = new Reader();
      let input = `<head>
      <meta property="og:audio" content="http://example.com/bond/theme.mp3" />
      <meta property="og:description" content="Sean Connery found fame and fortune as the suave, sophisticated British agent, James Bond." />
      <meta property="og:determiner" content="the" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:locale:alternate" content="fr_FR" />
      <meta property="og:locale:alternate" content="es_ES" />
      <meta property="og:site_name" content="IMDb" />
      <meta property="og:video" content="http://example.com/bond/trailer.swf" />
      </head>`;
      output = {
        audio: {
          types: {},
          url: 'http://example.com/bond/theme.mp3'
        },
        description: 'Sean Connery found fame and fortune as the suave, sophisticated British agent, James Bond.',
        determiner: 'the',
        locale: {
          content: 'en_GB', alternate: 'es_ES'
        },
        site_name: 'IMDb',
        video: {
          url: 'http://example.com/bond/trailer.swf'
        } 
      };
      reader.parse(input)
        .then(
          (result)  => assert.deepEqual(result, output) & done(), done
        );
    });
    it('parse multipple image', function(done) {
      let reader = new Reader();
      let input = `<head>
      <meta property="og:image" content="http://example.com/rock.jpg" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
      <meta property="og:image" content="http://example.com/rock2.jpg" />
      <meta property="og:image" content="http://example.com/rock3.jpg" />
      <meta property="og:image:height" content="1000" />
      </head>`;
      let output = {
        image:{
           url: 'http://example.com/rock3.jpg',
           width: '300',
           height: '1000' 
          }
        };
      reader.parse(input)
        .then(
          (result)  => assert.deepEqual(result, output) & done(), done
        );
    });
  });
  describe('Open Graph Reader Web', function() {
    it('from URL', function(done) {
      let reader = new Reader();
      let result = reader.parseUrl('http://www.imdb.com/title/tt0117500/');
      result.then(
        (result)  =>  assert.ok(result.title) &
          assert.ok(result.description) & done(), done
      );
    }).timeout(10000);
    it.skip('from amazon url', function(done) {
      let reader = new Reader();
      let result = reader.parseUrl(
        'http://www.amazon.com/Apple-iPhone-16gb-Space-Unlocked/dp/B00NQGP42Y/');
      result.then(
        (result)  =>  assert.ok(result.title) &
          assert.ok(result.description) & done(), done
      );
    });
  });
  
});

