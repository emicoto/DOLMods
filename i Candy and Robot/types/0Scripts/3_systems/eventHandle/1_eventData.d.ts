type TriggerType = 'scene' | 'entry' | 'action' | 'localAction' | 'cond'
type EventType = 'Event' | 'Scene' | 'Action' | 'Chara'
type eventFormat = 'main' | 'branch'
type actionType = 'nextButton' | 'leave' | 'onPhase' | 'before' | 'after' | 'branch_X' | 'phase_X'

interface triggerOption {

    type : TriggerType;
    location?: string[];
    cond?: Function;
    passage?: string;
    stage?: string;
}

interface actions {
    before?: Function | string;
    after?: Function | string;
    nextButton?: string
    leave?: string | Function;
    onPhase?: Function | string;
    [key: string] : Function | string;
}

interface SceneData {
    type: EventType;
    format: eventFormat;
    
    seriesId: string;
    eventId: string;
    parent?: string;

    priority: number;

    flagfields: string[];
    branches: SceneData[];
    actions: actions[];

    maxPhase: number;

    triggerType: TriggerType;
    triggerOptions?: triggerOption;

    cond?: Function;

    character?: string[];
    randomBranch?: number;

    nexButton?: boolean;
}

export class SceneData {
    constructor(eventId: string, type:EventType, parent?:string)
    assgin(obj:SceneData) : SceneData
}

interface Window {
    SceneData: typeof SceneData
}