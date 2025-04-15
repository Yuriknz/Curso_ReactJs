import supabase from './supabase';

const clientsService = {
  // Obter clientes com paginação
  async getClients(page = 1, limit = 8) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Buscar clientes com paginação
    const { data, error, count } = await supabase
      .from('clients') // Alterado de 'products' para 'clients'
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('id', { ascending: true }); // Assumindo que 'clients' também tem 'id'

    if (error) {
      console.error('Erro ao buscar clientes:', error); // Mensagem de erro atualizada
      throw error;
    }

    return {
      clients: data, // Alterado de 'products' para 'clients'
      total: count,
      totalPages: Math.ceil(count / limit)
    };
  },

  // Obter um cliente pelo ID
  async getClientById(id) {
    const { data, error } = await supabase
      .from('clients') // Alterado de 'products' para 'clients'
      .select('*')
      .eq('id', id) // Assumindo que 'clients' também tem 'id'
      .single();

    if (error) {
      console.error('Erro ao buscar cliente:', error); // Mensagem de erro atualizada
      throw error;
    }

    return data;
  },

  // Criar um novo cliente
  async createClient(client) { // Parâmetro renomeado
    // Certifique-se de que o objeto 'client' tenha as colunas corretas:
    // name (text), email (text), phone (numeric), url_image_profile (text), birth (date)
    const { data, error } = await supabase
      .from('clients') // Alterado de 'products' para 'clients'
      .insert([client]) // Parâmetro renomeado
      .select();

    if (error) {
      console.error('Erro ao criar cliente:', error); // Mensagem de erro atualizada
      throw error;
    }

    return data[0];
  },

  // Atualizar um cliente existente
  async updateClient(id, client) { // Parâmetro renomeado
    const { data, error } = await supabase
      .from('clients') // Alterado de 'products' para 'clients'
      .update(client) // Parâmetro renomeado
      .eq('id', id) // Assumindo que 'clients' também tem 'id'
      .select();

    if (error) {
      console.error('Erro ao atualizar cliente:', error); // Mensagem de erro atualizada
      throw error;
    }

    return data[0];
  },

  // Deletar um cliente
  async deleteClient(id) {
    const { error } = await supabase
      .from('clients') // Alterado de 'products' para 'clients'
      .delete()
      .eq('id', id); // Assumindo que 'clients' também tem 'id'

    if (error) {
      console.error('Erro ao deletar cliente:', error); // Mensagem de erro atualizada
      throw error;
    }

    return true;
  }
};

export default clientsService; // Export renomeado