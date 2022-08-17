export const SERVER_API_URL = "https://localhost:7024/api/v1/Employees";

export const employeeAPI = {
  getEmployees: `${SERVER_API_URL}/filter`,
  addNewEmployees: `${SERVER_API_URL}`,
  getNewCode: `${SERVER_API_URL}/NewEmployeeCode`,
};

export const ActionType = {
  ADD: "0",
  EDIT: "1",
  DELETE: "2",
  DELETE_MULTIPLE: "3",
};

// ktra giới tính
export function setGenderName(gender) {
  let genderName = "";
  if (gender == "0") {
    genderName = "Nam";
  } else if (gender == "1") {
    genderName = "Nữ";
  } else if (gender == "2") {
    genderName = "Khác";
  }
  console.log("gender: ", gender, genderName);

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

// validate date
export function validateDate(date) {
  let checkDate = true;
  let errorMsg = "Ngày không tồn tại.\n";
  if (date) {
    const dateFormat = new Date(date);

    let year = dateFormat.getFullYear();
    let day = dateFormat.getDate();
    let month = dateFormat.getMonth() + 1;

    // kiểm tra ngày có tồn tại không
    if (day > 31 || month > 12 || day < 1 || month < 1) return false;
    else {
      // năm nhuận
      if (year % 4 == 0) {
        if (month == 2 && day > 29) checkDate = false;
      } else {
        let numDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (day > numDays[month]) checkDate = false;
      }
    }

    // kiểm tra ngày có hợp lệ không
    let today = new Date();
    if (dateFormat.getTime() > today.getTime()) {
      checkDate = false;
      errorMsg = "Ngày không được lớn hơn thời điểm hiện tại.\n";
    }
  } else checkDate = false;

  return {
    check: checkDate,
    errorMsg: errorMsg,
  };
}

// validate email
export function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return re.test(email);
}
