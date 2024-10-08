import React from "react";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, amount, url }) => {
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
          <a href={`https://cardona-zkevm.polygonscan.com/tx/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {addressFrom}</p>
          </a>
          <a href={`https://cardona-zkevm.polygonscan.com/tx/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {addressTo}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={url}
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
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          Latest Transactions
        </h3>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {/* Placeholder for transactions */}
          <TransactionsCard
            addressTo="0x123...abc"
            addressFrom="0x456...def"
            timestamp="3 hours ago"
            message="Payment for services"
            amount="0.5"
            url="https://placekitten.com/400/300"
          />
          <TransactionsCard
            addressTo="0x789...ghi"
            addressFrom="0x012...jkl"
            timestamp="1 day ago"
            message="Gift"
            amount="1.2"
            url="https://placekitten.com/500/400"
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
