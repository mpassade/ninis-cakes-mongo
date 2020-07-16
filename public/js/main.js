const overlay = document.querySelector('.overlay')
const dropdownBtn = document.querySelector('.dropdown-btn')
const dropdownContent = document.querySelector('.dropdown-content')
const cakeNames = document.querySelectorAll('.cake-name')
const cakeImgs = document.querySelectorAll('.cake-img')
const allCakeContent = document.querySelectorAll('.cake-modal-content')
const closeBtn = document.querySelector('.close')

const toggleModal = (e) => {
    if (e.target!==overlay){
        const cakeContent = document.querySelector(`.${e.target.classList[1]}-content`)

        overlay.style.display = 'block'
        overlay.addEventListener('click', toggleModal)
        if (e.target.classList[0]==='cake-name' ||
            e.target.classList[0]==='cake-img'){
                cakeContent.style.display = 'block'
        } else {
            dropdownContent.classList.add('show')
        }
    } else {
        overlay.style.display = 'none'
        overlay.removeEventListener('click', toggleModal)
        dropdownContent.classList.remove('show')

        for (const cake of allCakeContent){
            if (cake.style.display==='block'){
                cake.style.display = 'none'
            }
        }
    }
}

const closeMsg = () => {
    closeBtn.parentElement.style.display = 'none'
}

for (let i=0; i<cakeNames.length; i++){
    cakeNames[i].addEventListener('click', toggleModal)
    cakeImgs[i].addEventListener('click', toggleModal)
}

dropdownBtn.addEventListener('click', toggleModal)

closeBtn.addEventListener('click', closeMsg)