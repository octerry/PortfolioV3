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

const hoverList = document.querySelectorAll('.clickable')

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
        document.body.classList.remove('phase2')
    }

    document.documentElement.style.setProperty("--background-x-percentage", (Math.cos(main.scrollTop/main.clientHeight/2*Math.PI) * 50 + 50) + "%");
    document.documentElement.style.setProperty("--background-y-percentage", (Math.sin(main.scrollTop/main.clientHeight/2*Math.PI) * 75 + 75) + "%");
})

hoverList.forEach(el => {
    el.addEventListener('mouseenter', () => { 
        cursor.classList.add('pointer');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('pointer');
    });
});
headerIcon.addEventListener('click', ()=>{
    headerIcon.classList.add('hidden')
    cursor.classList.add('scroll')
    cursor.innerHTML = "Scroll"
    main.scrollTo({top: 0, behavior: 'smooth'})
})