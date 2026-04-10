import { works, testimonials } from './config.js'
document.addEventListener('DOMContentLoaded', () => {
  const workContainer = document.querySelector('.work_container')

  if (workContainer) {
    const worksHTML = works.map(work => {
      const buttons = work.buttons.map(btn => `
        <a class="button" href="${btn.link}">
          ${btn.text}
        </a>
      `).join('')

      return `
        <div class="work_card mix ${work.filter}">
          ${work.image ? `<img class="work_img" src="${work.image}" alt="${work.title}">` : ''}
          <h3 class="work_title">${work.title}</h3>
          <p class="work_subtitle">${work.description}</p>
          <div class="wbtn">${buttons}</div>
        </div>
      `
    }).join('')

    workContainer.insertAdjacentHTML('beforeend', worksHTML)
  }

  const swiperWrapper = document.querySelector('.testimonial_container .swiper-wrapper')

  if (swiperWrapper && window.Swiper) {
    const slidesHTML = testimonials.map(t => `
     <div class="testimonial_card swiper-slide">
    <div class="testimonial_header">
      ${t.avatar && t.avatar.trim() ? `<img class="testimonial_avatar" src="${t.avatar}" alt="${t.name}">` : ''}
      <a href="${t.profile}" class="testimonial_name">${t.name}</a>
    </div>
        <p class="testimonial_review">${t.review}</p>
      </div>
    `).join('')

    swiperWrapper.insertAdjacentHTML('beforeend', slidesHTML)

    new window.Swiper('.testimonial_container', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        450: { slidesPerView: 1 },
        768: { slidesPerView: 2, spaceBetween: 48 },
        1024: { slidesPerView: 2 }
      }
    })
  }

  if (window.mixitup && document.querySelector('.work_container')) {
    mixitup('.work_container', {
      selectors: { target: '.work_card' },
      animation: { duration: 300 }
    })
  }

  const linkwork = document.querySelectorAll('.work_item')

  linkwork.forEach(l => {
    l.addEventListener('click', function () {
      linkwork.forEach(el => el.classList.remove('active-work'))
      this.classList.add('active-work')
    })
  })

  window.addEventListener('scroll', () => {
    const header = document.getElementById('header')
    if (!header) return

    if (window.scrollY >= 50) {
      header.classList.add('scroll-header')
      header.classList.remove('transHead')
    } else {
      header.classList.remove('scroll-header')
      header.classList.add('transHead')
    }
  })

  const sections = document.querySelectorAll('section[id]')

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight
      const sectionTop = current.offsetTop - 58
      const sectionId = current.getAttribute('id')

      const link = document.querySelector('.nav_menu a[href*=' + sectionId + ']')
      if (!link) return

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link')
      } else {
        link.classList.remove('active-link')
      }
    })
  })

  const themeButton = document.getElementById('theme-button')
  const lightTheme = 'light-theme'
  const iconTheme = 'bx-sun'

  const selectedTheme = localStorage.getItem('selected-theme')
  const selectedIcon = localStorage.getItem('selected-icon')

  const getCurrentTheme = () =>
    document.body.classList.contains(lightTheme) ? 'light' : 'dark'

  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? 'bx bx-sun' : 'bx bx-moon'

  if (selectedTheme) {
    document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-sun' ? 'add' : 'remove'](iconTheme)
  }

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle(lightTheme)
      themeButton.classList.toggle(iconTheme)
      localStorage.setItem('selected-theme', getCurrentTheme())
      localStorage.setItem('selected-icon', getCurrentIcon())
    })
  }

  if (window.ScrollReveal) {
    const sr = ScrollReveal({
      distance: '100px',
      reset: false,
      duration: 1000,
      delay: 200
    })

    sr.reveal(`.home_data`, { origin: 'top', duration: 2500 })
    sr.reveal(`.home_social, .home_scroll`, { delay: 900, origin: 'bottom' })
    sr.reveal(`.work_card`, { origin: 'left', distance: '60px' })
    sr.reveal(`.section_subtitle, .section_title`, { distance: '0px' })
  }
})