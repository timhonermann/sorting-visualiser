import {Component, OnInit} from '@angular/core';
import {SortingAlgorithms} from './sorting-algorithms';
import {QuickSort} from './algorithms/quick-sort';
import {InsertionSort} from './algorithms/insertion-sort';
import {SortingSettings} from './sorting-settings';
import {SortingAnimation} from './sorting-animation';
import {SortingAlgorithm} from './algorithms/sorting-algorithm';
import {SortingState} from './sorting-state';
import {BubbleSort} from './algorithms/bubble-sort';
import {SelectionSort} from './algorithms/selection-sort';
import Timeout = NodeJS.Timeout;

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

    sortingAlgorithms = SortingAlgorithms;
    sortingAlgorithm: SortingAlgorithm;
    sortingAlgorithmKeys: string[];
    selectedSortingAlgorithm = SortingAlgorithms.QuickSort.toString();
    sortingState: SortingState = SortingState.waiting;

    array: number[] = [];
    maxArrayBar = 0;
    comparedValues: number[] = [];

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
                this.timeouts.push(setTimeout(() => {
                    const [indexOne, indexTwo] = this.animations[i].barIndexes;
                    if (this.animations[i].isSwap) {
                        [this.array[indexOne], this.array[indexTwo]] = [this.array[indexTwo], this.array[indexOne]];
                    } else {
                        this.comparedValues = [];
                        this.comparedValues.push(...this.animations[i].barIndexes);
                    }
                    this.setIsSortedIfEndOfAnimations(i);
                }, i * SortingSettings.ANIMATION_SPEED));
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
            case SortingAlgorithms.BubbleSort:
                this.sortingAlgorithm = new BubbleSort();
                break;
            case SortingAlgorithms.SelectionSort:
                this.sortingAlgorithm = new SelectionSort();
                break;
            default:
                this.sortingAlgorithm = new QuickSort();
        }
    }

    generateRandomArray() {
        this.stopTimeouts();
        this.animations = [];
        this.comparedValues = [];
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

    getIsArraySorted(): boolean {
        return this.sortingState === SortingState.sorted;
    }

    getIsBeingCompared(index: number): boolean {
        return this.comparedValues.includes(index);
    }

    getIsSortButtonDisabled(): boolean {
        return this.sortingState !== SortingState.waiting;
    }

    getArrayBarWidth(value: number): number {
        return value / this.maxArrayBar * 50;
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
