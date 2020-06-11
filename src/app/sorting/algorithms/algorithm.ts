import {SortingAnimation} from '../sorting-animation';

export interface Algorithm {
    sort(array: number[], animations: SortingAnimation[]): SortingAnimation[];
}
