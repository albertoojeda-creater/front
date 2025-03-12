import axios from "axios";
const API = "http://localhost:3000/api";

axios.defaults.withCredentials = true;

export const registro = async (usuario) => {
  return await axios.post(`${API}/registro`, usuario);
}

export const login = async (usuario) => {
  try {
    const response = await axios.post(`${API}/login`, usuario);
    return response.data;
  } catch (error) {
    return {
      error: true,
      mensaje: error.response?.data || "Error desconocido en el login",
    };
  }
};

export const mostrar = async () => {
  return await axios.get(`${API}/mostrar`);
}

export const verificarUsuarioLogueado = () => {
  return axios.get(`${API}/usuariosLogueados`);
}

export const verificarAdmin = async () => {
  try {
    const response = await axios.get(`${API}/admin`);
    return response.data;
  } catch (error) {
    return {
      error: true,
      mensaje: error.response?.data || "Error desconocido al verificar admin",
    };
  }
};

export const logout = async () => {
  return await axios.get(`${API}/logout`);
}

export const editarUsuario = async (id, usuario) => {
  try {
    const response = await axios.put(`${API}/modificar/${id}`, usuario);
    return response.data;
  } catch (error) {
    return {
      error: true,
      mensaje: error.response?.data || "Error desconocido al editar usuario",
    };
  }
};

export const eliminarUsuario = async (id) => {
  return await axios.delete(`${API}/eliminar/${id}`);
}

export const buscarUsuario = async (id) => {
  try {
    // const response = await axios.get(`${API}/buscar/${id}`);
    return await axios.get(`${API}/buscar/${id}`);
    // return response.data;
  } catch (error) {
    return {
      error: true,
      mensaje: error.response?.data || "Error desconocido al buscar usuario",
    };
  }
};