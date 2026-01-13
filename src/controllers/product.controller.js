import prisma from "../config/prisma.js";

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, userId, categoryId } = req.body;

    if (!title || !price || !userId || !categoryId) {
      return res.status(400).json({
        message: "title, price, userId and categoryId are required",
      });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        userId,
        categoryId,
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * GET ALL PRODUCTS (with relations)
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: {
          select: { id: true, name: true },
        },
        category: true,
      },
    });

    res.json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
