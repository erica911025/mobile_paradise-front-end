 

 const url = "http://localhost:5193/api/Paradise/ProductInfo?ItemId=6"; 


fetch(url, { credentials: 'include' })
  .then(response => {
    if (!response.ok) {
      throw new Error('網路錯誤，無法獲取資料');
    }
    return response.json(); // 解析 JSON 格式的回傳資料
  })
  .then(data => {
    console.log(data); 
    
    // 更新顏色選擇
    const colorRadios = document.getElementsByName('color');
    colorRadios.forEach(radio => {
      if (radio.value === data.color) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });

    // 更新儲存空間選擇
    const labelRadios = document.getElementsByName('label');
    labelRadios.forEach(radio => {
      if (radio.value === data.label) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });

    // 更新數量
    const quantityInput = document.getElementById('val');
    quantityInput.value = data.num;

    // 更新商品品牌
    const brandElement = document.getElementById('Brand');
    brandElement.textContent = data.brand;
    brandElement.href = `./product_brand.html?brand=${encodeURIComponent(data.brand)}`;

    // 更新商品名稱
    const itemNameElement = document.getElementById('ItemName');
    itemNameElement.textContent = data.itemName;
    itemNameElement.href = `./product_detail.html?id=${encodeURIComponent(data.itemId)}`;

    // 將商品規格顯示在對應的元素中
    const colorElement = document.getElementById('Color');
    const spaceElement = document.getElementById('Space');
    const itemNumElement = document.getElementById('ItemNum');
    const itemPriceElement = document.getElementById('ItemPrice');

    colorElement.textContent = data.color;
    spaceElement.textContent = data.space;
    itemNumElement.textContent = data.itemNum;
    itemPriceElement.textContent = data.itemPrice;

  })
  .catch(error => {
    console.error('發生錯誤:', error);
  });


//  fetch(url,{credentials: 'include'})
//    .then(response => {
//      if (!response.ok) {
//        throw new Error('網路錯誤，無法獲取資料');
//      }
//      return response.json(); // 解析 JSON 格式的回傳資料
//    })
//    .then(data => {
 
//      console.log(data); 
     
//      const brandElement = document.getElementById('Brand'); //品牌
//      const itemNameElement = document.getElementById('ItemName'); //名稱
//      const colorElement = document.getElementById('Color'); //顏色
//      const spaceElement = document.getElementById('Space'); //儲存空間
 
//      brandElement.textContent = data.brand;
//      itemNameElement.textContent = data.itemName;
//      colorElement.textContent = data.color;
//      spaceElement.textContent = data.space;

 
//    })
//    .catch(error => {
//      console.error('發生錯誤:', error);
//    });
 


