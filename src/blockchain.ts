import sha256 from 'sha256';
import { v4 as uuidv4 } from 'uuid';

export type Transaction = { 
    sender: string,
    recipient: string,
    amount: number,
    transactionId: string
};

export type Block = {
    index: number,
    timestamp: number,
    data: Transaction[],
    nonce: number,
    hash: string,
    previousHash: string
};

function Blockchain() {
    this.chain = [] as Block[];
    this.pendingList = [] as Transaction[];
    this.nodeUrl = process.argv[3];
    this.networkNodes = [];

    this.createBlock(1, 'Genesis', 'Genesis');
};

Blockchain.prototype.createBlock = function(
    nonce: number,
    previousHash: string, 
    hash: string
): Block {
    const newBlock: Block = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        data: this.pendingList,
        nonce,
        hash,
        previousHash
    }
    this.pendingList = [];
    this.chain.push(newBlock);
    return newBlock;
};

Blockchain.prototype.getLastBlock = function(): Block {
    return this.chain.at(-1);
};

Blockchain.prototype.addTransaction = function(
    amount: number,
    sender: string,
    recipient: string
): Transaction {
    const newTransaction: Transaction = {
        amount,
        sender,
        recipient,
        transactionId: uuidv4().split('-').join(''),
    }
   return newTransaction;
}

Blockchain.prototype.addTransactionToPendingList = function(transaction: Transaction): Block {
    this.pendingList.push(transaction);
    return this.getLastBlock()['index'] + 1;
} 

Blockchain.prototype.createHash = function(
    previousHash: string,
    data: Transaction[],
    nonce: number
): string {
    const stringToHash: string = previousHash + 
        JSON.stringify(data) + nonce.toString();
    const hash = sha256(stringToHash)
    return hash;
}

Blockchain.prototype.proofOfWork = function(
    previousHash: string,
    data: Transaction[]
): number {
    let nonce: number = 0;
    let hash: string = this.createHash(previousHash, data, nonce);

    while(hash.substring(0,4) != '1337') {
        nonce++;
        hash = this.createHash(previousHash, data, nonce);
        console.log(hash);
    };
    return nonce;
}

export default Blockchain;