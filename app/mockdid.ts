// This simulates a DID Document that would normally be fetched from the Solana blockchain.
export const mockDidDocument = {
  id: "did:qrid:ian",
  verificationMethod: [{
    id: "did:qrid:ian#solana-key",
    type: "Ed25519VerificationKey2018",
    controller: "did:qrid:ian",
  }],
  service: [{
    id: "did:qrid:ian#solana-pay",
    type: "SolanaPay",
    // ⚠️ REPLACE THIS WITH YOUR DEVNET WALLET ADDRESS
    serviceEndpoint: "EyGgzZ1hYBnDe8Xh85Ps3NZoXxyUMPrLZuWGFjDfswYK" 
  }]
};