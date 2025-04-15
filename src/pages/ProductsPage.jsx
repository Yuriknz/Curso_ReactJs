import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import CardsGrid from "../components/CardsGrid";
import Pagination from "../components/Pagination";
import productService from '../services/productService';

const ProductsPage = ({ onAddToCart }) => {
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;

  // Buscar produtos usando React Query
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => productService.getProducts(currentPage, PRODUCTS_PER_PAGE),
    keepPreviousData: true,
  });

  // Manipulador para mudança de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Rolar para o topo da página
    window.scrollTo(0, 0);
  };

  // Renderização condicional para estados de carregamento e erro
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando produtos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Erro ao carregar produtos: {error.message}
      </div>
    );
  }

  // Extrair dados da resposta
  const { products, total, totalPages } = data;

  return (
    <div>
      {/* Cabeçalho com título e botão para adicionar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Produtos</h1>
        <NavLink to="/produtos/novo" className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i>
          Adicionar Produto
        </NavLink>
      </div>
      
      {/* Informações de paginação */}
      <p>
        <i className="bi bi-info-circle me-2"></i>
        Mostrando {products.length} de {total} produtos - Página {currentPage} de {totalPages}
      </p>

      {/* Grid de produtos */}
      <CardsGrid
        items={products}
        cols={4}
        onAddToCart={onAddToCart}
      />

      {/* Componente de paginação */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsPage;