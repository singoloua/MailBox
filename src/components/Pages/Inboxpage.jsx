import { Link } from 'react-router-dom';
import '../Styles/Home.css';
import '../Styles/Inbox.css';
import db from '../firebase';
import { useState, useEffect } from 'react';

import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Inboxpage() {

  const idToFetch = window.myGlobalVariable || 3; 

  
  const [subject, setSubject] = useState("...subject..."); // Default value
  const [content, setContent] = useState("...content..."); // Default value
  const [sender, setSender] = useState("...sender..."); // Default value

  useEffect(() => {

    const fetchSenderData = async () => {
      try {
        // Fetch sender data
        const senderQuerySnapshot = await getDocs(query(collection(db, 'mail'), where('id', '==', idToFetch)));
        console.log(idToFetch)
        if (!senderQuerySnapshot.empty) {
          const senderData = senderQuerySnapshot.docs[0].data();
          setSender(senderData.sender);
        }
      } catch (error) {
        console.error('Error fetching sender data:', error);
      }
    };

    const fetchSubjectData = async () => {
      try {
        // Fetch subject data
        const subjectQuerySnapshot = await getDocs(query(collection(db, 'mail'), where('id', '==', idToFetch)));
        if (!subjectQuerySnapshot.empty) {
          const subjectData = subjectQuerySnapshot.docs[0].data();
          setSubject(subjectData.subject);
        }
      } catch (error) {
        console.error('Error fetching subject data:', error);
      }
    };


    const fetchContentData = async () => {
      try {
        // Fetch content data
        const contentQuerySnapshot = await getDocs(query(collection(db, 'mail'), where('id', '==', idToFetch)));
        if (!contentQuerySnapshot.empty) {
          const contentData = contentQuerySnapshot.docs[0].data();
          setContent(contentData.content);
        }
      } catch (error) {
        console.error('Error fetching content data:', error);
      }
    };

    fetchSubjectData();
    fetchContentData();
    fetchSenderData();
    
  }, []);

  return (
    <>
      <div className='navbar' />
      <Link to="/messages" className="link-style">
        <img className='back' src="/src/assets/images/back.png" alt="Back to Messages" />
      </Link>
      <div className='namei'>Message from: {sender}</div>
      <img className='profilei' src="/src/assets/images/profile.jpg" alt="User Profile" />

      <div className='subjecti' /> 
      <div className='subject'>{subject}</div>

      <div className='contenti' />
      <div className='content'>{content}</div>
    </>
  )
} 
