
document.getElementById('registerForm').addEventListener('submit', function(event) {
    
    event.preventDefault(); 

   const formData = new FormData(this); 

    const jsonData = {};
    formData.forEach((value, key) => {
        sonData[key] = value;
    });

    const url = "http://localhost:5193/api/Member/Register"; 

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData), 
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('伺服器回應錯誤');
                }
                return response.json(); 
            })
            .then(data => {
                console.log(data);
                alert('註冊成功！');
            })
            .catch(error => {
                console.error('發生錯誤:', error);
            });
        });