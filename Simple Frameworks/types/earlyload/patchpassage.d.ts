// from SC2, copy from ModLoader
export class Passage {
    get className(): string;

    get text(): string | any;

    get title(): string | any;

    description(): string | null;

    processText(): string | null;

    render(options): DocumentFragment;

    static getExcerptFromNode(node, count): string;

    static getExcerptFromText(node, count): string;
}


interface LocationPassageReplacer_Src {
    src: string;
    to?: string;
    applyafter?: string;
    applybefore?: string;
}

interface LocationPassageReplacer_Match extends LocationPassageReplacer_Src {
    srcmatch: string;
}

interface LocationPassageReplacer_Group {
    srcgroup: string;
    to?: string;
    applyafter?: string;
    applybefore?: string;
}

type LocationPassageReplacer_Any =
    LocationPassageReplacer_Src
    | LocationPassageReplacer_Match
    | LocationPassageReplacer_Group;

interface LocationPassageBase {
    PassageHeader: LocationPassageReplacer_Src;
    PassageFooter: LocationPassageReplacer_Src;
    StoryCaption: LocationPassageReplacer_Any;
}

type LocationPassageType = LocationPassageBase & { [key: string]: LocationPassageReplacer_Any[] };

interface SimplePatchPassageType {
    patchScene(passage: Passage, title: string): Passage;

    patchPassage(passage: Passage, title: string): Passage;

    patchWidget(passage: Passage, title: string): Passage;

    patchedPassage: { [key: string]: Passage };
    locationPassage: LocationPassageType;

    afterPatchModToGame(): Promise<void>;

    applygroup(source: string, srctxt: string, set: string): string;

    applymatch(source: string, matcher: string, set: string): string;

    applysrc(source: string, srctxt: string, set: string): string;
}

// @ts-ignore
declare global {
    interface Window {
        SimplePatchPassage: SimplePatchPassageType;
    }
}
interface Window {
    SimplePatchPassage: SimplePatchPassageType;
}
