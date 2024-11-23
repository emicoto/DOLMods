class SeriesData {
    constructor(type, seriesId = '') {
        this.type = type;
        this.Id = seriesId;
        this.data = [];
    }

    // get the event by id
    get(id) {
        return this.data.find(item => item.Id === id);
    }

    // sort the events by priority, higher priority first
    sort() {
        this.data.sort((a, b) => a.priority - b.priority);
    }

    // set SeriesId to all events
    initSeries() {
        this.data.forEach(item => item.seriesId = this.Id);
    }
}

class SceneSeries extends SeriesData {
    constructor(seriesId = '') {
        super('scene');
        this.Id = seriesId;
    }

    // add scene to the list
    add(scene) {
        if (this.data.find(item => item.Id === scene.Id)) {
            console.error(`Scene ${scene.Id} is already defined`);
            return;
        }

        this.data.push(scene);
        this.sort();
    }
}

class TimeSeries extends SeriesData {
    constructor(seriesId = '') {
        super('time');
        this.Id = seriesId;
    }

    // add time to the list
    add(time) {
        if (this.data.find(item => item.Id === time.Id)) {
            console.error(`Time ${time.Id} is already defined`);
            return;
        }

        this.data.push(time);
        this.sort();
    }
}

class StateSeries extends SeriesData {
    constructor(seriesId = '') {
        super('state');
        this.Id = seriesId;
    }

    // add state to the list
    add(state) {
        if (this.data.find(item => item.Id === state.Id)) {
            console.error(`State ${state.Id} is already defined`);
            return;
        }

        this.data.push(state);
        this.sort();
    }
}
