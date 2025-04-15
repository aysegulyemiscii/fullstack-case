const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize, User, Product } = require('./models');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

sequelize.sync({ force: true }).then(async () => {
 
  const hashedPass = await bcrypt.hash('rootpass', 10);
  await User.create({ username: 'root', password: hashedPass });

  for (let i = 1; i <= 5; i++) {
    await Product.create({ name: `Ürün ${i}`, description: `Açıklama ${i}`, price: i * 10 });
  }
});

app.listen(3001, () => {
  console.log('API running on http://localhost:3001');
});
