
interface PaginationProps {
    currentPage: number,
    totalPages: number,
    onChangePage: (page: number) => void;
}

export default function Pagination({ currentPage = 1, totalPages, onChangePage }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const isLast = currentPage === totalPages;
    const isFirst = currentPage === 1;

    const handlePrevPage = () => {
        if (!isFirst) {
            onChangePage(currentPage - 1);
        }
    }

    const handleNextPage = () => {

        if (!isLast) {
            onChangePage(currentPage + 1);
        }
    }

    const handleChangePage = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const page = Number(e.currentTarget.dataset.page);
        if (currentPage !== page) {
            onChangePage(page)
        }
    }


    const handleChangePageUrl = (page: number) => {
        //obteniendo la informacion de la url desde donde me ubico

        //en productos devuelve http://localhost:5173/products
        const url = new URL(window.location.href);
        //seteando un nuevo parametro para la url. Permite modificarla y en caso de no existir, crearla
        url.searchParams.set("page", page.toString());
        return `${url.pathname}?${url.searchParams}`;
    }


    return (
        <>
            <button className="prev-btn" onClick={handlePrevPage}> prev </button>
            {pages.map((page) => (
                <a
                    data-page={page}
                    className="pagination-btn"
                    key={page}
                    onClick={handleChangePage}
                    href={handleChangePageUrl(page)}>
                    {page}

                </a>
            ))}
            <button className="next-page" onClick={handleNextPage}>Next</button>
        </>
    )
}