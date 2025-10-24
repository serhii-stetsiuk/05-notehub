import { useState } from 'react';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import css from '../App/App.module.css';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [debounceQuery] = useDebounce(query, 300);
  const [isModalOpen, setIsmodalOpen] = useState<boolean>(false);
  

  const { data } = useQuery({
    queryKey: ['notes', debounceQuery, page],
    queryFn: () => fetchNotes(debounceQuery, page),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };
  const toggleModal = () => {
    setIsmodalOpen(!isModalOpen);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ? data.totalPages : 0;
  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => {
            toggleModal();
       
          }}
        >
          Create note +
        </button>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={toggleModal}>
			{isModalOpen && <NoteForm onClose={()=>{			
			toggleModal();
			
			
		  }}/>}</Modal>
      )}
    </div>
  );
}
