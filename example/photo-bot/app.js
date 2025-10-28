const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const e = require('express');

const app = express();
app.use(express.json());

// 選擇本地圖片
function genPhoto(option) {
  let filePath;
  if (option === 1) {
    filePath = path.join(__dirname, 'cat.jpg');
  } else if (option === 2) {
    filePath = path.join(__dirname, 'dog.jpg');
  } else {
    throw new Error('Invalid option. 1: cat.jpg, 2: dog.jpg');
  }
  return fs.readFileSync(filePath);
}

function genPrompt(option) {
    if (option == 1) {
        return 'A cute black cat wearing a yellow striped apron sits calmly, its big round eyes looking curiously around, the camera gently moves left and right to follow the cat’s adorable reactions, natural lighting, cozy home background, animation style.';
    } else {
        return 'a yellow Labrador Retriever.It is lying on a paved road or pathway, looking directly at the camera with its tongue slightly out, appearing calm and friendly. The background is slightly blurred with greenery and trees, animation style.';
    }
}

// 資料傳輸 API
// 隨機產生 phone
function randomPhone() {
  return '09' + Math.floor(100000000 + Math.random() * 900000000).toString();
}

// 隨機產生 name
function randomName() {
  const chineseFirstNames = [
    '王', '李', '張', '林', '陳', '黃', '吳', '劉', '楊', '趙',
    '周', '徐', '孫', '馬', '胡', '郭', '何', '高', '羅', '鄭',
    '謝', '宋', '沈', '許', '鄧', '馮', '曾', '彭', '曹', '薛'
  ];
  const chineseLastNames = [
    '偉', '芳', '志', '俊', '婷', '嘉', '傑', '雅', '翔', '安',
    '豪', '君', '宇', '欣', '彥', '瑋', '怡', '家', '明', '文',
    '萱', '瑄', '榮', '瑞', '誠', '群', '彬', '茹', '蓉', '瑩',
    '潔', '雯', '彤', '霖', '琦', '芸', '妍', '辰', '晨', '昕',
    '涵', '昊', '昱', '宸', '宥', '柏', '均', '倫', '廷', '哲',
    '祺', '祐', '冠', '維', '榆', '瑜', '珊', '珮', '珈', '珏',
    '珂', '珉', '珀', '珪', '珩', '琬', '琛', '琪', '琨', '琰',
    '琮', '燈', '登', '東', '穎', '芷', '榕', '瑋', '宗', '逸',
    '億', '義', '佳', '綺', '懿', '璟', '瑾', '孟', '景', '晨'
  ];
  const englishFirstNames = [
    'John', 'Mary', 'David', 'Linda', 'James', 'Susan', 'Michael', 'Jessica', 'Robert', 'Emily',
    'William', 'Elizabeth', 'Richard', 'Barbara', 'Charles', 'Jennifer', 'Joseph', 'Patricia', 'Thomas', 'Sarah',
    'Christopher', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa', 'Anthony', 'Betty', 'Mark', 'Helen',
    'Paul', 'Sandra', 'Steven', 'Donna', 'Andrew', 'Carol', 'Joshua', 'Ruth', 'Kevin', 'Sharon'
  ];
  const englishLastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Martinez', 'Lee',
    'Taylor', 'Clark', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott', 'Green',
    'Adams', 'Baker', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell',
    'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook'
  ];
  if (Math.random() < 0.85) {
    // 中文名
    const first = chineseFirstNames[Math.floor(Math.random() * chineseFirstNames.length)];
    const lastCount = Math.random() < 0.1 ? 1 : 2;
    let last = '';
    for (let i = 0; i < lastCount; i++) {
      last += chineseLastNames[Math.floor(Math.random() * chineseLastNames.length)];
    }
    return first + last;
  } else {
    // 英文名
    const first = englishFirstNames[Math.floor(Math.random() * englishFirstNames.length)];
    const last = englishLastNames[Math.floor(Math.random() * englishLastNames.length)];
    const name = Math.random() < 0.5 ? first : last;
    return name;
  }
}

