import { Service } from "./Service";

export class WeddingSessionService extends Service {

    protected price(): number {
        return 600;
    }

    protected discount = (): number => {

        if (this.services.includes("Photography")) {
            if (this.year === 2022) {
                return 600;
            }
            return 300;
        }

        if (this.services.includes("VideoRecording")) {
            return 300;
        }

        return 0;
    };
}
