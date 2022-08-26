import FetchService from "./fetchService";
const API = "http://localhost:5000";

class ListService extends FetchService {
  async create_board_list(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/Health-Website/create_board_list",
      options
    );
    return response;
  }

  async remove_list_from_board(body) {
    const options = this.createOption("DELETE", body);
    const response = await this.fetchData(
      API + "/Health-Website/remove_list_from_board",
      options
    );
    return response;
  }

  async add_list_to_board_at_position(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/Health-Website/add_list_to_board_at_position",
      options
      );
      return response;
  }
  
}

export default new ListService();
