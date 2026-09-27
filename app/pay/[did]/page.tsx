"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PublicKey } from "@solana/web3.js";
import { mockDidDocument } from "../../mockdid";

const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
const POC_AMOUNT = 1;

type Status = "idle" | "opening" | "error";

export default function PayByDidPage() {
  const params = useParams();
  const handle = ((params?.did as string) || "").toLowerCase().trim();

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const identity = useMemo(() => {
    if (!handle) return null;
    const mockHandle = mockDidDocument.id.replace("did:qrid:", "").toLowerCase();
    if (handle !== mockHandle) return null;
    const endpoint = mockDidDocument.service?.[0]?.serviceEndpoint;
    if (!endpoint) return null;
    return {
      did: mockDidDocument.id,
      handle,
      displayName: "Ian Creative Fund",
      recipient: endpoint,
    };
  }, [handle]);

  const solanaPayUrl = useMemo(() => {
    if (!identity) return null;
    try {
      const recipient = new PublicKey(identity.recipient).toBase58();
      const mint = new PublicKey(DEVNET_USDC_MINT).toBase58();
      const url = new URL("solana:" + recipient);
      url.searchParams.set("amount", String(POC_AMOUNT));
      url.searchParams.set("spl-token", mint);
      url.searchParams.set("label", identity.displayName);
      url.searchParams.set("message", "Payment to " + identity.did);
      url.searchParams.set("memo", "qrid:" + identity.handle);
      return url.toString();
    } catch {
      return null;
    }
  }, [identity]);

  function payWithWallet() {
    setError(null);
    if (!solanaPayUrl) {
      setError("Invalid recipient. Set serviceEndpoint in app/mockdid.ts to your devnet pubkey.");
      setStatus("error");
      return;
    }
    setStatus("opening");
    window.location.href = solanaPayUrl;
    setTimeout(function () {
      setStatus("idle");
    }, 3000);
  }

  if (!identity) {
    return (
      <div style={{ padding: 40, textAlign: "center", fontFamily: "sans-serif" }}>
        <h1>Qrid.me</h1>
        <p>Identity not found</p>
        <code>did:qrid:{handle || "-"}</code>
        <p>
          Try <a href="/pay/ian">/pay/ian</a>
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 440, margin: "40px auto", padding: 24, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Qrid.me</h1>
      <p style={{ color: "green", fontWeight: "bold" }}>Resolved: {identity.did}</p>
      <p>{identity.displayName}</p>
      <p>
        Requesting <strong>{POC_AMOUNT} USDC</strong> (devnet)
      </p>

      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
        <button
          type="button"
          onClick={payWithWallet}
          disabled={status === "opening"}
          style={{ padding: 14, fontSize: 16, background: "#000", color: "#fff", border: "none", borderRadius: 8 }}
        >
          {status === "opening" ? "Opening wallet..." : "Pay with Wallet (Solana Pay)"}
        </button>

        <button type="button" disabled style={{ padding: 14, borderRadius: 8 }}>
          Pay with Card (via MoonPay) - Phase 2
        </button>

        <button type="button" disabled style={{ padding: 14, borderRadius: 8 }}>
          Pay with Email (Embedded Wallet) - Phase 2
        </button>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#666" }}>
        Identity URL, not a static address QR. Recipient ends with …
        {identity.recipient.slice(-4)}
      </p>
    </div>
  );
}