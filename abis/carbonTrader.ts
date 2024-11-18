export const carbonTraderAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "usdtTokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "AuctionTrade_NotBidWinner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "AuctionTrade_NotDeposit",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "AuctionTrade__NotEnoughDeposit",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTimeStamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTimeStamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minimumBidAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "initPriceOfUint",
        "type": "uint256"
      }
    ],
    "name": "AuctionTrade__ParamsError",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "AuctionTrade__TradeNotExist",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "bidderLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountLength",
        "type": "uint256"
      }
    ],
    "name": "AuctionTrade__UploadMsgMismatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "CarbonManager__AllowanceNotEnough",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "CarbonManager__NotOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ERC20__TransferFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "MarketTrade__NotSeller",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "MarketTrade__NotTrading",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "MarketTrade__TradeNotExist",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "CancelMarketTrade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "allowanceAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "additionalAmountToPay",
        "type": "uint256"
      }
    ],
    "name": "FinalizeAuctionAndTransferCarbon",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "priceOfUint",
        "type": "uint256"
      }
    ],
    "name": "MakeADeal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startTimeStamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTimeStamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minimumBidAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "initPriceOfUint",
        "type": "uint256"
      }
    ],
    "name": "NewAuctionTrade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "priceOfUint",
        "type": "uint256"
      }
    ],
    "name": "NewMarketTrade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "RefundDeposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "priceOfUint",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldPriceOfUint",
        "type": "uint256"
      }
    ],
    "name": "UpdateMarketTrade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawAuctionAmount",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "addressToAllowances",
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
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "auctionAmount",
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
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "auctionTrades",
    "outputs": [
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTimeStamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTimeStamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minimumBidAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "initPriceOfUint",
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
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "cancelMarketTrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceOfUint",
        "type": "uint256"
      }
    ],
    "name": "createMarketTrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "info",
        "type": "string"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "destoryAllAllowance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_destoryAmount",
        "type": "uint256"
      }
    ],
    "name": "destoryAllowance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "allowanceAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "additionalAmountToPay",
        "type": "uint256"
      }
    ],
    "name": "finalizeAuctionAndTransferCarbon",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_freezedAmount",
        "type": "uint256"
      }
    ],
    "name": "freezeAllowance",
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
    "name": "frozenAllowances",
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
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "getBidInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "getBidSecret",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "getTradeDeposit",
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
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_allowance",
        "type": "uint256"
      }
    ],
    "name": "issueAllowance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "makeADeal",
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
    "name": "marketTrades",
    "outputs": [
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceOfUint",
        "type": "uint256"
      },
      {
        "internalType": "enum CarbonMarketTrade.MarketTradeStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
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
        "name": "tradeID",
        "type": "uint256"
      }
    ],
    "name": "refundDeposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "info",
        "type": "string"
      }
    ],
    "name": "setBidInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "secret",
        "type": "string"
      }
    ],
    "name": "setBidSecret",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTimeStamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTimeStamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minimumBidAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "initPriceOfUint",
        "type": "uint256"
      }
    ],
    "name": "startAuctionTrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_unfreezedAmount",
        "type": "uint256"
      }
    ],
    "name": "unfreezeAllowance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "priceOfUint",
        "type": "uint256"
      }
    ],
    "name": "updateMarketTrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "updateOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tradeID",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "bidder",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amount",
        "type": "uint256[]"
      }
    ],
    "name": "uploadBidWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawAuctionAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const