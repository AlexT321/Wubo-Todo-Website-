import FetchService from "./fetchService";
const API = "http://localhost:5000";

class CardService extends FetchService {
  async create_card(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/card/Health-Website/create_card",
      options
    );
    return response;
  }
  async remove_card_from_list(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/card/Health-Website/remove_card_from_list",
      options
    );
    return response;
  }

  async add_card_to_list_at_position(body) {
    const options = this.createOption("POST", body);
    const response = await this.fetchData(
      API + "/card/Health-Website/add_card_to_list_at_position",
      options
    );
    return response;
  }
}

export default new CardService();
