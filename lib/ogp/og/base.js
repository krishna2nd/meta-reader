class OgBase {
  html() {

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
      if (typeof ref === 'string') {
        ref = {
          content: ref
        };
        this[prop] = ref;
      }
      return ref;
    }
    return this;
  }
}
module.exports = OgBase;
