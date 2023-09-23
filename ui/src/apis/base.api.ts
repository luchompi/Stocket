import axios, { AxiosError } from 'axios'

const baseApi = axios.create({
     /*baseURL: 'http://localhost:8000/api/v1/',*/
    baseURL: 'https://stocket-deploy.vercel.app/api/v1/',
});

export default baseApi;