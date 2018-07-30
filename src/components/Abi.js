const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipPizzaSellerTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "bitstudioRequestResetContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_bytesSeed",
				"type": "bytes32"
			}
		],
		"name": "createTicket",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_numCreatedTickets",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "_numClaimedTickets",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "_message",
				"type": "string"
			}
		],
		"name": "createTicketEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "resetContractSessionEndingEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_numCreatedTickets",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "_numClaimedTickets",
				"type": "uint32"
			},
			{
				"indexed": false,
				"name": "_message",
				"type": "string"
			}
		],
		"name": "claimTicketEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipBitStudioTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_newDuration",
				"type": "uint64"
			}
		],
		"name": "setNewDurationEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_endingTime",
				"type": "uint64"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "resetContractSessionOpeningEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"name": "_nakeSeed",
				"type": "string"
			}
		],
		"name": "claimTicket",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "pizzaSellerRequestForResetContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_duration",
				"type": "uint64"
			}
		],
		"name": "setResetingSessionDuration",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferBitStudioOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferPizzaSellerOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "bitStudio",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_nakeSeed",
				"type": "string"
			}
		],
		"name": "getATicketStatus",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getResetingStatus",
		"outputs": [
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTicketsAndPackageStatus",
		"outputs": [
			{
				"name": "",
				"type": "uint32"
			},
			{
				"name": "",
				"type": "uint32"
			},
			{
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimeStatus",
		"outputs": [
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint64"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "pizzaSeller",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_s",
				"type": "string"
			}
		],
		"name": "testKeccak",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint16"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	}
]

export default ABI;
