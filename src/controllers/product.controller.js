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
        user: { select: { id: true, name: true } },
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

/**
 * GET PRODUCT BY ID
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        user: { select: { id: true, name: true } },
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ data: product });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        price: price ? Number(price) : undefined,
        categoryId,
      },
    });

    res.json({
      message: "Product updated successfully",
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
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * FILTER PRODUCTS
 * GET /api/products?category=&price=
 */
export const filterProducts = async (req, res) => {
  try {
    const { category, price } = req.query;

    const filters = {};

    // filter by categoryId
    if (category) {
      filters.categoryId = Number(category);
    }

    // filter by max price
    if (price) {
      filters.price = {
        lte: Number(price), // <= price
      };
    }

    const products = await prisma.product.findMany({
      where: filters,
      include: {
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

/**
 * SEARCH PRODUCTS
 * GET /api/products/search?q=iphone
 */
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive", // case-insensitive search
            },
          },
          {
            description: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
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
