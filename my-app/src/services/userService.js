import FetchService from "./fetchService";

const API = "http://localhost:5000";

class UserService extends FetchService {
  async loadUserData(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(API + "/Health-Website/get_user", options);
    return response;
  }

  async create_user(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(API + "/Health-Website/create_user", options);
    return response;

  }
}

export default new UserService();
