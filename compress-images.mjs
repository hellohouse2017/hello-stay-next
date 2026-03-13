import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = '/Users/tangyukao/hello-stay-next/public/images';
const QUALITY = 80;
const MAX_WIDTH = 1920;

async function processDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const info = await stat(fullPath);
        const sizeMB = (info.size / 1024 / 1024).toFixed(2);
        
        // Get image metadata
        const metadata = await sharp(fullPath).metadata();
        const needsResize = metadata.width > MAX_WIDTH;
        
        let pipeline = sharp(fullPath);
        if (needsResize) {
          pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
        }
        
        // Convert to WebP
        const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        await pipeline.webp({ quality: QUALITY }).toFile(webpPath);
        
        const newInfo = await stat(webpPath);
        const newSizeMB = (newInfo.size / 1024 / 1024).toFixed(2);
        const savings = ((1 - newInfo.size / info.size) * 100).toFixed(0);
        
        console.log(`✅ ${basename(fullPath)}: ${sizeMB}MB → ${newSizeMB}MB (${savings}% smaller)${needsResize ? ' [resized]' : ''}`);
      }
    }
  }
}

processDir(IMAGES_DIR).then(() => console.log('\n🎉 All images compressed!'));
