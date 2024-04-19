fetch("http://localhost:5193/api/Cart/GetOrderItem", { credentials: 'include' })
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        console.log("123");
        
        const tableBody = document.querySelector("table tbody");
        if (data && data.length > 0) {
            data.forEach(order => {
                const newRow = document.createElement('tr');
                newRow.classList.add('tbody');
                newRow.innerHTML = `
                    <td>${order.orderId}</td>
                    <td>${order.orderTime ? formatDateTime(order.orderTime) : ''}</td>
                    <td>${order.totalPrice}</td>
                    <td>${order.orderStatus}</td>
                    <td>
                        <input type="submit" value="查詢" class="button2" data-OrderId="${order.orderId}">
                    </td>
                    <td>
                        <input type="button" value="完成" class="buttonOK_not">
                    </td>                
                `;
                tableBody.appendChild(newRow);
            });
        }

        const detailButtons = document.querySelectorAll('.button2');

        detailButtons.forEach(button => {

            button.addEventListener('click', function() {
                const OrderId = button.dataset.OrderId;

                console.log(OrderId)
                console.log("123")

                fetch(`http://localhost:5193/api/Cart/GetOrderItemId?OrderId=${OrderId}`, { credentials: 'include' })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('伺服器回應錯誤');
                        }
                        return response.json();
                    })
                    
                    .then(data => {
                        const modalContent = document.querySelector('.modal-content');
                        modalContent.innerHTML = `
                            <span class="close">&times;</span>
                            <form>
                                <div>
                                    <h2>訂購商品：</h2>
                                </div>
                                <div class="create">
                                    <div id="field1"><p>品牌：${data[0].brand}</p></div>
                                    <div id="field2"><p>型號：${data[0].itemName}</p></div>
                                    <div id="field3"><p>顏色：${data[0].color}</p></div>
                                    <div id="field4"><p>容量：${data[0].space}</p></div>
                                </div>
                                <div>
                                    <h2>會員資訊：</h2>
                                </div>
                                <div class="create">
                                    <div id="field5"><p>會員姓名：${data[0].name}</p></div>
                                    <div id="field6"><p>電話號碼：${data[0].cellphone}</p></div>
                                    <div id="field7"><p>電子信箱：${data[0].email}</p></div>
                                    <div id="field8"><p>會員地址：${data[0].address}</p></div>
                                </div>
                            </form>
                        `;
                        modal.style.display = "block";
                    })
                    .catch(error => {
                        console.error('發生錯誤:', error.message);
                    });
            });
        });

    })
    .catch(error => {
        console.error('發生錯誤:', error.message);
    });

function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    const date = ('0' + dateTime.getDate()).slice(-2);
    const hours = ('0' + dateTime.getHours()).slice(-2);
    const minutes = ('0' + dateTime.getMinutes()).slice(-2);
    const seconds = ('0' + dateTime.getSeconds()).slice(-2);
    const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}
