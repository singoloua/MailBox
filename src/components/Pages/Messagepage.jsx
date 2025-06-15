import '../Styles/Home.css';
import '../Styles/Message.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase';

// to reduce the length of the content message
function truncateText(text, limit) {
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
}


function Messagepage() {
  const [mails, setMails] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  console.log(window.myGlobalVariable);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'mail'), (snapshot) =>
      setMails(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to filter messages based on the search query
  const filteredMails = mails.filter(
    (mail) =>
      mail.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle click on a message and update isread to true
  const handleMessageClick = async (messageId) => {
    
    window.myGlobalVariable = messageId;

  };

  return (
    <>
      {/* To get back to the Main page */}
      <Link to="/" className="link-style">
        <img className='back_m' src="/src/assets/images/back.png" alt="Back to Homepage" />
      </Link>

      {/* Clickable search icon */}
      <div className='search' onClick={() => console.log('Perform search')}>
        <img className='more' src="/src/assets/images/more.png" alt="More Options" />
      </div>

      {/* Typing area for search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search_2'
        placeholder="Search in mail"
      />

      <img className='profile' src="/src/assets/images/profile.jpg" alt="User Profile" />

      <div className='title_m'>.:Messages:.</div>

      <div style={{ left: 0.5, top: 150, width: 300, height: 200, position: 'absolute', border: '0px solid #ccc', padding: '40px', overflowY: 'scroll' }}>
        <ul>
          {filteredMails.map((mail, index) => (
            
            <div key={mail.id} style={{ marginBottom: 10, borderBottom: index < filteredMails.length - 1 ? '0.5px solid #ccc' : 'none' }}>
              
              <Link to="/inbox" className="link-style" onClick={() => handleMessageClick(mail.id)}>
                
                <div style={{ color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: mail.isread ? '400' : 'bold', wordWrap: 'break-word' }}>
                  From: {mail.sender}
                </div>
                <div style={{ width: 250, height: 20, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: mail.isread ? '400' : 'bold', wordWrap: 'break-word' }}>
                  Subject: {mail.subject}
                </div>
                <div style={{ width: 250, height: 20, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>
                  Content: {truncateText(mail.content, 3)}
                </div>
              </Link>
            </div>
          ))}
        </ul>
      </div>

      <div className='back_button' />
      <img className='pencil' src="/src/assets/images/pencil.png" alt="Pencil Icon" />
    </>
  );
}

export default Messagepage;
