import ymaps from 'ymaps'

let mapInited = false

function init() {
  window.addEventListener('scroll', mapsInit, { once: true })
  document.addEventListener('click', mapsInit, { once: true })
  setTimeout(mapsInit, 2000)
}

function mapsInit() {
  if (mapInited) return
  mapInited = true

  if (document.getElementById('contact-map') && window.locations?.length) {
    ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then((maps: any) => {
      // const coords = window.coords
      // const center = [coords[0], coords[1]]

      const bounds = window.locations.reduce<number[][]>(
        (acc, current) => {
          return [
            [Math.min(acc[0][0], current.coords[0]), Math.min(acc[0][1], current.coords[1])],
            [Math.max(acc[1][0], current.coords[0]), Math.max(acc[1][1], current.coords[1])],
          ]
        },
        [
          [Infinity, Infinity],
          [-Infinity, -Infinity],
        ]
      )

      const options =
        window.locations.length > 1
          ? { bounds }
          : {
            center: window.locations[0]?.coords,
            zoom: 17,
          }

      const map = new maps.Map('contact-map', options)

      window.locations.forEach((location, index) => {
        const placemark = new maps.Placemark(
          location.coords,
          {
            // balloonContent: `
            //   <div class="text-center py-4 w-44">
            //     <div class="font-semibold ">${location.title}</div>
            //     <div class="mt-3 ">Режим работы:</div>
            //     <div class="mt-1  leading-normal max-sm:text-sm">
            //       ${location.shedule.join('<br>')}
            //     </div>
            //     <div class="mt-3 ">
            //       ${location.weekend}
            //     </div>
            //   </div>
            // `,
          },
          {
            iconLayout: 'default#image',
            iconImageHref: getIcon(location.color),
            iconImageSize: [50, 50],
            iconImageOffset: [-(50 / 2), -50],
            hasBalloon: true,
            openBalloonOnClick: true,
            hideIconOnBalloonOpen: false,
          }
        )

        map.controls.remove('geolocationControl')
        map.controls.remove('searchControl')
        map.controls.remove('trafficControl')
        map.controls.remove('typeSelector')
        map.controls.remove('fullscreenControl')
        // map.controls.remove('zoomControl')
        map.controls.remove('rulerControl')
        map.behaviors.disable(['scrollZoom'])
        map.geoObjects.add(placemark)
      })
    })
  }
}

function getIcon(color: string) {
  return `
  data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.9997 4.16675C15.7949 4.16675 8.33301 12.5055 8.33301 21.8751C8.33301 31.1713 13.6524 41.2759 21.9519 45.1552C23.8866 46.0595 26.1127 46.0595 28.0475 45.1552C36.3469 41.2759 41.6663 31.1713 41.6663 21.8751C41.6663 12.5055 34.2044 4.16675 24.9997 4.16675ZM24.9997 25.0001C27.3009 25.0001 29.1663 23.1346 29.1663 20.8334C29.1663 18.5322 27.3009 16.6667 24.9997 16.6667C22.6985 16.6667 20.833 18.5322 20.833 20.8334C20.833 23.1346 22.6985 25.0001 24.9997 25.0001Z' fill='%23${color}'/%3E%3Cpath d='M28.0475 45.1552L27.624 44.2492L27.624 44.2493L28.0475 45.1552ZM21.9519 45.1552L22.3753 44.2493L22.3753 44.2492L21.9519 45.1552ZM9.33301 21.8751C9.33301 12.9843 16.4179 5.16675 24.9997 5.16675V3.16675C15.172 3.16675 7.33301 12.0266 7.33301 21.8751H9.33301ZM24.9997 5.16675C33.5815 5.16675 40.6663 12.9843 40.6663 21.8751H42.6663C42.6663 12.0266 34.8274 3.16675 24.9997 3.16675V5.16675ZM40.6663 21.8751C40.6663 30.8664 35.5019 40.567 27.624 44.2492L28.4709 46.0611C37.1919 41.9848 42.6663 31.4762 42.6663 21.8751H40.6663ZM27.624 44.2493C25.9576 45.0281 24.0417 45.0281 22.3753 44.2493L21.5285 46.0611C23.7316 47.0909 26.2678 47.0909 28.4709 46.0611L27.624 44.2493ZM22.3753 44.2492C14.4974 40.567 9.33301 30.8664 9.33301 21.8751H7.33301C7.33301 31.4762 12.8075 41.9848 21.5285 46.0611L22.3753 44.2492ZM28.1663 20.8334C28.1663 22.5823 26.7486 24.0001 24.9997 24.0001V26.0001C27.8531 26.0001 30.1663 23.6869 30.1663 20.8334H28.1663ZM24.9997 24.0001C23.2508 24.0001 21.833 22.5823 21.833 20.8334H19.833C19.833 23.6869 22.1462 26.0001 24.9997 26.0001V24.0001ZM21.833 20.8334C21.833 19.0845 23.2508 17.6667 24.9997 17.6667V15.6667C22.1462 15.6667 19.833 17.9799 19.833 20.8334H21.833ZM24.9997 17.6667C26.7486 17.6667 28.1663 19.0845 28.1663 20.8334H30.1663C30.1663 17.9799 27.8531 15.6667 24.9997 15.6667V17.6667Z' fill='white'/%3E%3C/svg%3E
  `
}

export default { init }

interface CustomWindow extends Window {
  coords: [number, number]
  locations: Location[]
}

interface Location {
  coords: [number, number]
  color: string
}

declare let window: CustomWindow
