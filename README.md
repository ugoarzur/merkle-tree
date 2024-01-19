# Merkle Tree

A dead simple repo to play with Merkle Tree.

## What is a Merkle Tree?

A tree with verifiable informations where each information has footprint within their parent.
It's a structured tree of data used in cryptography to verify intergrity of an information within a larger group of informations.

A Merkle tree is structured with verifiable informations where each leaf contain a piece of information. This data structure is used in cryptography to verify intergrity of an information within a larger group.
A leaf contain a piece of data and each non-terminal node represent the hash of the values of its child nodes.
The fingerprint of the root node _(or "Merkle root")_ can be used to verify the integrity of the entier data set.

### Concrete example:

Let's say we have this structure

```json
{
  "left": {
    "left": { "hash": "Transaction1" },
    "right": { "hash": "Transaction2" },
    "hash": "0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e"
  },
  "right": {
    "left": { "hash": "Transaction3" },
    "right": { "hash": "Transaction4" },
    "hash": "0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e"
  },
  "hash": "4ffa81699b40083d1a21fe7d273eb80fb04728f7e137868c4c4820d65ebb3ed572856e8a23550d743df7fc679cbfa01ba6e6adf919fb973961c5fac05276e7c5"
}
```

Some Explications

Here The Root hash is:`4ffa81699b40083d1a21fe7d273eb80fb04728f7e137868c4c4820d65ebb3ed572856e8a23550d743df7fc679cbfa01ba6e6adf919fb973961c5fac05276e7c5` and represent 2 leafs (left and right) that themselves have a hash representing 2 leafs (left and right).

One we have the `root` and the transaction name (ex: `Transaction2`) we can prove its presence and verify that data are consistent.

## What is a Merkle Proof?

It's a logarithmic method to verify presence and integrity of an information within a larger group of data.

### How to obtain a Merkle Proof?

To obtain a **Merkle Proof** we do need the root footprint (first hash of the tree) and a transaction name. With a `traverse(node: MerkleNode|undefined): string[]` function we can go across nodes and split left and right data recursively. This allow us to travel and verify each node against the targeted transaction. When we neither have left nor right leaf and the node is strictly equal to our targeted transaction we can return a boolean

```
=== Searching for proof
Targeted transaction Transaction2
pushing false || true
pushing true || false
Merkle Proof: Transaction2,0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e
```
