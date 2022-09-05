import { Service } from "./Service";

export class TwoDayEvent extends Service {
    protected price(): number {
        if (!this.requirementMet("TwoDayEvent")) {
            return 0;
        }

        return 400;
    }
}
