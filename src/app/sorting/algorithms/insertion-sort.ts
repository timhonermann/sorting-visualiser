import {SortingAlgorithm} from './sorting-algorithm';
import {SortingAnimation} from '../sorting-animation';

export class InsertionSort implements SortingAlgorithm {

    public sort(data: number[], animations: SortingAnimation[] = []): SortingAnimation[] {

        for (let i = 0; i < data.length; i++) {
            let j = i;

            if (j > 0) {
                animations.push(new SortingAnimation([j, j - 1], false));
            }
            while (j > 0 && data[j] < data[j - 1]) {
                const temp = data[j];
                data[j] = data[j - 1];
                data[j - 1] = temp;
                animations.push(new SortingAnimation([j, j - 1], true));

                j = j - 1;
                if (j > 0) {
                    animations.push(new SortingAnimation([j, j - 1], false));
                }
            }
        }
        return animations;
    }

}
