
/*eslint-disable cypress/no-unnecessary-waiting */
import commonPage from '../../pageObjects/commonPage/commonPage.json';
import { waitSometime } from './genericUtils';

const { angleDownIcon, angleUpIcon } = commonPage;

const sec = 5000;
let n = 0;

const sortValidation = ({ colHeader: columnHeader, rowData: rowDataValue }) => {
  //colheader is a button- rowDataValue is an div or anchor element as child element.Two of the elements will have common parent element
  //if data is not obtained correctly please increase wait in the test script
  const expDef = [];
  let expAsc = [];
  let expDes = [];
  const actDef = [];
  const actAsc = [];
  const actDes = [];
  cy.get(rowDataValue)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.text() === '') {
          //expDef.push(' ');
        } else {
          expDef.push(subElement.text());
        }
      });
    })
    .then(() => {
      //ascending code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(4000)
        .next()
        .find(angleUpIcon);
      expAsc = Cypress._.sortBy(expDef);
      expDes = Cypress._.sortBy(expDef).reverse();
      expDef.forEach((eachElement) => {
        cy.log(eachElement);
      });
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actAsc.push(' ');
            } else {
              actAsc.push(subElement.text());
            }
          });
        })
        .then(() => {
          for (let x = 0; x < expAsc.length; x++) {
            expect(actAsc[x]).to.equal(expAsc[x]);
          }
        });
      //descending code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(4000)
        .next()
        .find(angleDownIcon);
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actDes.push(' ');
            } else {
              actDes.push(subElement.text());
            }
          });
        })
        .then(() => {
          for (let x = 0; x < expDes.length; x++) {
            expect(actDes[x]).to.equal(expDes[x]);
          }
        });
      //default  sort heck code block
      cy.get(columnHeader).click({ force: true }).wait(6000);
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actDef.push(' ');
            } else {
              actDef.push(subElement.text());
            }
          });
        })
        .then(() => {
          for (let x = 0; x < expDef.length; x++) {
            expect(actDef[x]).to.equal(expDef[x]);
          }
        });
    });
};

const sortValidationForNum = ({ colHeader: columnHeader, rowData: rowDataValue }) => {
  //colheader is a button- rowDataValue is an div or anchor element as child element.Two of the elements will have common parent element
  //if data is not obtained correctly please increase wait in the test script
  const expDef = [];
  let expAsc = [];
  let expDes = [];
  const actDef = [];
  const actAsc = [];
  const actDes = [];
  cy.get(rowDataValue)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.text() === '') {
          //expDef.push(' ');
        } else {
          expDef.push(parseInt(subElement.text()));
        }
      });
    })
    .then(() => {
      //ascending code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(2000)
        .next()
        .find(angleUpIcon);
      expAsc = Cypress._.sortBy(expDef);
      expDes = Cypress._.sortBy(expDef).reverse();
      expDef.forEach((eachElement) => {
        cy.log(eachElement);
      });
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actAsc.push(' ');
            } else {
              actAsc.push(parseInt(subElement.text()));
            }
          });
        })
        .then(() => {
          for (let x = 0; x < expAsc.length; x++) {
            expect(actAsc[x]).to.equal(expAsc[x]);
          }
        });
      //descending code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(2000)
        .next()
        .find(angleDownIcon);
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actDes.push(' ');
            } else {
              actDes.push(parseInt(subElement.text()));
            }
          });
        })
        .then(() => {
          for (let x = 0; x < expDes.length; x++) {
            expect(actDes[x]).to.equal(expDes[x]);
          }
        });
      //default  sort heck code block
      cy.get(columnHeader).click({ force: true }).wait(2000);
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actDef.push(' ');
            } else {
              actDef.push(parseInt(subElement.text()));
            }
          });
        })
        .then(() => {
          for (let x = 0; x < expDef.length; x++) {
            expect(actDef[x]).to.equal(expDef[x]);
          }
        });
    });
};

