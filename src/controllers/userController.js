import pool from "../config/db.js";

// CREATE
export const createUser = async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





// READ
export const getUsers = async (req, res) => {
  const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
  res.json({ success: true, data: result.rows });
};




// UPDATE

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const result = await pool.query(
    "UPDATE users SET name=$1, age=$2 WHERE id=$3 RETURNING *",
    [name, age, id]
  );

  res.json({ success: true, data: result.rows[0] });
};




// DELETE
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  res.json({ success: true, message: "User deleted" });
};


