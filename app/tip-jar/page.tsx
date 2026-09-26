"use client";

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { encodeURL } from '@solana/pay';
import BigNumber from 'bignumber.js';

// Mock DID Document (moved inside to fix the import error)
const mockDidDocument = {
  id: "did:qrid:ian",
  service: [{
    id: "did:qrid:ian#solana-pay",
    type: "SolanaPay",
    // ⚠️ REPLACE THIS WITH YOUR OWN SOLANA DEVNET WALLET ADDRESS
    serviceEndpoint: "EyGgzZ1hYBnDe8Xh85Ps3NZoXxyUMPrLZuWGFjDfswYK" 
  }]
};

export default function TipJar() {
  const [qrUrl, setQrUrl] = useState('');
  const [resolvedDid, setResolvedDid] = useState('');
  
  // USDC Devnet Mint Address
  const usdcMint = '4zMMC9srt5i5X14GAgXhaHii3GnPAEERYPJgZJDncDU';
  
  // 1 USDC (6 decimals)
  const amount = new BigNumber(1);

  const generateTipQR = () => {
    // 1. Resolve the DID Document (In reality, this queries the Solana blockchain)
    const did = mockDidDocument.id;
    const walletAddress = mockDidDocument.service[0].serviceEndpoint;
    
    // 2. Generate the Solana Pay URL
    const url = encodeURL({
      recipient: walletAddress as any, 
      amount: amount as any,
      splToken: usdcMint as any,
      label: 'Qrid.me PoC Tip Jar',
      message: 'Thanks for the tip!',
    });
    
    setResolvedDid(did);
    setQrUrl(url.toString());
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Qrid.me PoC</h1>
      <h2>Type 1: Static Tip QR</h2>
      
      {!qrUrl ? (
        <button 
          onClick={generateTipQR}
          style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', background: '#000', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          Resolve DID & Generate Tip QR
        </button>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: '#00a86b', fontWeight: 'bold' }}>
            ✅ Resolved: {resolvedDid}
          </p>
          <QRCodeSVG value={qrUrl} size={256} />
          <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            Scan with Phantom to tip 1 USDC
          </p>
          <button 
            onClick={() => { setQrUrl(''); setResolvedDid(''); }}
            style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}