var readline = require('readline');
  
var rl = readline.createInterface(
    process.stdin, process.stdout);

    // rl.setPrompt(`What is your age? `);
    // rl.prompt();
    // rl.on('line', (age) => {
    //     console.log(`Age received by the user: ${age}`);
    //     rl.close();
    // });

console.log('Nhap input: ')    
rl.on('line', (input) => {
    console.log(`Input Received: ${input}`);
    rl.close();
});