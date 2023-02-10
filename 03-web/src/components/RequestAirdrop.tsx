import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';

export const RequestAirdrop: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const walletAdapter = useWallet();
    const { getUserSOLBalance } = useUserSOLBalanceStore();

    const onClick = (async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
            return;
        }

        let METAPLEX = Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));
        let candyMachine = await METAPLEX.candyMachines().findByAddress({ address: new PublicKey('EMPapSGD9uPkLoa86wjwtWuawAsoNr3bbyCFT7W5V1Mi') })


        try {
            const txBuilder = await METAPLEX.candyMachines().builders().mint({
                candyMachine,
                collectionUpdateAuthority: new PublicKey('scNkbXvJQ3L83JmvYfVmuLaq9UidaiuYzQaHD41KXt5')
            })
            const blockhash = await METAPLEX.rpc().getLatestBlockhash();

            let tx = txBuilder.toTransaction(blockhash);
            let { signature, confirmResponse } = await METAPLEX.rpc().sendAndConfirmTransaction(txBuilder, { commitment: 'finalized' });
            notify({ type: 'success', message: 'Mint successful!', txid: signature });
        } catch (error: any) {
            console.log(error); 
        }
    });


    return (

        <div className="flex flex-row justify-center">
            <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
                    rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                <button
                    className="px-8 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                    onClick={onClick}
                >
                    <span>Mint</span>

                </button>
            </div>
        </div>


    );
};

