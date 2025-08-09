import React, { useState, useEffect } from 'react';
import { pedidoConsumiblesAPI } from '../../helpers/api';
import CustomToaster from '../../components/globalComponents/CustomToaster';
import { toast } from 'react-hot-toast';

const ListaAbastecimientos = () => {
  const [abastecimientos, setAbastecimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarAbastecimientos();
  }, []);

  const cargarAbastecimientos = async () => {
    try {
      setLoading(true);
      const response = await pedidoConsumiblesAPI.getAllAbastecimientos();
      
      if (response.success) {
        setAbastecimientos(response.data || []);
      } else {
        setError('No se pudieron cargar los abastecimientos');
        toast.error('Error al cargar los datos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      toast.error('Error al cargar los abastecimientos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      case 'en proceso':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00897B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando abastecimientos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <CustomToaster />
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#00897B] px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Lista de Abastecimientos</h1>
            <p className="text-white/80 mt-1">
              Total de registros: {abastecimientos.length}
            </p>
          </div>

          {/* Botón de actualizar */}
          <div className="p-4 border-b">
            <button
              onClick={cargarAbastecimientos}
              disabled={loading}
              className="bg-[#00897B] hover:bg-[#00796B] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Actualizando...' : 'Actualizar Lista'}
            </button>
          </div>

          {/* Contenido */}
          {error ? (
            <div className="p-6 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={cargarAbastecimientos}
                className="bg-[#00897B] hover:bg-[#00796B] text-white px-4 py-2 rounded-lg"
              >
                Reintentar
              </button>
            </div>
          ) : abastecimientos.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No hay abastecimientos registrados</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Observaciones
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {abastecimientos.map((item, index) => (
                    <tr key={item.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatearFecha(item.fechaPedido)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(item.estado)}`}>
                          {item.estado || 'Sin estado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.totalItems || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {item.observaciones || 'Sin observaciones'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.idUsuario || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaAbastecimientos;