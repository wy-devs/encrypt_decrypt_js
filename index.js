const input = document.getElementById("input");
const output = document.getElementById('output');
const status = document.getElementById("status");


const punctuation =  "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const digits = '0123456789';
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const chars = (" " + punctuation + digits + letters ).split("");

function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [ array[j] , array[i]] ;
    }
    return array;

}
function translate(text, from, to){
    let cipher = "";
    for(const letter of text){
        const index = from.indexOf(letter);
        cipher += index === -1 ? letter : to[index];
    }
    return cipher;
}
function saveKeys(){
    localStorage.setItem("cipherKeys",JSON.stringify(keys));

}
function loadKey(){
    const saved  = localStorage.getItem("cipherKeys");
    if(saved){
        const list = JSON.parse(saved);
        if(list.length === chars.length) return list;
    }
    return null;
}
let keys = loadKey();
if(!keys){
    keys = shuffle([...chars])
    saveKeys();
}
document.getElementById('encrypt').onclick = function(){
    output.value = translate(input.value, chars, keys);
    status.textContent = "Encrypted!";

};
document.getElementById("decrypt").onclick = function(){
    output.value = translate(input.value, keys, chars);
    status.textContent = "Decrypted!";

};
document.getElementById("newKey").onclick = function(){
    keys = shuffle([...chars]);
    saveKeys();
    status.textContent = "New key created. Old messages can no longer be decrypted.";

}
document.getElementById("copy").onclick = async function(){
    try{
        await navigator.clipboard.writeText(output.value);
        status.textContent = "Copied.";
    }
    catch(error){
        status.textContent = "Copy failed.Select the text and copy it manually.";
    }
};
