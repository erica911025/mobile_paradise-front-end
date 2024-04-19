fetch("http://localhost:5193/api/Cart/GetOrderItem",{credentials: 'include'})
    .then(response => {
        if (!response.ok) {
            throw new Error('伺服器回應錯誤');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        const tableRows = document.querySelectorAll("tr .tbody"); // 更正選擇器
        if (data.Message && data.Message.length > 0) {
            data.Message.forEach((Order, index) => {
                const row = tableRows[index];
                row.innerHTML = `
                    <td>${Order.OrderId}</td>
                    <td>${Order.OrderDate}</td> 
                    <td>${Order.TotalPrice}</td>
                    <td>${Order.OrderStatus}</td>
                    <td>
                        <input type="submit" value="查詢" class="button2 ">
                    </td>
                    <td>
                        <input type="button" value="完成" class="buttonOK_not ">
                    </td>                
                `;
            });
        }
    })
    .catch(error => {
        console.error('發生錯誤:', error.message); // 更詳細的錯誤訊息
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
