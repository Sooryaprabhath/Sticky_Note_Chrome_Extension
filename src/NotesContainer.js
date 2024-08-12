import React, { useState, useEffect } from "react";
import StickyNote from "./StickyNote";
import { v4 as uuidv4 } from "uuid";
import PremiumPopup from "./PremiumPopup";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const dummyCoupons = [
  { code: "ABCDE", used: false },
  { code: "FGHIJ", used: false },
  { code: "KLMNO", used: false },
  { code: "PQRST", used: false },
  { code: "UVWXY", used: false },
];

const NotesContainer = () => {
  const [notes, setNotes] = useState([]);
  const [noteToUpdate, setNoteToUpdate] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [totalWords, setTotalWords] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); 

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    const premiumStatus = localStorage.getItem("isPremium");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      setTotalWords(
        parsedNotes.reduce(
          (sum, note) => sum + note.content.split(/\s+/).length,
          0
        )
      );
    }
    if (premiumStatus) {
      setIsPremium(JSON.parse(premiumStatus));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
      setTotalWords(
        notes.reduce((sum, note) => sum + note.content.split(/\s+/).length, 0)
      );
    }
  }, [notes]);

  useEffect(() => {
    if (noteToUpdate) {
      const updatedNotes = notes.map((note) =>
        note.id === noteToUpdate.id
          ? { ...note, content: noteToUpdate.content }
          : note
      );
      const newTotalWords = updatedNotes.reduce(
        (sum, note) => sum + note.content.split(/\s+/).length,
        0
      );
      if (!isPremium && newTotalWords > 30) {
        setPopupType("wordLimit");
        setShowPopup(true);
        return;
      }
      setNotes(updatedNotes);
      setTotalWords(newTotalWords);
      setNoteToUpdate(null);
    }
  }, [noteToUpdate, notes, isPremium]);

  const addNote = () => {
    if (!isPremium && notes.length >= 2) {
      setPopupType("default");
      setShowPopup(true);
      return;
    }
    const newNote = {
      id: uuidv4(),
      content: "",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setTotalWords(
      updatedNotes.reduce(
        (sum, note) => sum + note.content.split(/\s+/).length,
        0
      )
    );
  };

  const triggerUpdateNoteContent = (id, content) => {
    const wordCount = content.split(/\s+/).length;
    if (!isPremium && wordCount > 30) {
      setPopupType("wordLimit");
      setShowPopup(true);
      return;
    }
    if (noteToUpdate?.id !== id || noteToUpdate?.content !== content) {
      setNoteToUpdate({ id, content });
    }
  };

  const handlePurchase = () => {
    setPopupType("default");
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleApplyCoupon = (code) => {
    const coupon = dummyCoupons.find((c) => c.code === code && !c.used);
    if (coupon) {
      coupon.used = true;
      setIsPremium(true);
      localStorage.setItem("isPremium", JSON.stringify(true));
      alert("Coupon applied successfully! You are now a premium user.");
      setShowPopup(false);
    } else {
      alert("Invalid or already used coupon code.");
    }
  };

  const handleBuy = () => {
    setIsPremium(true);
    localStorage.setItem("isPremium", JSON.stringify(true));
    alert("Thank you for purchasing premium! You now have unlimited access.");
    setShowPopup(false);
  };

  // Inline styles
  const containerStyle = {
    padding: "5px",
  };

  const buttonStyle = {
    padding: "8px",
    backgroundColor: "#02ba61",
    color: "white",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const notesContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  };

  const premiumButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#FFC107",
    marginLeft: 10,
  };

  return (
    <div style={containerStyle}>
      <div style={notesContainerStyle}>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onContentChange={triggerUpdateNoteContent}
          />
        ))}
      </div>
      <div>
        <button style={buttonStyle} onClick={addNote}>
          Add Note
        </button>
        {!isPremium && (
          <button style={premiumButtonStyle} onClick={handlePurchase}>
            Premium <MdOutlineWorkspacePremium />
          </button>
        )}
        {showPopup && (
          <PremiumPopup
            onClose={handleClosePopup}
            onApplyCoupon={handleApplyCoupon}
            onBuy={handleBuy}
          />
        )}
      </div>
    </div>
  );
};

export default NotesContainer;
