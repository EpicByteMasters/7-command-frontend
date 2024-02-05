/**
 * y-m-d -> d.m.y
 */
const adaptDateToClient = (dateString: string) => dateString.replace(/(-)/g, '.').split('.').reverse().join('.');

/**
 * d.m.y -> y-m-d
 */
const adaptDateToServer = (dateString: string) => dateString.replace(/(\.)/g, '-').split('-').reverse().join('-');

export { adaptDateToClient, adaptDateToServer };
