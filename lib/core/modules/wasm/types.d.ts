export declare enum ExitType {
    Default = "default",
    Quote = "quote",
    Base = "base"
}
export declare enum StrategyType {
    Arithmetic = "arithmetic",
    Geometric = "geometric"
}
export type ExitConfig = {
    exitType: ExitType;
    exitPrice: string;
};
