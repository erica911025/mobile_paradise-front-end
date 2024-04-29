const form = document.querySelector('.form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('.text[name="username"]').value;
    const email = document.querySelector('.text[name="email"]').value;

    fetch('http://localhost:5193/api/Member/ForgetPasswod', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Email: email, Account1: username }),
        credentials: 'include'
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('輸入錯誤');
        }
        return response.json();
    })

    .then(data => {
        var status = data.Status;
        if (status === 200) {
            alert('傳送成功，請至電子信箱收件')
            window.location.href = './login.html';
        } else {
            console.error('登入失敗', data.Message);
            alert('輸入錯誤，請檢查您的帳號和電子郵件');
        }
    })

    .catch(error => {
        console.error('登入失敗:', error.message);
        alert('輸入錯誤，請檢查您的帳號和電子郵件');
    });

}); 
