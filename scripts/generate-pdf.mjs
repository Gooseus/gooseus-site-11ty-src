#!/usr/bin/env node
/**
 * Generate PDF from resume HTML using Puppeteer
 * Usage: node scripts/generate-pdf.mjs [output-filename]
 *
 * Examples:
 *   node scripts/generate-pdf.mjs
 *   node scripts/generate-pdf.mjs shawn-marincas-resume.pdf
 *   npm run pdf
 *   npm run pdf -- my-resume.pdf
 */

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join, resolve, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const publicDir = join(projectRoot, 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let filePath = join(publicDir, req.url);
      // Serve index.html for directory requests
      if (filePath.endsWith('/')) filePath += 'index.html';
      if (!extname(filePath)) filePath = join(filePath, 'index.html');

      try {
        const content = await readFile(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

async function generatePDF(outputFilename = 'resume.pdf') {
  const outputPath = join(projectRoot, outputFilename);

  const server = await startServer();
  const { port } = server.address();
  const resumeUrl = `http://127.0.0.1:${port}/resume/document/`;

  console.log(`Serving public/ on port ${port}`);
  console.log(`Generating PDF from: ${resumeUrl}`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(resumeUrl, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    // 90% keeps the resume at two pages since the LeopardAI entry went in (2026-09).
    scale: 0.9,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  });

  await browser.close();
  server.close();

  console.log(`PDF generated: ${outputPath}`);
}

const outputFilename = process.argv[2] || 'resume.pdf';

generatePDF(outputFilename).catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
