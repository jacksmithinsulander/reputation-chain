# Reputation Chain
In order to compile the typescript into working javascript run:
```
npm run build
```

# Calleable endpoints

## Get:

/api/v1/blockchain

/api/v1/blockchain/mine-block

/api/v1/block/:hash

/api/v1/transaction/:id

/api/v1/transactions/:address

/api/v1/consensus

/api/v1/query/:address

## Post:

/api/v1/block

/api/v1/transaction

/api/v1/transaction/broadcast

/api/v1/node

/api/v1/node/register-node

/api/v1/node/register-nodes

### Important note:

The transaction format follows this form: 

```
{
    "amount": 2,
    "sender": "Vitalik",
    "recipient": "Satoshi"
}
```

The "rating" has to be a number between 0 - 10, since I'd like my social credit score system to be readable in a x / 10 format in the future