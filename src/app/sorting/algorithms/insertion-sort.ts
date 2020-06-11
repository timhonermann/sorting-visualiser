import {Algorithm} from './algorithm';
import {SortingAnimation} from '../sorting-animation';

export class InsertionSort implements Algorithm {

    public sort(data: number[], animations: SortingAnimation[] = []): SortingAnimation[] {

        for (let i = 0; i < data.length; i++) {
            let j = i;

            while (j > 0 && data[j] < data[j - 1]) {
                const temp = data[j];
                data[j] = data[j - 1];
                data[j - 1] = temp;
                animations.push(new SortingAnimation([j, j - 1], true));

                j = j - 1;
            }
        }
        return animations;
    }

}
