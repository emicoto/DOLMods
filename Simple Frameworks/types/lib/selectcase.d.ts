type SelectCaseCondType<T extends number | string> = (T | [T, T] | [{ [key: string]: any }, T]);

interface SelectCaseArrType<T extends number | string> {
    cond: SelectCaseCondType<T>;
    result: T;
}

// @ts-ignore
declare class SelectCaseType<T extends number | string> {
    arr: SelectCaseArrType<T>[];
    defaultresult: string;
    condtype: 'string' | 'number';

    case(cond: SelectCaseCondType<T>, result: any): this;

    else(result: string): this;

    caseMatch(_cond: (number | number[]), result: any): this;

    caseMatchS(_cond: (string | string[]), result: any): this;

    has(pick: string | number): any;

    isLT(pick: number): SelectCaseCondType<T>;

    isGT(pick: number): SelectCaseCondType<T>;

    isLTE(pick: number): SelectCaseCondType<T>;

    isGTE(pick: number): SelectCaseCondType<T>;

    check(cond: SelectCaseCondType<T>): void;

    type(cond: SelectCaseCondType<T>): string;
}

// @ts-ignore
declare global {
    interface Window {
        SelectCase: typeof SelectCaseType;
    }
}
interface Window {
    SelectCase: typeof SelectCaseType;
}
