class Scene {
    /**
     * when the scene is created
     */
    constructor(type = 'scene') {
        this.type = type;
        this.objects = [];
    }
}

class SeriesData {
    constructor(type) {
        this.type = type;
        this.data = {};
    }
}
