
fetch("http://localhost:5193/api/Cart", { credentials: 'include' })
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        const itemContainer = document.querySelector('.item'); 

        // 清空之前的內容
        itemContainer.innerHTML = '';

        console.log(data);


        if (data && data.length > 0) {
            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('content');
                itemElement.innerHTML = `
                    <p>品名：${item.itemName}</p>
                    <p>規格：${item.space} / ${item.color}</p>
                    <p>數量：${item.itemNum}</p>
                    <p>單價：${item.itemPrice} <a href=""><img src="image/trash.png" alt=""></a></p>
                `;
                itemContainer.appendChild(itemElement);
            });
        }
        
        

    })
    .catch(error => {
        console.error('發生錯誤:', error);
    });

