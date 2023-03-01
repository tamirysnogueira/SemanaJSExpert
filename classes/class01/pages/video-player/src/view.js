export default class View {
    #btnInit = document.querySelector('#init')
    #statusElement = document.querySelector('#status')
    
    enableButton(){
        this.#btnInit.disable = false
    }

    configureOnBtnClick(fn) {
        this.#btnInit.addEventListener('click', fn)
    }

    log(text) {
        this.#statusElement.innerHTML = text
    }
}