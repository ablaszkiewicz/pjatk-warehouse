import { random } from "chance-percent";

export enum City {
    Gdansk = "Gdańsk",
    Warszawa = "Warszawa",
    Wroclaw = "Wrocław",
}

export const getRandomCity = (): City => {
    return random([
        { value: City.Gdansk, percentage: 30 },
        { value: City.Warszawa, percentage: 30 },
        { value: City.Wroclaw, percentage: 40 },
    ]) as City;
};
