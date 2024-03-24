import { writeFileSync } from "fs";

export interface IPrintable {
    print(): any;
}

export class CSVPrinter {
    public async toCsv(data: IPrintable[], fileName: string) {
        let text = "";
        for (const item of data) {
            const values = Object.values(item.print());

            text += values.join(",") + "\n";
        }

        await writeFileSync(fileName, text);
    }
}
