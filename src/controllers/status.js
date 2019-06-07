const statusController = (request, response) => {
  response.send({
    flag: "OK",
    message: "online",
    data: null
  });
};

export default statusController;
