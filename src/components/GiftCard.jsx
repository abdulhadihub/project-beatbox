import React from 'react'
import cardImage from '../assets/giftcard.webp'
import 'tw-elements';

function GiftCard() {
    const [unRedeemed, setRedeemed] = React.useState("group object-scale-down h-full w-96  blur-[1px] opacity-75 ")
    const [redeemBtn, setRedeemBtn] = React.useState("absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-center hidden group-hover:block bg-black bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded")
    const redeem = () => {
        setRedeemed(unRedeemed + "blur-none opacity-100")
        setRedeemBtn("hidden")
    }

    const copyText = () => {
        var copyText = document.getElementById("coupon-code");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value)
    }

    return (
        <>
            <div
                data-te-modal-init
                className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="exampleModalCenter"
                tabindex="-1"
                aria-labelledby="exampleModalCenterTitle"
                aria-modal="true"
                role="dialog">
                <div
                    data-te-modal-dialog-ref
                    className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                    <div
                        className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                        <div
                            className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                            <h5
                                className="text-xl font-bold leading-normal text-green-500"
                                id="exampleModalScrollableLabel">
                                Congratulations!
                            </h5>
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                data-te-modal-dismiss
                                aria-label="Close">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="relative p-4">
                            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="coupon-code" type="text" value="AMAZON2023" />

                        </div>
                        <div
                            className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                            <button
                                type="button"
                                className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                data-te-modal-dismiss
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Close
                            </button>
                            <button
                                type="button"
                                className="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                onClick={copyText}>
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-1/5 group relative hover:shadow-lg">

                <img className={unRedeemed} alt='gift_card_image' src={cardImage} />
                <button data-te-toggle="modal"
                    data-te-target="#exampleModalCenter" onClick={redeem} className={redeemBtn}>Redeem</button>
            </div>
        </>
    )
}

export default GiftCard