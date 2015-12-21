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
      styles: {
        wrapper: null,
        value: null,
        elem: null,
      },
      hidden: $.noop,
      show: $.noop,
      callback: $.noop,
      supportPlaceHolder: (function() {
        var i = document.createElement('input');
        return 'placeholder' in i;
      })(),
    };

    var opts = $.extend({}, defaults, options);

    if (opts.debug != false) {
      if (opts.supportPlaceHolder) {
        return this;
      }
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

      if (opts.styles.wrapper) {
        $wrap.css(opts.styles.wrapper);
      }

      if (opts.styles.value) {
        $span.css(opts.styles.value);
      }

      if (opts.styles.elem) {
        $elem.css(opts.styles.elem);
      }

      $span.on('click', function() {
        $elem.focus();
      });

      var $eles = {
        $wrap: $wrap,
        $span: $span,
        $elem: $elem,
      };

      $elem.on({
          keyup: function() {
            if ($(this).val()) {
              $span.hide();
              opts.hidden($eles);
            }
          },

          blur: function() {
            if (!$(this).val()) {
              $span.show();
              opts.show($eles);
            }
          },
        });

      return $eles;
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
