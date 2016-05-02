/*
  Reposition Slideout Container on scroll
*/

const slideout = document.querySelector('.slideout')
const headerHeight = document.querySelector('.bluemix-header').getBoundingClientRect().height

window.onload = ()=>{
  slideout.style.top = headerHeight - window.scrollY+'px'
}
window.addEventListener('scroll', ()=>{
    console.log(headerHeight - window.scrollY)
    slideout.style.top = headerHeight - window.scrollY+'px'
  }
)


document.querySelector('.title').addEventListener('click',()=>{
  window.scrollTo(200,200)
})