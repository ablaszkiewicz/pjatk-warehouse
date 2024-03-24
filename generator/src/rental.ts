import { DateTime } from "luxon";
import { v4 } from "uuid";
import { Scooter } from "./scooter";
import { User } from "./user";
import { IPrintable } from "./csv-printer";
import { getRandomCity } from "./city";

export class Rental implements IPrintable {
    id = v4();
    scooter!: Scooter;
    user!: User;
    startDate!: string;
    endDate!: string;
    city = getRandomCity();

    constructor(user: User, startDate: DateTime, scooter: Scooter) {
        this.user = user;
        this.startDate = startDate.toISO()!;
        this.endDate = startDate
            .plus({ minutes: Math.floor(Math.random() * 60) })
            .toISO()!;
        this.scooter = scooter;
    }

    public print() {
        return {
            id: this.id,
            scooterId: this.scooter.id,
            userId: this.user.id,
            startDate: this.startDate,
            endDate: this.endDate,
            city: this.city,
        };
    }
}
