import { random } from "chance-percent";
import {
    AgeDistribution,
    GenderDistribution,
    UserDistribution,
} from "./generator-interfaces";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import { IPrintable } from "./csv-printer";
import { faker } from "@faker-js/faker";
import { getRandomCity } from "./city";

export enum Gender {
    MAN = "MAN",
    WOMAN = "WOMAN",
}

export enum AgeGroup {
    YOUNG = "YOUNG",
    ADULT = "ADULT",
    OLD = "OLD",
}

export const ageMap: Record<AgeGroup, { min: number; max: number }> = {
    [AgeGroup.YOUNG]: { min: 10, max: 20 },
    [AgeGroup.ADULT]: { min: 21, max: 60 },
    [AgeGroup.OLD]: { min: 61, max: 100 },
};

export class User implements IPrintable {
    id = v4();
    name = faker.person.firstName();
    surname = faker.person.lastName();
    birthDate!: string;
    ageGroup!: AgeGroup;
    gender!: Gender;
    city = getRandomCity();

    public print() {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            birthDate: this.birthDate,
            gender: this.gender,
            city: this.city,
        };
    }
}

export class UserBuilder {
    private user: User = new User();

    public withDistributions(distribution: UserDistribution): UserBuilder {
        this.applyGenderDistribution(distribution.genderDistribution);
        this.applyAgeDistribution(distribution.ageDistribution);

        return this;
    }

    private applyGenderDistribution(
        genderDistribution: GenderDistribution
    ): void {
        const seed = Object.keys(genderDistribution).map((key) => ({
            value: key,
            percentage: (genderDistribution as any)[key],
        }));

        const gender = random(seed) as Gender;

        this.user.gender = gender;
    }

    private applyAgeDistribution(ageDistribution: AgeDistribution): void {
        const seed = Object.keys(ageDistribution).map((key) => ({
            value: key,
            percentage: (ageDistribution as any)[key],
        }));

        const ageGroup = random(seed) as AgeGroup;
        this.user.ageGroup = ageGroup;

        this.user.birthDate =
            this.getRandomDateInAgeGroup(ageGroup).toFormat("yyyy-MM-dd");
    }

    private getRandomDateInAgeGroup(ageGroup: AgeGroup): DateTime {
        const { min, max } = ageMap[ageGroup];
        const now = DateTime.now();
        const minDate = now.minus({ years: max });
        const maxDate = now.minus({ years: min });

        return DateTime.fromMillis(
            Math.floor(
                Math.random() * (maxDate.toMillis() - minDate.toMillis())
            ) + minDate.toMillis()
        );
    }

    public build(): User {
        return this.user;
    }
}
