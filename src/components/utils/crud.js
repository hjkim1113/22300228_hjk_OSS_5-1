export const get = () => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://672818a4270bd0b975544ed3.mockapi.io/people");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.status === 200) {
        let stu = JSON.parse(xhttp.response);
        resolve(stu);
      } else {
        reject("데이터를 가져오는 데 실패했습니다.");
      }
    };
  });
};

export const put = (data) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://672818a4270bd0b975544ed3.mockapi.io/people");
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(JSON.stringify(data));

    xhttp.onload = () => {
      if (xhttp.status === 201) {
        alert('추가되었습니다.');
        resolve(JSON.parse(xhttp.response));
      } else {
        reject("데이터 추가에 실패했습니다.");
      }
    };
  });
};

export const update = (data) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://672818a4270bd0b975544ed3.mockapi.io/people/" + data.id);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(JSON.stringify(data));

    xhttp.onload = () => {
      if (xhttp.status === 200) {
        alert('수정되었습니다.');
        resolve(JSON.parse(xhttp.response));
      } else {
        reject("데이터 수정에 실패했습니다.");
      }
    };
  });
};

export const delete_el = (data) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://672818a4270bd0b975544ed3.mockapi.io/people/" + data.id);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send();

    xhttp.onload = () => {
      if (xhttp.status === 200) {
        alert('삭제되었습니다.');
        resolve();
      } else {
        reject("데이터 삭제에 실패했습니다.");
      }
    };
  });
};
