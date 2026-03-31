let num_candidates = parseInt(prompt("Enter the number of candidates"))
let candidates = []
for (let i = 0; i < num_candidates; i++){
    let candidate = prompt("Enter the name of candidate").toLowerCase()
    candidates.push({"name": candidate,"votes": 0})
}
for (name in candidates) {
    console.log(candidates[name])
}
let num_voters = parseInt(prompt("Enter number of voters"))
for (let i = 0; i < num_voters; i++){
    let vote = prompt("Enter name of the candidate").toLowerCase()
    for (let cand of candidates) {
        if (cand.name === vote) {
            cand.votes += 1;
            break;
        }
    }
}
candidates.sort((a,b) => b.votes - a.votes)
console.log(`The winner is ${candidates[0].name} with ${candidates[0].votes} votes`)
console.log("results:")
for (candi in candidates) console.log(`${candidates[candi].name}: ${candidates[candi].votes}`)