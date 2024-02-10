export interface IServicePlan {
    name: string,
    description?: string;
    monthlyPrice: number,
    yearlyPrice: number,
}

export class ServicePlan implements IServicePlan {
    constructor(
        public name: string,
        public monthlyPrice: number,
        public yearlyPrice: number,
        public description?: string,
    ) {}

    getPrice(isYearlyBilling: boolean) {
        return `${isYearlyBilling ? this.yearlyPrice + "/yr" : this.monthlyPrice + "/mo"}`;
    }
}
