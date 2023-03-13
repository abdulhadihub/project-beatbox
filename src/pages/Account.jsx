import React from 'react';

import { Error, Loader } from '../components';
import GiftCard from '../components/GiftCard';

const Account = (isArtist) => {

    if (false) return <Loader title="Loading artists..." />;

    // if (error) return <Error />;

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Account</h2>

        </div>
    );
};

export default Account;
