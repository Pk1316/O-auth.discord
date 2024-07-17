import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = (password) => {
    if (typeof password !== 'string') {
        throw new Error('Password must be a string');
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(salt);
    return bcrypt.hashSync(password, salt);
};

export default hashPassword;
