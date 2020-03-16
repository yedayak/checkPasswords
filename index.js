async function passwordSubmitted(e) {
    plainPassword = document.querySelector('#password-input').value;
    const SHA1 = new Hashes.SHA1;

    let hash = SHA1.hex(plainPassword);
    let part = hash.slice(0, 5);
    console.log(hash);
    const response = await fetch(`https://api.pwnedpasswords.com/range/${part}`, {
        headers: {'Add-Padding': true}
    });
    const result = await response.text();
    // matches a specific hash with a colon and a number after it,
    // e.g 1F2A4539009876542ACDDC4F:132 and puts the number into capture group 1.
    const exp = new RegExp(`${hash.slice(5)}:(\\d+)`, 'i');
    const reResults = result.match(exp);
    let amount = 0;
    if (reResults) {
        amount = reResults[1];
    }
    document.querySelector('#password-result').textContent = `${amount}`;
    console.log(amount);
}


document.querySelector('#password-input').addEventListener("keyup", async event => {
    if (event.key !== "Enter") return;
    await passwordSubmitted(event);
    event.preventDefault();
});