import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Searchbar, Sidebar, MusicPlayer, TopPlay, Loader } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts, Rewards, Account, Logout } from './pages';
import UpcomingArtists from './pages/UpcomingArtists';
import AudioPlayer from './components/MusicPlayer2/AudioPlayer';
import ArtistDashboard from './components/artistComponents/AllSongs'
import ArtistAddSong from './components/artistComponents/AddNewSong'
import Landing from './pages/Landing'
import Login from './components/landing/Login'
import Register from './components/landing/Register'
import { db } from './firebase-config'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { getApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { PointsContext } from './components/context/PointsContext';


const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const [user, setUser] = useState(null);
  const [song, setSong] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [songsData, setSongsData] = useState([]);
  const [points, setPoints] = useState(0);

  const loginUser = (userInfo) => {
    setUser(userInfo);
  };

  const getSongsData = async () => {
    setIsFetchingData(true);

    try {
      const artistSnapshot = await getDocs(collection(db, "artist"));
      const songsData = [];

      artistSnapshot.forEach((doc) => {
        const artist = doc.data();
        const artistName = artist.name;

        if (Array.isArray(artist.songs)) {
          artist.songs.forEach((song) => {
            if (song) {
              const songWithArtistName = { ...song, artist: artistName };
              songsData.push(songWithArtistName);
            }
          });
        }
      });

      setIsFetchingData(false);
      setSongsData(songsData);
    } catch (error) {
      console.error(error);
      setIsFetchingData(false);
      return null;
    }
  }
  // functionw to get All Artists data
  // const getArtistData = async () => {
  //   setIsFetchingData(true);
  //   const artistSnapshot = await getDocs(collection(db, "artist"));
  //   artistSnapshot.forEach((doc) => {
  //     artistDataArr.push(doc.data());
  //   });
  //   setArtistData(artistDataArr);
  //   getSongsData();
  //   setIsFetchingData(false);
  // }

  useEffect(() => {
    getSongsData();

  }, []);

  useEffect(() => {

    setPoints(userData?.points);
  }, [userData]);

  const getUser = async (user) => {
    setIsFetchingData(true);
    const docRefListener = doc(db, "listener", user.uid);
    const docSnapListener = await getDoc(docRefListener);

    const docRefArtist = doc(db, "artist", user.uid);
    const docSnapArtist = await getDoc(docRefArtist);

    Promise.all([docSnapListener, docSnapArtist]).then(() => {

      if (docSnapListener.exists() || docSnapArtist.exists()) {
        const data = { ...docSnapListener.data(), ...docSnapArtist.data() }
        setUserData({ ...data, uid: user.uid });
      } else {
        alert("No such Data!");
        const navigate = useNavigate();
        navigate('/login')
      }
    }).catch((error) => alert(error.message));
    setIsFetchingData(false);
  }

  useEffect(() => {
    if (user) {
      getUser(user);
    }
  }, [user]);
  const isArtist = userData?.points === undefined;


  if (!(user)) return <Landing loginUser={loginUser} />;
  if (isFetchingData || !userData) return <Loader title="Loading User" />;
  const shouldRenderAudioPlayer = !isArtist;

  return (
    <PointsContext.Provider value={{ points, setPoints }}>
      <div className="relative flex">
        <Sidebar isArtist={isArtist} />
        <div className={`flex-1 flex flex-col ${isArtist ? 'bg-slate-200' : 'bg-gradient-to-br from-[#49a09d] to-[#5f2c82]'}`}>
          {/* <Searchbar /> */}

          <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
            <div className="flex-1 h-fit pb-40">
              <Routes>
                <Route path="/" element={isArtist ? <ArtistDashboard userData={userData} /> : <Discover songsData={songsData} />} />
                <Route path="/login" element={<Landing loginUser={loginUser} />} />
                <Route path="/upcoming-artists" element={<UpcomingArtists songsData={songsData} />} />
                <Route path="/rewards" element={<Rewards userData={userData} />} />
                <Route path="/account" element={<Account isArtist={isArtist} />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/addSong" element={<ArtistAddSong userData={userData} />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/around-you" element={<AroundYou />} />
                <Route path="/artists/:id" element={<ArtistDetails />} />
                <Route path="/songs/:songid" element={<SongDetails />} />
                <Route path="/search/:searchTerm" element={<Search />} />
              </Routes>
            </div>
            <div className="xl:sticky relative top-0 h-fit">
              {/* <TopPlay /> */}
            </div>
          </div>
        </div>
        {shouldRenderAudioPlayer && (
          <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
            <AudioPlayer songsData={songsData} isFetchingData={isFetchingData} user={userData} />
            {/* <MusicPlayer /> */}
          </div>
        )}
        {/* {activeSong?.title && (
      )} */}
      </div>
    </PointsContext.Provider>
  );
};

export default App;
