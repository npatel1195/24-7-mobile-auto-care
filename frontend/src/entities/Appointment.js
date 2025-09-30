import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export class Appointment {
  static async create(data) {
    const response = await axios.post(`${API_URL}/appointments`, data);
    return response.data;
  }

  static async list(sort = "-created_date") {
    const response = await axios.get(`${API_URL}/appointments?sort=${sort}`);
    return response.data;
  }

  static async update(id, data) {
    const response = await axios.put(`${API_URL}/appointments/${id}`, data);
    return response.data;
  }

  static async get(id) {
    const response = await axios.get(`${API_URL}/appointments/${id}`);
    return response.data;
  }
}