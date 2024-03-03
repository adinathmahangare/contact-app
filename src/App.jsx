import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contactLists);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredContacts = contactLists.filter(
        (contact) =>
          contact.name.toLowerCase().includes(value) ||
          contact.email.toLowerCase().includes(value) ||
          contact.contact.toLowerCase().includes(value) // Add contact filtering
      );
      setContacts(filteredContacts);
    });
  };

  return (
    <main className="flex items-center bg-cyan-100 w-full h-100vh">
      <div className="mx-auto w-[400px] p-4 bg-cyan-950 min-h-[662px] my-5 rounded-xl">
        <Navbar />
        <div className="flex gap-2 px-4">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              onChange={filterContacts}
              type="text"
              className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="cursor-pointer text-5xl text-white"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="bottom-center" />
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    </main>
  );
};

export default App;
