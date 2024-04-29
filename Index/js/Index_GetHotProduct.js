
const numberWithCommas = (number) => {
  return number.toLocaleString(undefined, { maximumFractionDigits: 0 });
};


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
        var price=numberWithCommas(item.ItemPriceMin);
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
                  <p>${price}起</p>
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
    const itemsPerPage = 5.6; // 每頁顯示的商品數量
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

document.addEventListener('DOMContentLoaded', function () {
  const carouselSlide = document.querySelector('.carousel-slide_img');
  let carouselImages = document.querySelectorAll('.carousel-slide_img img');
  const prevBtn = document.querySelector('#prevBtn');
  const nextBtn = document.querySelector('#nextBtn');

  // 將克隆的圖片添加到carouselImages中
  /*const firstClone = carouselImages[0].cloneNode(true);
  const lastClone = carouselImages[carouselImages.length - 1].cloneNode(true);
  firstClone.id = 'firstClone'; // 添加ID
  firstClone.classList.add('carousel-image'); // 添加類名
  lastClone.id = 'lastClone'; // 添加ID
  lastClone.classList.add('carousel-image'); // 添加類名
  carouselSlide.appendChild(firstClone);
  carouselSlide.insertBefore(lastClone, carouselImages[0]);
  carouselImages = document.querySelectorAll('.carousel-slide_img img');*/

  // Counter
  let counter = 0;
  const size = carouselImages[0].clientWidth;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  console.log(carouselSlide.style.transform)
  // Button listeners
  /*nextBtn.addEventListener('click', () => {
      if (counter >= carouselImages.length - 1) {
          counter = 0;
          carouselSlide.style.transition = 'none';
          carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
          return;
      }
      counter++;
      carouselSlide.style.transition = 'transform 0.4s ease-in-out';
      carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  });

  prevBtn.addEventListener('click', () => {
      if (counter < 0) {
          counter = carouselImages.length - 3;
          carouselSlide.style.transition = 'none';
          carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
          return;
      }
      counter--;
      carouselSlide.style.transition = 'transform 0.4s ease-in-out';
      carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  });*/
  const nextSlide = () => {
    if (counter >= carouselImages.length - 1) {
        counter = 0;
    } else {
        counter++;
    }
    carouselSlide.style.transition = 'transform 0.4s ease-in-out';
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
};

// Function to move to previous slide
const prevSlide = () => {
    if (counter <= 0) {
        counter = carouselImages.length - 1;
    } else {
        counter--;
    }
    carouselSlide.style.transition = 'transform 0.4s ease-in-out';
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
};

// Button listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide
setInterval(nextSlide, 3000);

  /*carouselSlide.addEventListener('transitionend', () => {
      if (carouselImages[counter].id === 'lastClone') {
          carouselSlide.style.transition = 'none';
          counter = 1;
          carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
          console.log('y')
      }
      else if (carouselImages[counter].id === 'firstClone') {
          carouselSlide.style.transition = 'none';
          counter = carouselImages.length - 3;
          carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
          console.log('y')
      }
  });*/
});
