"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function TipJar() {
  const [didName, setDidName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [resolvedDid, setResolvedDid] = useState("");

  const generateTipQR = () => {
    const name = didName.trim() || "ian";

    // Optional: keep collecting a wallet for later registry/mockdid updates.
    // The QR itself must NOT encode the address — only the identity URL.
    if (!walletAddress.trim()) {
      alert("Paste your Devnet receiving address (stored for you; not put in the QR).");
      return;
    }

    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://qrid-poc.vercel.app";

    const payUrl = `${origin}/pay/${name}`;

    setResolvedDid(`did:qrid:${name}`);
    setQrUrl(payUrl);
  };

  const reset = () => {
    setQrUrl("");
    setResolvedDid("");
    setWalletAddress("");
    setDidName("");
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: 50,
        fontFamily: "sans-serif",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <h1>Qrid.me PoC</h1>
      <h2>Type 1: Identity Tip QR</h2>
      <p style={{ fontSize: 14, color: "#555" }}>
        QR encodes an identity URL (/pay/handle), not a wallet address.
      </p>

      {!qrUrl ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 30,
          }}
        >
          <div style={{ textAlign: "left" }}>
            <label
              style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}
            >
              Create Your Qrid Identity:
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: 5,
                padding: "0 10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <span style={{ color: "#888", fontSize: 16 }}>did:qrid:</span>
              <input
                type="text"
                placeholder="ian"
                value={didName}
                onChange={(e) =>
                  setDidName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))
                }
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                style={{
                  border: "none",
                  outline: "none",
                  padding: "10px 0",
                  fontSize: 16,
                  flex: 1,
                  backgroundColor: "transparent",
                  color: "#000",
                }}
              />
            </div>
            <p style={{ fontSize: 12, color: "#888", marginTop: 5 }}>
              PoC resolver currently only serves handle &quot;ian&quot; (see
              mockdid). Use ian for the end-to-end demo.
            </p>
          </div>

          <div style={{ textAlign: "left" }}>
            <label
              style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}
            >
              Receiving Wallet Address (Devnet):
            </label>
            <input
              type="text"
              placeholder="Paste your Phantom Devnet address..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              style={{
                width: "100%",
                padding: 10,
                fontSize: 16,
                borderRadius: 5,
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
            <p style={{ fontSize: 12, color: "#888", marginTop: 5 }}>
              Not written into the QR. Put this same address in{" "}
              <code>app/mockdid.ts</code> → serviceEndpoint so /pay/ian can
              settle to you.
            </p>
          </div>

          <button
            type="button"
            onClick={generateTipQR}
            style={{
              padding: "15px 30px",
              fontSize: 18,
              cursor: "pointer",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            Generate Identity QR
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          <p style={{ color: "#00a86b", fontWeight: "bold" }}>
            Resolved: {resolvedDid}
          </p>
          <p style={{ fontSize: 14, color: "#555", wordBreak: "break-all" }}>
            QR points to: {qrUrl}
          </p>
          <div style={{ margin: "20px 0" }}>
            <QRCodeSVG value={qrUrl} size={256} />
          </div>
          <p style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
            Scan to open the Qrid.me resolver, then Pay with Wallet (Solana Pay).
          </p>
          <p style={{ fontSize: 12, color: "#888" }}>
            Receiving wallet (not in QR): {walletAddress.slice(0, 4)}…
            {walletAddress.slice(-4)}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 20, padding: 10, cursor: "pointer" }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}