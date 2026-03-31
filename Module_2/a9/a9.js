function even(array){
    let newarray = []
    for (let i = 0; i < array.length;i++){
        if (array[i] % 2 === 0){
            newarray.push(array[i])
        }
    }
    return newarray
}

ar = [2,7,4]
console.log(ar)
console.log(even(ar))