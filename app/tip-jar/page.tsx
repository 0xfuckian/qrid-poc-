"use client";

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function TipJar() {
  const [didName, setDidName] = useState(''); 
  const [walletAddress, setWalletAddress] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [resolvedDid, setResolvedDid] = useState('');

  const generateTipQR = () => {
    if (!walletAddress.trim()) {
      alert("Please enter a Solana Devnet wallet address first!");
      return;
    }

    const finalDid = didName.trim() ? `did:qrid:${didName.trim()}` : 'did:qrid:anonymous';
    
    // Just the raw address. No Solana Pay URL, no extra parameters.
    setResolvedDid(finalDid);
    setQrUrl(walletAddress.trim());
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Qrid.me PoC</h1>
      <h2>Type 1: Static Tip QR</h2>
      
      {!qrUrl ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
          
          {/* Input Box 1: DID Name */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Create Your Qrid Identity:</label>
            <div style={{ 
              display: 'flex', alignItems: 'center', border: '1px solid #ccc', 
              borderRadius: '5px', padding: '0 10px', backgroundColor: '#f9f9f9'
            }}>
              <span style={{ color: '#888', fontSize: '16px' }}>did:qrid:</span>
              <input 
                type="text" 
                placeholder="ian" 
                value={didName}
                onChange={(e) => setDidName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))} 
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                style={{ 
                  border: 'none', outline: 'none', 
                  padding: '10px 0', /* Fixes the space */
                  fontSize: '16px', flex: 1, backgroundColor: 'transparent', color: '#000' 
                }}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
              Allowed: Letters, numbers, hyphens (-), and underscores (_). No spaces or special characters.
            </p>
          </div>

          {/* Input Box 2: Wallet Address */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
              Receiving Wallet Address (Devnet):
            </label>
            <input 
              type="text" 
              placeholder="Paste your Phantom Devnet address here..." 
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              style={{ 
                width: '100%', padding: '10px', fontSize: '16px', 
                borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' 
              }}
            />
          </div>

          <button 
            onClick={generateTipQR}
            style={{ 
              padding: '15px 30px', fontSize: '18px', cursor: 'pointer', 
              background: '#000', color: '#fff', border: 'none', borderRadius: '5px', marginTop: '10px' 
            }}
          >
            Resolve DID & Generate Tip QR
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: '#00a86b', fontWeight: 'bold' }}>
            ✅ Resolved: {resolvedDid}
          </p>
          <p style={{ fontSize: '14px', color: '#555' }}>
            Sending to: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </p>
          <QRCodeSVG value={qrUrl} size={256} />
          <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            Scan with Phantom to get the address, then type 1 USDC
          </p>
          <button 
            onClick={() => { setQrUrl(''); setResolvedDid(''); setWalletAddress(''); setDidName(''); }}
            style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}