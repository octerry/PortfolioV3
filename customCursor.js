// Coucou toi qui regarde dans le code


// /‾‾‾‾‾\ /‾‾‾‾‾] [‾‾‾‾‾‾‾‾] |‾‾‾‾‾] |‾‾‾‾‾\ |‾‾‾‾‾\ \‾‾\  /‾‾/
// | |‾| | | |‾‾‾   ‾‾|  |‾‾  | |‾‾‾  |     | |     |  \  \/  /
// | | | | | |        |  |    |  ___] |     / |     /   \    /
// | |_| | | |___     |  |    | |___  | |\ \  | |\ \     |  |
// \_____/ \_____]    |__|    |_____] |_| \_\ |_| \_\    |__|
// MADE ON EARTH BY HUMANS

const cursor = document.querySelector('#custom-cursor')
const main = document.querySelector('main')
const mainSubsection = document.querySelector('.main-subsection')
const backgroundImage = document.querySelector('#background-image')

const contactSection = document.querySelector('#contact-section')
const contactButton = document.querySelector('#header-contact')
const headerIcon = document.querySelector('#header-icon')

const projectRow = document.querySelector('#project-row')
const projectDewey = document.querySelector('#project-dewey')
const projectFrigo = document.querySelector('#project-frigo')
const projectSite = document.querySelector('#project-site')
const projectModal = document.querySelector('#project-modal')
const projectSubsection = document.querySelectorAll('.project-modal-subsection')

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
    // Changements à la sortie/entrée du homescreen
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

    // Dégradé à l'entrée de la subsection
    if (3.5 <= (main.scrollTop/main.clientHeight) && (main.scrollTop/main.clientHeight) <= 4) {
        const unit = (main.scrollTop/main.clientHeight - 3.5) * 2
        const startColors = [[24,20,29],[42,38,58]]
        const endColors = [[22,29,20],[38,58,38]]

        const r1 = (endColors[0][0] - startColors[0][0]) * unit + startColors[0][0]
        const g1 = (endColors[0][1] - startColors[0][1]) * unit + startColors[0][1]
        const b1 = (endColors[0][2] - startColors[0][2]) * unit + startColors[0][2]

        const r2 = (endColors[1][0] - startColors[1][0]) * unit + startColors[1][0]
        const g2 = (endColors[1][1] - startColors[1][1]) * unit + startColors[1][1]
        const b2 = (endColors[1][2] - startColors[1][2]) * unit + startColors[1][2]

        document.documentElement.style.setProperty("--background-color1", `rgb(${r1},${g1},${b1})`);
        document.documentElement.style.setProperty("--background-color2", `rgb(${r2},${g2},${b2})`);
    }

    // Actualisation du fond qui tourne
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

contactButton.addEventListener('click', ()=>{
    headerIcon.classList.remove('hidden')
    cursor.classList.remove('scroll')
    cursor.innerHTML = ""
    main.scrollTo({top: contactSection.getBoundingClientRect().top + contactSection.clientHeight/2, behavior: 'smooth'})
})

projectRow.addEventListener('click', ()=>{
    projectSubsection[0].href = 'https://octerry.github.io/RankedOnlineWankul'
    projectSubsection[1].href = 'https://github.com/octerry/RankedOnlineWankul'
    projectModal.classList.remove('hidden')
})

projectFrigo.addEventListener('click', ()=>{
    projectSubsection[0].href = 'https://octerry.github.io/MonFrigo/'
    projectSubsection[1].href = 'https://github.com/octerry/MonFrigo'
    projectModal.classList.remove('hidden')
})

projectSite.addEventListener('click', ()=>{
    main.scrollTo({top: mainSubsection.clientHeight * 3, behavior: 'smooth'})
})

window.addEventListener('click', (e)=>{
    if (!projectModal.contains(e.target) && !projectRow.contains(e.target) && !projectFrigo.contains(e.target)) {
        projectModal.classList.add('hidden')
    }
})