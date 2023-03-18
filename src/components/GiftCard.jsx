import React, { useEffect } from 'react'
import cardImage from '../assets/giftcard.webp'
import 'tw-elements';
import { collection, addDoc, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from '../firebase-config'
import Modal from '../components/Modal';

function GiftCard({ cost, isRedeemed, couponCode, points, updatePoints, user, i }) {
    // const [unRedeemed, setRedeemed] = React.useState("group object-scale-down h-full w-96  blur-[1px] opacity-75 ")

    useEffect(() => {
    }, [points, isRedeemed])

    const updatePointsFireStore = async (user, points, index) => {
        try {
            const userRef = doc(db, "listener", user.uid);
            const userDoc = await getDoc(userRef);
            const listenerData = userDoc.data();
            const giftCards = listenerData.giftCards;
            const updatedGiftCards = [...giftCards]; // create a new copy of the array
            updatedGiftCards[index] = {
                ...updatedGiftCards[index],
                isRedeemed: true,
            };
            await updateDoc(userRef, {
                points: points,
                giftCards: updatedGiftCards
            });
        }
        catch (e) {
            alert("Error updating points: ", e);
        }
    }

    let cardClass = isRedeemed ? "group object-scale-down h-full w-96 opacity-100" : "group object-scale-down h-full w-96  blur-[1px] opacity-75";
    let cardBtn = isRedeemed ? "hidden" : "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-center hidden group-hover:block bg-black bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded";

    return (
        <>
            <div className=" w-1/5 group relative hover:shadow-lg">

                <img className={cardClass} alt='gift_card_image' src={cardImage} />
                <h2 class={"text-lg font-bold text-white mb-2 text-center"}>{`${cost} points`}</h2>
                <Modal cardBtn={cardBtn} couponCode={couponCode} points={points} cost={cost} user={user} i={i} updatePointsFireStore={updatePointsFireStore} updatePoints={updatePoints} />
            </div>
        </>
    )
}

export default GiftCard