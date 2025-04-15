const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Função para renderizar um número limitado de botões de página
    const getPageNumbers = () => {
      const delta = 2; // Quantas páginas mostrar antes e depois da atual
      const pages = [];
      
      // Sempre mostrar a primeira página
      pages.push(1);
      
      // Calcular o intervalo de páginas a mostrar
      const rangeStart = Math.max(2, currentPage - delta);
      const rangeEnd = Math.min(totalPages - 1, currentPage + delta);
      
      // Adicionar elipses antes do intervalo, se necessário
      if (rangeStart > 2) {
        pages.push('...');
      }
      
      // Adicionar páginas do intervalo
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }
      
      // Adicionar elipses depois do intervalo, se necessário
      if (rangeEnd < totalPages - 1) {
        pages.push('...');
      }
      
      // Sempre mostrar a última página, se for maior que 1
      if (totalPages > 1) {
        pages.push(totalPages);
      }
      
      return pages;
    };
  
    if (totalPages <= 1) return null;
  
    return (
      <nav aria-label="Navegação de páginas">
        <ul className="pagination justify-content-center mt-4">
          {/* Botão Anterior */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left me-1"></i>
              Anterior
            </button>
          </li>
          
          {/* Números de página */}
          {getPageNumbers().map((pageNum, index) => (
            <li 
              key={index} 
              className={`page-item ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => pageNum !== '...' && onPageChange(pageNum)}
                disabled={pageNum === '...'}
              >
                {pageNum}
              </button>
            </li>
          ))}
          
          {/* Botão Próximo */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próximo
              <i className="bi bi-chevron-right ms-1"></i>
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Pagination;