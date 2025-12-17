import { connection } from "../model/mysql/connection.js";

export const getAllProducts = async (req, res) => {
  try {
    const [result] = await connection.query(`SELECT 
        id, 
        title, 
        description, 
        category, 
        price, 
        discountPercentage, 
        rating, 
        stock, 
        brand, 
        warrantyInformation, 
        shippingInformation, 
        availibilityStatus, 
        image,

        JSON_ARRAYAGG(
            JSON_OBJECT(
                "id", comment_id,
                "rating", ratingComment,
                "comment", comment,
                "date", date,
                "reviewerName", reviewerName,
                "reviewerEmail", reviewerEmail
            )
        ) AS comments
        
        FROM products 
        LEFT JOIN comments ON id = product_id
        GROUP BY id
        `);

    if (result.length === 0) {
      return res.status(404).json([{ message: "Products not found" }]);
    }

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json([{ message: "product id not identify" }]);
  }
  try {
    const [response] = await connection.query(
      `SELECT id, title, description, category, price, discountPercentage, rating, stock, brand, warrantyInformation, shippingInformation, availibilityStatus, image FROM products WHERE id = ?`,
      [id]
    );

    const [comment] = await connection.query(
      `SELECT * FROM product_comment WHERE product_id = ?`,
      [id]
    );

    if (response.length === 0) {
      return res.status(400).json([{ message: "Product not found" }]);
    }

    return res.status(201).json({ product: response, comment: comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
