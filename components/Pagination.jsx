import Link from 'next/link';

const Pagination = ({ page, totalConcert }) => {
  const totalPage = Math.ceil(totalConcert / 5);

  return (
    <>
      {page > 1 && (
        <Link
          className="btn-secondary"
          href={page === 2 ? `/concert` : `/concert?page=${page - 1}`}
        >
          Prev
        </Link>
      )}

      {page < totalPage && (
        <Link className="btn-secondary" href={`/concert?page=${page + 1}`}>
          Next
        </Link>
      )}
    </>
  );
};

export default Pagination;
