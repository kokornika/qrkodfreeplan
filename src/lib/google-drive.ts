import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { join } from 'path';
import { VCardFormData } from '../types/vcard';
import { generateHTML } from './website/html-generator';

export class GoogleDriveUploader {
  private static SCOPES = ['https://www.googleapis.com/auth/drive.file'];
  private static CREDENTIALS_PATH = join(process.cwd(), 'credentials.json');
  private static FOLDER_ID = 'YOUR_FOLDER_ID'; // A megadott Google Drive mappa ID-ja

  private async authorize() {
    return authenticate({
      keyfilePath: GoogleDriveUploader.CREDENTIALS_PATH,
      scopes: GoogleDriveUploader.SCOPES,
    });
  }

  async uploadWebsite(data: VCardFormData): Promise<string> {
    try {
      const auth = await this.authorize();
      const drive = google.drive({ version: 'v3', auth });

      // HTML tartalom generálása
      const htmlContent = generateHTML(data);
      const fileName = `${data.name.replace(/\s+/g, '_')}_website.html`;

      // Fájl feltöltése a Drive-ra
      const response = await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: 'text/html',
          parents: [GoogleDriveUploader.FOLDER_ID]
        },
        media: {
          mimeType: 'text/html',
          body: htmlContent
        },
        fields: 'id, webViewLink'
      });

      return response.data.webViewLink || '';
    } catch (error) {
      console.error('Error uploading to Google Drive:', error);
      throw new Error('Failed to upload website to Google Drive');
    }
  }
}