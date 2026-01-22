import { connection } from "../config/mysql/mysqlConnection.js";

export class ProductModel {
  static async getProducts() {
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

    return result;
  }

  static async getProductById(id) {
    const [response] = await connection.query(
      `SELECT 
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
        WHERE id = ?
        GROUP BY id
        `,
      [id],
    );
    return response;
  }

  static async filterProducts(category, title) {
    let query = "SELECT * FROM products WHERE 1 = 1";
    const values = [];

    if (category) {
      query += "AND category LIKE CONCAT('%', '?', '%')";
      values.push(category);
    }
    if (title) {
      query += "AND title LIKE CONCAT('%', '?', '%')";
      values.push(title);
    }

    const [response] = await connection.query(query, values);
    return response;
  }
}
