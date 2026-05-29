import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'htl-datenbank.com',
    user: 'sarzag21',
    password: '1INSY\$data',
    database: 'sarzag21_InstaClone',
    port: 28474
});

export default pool;