async function getALLProduct(sortway){
    await fetch(`http://localhost:5193/api/Paradise/?sortway=${sortway}&nowPage=1`,{
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
        data.Message.forEach(Items => {
            console.log(Items);
            console.log("getALLProduct_sortway",sortway)
            ShowProduct(Items,sortway);
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
            console.log(item,"8888");
            console.log("getHotProduc_sortway",sortway)
            ShowProduct_Hot(item,sortway);
        });
    })
    .catch(error=>{
        console.log(error)
    })
}

async function getProductByBrand(sortway,Brand){
    await fetch(`http://localhost:5193/api/Paradise/${Brand}?sortway=${sortway}&nowPage=1`,{
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
            console.log("getProductByBrand",sortway)
            ShowProduct(item,sortway);
        });
    })
    .catch(error=>{
        console.log(error)
    })
}

async function getProductByPrice(sortway,MaxPrice,MinPrice){
    var url;
    if (MinPrice != null && MaxPrice != null) {
        url = `http://localhost:5193/api/Paradise/GetProduct?MaxPrice=${MaxPrice}&MinPrice=${MinPrice}&sortway=${sortway}&nowPage=1`;
    } else if (MinPrice != null) {
        url = `http://localhost:5193/api/Paradise/GetProduct?MinPrice=${MinPrice}&sortway=${sortway}&nowPage=1`;
    } else if (MaxPrice != null) {
        url = `http://localhost:5193/api/Paradise/GetProduct?MaxPrice=${MaxPrice}&sortway=${sortway}&nowPage=1`;
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
            console.log("getProductByPrice_sortway",sortway)
            ShowProduct(item,sortway);
        });
    })
    .catch(error=>{
        console.log(error)
    })
}


async function ShowProduct_Hot(data,sortway){

    console.log("ShowProduct_sortway",sortway);
    console.log("data45645646",data);

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


async function ShowProduct(data,sortway){

    console.log("ShowProduct_sortway",sortway);
    console.log("data",data);
    console.log("data",data.Items);

    data.Items.forEach(item=>{
    const show = document.getElementById('product_show');
    const a = document.createElement('a');
    a.href = `./product.html?ItemId=${item.ItemId}`;
    a.className = 'product'
    const div = document.createElement('div')
    const img = document.createElement('img');
    img.src = `image/i15.png`
    img.alt = "商品圖片";
    const infoDiv = document.createElement('div');
    const h4 = document.createElement('h4');
    h4.textContent = `【${item.Brand}】`;
    const h3 = document.createElement('h3');
    h3.textContent = item.ItemName;
    const p = document.createElement('p');  
    p.textContent = `NT$${item.ItemPriceMin}起`;
    infoDiv.appendChild(h4);
    infoDiv.appendChild(h3);
    infoDiv.appendChild(p);
    div.appendChild(img);
    div.appendChild(infoDiv);
    a.appendChild(div);
    show.appendChild(a);
    });


    
   // 分頁部分
   const page = document.getElementById('page');
   page.innerHTML = ''; // 清空分頁控制項，以防止重複添加

   const maxPage = data.MaxPage; // 總頁數
   const currentPage = data.NowPage; // 當前頁碼

   const createPageLink = (pageNumber) => {
       const link = document.createElement('a');
       link.href = `./product_all.html?sortway=${sortway}&nowPage=${pageNumber}`;
       link.textContent = pageNumber;
       if (pageNumber === currentPage) {
           link.style.fontWeight = 'bold'; // 標記當前頁碼
       }
       return link;
   };

   const addPageLink = (pageNumber) => {
       if (pageNumber > 0 && pageNumber <= maxPage) {
           const link = createPageLink(pageNumber);
           page.appendChild(link);
       }
   };

   const addNavigationLink = (pageNumber, text) => {
       const link = createPageLink(pageNumber);
       link.textContent = text;
       page.appendChild(link);
   };

   // 添加 "<<" 和 "<" 鏈接
   if (currentPage > 1) {
       addNavigationLink(1, '<<');
       addNavigationLink(currentPage - 1, '<');
   }

   // 添加頁碼鏈接
   for (let i = Math.max(1, currentPage - 6); i <= Math.min(maxPage, currentPage + 6); i++) {
       addPageLink(i);
   }

   // 添加 ">" 和 ">>" 鏈接
   if (currentPage < maxPage) {
       addNavigationLink(currentPage + 1, '>');
       addNavigationLink(maxPage, '>>');
   }




    
}

async function getsort(value,Brand,MaxPrice,MinPrice) {
    let sortway = sortBtn.value;
    getProduct(value, sortway,Brand,MaxPrice,MinPrice);
}

async function getProduct(value,sortway,Brand,MaxPrice,MinPrice){
    const h2 = document.querySelector('#product_title h2');
    const show = document.getElementById('product_show');
    value = parseInt(value);
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
                h2.textContent = "5,000以下";
            } else if (MinPrice != null) {
                h2.textContent = "40,000以上";
            }
            getProductByPrice(sortway,MaxPrice,MinPrice)
            break;
        default:
            show.innerHTML = '';
            h2.textContent = "ALL 所有商品";
            getALLProduct(sortway);
            break;
    }
}

const sortBtn = document.getElementById('sort');
let value;
function handleSortChange() {
    const show = document.getElementById('product_show');
    show.innerHTML = '';
    sortway = sortBtn.value;
    getProduct(value, sortway);
}

window.onload = function(){
    const UrlParams = new URLSearchParams(window.location.search);
    value = UrlParams.get('value');
    Brand = UrlParams.get('brand');
    let MaxPrice;
    let MinPrice;
    getsort(value,Brand,MaxPrice,MinPrice);
    sortBtn.addEventListener('change', handleSortChange);
    const All = document.getElementById('ALLProduct');
    All.addEventListener('click', function(event){
        window.scrollTo(0,0);
        sortBtn.removeEventListener('change', handleSortChange);
        sortBtn.addEventListener('change', handleSortChange);
        event.preventDefault();
        value = 0;
        getsort(value);
    })
    const Hot = document.getElementById('HotProduct');
    Hot.addEventListener('click',function(event){
        window.scrollTo(0,0);
        sortBtn.removeEventListener('change', handleSortChange);
        sortBtn.addEventListener('change', handleSortChange);
        event.preventDefault();
        value = 1;
        getsort(value);
    })
    const brandA = document.querySelectorAll('#sidebar_Brand a');
    brandA.forEach(a=>{
        a.addEventListener('click',function(event){
            window.scrollTo(0,0);
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
            window.scrollTo(0,0);
            event.preventDefault();
            MaxPrice = a.getAttribute('data-MaxPrice');
            MinPrice = a.getAttribute('data-MinPrice');
            sortBtn.removeEventListener('change', handleSortChange);
            sortBtn.addEventListener('change', handleSortChange);
            value = 3;
            getsort(value,'',MaxPrice,MinPrice);
        })
    })
}