const sortAndValidate = ({ colHeader: columnHeader, rowData: rowDataValue }) => {
//Ascending
  cy.get(rowDataValue).then(items => {
    const defaultItems = items.map((index, html) => Cypress.$(html).text()).get();
    cy.get(columnHeader).click({ force: true }).wait(2000).then((fun) => {
      cy.log('Before Ascending Item is ' + defaultItems[0]).then((fun) => {
        const AscendingItems = items.map((index, html) => Cypress.$(html).text()).get();
        cy.log('After Ascending Item is ' + AscendingItems[0]);
        expect(defaultItems, 'Items are sorted and its in Ascending order').to.not.equal(AscendingItems);
      });
    });
  });

  //descending
  cy.get(rowDataValue).then(items => {
    const defaultItems = items.map((index, html) => Cypress.$(html).text()).get();
    cy.get(columnHeader).click({ force: true }).wait(2000).then((fun) => {
      cy.log('Before Descending Item is ' + defaultItems[0]).then((fun) => {
        const descendingItems = items.map((index, html) => Cypress.$(html).text()).get();
        cy.log('After Descending Item is ' + descendingItems[0]);
        expect(defaultItems, 'Items are sorted and its in descending order').to.not.equal(descendingItems);
      });
    });
  });
};

const sortValiForLargeStr = ({ colHeader: columnHeader, colHeadName: headName, locator: tableLoc, tableScrollLoca: tablescorll }) => {
  //colheader is a button- rowDataValue is an div or anchor element as child element.Two of the elements will have common parent element
  //if data is not obtained correctly please increase wait in the test script
  const expDef = [];
  let expAsc = [];
  let expDes = [];
  const actDef = [];
  const actAsc = [];
  const actDes = [];
  cy.then(() => {
    cy.get(tablescorll).scrollTo('bottom');
    waitSometime(sec);
    cy.get(tableLoc + " [role='row']").last().invoke('attr', 'data-rowindex').then((style) => {
      n = style;
      cy.log(n);
    });
    cy.get(tablescorll).scrollTo('top');
    waitSometime(sec);
  }).then(() => {
    let v = 0;
    cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
      if (element.text() === '') {
        //expDef.push(' ');
      } else {
        expDef.push(element.text().toLowerCase());
      }
      for (let i = 0; i < n; i++) {
        v = v + 32;
        cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
          if (element.text() === '') {
            //expDef.push(' ');
          } else {
            expDef.push(element.text().toLowerCase());
          }
        });
      }
    });
  })
    .then(() => {
      //ascending code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(2000)
        .next()
        .find(angleUpIcon);
      expAsc = Cypress._.sortBy(expDef);
      expAsc.forEach((eachElement) => {
        cy.log(eachElement);
      });
      cy.get(tablescorll).scrollTo('top');
      waitSometime(sec);
      cy.then(() => {
        let v = 0;
        cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
          if (element.text() === '') {
            //actAsc.push(' ');
          } else {
            actAsc.push(element.text().toLowerCase());
          }
        });
        for (let i = 0; i < n; i++) {
          v = v + 32;
          cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
            if (element.text() === '') {
              //actAsc.push(' ');
            } else {
              actAsc.push(element.text().toLowerCase());
            }
          });
        }
      }).then(() => {
        for (let x = 0; x < expAsc.length; x++) {
          expect(actAsc[x]).to.equal(expAsc[x]);
        }
      })
        .then(() => {
          //desc code block
          cy.get(columnHeader)
            .click({ force: true })
            .wait(2000)
            .next()
            .find(angleDownIcon);
          cy.get(tablescorll).scrollTo('top');
          expDes = Cypress._.sortBy(actAsc).reverse();
          waitSometime(sec);
          cy.then(() => {
            let v = 0;
            cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
              if (element.text() === '') {
                //actDes.push(' ');
              } else {
                actDes.push(element.text().toLowerCase());
              }
            });
            for (let i = 0; i < n; i++) {
              v = v + 32;
              cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
                if (element.text() === '') {
                  //actDes.push(' ');
                } else {
                  actDes.push(element.text().toLowerCase());
                }
              });
            }
          }).then(() => {
            for (let x = 0; x < expDes.length; x++) {
              expect(actDes[x]).to.equal(expDes[x]);
            }
          });
        })
        .then(() => {
          //Default code block
          cy.get(columnHeader)
            .click({ force: true })
            .wait(2000);
          cy.get(tablescorll).scrollTo('top');
          waitSometime(sec);
          cy.then(() => {
            let v = 0;
            cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
              if (element.text() === '') {
                //actDef.push(' ');
              } else {
                actDef.push(element.text().toLowerCase());
              }
            });
            for (let i = 0; i < n; i++) {
              v = v + 32;
              cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
                if (element.text() === '') {
                  //actDef.push(' ');
                } else {
                  actDef.push(element.text().toLowerCase());
                }
              });
            }
          }).then(() => {
            for (let x = 0; x < actDef.length; x++) {
              expect(actDef[x]).to.equal(expDef[x]);
            }
          });
        });
    });
};

