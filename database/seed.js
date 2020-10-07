const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const imagesPerProduct = {
  0: 10, 1: 4, 2: 13, 3: 7, 4: 1, 5: 12, 6: 3, 7: 12, 8: 6, 9: 5,
};

const seed = () => {
  for (let i = 1; i <= 100; i += 1) {
    const imageCount = imagesPerProduct[i % 10];
    for (let j = 1; j <= imageCount; j += 1) {
      const q = `INSERT into product_images (id, product_id, s3_url) VALUES (null, ${i}, 'https://teamstructureshopping.s3.amazonaws.com/id${i}/image_${j}.png')`;

      connection.query(q, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
  connection.end();
};

seed();
