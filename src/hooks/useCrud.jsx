import { useState } from 'react';
import { apiClient } from '../utils/apiClient';

export const useCrud = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    try {
      setLoading(true);
      setError(null);
      return await apiClient.post(endpoint, data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const read = async (id = '') => {  
    try {
      setLoading(true);
      setError(null);
      const url = id ? `${endpoint}/${id}` : endpoint;
      return await apiClient.get(url);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      return await apiClient.put(`${endpoint}/${id}`, data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      setError(null);
      return await apiClient.delete(`${endpoint}/${id}`);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    read,
    update,
    remove,
    loading,
    error,
  };
};