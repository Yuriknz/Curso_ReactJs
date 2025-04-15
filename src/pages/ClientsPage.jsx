import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import Pagination from "../components/Pagination";
import clientService from '../services/clientsService'; // Import clientService

const ClientsPage = () => { // Renamed component
  // Estado para controlar a página atual
  const [currentPage, setCurrentPage] = useState(1);
  const CLIENTS_PER_PAGE = 8; // Constant name updated

  // Buscar clientes usando React Query
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['clients', currentPage], // Updated queryKey
    queryFn: () => clientService.getClients(currentPage, CLIENTS_PER_PAGE), // Use clientService.getClients
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
        <p className="mt-2">Carregando clientes...</p> {/* Text updated */}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Erro ao carregar clientes: {error.message} {/* Text updated */}
      </div>
    );
  }

  // Extrair dados da resposta
  const { clients, total, totalPages } = data; // Variable name updated

  return (
    <div>
      {/* Cabeçalho com título e botão para adicionar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Clientes</h1> {/* Title updated */}
        {/* TODO: Update NavLink path if needed for creating clients */}
        <NavLink to="/clientes/novo" className="btn btn-success"> {/* Path and text updated */}
          <i className="bi bi-plus-circle me-2"></i>
          Adicionar Cliente
        </NavLink>
      </div>

      {/* Informações de paginação */}
      <p>
        <i className="bi bi-info-circle me-2"></i>
        Mostrando {clients.length} de {total} clientes - Página {currentPage} de {totalPages} {/* Text updated */}
      </p>

      {/* Tabela de clientes */}
      <div className="table-responsive"> {/* Added for responsiveness on smaller screens */}
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Perfil</th> {/* New column header */}
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              {/* Removed URL Imagem header */}
              <th>Data Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td> {/* New cell for the image */}
                  {client.url_image_profile ? (
                    <img
                      src={client.url_image_profile}
                      alt={`Foto de ${client.name}`}
                      style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/50?text=Erro"; }} // Basic error handling
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/50?text=N/A" // Placeholder image
                      alt="Sem imagem"
                      style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  )}
                </td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                
                {/* Removed the cell for URL Imagem */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Componente de paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ClientsPage; // Export updated