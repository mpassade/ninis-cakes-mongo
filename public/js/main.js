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
        console.log('modal should come up')
        modal.style.display = 'block'
        dropdownContent.style.left = '0'
        attachModalListeners()
    } else {
        modal.style.display = 'none'
        dropdownContent.style.left = '-30rem'
        detachModalListeners()
    }
}

dropdownBtn.addEventListener('click', toggleModal)