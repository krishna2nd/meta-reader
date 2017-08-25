const OgBase = require('./base'),
  Image = require('./image'),
  Video = require('./video'),
  Audio = require('./audio');

class Og extends OgBase {
  constructor(){
    super();
  }
  parse(objMeta) {
    const property = objMeta.$.property,
      content = objMeta.$.content,
      splits = property.split(':');
    let objProperty, ns, sns;

    splits.shift();
    ns = splits.shift();
    objProperty = this.match(ns, splits);
    sns = splits.shift();
    objProperty[sns?sns:ns] = content;
  }
  match(prop, sns) {
    const snsPush  = () => { if (!sns.length) sns.push('url'); }
    switch(prop) {
      case 'title':
      case 'type':
      case 'url':
      case 'description':
      case 'determiner':
      case 'locale':  
      case 'site_name':  return this.get(prop);
      case 'audio': 
        snsPush();
        return this.audio ? this.audio : (this.audio = new Audio());
      case 'image':
        snsPush();
        return this.image ? this.image : (this.image = new Image());
      case 'video':
        snsPush();
        return this.video ? this.video : (this.video = new Video());
      default: return this.get(prop);
    }
  }
}

module.exports = Og;
