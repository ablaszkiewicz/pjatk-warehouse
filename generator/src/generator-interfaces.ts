import { AgeGroup, Gender } from "./user";

export interface MonthSettingsDistribution {
    user: UserDistribution;
    scooter: ScooterDistribution;
    rental: RentalDistribution;
}

export interface UserDistribution {
    genderDistribution: GenderDistribution;
    ageDistribution: AgeDistribution;
}

export interface ScooterDistribution {
    model: ModelDistribution;
}

export interface RentalDistribution {
    duration: AgeDurationDistributions;
}

export interface AgeDistribution {
    [AgeGroup.YOUNG]: number;
    [AgeGroup.ADULT]: number;
    [AgeGroup.OLD]: number;
}

export interface ModelDistribution {
    A: number;
    B: number;
    C: number;
    D: number;
}

export interface AgeDurationDistributions {
    [AgeGroup.YOUNG]: DurationDistribution;
    [AgeGroup.ADULT]: DurationDistribution;
    [AgeGroup.OLD]: DurationDistribution;
}

export interface DurationDistribution {
    short: number;
    medium: number;
    long: number;
}

export interface GenderDistribution {
    [Gender.MAN]: number;
    [Gender.WOMAN]: number;
}
