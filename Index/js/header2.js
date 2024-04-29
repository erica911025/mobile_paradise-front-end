function checkLoginStatus(){
    const token = getCookies("Token");
    if(token){
        return true;
    }
    return false;
}

function getCookies(name){
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            console.log("成功");
            return cookieValue;
        }
    }
    console.log('失敗');
    return null;
}

function updateHeader(){
    var isLoginInfo = checkLoginStatus();
    if(isLoginInfo){
        BtnDisplayNone();
        SetUserBtn();
        SetLogoutBtn();
    }
}

function BtnDisplayNone(){
    const Loginbtn = document.querySelector('.header .nav2:nth-child(3)');
    const Registerbtn = document.querySelector('.header .nav2:nth-child(4)');
    Loginbtn.style.display = "none";
    Registerbtn.style.display = "none";
}

function SetUserBtn(){
    const navMain = document.querySelector('.header:nth-child(2) .nav_main');
    const navUserDiv = document.createElement('div');
    navUserDiv.className = "nav2";
    const navUser = document.createElement('a');
    navUser.href = "./order.html";
    const UserBtn = document.createElement('img');
    UserBtn.src = "./image/user.png";
    navMain.appendChild(navUserDiv);
    navUserDiv.appendChild(navUser);
    navUser.appendChild(UserBtn);
}

