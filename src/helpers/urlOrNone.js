const urlOrNone = ({ url }) => (url ? `url('${url}')` : 'none');

export default urlOrNone;
