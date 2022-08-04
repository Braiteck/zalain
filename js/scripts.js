$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Источники
	$('.sources .spoler_btn').click(function () {
		$(this).toggleClass('active')
		$('.sources .items').slideToggle('300')
	})


	// Плавная прокрутка к якорю
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				if (e.target.localName == 'sup') {
					$('.sources .spoler_btn').addClass('active')
					$('.sources .items').show()
				}

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Фиксация блока
	$('aside .anchors').stick_in_parent({
		offset_top: parseInt($('*').css('scroll-margin-top'))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}


	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Моб. меню
	$('header .menu_btn').click((e) => {
		e.preventDefault()

		$('header .menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('.menu').toggleClass('show')
	})


	if (is_touch_device()) {
		// Подменю на тач скрине
		$('.menu .links > * > a.sub_link').addClass('touch_link')

		$('.menu .links > * > a.sub_link').click(function (e) {
			const $dropdown = $(this).next()

			if ($dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				$('.menu .links .sub_links').removeClass('show')
				$dropdown.addClass('show')

				$('body').css('cursor', 'pointer')
			}
		})

		// Закрываем под. меню при клике за её пределами
		$(document).click((e) => {
			if ($(e.target).closest('.menu .links').length === 0) {
				$('.menu .links .sub_links').removeClass('show')

				$('body').css('cursor', 'default')
			}
		})
	}


	// Огловление
	$('.articles_map .anchors .btn').click(function (e) {
		e.preventDefault()

		let btnIndex = $(this).parent().index()

		$('.articles_map .anchors .btn').removeClass('active')
		$('.articles_map .anchors > *:eq(' + btnIndex + ') .btn').addClass('active')
		$('.articles_map .anchors.bottom > *:eq(' + btnIndex + ') .btn').addClass('active')

		if ($(this).hasClass('all_btn')) {
			$('.articles_map .category').fadeIn(300)
			$('.articles_map .anchors.bottom').removeClass('hide')
		} else {
			$('.articles_map .category').hide()
			$('.articles_map .category' + $(this).data('anchor')).show()

			$('.articles_map .anchors.bottom').addClass('hide')
		}
	})


	// Статья
	calcPadding()
})



$(window).on('load', () => {
	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header:not(.absolute)').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



$(window).resize(() => {
	// Фикс. шапка
	headerInit = false
	$('.header_wrap').height('auto')

	setTimeout(() => {
		headerInit = true
		headerHeight = $('header').outerHeight()

		$('.header_wrap').height(headerHeight)

		headerInit && $(window).scrollTop() > 0
			? $('header').addClass('fixed')
			: $('header').removeClass('fixed')
	}, 100)


	// Статья
	calcPadding()
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Прогресс кролла
	if ($('.article_info').length) {
		let pixels = $(window).scrollTop() - $('.article_info').offset().top,
			articleHeight = $('.article_info').height(),
			progress = 100 * pixels / articleHeight

		if (progress >= 0 && progress <= 100 && progress > $('aside .progress .val span').text()) {
			$('aside .progress .bar > *').css('width', progress + '%')
			$('aside .progress .val span').text(progress.toFixed(0))
		}
	}
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 320) $('meta[name=viewport]').attr('content', 'width=320, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



const calcPadding = () => {
	if ($('.first_section').length) {
		let firstSectionH = $('.first_section').outerHeight()

		$('.wrap').css('padding-top', firstSectionH)
	}
}