import {Algorithm} from './algorithm';
import {SortingAnimation} from '../sorting-animation';

export class QuickSort implements Algorithm {

    private static partition(data: Array<number>,
                             animations: SortingAnimation[] = [] ,
                             left: number = 0,
                             right: number = data.length - 1): number {

        const pivot = data[Math.floor((right + left) / 2)];
        let i = left;
        let j = right;

        while (i <= j) {
            while (data[i] < pivot) {
                i++;
            }

            while (data[j] > pivot) {
                j--;
            }

            if (i <= j) {
                [data[i], data[j]] = [data[j], data[i]];
                animations.push(new SortingAnimation([i, j], true));
                i++;
                j--;
            }
        }

        return i;
    }

    public sort(data: number[],
                animations: SortingAnimation[] = [],
                left: number = 0,
                right: number = data.length - 1): SortingAnimation[] {

        let index: number;

        if (data.length > 1) {
            index = QuickSort.partition(data, animations, left, right);
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
