import { DateTime } from "luxon";
import { MonthSettingsDistribution } from "./generator-interfaces";
import { AgeGroup, Gender, UserBuilder } from "./user";
import { Rental } from "./rental";
import { Scooter } from "./scooter";
import { CSVPrinter } from "./csv-printer";

const januaryDistribution: MonthSettingsDistribution = {
    user: {
        ageDistribution: {
            [AgeGroup.YOUNG]: 20,
            [AgeGroup.ADULT]: 60,
            [AgeGroup.OLD]: 20,
        },
        genderDistribution: {
            [Gender.MAN]: 80,
            [Gender.WOMAN]: 20,
        },
    },
    // below section doesnt work yet todo
    scooter: {
        duration: {
            short: 0.3,
            medium: 0.4,
            long: 0.3,
        },
        model: {
            A: 1,
            B: 0,
            C: 0,
            D: 0,
        },
    },
};

const users = Array.from({ length: 1000 }).map(() =>
    new UserBuilder().withDistributions(januaryDistribution.user).build()
);
const scooters = Array.from({ length: 100 }).map(() => new Scooter());

const now = DateTime.now();
const rentals: Rental[] = [];

for (let i = 0; i < 30; i++) {
    const date = now.minus({ days: i });
    for (const user of users) {
        if (Math.random() > 0.01) {
            rentals.push(new Rental(user, date, scooters[0]));
        }
    }
}

const printer = new CSVPrinter();
printer.toCsv(rentals, "./data/rentals.csv");
printer.toCsv(users, "./data/users.csv");
printer.toCsv(scooters, "./data/scooters.csv");
