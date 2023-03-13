import React, { useState, useEffect } from 'react'
import { BiPencil } from 'react-icons/bi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { db } from '../../firebase-config'
import { collection, addDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from '../../firebase-config'
import Loader from '../Loader';


const AllSongs = ({ userData }) => {
    const [songs, setSongs] = useState([]);


    useEffect(() => {
        if (userData?.songs) {
            setSongs(userData.songs);
        }


    }, [userData])

    const [loading, setLoading] = useState(false);

    const artistName = userData?.name;


    const deleteSong = async (index) => {
        const song = userData.songs[index];

        setLoading(true);
        // Delete song's image file from Cloud Storage
        const imageRef = ref(storage, song.coverArt);
        await deleteObject(imageRef);

        // Delete song's audio file from Cloud Storage
        const audioRef = ref(storage, song.music);
        await deleteObject(audioRef);

        const updatedSongs = [...songs];
        updatedSongs.splice(index, 1);
        setSongs(updatedSongs);

        try {
            const artistRef = doc(db, "artist", userData.uid);
            await updateDoc(artistRef, {
                songs: updatedSongs
            });

            setLoading(false);
            alert('Song deleted successfully');
            window.location.reload();
        }
        catch (e) {
            setLoading(false);
            alert("Error deleting song: ", e);
        }
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/addSong");
    }

    if (!userData) {
        return <button class="bg-cyan-500 hover:bg-cyan-600 p-2 px-5 text-black font-bold rounded " onClick={handleClick}>ADD NEW SONG</button>
            ;
    }



    return (
        <div>
            {loading && <Loader title={"Deleting"} />}
            <div className='grid grid-cols-2 gap-4 mt-6'>
                <h3 className='text-lg font-bold'>Welcome <span className='text-violet-800'>{artistName}</span>, here's the list of the songs uploaded</h3>
                <div className='col-end-7'>
                    <button class="bg-cyan-500 hover:bg-cyan-600 p-2 px-5 text-black font-bold rounded " onClick={handleClick}>ADD NEW SONG</button>
                </div>
            </div>

            <div>
                <table class="table-auto w-full mt-6">
                    <thead className='border-b-2 border-t-2 border-gray-300'>
                        <tr>
                            <th className='text-center text-black-400 p-6'>Title</th>
                            <th className='text-center text-black-400'>Audio</th>
                            <th className='text-center text-black-400'>Cover Art</th>
                            <th className='text-center text-black-400'>Date Added</th>
                            <th className='text-center text-black-400'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs && Array.isArray(songs) && songs.map((song, index) => (
                            <tr key={index}>
                                <td className='text-center py-3 border-b-2 border-gray-400 p-2'>{song?.title}</td>
                                <td className='text-center py-3 border-b-2 border-gray-400 p-2'><audio className='mx-auto' src={song?.music} controls /></td>
                                <td className='text-center py-3 border-b-2 border-gray-400 p-2'><img className='h-[70px] w-[70px] mx-auto' src={song?.coverArt} alt="cover_art" /></td>
                                <td className='text-center py-3 border-b-2 border-gray-400 p-2'>{song?.date}</td>
                                <td className='text-center py-3 border-b-2 border-gray-400 p-2'>
                                    {/* <button class=" text-cyan-300 hover:text-cyan-600 font-bold mx-6"><BiPencil size={30} /></button> */}
                                    <button onClick={() => deleteSong(index)} class="text-red-500 hover:text-red-300 font-bold mx-6"><MdOutlineDeleteOutline size={30} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </div>
    )
}

export default AllSongs
