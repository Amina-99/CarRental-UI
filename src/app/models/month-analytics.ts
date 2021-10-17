export class MonthAnalytics {
    monthName: string;
    income: number;
    constructor(init?: Partial<MonthAnalytics>){
        Object.assign(this, init);
    }
}
