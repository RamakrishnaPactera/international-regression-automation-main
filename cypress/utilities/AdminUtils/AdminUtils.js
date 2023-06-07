import {
  buttonThatOpensNewTab,
  clearTypeWait,
  clickFirstElementIn,
  clickVisibleElement,
  selectOneRecordInWebTable,
  verifyToExist,
} from '../commonUtils/genericUtils';
import adminPage from '../../pageObjects/adminPage/adminPage.json';
const {
  btnAddSelectedRoles,
  btnRemovedSelectedRoles,
  btnSearchUser,
  lnkSelectUserId,
  tabAdminMenu,
  tableAddRoles,
  tableRemoveAssignedRoles,
  tabRoleMapings,
  tabUserAccess,
  txtSearchUser,
} = adminPage;
const navigateUserAccess = () => {
  verifyToExist({ element: tabAdminMenu });
  clickVisibleElement({ locator: tabAdminMenu });
  verifyToExist({ element: tabUserAccess });
  buttonThatOpensNewTab(tabUserAccess);
};
const searchAndSelectUser = (text) => {
  clearTypeWait({ element: txtSearchUser, typeText: text });
  clickVisibleElement({ locator: btnSearchUser });
  clickFirstElementIn({ locator: lnkSelectUserId });
};
const navigateRoleMapings = (text) => {
  clickVisibleElement({ locator: tabRoleMapings });
};
const assignedRemoveRoles = (recordName) => {
  selectOneRecordInWebTable({ locator: tableRemoveAssignedRoles, dataText: recordName });
  clickVisibleElement({ locator: btnRemovedSelectedRoles });
};
const assignedAddRoles = (recordName) => {
  selectOneRecordInWebTable({ locator: tableAddRoles, dataText: recordName });
  clickVisibleElement({ locator: btnAddSelectedRoles });
};
export {
  assignedAddRoles,
  assignedRemoveRoles,
  navigateRoleMapings,
  navigateUserAccess,
  searchAndSelectUser,
};