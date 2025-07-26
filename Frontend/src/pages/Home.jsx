import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Notes from '../components/Notes';
import { delet, get, post, put } from '../services/ApiEndPoint';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import EidtModal from '../components/EidtModal';
import DeleteModal from '../components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updatetitle, setUpdatetitle] = useState('');
  const [updatedescription, setUpdatedescription] = useState('');
  const [modalId, setModalId] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [refersh, setRefersh] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('edited');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNoteSubmit = async () => {
    try {
      const request = await post('/notes/create', { title, description });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
        setTimeout(() => setCloseModal(false), 100);
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handeleUpdate = async () => {
    try {
      const request = await put(`/notes/update/${modalId}`, { title: updatetitle, description: updatedescription });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
        setTimeout(() => setCloseModal(false), 100);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handelNotesDelete = async (id) => {
    try {
      const request = await delet(`/notes/delete/${id}`);
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
        setTimeout(() => setCloseModal(false), 100);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const GetNotes = async () => {
      try {
        const request = await get('/notes/getnotes');
        const reponse = request.data;
        setNotes(reponse.Notes);
      } catch (error) {
        console.log(error);
      }
    };
    GetNotes();
  }, [refersh]);

  const displayNotes = [...notes]
    .filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      let dateA, dateB;
      if (sortOrder === 'edited') {
        dateA = new Date(a.updatedAt);
        dateB = new Date(b.updatedAt);
      } else if (sortOrder === 'created') {
        dateA = new Date(a.createdAt);
        dateB = new Date(b.createdAt);
      } else {
        dateA = new Date(a.updatedAt || a.createdAt);
        dateB = new Date(b.updatedAt || b.createdAt);
      }
      return dateB - dateA;
    });

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-12 px-4'>
          <Navbar />
          <div className='row my-4 align-items-center'>
            <div className='col-md-6'>
              <button
                type="button"
                className='btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center w-100'
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                + Add New Note
              </button>
            </div>
            <div className='col-md-6 d-flex align-items-center justify-content-end'>
              <input
                type="text"
                className="form-control me-2 SerachInput flex-grow-1"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="edited">Sort by Edited</option>
                <option value="created">Sort by Created</option>
              </select>
            </div>
          </div>
          <Modal
            Modaltitle={'Write Notes'}
            handleChange={(e) => {
              if (e.target.name === 'title') {
                setTitle(e.target.value);
              } else if (e.target.name === 'description') {
                setDescription(e.target.value);
              }
            }}
            value={{ title, description }}
            handleNoteSubmit={handleNoteSubmit}
            closeModal={closeModal}
          />
          <EidtModal
            Modaltitle={'Edit Notes'}
            handleChange={(e) => {
              if (e.target.name === 'title') {
                setUpdatetitle(e.target.value);
              }
              else if (e.target.name === 'description') {
                setUpdatedescription(e.target.value);
              }
            }}
            value={{ title: updatetitle, description: updatedescription }}
            handleNoteSubmit={handeleUpdate}
            closeModal={closeModal}
          />
          <DeleteModal Modaltitle={'Delete Notes'} handelNotesDelete={handelNotesDelete} closeModal={closeModal}/>
          {displayNotes.length > 0 && (
            <div className='mt-3 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
              {displayNotes.map((elem, index) => (
                <div className='col' key={index}>
                  <Notes
                    title={elem.title}
                    description={elem.description}
                    date={formatDate(elem.createdAt)}
                    handleUpdate={(note) => {
                      setModalId(note._id);
                      setUpdatetitle(note.title);
                      setUpdatedescription(note.description);
                    }}
                    handleDelete={handelNotesDelete}
                    openDropdownId={openDropdownId}
                    setOpenDropdownId={setOpenDropdownId}
                    noteId={elem._id}
                  />
                </div>
              ))}
            </div>
          )}
          {displayNotes.length === 0 && (
            <div className='mt-5 d-flex justify-content-center align-items-center' style={{minHeight: 'calc(100vh - 200px)'}}>
              <h1 className='fs-1 fw-bold text-muted'>No Notes Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
