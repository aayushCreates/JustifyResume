import { PDFParse } from "pdf-parse";


export default async function getPdfInfo(url: string) {
    const parser = new PDFParse({
        url: url
    });

    const result = await parser.getText() as any;

    return result;
}

