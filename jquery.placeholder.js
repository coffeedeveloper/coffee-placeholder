(function ($) {
	$.fn.placeholder = function () {
		return this.each(function () {
			var $this = $(this);
			switch($this.attr('type').toLowerCase()){
				case 'text':
						$this.data({
							'placeholder': $this.attr('placeholder'),
							'color': $this.css('color')
						}).val($this.attr('placeholder')).css('color', '#999')
						$this.focus(function () {
							if ($(this).val() == $(this).data('placeholder'))
								$(this).val('')
							$(this).css('color', $(this).data('color'))
						}).blur(function () {
							if (!$(this).val() || $(this).val() == $(this).data('placeholder')) {
								$(this).val($(this).data('placeholder')).css('color', '#999')
							}
						})
					break;
				case 'password':
						var wrap = $('<label />')
						wrap.css('position', 'relative')
						var span = $('<span />')
						span.css({
							'position': 'absolute', 'left': $this.css('padding-left'),
							'color': '#999', 'font-size': $this.css('font-size')
						}).text($this.attr('placeholder')).attr('class', 'placeholder-text')
						$this.wrap(wrap)
						$this.after(span)
						span.css({
							'top' : '50%', 'margin-top':	span.height()/2 * -1
						})
						$this.focus(function () {
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
