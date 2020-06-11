import {Component, OnInit} from '@angular/core';
import {SortingAlgorithms} from '../sorting-algorithms';
import {Context} from './context';
import {QuickSort} from './algorithms/quick-sort';
import {InsertionSort} from './algorithms/insertion-sort';
import {MergeSort} from './algorithms/merge-sort';
import {SortingSettings} from './sorting-settings';
import {SortingAnimation} from './sorting-animation';
import Timeout = NodeJS.Timeout;

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

    sortingAlgorithm: SortingAlgorithms = SortingAlgorithms.QuickSort;
    sortingAlgorithms = SortingAlgorithms;
    sortingAlgorithmKeys: string[];

    context: Context;

    array: number[] = [];
    isSorted: boolean;

    animations: SortingAnimation[];
    timeouts: Timeout[] = [];

    ngOnInit() {
        this.sortingAlgorithmKeys = Object.keys(this.sortingAlgorithms).filter(Number);
        this.generateRandomArray();
        this.setSortingStrategy();
    }

    startSorting(): void {
        const auxiliaryArray = this.array.slice();
        if (this.context) {
            this.animations = this.context.getSortingAnimations(auxiliaryArray, this.animations);
            for (let i = 0; i < this.animations.length; i++) {
                if (this.animations[i].isSwap) {
                    this.timeouts.push(setTimeout(() => {
                        const [indexOne, indexTwo] = this.animations[i].barIndexes;
                        [this.array[indexOne], this.array[indexTwo]] = [this.array[indexTwo], this.array[indexOne]];
                        this.setIsSortedIfEndOfAnimations(i);
                    }, i * SortingSettings.ANIMATION_SPEED_MS));
                }
            }
        }
    }

    setSortingStrategy(): void {
        if (!this.context) {
            this.context = new Context(new QuickSort());
        }

        this.generateRandomArray();

        switch (+this.sortingAlgorithm) {
            case SortingAlgorithms.QuickSort:
                this.context.setAlgorithm(new QuickSort());
                break;
            case SortingAlgorithms.MergeSort:
                this.context.setAlgorithm(new MergeSort());
                break;
            case SortingAlgorithms.InsertionSort:
                this.context.setAlgorithm(new InsertionSort());
                break;
            default:
                this.context.setAlgorithm(new QuickSort());
        }
    }

    generateRandomArray() {
        this.stopTimeouts();
        this.animations = [];
        this.isSorted = false;
        this.array = Array.from(
            { length: SortingSettings.DEFAULT_ARRAY_SIZE },
            () => Math.floor(
                Math.random() *
                    (SortingSettings.MAXIMUM_ARRAY_VALUE - SortingSettings.MINIMUM_ARRAY_VALUE))
                    + SortingSettings.MINIMUM_ARRAY_VALUE
        );
    }

    getArrayBarStyle() {
        return {
            'background-color': this.isSorted ? SortingSettings.SORTED_COLOR : SortingSettings.PRIMARY_COLOR,
        };
    }

    private setIsSortedIfEndOfAnimations(index: number) {
        this.isSorted = index === this.animations.length - 1;
    }

    private stopTimeouts() {
        for (const timeout of this.timeouts) {
            clearTimeout(timeout);
        }
    }

}
