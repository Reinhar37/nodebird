const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');

exports.join = async (nick, email, password) => {

  const exUser = await User.findOne({ where: { email } });
  if(exUser){
    return 'error';
  }
  const hash = await bcrypt.hash(password, 12);
  await User.create({
    email,
    nick,
    password: hash,
  });
  return 'success';

}

