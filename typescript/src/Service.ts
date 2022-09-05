import { ServicePrice } from "./ServicePrice";
import { ServiceType } from "./index";
import { Requirements } from "./Requirement";

export abstract class Service {

    protected year: number;
    protected services: ServiceType[];

    constructor(year: number, services: ServiceType[]) {
        this.year = year;
        this.services = services;
    }

    calculate = (): ServicePrice => {

        const price = this.price();
        const discount = this.discount();

        return {
            base: price,
            discount: discount
        };
    };

    protected abstract price(): number;
    protected discount = (): number => 0;
    protected requirementMet(service: string): boolean {
        var requirement = Requirements[service];

        if (!requirement)
            true;

        if (this.services.some(x => requirement.includes(x))) {
            return true;
        }

        return false;
    }
}
