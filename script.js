// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ \‾‾\  /‾‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     |  \  \/  /
// | | | | | |        |  |    |  ___] |     / |     /   \    /
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \     |  |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\    |__|
// MADE ON EARTH BY HUMANS

const cursor = document.querySelector('#custom-cursor')
const main = document.querySelector('main')

const contactButton = document.querySelector('#header-contact')
const headerIcon = document.querySelector('#header-icon')

hoverList = [contactButton, headerIcon]

window.addEventListener("mousemove", (e)=> {
    document.body.style.cursor = 'none'
    cursor.style.top = e.clientY + "px"
    cursor.style.left = e.clientX + "px"
})

document.addEventListener("mouseleave", ()=> {
    cursor.style.display = 'none'
}) 

document.addEventListener("mouseenter", ()=> {
    cursor.style.display = 'flex'
})

main.addEventListener('scroll', ()=> {
    if (main.scrollTop/main.clientHeight >= .5) {
        headerIcon.classList.remove('hidden')
        cursor.classList.remove('scroll')
        cursor.innerHTML = ""
    } else {
        headerIcon.classList.add('hidden')
        cursor.classList.add('scroll')
        cursor.innerHTML = "Scroll"
    }
})

hoverList.forEach(el => {
    el.addEventListener('mouseenter', () => { 
        cursor.classList.add('pointer');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('pointer');
    });
});