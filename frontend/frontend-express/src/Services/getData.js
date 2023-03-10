import axios from "axios";

const URL = 'http://localhost:5000';

export default function getData({PATH, METHOD}) {
  /**/
  
  const data = {
    "GET": async () => {
      const res = await (axios.get(`${URL}/${PATH}`));
      return res;
    },
    "POST": async (data) => {
      const res = axios.post(`${URL}/${PATH}`, data);
      return res;
    },
    "PUT": async (data, id) => {
      const res = axios.put(`${URL}/${PATH}/${id}`, data);
      return res;
      
    },
    "DEL": async (id) => {
      const res = axios.delete(`${URL}/${PATH}/${id}`);
      return res;
    }
  }

  return data[METHOD];
}
