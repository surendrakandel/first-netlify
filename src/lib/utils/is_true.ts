import { areAllElementsEmpty } from './empty_object';

/**
 * check if the value is not undefined,null,false, or empty object.
 * @param {any} any - any value.
 * @returns {boolean} true or false.
 */
// export function isValueValid(value:any): boolean {
//     if(typeof value == 'object'){
//         if(Object.keys(value).length === 0){
//             return false
//         }else{
//             return !areAllElementsEmpty({ obj: value })
//         }
//     }
//     if (value === false || value === null || value === undefined || value === 0 || value === '' || value === 'undefined' || value === 'null') {
//       return false;
//     } else {
//       return true;
//     }
//   }
