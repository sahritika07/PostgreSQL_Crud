import prisma from "../config/prisma.js";

/**
 * CREATE CATEGORY
 */
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // basic validation
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    // unique constraint error (PostgreSQL concept)
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Category already exists" });
    }

    

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * GET ALL CATEGORIES
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    res.json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
