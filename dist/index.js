//import * as fs from 'fs';
//fs;
let a = 0;
let b = 1;
for (let i = 0; i <= 100; i++) {
    let c = a + b;
    console.log(`Fib index ${i} is ${c}`);
    a = b;
    b = c;
}
export {};
//# sourceMappingURL=index.js.map