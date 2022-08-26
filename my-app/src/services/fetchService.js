
class FetchService {
  createOption(type_of_request, body) {
    if (type_of_request === "POST") {
      const options = {
        method: type_of_request,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      };
      return options;
    } else if (type_of_request === "GET") {
      return {};
    }
  }
  async fetchData(url, options) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
}

export default FetchService;