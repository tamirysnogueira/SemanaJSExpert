export default class HandGestureService {

    #fingerpose
    #handPoseDetection
    #handVersion
    #detector = null
    constructor({fingerpose, handPoseDetection, handsVersion}) {
        this.#fingerpose = fingerpose,
        this.#handPoseDetection = handPoseDetection,
        this.#handsVersion = handsVersion
    }

    async estimateHands(video) {
        return this.#detector.estimateHands(video, {
            flipHorizontal: true
        })
    }

    async initializeDetector() {
        if(this.#detector) return this.#detector

        const detectorConfig = {
            runtime: 'mediapipe', // or 'tfjs',
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handVersion}`, 
            //full é o mais pesado e o mais preciso

            modelType: 'lite',
            maxHands: 2
        }

        this.#detector = await this.#handPoseDetection.createDetector(
            this.#handPoseDetection.SupportedModels.MediaPipeHands,
            detectorConfig
        );

        return this.#detector
    }

}