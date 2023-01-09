const express = require("express");
const app = express();
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const {
  toHex,
  utf8ToBytes,
  hexToBytes,
} = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0418c3a2ee149cf157d42d4d5326ad9941db1db47e0e7ff7dd5214e18605541099159b8ff12433b4890f6952386c72f8e213b20ecab662d59d10b5f1cb94807e35": 100,
  "0456f56330480264061e44522c7f56871af857853735f14728e858338531ca5ee923f1abfaf4af5d2340bfe02fc96ece22ffdec8ffc7d29c7dd73db5c551b8ec6d": 50,
  "046a904b29c0c280060ea98b51bb3365553735b3d6c79831d569f9a802a827c3b96bc232a17721f75e1e29ac093f73c4ee4cb8af4899d163781978e58134e82b8b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature, recoveryBit } = req.body;
  const { recipient, amount } = message;
  const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
  const publicKey2 = secp.recoverPublicKey(
    messageHash,
    hexToBytes(signature),
    recoveryBit
  );
  const sender = toHex(publicKey2);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
