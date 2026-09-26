# Qrid.me — Proof of Concept (Phase 1)

![Status](https://img.shields.io/badge/Status-Proof%20of%20Concept-yellow)
![Network](https://img.shields.io/badge/Network-Solana%20Devnet-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> **Qrid.me** is a decentralized identity and payment protocol that bridges the physical and digital worlds using QR codes.

This repository contains the **Phase 1 Proof of Concept (PoC)** for Qrid.me. It demonstrates the core technical mechanic: generating a static QR code that initiates a gasless, instant payment on Solana via Solana Pay.

## 🎯 What This PoC Proves
This is not the full MVP. This is a focused technical demonstration to prove that we can:
1. Generate a valid Solana Pay URL for a specific token (USDC).
2. Render that URL as a scannable QR code.
3. Successfully execute a transaction on Solana Devnet using standard wallets (Phantom, Solflare).

## 🛠️ Tech Stack
- **Framework:** Next.js (React)
- **Blockchain:** Solana (Devnet)
- **Payment Standard:** Solana Pay
- **QR Generation:** `qrcode.react`
- **Web3 Library:** `@solana/web3.js`

## 🚀 How to Run This PoC

### Prerequisites
- Node.js (v18 or higher)
- A Solana wallet (e.g., Phantom) switched to **Devnet**
- Some Devnet USDC (see below for how to get it)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/qrid-poc.git
   cd qrid-poc
