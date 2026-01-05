import { connection } from "../model/mysql/connection.js";

export const getAllProductsInCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [result] = await connection.query(
      `SELECT product_id, quantity, 
        p.title, 
        p.description, 
        p.category, 
        p.price, 
        p.discountPercentage, 
        p.rating, 
        p.stock, 
        p.brand, 
        p.warrantyInformation, 
        p.shippingInformation, 
        p.availibilityStatus, 
        p.image FROM cart_items 
        JOIN products p ON product_id = p.id
        WHERE user_id = UUID_TO_BIN(?)`,
      [userId]
    );

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProductById = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.userId;
  console.log(id);

  try {
    const result = await connection.query(
      `
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES (UUID_TO_BIN(?), ?, 1)
        ON DUPLICATE KEY UPDATE
        quantity = quantity + 1
        `,
      [userId, id]
    );
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incrementQuantity = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.body;
  console.log(id);
  try {
    const [result] = await connection.query(
      `UPDATE cart_items
            SET quantity = quantity + 1
            WHERE user_id = UUID_TO_BIN(?)
            AND product_id = ?
            `,
      [userId, id]
    );

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const decrementQuantity = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.body;
  try {
    const [result] = await connection.query(
      `
            UPDATE cart_items
            SET quantity = quantity - 1
            WHERE user_id = UUID_TO_BIN(?)
            AND product_id = ?
            `,
      [userId, id]
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFromCartById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const [result] = await connection.query(
      `
        DELETE FROM cart_items
        WHERE user_id = UUID_TO_BIN(?) 
        AND product_id = ?
    `,
      [userId, id]
    );

    res.status(200).json([{ message: "Product deleted from cart" }]);

    console.log(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
