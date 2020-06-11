import {Algorithm} from './algorithm';
import {SortingSettings} from '../sorting-settings';
import {SortingAnimation} from '../sorting-animation';

export class MergeSort implements Algorithm {

    animations: SortingAnimation[] = [];

    public sort(array: number[]): SortingAnimation[] {
        return this.animations;
    }

    // private static merge(mainArray: number[],
    //                      startIdx: number,
    //                      middleIdx: number,
    //                      endIdx: number,
    //                      auxiliaryArray: number[],
    //                      animations: number[][],
    // ) {
    //     let k = startIdx;
    //     let i = startIdx;
    //     let j = middleIdx + 1;
    //     while (i <= middleIdx && j <= endIdx) {
    //         // These are the values that we're comparing; we push them once
    //         // to change their color.
    //         animations.push([i, j]);
    //         // These are the values that we're comparing; we push them a second
    //         // time to revert their color.
    //         animations.push([i, j]);
    //         if (auxiliaryArray[i] <= auxiliaryArray[j]) {
    //             // We overwrite the value at index k in the original array with the
    //             // value at index i in the auxiliary array.
    //             animations.push([k, auxiliaryArray[i]]);
    //             mainArray[k++] = auxiliaryArray[i++];
    //         } else {
    //             // We overwrite the value at index k in the original array with the
    //             // value at index j in the auxiliary array.
    //             animations.push([k, auxiliaryArray[j]]);
    //             mainArray[k++] = auxiliaryArray[j++];
    //         }
    //     }
    //     while (i <= middleIdx) {
    //         // These are the values that we're comparing; we push them once
    //         // to change their color.
    //         animations.push([i, i]);
    //         // These are the values that we're comparing; we push them a second
    //         // time to revert their color.
    //         animations.push([i, i]);
    //         // We overwrite the value at index k in the original array with the
    //         // value at index i in the auxiliary array.
    //         animations.push([k, auxiliaryArray[i]]);
    //         mainArray[k++] = auxiliaryArray[i++];
    //     }
    //     while (j <= endIdx) {
    //         // These are the values that we're comparing; we push them once
    //         // to change their color.
    //         animations.push([j, j]);
    //         // These are the values that we're comparing; we push them a second
    //         // time to revert their color.
    //         animations.push([j, j]);
    //         // We overwrite the value at index k in the original array with the
    //         // value at index j in the auxiliary array.
    //         animations.push([k, auxiliaryArray[j]]);
    //         mainArray[k++] = auxiliaryArray[j++];
    //     }
    //
    // }
    //
    // sort(array: number[]): number[] {
    //     const animations = this.getMergeSortAnimations(array);
    //     for (let i = 0; i < animations.length; i++) {
    //         const arrayBars = document.getElementsByClassName('array-bar');
    //         const isColorChange = i % 3 !== 2;
    //         if (isColorChange) {
    //             const [barOneIdx, barTwoIdx] = animations[i];
    //             const barOne = arrayBars[barOneIdx] as HTMLElement;
    //             const barTwo = arrayBars[barTwoIdx] as HTMLElement;
    //             const barOneStyle = barOne.style;
    //             const barTwoStyle = barTwo.style;
    //             const color = i % 3 === 0 ? SortingSettings.SECONDARY_COLOR : SortingSettings.PRIMARY_COLOR;
    //             setTimeout(() => {
    //                 barOneStyle.backgroundColor = color;
    //                 barTwoStyle.backgroundColor = color;
    //             }, i * SortingSettings.ANIMATION_SPEED_MS);
    //         } else {
    //             setTimeout(() => {
    //                 const [barOneIdx, newWidth] = animations[i];
    //                 const barOne = arrayBars[barOneIdx] as HTMLElement;
    //                 const barOneStyle = barOne.style;
    //                 barOneStyle.width = `${newWidth}px`;
    //             }, i * SortingSettings.ANIMATION_SPEED_MS);
    //         }
    //     }
    //     return array;
    // }
    //
    // private mergeSortHelper(mainArray: number[],
    //                         startIdx: number,
    //                         endIdx: number,
    //                         auxiliaryArray: number[],
    //                         animations: number[][],
    // ) {
    //     if (startIdx === endIdx) {
    //         return;
    //     }
    //     const middleIdx = Math.floor((startIdx + endIdx) / 2);
    //     this.mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    //     this.mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    //     MergeSort.merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
    // }
    //
    // private getMergeSortAnimations(array: number[]) {
    //     const animations = [];
    //     if (array.length <= 1) {
    //         return array;
    //     }
    //     const auxiliaryArray = array.slice();
    //     this.mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    //     return animations;
    // }
}
