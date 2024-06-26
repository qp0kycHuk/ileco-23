import { Fancybox } from '@fancyapps/ui'

function init() {
  window.Fancybox = Fancybox
  const options = {
    dragToClose: false,
    mainClass: 'fancybox-custom-modal',
    defaultType: 'ajax',
  }

  Fancybox.bind('[data-fancybox]')
  // @ts-ignore
  Fancybox.bind('[data-fancybox-modal]', options)

  // @ts-ignore
  Fancybox.modal = {}

  // @ts-ignore
  Fancybox.modal.open = (src) => {
    // @ts-ignore
    Fancybox.show([{ src, ...options }], options)
  }

  // @ts-ignore
  // Fancybox.modal.open('dialog-review.html')
}

interface CustomWindow extends Window {
  Fancybox: typeof Fancybox
}

declare let window: CustomWindow

export default { init }
