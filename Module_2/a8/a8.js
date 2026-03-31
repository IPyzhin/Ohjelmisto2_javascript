function concat(array){
    let string = ''
    for (let i = 0; i < array.length; i++) {
        string += array[i]
    }
    return document.querySelector('#str').innerHTML = string
}
ar = ["Johnny", "DeeDee", "Joey", "Marky"]
concat(ar)
