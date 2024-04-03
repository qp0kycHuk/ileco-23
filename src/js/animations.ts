import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function init() {
  gsap.registerPlugin(ScrollTrigger)

  // parallax
  {
    const items = document.querySelectorAll('[data-parallax]')

    items.forEach((item) => {
      const value = +(item.getAttribute('data-parallax') || 200)

      gsap.fromTo(
        item,
        { y: value / 2 },
        {
          y: -value / 2,
          scrollTrigger: {
            trigger: item.closest('section'),
            scrub: 2,
          },
        }
      )
    })
  }
}

export default { init }
