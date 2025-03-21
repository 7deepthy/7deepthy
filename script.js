function convert(type, method) {
    const input = document.getElementById('input').value;
    let output = '';

    switch (method) {
        case 'uri':
            output = (type === 'encode') ? encodeURIComponent(input) : decodeURIComponent(input);
            break;
        case 'base64':
            output = (type === 'encode') ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input)));
            break;
        case 'html':
            const textArea = document.createElement('textarea');
            if (type === 'encode') {
                textArea.innerText = input;
                output = textArea.innerHTML;
            } else {
                textArea.innerHTML = input;
                output = textArea.value;
            }
            break;
        case 'unicode':
            output = (type === 'encode') ? input.split('').map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')).join('') : input.replace(/\\u([\d\w]{4})/gi, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
            break;
        case 'hex':
            output = (type === 'encode') ? Array.from(input).map(ch => ch.charCodeAt(0).toString(16)).join('') : String.fromCharCode(...input.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            break;
        case 'binary':
            output = (type === 'encode') ? Array.from(input).map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0')).join('') : String.fromCharCode(...input.match(/.{1,8}/g).map(byte => parseInt(byte, 2)));
            break;
    }

    document.getElementById('output').value = output;
}

function encryptMessage() {
    const message = document.getElementById("message").value;
    const key = document.getElementById("key").value;
    if (!message || !key) {
        alert("Please enter both message and key");
        return;
    }
    let encrypted = btoa(unescape(encodeURIComponent(message + key)));
    document.getElementById("output").value = encrypted;
}

function decryptMessage() {
    const encryptedMessage = document.getElementById("message").value;
    const key = document.getElementById("key").value;
    if (!encryptedMessage || !key) {
        alert("Please enter both encrypted message and key");
        return;
    }
    try {
        let decrypted = decodeURIComponent(escape(atob(encryptedMessage)));
        if (decrypted.endsWith(key)) {
            document.getElementById("output").value = decrypted.slice(0, -key.length);
        } else {
            alert("Incorrect key!");
        }
    } catch (error) {
        alert("Invalid encrypted message!");
    }
}
