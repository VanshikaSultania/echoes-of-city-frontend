import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = {
  'palace1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Bangalore_Palace_-_An_Overview.jpg/800px-Bangalore_Palace_-_An_Overview.jpg',
  'palace2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Tipu_Sultan%27s_Summer_Palace%2C_Bangalore_-_Front_view.jpg/800px-Tipu_Sultan%27s_Summer_Palace%2C_Bangalore_-_Front_view.jpg',
  'civic.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Vidhana_Soudha_Bangalore_2021.jpg/800px-Vidhana_Soudha_Bangalore_2021.jpg',
  'temple.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bull_Temple%2C_Basavanagudi%2C_Bangalore%2C_India.jpg/800px-Bull_Temple%2C_Basavanagudi%2C_Bangalore%2C_India.jpg',
  'park1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/State_Central_Library.jpg/800px-State_Central_Library.jpg',
  'park2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Glass_House_at_Lalbagh.jpg/800px-Glass_House_at_Lalbagh.jpg',
  'fort1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Panchalingeshwara_Temple%2C_Begur%2C_Bangalore.jpg/800px-Panchalingeshwara_Temple%2C_Begur%2C_Bangalore.jpg',
  'lake.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ulsoor_lake_Bangalore.jpg/800px-Ulsoor_lake_Bangalore.jpg',
  'fort2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Bangalore_Fort_-_Main_Entrance.jpg/800px-Bangalore_Fort_-_Main_Entrance.jpg',
  'lake2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Agara_Lake_Bengaluru.jpg/800px-Agara_Lake_Bengaluru.jpg',
  'temple2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Halasuru_Someshwara_Temple.jpg/800px-Halasuru_Someshwara_Temple.jpg'
};

const targetDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const entries = Object.entries(images);

async function downloadSequentially() {
  for (const [filename, url] of entries) {
    const filepath = path.join(targetDir, filename);
    await new Promise((resolve) => {
      console.log(`Downloading ${filename}...`);
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        if (res.statusCode === 200) {
          const fileStream = fs.createWriteStream(filepath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            console.log(`Downloaded ${filename}`);
            setTimeout(resolve, 1000);
          });
        } else if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 308) {
           https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res2) => {
                if (res2.statusCode === 200) {
                    const fileStream = fs.createWriteStream(filepath);
                    res2.pipe(fileStream);
                    fileStream.on('finish', () => {
                        console.log(`Downloaded redirected ${filename}`);
                        setTimeout(resolve, 1000);
                    });
                } else {
                    console.log(`Failed to download redirected ${filename}: ${res2.statusCode}`);
                    resolve();
                }
           });
        } else {
          console.log(`Failed to download ${filename}: ${res.statusCode}`);
          resolve();
        }
      }).on('error', (err) => {
        console.error(`Error downloading ${filename}: ${err.message}`);
        resolve();
      });
    });
  }
}

downloadSequentially().then(() => console.log('All downloads completed.'));
