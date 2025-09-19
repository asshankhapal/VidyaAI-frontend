import React, { useState } from 'react';

const ProfileDetails = () => {
  const [userData, setUserData] = useState({
    fullName: 'Alexa Rawles',
    email: 'alexarawles@gmail.com',
    language: 'English',
    standardTeaching: 'Grade 10-12',
    education: 'Ph.D. in Education Technology',
    age: '42',
    schoolCollege: 'Vidya AI University',
    nickName: 'Alexa',
    gender: 'Female',
    country: 'United States',
    timeZone: 'EST (UTC-5)',
    phone: '+1 (555) 123-4567',
    subjects: 'Mathematics, Physics',
    experience: '15 years',
    bio: 'Dedicated educator with a passion for innovative teaching methods.'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save data to an API here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset data if needed
  };

  // Format the current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Responsive styles
  const styles = {
    container: {
      backgroundColor: '#f7f9fc',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
      lineHeight: 1.6,
    },
    topHeader: {
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      padding: '15px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    greeting: {
      flex: 1,
      minWidth: '200px',
    },
    greetingH1: {
      fontSize: '22px',
      fontWeight: 600,
      color: '#2d3748',
      marginBottom: '5px',
    },
    greetingP: {
      color: '#718096',
      fontSize: '14px',
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      flexWrap: 'wrap',
      '@media (max-width: 768px)': {
        width: '100%',
        justifyContent: 'space-between',
      },
      '@media (max-width: 480px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
      },
    },
    searchBar: {
      position: 'relative',
      '@media (max-width: 480px)': {
        width: '100%',
      },
    },
    searchInput: {
      padding: '10px 15px 10px 40px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      width: '250px',
      transition: 'all 0.3s',
      '@media (max-width: 480px)': {
        width: '100%',
      },
    },
    searchIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#a0aec0',
    },
    notificationIcon: {
      position: 'relative',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f7fafc',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    notificationBadge: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      width: '8px',
      height: '8px',
      background: '#e53e3e',
      borderRadius: '50%',
    },
    profileAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 600,
      cursor: 'pointer',
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    gradientCard: {
      background: 'linear-gradient(135deg, #4c6ef5, #3b5bdb)',
      borderRadius: '12px',
      padding: '25px',
      margin: '25px 0',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    gradientCardH2: {
      fontSize: '20px',
      marginBottom: '10px',
      fontWeight: 600,
    },
    gradientCardP: {
      opacity: 0.9,
      fontSize: '15px',
      maxWidth: '600px',
    },
    profileSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      marginBottom: '30px',
    },
    profileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '1px solid #e2e8f0',
      flexWrap: 'wrap',
      gap: '15px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    profileInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap',
      '@media (max-width: 480px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '15px',
      },
    },
    profilePicture: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '32px',
      fontWeight: 600,
    },
    profileDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    profileName: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#2d3748',
    },
    profileEmail: {
      color: '#718096',
      fontSize: '14px',
    },
    editButton: {
      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 6px rgba(66, 153, 225, 0.2)',
      whiteSpace: 'nowrap',
      '@media (max-width: 768px)': {
        alignSelf: 'flex-end',
      },
      '@media (max-width: 480px)': {
        width: '100%',
        alignSelf: 'center',
      },
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#4a5568',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    input: {
      padding: '12px 15px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.3s',
      backgroundColor: '#f7fafc',
      width: '100%',
    },
    select: {
      padding: '12px 15px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.3s',
      backgroundColor: '#f7fafc',
      width: '100%',
    },
    textarea: {
      padding: '12px 15px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.3s',
      backgroundColor: '#f7fafc',
      width: '100%',
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    emailSection: {
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #e2e8f0',
    },
    emailHeader: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#2d3748',
      marginBottom: '15px',
    },
    emailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '15px',
      backgroundColor: '#f7fafc',
      borderRadius: '8px',
      marginBottom: '15px',
      flexWrap: 'wrap',
    },
    emailIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: '#e6fffa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#319795',
      flexShrink: 0,
    },
    emailDetails: {
      flex: 1,
      minWidth: '200px',
    },
    emailAddress: {
      fontWeight: 500,
      color: '#2d3748',
    },
    emailTime: {
      fontSize: '14px',
      color: '#718096',
    },
    addEmailButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'transparent',
      border: '1px dashed #cbd5e0',
      borderRadius: '8px',
      padding: '12px 15px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#4a5568',
      cursor: 'pointer',
      transition: 'all 0.3s',
      width: '100%',
      justifyContent: 'center',
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px',
      flexWrap: 'wrap',
      '@media (max-width: 480px)': {
        flexDirection: 'column',
      },
    },
    saveButton: {
      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 25px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 6px rgba(66, 153, 225, 0.2)',
      flex: 1,
      minWidth: '140px',
    },
    cancelButton: {
      background: 'white',
      color: '#4a5568',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '12px 25px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s',
      flex: 1,
      minWidth: '140px',
    },
  };

  // Apply responsive styles
  const applyMediaQueries = (styleObj) => {
    const responsiveStyle = { ...styleObj };
    Object.keys(responsiveStyle).forEach(key => {
      if (key.startsWith('@media')) {
        delete responsiveStyle[key];
      }
    });
    return responsiveStyle;
  };

  return (
    <div style={applyMediaQueries(styles.container)}>
      {/* Top Header */}
      <header style={applyMediaQueries(styles.topHeader)}>
        <div style={applyMediaQueries(styles.headerContent)}>
          <div style={applyMediaQueries(styles.greeting)}>
            <h1 style={applyMediaQueries(styles.greetingH1)}>Welcome, Alexa</h1>
            <p style={applyMediaQueries(styles.greetingP)}>{currentDate}</p>
          </div>
          <div style={applyMediaQueries(styles.headerRight)}>
            <div style={applyMediaQueries(styles.searchBar)}>
              <span style={applyMediaQueries(styles.searchIcon)}>🔍</span>
              <input 
                type="text" 
                placeholder="Search..." 
                style={applyMediaQueries(styles.searchInput)}
              />
            </div>
            <div style={applyMediaQueries(styles.notificationIcon)}>
              <span>🔔</span>
              <div style={applyMediaQueries(styles.notificationBadge)}></div>
            </div>
            <div style={applyMediaQueries(styles.profileAvatar)}>AR</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={applyMediaQueries(styles.mainContent)}>
        {/* Gradient Card */}
        <div style={applyMediaQueries(styles.gradientCard)}>
          <h2 style={applyMediaQueries(styles.gradientCardH2)}>Profile Information</h2>
          <p style={applyMediaQueries(styles.gradientCardP)}>
            Update your personal information, contact details, and preferences here.
          </p>
        </div>

        {/* Profile Section */}
        <div style={applyMediaQueries(styles.profileSection)}>
          <div style={applyMediaQueries(styles.profileHeader)}>
            <div style={applyMediaQueries(styles.profileInfo)}>
              <div style={applyMediaQueries(styles.profilePicture)}>AR</div>
              <div style={applyMediaQueries(styles.profileDetails)}>
                <h2 style={applyMediaQueries(styles.profileName)}>{userData.fullName}</h2>
                <p style={applyMediaQueries(styles.profileEmail)}>{userData.email}</p>
              </div>
            </div>
            <button 
              style={applyMediaQueries(styles.editButton)}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          <div style={applyMediaQueries(styles.formGrid)}>
            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>👤</span> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.input)}
                disabled={!isEditing}
              />
            </div>

            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>📧</span> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.input)}
                disabled={!isEditing}
              />
            </div>

            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>🗣️</span> Language
              </label>
              <select
                name="language"
                value={userData.language}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.select)}
                disabled={!isEditing}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>

            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>🎓</span> Standard Teaching
              </label>
              <input
                type="text"
                name="standardTeaching"
                value={userData.standardTeaching}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.input)}
                disabled={!isEditing}
              />
            </div>

            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>📚</span> Education
              </label>
              <input
                type="text"
                name="education"
                value={userData.education}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.input)}
                disabled={!isEditing}
              />
            </div>

            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>🎂</span> Age
              </label>
              <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.input)}
                disabled={!isEditing}
              />
            </div>

            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>🏫</span> School/College
              </label>
              <input
                type="text"
                name="schoolCollege"
                value={userData.schoolCollege}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.input)}
                disabled={!isEditing}
              />
            </div>

            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>📞</span> Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.input)}
                disabled={!isEditing}
              />
            </div>

            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>📖</span> Subjects
              </label>
              <input
                type="text"
                name="subjects"
                value={userData.subjects}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.input)}
                disabled={!isEditing}
              />
            </div>

            <div style={applyMediaQueries(styles.fieldGroup)}>
              <label style={applyMediaQueries(styles.label)}>
                <span>⏳</span> Teaching Experience
              </label>
              <input
                type="text"
                name="experience"
                value={userData.experience}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.input)}
                disabled={!isEditing}
              />
            </div>

            <div style={{...applyMediaQueries(styles.fieldGroup), gridColumn: '1 / -1'}}>
              <label style={applyMediaQueries(styles.label)}>
                <span>📝</span> Bio
              </label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                style={applyMediaQueries(styles.textarea)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Email Section */}
          <div style={applyMediaQueries(styles.emailSection)}>
            <h3 style={applyMediaQueries(styles.emailHeader)}>My email Address</h3>
            <div style={applyMediaQueries(styles.emailItem)}>
              <div style={applyMediaQueries(styles.emailIcon)}>
                <span>📧</span>
              </div>
              <div style={applyMediaQueries(styles.emailDetails)}>
                <div style={applyMediaQueries(styles.emailAddress)}>{userData.email}</div>
                <div style={applyMediaQueries(styles.emailTime)}>Verified • 1 month ago</div>
              </div>
              {isEditing && (
                <button style={{background: 'none', border: 'none', color: '#4299e1', cursor: 'pointer'}}>
                  <span>❌</span>
                </button>
              )}
            </div>
            {isEditing && (
              <button style={applyMediaQueries(styles.addEmailButton)}>
                <span>➕</span>
                Add Email Address
              </button>
            )}
          </div>

          {isEditing && (
            <div style={applyMediaQueries(styles.buttonGroup)}>
              <button style={applyMediaQueries(styles.saveButton)} onClick={handleSave}>
                Save Changes
              </button>
              <button style={applyMediaQueries(styles.cancelButton)} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfileDetails;