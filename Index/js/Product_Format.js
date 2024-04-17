
const url = "http://localhost:5193/api/Paradise/ProductInfo?ItemId=6"; 


fetch(url, { credentials: 'include' })
  .then(response => {
    if (!response.ok) {
      throw new Error('網路錯誤，無法獲取資料');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); 


    // 商品品牌
    const brandElement = document.getElementById('Brand');
    if (data.Message && data.Message.length > 0) {
      brandElement.textContent = data.Message[0].Brand;
    } else {
      brandElement.textContent = 'No Brand Available';
    }

    brandElement.href = `./product_brand.html?brand=${encodeURIComponent(data.brand)}`;


    const brand2Element = document.getElementById('Brand2');
    if (data.Message && data.Message.length > 0) {
      brand2Element.textContent = data.Message[0].Brand;
    } else {
      brand2Element.textContent = 'No Brand Available';
    }

    // 商品名稱
    const ItemNameElement = document.getElementById('ItemName');
    if (data.Message && data.Message.length > 0) {
      ItemNameElement.textContent = data.Message[0].ItemName;
    } else {
      ItemNameElement.textContent = 'No Brand Available';
    }

    const ItemName2Element = document.getElementById('ItemName2');
    if (data.Message && data.Message.length > 0) {
      ItemName2Element.textContent = data.Message[0].ItemName;
    } else {
      ItemName2Element.textContent = 'No Brand Available';
    }

    // 商品價格
    const ItemPriceElement = document.getElementById('ItemPrice');
    if (data.Message && data.Message.length > 0) {
      ItemPriceElement.textContent = data.Message[0].ItemPrice;
      const itemPrice = parseFloat(data.Message[0].ItemPrice);
    } else {
      ItemPriceElement.textContent = 'No Brand Available';
    }
    

     // 商品顏色
     const colorOptionsElement = document.getElementById('colorOptions');
     if (data.Message && data.Message.length > 0) {
       const Colors = data.Message.map(item => item.Color); //map可以抓取所有資料儲存於Colors陣列
 
       Colors.forEach((Color, first) => {
        const label = document.createElement('label'); //創建顏色容器
        label.id = Color.toLowerCase(); // 將顏色轉換為小寫作為 label 的 id
        const isChecked = first === 0 ? 'checked="checked"' : ''; // 判斷是否是第一個颜色，是的話會變成預設值
        label.innerHTML = `
          <input type="radio" name="color" ${isChecked}> <!-- 这里添加了 ${isChecked} -->
          <span class="round button">${Color}</span>
        `;
        colorOptionsElement.appendChild(label);
      });
     } else {
       colorOptionsElement.textContent = 'No Colors Available';
     }

      // 儲存空間
      const SpaceOptionsElement = document.getElementById('SpaceOptions');
      if (data.Message && data.Message.length > 0) {
        const Spaces = data.Message.map(item => item.Space); //map可以抓取所有資料儲存於Spaces陣列
        Spaces.forEach((Space, first) => {
          const label = document.createElement('label'); //創建儲存空間容器
          label.id = Space.toLowerCase(); // 將儲存空間轉換為小寫作為 label 的 id
          const isChecked = first === 0 ? 'checked="checked"' : ''; // 判斷是否是第一個空間容器，是的話會變成預設值
          label.innerHTML = `
            <input type="radio" name="Space" value="${Space}" ${isChecked}>
            <span class="round button">${Space}</span>
          `;
          SpaceOptionsElement.appendChild(label);
        });
      } else {
        SpaceOptionsElement.textContent = 'No Colors Available';
      }


      //商品單價
      const SpaceOptions = document.getElementsByName('Space'); // 所有儲存空間選項
      SpaceOptions.forEach(option => {
        option.addEventListener('change', function() {
          const selectedSpace = this.value; // 獲取所選的儲存空間
          const itemPrice = parseFloat(data.Message.find(item => item.Space === selectedSpace).ItemPrice); // 找到所選儲存空間的價格
      
          const ItemPriceElement = document.getElementById('ItemPrice');
          ItemPriceElement.textContent = itemPrice; // 更新單價顯示
        });
      });
      



  })


  .catch(error => {
    console.error('發生錯誤:', error);
  });


