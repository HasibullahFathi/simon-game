/**
 * @jest-environment jsdom
 */

const {game, newGame, showScore, addTurn} = require("../game");

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
            expect("score" in game).toBe(true);
        });

        test("currentGame key exists", () => {
            expect("currentGame" in game).toBe(true);
        });

        test("playerMoves key exists", () => {
            expect("playerMoves" in game).toBe(true);
        });

        test("choices key exists", () => {
            expect("choices" in game).toBe(true);
        });

        test("choices should contain correct ids", () => {
            expect(game.choices).toEqual(["button1, button2, button3, button4"]);
        });
});

describe ("newGame works correctly", () => {

    beforeAll(() => {
        game.score = 53;
        game.currentGame = ["button1", "button2", "button3"];
        game.playerMoves = ["button1", "button2", "button3"];
        document.getElementById("score").innerText = "53"
        newGame();
    });

    test("score should be 'zero'", () => {
        expect(game.score).toEqual(0);
    });

    test("should be one game in the computer's game array", () => {
        expect(game.currentGame.length).toEqual(1);
    });

    test("playerMoves should be empty array", () => {
        expect(game.playerMoves.length).toEqual(0);
    });

    test("should 0 for the element with the id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});