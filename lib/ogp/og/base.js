class OgBase {
  html() {
    console.log(this);
  }
  set(prop, content) {
    if (!prop) {
      this.content = content;
      return;
    }
    this[prop] = content;
  }
  get(prop) {
    let ref =  this[prop];
    if (ref) {
      return ref;
    }
    return this;
  }
}
module.exports = OgBase;