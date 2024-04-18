const url = "http://localhost:5193/api/Cart/Profile"; 


fetch(url,{credentials: 'include'})
  .then(response => {
    if (!response.ok) {
      throw new Error('網路錯誤，無法獲取資料');
    }
    return response.json(); // 解析 JSON 格式的回傳資料
  })
  .then(data => {

    console.log(data); 
    
    const accountElement = document.getElementById('Account1');
    const nameElement = document.getElementById('Name');
    const cellphoneElement = document.getElementById('Cellphone');
    const emailElement = document.getElementById('Email');

<<<<<<< HEAD
=======
    
>>>>>>> 201e3c1b93574651ce6812695aad691c44c3f9ae
    accountElement.textContent = data.account1;
    nameElement.textContent = data.name;
    cellphoneElement.textContent = data.cellphone;
    emailElement.textContent = data.email;

  })
  .catch(error => {
    console.error('發生錯誤:', error);
  });


