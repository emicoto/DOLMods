interface WidgetType {
    name: string;
    passage: string;
    widget: string;
}

// @ts-ignore
const SimpleFrameworksDataTypeKeys = [
    'ModSkillsBox',
    'ModCharaDescription',
    'ModCaptionDescription',
    'ModCaptionAfterDescription',
    'ModStatusBar',
    'ModMenuBig',
    'ModMenuSmall',

    'BeforeLinkZone',
    'ExtraLinkZone',
    'ModShopZone',

    'iModDone',
    'iModReady',
    'iModHeader',
    'iModFooter',
    'iModOptions',
    'iModCheats',
    'iModStatus',
    'iModFame',
    'iModInit',
    'iModStatist',
    'iModExtraStatist',
    'iModSettings',
] as const;

type SimpleFrameworksDataTypeKeyType = string | {
    passage: (string | string[]),
    widget: string,
};

type simpleFrameworksDataType = { [key in typeof SimpleFrameworksDataTypeKeys[number]]: SimpleFrameworksDataTypeKeyType };

interface simpleFrameworksType {
    version: string;
    name: string;
    author: string;
    lastUpdate: string;

    onInit(...widgets: (string | WidgetType)[]): void;

    addto(zone: string, ...widgets: (string | WidgetType)[]): void;

    initFunction: (string | CallableFunction)[];
    data: simpleFrameworksDataType;

    storyInit(): void;

    playWidgets(zone: string, passageTitle?: string): string;

    default: {
        iModInit: () => string,
        iModReady: () => string,
        iModOptions: () => string,
        iModCheats: () => string,
        iModSettings: () => string,
    };

    createMicroWidgets(): Promise<string>;

    createModInitMacro(): Promise<string>;

    widgethtml: string;
}

// @ts-ignore
declare global {
    interface Window {
        simpleFrameworks: simpleFrameworksType;
    }
}

interface Window {
    simpleFrameworks: simpleFrameworksType;
}
