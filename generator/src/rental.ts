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
    startDate!: DateTime;
    endDate!: DateTime;
    city = getRandomCity();

    constructor(user: User, startDate: DateTime, scooter: Scooter) {
        this.user = user;
        this.startDate = startDate
            .set({ hour: 12, minute: this.randomMinutes() })
            .plus({ hour: Math.floor(Math.random() * 13) - 6 });
        this.endDate = startDate.plus({ minutes: this.randomMinutes() });
        this.scooter = scooter;
    }

    private randomMinutes() {
        return Math.floor(Math.random() * 60);
    }

    public print() {
        return {
            id: this.id,
            scooterId: this.scooter.id,
            userId: this.user.id,
            startDate: this.startDate.toISO(),
            endDate: this.endDate.toISO(),
            city: this.city,
        };
    }
}
