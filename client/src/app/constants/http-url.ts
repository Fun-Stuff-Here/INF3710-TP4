import { environment } from 'src/environments/environment';

export const DATABASE_URL = `${environment.serverUrl}/database/`
export const GET_PLANT_RUL = `${DATABASE_URL}plant/`;
export const GET_JARDIN_RUL = `${DATABASE_URL}jardins/`;
export const GET_PARCELLE_RUL = `${DATABASE_URL}parcelles/`;
export const GET_RANG_RUL = `${DATABASE_URL}rangs/`;
export const GET_VARIETE_RUL = `${DATABASE_URL}varietes/`;