function supportsWorkerType(){
    let supports = false 
    const tester = {
        get type() {supports = true}
    }

    try {
        new Worker('blob://', tester).terminate() //ver se o navegador suporta workers
    } finally {
        return supports
    }
}

export {
    supportsWorkerType
}