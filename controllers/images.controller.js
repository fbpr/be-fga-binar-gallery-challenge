const { PrismaClient } = require('@prisma/client');
const responseTemplate = require('../helpers/response.helper');
const imagekit = require('../lib/imagekit');

const prisma = new PrismaClient();

const addImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const uploadImagekit = await imagekit.upload({
      fileName: req.file.originalname,
      file: req.file.buffer.toString('base64'),
    });
    
    const payload = {
      title,
      description,
      url: uploadImagekit.url,
      user_id: req.user.id
    };
    
    const { id } = await prisma.images.create({
      data: payload,
    });

    const response = responseTemplate({ id }, 'success', null, 201);
    res.status(201).json(response);
    return;
  } catch (error) {
    const response = responseTemplate(null, 'internal server error', error, 500);
    res.status(500).json(response);
    return;
  }
};

const getImages = async (req, res) => {
  try {
    const images = await prisma.images.findMany();
    const response = responseTemplate(images, 'success', null, 200);
    res.status(200).json(response);
    return;
  } catch (error) {
    const response = responseTemplate(null, 'internal server error', error, 500);
    res.status(500).json(response);
    return;
  }
};

const getImageById = async (req, res) => {
  try {
    const images = await prisma.images.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });

    const response = responseTemplate(images, 'success', null, 200);
    res.status(200).json(response);
    return;
  } catch (error) {
    const response = responseTemplate(null, 'internal server error', error, 500);
    res.status(500).json(response);
    return;
  }
};

const editImage = async (req, res) => {
  try {
    const { title, description } = req.body;

    const payload = {
      title,
      description
    };

    const images = await prisma.images.update({
      where: {
        id: Number(req.params.id),
      },
      data: payload,
    });

    const response = responseTemplate(images, 'success', null, 200);
    res.status(200).json(response);
    return;
  } catch (error) {
    const response = responseTemplate(null, 'internal server error', error, 500);
    res.status(500).json(response);
    return;
  }
};

const deleteImage = async (req, res) => {
  try {
    await prisma.images.delete({
      where: {
        id: Number(req.params.id),
      }
    });
    const response = responseTemplate({ id }, 'success', null, 201);
    res.status(201).json(response);
    return;
  } catch (error) {
    const response = responseTemplate(null, 'internal server error', error.message, 500);
    res.status(500).json(response);
    return;
  }
};

module.exports = {
  addImage,
  getImages,
  getImageById,
  editImage,
  deleteImage
};
