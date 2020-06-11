export class SortingAnimation {

    constructor(barIndexes: number[], isSwap: boolean = false) {
        this.barIndexes = barIndexes;
        this.isSwap = isSwap;
    }

    barIndexes: number[];
    isSwap: boolean;
}
