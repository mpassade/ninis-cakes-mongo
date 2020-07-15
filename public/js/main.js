const modal = document.querySelector('.dropdown')
const dropdownBtn = document.querySelector('.dropdown-btn')
const dropdownContent = document.querySelector('.dropdown-content')



const attachModalListeners = () => {
    document.querySelector('.overlay').addEventListener('click', toggleModal)
}

const detachModalListeners = () => {
    document.querySelector('.overlay').removeEventListener('click', toggleModal)
}

const toggleModal = () => {
    if (modal.style.display === 'none' ||
        modal.style.display === '') {
        modal.style.display = 'block'
        dropdownContent.focus()
        attachModalListeners()
    } else {
        modal.style.display = 'none'
        dropdownContent.focus()
        detachModalListeners()
    }
}

dropdownBtn.addEventListener('click', toggleModal)