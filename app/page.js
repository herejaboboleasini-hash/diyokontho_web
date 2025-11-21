"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- Simple Styles (Plain JS Objects - No External Dependencies) ---
const getStyles = (theme, isSidebarOpen) => {
  const isDark = theme === 'dark';
  const sidebarWidth = isSidebarOpen ? '260px' : '0px';
  
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: isDark ? '#000000' : '#ffffff', 
      color: isDark ? '#e5e5e5' : '#1f2937', 
      overflow: 'hidden',
      transition: 'background-color 0.3s, color 0.3s'
    },
    sidebar: {
      width: sidebarWidth,
      height: '100%',
      backgroundColor: isDark ? '#0a0a0a' : '#f3f4f6',
      borderRight: isDark ? '1px solid #333' : '1px solid #e5e7eb',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 20
    },
    sidebarContent: {
        padding: '16px',
        opacity: isSidebarOpen ? 1 : 0,
        transition: 'opacity 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '240px'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    },
    header: {
      backgroundColor: isDark ? '#0a0a0a' : 'white', 
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: isDark ? '0 1px 0 0 #333' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      zIndex: 10,
      borderBottom: isDark ? '1px solid #333' : '1px solid #e5e7eb',
      transition: 'background-color 0.3s'
    },
    headerLeft: { 
      display: 'flex',
      alignItems: 'center',
      gap: '15px' 
    },
    menuButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: isDark ? '#e5e5e5' : '#1f2937',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: '-webkit-linear-gradient(45deg, #a78bfa, #818cf8)', 
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
      cursor: 'pointer'
    },
    main: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 10,
      width: '100%',
      maxWidth: '100%',
      position: 'relative'
    },
    centerContainer: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0, 
      pointerEvents: 'none'
    },
    welcomeText: {
      fontSize: '22px', 
      color: isDark ? '#888' : '#6b7280',
      fontWeight: '500',
      marginTop: '10px', 
      zIndex: 1 
    },
    chatBubbleContainer: {
      zIndex: 10, 
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '800px', 
      margin: '0 auto',
      paddingBottom: '20px'
    },
    chatBubble: {
      padding: '12px',
      borderRadius: '12px',
      boxShadow: isDark ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      border: isDark ? '1px solid #333' : 'none',
      maxWidth: '85%',
      marginBottom: '12px',
      fontSize: '16px',
      lineHeight: '1.5',
      transition: 'background-color 0.3s',
      position: 'relative'
    },
    userBubble: {
      backgroundColor: '#7c3aed', 
      color: 'white',
      alignSelf: 'flex-end',
      marginLeft: 'auto',
      border: 'none'
    },
    botBubble: {
      backgroundColor: isDark ? '#1a1a1a' : '#f3f4f6',
      color: isDark ? '#e5e5e5' : '#1f2937',
      alignSelf: 'flex-start',
      marginRight: 'auto'
    },
    inputArea: {
      backgroundColor: isDark ? '#0a0a0a' : 'white',
      padding: '20px',
      borderTop: isDark ? '1px solid #333' : '1px solid #e5e7eb',
      display: 'flex',
      gap: '10px',
      zIndex: 20, 
      transition: 'background-color 0.3s',
      justifyContent: 'center'
    },
    inputForm: {
      display: 'flex',
      width: '100%',
      maxWidth: '800px', 
      gap: '10px'
    },
    input: {
      flex: 1,
      padding: '14px 20px',
      borderRadius: '25px',
      border: isDark ? '1px solid #333' : '1px solid #d1d5db',
      fontSize: '16px',
      outline: 'none',
      backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
      color: isDark ? 'white' : '#1f2937',
      transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
    },
    button: {
      padding: '14px',
      borderRadius: '50%',
      backgroundColor: '#7c3aed',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    },
    sidebarButton: {
        padding: '10px',
        width: '100%',
        textAlign: 'left',
        backgroundColor: 'transparent',
        border: 'none',
        color: isDark ? '#e5e5e5' : '#1f2937',
        cursor: 'pointer',
        borderRadius: '8px',
        marginBottom: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    sidebarButtonHover: { 
        backgroundColor: isDark ? '#333' : '#e5e7eb' 
    },
    historyItem: {
        padding: '10px',
        width: '100%',
        textAlign: 'left',
        backgroundColor: 'transparent',
        border: 'none',
        color: isDark ? '#aaa' : '#555',
        cursor: 'pointer',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', 
        gap: '10px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginTop: '5px'
    },
    activeHistoryItem: {
        backgroundColor: isDark ? '#333' : '#ddd',
        color: isDark ? 'white' : 'black'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 150,
        display: 'none'
    },
    overlayOpen: {
        display: 'block'
    },
    select: {
      padding: '8px',
      borderRadius: '8px',
      border: isDark ? '1px solid #333' : '1px solid #d1d5db',
      backgroundColor: isDark ? '#1a1a1a' : 'white',
      color: isDark ? 'white' : '#1f2937',
      cursor: 'pointer'
    },
    themeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: isDark ? '#e5e5e5' : '#1f2937',
      padding: '8px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    editInput: {
        width: '100%',
        padding: '6px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        color: 'black',
        fontSize: '14px',
        backgroundColor: 'white'
    },
    actionButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'inherit',
        opacity: 0.6,
        padding: '4px',
        transition: 'opacity 0.2s',
        display: 'flex',
        alignItems: 'center'
    }
  };
};

