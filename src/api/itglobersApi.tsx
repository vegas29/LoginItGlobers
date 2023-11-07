import axios from 'axios';

const baseURL = 'https://itgloberspartnerpe.myvtex.com';

const itglobersApi = axios.create({ baseURL });

export default itglobersApi;