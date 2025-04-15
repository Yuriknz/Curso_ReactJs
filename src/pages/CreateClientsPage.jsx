import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import clientService from '../services/clientsService';
import { toast } from 'react-hot-toast';

const CreateClientPage = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState({
    name: '',
    email: '',
    phone: '',
    url_image_profile: '',
    birth: ''
  });

  const [errors, setErrors] = useState({});

  const createClientMutation = useMutation({
    mutationFn: clientService.createClient,
    onSuccess: () => {
      toast.success('Cliente criado com sucesso!', {
        duration: 5000,
        icon: '✅',
      });
      navigate('/clientes');
    },
    onError: (error) => {
      toast.error(`Erro ao criar cliente: ${error.message}`, {
        duration: 5000,
      });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!client.name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    }

    if (!client.email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(client.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!client.phone.trim()) {
      newErrors.phone = 'O telefone é obrigatório';
    } else if (!/^\d+$/.test(client.phone)) {
       newErrors.phone = 'O telefone deve conter apenas números';
    }


    if (!client.url_image_profile.trim()) {

    } else if (!client.url_image_profile.match(/^https?:\/\/.+/i)) {
      newErrors.url_image_profile = 'URL da imagem inválida';
    }

    if (!client.birth.trim()) {
      newErrors.birth = 'A data de nascimento é obrigatória';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {

      const clientToSave = {
        ...client,

        phone: client.phone ? Number(client.phone) : null,

        birth: client.birth || null,
        url_image_profile: client.url_image_profile || null
      };

      createClientMutation.mutate(clientToSave);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">Cadastrar Novo Cliente</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome Completo</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={client.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>


              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={client.email}
                  onChange={handleChange}
                  placeholder="exemplo@dominio.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>


              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Telefone (apenas números)</label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  name="phone"
                  value={client.phone}
                  onChange={handleChange}
                  placeholder="11999998888"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>


              <div className="mb-3">
                <label htmlFor="url_image_profile" className="form-label">URL da Imagem de Perfil (Opcional)</label>
                <input
                  type="text"
                  className={`form-control ${errors.url_image_profile ? 'is-invalid' : ''}`}
                  id="url_image_profile"
                  name="url_image_profile"
                  value={client.url_image_profile}
                  onChange={handleChange}
                  placeholder="https://..."
                />
                {errors.url_image_profile && <div className="invalid-feedback">{errors.url_image_profile}</div>}
              </div>


              <div className="mb-3">
                <label htmlFor="birth" className="form-label">Data de Nascimento</label>
                <input
                  type="date"
                  className={`form-control ${errors.birth ? 'is-invalid' : ''}`}
                  id="birth"
                  name="birth"
                  value={client.birth}
                  onChange={handleChange}
                />
                {errors.birth && <div className="invalid-feedback">{errors.birth}</div>}
              </div>


              {client.url_image_profile && !errors.url_image_profile && (
                <div className="mb-3 text-center">
                  <p>Previsualização:</p>
                  <img
                    src={client.url_image_profile}
                    alt="Previsualização Perfil"
                    className="img-thumbnail rounded-circle"
                    style={{ maxHeight: '150px', maxWidth: '150px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Imagem+Inválida';
                      e.target.style.display = 'none';

                    }}
                  />
                </div>
              )}


              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/clientes')}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={createClientMutation.isLoading}
                >
                  {createClientMutation.isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Salvando...
                    </>
                  ) : 'Cadastrar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClientPage;