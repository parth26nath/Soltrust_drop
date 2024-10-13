import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const TransactionsCard = ({ addressTo, transactionSignature, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">Transaction Signature: {shortenAddress(transactionSignature)}</p>
          </a>
          <a href={`https://explorer.solana.com/tx/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://explorer.solana.com/tx/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} SOL</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const wallet = useWallet();
  const [transactions, setTransactions] = useState([]);

  const accountAddress = wallet.publicKey?.toBase58();

  useEffect(() => {
    if (accountAddress) {
      fetchTransactions(accountAddress);
    }
  }, [accountAddress]); // Add accountAddress as a dependency

  const fetchTransactions = async (accountAddress) => {
    try {
    //   const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

    //   // Convert account address to a PublicKey object
    //   const publicKey = new PublicKey(accountAddress);
    //   console.log(publicKey);

    //   // Get transaction signatures related to the account
    //   const signatures = await connection.getConfirmedSignaturesForAddress2(publicKey, { limit: 10 });
    //   console.log(signatures);

    //   const transactionDetails = await Promise.all(
    //     signatures.map(async (signatureInfo) => {
    //       const tx = await connection.getTransaction(signatureInfo.signature);
    //       return tx;
    //     })
    //   );

    //   setTransactions(transactionDetails);
    const res=await fetch(`https://explorer.solana.com/address/${accountAddress}`)
    console.log(res)
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.map((transaction, i) => (
            <TransactionsCard
              key={i}
              addressFrom={transaction.transaction.message.accountKeys[0].toBase58()}
              addressTo={transaction.transaction.message.accountKeys[1].toBase58()}
              transactionSignature={transaction.transaction.signatures[0]}
              amount={transaction.meta?.preBalances[0] - transaction.meta?.postBalances[0]} // Example to get SOL amount
              timestamp={new Date(transaction.blockTime * 1000).toLocaleString()}
              keyword="Solana"
              message="Transaction Message"
              url="" // Use actual URL if needed
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
