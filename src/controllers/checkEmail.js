const checkEmailController = (request, response) => {
  console.log(request);
  response.send({
    flag: "ok",
    message: "checking",
    data: null
  });
};

export default checkEmailController;
