import { VCardFormData } from '../types/vcard';
import { generateHTML } from './website/html-generator';

export class GitHubRepository {
  private token: string;
  private owner: string;

  constructor() {
    // Get environment variables directly
    this.token = import.meta.env.VITE_GITHUB_TOKEN || '';
    this.owner = import.meta.env.VITE_GITHUB_OWNER || '';

    // Log environment status (for debugging)
    if (!this.token || !this.owner) {
      console.warn('GitHub configuration incomplete:', {
        hasToken: !!this.token,
        hasOwner: !!this.owner
      });
    }
  }

  private validateCredentials() {
    if (!this.token || !this.owner) {
      throw new Error('GitHub credentials are not configured');
    }
  }

  private base64Encode(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
  }

  async createRepository(
    data: VCardFormData,
    orderId?: string
  ): Promise<{ repoUrl: string; deployUrl: string }> {
    try {
      // Validate credentials before making any API calls
      this.validateCredentials();

      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 7);
      const repoName = `card-${timestamp}-${randomStr}`;

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
          private: false,
          auto_init: true,
          description: `QRNevjegy - Digitális névjegykártya: ${data.name}`
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
`.trim());

      const deployUrl = `https://${repoName}.netlify.app`;
      
      return {
        repoUrl: repo.html_url,
        deployUrl
      };
    } catch (error) {
      console.error('Error creating GitHub repository:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while creating the repository');
    }
  }

  private async createFile(repoName: string, path: string, content: string): Promise<void> {
    try {
      this.validateCredentials();

      // Get repository information
      const repoResponse = await fetch(
        `https://api.github.com/repos/${this.owner}/${repoName}`,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!repoResponse.ok) {
        const error = await repoResponse.json();
        throw new Error(`Failed to get repository information: ${error.message}`);
      }

      const repoInfo = await repoResponse.json();
      const defaultBranch = repoInfo.default_branch;

      // Create file
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
            branch: defaultBranch
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