const sortValiForLargeNumber = ({ colHeader: columnHeader, colHeadName: headName, locator: tableLoc, tableScrollLoca: tablescorll }) => {
  //colheader is a button- rowDataValue is an div or anchor element as child element.Two of the elements will have common parent element
  //if data is not obtained correctly please increase wait in the test script
  const expDef = [];
  let expAsc = [];
  let expDes = [];
  const actDef = [];
  const actAsc = [];
  const actDes = [];
  cy.then(() => {
    cy.get(tablescorll).scrollTo('bottom');
    //cy.scrollTo('bottom');
    waitSometime(sec);
    cy.get(tableLoc + " [role='row']").last().invoke('attr', 'data-rowindex').then((style) => {
      n = style;
      cy.log(n);
    });
    cy.get(tablescorll).scrollTo('top');
    waitSometime(sec);
  }).then(() => {
    let v = 0;
    cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
      if (element.text() === '') {
        //expDef.push(' ');
      } else {
        expDef.push(parseInt(element.text().replace(/[^\d.]/g, '')));
      }
      for (let i = 0; i < n; i++) {
        v = v + 32;
        cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
          if (element.text() === '') {
            //expDef.push(' ');
          } else {
            expDef.push(parseInt(element.text().replace(/[^\d.]/g, '')));
          }
        });
      }
    });
  }).then(() => {
    //ascending code block
    cy.get(columnHeader)
      .click({ force: true })
      .wait(2000)
      .next()
      .find(angleUpIcon);
    expAsc = Cypress._.sortBy(expDef);
    expAsc.forEach((eachElement) => {
      cy.log(eachElement);
    });
    cy.get(tablescorll).scrollTo('top');
    waitSometime(sec);
    cy.then(() => {
      let v = 0;
      cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
        if (element.text() === '') {
          //actAsc.push(' ');
        } else {
          actAsc.push(parseInt(element.text().replace(/[^\d.]/g, '')));
        }
      });
      for (let i = 0; i < n; i++) {
        v = v + 32;
        cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
          if (element.text() === '') {
            //actAsc.push(' ');
          } else {
            actAsc.push(parseInt(element.text().replace(/[^\d.]/g, '')));
          }
        });
      }
    }).then(() => {
      for (let x = 0; x < expAsc.length; x++) {
        expect(actAsc[x]).to.equal(expAsc[x]);
      }
    }).then(() => {
      //desc code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(2000)
        .next()
        .find(angleDownIcon);
      cy.get(tablescorll).scrollTo('top');
      expDes = Cypress._.sortBy(actAsc).reverse();
      waitSometime(sec);
      cy.then(() => {
        let v = 0;
        cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
          if (element.text() === '') {
            //actDes.push(' ');
          } else {
            actDes.push(parseInt(element.text().replace(/[^\d.]/g, '')));
          }
        });
        for (let i = 0; i < n; i++) {
          v = v + 32;
          cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
            if (element.text() === '') {
              //actDes.push(' ');
            } else {
              actDes.push(parseInt(element.text().replace(/[^\d.]/g, '')));
            }
          });
        }
      }).then(() => {
        for (let x = 0; x < expDes.length; x++) {
          expect(actDes[x]).to.equal(expDes[x]);
        }
      });
    }).then(() => {
      //Default code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(2000);
      cy.get(tablescorll).scrollTo('top');
      waitSometime(sec);
      cy.then(() => {
        let v = 0;
        cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
          if (element.text() === '') {
            //actDef.push(' ');
          } else {
            actDef.push(parseInt(element.text().replace(/[^\d.]/g, '')));
          }
        });
        for (let i = 0; i < n; i++) {
          v = v + 32;
          cy.get(tableLoc + " [style*='top: " + v + "px'] [data-cellheader='" + headName + "']").scrollIntoView().each((element) => {
            if (element.text() === '') {
              //actDef.push(' ');
            } else {
              actDef.push(parseInt(element.text().replace(/[^\d.]/g, '')));
            }
          });
        }
      }).then(() => {
        for (let x = 0; x < actDef.length; x++) {
          expect(actDef[x]).to.equal(expDef[x]);
        }
      });
    });
  });
};

