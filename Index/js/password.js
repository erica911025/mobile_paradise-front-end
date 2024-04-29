document.getElementById('ChangePasswordForm').addEventListener('submit', function(event) {

    event.preventDefault(); 
    const formData = new FormData(this); 

    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    const url = "http://localhost:5193/api/Member/ChangePassword"; 

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(jsonData), // 將表單資料轉換成 JSON 字串送出
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('伺服器回應錯誤');
                }
                return response.json(); // 解析回傳的 JSON
            })
            .then(data => {
                // 在這裡處理從後端收到的回應
                console.log(data);
                // 可以在這裡添加一些反饋給使用者的動作，例如顯示註冊成功訊息或導向其他頁面
                alert('修改密碼成功！');
                location.reload();
            })
            .catch(error => {
                // 處理錯誤
                console.error('發生錯誤:', error);
            });
        });

        function togglePasswordVisibility() {
            var passwordInput1 = document.getElementsByName("OldPassword")[0];
            var toggleIcon = document.getElementById("toggleIcon1");
            
            if (passwordInput1.type === "password") {
                passwordInput1.type = "text";
                toggleIcon.src = "./image/view.png";
            } else {
                passwordInput1.type = "password";
                toggleIcon.src = "./image/hide.png";
            }
        }

        function togglePasswordVisibility2() {
            var passwordInput2 = document.getElementsByName("NewPassword")[0];
            var toggleIcon = document.getElementById("toggleIcon2");
            
            if (passwordInput2.type === "password") {
                passwordInput2.type = "text";
                toggleIcon.src = "./image/view.png";
            } else {
                passwordInput2.type = "password";
                toggleIcon.src = "./image/hide.png";
            }
        }
        function togglePasswordVisibility3() {
            var passwordInput3 = document.getElementsByName("NewPasswordCheck")[0];
            var toggleIcon = document.getElementById("toggleIcon3");
            
            if (passwordInput3.type === "password") {
                passwordInput3.type = "text";
                toggleIcon.src = "./image/view.png";
            } else {
                passwordInput3.type = "password";
                toggleIcon.src = "./image/hide.png";
            }
        }