const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  'palace1.jpg': 'https://images.pexels.com/photos/23973679/pexels-photo-23973679.jpeg',
  'palace2.jpg': 'https://media.istockphoto.com/id/178845414/photo/tipu-sultans-summer-palace.jpg?s=612x612&w=0&k=20&c=QCVIS7GrgLfh8MaBmdjrQFNeQ71BgP-K322BJVkGTmo=',
  'civic.jpg': 'https://t4.ftcdn.net/jpg/07/52/84/27/240_F_752842748_TMfPQUmG4kffW5uaZTdjj9yVLYDeRSm2.jpg',
  'temple.jpg': 'https://temple.yatradham.org/public/Product/temple/temple_hzOxj2OQ_202408171754050.jpeg',
  'park1.jpg': 'https://karnatakatourism.org/_next/image/?url=https%3A%2F%2Fweb-cms.karnatakatourism.org%2Fwp-content%2Fuploads%2F2025%2F06%2FIMG_3526-1-scaled-e1750679261602.jpg&w=3840&q=75',
  'park2.jpg': 'https://media.gettyimages.com/id/516572685/photo/glasshouse-at-lalbagh-gardens-bangalore-india.jpg?s=612x612&w=gi&k=20&c=0x2ImAR3de8zrMZq4Hs4oYYJqfeyMqge2Prk1LZIjp8=',
  'fort1.jpg': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHkkjBQXcXJUuK4r92v0uYkPp2_5HGes71iA&s',
  'lake.jpg': 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTFkT2n5JNpJFxkakGFgCYm1ryki7gvA21Fgpcukzb35xM0z6u4o77aBqNDDSItHJz-gLr0LGWdtrVVf1XScMdfXI8&s=19',
  'fort2.jpg': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa8CLgYGoKyHqFl5p-j1n7h_GX5kBTsum8iA&s',
  'lake2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Agara_Lake_%2825279546271%29.jpg',
  'temple2.jpg': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/2e/24/45/the-temple.jpg?w=900&h=-1&s=1'
};

const targetDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

Object.entries(images).forEach(([filename, url]) => {
  const filepath = path.join(targetDir, filename);
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' } }, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log(`Downloaded ${filename}`);
      });
    } else if (res.statusCode === 301 || res.statusCode === 302) {
      https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
        const fileStream = fs.createWriteStream(filepath);
        res2.pipe(fileStream);
        fileStream.on('finish', () => {
          console.log(`Downloaded redirected ${filename}`);
        });
      });
    } else {
      console.log(`Failed to download ${filename}: ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
});
