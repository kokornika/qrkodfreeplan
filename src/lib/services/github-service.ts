import { VCardFormData } from '../../types/vcard';
import { generateHTML } from '../website/html-generator';

export class GitHubRepository {
  private token: string;
  private owner: string;

  constructor() {
    this.token = import.meta.env.VITE_GITHUB_TOKEN || '';
    this.owner = import.meta.env.VITE_GITHUB_OWNER || '';
  }

  private validateConfig() {
    if (!this.token || !this.owner) {
      throw new Error('GitHub configuration is missing');
    }
  }

  private base64Encode(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
  }

  async createRepository(
    data: VCardFormData,
    orderId: string
  ): Promise<{ repoUrl: string; deployUrl: string }> {
    try {
      this.validateConfig();

      const repoName = `card-${orderId}`;
      console.log('Creating repository with name:', repoName);

      // Create repository
      const createRepoResponse = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repoName,
          private: true,
          auto_init: true,
          description: `Digital Business Card for ${data.name}`
        })
      });

      if (!createRepoResponse.ok) {
        const errorData = await createRepoResponse.json();
        console.error('GitHub API Error:', {
          status: createRepoResponse.status,
          statusText: createRepoResponse.statusText,
          error: errorData
        });
        throw new Error(`Failed to create repository: ${JSON.stringify(errorData)}`);
      }

      const repo = await createRepoResponse.json();

      // Wait for repository initialization
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate website content
      const htmlContent = await generateHTML(data);

      // Create necessary files
      await this.createFile(repoName, 'index.html', htmlContent);
      await this.createFile(repoName, 'netlify.toml', `
[build]
  publish = "/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
`.trim());

      return {
        repoUrl: repo.html_url,
        deployUrl: `https://${repoName}.netlify.app`
      };
    } catch (error) {
      console.error('Error creating GitHub repository:', error);
      throw new Error(
        error instanceof Error 
          ? `Failed to create repository: ${error.message}`
          : 'An unexpected error occurred while creating the repository'
      );
    }
  }

  private async createFile(repoName: string, path: string, content: string): Promise<void> {
    try {
      this.validateConfig();

      const response = await fetch(
        `https://api.github.com/repos/${this.owner}/${repoName}/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Add ${path}`,
            content: this.base64Encode(content),
            branch: 'main'
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to create ${path}: ${error.message}`);
      }
    } catch (error) {
      console.error(`Error creating ${path}:`, error);
      throw error;
    }
  }
}