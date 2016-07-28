"use strict";

import Utils from "./Utils";
import Player from "./Player";

export default class HumanPlayer extends Player {
    getNextMove(pos) {
        return Utils.getUserInput(`What is ${ this.name }'s next move? `);
    }
}
