import JSONBIN_CONFIG from '../config/jsonbin';

class DataService {
  async saveData(data) {
    try {
      const response = await fetch(`${JSONBIN_CONFIG.BASE_URL}/b/${JSONBIN_CONFIG.BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY,
          'X-Bin-Versioning': 'false'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to save: ${error}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Save error:', error);
      throw error;
    }
  }

  async loadData() {
    try {
      const response = await fetch(`${JSONBIN_CONFIG.BASE_URL}/b/${JSONBIN_CONFIG.BIN_ID}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': JSONBIN_CONFIG.MASTER_KEY
        }
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to load: ${error}`);
      }
      const result = await response.json();
      return result.record;
    } catch (error) {
      console.error('Load error:', error);
      // Return default structure if loading fails
      return {
        whoWeAre: {
          storyTitle: 'Our Story',
          storyContent: '',
          teamTitle: 'Our Team',
          teamContent: '',
          valuesTitle: 'Our Values',
          valuesContent: ''
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
        }
      };
    }
  }
}

export default new DataService();