const sortAndValidateWithPos = ({ colHeader: columnHeader, rowData: rowDataValue, position: indexNumber }) => {
  //Ascending
  cy.get(rowDataValue).eq(indexNumber).then(items => {
    const defaultItems = items.map((index, html) => Cypress.$(html).text()).get();
    cy.get(columnHeader).click({ force: true }).wait(2000).then((fun) => {
      cy.log('Before Ascending Item is ' + defaultItems[0]).then((fun) => {
        const AscendingItems = items.map((index, html) => Cypress.$(html).text()).get();
        cy.log('After Ascending Item is ' + AscendingItems[0]);
        expect(defaultItems, 'Items are sorted and its in Ascending order').to.not.equal(AscendingItems);
      });
    });
  });

  //descending
  cy.get(rowDataValue).eq(indexNumber).then(items => {
    const defaultItems = items.map((index, html) => Cypress.$(html).text()).get();
    cy.get(columnHeader).click({ force: true }).wait(2000).then((fun) => {
      cy.log('Before Descending Item is ' + defaultItems[0]).then((fun) => {
        const descendingItems = items.map((index, html) => Cypress.$(html).text()).get();
        cy.log('After Descending Item is ' + descendingItems[0]);
        expect(defaultItems, 'Items are sorted and its in descending order').to.not.equal(descendingItems);
      });
    });
  });
  //default
  const expDef = [];
  const actDef = [];
  cy.get(columnHeader).click({ force: true }).wait(6000);
  cy.get(rowDataValue)
    .eq(indexNumber)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.text() === '') {
          //actDef.push(' ');
        } else {
          actDef.push(subElement.text());
        }
      });
    })
    .then(() => {
      for (let x = 0; x < expDef.length; x++) {
        expect(actDef[x]).to.equal(expDef[x]);
      }
    });
};

const rowDataVerifyWithPos = ({
  colHeader: columnHeader,
  rowData: rowDataValue,
  position: indexNumber,
}) => {
  //default Row Data as Ascending Without Click
  cy.get(rowDataValue)
    .eq(indexNumber)
    .then((items) => {
      const defaultItems = items
        .map((index, html) => Cypress.$(html).text())
        .get();
      cy.get(columnHeader)
        .wait(2000)
        .then((fun) => {
          cy.log('Before Ascending Item is ' + defaultItems[0]).then((fun) => {
            const AscendingItems = items
              .map((index, html) => Cypress.$(html).text())
              .get();
            cy.log('After Ascending Item is ' + AscendingItems[0]);
            expect(
              defaultItems,
              'Items are sorted and its in Ascending order',
            ).to.not.equal(AscendingItems);
          });
        });
    });
  //default Row Data
  const expDef = [];
  const actDef = [];
  cy.get(columnHeader).wait(6000);
  cy.get(rowDataValue)
    .eq(indexNumber)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.text() === '') {
          //actDef.push(' ');
        } else {
          actDef.push(subElement.text());
        }
      });
    })
    .then(() => {
      //default  sort heck code block
      cy.get(columnHeader).wait(2000);
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actDef.push(' ');
            } else {
              actDef.push(subElement.text());
            }
          });
        })
        .then(() => {
          for (let x = 0; x < expDef.length; x++) {
            expect(actDef[x]).to.equal(expDef[x]);
          }
        });
    });
};

