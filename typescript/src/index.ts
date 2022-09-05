import { BlueRayPackage } from "./BlueRayPackage";
import { PhotographyService } from "./PhotographyService";
import { Requirements } from "./Requirement";
import { Service } from "./Service";
import { TwoDayEvent } from "./TwoDayEvent";
import { VideoRecordingService } from "./VideoRecordingService";
import { WeddingSessionService } from "./WeddingSessionService";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
    switch(action.type) {
        case "Select": {
            if(previouslySelectedServices.includes(action.service)) {
                return previouslySelectedServices;
            }

            const requirements = Requirements[action.service];
            var requirementMet = requirements?.some(x => previouslySelectedServices.includes(x)) ?? true;

            if(!requirementMet) {
                return previouslySelectedServices;
            } 

            return [...previouslySelectedServices, action.service];
        }
        case "Deselect": {
            if(!previouslySelectedServices.includes(action.service)) {
                return previouslySelectedServices;
            }
            
            previouslySelectedServices =  previouslySelectedServices.filter(x => x !== action.service)

            previouslySelectedServices.forEach(x => {
                const requirements = Requirements[x];
                var requirementMet = requirements?.some(x => previouslySelectedServices.includes(x)) ?? true;

                if(!requirementMet) {
                    previouslySelectedServices = previouslySelectedServices.filter(p => p !== x)
                }
            })
            
            return previouslySelectedServices;
        }
        default: 
            return previouslySelectedServices;
    }
}

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {

    let price = 0;
    let discount = 0;

    selectedServices.forEach(x => {
        let service: Service;

        switch(x) {
            case "Photography":
                service = new PhotographyService(selectedYear, selectedServices);
                break;
            case "VideoRecording":
                service = new VideoRecordingService(selectedYear, selectedServices);
                break;
            case "BlurayPackage":
                service = new BlueRayPackage(selectedYear, selectedServices);
                break;
            case "TwoDayEvent":
                service = new TwoDayEvent(selectedYear, selectedServices);
                break;
            case "WeddingSession":
                service = new WeddingSessionService(selectedYear, selectedServices);
                break;
        }

        const servicePrice = service.calculate();

        price += servicePrice.base;
        discount += servicePrice.discount;
    })

    return { basePrice: price, finalPrice: price - discount }
}