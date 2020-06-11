import {Algorithm} from './algorithms/algorithm';
import {SortingAnimation} from './sorting-animation';

export class Context {

    private algorithm: Algorithm;

    constructor(algorithm: Algorithm) {
        this.algorithm = algorithm;
    }

    public setAlgorithm(algorithm: Algorithm) {
        this.algorithm = algorithm;
    }

    public getAlgorithm() {
        return this.algorithm;
    }

    public getSortingAnimations(data: number[], animations: SortingAnimation[]): SortingAnimation[] {
        return this.algorithm.sort(data, animations);
    }

}
