import React, { useState } from 'react';

const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacherData, setTeacherData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 's.johnson@vidyaai.edu',
    education: 'Ph.D. in Education Technology',
    grade: 'Grade 10-12',
    language: 'English, Spanish',
    age: '42',
    vidyaaiId: 'VID789012' // This field should not be editable
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to an API
    console.log('Saved data:', teacherData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data - in a real app you might want to store original data separately
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>Teacher Profile</h2>
          {!isEditing && (
            <button 
              style={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit" style={{marginRight: '8px'}}></i>
              Edit Profile
            </button>
          )}
        </div>

        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            <i className="fas fa-user-graduate" style={styles.avatarIcon}></i>
          </div>
        </div>

        <div style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={teacherData.name}
                onChange={handleInputChange}
                style={styles.input}
              />
            ) : (
              <div style={styles.value}>{teacherData.name}</div>
            )}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={teacherData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            ) : (
              <div style={styles.value}>{teacherData.email}</div>
            )}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Education</label>
            {isEditing ? (
              <input
                type="text"
                name="education"
                value={teacherData.education}
                onChange={handleInputChange}
                style={styles.input}
              />
            ) : (
              <div style={styles.value}>{teacherData.education}</div>
            )}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Grade Level</label>
            {isEditing ? (
              <input
                type="text"
                name="grade"
                value={teacherData.grade}
                onChange={handleInputChange}
                style={styles.input}
              />
            ) : (
              <div style={styles.value}>{teacherData.grade}</div>
            )}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Languages</label>
            {isEditing ? (
              <input
                type="text"
                name="language"
                value={teacherData.language}
                onChange={handleInputChange}
                style={styles.input}
              />
            ) : (
              <div style={styles.value}>{teacherData.language}</div>
            )}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>VidyaAI ID</label>
            <div style={styles.value}>{teacherData.vidyaaiId}</div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Age</label>
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={teacherData.age}
                onChange={handleInputChange}
                style={styles.input}
              />
            ) : (
              <div style={styles.value}>{teacherData.age}</div>
            )}
          </div>

          {isEditing && (
            <div style={styles.buttonGroup}>
              <button 
                style={styles.saveButton}
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button 
                style={styles.cancelButton}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 24px 16px',
    borderBottom: '1px solid #eaeaea'
  },
  title: {
    margin: 0,
    color: '#2d3748',
    fontSize: '24px',
    fontWeight: '600'
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#4c6ef5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  avatarSection: {
    display: 'flex',
    justifyContent: 'center',
    padding: '24px'
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#e9ecef',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarIcon: {
    fontSize: '48px',
    color: '#6c757d'
  },
  form: {
    padding: '0 24px 24px'
  },
  fieldGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#4a5568',
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    outline: 'none'
  },
  value: {
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    fontSize: '16px',
    color: '#2d3748'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  },
  saveButton: {
    backgroundColor: '#4c6ef5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    flex: 1,
    transition: 'background-color 0.2s'
  },
  cancelButton: {
    backgroundColor: '#e9ecef',
    color: '#4a5568',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    flex: 1,
    transition: 'background-color 0.2s'
  }
};

export default ProfileDetails;