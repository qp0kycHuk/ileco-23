import Swiper from 'swiper'
import { Autoplay, Controller, Navigation, Pagination } from 'swiper/modules'

Swiper.use([Autoplay, Controller, Navigation, Pagination])

// @ts-ignore
window.Swiper = Swiper

function init() {
  // temp
}

export default { init }
