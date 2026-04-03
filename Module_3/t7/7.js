let target = document.getElementById("target")
function h(evt){
    target.src = "img/picB.jpg"
}
function o(evt){
    target.src = "img/picA.jpg"
}
target.addEventListener("mouseover", h)
target.addEventListener("mouseout", o)
