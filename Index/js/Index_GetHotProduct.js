const url = "http://localhost:5193/api/Paradise/Hot";

fetch(url, { credentials: 'include' })
  .then(response => {
    if (!response.ok) {
      throw new Error('網路錯誤，無法獲取資料');
    }
    return response.json(); // 解析 JSON 格式的回傳資料
  })
  .then(data => {
    console.log(data);

    const carouselContainer = document.querySelector('.carousel-container .carousel');

    if (data.Message && data.Message.length > 0) {
      data.Message.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        carouselItem.innerHTML = `
          <div class="product">
            <img src="image/${item.ItemImg}" alt="商品圖片"> 
            <div class="text">
              <a href="./product.html?ItemId=${item.ItemId}">
                <div class="hot"> 
                  <h4>【${item.Brand}】</h4>
                </div>
                <h3>${item.ItemName}</h3>
                <div class="ItemPriceMin">
                  <p>NT$</p>
                  <p>${item.ItemPriceMin}起</p>
                </div>
              </a>                        
            </div>                    
          </div>
        `;
        carouselContainer.appendChild(carouselItem);
      });
    } else {
      const noItemsMessage = document.createElement('div');
      noItemsMessage.textContent = 'No items available';
      carouselContainer.appendChild(noItemsMessage);
    }
  })
  .catch(error => {
    console.error('發生錯誤:', error);
  });
