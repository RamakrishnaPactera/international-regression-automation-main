/*eslint-disable cypress/no-unnecessary-waiting */
import flatFileModelPopupPage from '../../pageObjects/flatFileModelPopupPage/flatFileModelPopupPage.json';
import flatFileModelPopupData from '../../testData/flatFileModelPopupData/flatFileModelPopupData.json';
import {
  attachFile,
  clickAction,
  verifyElementText,
  verifyValue,
  uploadFile,
} from '../../utilities/commonUtils/genericUtils';
const {
  dataSourceContinueBtn,
  fileUploadAcknowledgeMsg,
  fileUploadAcknowledgeOkBtn,
  finalConfirmYesBtn,
  matchYesBtn,
  primaryBtn,
  uploadBtnInput,
  unResolvedPopup,
  unResolvedPopupContinueBtn,
} = flatFileModelPopupPage;
const {
  continueTxt,
  fileUploadSuccessMsg,
  reviewTxt,
} = flatFileModelPopupData.expectedData;

const getFlatFileIframeBody = ({ locator: iFrameLocator }) => {
  return (
    cy
      .get(iFrameLocator)
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
  );
};

const uploadFileIntoFlatFileModelPopup = ({ locator: iFrameLocator, fileName: fileToUpload }) => {
  getFlatFileIframeBody({ locator: iFrameLocator }).within(($body) => {
    attachFile({ locator: uploadBtnInput, filePath: fileToUpload });
    cy.wait(10000);
    clickAction({ locator: dataSourceContinueBtn });
    cy.wait(3000).then(() => {
      if ($body.find(matchYesBtn).length > 0) {
        cy.get(matchYesBtn).click();
        verifyElementText({ locator: primaryBtn, verifyText: reviewTxt });
        clickAction({ locator: primaryBtn });
        verifyElementText({ locator: primaryBtn, verifyText: continueTxt });
        clickAction({ locator: primaryBtn });
        cy.get(unResolvedPopup).then(ele => {
          cy.log(ele.find(unResolvedPopupContinueBtn).length);
          if (ele.find(unResolvedPopupContinueBtn).length > 0) {
            clickAction({ locator: unResolvedPopupContinueBtn });
          } else {
            clickAction({ locator: finalConfirmYesBtn });
          }
        });
        verifyValue({ locator: fileUploadAcknowledgeMsg, value: fileUploadSuccessMsg });
        cy.get(fileUploadAcknowledgeMsg).invoke('text').then(val => {
          const docID = (val.split(':')[1]).trim();
          Cypress.env('docID', docID);
        });
        clickAction({ locator: fileUploadAcknowledgeOkBtn });
      } else {
        clickAction({ locator: primaryBtn });
        clickAction({ locator: primaryBtn });
        clickAction({ locator: finalConfirmYesBtn });
        clickAction({ locator: fileUploadAcknowledgeOkBtn });
      }
    });
  });
  return Cypress.env('docID');
};

const uploadCSVFileIntoFlatFileModelPopup = ({ locator: iFrameLocator, fileName: fileToUpload }) => {
  getFlatFileIframeBody({ locator: iFrameLocator }).within(($body) => {
    uploadFile({ locator: uploadBtnInput, filePath: fileToUpload });
    cy.wait(10000);
    cy.get(matchYesBtn).click();
    clickAction({ locator: primaryBtn });
    cy.wait(2000);
    clickAction({ locator: primaryBtn });
    clickAction({ locator: finalConfirmYesBtn });
    verifyValue({ locator: fileUploadAcknowledgeMsg, value: fileUploadSuccessMsg });
    cy.get(fileUploadAcknowledgeMsg).invoke('text').then(val => {
      const docID = (val.split(':')[1]).trim();
      cy.log(docID);
      Cypress.env('docID', docID);
    });
    clickAction({ locator: fileUploadAcknowledgeOkBtn });
  });
  return Cypress.env('docID');
};

export {
  getFlatFileIframeBody,
  uploadCSVFileIntoFlatFileModelPopup,
  uploadFileIntoFlatFileModelPopup,
};