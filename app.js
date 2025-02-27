const contractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";
const contractABI = [ "C:\\Users\\A1\\Documents\\land-registry\\migrations\\x02_deploy_contracts.js" ];

let web3;
let contract;

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Contract Initialized:", contract);
    } else {
        alert("Please install MetaMask!");
    }
}

async function registerLand() {
    const location = document.getElementById('landLocation').value;
    const acreage = document.getElementById('landAcreage').value;
    const price = document.getElementById('landPrice').value;

    // Interact with the smart contract to register the land
    // Assuming web3.js is already set up and contract instance is available
    await contract.methods.registerLand(location, acreage, price).send({ from: web3.eth.defaultAccount });
    alert("Land Registered Successfully!");
}

async function getLandOwner() {
    const landId = document.getElementById('checkLandId').value;

    // Interact with the smart contract to get the land owner
    const owner = await contract.methods.getLand(landId).call();
    document.getElementById('ownerAddress').innerText = `Owner Address: ${owner[3]}`;
}

async function transferOwnership() {
    const landId = document.getElementById('transferLandId').value;
    const newOwner = document.getElementById('newOwnerAddress').value;
    const sellerName = document.getElementById('sellerName').value;
    const buyerName = document.getElementById('buyerName').value;
    const paymentAmount = document.getElementById('paymentAmount').value;

    // Interact with the smart contract to transfer ownership
    await contract.methods.transferOwnership(landId, newOwner, sellerName, buyerName).send({ from: web3.eth.defaultAccount, value: paymentAmount });
}

window.onload = init;
