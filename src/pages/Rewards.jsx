import React from 'react';

import { Error, Loader } from '../components';
import GiftCard from '../components/GiftCard';

const Rewards = ({ userData }) => {
    const name = userData?.name
    const points = userData?.points

    if (false) return <Loader title="Loading artists..." />;

    // if (error) return <Error />;

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Rewards</h2>
            <h2 className="font-bold text-2xl text-white text-left mt-4 ">Welcome back!</h2>
            <h2 className="font-bold text-2xl text-blue text-left">{name}</h2>
            <h2 className="font-bold text-2xl text-white text-left mb-10">with your {points} points you can redeem</h2>

            <div className="flex flex-wrap flex-row sm:justify-start justify-center gap-8 mt-10">
                <GiftCard />
                <GiftCard />
                <GiftCard />
                <GiftCard />
                <GiftCard />
                <GiftCard />
                <GiftCard />
                <GiftCard />
            </div>
        </div>
    );
};

export default Rewards;
