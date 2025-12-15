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
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

async function generatePDF(outputFilename = 'resume.pdf') {
  const resumePath = join(projectRoot, 'public', 'resume', 'index.html');
  const outputPath = join(projectRoot, outputFilename);

  console.log(`Generating PDF from: ${resumePath}`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the local HTML file
  await page.goto(`file://${resumePath}`, { waitUntil: 'networkidle0' });

  // Generate PDF - puppeteer preserves hyperlinks
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  });

  await browser.close();

  console.log(`PDF generated: ${outputPath}`);
}

// Get output filename from command line args
const outputFilename = process.argv[2] || 'resume.pdf';

generatePDF(outputFilename).catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
