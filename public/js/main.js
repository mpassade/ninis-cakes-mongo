const modal = document.querySelector('.dropdown')
const dropdownBtn = document.querySelector('.dropdown-btn')
const dropdownContent = document.querySelector('.dropdown-content')



const attachModalListeners = (modalElm) => {
    modalElm.querySelector('.overlay').addEventListener('click', toggleModal)
}

const detachModalListeners = (modalElm) => {
    modalElm.querySelector('.overlay').removeEventListener('click', toggleModal)
}

const toggleModal = () => {
    const currentState = modal.style.display;

    if (currentState === 'none') {
        modal.style.display = 'block'
        dropdownContent.style.left = '0'
        dropdownContent.style. = 'left 2s'
        attachModalListeners(modal)
    } else {
        modal.style.display = 'none'
        detachModalListeners(modal)
    }
}

dropdownBtn.addEventListener('click', toggleModal)