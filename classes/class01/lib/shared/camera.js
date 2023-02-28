export default class Camera{
    constructor() {
        this.video = document.createElement('video')
    }

    static async init(){
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
            throw new Error(
                `Browser API navigator.mediaDevices.getUserMedia not available `
            )
        }

        //pegar a primeira opção da câmera com o usuário
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        const videoConfig = {
            audio: false,
            video: {
                width: globalThis.screen.availWidth, //objeto global do js pega o tamanho disponível da tela
                height: globalThis.screen.availHeight,
                frameRate: {
                    ideal: 60
                },
                deviceId: videoDevices[0].deviceId
            }
            
        }

        const stream = await navigator.mediaDevices.getUserMedia(videoConfig)

        const camera = new Camera()
        camera.video.srcObject = stream

        //mostrar no html da tela
        
        camera.video.height = 240
        camera.video.width = 320

        document.body.append(camera.video)

        await new Promise((resolve) => {
            camera.video.onloadedmetadata = ( ) =>  {
                resolve(camera.video)
            }
        })

        camera.video.play()
        return camera
    }
}