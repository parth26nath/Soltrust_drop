import React, { useEffect, useState } from "react";
import { Connection } from "@solana/web3.js";
import TransactionsCard from "./TransactionsCard"; // Ensure this path is correct

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    useEffect(() => {
        const subscriptionId = connection.onSignature(
            "all", // You can specify a specific public key here if needed
            async (signature) => {
                console.log("New transaction signature:", signature);
                try {
                    const transaction = await connection.getTransaction(signature);
                    console.log("Transaction data:", transaction);
                    if (transaction) {
                        const { message, blockTime } = transaction.transaction;
                        console.log("Message account keys:", message.accountKeys);
                        const addressFrom = message.accountKeys[0].toBase58();
                        const addressTo = message.accountKeys[1].toBase58();
                        const amount = (transaction.meta.postBalances[1] - transaction.meta.preBalances[1]) / 1e9; // Convert lamports to SOL

                        setTransactions((prevTransactions) => [
                            ...prevTransactions,
                            {
                                addressTo,
                                addressFrom,
                                timestamp: new Date(blockTime * 1000).toLocaleString(),
                                message: message.data, // Adjust as necessary
                                amount: amount.toFixed(2),
                                url: "https://placekitten.com/400/300", // Placeholder image
                            },
                        ]);
                    }
                } catch (error) {
                    console.error("Error fetching transaction:", error);
                }
            }
        );

        // Cleanup subscription on component unmount
        return () => {
            connection.removeSignatureListener(subscriptionId);
        };
    }, [connection, transactions]); // Add transactions as a dependency

    useEffect(() => {
        console.log("Transactions updated:", transactions);
    }, [transactions]); // Add a separate effect to log transactions updates

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.length === 0 ? (
                        <p className="text-white">No transactions found.</p>
                    ) : (
                        transactions.map((transaction, index) => (
                            <TransactionsCard
                                key={index}
                                addressTo={transaction.addressTo}
                                addressFrom={transaction.addressFrom}
                                timestamp={transaction.timestamp}
                                message={transaction.message}
                                amount={transaction.amount}
                                url={transaction.url}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transactions;