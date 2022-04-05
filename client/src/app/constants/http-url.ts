import { environment } from 'src/environments/environment';

export const DATABASE_URL = `${environment.serverUrl}/database/`
export const GET_PLANT_RUL = `${DATABASE_URL}plant/`;
export const GET_JARDIN_RUL = `${DATABASE_URL}jardins/`;