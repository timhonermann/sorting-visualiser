import {SortingAlgorithm} from './sorting-algorithm';
import {SortingAnimation} from '../sorting-animation';

export class BubbleSort implements SortingAlgorithm {

    public sort(array: number[], animations: SortingAnimation[] = []): SortingAnimation[] {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                animations.push(new SortingAnimation([j, j + 1], false));
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    animations.push(new SortingAnimation([j, j + 1], true));
                }
            }
        }

        return animations;
    }
}
