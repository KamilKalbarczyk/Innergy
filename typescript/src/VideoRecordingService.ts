import { Service } from "./Service";
import { YearPrice } from "./YearPrice";

export class VideoRecordingService extends Service {

    private prices: YearPrice = {
        [2020]: 1700,
        [2021]: 1800,
        [2022]: 1900
    };

    protected price(): number {
        return this.prices[this.year];
    }

    protected discount = (): number => {
        if (!this.services.includes("Photography"))
            return 0;

        switch (this.year) {
            case 2020:
                return 600;
            case 2021:
                return 650;
            case 2022:
                return 650;
            default:
                return 0;
        }
    };
}
