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


  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const totalItems = 8; // 商品總數
    const itemsPerPage = 4; // 每頁顯示的商品數量
    const itemWidth = 178; // 每個商品的寬度

    function showSlide(index) {
        // 檢查索引是否超出範圍，並調整索引以實現循環播放
        if (index >= totalItems) {
            currentIndex = 0; // 如果索引超出了範圍，將當前索引設置為 0，實現循環
        } else if (index < 0) {
            currentIndex = totalItems - 2; // 如果索引小於 0，將當前索引設置為最後一個項目的索引，實現循環
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * itemWidth; // 計算偏移量
        carousel.style.transform = `translateX(${offset}px)`; // 使用偏移量移動輪播圖片
    }

    // 點擊上一個按鈕時的事件處理程序
    prevBtn.addEventListener('click', function() {
        showSlide(currentIndex - itemsPerPage); // 將索引減去每頁顯示的商品數量，實現向左移動
    });

    // 點擊下一個按鈕時的事件處理程序
    nextBtn.addEventListener('click', function() {
        showSlide(currentIndex + itemsPerPage); // 將索引加上每頁顯示的商品數量，實現向右移動
    });

    // 初始化輪播圖
    showSlide(currentIndex);
});
