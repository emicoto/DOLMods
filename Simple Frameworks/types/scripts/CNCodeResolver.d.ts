// @ts-ignore
declare function CNCodeTrans(key: any, ...args: any[]): any;

// @ts-ignore
declare global {
    interface Window {
        check: checkType;
        cntv: cntvType;
    }
}

interface Window {
    check: checkType;
    cntv: cntvType;
}

interface checkType {
    好感(npc: string): number;

    信赖(npc: string): number;

    支配(npc: string): number;

    罗宾自信(): number;

    愤怒(npc: string): number;

    性欲(npc: string): number;

    凯子嫉妒(): number;

    悉尼纯洁(): number;

    悉尼堕落(): number;

    抗拒态度(): boolean;

    温顺态度(): boolean;

    中性态度(): boolean;

    初遇(npc: string): boolean;

    阴道处女(npc: string): any;

    肛门处女(npc: string): any;

    初吻(npc: string): any;

    初次握手(npc: string): any;

    初次口交(npc: string): any;

    阴茎童贞(npc: string): boolean;

    誓约(npc: string): boolean;

    贞洁誓约(): string;

    纯洁之躯(npc: string): any;

    恋人(npc: string): boolean;

    副恋人(npc: string): boolean;
}

interface cntvType {
    设置(prop: string, value: any): void;

    npc设置(npc: string, prop: string, value: number): void;

    获取变量(prop: string): any;

    变量(prop: string): any;

    变量加减(prop: string, value: number): void;

    删除变量(prop: string): void;

    获取npc变量(npc: string, prop: string): any;

    npc变量(npc: string, prop: string): any;

    npc变量加减(npc: string, prop: string, value: number): void;

    态度差分: typeof window.speechDif;
    性别差分: typeof window.sexSwitch;
    条件分支: typeof window.cond;
    概率差分: typeof window.maybe;

    好感变化(npc: string, value: number): void;

    支配变化(npc: string, value: number): void;

    性欲变化(npc: string, value: number): void;

    愤怒变化(npc: string, value: number): void;

    凯子嫉妒变化(value: number): void;

    罗宾自信变化(value: number): void;

    悉尼纯洁变化(value: number): void;

    悉尼堕落变化(value: number): void;

    罗宾钱包变化(value: number): void;
}
