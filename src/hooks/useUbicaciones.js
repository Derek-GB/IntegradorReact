import { useEffect, useState } from 'react';
import axios from 'axios';

export function useUbicaciones() {
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [provinciaId, setProvinciaId] = useState('');
  const [cantonId, setCantonId] = useState('');

  useEffect(() => {
    const fetchProvincias = async () => {
      const res = await axios.get('https://api-geo-cr.vercel.app/provincias?page=1');
      setProvincias(res.data.data || []);
    };
    fetchProvincias();
  }, []);

  useEffect(() => {
    if (!provinciaId) return setCantones([]);
    const fetchCantones = async () => {
      const res = await axios.get(`https://api-geo-cr.vercel.app/provincias/${provinciaId}/cantones?page=1`);
      setCantones(res.data.data || []);
    };
    fetchCantones();
  }, [provinciaId]);

  useEffect(() => {
    if (!cantonId) return setDistritos([]);
    const fetchDistritos = async () => {
      const res = await axios.get(`https://api-geo-cr.vercel.app/cantones/${cantonId}/distritos?page=1`);
      setDistritos(res.data.data || []);
    };
    fetchDistritos();
  }, [cantonId]);

  return {
    provincias,
    cantones,
    distritos,
    setProvinciaId,
    setCantonId
  };
}