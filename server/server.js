const express = require('express');
const sequelize = require('./config/db');
const dotenv = require('dotenv'); 
const userRoutes = require('./routes/userRoutes'); 
const app = express();
const cors = require('cors'); 

// Middleware
app.use(cors()); 
dotenv.config(); 

// تمكين معالجة بيانات JSON
app.use(express.json());



app.use('/api/users', userRoutes);



// مزامنة النماذج مع قاعدة البيانات
// sequelize.sync({ force: true }) // `force: true` سيؤدي إلى حذف الجداول الموجودة وإعادة إنشائها

// اختبار الاتصال بقاعدة البيانات
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));


  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
