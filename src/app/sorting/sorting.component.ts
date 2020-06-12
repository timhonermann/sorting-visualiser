import {Component, OnInit} from '@angular/core';
import {SortingAlgorithms} from './sorting-algorithms';
import {QuickSort} from './algorithms/quick-sort';
import {InsertionSort} from './algorithms/insertion-sort';
import {SortingSettings} from './sorting-settings';
import {SortingAnimation} from './sorting-animation';
import {Algorithm} from './algorithms/algorithm';
import {SortingState} from './sorting-state';
import Timeout = NodeJS.Timeout;

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

    sortingAlgorithms = SortingAlgorithms;
    sortingAlgorithm: Algorithm;
    sortingAlgorithmKeys: string[];
    selectedSortingAlgorithm = '1';
    sortingState: SortingState = SortingState.waiting;

    array: number[] = [];
    maxArrayBar = 0;

    animations: SortingAnimation[];

    timeouts: Timeout[] = [];

    ngOnInit() {
        this.sortingAlgorithmKeys = Object.keys(SortingAlgorithms).filter(Number);
        this.generateRandomArray();
        this.setSortingAlgorithm();
    }

    startSorting(): void {
        this.sortingState = SortingState.sorting;
        const auxiliaryArray = this.array.slice();
        if (this.sortingAlgorithm) {
            this.animations = this.sortingAlgorithm.sort(auxiliaryArray, this.animations);
            for (let i = 0; i < this.animations.length; i++) {
                if (this.animations[i].isSwap) {
                    this.timeouts.push(setTimeout(() => {
                        const [indexOne, indexTwo] = this.animations[i].barIndexes;
                        [this.array[indexOne], this.array[indexTwo]] = [this.array[indexTwo], this.array[indexOne]];
                        this.setIsSortedIfEndOfAnimations(i);
                    }, i * (SortingSettings.ANIMATION_SPEED / this.animations.length)));
                }
            }
        }
    }

    setSortingAlgorithm(): void {

        switch (+this.selectedSortingAlgorithm) {
            case SortingAlgorithms.QuickSort:
                this.sortingAlgorithm = new QuickSort();
                break;
            case SortingAlgorithms.InsertionSort:
                this.sortingAlgorithm = new InsertionSort();
                break;
            default:
                this.sortingAlgorithm = new QuickSort();
        }
    }

    generateRandomArray() {
        this.stopTimeouts();
        this.animations = [];
        this.sortingState = SortingState.waiting;
        this.array = Array.from(
            { length: SortingSettings.DEFAULT_ARRAY_SIZE },
            () => Math.floor(
                Math.random() *
                    (SortingSettings.MAXIMUM_ARRAY_VALUE - SortingSettings.MINIMUM_ARRAY_VALUE))
                    + SortingSettings.MINIMUM_ARRAY_VALUE
        );
        this.maxArrayBar = Math.max(...this.array);
    }

    private setIsSortedIfEndOfAnimations(index: number) {
        if (index === this.animations.length - 1) {
            this.sortingState = SortingState.sorted;
        }
    }

    private stopTimeouts() {
        for (const timeout of this.timeouts) {
            clearTimeout(timeout);
        }
    }

}
