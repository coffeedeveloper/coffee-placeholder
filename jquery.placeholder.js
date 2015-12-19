;(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function($) {

  $.fn.placeholder = function(options) {
    var defaults = {
      fontColor: '#999',
      attr: 'placeholder',
      valueHolder: false,
      debug: false,
      supportPlaceHolder: (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
      })(),
    };

    var opts = $.extend({}, defaults, options);

    if (opts.supportPlaceHolder) {
      return this;
    }

    var wrapElem = function($elem) {
      var $wrap = $('<div />').addClass('cf-placeholder-wrapper'),
          $span = $('<span />').addClass('cf-placeholder-value');

      $wrap.css({
        position: 'relative',
        display: 'inline-block',
      });

      $span
        .css({
          position: 'absolute',
          left: $elem.css('padding-left'),
          color: opts.fontColor,
          fontSize: $elem.css('font-size'),
          zIndex: -1,
        })
        .text($elem.attr(opts.attr));

      $elem.css({
        backgroundColor: 'transparent',
      });

      $elem.wrap($wrap);
      $elem.after($span);

      $span.css({
        top: '50%', 'margin-top':  $span.height() / 2 * -1,
      });

      $elem.on({
          keyup: function() {
            if ($(this).val()) {
              $span.hide();
            }
          },

          blur: function() {
            if (!$(this).val()) {
              $span.show();
            }
          },
        });

      return {
        $wrap: $wrap,
        $span: $span,
        $elem: $elem,
      };
    };

    return this.each(function() {
      var $elem = $(this);
      switch ($elem.attr('type').toLowerCase()){
        case 'url':
        case 'email':
        case 'tel':
        case 'number':
        case 'text':
          if (opts.valueHolder) {
            $elem
              .data({
                placeholder: $elem.attr(opts.attr),
                color: $elem.css('color'),
              })
              .val($elem.attr(opts.attr))
              .css('color', opts.fontColor)
              .on({
                focus: function() {
                  var $this = $(this);
                  var v = $.trim($this.val());

                  if (v == $this.attr(opts.attr)) {
                    $this.val('');
                  }

                  $this.css('color', $this.data('color'));
                },

                blur: function() {
                  var $this = $(this);
                  var v = $.trim($this.val());

                  if (!v || v == $this.data('placeholder')) {
                    $this
                      .val($this.data('placeholder'))
                      .css('color', opts.fontColor);
                  }
                },
              });
          } else {
            wrapElem($elem);
          }

          break;
        case 'password':
          wrapElem($elem);
          break;
      }
    });
  };
}));
