import { AgeGroup, Gender } from "./user";

export interface MonthSettingsDistribution {
    user: UserDistribution;
    scooter: ScooterDistribution;
}

export interface UserDistribution {
    genderDistribution: GenderDistribution;
    ageDistribution: AgeDistribution;
}

export interface ScooterDistribution {
    model: ModelDistribution;
    duration: DurationDistribution;
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

export interface DurationDistribution {
    short: number;
    medium: number;
    long: number;
}

export interface GenderDistribution {
    [Gender.MAN]: number;
    [Gender.WOMAN]: number;
}
