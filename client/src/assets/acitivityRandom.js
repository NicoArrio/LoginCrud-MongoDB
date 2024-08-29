//Crear un algoritmo que nos devuelva el número mayor y menor 
//de un array (sin iterar más de una vez, y sin ordenarlo)
let arr = [2,5,-3,7,1]
function mayorYMenor(arr) {
    if (arr.length === 0) return null;

    let max = arr[0];
    let min = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        } else if (arr[i] < min) {
            min = arr[i];
        }
    }

    return { max, min };
}
let result = mayorYMenor(arr)
console.log(result)//[-3,1,2,5,7]
