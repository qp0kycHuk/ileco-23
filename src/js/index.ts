import showPass from './show-pass'
import theme from './theme'
import fancybox from './fancybox'
import phonemask from './phonemask/phonemask'
import scrollTo from './scrollTo'
import tab from 'npm-kit-tab'
import toggle from 'npm-kit-toggle'
import ripple from '@qpokychuk/ripple'
import swiper from './swiper'
import animations from './animations'
import { throttle } from 'throttle-debounce'

import '../scss/index.scss'
import ymaps from './ymaps'

window.addEventListener('DOMContentLoaded', () => loadHandler())

function loadHandler() {
  showPass.init()
  scrollTo.init()
  tab.init()
  toggle.init()
  ripple.init()
  theme.init()
  fancybox.init()
  phonemask.init('[type="tel"]')
  ymaps.init()

  ripple.attach('.btn')
  ripple.attach('.waved')
  ripple.deAttach('.btn-text')

  animations.init()

  swiper.init()
  scrollHandler()
  window.addEventListener('scroll', throttle(1000 / 60, scrollHandler))
}

function scrollHandler() {
  const rect = document.querySelector('.nav')?.getBoundingClientRect()

  document.body.classList.toggle('scroll-top', rect?.top !== 0)
}
