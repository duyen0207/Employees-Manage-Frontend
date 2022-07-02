export const SERVER_API_URL = "https://amis.manhnv.net/api/v1/Employees";

export const employeeAPI = {
  getEmployees: `${SERVER_API_URL}/filter`,
  addNewEmployees: `${SERVER_API_URL}`,
  getNewCode: `${SERVER_API_URL}/NewEmployeeCode`,
};

// ktra giới tính
export function setGenderName(gender) {
  let genderName = "";
  if (gender == "1") {
    genderName = "Nam";
  } else if (gender == "2") {
    genderName = "Nữ";
  } else if (gender == "3") {
    genderName = "Khác";
  }
  return genderName;
}

/**
 * chuẩn hóa ngày theo format
 * default: dd/mm/yyyy
 */
export function formatDate(date, type = "en-GB") {
  if (date) {
    let formatDate = new Date(date);
    formatDate = formatDate.toLocaleDateString(type);
    return formatDate;
  }
  return "";
}
