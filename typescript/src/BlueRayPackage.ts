import { Service } from "./Service";

export class BlueRayPackage extends Service {
    protected price(): number {
        if (!this.requirementMet("BlurayPackage")) {
            return 0;
        }

        return 300;
    }
}
