import { v4 } from "uuid";
import { IPrintable } from "./csv-printer";

export enum Model {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
}

export class Scooter implements IPrintable {
    id = v4();
    model!: Model;

    constructor() {
        this.model = this.getRandomModel();
    }

    private getRandomModel(): Model {
        const models = Object.values(Model);
        const randomIndex = Math.floor(Math.random() * models.length);
        return models[randomIndex];
    }

    public print() {
        return {
            id: this.id,
            model: this.model,
        };
    }
}
