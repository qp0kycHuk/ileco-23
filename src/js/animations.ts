import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const gsapAnimation: Record<string, any> = {
  fadeInLeft: {
    from: { x: '-75', opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  fadeInRight: {
    from: { x: '75', opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  fadeInUp: {
    from: { y: '75', opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  fadeInDown: {
    from: { y: '-75', opacity: 0 },
    to: { y: 0, opacity: 1 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  scaleIn: {
    from: { scale: 1.5 },
    to: { scale: 1 },
  },
}

function init() {
  gsap.registerPlugin(ScrollTrigger)

  scrollInit()
  hover3dInit()

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

function scrollInit() {
  const scrollElements = document.querySelectorAll('[data-animation]')

  scrollElements.forEach((element) => {
    const key = element.getAttribute('data-animation')
    const duration = element.getAttribute('data-duration') || 1
    const end = element.getAttribute('data-end') || 'bottom 40px'
    const start = element.getAttribute('data-start') || 'top 100%'
    const delay = element.getAttribute('data-delay') || 0.1
    const actions = element.getAttribute('data-actions') || 'play reverse play reverse'

    const animation = gsapAnimation[key || '']

    if (!animation) {
      return
    }

    const instance = gsap.fromTo(element, animation.from, {
      ...animation.to,
      duration,
      delay,
      ease: 'elastic.out(1,1)',
      scrollTrigger: {
        trigger: element,
        start: start,
        end: end,
        toggleActions: actions,

        // scrub: true,
        // markers: true,
        // id: "scrub"
      },
    })

    instance.then(() => {
      gsap.set(element, {
        transform: 'none',
      })
    })
  })
}

function hover3dInit() {
  const limits = 15.0
  const cards = document.querySelectorAll('.hover3d-wrap')

  cards.forEach((card) => {
    const item = card.querySelector('.hover3d-target') as HTMLElement

    card.addEventListener('mousemove', (e) => {
      const event = e as MouseEvent
      const rect = (event.target as HTMLElement)?.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const offsetX = x / rect.width
      const offsetY = y / rect.height

      const rotateY = offsetX * (limits * 2) - limits
      const rotateX = offsetY * (limits * 2) - limits

      gsap.to(item, {
        ['--offset']: rotateX + rotateY + '%',
        ['--rotate-x']: rotateX,
        ['--rotate-y']: rotateY,
        rotateX: -rotateX,
        rotateY: rotateY,
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(item, {
        ['--offset']: '0%',
        ['--rotate-x']: 0,
        ['--rotate-y']: 0,
        rotateX: 0,
        rotateY: 0,
      })
    })
  })
}

export default { init }
