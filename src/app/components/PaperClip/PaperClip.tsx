import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './PaperClip.module.css';
import Image from 'next/image';

const PaperClip: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const togglePopup = (e: React.MouseEvent) => {
    setPopupVisible(!isPopupVisible);

    // Calculate button position to place the popup
    const buttonRect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: buttonRect.bottom + window.scrollY - 319,
      left: buttonRect.left + window.scrollX - 110,
    });
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleLocalUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Local file selected:', file);
      // Handle the local file upload
    }
  };

  const handleGoogleDriveUpload = () => {
    console.log('Google Drive upload triggered');
    // Integrate Google Drive API to handle the file upload
  };

  const handleCloudUpload = () => {
    console.log('Cloud upload triggered');
    // Handle cloud upload (e.g., AWS S3, Dropbox, etc.)
  };

  return (
    <>
      <div className={styles.container}>
        <button className={styles.Paperclipbutton} onClick={togglePopup}>
          <Image
            className={styles.Paperclip}
            alt="Attach file"
            src="/assets/prompt-chat-field--alternativepapercliphorizontal@2x.png"
            width={24}
            height={22}
          />
        </button>
      </div>

      {isPopupVisible &&
        ReactDOM.createPortal(
          <div className={styles.popup} style={{ top: popupPosition.top, left: popupPosition.left }}>
            <div className={styles.popupContent}>
              <h3>Select a file to upload</h3>
              <div className={styles.uploadOptions}>
                <label className={styles.uploadOption}>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleLocalUpload}
                  />
                  <div className={styles.optionLabel}>Upload from Local</div>
                </label>
                <div
                  className={styles.uploadOption}
                  onClick={handleGoogleDriveUpload}
                >
                  Upload from Google Drive
                </div>
                <div
                  className={styles.uploadOption}
                  onClick={handleCloudUpload}
                >
                  Upload from Cloud
                </div>
              </div>
              <button className={styles.closeButton} onClick={closePopup}>Close</button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default PaperClip;
