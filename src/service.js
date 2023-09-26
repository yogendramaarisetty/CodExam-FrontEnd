import axios, * as others from "axios";
class Judge0APIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://judge0-ce.p.rapidapi.com";
    this.headers = {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "cf4305d31bmsh82518687544739ep179fd2jsnf6d65d6ee270",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
    };
  }

  async submitCode(languageId, sourceCode) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/submissions`,
        {
          language_id: languageId,
          source_code: sourceCode
        },
        {
          headers: this.headers,
          params: {
            wait: "true"
          }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error submitting code: ${error.message}`);
    }
  }

  async getSubmissionDetails(submissionId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/submissions/${submissionId}`,
        {
          headers: this.headers
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching submission details: ${error.message}`);
    }
  }

  async getLanguages() {
    try {
      const response = await axios.get(`${this.baseUrl}/languages`, {
        headers: this.headers
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching supported languages: ${error.message}`);
    }
  }
}

module.exports = Judge0APIService;
