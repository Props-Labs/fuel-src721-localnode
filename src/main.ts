import { SRC721ContractAbi__factory } from "./types/factories/SRC721ContractAbi__factory";
import bytecode from "./types/SRC721ContractAbi.hex";

import { launchTestNode, AssetId, TestMessage } from "fuels/test-utils";

(async () => {
  try {
    // Define the assets and initial messages
    const assets = AssetId.random(2);
    const message = new TestMessage({ amount: 1000 });

    // Launch the test node with predefined configuration
    const launched = await launchTestNode({
      walletsConfig: {
        count: 4, // Number of wallets to create
        assets, // Assets to use
        coinsPerAsset: 2, // Number of coins per asset
        amountPerCoin: 1_000_000, // Amount per coin
        messages: [message], // Initial messages
      },
      contractsConfigs: [
        {
          deployer: SRC721ContractAbi__factory, // Contract deployer factory
          bytecode, // Contract bytecode
          walletIndex: 3, // Index of the wallet to deploy the contract
          options: { storageSlots: [] }, // Storage options for the contract
        },
      ],
    });

    // Destructure the launched object to get wallets and contracts
    const {
      contracts: [contract],
      wallets: [wallet1, wallet2, wallet3, wallet4],
    } = launched;

    console.log("Launched node with contracts and wallets");
    console.log({ contract, wallet1, wallet2, wallet3, wallet4 });

    const privateKey = wallet1.privateKey;
    console.log("Private Key of wallet1:", privateKey);

    // Optionally, print addresses of wallets
    console.log("Address of wallet1:", wallet1.address);
    console.log("Address of wallet2:", wallet2.address);
    console.log("Address of wallet3:", wallet3.address);
    console.log("Address of wallet4:", wallet4.address);
  } catch (e) {
    console.error(e);
  }
})();
