### WL Token 
- Grind Wallet
- Meta to send 2 sol  
- Meta to collect wallet addresses
  https://docs.google.com/spreadsheets/d/1F-z7TxIh1QNE8rDfk7LYDNdfuJW26Mor2Gidgk15g_U/edit#gid=0
- Create function
- Run it

### Candy Machine
- Verify json/jpg
- Upload
- Deploy
- Add candy guard (token burn) https://docs.metaplex.com/programs/candy-machine/available-guards

### Build Mint Site

- Scaffold https://github.com/solana-labs/dapp-scaffold 
- Mint Button

////////////////////////////

### RESOURCES
- https://github.com/metaplex-foundation/sugar/releases  (Choose the latest release with cmv3 in it's name)
- https://www.quicknode.com/guides/solana-development/how-to-create-a-solana-nft-collection-using-candy-machine-v3-and-typescript
- https://www.quicknode.com/guides/solana-development/how-to-deploy-an-nft-collection-on-solana-using-sugar-candy-machine
- https://www.quicknode.com/guides/solana-development/how-to-connect-users-to-your-dapp-with-the-solana-wallet-adapter-and-scaffold 
- https://docs.metaplex.com/developer-tools/sugar/guides/sugar-for-cmv3

`gh repo clone solana-labs/dapp-scaffold .`

Candy Guard
https://docs.metaplex.com/programs/candy-machine/available-guards/token-burn 
```json

    "default": {
      "tokenBurn":{
        "amount": 1,
        "mint": ""
      }
    }
```
