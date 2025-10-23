import ReactPaginate from 'react-paginate';
import css from '../Pagination/Pagination.module.css';

interface PaginetionProps {
  totalPages: number;
  currentPage: number;
  onPageChenge: (selected: number) => void;
}

export default function Paginetion({
  totalPages,
  currentPage,
  onPageChenge,
}: PaginetionProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChenge(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
