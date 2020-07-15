const overlay = document.querySelector('.overlay')
const dropdownBtn = document.querySelector('.dropdown-btn')
const dropdownContent = document.querySelector('.dropdown-content')



const attachModalListeners = () => {
    document.querySelector('.overlay').addEventListener('click', toggleModal)
}

const detachModalListeners = () => {
    document.querySelector('.overlay').removeEventListener('click', toggleModal)
}

const toggleModal = () => {
    if (overlay.style.display === 'none') {
        overlay.style.display = 'block'
        dropdownContent.classList.add('show')
        attachModalListeners()
    } else {
        overlay.style.display = 'none'
        dropdownContent.classList.remove('show')
        detachModalListeners()
    }
}

dropdownBtn.addEventListener('click', toggleModal)