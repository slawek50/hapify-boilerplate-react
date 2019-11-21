export const API_URL = process.env.NODE_ENV === 'development'
  ? `${window.location.protocol}//${window.location.hostname}:3000`
  : '';

export const UPLOADS_URL = `${API_URL}/uploads/`;

export const DISABLE_CONFIRMATION_MODAL = (process.env.NODE_ENV === 'development');

export const DATE_FORMAT = 'DD/MM/YYYY';

export const RESIZE_IMAGE_MAX_SIZE = 1137;

export const AUTHORIZED_UPLOAD_IMAGES = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
];

export const AUTHORIZED_UPLOAD_FILES = [
  'text/plain',
  'application/pdf',
  'application/xml',
];

export const OPT_COURTESY_TITLE = {
  mr: { short: 'M.', long: 'Monsieur' },
  mme: { short: 'Mme', long: 'Madame' },
};

export const OPT_ACCOUNT_ROLES = {
  ADMIN: 'Administrateur',
  MANAGER: 'Gestionnaire',
  TECHNICIAN: 'Technicien',
};

export const OPT_PHONE_TYPE = {
  home: 'Fixe',
  mobile: 'Mobile',
  other: 'Autres',
};

export const OPT_EMAIL_TYPE = {
  personal: 'Personnel',
  work: 'Professionnel',
  other: 'Autres',
};
