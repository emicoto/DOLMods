//---------------------------------------------------------------------------------------------
// Scene
//
// this class is used to generate a running scene from the scene data
// and provide some useful methods to check the scene status
//---------------------------------------------------------------------------------------------
class Scene {
    constructor(type = 'scene', title, data = null) {
        this.type = type;
        this.baseTitle = title;
        this.data = data;

        if (this.data === null && V.stage) {
            this.stage = V.stage;
            this.fullTitle = `Scene ${this.stage} ${this.baseTitle}`;
        }

        this.startTime = V.timeStamp;
        this.exit = V.passage;
    }

    init() {
        const data = this.data;
        if (!data) return this;

        //make a backup of the original data
        this.source = clone(data);
    }
}