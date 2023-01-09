const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();

console.log("private key:", toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log("\n ");
console.log("public key:", toHex(publicKey));

// private key: 626c3f817b57c7fd2e75ff01ef868d4b649077f2b7768995cd72659f6c3a20d1
// public key: 0418c3a2ee149cf157d42d4d5326ad9941db1db47e0e7ff7dd5214e18605541099159b8ff12433b4890f6952386c72f8e213b20ecab662d59d10b5f1cb94807e35

// private key: ac949c47c4ea9b983c9f527fb380c874eecd460e3db34acd67aeff66ac2d706d
// public key: 0456f56330480264061e44522c7f56871af857853735f14728e858338531ca5ee923f1abfaf4af5d2340bfe02fc96ece22ffdec8ffc7d29c7dd73db5c551b8ec6d

// private key: ea088aa74bcd086e82f9f359e972aec2f87a3c344b5fa51ce44bc1c0defbb981
// public key: 046a904b29c0c280060ea98b51bb3365553735b3d6c79831d569f9a802a827c3b96bc232a17721f75e1e29ac093f73c4ee4cb8af4899d163781978e58134e82b8b
