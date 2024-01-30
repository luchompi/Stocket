import SesionStore from "../stores/auth.store";
import baseApi from "./base.api";

export const getTokens = (data) => {
    return baseApi.post("jwt/create", data)
}

export const getUserData = () => {
    const { PAT } = SesionStore.getState();
    return baseApi.get("users/me/",
        {
            headers: {
                Authorization: `JWT ${PAT}`
            }
        }
    )
}