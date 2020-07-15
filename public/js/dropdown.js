const overlay = document.querySelector('.overlay')
const dropdownBtn = document.querySelector('.dropdown-btn')
const dropdownContent = document.querySelector('.dropdown-content')



const attachModalListener = () => {
    document.querySelector('.overlay').addEventListener('click', toggleModal)
}

const detachModalListener = () => {
    document.querySelector('.overlay').removeEventListener('click', toggleModal)
}

const toggleModal = () => {
    if (overlay.style.display === 'none') {
        overlay.style.display = 'block'
        dropdownContent.classList.add('show')
        attachModalListener()
    } else {
        overlay.style.display = 'none'
        dropdownContent.classList.remove('show')
        detachModalListener()
    }
}

dropdownBtn.addEventListener('click', toggleModal)