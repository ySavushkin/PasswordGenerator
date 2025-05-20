import './Pagination.css';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {

    return (
        <div className="pagination">
            <button
                onClick={() => {
                    if (currentPage > 1)
                        onPageChange(currentPage - 1);
                }}
                className="button page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`button page-link ${currentPage === index + 1 ? 'active' : ''}`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => {
                    if (currentPage < totalPages)
                        onPageChange(currentPage + 1);
                }}
                className="button page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </button>
        </div>
    );
};

export default Pagination;