const sortAndValidateWithDefault = ({ colHeader: columnHeader, rowData: rowDataValue }) => {
  //Ascending
  cy.get(rowDataValue).then(items => {
    const defaultItems = items.map((index, html) => Cypress.$(html).text()).get();
    cy.get(columnHeader).click({ force: true }).wait(2000).then((fun) => {
      cy.log('Before Ascending Item is ' + defaultItems[0]).then((fun) => {
        const AscendingItems = items.map((index, html) => Cypress.$(html).text()).get();
        cy.log('After Ascending Item is ' + AscendingItems[0]);
        expect(defaultItems, 'Items are sorted and its in Ascending order').to.not.equal(AscendingItems);
      });
    });
  });

  //descending
  cy.get(rowDataValue).then(items => {
    const defaultItems = items.map((index, html) => Cypress.$(html).text()).get();
    cy.get(columnHeader).click({ force: true }).wait(2000).then((fun) => {
      cy.log('Before Descending Item is ' + defaultItems[0]).then((fun) => {
        const descendingItems = items.map((index, html) => Cypress.$(html).text()).get();
        cy.log('After Descending Item is ' + descendingItems[0]);
        expect(defaultItems, 'Items are sorted and its in descending order').to.not.equal(descendingItems);
      });
    });
  });

  //default
  cy.get(rowDataValue).then(items => {
    const defaultItems = items.map((index, html) => Cypress.$(html).text()).get();
    cy.get(columnHeader).click({ force: true }).wait(2000).then((fun) => {
      cy.log('Before Descending Item is ' + defaultItems[0]).then((fun) => {
        const defaultValue = items.map((index, html) => Cypress.$(html).text()).get();
        cy.log('After Default value is ' + defaultValue[0]);
        expect(defaultItems, 'Items are sorted and its in default order').to.not.equal(defaultValue);
      });
    });
  });
};

const sortValidationAscending = ({
  colHeader: columnHeader,
  rowData: rowDataValue,
}) => {
  //colheader is a button- rowDataValue is an div or anchor element as child element.Two of the elements will have common parent element
  //if data is not obtained correctly please increase wait in the test script
  const expDef = [];
  let expAsc = [];
  const actAsc = [];
  cy.get(rowDataValue)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.text() === '') {
          //expDef.push(' ');
        } else {
          expDef.push(subElement.text());
        }
      });
    })
    .then(() => {
      //ascending code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(4000)
        .next()
        .find(angleUpIcon);
      expAsc = Cypress._.sortBy(expDef);
      expDef.forEach((eachElement) => {
        cy.log(eachElement);
      });
    });
  cy.get(rowDataValue)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.text() === '') {
          //actAsc.push(' ');
        } else {
          actAsc.push(subElement.text());
        }
      });
    })
    .then(() => {
      for (let x = 0; x < expAsc.length; x++) {
        expect(actAsc[x]).to.equal(expAsc[x]);
      }
    });
};

const sortValidationAscendingForNum = ({
  colHeader: columnHeader,
  rowData: rowDataValue,
}) => {
  //colheader is a button- rowDataValue is an div or anchor element as child element.Two of the elements will have common parent element
  //if data is not obtained correctly please increase wait in the test script
  const expDef = [];
  let expAsc = [];
  const actAsc = [];
  cy.get(rowDataValue)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.text() === '') {
          //expDef.push(' ');
        } else {
          expDef.push(parseInt(subElement.text()));
        }
      });
    })
    .then(() => {
      //ascending code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(2000)
        .next()
        .find(angleUpIcon);
      expAsc = Cypress._.sortBy(expDef);
      expDef.forEach((eachElement) => {
        cy.log(eachElement);
      });
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actAsc.push(' ');
            } else {
              actAsc.push(parseInt(subElement.text()));
            }
          });
        })
        .then(() => {
          for (let x = 0; x < expAsc.length; x++) {
            expect(actAsc[x]).to.equal(expAsc[x]);
          }
        });
    });
};

