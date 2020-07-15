const cakeNames = document.querySelectorAll('.cake-name')
const cakeImgs = document.querySelectorAll('.cake-img')

const toggleCakeModal = (e) => {
    const cakeModal = document.querySelector(`.${e.target.classList[1]}-modal`)
    const cakeOverlay = document.querySelector(`.${e.target.classList[1]}-overlay`)
    
    if (cakeModal.style.display === 'none') {
        cakeModal.style.display = 'block'
        cakeOverlay.addEventListener('click', toggleCakeModal)
    } else {
        cakeModal.style.display = 'none'
        cakeOverlay.removeEventListener('click', toggleCakeModal)
    }
}

for (let i=0; i<cakeNames.length; i++){
    cakeNames[i].addEventListener('click', toggleCakeModal)
    cakeImgs[i].addEventListener('click', toggleCakeModal)
}

