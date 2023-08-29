type Transaction = { 
    sender: string,
    recipient: string,
    amount: number
};

type Block = {
    index: number,
    timestamp: number,
    data: Transaction[],
    nonce: number,
    hash: string,
    previousHash: string
};

function Blockchain() {
    this.chain = [];
    this.pendingList = [];
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
): Block {
    const newTransaction: Transaction = {
        amount,
        sender,
        recipient
    }
    this.pendingList.push(newTransaction);
    return this.getLastBlock()['index'] + 1;
}

export default Blockchain;