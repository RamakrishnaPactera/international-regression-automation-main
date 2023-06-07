const {
  authUrl,
  clientId,
  grantType,
} = Cypress.env('endPointUrl')[Cypress.env('environment')];
const responseSuccess = 200;

const getAccessToken = () => {
  const data = {
    username: Cypress.env('username'),
    password: Cypress.env(`keycloakSuperUserPassword${Cypress.env('environment')}`),
    client_id: clientId,
    grant_type: grantType,
  };
  return cy
    .request({
      method: 'POST',
      url: authUrl,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
    })
    .then((response) => {
      const { status, body: { access_token } } = response; //eslint-disable-line
      expect(status).to.eq(responseSuccess);
      return access_token; //eslint-disable-line
    });
};

const getUploadFileResponse = ({
  token: accessToken,
  apiURL: reqUrl,
}) => {
  return cy.then(() => {
    try {
      //get the request response
      cy.request({
        url: reqUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        //validating the response
        .then((response) => {
          return response;
        });
    } catch (err) {
      return err;
    };
  });
};

export {
  getAccessToken,
  getUploadFileResponse,
};