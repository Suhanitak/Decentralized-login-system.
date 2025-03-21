// Connect to Web3
let web3;
let contract;
const contractAddress = "0x4a34bFa5F0A44adB59130b0c92B591d3696Bf4A2DRESS"; // Replace with your deployed contract address
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "artId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "artist",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "ArtEntryAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "artId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalVotes",
				"type": "uint256"
			}
		],
		"name": "Voted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "addArtEntry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "artEntries",
		"outputs": [
			{
				"internalType": "address",
				"name": "artist",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getArtEntriesCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_artId",
				"type": "uint256"
			}
		],
		"name": "getArtEntry",
		"outputs": [
			{
				"internalType": "address",
				"name": "artist",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "winningArtId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxVotes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "organizer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_artId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votesPerVoter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
window.onload = () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        window.ethereum.enable().then(() => {
            contract = new web3.eth.Contract(contractABI, contractAddress);
        });
    } else {
        alert("Please install MetaMask!");
    }
};

async function register() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const passwordHash = web3.utils.sha3(password); // Hash the password

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        await contract.methods.register(username, passwordHash).send({ from: account });
        document.getElementById("registerStatus").innerText = "Registration successful!";
    } catch (error) {
        document.getElementById("registerStatus").innerText = "Registration failed!";
    }
}

async function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const passwordHash = web3.utils.sha3(password); // Hash the password

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        await contract.methods.login(passwordHash).send({ from: account });
        document.getElementById("loginStatus").innerText = "Login successful!";
    } catch (error) {
        document.getElementById("loginStatus").innerText = "Login failed!";
    }
}

async function checkRegistration() {
    const address = document.getElementById("checkAddress").value;
    const isRegistered = await contract.methods.isRegistered(address).call();
    const username = isRegistered ? await contract.methods.getUsername(address).call() : "User not registered";

    document.getElementById("checkStatus").innerText = isRegistered ? `User: ${username}` : "User not registered";
}
