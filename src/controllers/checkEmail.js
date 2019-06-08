const checkEmailController = (request, response) => {
  const { email } = request.params;

  response.send({
    flag: "ok",
    message: "checking",
    data: null
  });
};

export default checkEmailController;
