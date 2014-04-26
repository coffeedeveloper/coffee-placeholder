﻿(function ($) {
	$.fn.placeholder = function (options) {
    var defaults = {
      fontColor: '#999',
      attr: 'xxoo',
      supportPlaceHolder: (function () {
        var i = document.createElement('input');
        return 'placeholder' in i;
      })()
    };

    var opts = $.extend({}, defaults, options);

		return this.each(function () {
			var $elem = $(this);
			switch($elem.attr('type').toLowerCase()){
				case 'text':
						$elem
              .data({
                'placeholder': $elem.attr(opts.attr),
                'color': $elem.css('color')
              })
              .val($elem.attr(opts.attr))
              .css('color', opts.fontColor);
						$elem
              .on({
                'focus': function () {
                  if ($.trim($elem.val()) == $elem.data('placeholder')){
                    $elem.val('');
                  }
                  $elem.css('color', $elem.data('color'));
                },
                'blur': function () {
                  var v = $.trim($elem.val());
                  if (!v || v == $elem.data('placeholder')) {
                    $elem
                      .val($elem.data('placeholder'))
                      .css('color', opts.fontColor);
                  }
                }
              });
					break;
				case 'password':
						var wrap = $('<label />'),
                span = $('<span />');
						wrap.css('position', 'relative')
						span
              .css({
                'position': 'absolute', 'left': $elem.css('padding-left'),
                'color': '#999', 'font-size': $elem.css('font-size')
              })
              .text($elem.attr(opts.attr))
              .attr('class', 'placeholder-text')
						$elem.wrap(wrap)
						$elem.after(span)
						span.css({
							'top' : '50%', 'margin-top':	span.height()/2 * -1
						})
						$elem.focus(function () {
							$(this).parent().find('.placeholder-text').hide()
						}).blur(function () {
							if (!$(this).val()) 
								$(this).parent().find('.placeholder-text').show()
						})
					break;
			}
		})
	}
})(jQuery)
