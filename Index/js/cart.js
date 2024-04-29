
const numberWithCommas = (number) => {
    return number.toLocaleString(undefined, { maximumFractionDigits: 0 });
};

// 在 fetch 請求中使用 fetch API 從 API 端點獲取購物車項目並將它們呈現在頁面上
fetch("http://localhost:5193/api/Cart", { credentials: 'include' })
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        const itemContainer = document.querySelector('.item');

        itemContainer.innerHTML = '';

        console.log(data);
        let total = 0;

        if (data && data.length <= 0) {
            const button = document.getElementById("button");
            const fare = document.getElementById("fare");
            const totalElement = document.getElementById("total"); // 更正此處的變數名稱以避免與上面的 total 變數衝突
            button.style.display = 'none';
            fare.style.display = 'none';
            totalElement.style.display = 'none';

            const main = document.querySelector('.main');
            const none = document.createElement('h1');
            none.id = 'none';
            none.textContent = "購物車無商品";
            main.appendChild(none);
        }

        if (data && data.length > 0) {
            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('content');
                money=numberWithCommas(item.itemPrice)

                itemElement.innerHTML = `
                    <p>品名：${item.itemName}</p>
                    <p>規格：${item.space} / ${item.color}</p>
                    <div id="numbox">
                        <p>數量：</p>
                        <div class="numbox" >
                            <button class="min" type="button" > - </button>
                            <input class="num" type="number" id="val_${item.id}" value="${item.itemNum}"/>
                            <button class="plus" type="button" > + </button>
                        </div>                        
                    </div>

                    <p>單價：${money} <a href="" class="delete"><img src="image/trash.png" alt="" class="delete"></a></p>
                `;

                const minButton = itemElement.querySelector('.min');
                const plusButton = itemElement.querySelector('.plus');
                const numInput = itemElement.querySelector('.num');

                                // 監聽輸入框的 input 事件，以實現輸入數量時即時更新
                                numInput.addEventListener('input', function(event) {
                                    event.preventDefault(); 
                                    const Id = item.id;
                                    const Num = parseInt(numInput.value);
                                    
                                    // 更新後端購物車項目的數量
                                    fetch(`http://localhost:5193/api/Cart/UpdateItemNum`, { 
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ Id: Id, itemNum: Num }), // 使用更新後的數量
                                        credentials: 'include'
                                    })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('伺服器回應錯誤');
                                        }
                                        return response.json();
                                    })
                                    .then(data => {
                                        // 成功更新後，同步更新介面顯示的數量
                                        console.log("數量更新成功:", Num);
                                        location.reload();
                                    })
                                    .catch(error => {
                                        console.error('發生錯誤:', error);
                                    });
                                });

                                


                plusButton.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    const Id = item.id;
                    let Num = parseInt(document.getElementById(`val_${item.id}`).value);
                    
                    // 執行增加數量的操作
                    Num++;
                    
                    // 更新後端購物車項目的數量
                    fetch(`http://localhost:5193/api/Cart/UpdateItemNum`, { 
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ Id: Id, itemNum: Num }), // 使用更新後的數量
                        credentials: 'include'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('伺服器回應錯誤');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // 成功更新後，同步更新介面顯示的數量
                        const numInput = itemElement.querySelector('.num');
                        numInput.value = Num; // 將輸入框的值設置為更新後的數量
                        console.log(Num);
                        var status = data.Status;
                            if(status === 200){
                                //alert('修改成功')
                                location.reload();
                            }else{
                                console.error('修改失敗', data.Message);
                                alert('失敗：'+ data.Message);
                                numInput.value = Num -1; 
                                  
                            }
                        //location.reload();
                    })
                    .catch(error => {
                        console.error('發生錯誤:', error);
                    });
                });
                
                minButton.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    const Id = item.id;
                    let Num = parseInt(document.getElementById(`val_${item.id}`).value);
                    
                    // 執行減少數量的操作
                    if (Num > 1) {
                        Num--;
                        
                        // 更新後端購物車項目的數量
                        fetch(`http://localhost:5193/api/Cart/UpdateItemNum`, { 
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ Id: Id, itemNum: Num }), // 使用更新後的數量
                            credentials: 'include'
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('伺服器回應錯誤');
                            }
                            return response.json();
                        })
                        .then(data => {
                            // 成功更新後，同步更新介面顯示的數量
                            const numInput = itemElement.querySelector('.num');
                            numInput.value = Num; // 將輸入框的值設置為更新後的數量
                            console.log(Num);
                            var status = data.Status;
                            if(status === 200){
                                //alert('修改成功')
                                location.reload();
                            }else{
                                console.error('修改失敗', data.Message);
                                alert('失敗：'+ data.Message);
                                  
                            }
                            //location.reload();
                        })
                        .catch(error => {
                            console.error('發生錯誤:', error);
                        });
                    }
                });
                


                const deleteButton = itemElement.querySelector('.delete');

                deleteButton.addEventListener('click', function(event) {
                    event.preventDefault(); 

                    console.log("123");

                    const Id = item.id;

                    console.log(Id);
                    fetch(`http://localhost:5193/api/Cart`, { 
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ Id: Id}),
                        credentials: 'include'
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('伺服器回應錯誤');
                            }
                            return response.json();
                        })

                        .then(data => {
                            console.log("已刪除商品");
                            alert('已刪除商品');
                            location.reload();
                        })
                        .catch(error => {
                            console.error('發生錯誤:', error);
                        });
                });
                total += item.itemPrice * item.itemNum;
                itemContainer.appendChild(itemElement);
            });
        }
        console.log(total);
        const h2 = document.querySelector(".total");
        total_money=numberWithCommas(total)
        h2.textContent = `總計：$${total_money}`;
    })
    .catch(error => {
        console.error('發生錯誤:', error);
        // alert('請先登入');  
        // window.location.href = './login.html';
    });
