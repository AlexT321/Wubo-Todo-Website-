import FetchService from "./fetchService";
const API = "http://localhost:5000";
class BoardService extends FetchService {
  async create_board(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/Health-Website/create_board",
      options
    );
    return response;
  }

  async update_all_choosen_state(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/Health-Website/update_all_choosen_state",
      options
    );
    return response;
  }

  async update_choosen_state(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/Health-Website/update_choosen_state",
      options
    );
    return response;
  }

  async remove_board(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/Health-Website/remove_board",
      options
    );
    return response;
  }

  async update_board_name(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/Health-Website/update_board_name",
      options
    );
    return response;
  }

  async update_favorite_state(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/Health-Website/update_favorite_state",
      options
    );
    return response;
  }
}

export default new BoardService();
