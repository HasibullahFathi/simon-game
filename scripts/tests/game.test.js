/**
 * @jest-environment jsdom
 */

const { default: JSDOMEnvironment } = require("jest-environment-jsdom");
const {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn} = require("../game");

jest.spyOn(window, "alert").mockImplementation( () => { });

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
            expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
        });

        test("turnNumber exists", () => {
            expect("turnNumber" in game).toBe(true);
        });

        test("turnInProgress exists", () => {
            expect("turnInProgress" in game).toBe(true);
        });
});

describe ("newGame works correctly", () => {

    beforeAll(() => {
        game.score = 53;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "53";
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

    test("data listener should be true", () => {
        let elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        };
    });
});

describe ("gamePlay works correctly", () => {
    beforeEach (() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach (() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });

    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });

    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });

    test("showTrun should update the game.turnNumber", () => {
        game.turnNumber = 53;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });

    test("should increment the score if the player move is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });

    test("should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });

    test("clicking during the computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });

});