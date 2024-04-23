async function getALLProduct(sortway){
    await fetch(`http://localhost:5193/api/Paradise?sortway=${sortway}`,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'include'
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed')
        }
        return response.json();
    })
    .then(data=>{
        data.Message.forEach(item => {
            ShowProduct(item);
        });
    })
    .catch(error=>{
        console.log(error)
    })
}

async function getHotProduct(sortway){
    await fetch(`http://localhost:5193/api/Paradise/Hot?sortway=${sortway}`,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'include'
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed')
        }
        return response.json();
    })
    .then(data=>{
        data.Message.forEach(item => {
            ShowProduct(item);
        });
    })
    .catch(error=>{
        console.log(error)
    })
}

async function getProductByBrand(sortway,Brand){
    await fetch(`http://localhost:5193/api/Paradise/${Brand}?sortway=${sortway}`,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'include'
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed')
        }
        return response.json();
    })
    .then(data=>{
        data.Message.forEach(item => {
            ShowProduct(item);
        });
    })
    .catch(error=>{
        console.log(error)
    })
}

async function getProductByPrice(sortway,MaxPrice,MinPrice){
    var url;
    if (MinPrice != null && MaxPrice != null) {
        url = `http://localhost:5193/api/Paradise/GetProduct?MaxPrice=${MaxPrice}&MinPrice=${MinPrice}&sortway=${sortway}`;
    } else if (MinPrice != null) {
        url = `http://localhost:5193/api/Paradise/GetProduct?MinPrice=${MinPrice}&sortway=${sortway}`;
    } else if (MaxPrice != null) {
        url = `http://localhost:5193/api/Paradise/GetProduct?MaxPrice=${MaxPrice}&sortway=${sortway}`;
    }
    await fetch(url,{
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'include'
    })
    .then(response=>{
        if(!response.ok){
            throw new Error('Failed')
        }
        return response.json();
    })
    .then(data=>{
        data.Message.forEach(item => {
            ShowProduct(item);
        });
    })
    .catch(error=>{
        console.log(error)
    })
}

function ShowProduct(data){
    const show = document.getElementById('product_show');
    const a = document.createElement('a');
    a.href = `./product.html?ItemId=${data.ItemId}`;
    a.className = 'product'
    const div = document.createElement('div')
    const img = document.createElement('img');
    img.src = `image/i15.png`
    img.alt = "商品圖片";
    const infoDiv = document.createElement('div');
    const h4 = document.createElement('h4');
    h4.textContent = `【${data.Brand}】`;
    const h3 = document.createElement('h3');
    h3.textContent = data.ItemName;
    const p = document.createElement('p');  
    p.textContent = `NT$${data.ItemPriceMin}起`;
    infoDiv.appendChild(h4);
    infoDiv.appendChild(h3);
    infoDiv.appendChild(p);
    div.appendChild(img);
    div.appendChild(infoDiv);
    a.appendChild(div);
    show.appendChild(a);
}

function getsort(value,Brand,MaxPrice,MinPrice) {
    let sortway = sortBtn.value;
    getProduct(value, sortway,Brand,MaxPrice,MinPrice);
}

function getProduct(value,sortway,Brand,MaxPrice,MinPrice){
    const h2 = document.querySelector('#product_title h2');
    const show = document.getElementById('product_show');
    switch(value){
        case 1:
            show.innerHTML = '';
            h2.textContent = "HOT 熱銷商品"
            getHotProduct(sortway);
            break;
        case 2:
            show.innerHTML = '';
            h2.textContent = Brand
            getProductByBrand(sortway,Brand);
            break;
        case 3:
            show.innerHTML = '';
            console.log(MaxPrice,MinPrice)
            if (MinPrice != null && MaxPrice != null) {
                h2.textContent = `${MinPrice}~${MaxPrice}`;
            } else if (MaxPrice != null) {
                h2.textContent = "50,000以下";
            } else if (MinPrice != null) {
                h2.textContent = "40,000以上";
            }
            getProductByPrice(sortway,MaxPrice,MinPrice)
            break;
        default:
            show.innerHTML = '';
            h2.textContent = "ALL 所有商品"
            getALLProduct(sortway);
            break;
    }
}

const sortBtn = document.getElementById('sort');
let value = 0;
function handleSortChange() {
    const show = document.getElementById('product_show');
    show.innerHTML = '';
    sortway = sortBtn.value;
    getProduct(value, sortway);
}

window.onload = function(){
    const All = document.getElementById('ALLProduct');
    getsort(value);
    sortBtn.addEventListener('change', handleSortChange);
    All.addEventListener('click', function(event){
        sortBtn.removeEventListener('change', handleSortChange);
        sortBtn.addEventListener('change', handleSortChange);
        event.preventDefault();
        value = 0;
        getsort(value);
    })
    const Hot = document.getElementById('HotProduct');
    Hot.addEventListener('click',function(event){
        sortBtn.removeEventListener('change', handleSortChange);
        sortBtn.addEventListener('change', handleSortChange);
        event.preventDefault();
        value = 1;
        getsort(value);
    })
    const brandA = document.querySelectorAll('#sidebar_Brand a');
    brandA.forEach(a=>{
        a.addEventListener('click',function(event){
            event.preventDefault();
            const Brand = a.getAttribute('dataset');
            sortBtn.removeEventListener('change', handleSortChange);
            sortBtn.addEventListener('change', handleSortChange);
            value = 2;
            getsort(value,Brand);
        })
    })
    const PriceDiv = document.querySelectorAll('#sidebar_Price a');
    PriceDiv.forEach(a=>{
        a.addEventListener('click',function(event){
            event.preventDefault();
            const MaxPrice = a.getAttribute('data-MaxPrice');
            const MinPrice = a.getAttribute('data-MinPrice');
            sortBtn.removeEventListener('change', handleSortChange);
            sortBtn.addEventListener('change', handleSortChange);
            value = 3;
            getsort(value,'',MaxPrice,MinPrice);
        })
    })
}