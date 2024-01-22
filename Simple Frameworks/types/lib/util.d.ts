
interface Window {
    slog: (type?: string, ...args: any[]) => void;
    dlog: (type?: string, ...args: any[]) => void;

    isValid(props: (string | number | any[])): boolean;

    inrange(x: number, min: number, max: number): boolean;

    random(min: number, max: number): number;

    maybe<T>(array: [T, number][]): number;

    compares(key: string): (
        (m: { [key: string]: number }, n: { [key: string]: number }) => number
        );

    roll(times: number, max: number): {
        roll: string,
        result: number,
        bonus: number,
    };

    groupmatch<T>(value: T, ...table: T[]): boolean;

    sumObj(Obj: { [key: string]: number }): number;

    sumObjProp(Obj: { [key: string]: number }, prop: string): number;

    swap<T>(arr: T[], a: number, b: number): T[];

    clone<T>(obj: T): T;

    countArray<T>(arr: T[], element: T): number;

    setPath(obj: any, path: string, value: any): any;

    getKeyByValue(object: any, value: any): string | undefined;
}

interface Math {
    fix: (num: number, digit: number) => number;
}

interface Number {
    fix: (digit: number) => number;
}

interface String {
    has: (...arg: string[]) => boolean;
}

interface Array<T> {
    has: (...arg: T[]) => boolean;
}

interface String {
    toCamelCase: () => string;
}

interface Array<T> {
    randompop: () => T;
}

interface String {
    randompop: () => string;
}
