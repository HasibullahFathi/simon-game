/**
 * @jest-environment jsdom
 */

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("Game object contains correct keys", () => {
    test("Score key exists", () => {
            expect("score" in game).toBe(true);
        });
});