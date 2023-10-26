import baseApi from "../../../apis/base.api.js";

export const obtenerTokens = async (data) => {
    return await baseApi.post('jwt/create', data);
}