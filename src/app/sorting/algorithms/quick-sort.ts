import {SortingAlgorithm} from './sorting-algorithm';
import {SortingAnimation} from '../sorting-animation';

export class QuickSort implements SortingAlgorithm {

    private static partition(data: Array<number>,
                             animations: SortingAnimation[] = [] ,
                             left: number = 0,
                             right: number = data.length - 1): [number, SortingAnimation[]] {

        const pivotIndex = Math.floor((right + left) / 2);
        const pivot = data[pivotIndex];
        let i = left;
        let j = right;

        animations.push(new SortingAnimation([i, j], false));
        while (i <= j) {
            animations.push(new SortingAnimation([i, pivotIndex], false));
            while (data[i] < pivot) {
                i++;
                animations.push(new SortingAnimation([i, pivotIndex], false));
            }

            animations.push(new SortingAnimation([j, pivotIndex], false));
            while (data[j] > pivot) {
                j--;
                animations.push(new SortingAnimation([j, pivotIndex], false));
            }

            animations.push(new SortingAnimation([i, j], false));
            if (i <= j) {
                [data[i], data[j]] = [data[j], data[i]];
                animations.push(new SortingAnimation([i, j], true));
                i++;
                j--;
            }
        }

        return [i, animations];
    }

    public sort(data: number[],
                animations: SortingAnimation[] = [],
                left: number = 0,
                right: number = data.length - 1): SortingAnimation[] {

        let index: number;

        if (data.length > 1) {
            [index, animations] = QuickSort.partition(data, animations, left, right);

            if (left < index - 1) {
                this.sort(data, animations, left, index - 1);
            }

            if (index < right) {
                this.sort(data, animations, index, right);
            }
        }

        return animations;
    }

}