// 隨機產生 email
function randomEmail() {
  const nameParts = [
    'roger', 'tiffany', 'tommy', 'jessica', 'kevin', 'amy', 'david', 'linda', 'jason', 'sandy',
    'lucy', 'eric', 'sophia', 'leo', 'vivian', 'andy', 'cindy', 'brian', 'nina', 'sam',
    'john', 'mary', 'alex', 'jane', 'mike', 'emma', 'chris', 'lisa', 'steven', 'betty'
  ];
  const suffixParts = [
    '', 'isgood', 'isgoood', 'love', 'best', 'cool', 'happy', 'iam', 'theone', '123',
    '001', '007', '168', '520', '888', '0433', '2000', 'x', 'z', 'go', 'apple', 'bar', 'sexy', 'may', 'gov', 'cos'
  ];
  const name = nameParts[Math.floor(Math.random() * nameParts.length)];
  const suffix = suffixParts[Math.floor(Math.random() * suffixParts.length)];
  const number = Math.random() < 0.5 ? '' : Math.floor(Math.random() * 10000).toString();
  const domains = ['gmail.com', 'hotmail.com', 'hotmail.com.tw', 'yahoo.com.tw'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${suffix ? suffix : ''}${name}${number}@${domain}`;
}

// 隨機產生 cars
function randomCars() {
  const carTypes = ["TOWN ACE","RAV4","COROLLA CROSS","YARIS CROSS","bZ4X","ALTIS","CAMRY","COROLLA SPORT","HILUX","SIENNA","CROWN","PRIUS","ALPHARD","VIOS","GR 86","GR YARIS","GR SUPRA"];
  const count = Math.floor(Math.random() * 3) + 0;
  const cars = [];
  const shuffled = carTypes.sort(() => 0.5 - Math.random());
  for (let i = 0; i < count; i++) {
    cars.push(shuffled[i]);
  }
  return cars;
}

// log function，將文字寫入本地 log 檔並累積
function writeLog(message) {
  const logPath = path.join(__dirname, '20250825.log');
  const timestamp = new Date();
  fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`, 'utf8');
}

// Hello API
app.get('/api/hello', (req, res) => {
  console.log('hello api called');
  aaa();
  res.send('hello');
});

// TODO: 測試 API
app.get('/api/test', async (req, res) => {
    var count = 0;
    var timer = setInterval(()=> {
        count++;
        var date = new Date();
          console.log(`[${count}] ${date}`);
          axios.get('http://localhost:3000/api/transfer');
        setTimeout(()=> {
          axios.get('http://localhost:3000/api/gen-text');
        }, 1000);
        setTimeout(()=> {
          axios.get('http://localhost:3000/api/upload-photo');
        }, 5000);
    }, 19450);
    res.send('START');
});

app.get('/api/transfer', async (req, res) => {
  try {
    const data = {
      phone: randomPhone(),
      name: randomName(),
      email: randomEmail(),
      cars: randomCars(),
      ...req.body
    };
    data.email = Math.random() < 0.35 ? data.email : '';
    console.log(JSON.stringify(data));
    // 第三方 API URL
    const thirdPartyUrl = 'https://toyota-petai.api.webarfilter.com/uploadUserData';
    const response = await axios.post(thirdPartyUrl, data);
    res.json(response.data);
    console.log(response.data);
    writeLog(JSON.stringify(data) + JSON.stringify(response.data));
  } catch (err) {
    res.status(500).json({ error: err.message });
    writeLog(err.message);
  }
});

// 圖生文 API
app.get('/api/gen-text', async (req, res) => {
  try {
    const thirdPartyUrl = 'https://toyota-petai.api.webarfilter.com/pictureToText';
    const option = Math.random() < 0.5 ? 1 : 2;
    const _photo = genPhoto(option);
    const FormData = require('form-data');
    const form = new FormData();
    form.append('photo', _photo, { filename: option === 1 ? 'cat.jpg' : 'dog.jpg', contentType: 'image/jpeg' });
    axios.post(thirdPartyUrl, form, {
    }).then(response => {
        console.log(response.data);
        writeLog(JSON.stringify(response.data));
    }).catch(err => {
        console.error('gen-text Error occurred:', err.message);
        writeLog('gen-text Error:' + JSON.stringify(err.message));
    });
    res.send('/api/gen-text called');
  } catch (err) {
  }
});

// 照片上傳 API
app.get('/api/upload-photo', async (req, res) => {
  try {
    // 隨機選擇 1 或 2
    const option = Math.random() < 0.5 ? 1 : 2;
    const _photo = genPhoto(option);
    const _prompt = genPrompt(option);
    const thirdPartyUrl = 'https://toyota-petai.api.webarfilter.com/pictureToVideo';
    // 使用 multipart/form-data 傳送檔案與 prompt
    const FormData = require('form-data');
    const form = new FormData();
    form.append('photo', _photo, { filename: option === 1 ? 'cat.jpg' : 'dog.jpg', contentType: 'image/jpeg' });
    form.append('prompt', _prompt);
    console.log(_prompt);
    writeLog(_prompt);
    axios.post(thirdPartyUrl, form, {
      headers: form.getHeaders(),
    }).then(response => {
      console.log('/api/upload-photo done');
    }).catch(err => {
        console.error('upload-photo Error occurred:', err.message);
        writeLog('upload-photo Error:' + JSON.stringify(err.message));
    });
    res.send('/api/upload-photo called');
  } catch (err) {
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
