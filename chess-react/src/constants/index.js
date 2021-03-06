export const API_BASE_URL = 'https://chessomania.herokuapp.com';
export const OAUTH2_REDIRECT_URI = 'https://chessomania.herokuapp.com/oauth2/redirect'
export const HOSTNAME = 'chessomania.herokuapp.com'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;