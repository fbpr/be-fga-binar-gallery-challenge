const { PrismaClient } = require('@prisma/client');
const responseTemplate = require('../helpers/response.helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('./users.controller');

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    await userController.createUser(req, res);
    return;
  } catch (error) {
    const response = responseTemplate(null, 'internal server error', error.message, 500);
    res.status(500).json(response);
    return;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      const response = responseTemplate(null, 'Invalid email', null, 400);
      res.status(400).json(response);
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      const response = responseTemplate(null, 'Invalid password', null, 400);
      res.status(400).json(response);
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    const response = responseTemplate(
      {
        user: {
          username: user.username,
          email: user.email,
        },
        token,
      },
      'success',
      null,
      200
    );
    res.status(200).json(response);
    return;
  } catch (error) {
    const response = responseTemplate(null, 'internal server error', error.message, 500);
    res.status(500).json(response);
    return;
  }
};

module.exports = {
  register,
  login,
};
