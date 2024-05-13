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
    const memberKindElement = document.getElementById('memberKind');
    const memberTimeElement = document.getElementById('memberTime');

    const card = document.getElementById('card');
    
    accountElement.textContent = data.account1;
    nameElement.textContent = data.name;
    cellphoneElement.textContent = data.cellphone;
    emailElement.textContent = data.email;
    if(data.memberKind==null){
      memberKindElement.textContent = "一般會員";
      memberTimeElement.textContent = "永久";
    }
    else{
      memberKindElement.textContent = data.memberKind;
      memberTimeElement.textContent = formatDateTime(data.memberTime);
    }
    


    console.log(data.memberKind);
    if(data.memberKind=="銀級會員"){
      card.style.backgroundColor='#f7f8fa';
    }
    else if(data.memberKind=="金級會員"){
      card.style.backgroundColor='#fafaee';
    }




  })
  .catch(error => {
    console.error('發生錯誤:', error);
  });


function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear()+1;
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    const date = ('0' + dateTime.getDate()).slice(-2);
    
    const formattedDateTime = `${year+1}-${month}-${date} `;
    return formattedDateTime;
}
