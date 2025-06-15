import { useState, useEffect } from 'react';
import '../Styles/Home.css';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase';

function Homepage() {
  const [selectedImage, setSelectedImage] = useState("/src/assets/images/profile.jpg");
  const [selectedCover, setSelectedCover] = useState("/src/assets/images/cover.jpg");

  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [totalMessageCount, setTotalMessageCount] = useState(0);
  const [userName, setUserName] = useState("Guest"); // Default value

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedCover(imageUrl);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userQuerySnapshot = await getDocs(collection(db, 'users'));
        if (!userQuerySnapshot.empty) {
          const userData = userQuerySnapshot.docs[0].data();
          setUserName(userData.name);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchMessageCounts = async () => {
      try {
        // Fetch total message count
        const totalQuerySnapshot = await getDocs(collection(db, 'mail'));
        const totalMessageCount = totalQuerySnapshot.size;
        console.log('Total number of messages:', totalMessageCount);
        setTotalMessageCount(totalMessageCount);

        // Fetch unread message count
        const unreadQuerySnapshot = await getDocs(query(collection(db, 'mail'), where('isread', '==', false)));
        const unreadMessageCount = unreadQuerySnapshot.size;
        console.log('Number of unread messages:', unreadMessageCount);
        setUnreadMessageCount(unreadMessageCount);
      } catch (error) {
        console.error('Error fetching message counts:', error);
      }
    };

    fetchUserData();
    fetchMessageCounts();
  }, []);

  return (
    <>
      <img className='cover' src={selectedCover} />
      <div className='change_profile_bg_2' />
      <label htmlFor="coverInput">
        <img className='change_profile_img_2' src="/src/assets/images/camera.png" alt="Change Cover Picture" />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
        style={{ display: 'none' }}
        id="coverInput"
      />

      <img className='profile_home' src={selectedImage} />
      <label htmlFor="imageInput">
        <div className='change_profile_bg' />
        <img className='change_profile_img' src="/src/assets/images/camera.png" alt="Change Profile Picture" />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="imageInput"
      />

      <div className='greeting'>
        Hello {userName}
      </div>
      <div className='message_unread'>
        You have {unreadMessageCount} unread messages out of {totalMessageCount} total
      </div>
      <button className='button'>
        <Link to="/messages" className="link-style">
          View Messages
        </Link>
      </button>
      <img className='logo' src="/src/assets/images/logo.png" />
    </>
  );
}

export default Homepage;
