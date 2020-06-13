import {SortingAlgorithm} from './sorting-algorithm';
import {SortingAnimation} from '../sorting-animation';

export class SelectionSort implements SortingAlgorithm {

    public sort(array: number[], animations: SortingAnimation[]): SortingAnimation[] {
        for (let i = 0; i < array.length; i++) {
            let minIndex = i;
            for (let j = i + 1; j < array.length; j++) {
                animations.push(new SortingAnimation([j, minIndex], false));
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
            }
            [array[minIndex], array[i]] = [array[i], array[minIndex]];
            animations.push(new SortingAnimation([minIndex, i], true));
        }
        return animations;
    }

}
