var strings = {
  'de_DE': require('~assets/languages/de_DE.json'),
  'en_US': require('~assets/languages/en_US.json'),
  'es_ES': require('~assets/languages/es_ES.json'),
  'fi_FI': require('~assets/languages/fi_FI.json'),
  'fr_FR': require('~assets/languages/fr_FR.json'),
  'it_IT': require('~assets/languages/it_IT.json'),
  'nl_NL': require('~assets/languages/nl_NL.json'),
  'pl_PL': require('~assets/languages/pl_PL.json'),
  'pt_BR': require('~assets/languages/pt_BR.json'),
  'ru_RU': require('~assets/languages/ru_RU.json'),
  'sv_SE': require('~assets/languages/sv_SE.json'),
  'tr_TR': require('~assets/languages/tr_TR.json'),
  'zh_CN': require('~assets/languages/zh_CN.json'),
};

var translate = {
  defaultLang: 'en_US',
  currentLang: '',

  cleanLang: function(lang) {
    for(var i in strings)
      if (i.indexOf(lang)==0){
        return i;
      }
    return this.defaultLang;
  },

  initLang: function(lang) {
      //get defautls if lang not presented
      if (typeof lang == 'undefined'){
        lang = null;
        try{lang = localStorage.getItem('lang')||null;}catch(e){}

        if (lang==null){
          var browserLang = '';

          if (typeof navigator != 'undefined'){
            //navigator.languages is buggy, do not use it

            if (!browserLang)
              browserLang = (navigator||{}).language || (navigator||{}).userLanguage || '';
          }

          try{
            browserLang = browserLang.trim().substr(0,2).toLowerCase();
          } catch(e) {if (e) browserLang=''; }

          if (browserLang!=''){
            lang = this.cleanLang(browserLang);
          }
        }
      }

      if (typeof strings[lang] == 'undefined')
          lang = this.defaultLang;

      this.currentLang = lang;
      try{localStorage.setItem('lang', this.currentLang);}catch(e){}
  },

  s: function(key) {
    if (typeof strings[this.currentLang] != 'object')
      strings[this.currentLang] = JSON.parse(strings[this.currentLang]);

    if (typeof strings[this.defaultLang] != 'object')
      strings[this.defaultLang] = JSON.parse(strings[this.defaultLang]);

    if (strings[this.currentLang][key])
      return strings[this.currentLang][key];
    else if (strings[this.defaultLang][key])
      return strings[this.defaultLang][key];
    else
      return key;
  },

  format: function(key) {
    var formatted = this.s(key);
    for( var arg in arguments ) {
      if (arg>0)
        formatted = formatted.replace('{' + (arg-1) + '}', arguments[arg]);
    }
    return formatted;
  }
};

if (!translate.currentLang)
  translate.initLang();

export default translate;