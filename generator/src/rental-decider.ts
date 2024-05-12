import { DateTime } from "luxon";
import { MonthSettingsDistribution } from "./generator-interfaces";
import { Rental } from "./rental";
import { User } from "./user";

export enum TimeOfDay {
    MORNING = "MORNING",
    AFTERNOON = "AFTERNOON",
    EVENING = "EVENING",
}

export class RentalFactory {
    public createPossibleRental(
        settings: MonthSettingsDistribution,
        user: User
    ): Rental | null {
        const;
    }

    public setRandomHourAccordingToTimeOfDay(time: DateTime): DateTime {
        const timeOfDay = this.getTimeOfDay(time);
        switch (timeOfDay) {
            case TimeOfDay.MORNING:
                return time.set({ hour: 8 + Math.floor(Math.random() * 4) });
            case TimeOfDay.AFTERNOON:
                return time.set({ hour: 12 + Math.floor(Math.random() * 4) });
            case TimeOfDay.EVENING:
                return time.set({ hour: 16 + Math.floor(Math.random() * 4) });
        }
    }
}