const sortAndValidateAscending = ({
  colHeader: columnHeader,
  rowData: rowDataValue,
}) => {
  //Ascending
  cy.get(rowDataValue).then((items) => {
    const defaultItems = items
      .map((index, html) => Cypress.$(html).text())
      .get();
    cy.get(columnHeader)
      .click({ force: true })
      .wait(2000)
      .then((fun) => {
        cy.log('Before Ascending Item is ' + defaultItems[0]).then((fun) => {
          const AscendingItems = items
            .map((index, html) => Cypress.$(html).text())
            .get();
          cy.log('After Ascending Item is ' + AscendingItems[0]);
          expect(
            defaultItems,
            'Items are sorted and its in Ascending order',
          ).to.not.equal(AscendingItems);
        });
      });
  });
};

const sortValidationString = ({ colHeader: columnHeader, rowData: rowDataValue }) => {
  //colheader is a button- rowDataValue is an div or anchor element as child element.Two of the elements will have common parent element
  //if data is not obtained correctly please increase wait in the test script
  const expDef = [];
  let expAsc = [];
  let expDes = [];
  const actDef = [];
  const actAsc = [];
  const actDes = [];
  cy.get(rowDataValue)
    .then((element) => {
      cy.wrap(element).each((subElement) => {
        if (subElement.text() === '') {
          //expDef.push(' ');
        } else {
          expDef.push(subElement.text());
        }
      });
    })
    .then(() => {
      //ascending code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(4000)
        .next()
        .find(angleUpIcon);
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actAsc.push(' ');
            } else {
              actAsc.push(subElement.text());
            }
          });
        })
        .then(() => {
          expAsc = Cypress._.sortBy(actAsc);
          cy.log('Ascending');
          for (let x = 0; x < expAsc.length; x++) {
            expect(actAsc[x]).to.equal(expAsc[x]);
          }
        });
      //descending code block
      cy.get(columnHeader)
        .click({ force: true })
        .wait(4000)
        .next()
        .find(angleDownIcon);
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actDes.push(' ');
            } else {
              actDes.push(subElement.text());
            }
          });
        })
        .then(() => {
          expDes = Cypress._.sortBy(actDes).reverse();
          cy.log('Descending');
          for (let x = 0; x < actDes.length; x++) {
            expect(actDes[x]).to.equal(expDes[x]);
          }
        });
      //default  sort heck code block
      cy.get(columnHeader).click({ force: true }).wait(6000);
      cy.get(rowDataValue)
        .then((element) => {
          cy.wrap(element).each((subElement) => {
            if (subElement.text() === '') {
              //actDef.push(' ');
            } else {
              actDef.push(subElement.text());
            }
          });
          cy.log('default');
        })
        .then(() => {
          for (let x = 0; x < expDef.length; x++) {
            expect(actDef[x]).to.equal(expDef[x]);
          }
        });
    });
};

const getPosAndValidateSort = ({ colHeader: columnHeader, rowData: rowDataValue, colLocator: colLoc }) => {
  cy.contains(colLoc, rowDataValue).invoke('index').then((i) => {
    sortValidationString({ colHeader: columnHeader, rowData: `[data-testid='table-tbody'] [data-columnidx='${i}']` });
  });
};

const getPosSortAndValidate = ({ colHeader: columnHeader, rowData: rowDataValue, colLocator: colLoc }) => {
  cy.contains(colLoc, rowDataValue).invoke('index').then((i) => {
    sortAndValidate({ colHeader: columnHeader, rowData: `[data-testid='table-tbody'] [data-columnidx='${i}']` });
  });
};

export {
  sortValidation,
  sortValidationForNum,
  sortValiForLargeStr,
  sortValiForLargeNumber,
  sortAndValidate,
  sortAndValidateWithPos,
  rowDataVerifyWithPos,
  sortAndValidateWithDefault,
  sortValidationAscending,
  sortValidationAscendingForNum,
  sortAndValidateAscending,
  sortValidationString,
  getPosAndValidateSort,
  getPosSortAndValidate,
};