// GitHub Data Service - Uses GitHub as a Database

class GitHubDataService {
  constructor() {
    // GitHub repository details
    this.owner = 'drazzam'; // Your GitHub username
    this.repo = 'evidance-website';
    this.path = 'public/data/website-content.json'; // Where to store data
    this.branch = 'main'; // or 'master' if that's your default branch
    
    // Token will be set from admin panel, NOT hardcoded
    this.token = '';
  }

  // Set the GitHub token (called from admin panel)
  setToken(token) {
    this.token = token;
    localStorage.setItem('github_token', token);
    return this;
  }

  // Get token from localStorage
  getStoredToken() {
    return localStorage.getItem('github_token') || '';
  }

  // Initialize token from storage
  init() {
    const storedToken = this.getStoredToken();
    if (storedToken) {
      this.token = storedToken;
    }
    return this;
  }

  // Load data from GitHub repository
  async loadData() {
    try {
      // First try to load from GitHub
      const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(this.token && { 'Authorization': `token ${this.token}` })
        }
      });

      if (response.ok) {
        const file = await response.json();
        // Decode base64 content
        const content = atob(file.content);
        const data = JSON.parse(content);
        
        // Store SHA for updates
        this.currentSha = file.sha;
        
        // Cache locally
        localStorage.setItem('evidance_data', JSON.stringify(data));
        localStorage.setItem('evidance_data_sha', file.sha);
        
        return data;
      } else if (response.status === 404) {
        // File doesn't exist yet, return default data
        return this.getDefaultData();
      } else {
        // Fall back to localStorage
        const cached = localStorage.getItem('evidance_data');
        return cached ? JSON.parse(cached) : this.getDefaultData();
      }
    } catch (error) {
      console.error('Error loading from GitHub:', error);
      // Fall back to localStorage
      const cached = localStorage.getItem('evidance_data');
      return cached ? JSON.parse(cached) : this.getDefaultData();
    }
  }

  // Save data to GitHub repository
  async saveData(data) {
    try {
      if (!this.token) {
        throw new Error('GitHub token not set. Please configure your token in settings.');
      }

      // Add timestamp
      data.lastUpdated = new Date().toISOString();
      
      // Encode data as base64
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
      
      // Get current file SHA (needed for updates)
      let sha = this.currentSha || localStorage.getItem('evidance_data_sha');
      
      // If no SHA, try to get it from GitHub
      if (!sha) {
        const getUrl = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}`;
        const getResponse = await fetch(getUrl, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${this.token}`
          }
        });
        
        if (getResponse.ok) {
          const file = await getResponse.json();
          sha = file.sha;
        }
      }

      // Prepare the commit
      const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}`;
      
      const body = {
        message: `Update website content - ${new Date().toLocaleString()}`,
        content: content,
        branch: this.branch
      };
      
      // Include SHA if updating existing file
      if (sha) {
        body.sha = sha;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Update SHA for next save
        this.currentSha = result.content.sha;
        localStorage.setItem('evidance_data_sha', result.content.sha);
        
        // Update local cache
        localStorage.setItem('evidance_data', JSON.stringify(data));
        
        return {
          success: true,
          message: 'Changes saved to GitHub successfully! Changes will be live in 1-2 minutes.',
          sha: result.content.sha
        };
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save to GitHub');
      }
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      
      // Save locally as fallback
      localStorage.setItem('evidance_data', JSON.stringify(data));
      
      return {
        success: false,
        message: error.message || 'Failed to save to GitHub. Changes saved locally.',
        error: error
      };
    }
  }

  // Get default data structure
  getDefaultData() {
    return {
      whoWeAre: {
        storyTitle: 'Our Story',
        storyContent: '',
        teamTitle: 'Our Team',
        teamContent: '',
        valuesTitle: 'Our Values',
        valuesContent: ''
      },
      aimsGoals: {
        objectivesTitle: 'Primary Objectives',
        objectivesContent: '',
        goalsTitle: 'Strategic Goals',
        goalsContent: '',
        visionTitle: 'Future Vision',
        visionContent: ''
      },
      successRecord: {
        achievementsTitle: 'Key Achievements',
        achievementsContent: '',
        publicationsTitle: 'Research Publications',
        publicationsContent: '',
        storiesTitle: 'Success Stories',
        storiesContent: ''
      },
      visionaryModel: {
        approachTitle: 'Modified CRO Approach',
        approachContent: '',
        frameworkTitle: 'Innovation Framework',
        frameworkContent: '',
        platformTitle: 'Digital Platform',
        platformContent: ''
      },
      joinUs: {
        title: 'Join Our Research Community',
        content: '',
        contactInfo: ''
      },
      heroContent: {
        title1: 'Advancing Healthcare Through',
        title2: 'Innovative Research',
        subtitle: "Join Evidance, Saudi Arabia's pioneering modified clinical research organization",
        stat1Number: '50+',
        stat1Text: 'Research Projects',
        stat2Number: '250+',
        stat2Text: 'Trained Researchers',
        stat3Number: '25+',
        stat3Text: 'Published Papers',
        stat4Number: '15+',
        stat4Text: 'Accepted Papers'
      },
      homeSections: {
        publicationsTitle: 'Recent Publications',
        publicationsText: 'Explore our latest research publications.',
        aimsTitle: 'What Are Our Aims and Goals?',
        aimsText: 'We are committed to advancing clinical research.',
        researchTitle: 'Research Impact & Innovation',
        researchText: 'Our research has contributed to significant advancements.',
        visionaryTitle: 'Our Visionary Model',
        visionaryText: 'Our unique modified CRO model combines excellence with innovation.',
        joinUsTitle: 'Join Us!',
        joinUsText: 'Become part of Saudi Arabia\'s leading clinical research community.'
      },
      publications: [
        { id: 1, image: '', title: 'Research Publication 1', description: 'Description 1' },
        { id: 2, image: '', title: 'Research Publication 2', description: 'Description 2' },
        { id: 3, image: '', title: 'Research Publication 3', description: 'Description 3' },
        { id: 4, image: '', title: 'Research Publication 4', description: 'Description 4' },
        { id: 5, image: '', title: 'Research Publication 5', description: 'Description 5' },
        { id: 6, image: '', title: 'Research Publication 6', description: 'Description 6' }
      ],
      contactInfo: {
        email: 'info@evidance.com',
        phone: '+966 54 945 0781',
        address: 'Riyadh, Kingdom of Saudi Arabia'
      },
      lastUpdated: new Date().toISOString()
    };
  }

  // Check if token is valid
  async validateToken(token) {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${token}`
        }
      });
      
      if (response.ok) {
        const user = await response.json();
        return {
          valid: true,
          username: user.login
        };
      } else {
        return {
          valid: false,
          error: 'Invalid token'
        };
      }
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
export default new GitHubDataService();
