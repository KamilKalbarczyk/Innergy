import { ServiceType } from "./index";

export interface Requirement {
    [service: string]: ServiceType[];
}

export const Requirements: Requirement = {
    ["BlurayPackage"]: [
        "VideoRecording"
    ],
    ["TwoDayEvent"]: [
        "VideoRecording",
        "Photography"
    ]
}