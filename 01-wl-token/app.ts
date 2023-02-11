import { createAssociatedTokenAccountIdempotentInstruction, createMint, createMintToCheckedInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import {  clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "@solana/web3.js";
import WalletSecret from '../wallet.json';
import fs from 'fs';

let generateUrl = (txId: string) => {return `https://explorer.solana.com/tx/${txId}`}

const CONNECTION = new Connection(clusterApiUrl('devnet'));
const AUTH_WALLET = Keypair.fromSecretKey(new Uint8Array(WalletSecret));
const MINT_KEY = new PublicKey('5VsdKVVKyrsvD7RMzZ5aLUSzxhJEekHomcMi6kR6MpXW');
/* const MEMBERS = [
    "Cxcfw2GC1tfEPEuNABNwTujwr6nEtsV6Enzjxz2pDqoE",
    "EZ7sSyRmS9jQPMnjvwRVtBDhqtE1euDeqenAsiKa5ajK",
    "7iUcurS8jLijYSVxUscK8j94kij6ypNTg47E61hq8eps",
    "FKhNzgSY8ZU12ydREfNGks97ew7dBgyRu2CWhrwnVZEy",
    "E3M4WNvfwdw2g5zHcqpivunf3DLM8boNMFMLPyS66nGh",
    "14i1Raw3yrWJvph1a8C9uEMK2xNutY2mZAhQTCi4Ed4a",
    "FpSkQrqscBJbiCw2YuYjVQd8m31K5rNjTB2BJzeSKJrf",
    "CBR4n5hE8tfPQt2HWThHmhmrZXm5SZQHaXQi4TBfvh3v",
    "GdJN3D6hc48vzsoU1wTYaxFpTG1nimyV477z7RQ7SgTB",
    "9AygFkr6B6ULfKYVAou5ZC3AkoW9U75fX31NQF4VDHqr",
    "Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7",
    "8ZAPx318VmQEh9TKroCMLV2dD1SJ94iUD1RQYnLNZjff",
    "53mFteuL794o6wLezWfsLk8hehJeh2dzvS8foeWQadeG",
    "Avooe3wrH2zYVCHav7BLzMgEaFHhF4FDxPtsGX8egwgC",
    "BZTx18qmTDC4ivNaKwy3giSdqHUtDqsCAwSBtf1Gffym",
    "3anukDBEijov9oVBNNbvCYsUkBc7yYioiCZiGvuWw61e",
    "HUPdanH1atLs9DFogfjARm6MzXH52tXU6ZiL1hstMFsv"
]; */

const MEMBERS = ['HZ4zvDueq2kDwosQeNZaJaT3n3gHQ25xLzHUmGjX74Nt']


const generateToken = async () => {
    let mint = await createMint(CONNECTION,AUTH_WALLET,AUTH_WALLET.publicKey,null, 0);
    console.log(mint.toString());
}


const airDropTokens = async() => {
    let transactions = MEMBERS.map(member => {
        let owner = new PublicKey(member);
        return new Promise<{user: string, txId: string, url: string}> (async (resolve,reject)=> {
            let ata = await getAssociatedTokenAddress(MINT_KEY,owner);
            let ix1 = await createAssociatedTokenAccountIdempotentInstruction(
                AUTH_WALLET.publicKey,ata,owner,MINT_KEY
            );
            let ix2 = await createMintToCheckedInstruction(MINT_KEY,ata,AUTH_WALLET.publicKey,1,0);
            let ix3 = await new TransactionInstruction({
                keys: [{ pubkey: AUTH_WALLET.publicKey, isSigner: true, isWritable: true }],
                data: Buffer.from(`collective drop from amilz`, "utf-8"),
                programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
              });
            let transaction = new Transaction();
            transaction.add(ix1,ix2,ix3);
            try {
                let blockhash = await CONNECTION.getLatestBlockhash();
                transaction.recentBlockhash = blockhash.blockhash;
                transaction.lastValidBlockHeight = blockhash.lastValidBlockHeight;
                let txId = await sendAndConfirmTransaction(CONNECTION,transaction,[AUTH_WALLET]);
                resolve({
                    user: member, 
                    txId: txId,
                    url: generateUrl(txId)
                });
            }
            catch {
                reject(`Error with ${member}`)
            }
        })
    });
    let results = await Promise.allSettled(transactions);
    let output = JSON.stringify(results);
    fs.writeFileSync('results.json', output);
    
}

airDropTokens();

console.log(MEMBERS.length)

