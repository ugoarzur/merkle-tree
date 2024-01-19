import Keccak from 'keccak'

// Left and Right are optional to allow to ascend up to the root tree element
interface MerkleNode {
  hash: string
  left?: MerkleNode
  right?: MerkleNode
}

function merkleHash(left: Buffer, right: Buffer): string {
  console.log(`Creating hash`)
  return Keccak('keccak512')
    .update(Buffer.concat([left, right]))
    .digest('hex')
    .toString()
}

function buildMerkleTree(transactions: string[]): MerkleNode {
  if (transactions.length === 1) {
    console.log('Accessing root', transactions[0])
    return { hash: transactions[0] }
  }
  const middle: number = Math.ceil(transactions.length / 2)
  const left: MerkleNode = buildMerkleTree(transactions.slice(0, middle))
  const right: MerkleNode = buildMerkleTree(transactions.slice(middle))
  return {
    left,
    right,
    hash: merkleHash(
      Buffer.from(left.hash, 'hex'),
      Buffer.from(right.hash, 'hex')
    ),
  }
}

function getMerkleProof(
  root: MerkleNode,
  targetedTransaction: string
): string[] {
  const proof: string[] = []
  function traverse(node: MerkleNode | undefined): boolean {
    if (!node) {
      return false
    }

    if (!node.left && !node.right && node.hash === targetedTransaction) {
      return true
    }

    const leftFound: boolean = traverse(node.left)
    const rightFound: boolean = traverse(node.right)

    if (leftFound || rightFound) {
      console.log(`pushing ${leftFound} || ${rightFound}`)
      proof.push(node.left ? node.right!.hash : node.left!.hash)
    }
    return leftFound || rightFound
  }
  traverse(root)
  return proof
}

const transactions: string[] = [
  'Transaction1',
  'Transaction2',
  'Transaction3',
  'Transaction4',
]
const merkleTree: MerkleNode = buildMerkleTree(transactions)

console.info('=== Building Merkle Tree')
console.log('Merkle Tree:', merkleTree)
console.log('Root hash:', merkleTree.hash)

console.info('=== Searching for proof')
const targetedTransaction = transactions[1]
console.log(`Targeted transaction ${targetedTransaction}`)
const merkleProof: string[] = getMerkleProof(merkleTree, targetedTransaction)
console.log(`Merkle Proof: ${merkleProof}`)