// --- Icon Components ---
const MicIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>);
const SendIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>);
const VolumeIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 0 0 1 0 7.07"></path></svg>);
const SunIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2"></path><path d="M12 21v2"></path><path d="M4.22 4.22l1.42 1.42"></path><path d="M18.36 18.36l1.42 1.42"></path><path d="M1 12h2"></path><path d="M21 12h2"></path><path d="M4.22 19.78l1.42-1.42"></path><path d="M18.36 5.64l1.42-1.42"></path></svg>);
const MoonIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>);
const MenuIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const PlusIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const HistoryIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const EditIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const CheckIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>);
const TrashIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>);
const CloseIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

// --- Main App ---
export default function Home() {
  const [inputText, setInputText] = useState('');
  const [currentChatId, setCurrentChatId] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [currentLang, setCurrentLang] = useState('bn');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [firstUserMessage, setFirstUserMessage] = useState('New Chat');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);
  const API_URL = 'https://diyokontho-api.onrender.com';

  const styles = getStyles(theme, isSidebarOpen);

  // --- Load All Chats on Mount ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedChats = localStorage.getItem('diyo_all_chats');
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        setAllChats(parsedChats);
        if (parsedChats.length > 0) {
            setCurrentChatId(parsedChats[0].id);
        } else {
            createNewChat();
        }
      } else {
          createNewChat();
      }
    }
  }, []);

  // --- Save All Chats ---
  useEffect(() => {
    if (typeof window !== 'undefined' && allChats.length > 0) {
        localStorage.setItem('diyo_all_chats', JSON.stringify(allChats));
    }
  }, [allChats]);

  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allChats, currentChatId]);

  // --- Speech Setup ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = currentLang === 'bn' || currentLang === 'syl' || currentLang === 'noa' ? 'bn-BD' : 'en-US';

        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          handleSubmit(transcript);
        };
      }
    }
  }, [currentLang]);

  const getCurrentChatMessages = () => {
      const chat = allChats.find(c => c.id === currentChatId);
      return chat ? chat.messages : [];
  };

  const updateCurrentChat = (newMessages) => {
      setAllChats(prevChats => prevChats.map(chat => 
          chat.id === currentChatId 
          ? { ...chat, messages: newMessages, title: chat.title === 'New Chat' && newMessages.length > 0 ? newMessages[0].content.substring(0, 20) : chat.title } 
          : chat
      ));
  };

  const createNewChat = () => {
      const newChat = {
          id: Date.now(),
          title: 'New Chat',
          messages: []
      };
      setAllChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
      if (typeof window !== 'undefined' && window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const deleteChat = (e, id) => {
      e.stopPropagation();
      if (confirm("Delete this chat?")) {
          const updatedChats = allChats.filter(c => c.id !== id);
          setAllChats(updatedChats);
          localStorage.setItem('diyo_all_chats', JSON.stringify(updatedChats));
          
          if (currentChatId === id) {
              if (updatedChats.length > 0) setCurrentChatId(updatedChats[0].id);
              else createNewChat();
          }
      }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) handleSubmit(inputText.trim());
  };

  const handleMicClick = () => {
    if (isListening) recognitionRef.current?.stop();
    else recognitionRef.current?.start();
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  const startEditing = (index, text) => {
      setEditingIndex(index);
      setEditText(text);
  };

  const saveEdit = (index) => {
      const currentMessages = getCurrentChatMessages();
      const updatedMessages = [...currentMessages];
      updatedMessages[index].content = editText;
      updateCurrentChat(updatedMessages);
      setEditingIndex(null);
  };

  const handleSubmit = async (text) => {
    if (!text || isLoading) return;
    setIsLoading(true);
    
    const currentMessages = getCurrentChatMessages();
    const userMsg = { role: 'user', content: text };
    const newMessages = [...currentMessages, userMsg];
    
    updateCurrentChat(newMessages);
    setInputText('');

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang: currentLang }),
      });
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      const botMsg = { role: 'bot', content: data.answer, lang: data.lang_out };
      updateCurrentChat([...newMessages, botMsg]);
      
    } catch (err) {
      const errorMsg = { role: 'bot', content: 'দুঃখিত, সার্ভারের সাথে সংযোগ করা যাচ্ছে না।', isError: true };
      updateCurrentChat([...newMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayTTS = (text, lang) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentMessages = getCurrentChatMessages();

  return (
    <div style={styles.container}>
      
      <div 
        style={{...styles.overlay, ...(isSidebarOpen ? styles.overlayOpen : {})}} 
        onClick={() => setIsSidebarOpen(false)}
      />

      <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
        
        <div style={styles.sidebar}>
            <div style={styles.sidebarContent}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                    <div style={styles.logoText}>DiyoKontho</div>
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        style={{...styles.menuButton, display: typeof window !== 'undefined' && window.innerWidth < 768 ? 'flex' : 'none'}}
                    >
                        <CloseIcon />
                    </button>
                </div>

                <button 
                    onClick={createNewChat} 
                    style={styles.sidebarButton}
                >
                    <PlusIcon /> New Chat
                </button>
                
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', paddingLeft: '5px' }}>History</div>
                
                <div style={{flex: 1, overflowY: 'auto'}}>
                    {allChats.map((chat) => (
                        <div 
                            key={chat.id}
                            onClick={() => { setCurrentChatId(chat.id); if(typeof window !== 'undefined' && window.innerWidth < 768) setIsSidebarOpen(false); }}
                            style={{
                                ...styles.historyItem,
                                ...(chat.id === currentChatId ? styles.activeHistoryItem : {})
                            }}
                        >
                            <div style={{display:'flex', alignItems:'center', gap:'10px', overflow:'hidden', flex: 1}}>
                                <HistoryIcon /> 
                                <span style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{chat.title}</span>
                            </div>
                            <button 
                                onClick={(e) => deleteChat(e, chat.id)} 
                                style={styles.actionButton}
                                title="Delete Chat"
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div style={styles.mainContent}>
          <header style={styles.header}>
            <div style={styles.headerLeft}>
              <button onClick={toggleSidebar} style={styles.menuButton} title="Toggle Menu">
                  <MenuIcon />
              </button>
              <h1 style={styles.title}>DiyoKontho</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value)}
                style={styles.select}
              >
                <option value="en">English</option>
                <option value="bn">Bangla</option>
                <option value="syl">Sylheti</option>
                <option value="noa">Noakhali</option>
              </select>
              <button onClick={toggleTheme} style={styles.themeButton} title="Toggle Theme">
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </header>

          <main style={styles.main}>
            {currentMessages.length === 0 && (
              <div style={styles.centerContainer}>
                <p style={styles.welcomeText}>How can I help you today?</p>
              </div>
            )}

            <div style={styles.chatBubbleContainer}>
              {currentMessages.map((msg, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.chatBubble,
                    ...(msg.role === 'user' ? styles.userBubble : styles.botBubble),
                    ...(msg.isError ? { backgroundColor: '#ff5252', color: 'white' } : {})
                  }}
                >
                  {editingIndex === index ? (
                      <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                          <input 
                            type="text" 
                            value={editText} 
                            onChange={(e) => setEditText(e.target.value)}
                            style={styles.editInput}
                            autoFocus
                          />
                          <button onClick={() => saveEdit(index)} style={styles.actionButton} title="Save">
                              <CheckIcon />
                          </button>
                      </div>
                  ) : (
                      <p style={{ margin: 0 }}>{msg.content}</p>
                  )}

                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', opacity: 0.7, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      {msg.role === 'bot' && !msg.isError && (
                        <button 
                            onClick={() => handlePlayTTS(msg.content, msg.lang)}
                            style={styles.actionButton}
                            title="Play"
                        >
                            <VolumeIcon />
                        </button>
                      )}
                      {msg.role === 'user' && editingIndex !== index && (
                          <button 
                              onClick={() => startEditing(index, msg.content)}
                              style={styles.actionButton}
                              title="Edit"
                          >
                              <EditIcon />
                          </button>
                      )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div style={{ ...styles.chatBubble, ...styles.botBubble, fontStyle: 'italic', color: '#888' }}>
                  Typing...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </main>

          <footer style={styles.inputArea}>
            <form onSubmit={handleTextSubmit} style={styles.inputForm}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? 'Listening...' : 'Type your message...'}
                style={styles.input}
                disabled={isListening}
              />
              <button 
                type={inputText && !isListening ? 'submit' : 'button'}
                onClick={inputText && !isListening ? handleTextSubmit : handleMicClick}
                style={{
                  ...styles.button,
                  backgroundColor: isListening ? '#ef4444' : '#7c3aed'
                }}
              >
                {inputText && !isListening ? <SendIcon /> : <MicIcon />}
              </button>
            </form>
          </footer>
        </div>
      </div>
    </div>
  );
}