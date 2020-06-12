import {SortingAnimation} from '../sorting-animation';

export interface SortingAlgorithm {
    sort(array: number[], animations: SortingAnimation[]): SortingAnimation[];
}
