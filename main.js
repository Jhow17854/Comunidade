// Abre e fecha o menu quando clicar no ícone: hambúrguer e x
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

toggle.forEach(element => {
  element.addEventListener('click', () => {
    nav.classList.toggle('show')
  })
})

// Esconde o menu quando clicar em um item do menu
const links = document.querySelectorAll('nav ul li a')

links.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('show')
  })
})

// Altera o header da página quando der scroll
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderOnScroll() {
  if (window.scrollY >= navHeight) {
    header.classList.add('scroll')
  } else {
    header.classList.remove('scroll')
  }
}

window.addEventListener('scroll', changeHeaderOnScroll)

// Testimonials carousel slider swiper
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: false,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 1,
      setWrapperSize: true
    }
  }
})

// ScrollReveal: Mostra elementos quando der scroll na página
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 600,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text, #services header,
  #services .card, #testimonials header, #testimonials .testimonials,
  #contact .social, #contact .title, footer .brand`,
  { interval: 100 }
)

// Botão voltar para o topo
const backToTopButton = document.querySelector('.back-to-top')

function showBackToTopButton() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

function smoothScrollToTop() {
  const currentPosition = window.pageYOffset
  const targetPosition = 0
  const distance = targetPosition - currentPosition
  const duration = 500
  const increments = 20
  let currentTime = 0

  function animateScroll() {
    currentTime += increments
    const easing = Math.easeInOutQuad(
      currentTime,
      currentPosition,
      distance,
      duration
    )
    window.scrollTo(0, easing)
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    }
  }

  animateScroll()
}

backToTopButton.addEventListener('click', smoothScrollToTop)

// Função para suavizar o movimento de scroll
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

window.addEventListener('scroll', showBackToTopButton)

// Menu ativo conforme a seção visível na página
const sections = document.querySelectorAll('main section[id]')
const navLinks = document.querySelectorAll('nav ul li a')

function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + window.innerHeight / 2

  sections.forEach(section => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')
    const navLink = document.querySelector(`nav ul li a[href*=${sectionId}]`)

    const isSectionInView =
      checkpoint >= sectionTop && checkpoint <= sectionTop + sectionHeight

    navLink.classList.toggle('active', isSectionInView)
  })
}

function scrollToSection(event) {
  event.preventDefault()

  const targetId = event.currentTarget.getAttribute('href')
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    const targetOffset = targetSection.offsetTop
    const scrollOptions = {
      top: targetOffset,
      behavior: 'smooth'
    }

    window.scrollTo(scrollOptions)
  }
}

navLinks.forEach(navLink => {
  navLink.addEventListener('click', scrollToSection)
})

window.addEventListener('scroll', activateMenuAtCurrentSection)

// Quando o conteúdo DOM for carregado
document.addEventListener('DOMContentLoaded', () => {
  const options = {
    strings: [
      'Ei, seja muito bem-vindo! É um prazer ter você aqui conosco. Neste espaço,\n você encontrará informações valiosas e recursos incríveis. Fique à vontade\n para explorar tudo com calma e aproveitar ao máximo o que temos a\n oferecer. Agradecemos de coração pela sua visita e esperamos que você se\n sinta em casa.'
    ],
    typeSpeed: 10,
    loop: false,
    loopCount: Infinity,
    showCursor: false,
    smartBackspace: false
  }

  new Typed('#home-title', options)
})
