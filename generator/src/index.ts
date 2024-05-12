import { DateTime } from "luxon";
import { MonthSettingsDistribution } from "./generator-interfaces";
import { AgeGroup, Gender, UserBuilder } from "./user";
import { Rental } from "./rental";
import { Scooter } from "./scooter";
import { CSVPrinter } from "./csv-printer";
import { RentalFactory } from "./rental-decider";

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
    rental: {
        duration: {
            [AgeGroup.YOUNG]: {
                short: 0.2,
                medium: 0.3,
                long: 0.5,
            },
            [AgeGroup.ADULT]: {
                short: 0.4,
                medium: 0.3,
                long: 0.3,
            },
            [AgeGroup.OLD]: {
                short: 0.5,
                medium: 0.4,
                long: 0.3,
            },
        },
    },
    // below section doesnt work yet todo
    scooter: {
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

const rentalFactory = new RentalFactory();
for (let i = 0; i < 30; i++) {
    const date = now.minus({ days: i });

    for (const user of users) {
        const possibleRental = rentalFactory.createPossibleRental(
            januaryDistribution,
            user
        );

        if (possibleRental) {
            rentals.push(possibleRental);
        }
    }
}

const printer = new CSVPrinter();
printer.toCsv(rentals, "./data/rentals.csv");
printer.toCsv(users, "./data/users.csv");
printer.toCsv(scooters, "./data/scooters.csv");
