
const menuItems = document.querySelectorAll('.nav a[href^="#"]')
const header = document.querySelector('.header')
const textHeader = document.querySelectorAll('.header .nav ul li a')
const btnTopo = document.querySelector('.btnTopo')
const writer = document.querySelector('.phrase')

function typeWriter() {
  const phrase = 'Web Developer'
  const phraseArray = phrase.split('')
  
  phraseArray.forEach((letra, i) => {
    setTimeout(() => {
      writer.innerHTML += letra
    }, 100 * i)
  })

  writer.innerHTML = ''
}

setInterval(() => {
  typeWriter()
}, 3000)

// funções de scroll
window.addEventListener('scroll', function () {

  if (window.scrollY != 0) {
    header.classList.add('menuColorized')
    textHeader.forEach(item => item.style.color = 'var(--colorPrimary)')
  } else {
    header.classList.remove('menuColorized')
    textHeader.forEach(item => item.style.color = '')
  }

  window.scrollY >= 200 
  ? btnTopo.classList.add('visible')
  : btnTopo.classList.remove('visible')

})

// função do botão de ir para o topo da página
btnTopo.onclick = function() {
  smoothScrollTo(0, 0, 1000)
}

menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick)
})  

function scrollToIdOnClick(e) {
  e.preventDefault()

  const element = e.target
  const id = element.getAttribute('href')
  const section = document.querySelectorAll(id)[0].offsetTop

  smoothScrollTo(0, section, 1000)
}

// função que cria a animação de scroll entre as páginas
 function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset
  const startY = window.scrollY || window.pageYOffset
  const distanceX = endX - startX
  const distanceY = endY - startY
  const startTime = new Date().getTime()

  duration = typeof duration !== 'undefined' ? duration : 400

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from
  }

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime
    const newX = easeInOutQuart(time, startX, distanceX, duration)
    const newY = easeInOutQuart(time, startY, distanceY, duration)
    if (time >= duration) {
      clearInterval(timer)
    }
    window.scroll(newX, newY)
  }, 1000 / 60) // 60 fps
}