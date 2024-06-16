import { useState, useEffect } from 'react';

export const useCrearOfrecimiento = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const crearOfrecimiento = async (nuevoOfrecimiento) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}api/crear-ofrecimiento`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoOfrecimiento),
        }
      );
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { crearOfrecimiento, loading, error };
};

export const useObtenerOfrecimientos = () => {
  const [ofrecimientos, setOfrecimientos] = useState([]);

  useEffect(() => {
    const obtenerOfrecimientos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}api/obtener-ofrecimientos`
        );
        const data = await response.json();
        setOfrecimientos(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerOfrecimientos();
  }, []);

  const agregarOfrecimiento = (nuevoOfrecimiento) => {
    setOfrecimientos([...ofrecimientos, nuevoOfrecimiento]);
  };

  const actualizarOfrecimiento = (id, actualizadoOfrecimiento) => {
    setOfrecimientos(ofrecimientos.map(ofrecimiento =>
      ofrecimiento.id === id ? { ...ofrecimiento, ...actualizadoOfrecimiento } : ofrecimiento
    ));
  };

  const eliminarOfrecimiento = (id) => {
    setOfrecimientos(ofrecimientos.filter(ofrecimiento => ofrecimiento.id !== id));
  };

  return {
    ofrecimientos,
    setOfrecimientos,
    agregarOfrecimiento,
    actualizarOfrecimiento,
    eliminarOfrecimiento
  };
};

export const useActualizarOfrecimiento = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const actualizarOfrecimiento = async (id, ofrecimiento) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}api/actualizar-ofrecimiento${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ofrecimiento),
        }
      );
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { actualizarOfrecimiento, loading, error };
};



export const useEliminarOfrecimiento = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const eliminarOfrecimiento = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}api/eliminar-ofrecimiento/${id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { eliminarOfrecimiento, loading, error };
};