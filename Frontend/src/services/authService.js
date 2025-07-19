// services/authService.js  
const API_BASE = 'http://localhost:4051/api/optica';  
  
export const authService = {  
  login: async (credentials) => {  
    const response = await fetch(`${API_BASE}/auth/login`, {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({  
        Nombre_Usuario: credentials.Nombre_Usuario,  
        contraseña: credentials.contraseña  
      })  
    });  
      
    if (!response.ok) {  
      const errorData = await response.json();  
      throw new Error(errorData.mensaje || 'Error en el login');  
    }  
      
    const data = await response.json();  
      
    // Guardar token en localStorage  
    if (data.token) {  
      localStorage.setItem('token', data.token);  
      localStorage.setItem('usuario', JSON.stringify({  
        idUsuario: data.idUsuario,  
        Nombre_Usuario: credentials.Nombre_Usuario  
      }));  
    }  
      
    return data;  
  },  
  
  register: async (userData) => {  
    const response = await fetch(`${API_BASE}/auth/registro`, {   
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify(userData)  
    });  
      
    if (!response.ok) {  
      const errorData = await response.json();  
      throw new Error(errorData.mensaje || 'Error en el registro');  
    }  
      
    return response.json();  
  },  
    
  logout: () => {  
    localStorage.removeItem('token');  
    localStorage.removeItem('usuario');  
  },  
    
  getToken: () => {  
    return localStorage.getItem('token');  
  },  
    
  getCurrentUser: () => {  
    const usuario = localStorage.getItem('usuario');  
    return usuario ? JSON.parse(usuario) : null;  
  },  
    
  isAuthenticated: () => {  
    const token = localStorage.getItem('token');  
    return !!token;  
  }  
};