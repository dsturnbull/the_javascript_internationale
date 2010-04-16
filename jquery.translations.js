$(function() {
  if (typeof $.internationale == 'undefined') $.internationale = {}
  $.internationale.locale = 'en'

  // expects { "locale": "xx" }
  $.ajax({
    type: 'GET',
    url: '/user/locale.json',
    dataType: 'json',
    async: false,
    success: function(data) {
      if (data) {
        $.internationale.locale = data.locale
      } else {
        $.internationale.locale = 'en'
      }
    }
  })

  // expects { "translations": { "en": { "foo": "bar", "baz": "poop" }, "ja": { "foo": "フー" } } }
  $.ajax({
    type: 'GET',
    url: '/translations.json',
    dataType: 'json',
    async: false,
    success: function(data) {
      $.internationale.translations = data.translations
    }
  })

  $.internationale.translate = function(key, options) {
    var translation = $.internationale.translations[$.internationale.locale][key];
    if (translation) {
      if (arguments.length > 1) {
        args = arguments[1];
        for (k in args) {
          translation = translation.replace('{{' + k + '}}', args[k]);
        }
      }
    } else {
      translation = key;
    }
    return translation;
  }

  $.t = $.internationale.translate;
})
