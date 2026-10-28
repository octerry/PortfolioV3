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

const detailButton = document.querySelector('#detail-button')
const detailModal = document.querySelector('#detail-modal')

const blueFile = document.querySelector('#blue-file')
const orangeFile = document.querySelector('#orange-file')
const redFile = document.querySelector('#red-file')
const bigFileModal = document.querySelector('#file-modal')
const fileModal = document.querySelector('#file-modal-scrollable')
const filePart = document.querySelectorAll('.detail-modal-section')
const fileDownArrow = document.querySelector('#file-down-arrow')

const fileModalTitle = document.querySelector('#file-modal-title')
const blueFileContent = document.querySelectorAll('.blue-file-content')
const orangeFileContent = document.querySelectorAll('.orange-file-content')
const redFileContent = document.querySelectorAll('.red-file-content')

const hoverList = document.querySelectorAll('.clickable')
const isMobile = checkMobile()

window.addEventListener("mousemove", (e)=> {
    if (!isMobile) {
        document.body.style.cursor = 'none'
        cursor.style.top = e.clientY + "px"
        cursor.style.left = e.clientX + "px"
    }
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
    } else {
        if (main.scrollTop/main.clientHeight > 4) {
            document.documentElement.style.setProperty("--background-color1", `rgb(22,29,20)`)
            document.documentElement.style.setProperty("--background-color2", `rgb(38,58,38)`)
        } else {
            document.documentElement.style.setProperty("--background-color1", `#110e15`)
            document.documentElement.style.setProperty("--background-color2", `#2A263A`)
        }
    }

    // Animation d'apparition
    main.children[Math.floor(main.scrollTop/main.clientHeight+.3) + 1].classList.add('appear')

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
    main.scrollTo({top: mainSubsection.clientHeight * 2, behavior: 'smooth'})
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

detailButton.addEventListener('click', ()=>{
    main.style.overflowY = "hidden";
    detailModal.classList.remove('hidden')
})

blueFile.addEventListener('click', ()=>{
    bigFileModal.scrollTo({top: -1000})
    bigFileModal.classList.remove('downed')

    fileModalTitle.innerHTML = "Experiences professionelles"

    blueFileContent.forEach(blue => {
        blue.style.display = "block";
    });

    orangeFileContent.forEach(orange => {
        orange.style.display = "none";
    });

    redFileContent.forEach(red => {
        red.style.display = "none";
    });
})

orangeFile.addEventListener('click', ()=>{
    bigFileModal.scrollTo({top: -1000})
    bigFileModal.classList.remove('downed')

    fileModalTitle.innerHTML = "Quelques autres projets"

    orangeFileContent.forEach(orange => {
        orange.style.display = "block";
    });

    blueFileContent.forEach(blue => {
        blue.style.display = "none";
    });

    redFileContent.forEach(red => {
        red.style.display = "none";
    });
})

redFile.addEventListener('click', ()=>{
    bigFileModal.scrollTo({top: -1000})
    bigFileModal.classList.remove('downed')

    fileModalTitle.innerHTML = "Mes experimentations"

    redFileContent.forEach(red => {
        red.style.display = "block";
    });

    blueFileContent.forEach(blue => {
        blue.style.display = "none";
    });

    orangeFileContent.forEach(orange => {
        orange.style.display = "none";
    });
})

fileDownArrow.addEventListener('click', ()=>{
    bigFileModal.classList.add('downed')
})

window.addEventListener('click', (e)=>{
    if (!projectModal.contains(e.target) && !projectRow.contains(e.target) && !projectFrigo.contains(e.target)) {
        projectModal.classList.add('hidden')
    }

    if (!detailModal.contains(e.target) && !detailButton.contains(e.target)) {
        detailModal.classList.add('hidden')
        main.style.overflowY = "scroll";
    }
})

bigFileModal.addEventListener('click', (e)=>{
    if (!fileModal.contains(e.target)) {
        bigFileModal.classList.add('downed')
    }
})

// Source - https://stackoverflow.com/a/11381730
function checkMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

window.addEventListener('keydown', (e)=>{
    if (e.code == "ArrowUp") {
        main.scrollTo({top: main.scrollTop - mainSubsection.clientHeight, behavior: 'smooth'})
    }
    if (e.code == "ArrowDown") {
        main.scrollTo({top: main.scrollTop + mainSubsection.clientHeight, behavior: 'smooth'})
    }
})