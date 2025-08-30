class GitHubDataService {
  constructor() {
    this.token = null;
    this.owner = 'drazzam';  // Your GitHub username
    this.repo = 'evidance-website';  // Your repository name
    this.path = 'public/data/website-content.json';  // Path to your data file
  }

  setToken(token) {
    this.token = token;
  }

  async saveContent(content) {
    if (!this.token) {
      throw new Error('GitHub token not set');
    }

    try {
      // First, get the current file to get its SHA (required for updates)
      const currentFileResponse = await fetch(
        `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}`,
        {
          headers: {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      let sha = null;
      if (currentFileResponse.ok) {
        const currentFile = await currentFileResponse.json();
        sha = currentFile.sha;
      } else if (currentFileResponse.status !== 404) {
        throw new Error(`Failed to get current file: ${currentFileResponse.status}`);
      }

      // Prepare the content
      const jsonContent = JSON.stringify(content, null, 2);
      const encodedContent = btoa(unescape(encodeURIComponent(jsonContent)));

      // Prepare the update payload
      const updatePayload = {
        message: `Update website content - ${new Date().toISOString()}`,
        content: encodedContent,
        branch: 'main'  // or 'master' if that's your default branch
      };

      // Add SHA if file exists (for updates)
      if (sha) {
        updatePayload.sha = sha;
      }

      // Make the API call to update the file
      const updateResponse = await fetch(
        `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatePayload)
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(`GitHub API error: ${updateResponse.status} - ${errorData.message}`);
      }

      const result = await updateResponse.json();
      console.log('Content saved successfully:', result);
      
      return true;
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    }
  }

  async loadContent() {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}`,
        {
          headers: this.token ? {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
          } : {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.status}`);
      }

      const fileData = await response.json();
      const content = JSON.parse(atob(fileData.content));
      
      return content;
    } catch (error) {
      console.error('Error loading content:', error);
      throw error;
    }
  }
}

const githubDataService = new GitHubDataService();
export default githubDataService;
