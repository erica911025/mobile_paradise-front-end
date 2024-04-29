
const numberWithCommas = (number) => {
    return number.toLocaleString(undefined, { maximumFractionDigits: 0 });
};


async function getALLProduct(sortway, nowPage) {
    await fetch(`http://localhost:5193/api/Paradise/?sortway=${sortway}&nowPage=${nowPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed')
            }
            return response.json();
        })
        .then(data => {
            data.Message.forEach(Items => {
                ShowProduct(Items, sortway);
            });
        })
        .catch(error => {
            console.log(error)
        })
}

async function getHotProduct(sortway) {
    await fetch(`http://localhost:5193/api/Paradise/Hot?sortway=${sortway}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed')
            }
            return response.json();
        })
        .then(data => {
            data.Message.forEach(item => {
                ShowProductHot(item,sortway);
            });
        })
        .catch(error => {
            console.log(error)
        })
}

async function getProductByBrand(sortway, Brand, nowPage) {
    await fetch(`http://localhost:5193/api/Paradise/${Brand}?sortway=${sortway}&nowPage=${nowPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed')
            }
            return response.json();
        })
        .then(data => {
            data.Message.forEach(item => {
                console.log("getProductByBrand", sortway)
                ShowProduct(item, sortway);
            });
        })
        .catch(error => {
            console.log(error)
        })
}

async function getProductByPrice(sortway, MaxPrice, MinPrice, nowPage) {
    var url;
    console.log(value,MaxPrice,MinPrice)
    if (MinPrice != null && MaxPrice != null) {
        MaxPrice = numberWithCommas(MaxPrice); // 將最大價格轉換為千分位格式
        MinPrice = numberWithCommas(MinPrice); // 將最小價格轉換為千分位格式
        url = `http://localhost:5193/api/Paradise/GetProduct?MaxPrice=${MaxPrice}&MinPrice=${MinPrice}&sortway=${sortway}&nowPage=${nowPage}`;
    } else if (MinPrice != null) {
        MinPrice = numberWithCommas(MinPrice); // 將最小價格轉換為千分位格式
        url = `http://localhost:5193/api/Paradise/GetProduct?MinPrice=${MinPrice}&sortway=${sortway}&nowPage=${nowPage}`;
    } else if (MaxPrice != null) {
        MaxPrice = numberWithCommas(MaxPrice); // 將最大價格轉換為千分位格式
        url = `http://localhost:5193/api/Paradise/GetProduct?MaxPrice=${MaxPrice}&sortway=${sortway}&nowPage=${nowPage}`;
    }
    await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed')
            }
            return response.json();
        })
        .then(data => {
            data.Message.forEach(item => {
                console.log("getProductByPrice_sortway", sortway)
                ShowProduct(item, sortway);
            });
        })
        .catch(error => {
            console.log(error)
        })
}


async function ShowProductHot(data) {

    var price=numberWithCommas(data.ItemPriceMin);

    const show = document.getElementById('product_show');
    const a = document.createElement('a');
    a.href = `./product.html?ItemId=${data.ItemId}`;
    a.className = 'product'
    const div = document.createElement('div')
    const img = document.createElement('img');
    img.src = `image/${data.ItemImg}`
    img.alt = "商品圖片";
    const infoDiv = document.createElement('div');
    const h4 = document.createElement('h4');
    h4.textContent = `【${data.Brand}】`;
    const h3 = document.createElement('h3');
    h3.textContent = data.ItemName;
    const p = document.createElement('p');
    p.textContent = `NT$${price}起`;
    infoDiv.appendChild(h4);
    infoDiv.appendChild(h3);
    infoDiv.appendChild(p);
    div.appendChild(img);
    div.appendChild(infoDiv);
    a.appendChild(div);
    show.appendChild(a);
    
    const page = document.getElementById('page');
    page.innerHTML = ''; // 清空分頁控制項，以防止重複添加


}

async function ShowProduct(data) {

    data.Items.forEach(item => {
        var price=numberWithCommas(item.ItemPriceMin);

        const show = document.getElementById('product_show');
        const a = document.createElement('a');
        a.href = `./product.html?ItemId=${item.ItemId}`;
        a.className = 'product'
        const div = document.createElement('div')
        const img = document.createElement('img');
        img.src = `image/${item.ItemImg}`
        img.alt = "商品圖片";
        const infoDiv = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.textContent = `【${item.Brand}】`;
        const h3 = document.createElement('h3');
        h3.textContent = item.ItemName;
        const p = document.createElement('p');
        p.textContent = `NT$${price}起`;
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
        
        link.href = '#';
        link.textContent = pageNumber;
        if (pageNumber === currentPage) {
            link.style.fontWeight = 'bold'; // 標記當前頁碼
        }
        return link;
    };

    const addPageLink = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= maxPage) {
            const link = createPageLink(pageNumber);
            link.className = 'Page';
            link.addEventListener('click',function(){
                nowPage = link.textContent;
                getsort(value, Brand, MaxPrice, MinPrice);
            })
            page.appendChild(link);
        }
    };

    const addNavigationLink = (pageNumber, text) => {
        const link = createPageLink(pageNumber);
        link.textContent = text;
        link.addEventListener('click',function(){
            nowPage = pageNumber;
            getsort(value, Brand, MaxPrice, MinPrice);
        })
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

async function getsort(value, Brand, MaxPrice, MinPrice) {
    let sortway = sortBtn.value;
    getProduct(value, sortway, Brand, MaxPrice, MinPrice, nowPage);
}

async function getProduct(value, sortway, Brand, MaxPrice, MinPrice, nowPage) {
    const h2 = document.querySelector('#product_title h2');
    const a = document.querySelector('.path a:nth-child(5)')
    const show = document.getElementById('product_show');
    value = parseInt(value);
    switch (value) {
        case 1:
            show.innerHTML = '';
            a.textContent = "HOT 熱銷商品"
            h2.textContent = "HOT 熱銷商品"
            getHotProduct(sortway);
            break;
        case 2:
            show.innerHTML = '';
            a.textContent = Brand
            h2.textContent = Brand
            getProductByBrand(sortway, Brand, nowPage);
            break;
        case 3:
            show.innerHTML = '';
            console.log(MaxPrice, MinPrice)
            if (MinPrice != null && MaxPrice != null) {
                max=parseInt(MaxPrice);
                min=parseInt(MinPrice);
                var Max = numberWithCommas(max); // 將最大價格轉換為千分位格式
                var Min = numberWithCommas(min); // 將最小價格轉換為千分位格式
                MinPrice.toLocaleString(undefined, { maximumFractionDigits: 0 });
                console.log("123",Min);
                console.log("123",Max);

                a.textContent = `${Min}~${Max}`;
                h2.textContent = `${Min}~${Max}`;
            } else if (MaxPrice != null) {
                a.textContent = "5,000以下"
                h2.textContent = "5,000以下";
            } else if (MinPrice != null) {
                a.textContent = "40,000以上"
                h2.textContent = "40,000以上";
            }
            getProductByPrice(sortway, MaxPrice, MinPrice, nowPage)
            break;
        default:
            show.innerHTML = '';
            a.textContent = "ALL 所有商品"
            h2.textContent = "ALL 所有商品";
            getALLProduct(sortway, nowPage);
            break;
    }
}

const sortBtn = document.getElementById('sort');
let value;
let Brand;
let MaxPrice;
let MinPrice;
let nowPage = 1;
function handleSortChange() {
    const show = document.getElementById('product_show');
    show.innerHTML = '';
    sortway = sortBtn.value;
    nowPage = 1;
    console.log(value, sortway, Brand, MaxPrice, MinPrice, nowPage)
    getProduct(value, sortway, Brand, MaxPrice, MinPrice, nowPage);
}

window.onload = function() {
    const UrlParams = new URLSearchParams(window.location.search);
    value = UrlParams.get('value');
    Brand = UrlParams.get('brand');
    getsort(value, Brand, MaxPrice, MinPrice);
    sortBtn.addEventListener('change', handleSortChange);
    const All = document.getElementById('ALLProduct');
    All.addEventListener('click', function(event) {
        window.scrollTo(0, 0);
        sortBtn.removeEventListener('change', handleSortChange);
        sortBtn.addEventListener('change', handleSortChange);
        event.preventDefault();
        value = 0;
        nowPage = 1; // 獲取當前頁碼
        getsort(value, '', '', '', '', nowPage);
    })
    const Hot = document.getElementById('HotProduct');
    Hot.addEventListener('click', function(event) {
        window.scrollTo(0, 0);
        sortBtn.removeEventListener('change', handleSortChange);
        sortBtn.addEventListener('change', handleSortChange);
        event.preventDefault();
        value = 1;
        getsort(value, '', '', '', '', '');
    })
    const brandA = document.querySelectorAll('#sidebar_Brand a');
    brandA.forEach(a => {
        a.addEventListener('click', function(event) {
            window.scrollTo(0, 0);
            event.preventDefault();
            Brand = a.getAttribute('dataset');
            sortBtn.removeEventListener('change', handleSortChange);
            sortBtn.addEventListener('change', handleSortChange);
            value = 2;
            nowPage = 1;
            getsort(value, Brand, '', '', '', nowPage);
        })
    })
    const PriceDiv = document.querySelectorAll('#sidebar_Price a');
    PriceDiv.forEach(a => {
        a.addEventListener('click', function(event) {
            window.scrollTo(0, 0);
            event.preventDefault();
            MaxPrice = a.getAttribute('data-MaxPrice');
            MinPrice = a.getAttribute('data-MinPrice');
            sortBtn.removeEventListener('change', handleSortChange);
            sortBtn.addEventListener('change', handleSortChange);
            value = 3;
            nowPage = 1; // 獲取當前頁碼
            getsort(value, '', MaxPrice, MinPrice, '', nowPage);
        })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    const sidebarBrand = document.getElementById('sidebar_Brand');
    const sidebarPrice = document.getElementById('sidebar_Price');
    const Brand = document.getElementById('_Brand');
    const Price = document.getElementById('_Price');
    const Classification = document.getElementById('Classification');
    const sidebar = document.getElementById('sidebar');
    const downArrow = document.getElementById('down');
    const upArrow = document.getElementById('up');


    sidebarBrand.addEventListener('click', function() {
        toggleSidebarContent(Brand);
    });

    sidebarPrice.addEventListener('click', function() {
        toggleSidebarContent(Price);
    });

    Classification.addEventListener('click', function() {
        toggleSidebarContent(sidebar);
        toggleArrowVisibility();
    });


    function toggleSidebarContent(sidebar) {

        const isCollapsed = sidebar.classList.contains('collapsed');


        if (isCollapsed) {
            sidebar.classList.remove('collapsed');
        } else {
            sidebar.classList.add('collapsed');
        }
    }

    
    const left = document.getElementById('left');
    const closeBtn = document.getElementById('close');
    const screenWidth = window.innerWidth;
    closeBtn.style.display = 'block';

    console.log("close");
    let isCollapsed = true; 
closeBtn.addEventListener('click', function(event) {
    if (screenWidth > 576) {
        closeBtn.style.display = 'block';
        
            event.preventDefault();
            left.style.display = isCollapsed ? 'none' : 'block';
            isCollapsed = !isCollapsed; 
            console.log("123");
        
    } else {
        closeBtn.style.display = 'none';
        left.style.display = 'block';
        Classification.style.display = 'block';
    }
});

function toggleArrowVisibility() {
    const screenWidth = window.innerWidth;
    const downArrow = document.getElementById('down');
    const upArrow = document.getElementById('up');
    const Classification = document.getElementById('Classification');
    
    if (screenWidth <= 576) { 
        Classification.style.display = 'block'; 
        if (downArrow.style.display === 'none') {
            downArrow.style.display = 'block'; 
            upArrow.style.display = 'none'; 
        } else {
            downArrow.style.display = 'none'; 
            upArrow.style.display = 'block'; 
        }
    }
    else {
        Classification.style.display = 'none'; 
    }
}


toggleArrowVisibility();
window.addEventListener('resize', function() { 
    const Classification = document.getElementById('Classification');
    const screenWidth = window.innerWidth; 
    if (screenWidth > 576) { 
        toggleArrowVisibility();
        Classification.style.display = 'none';
        closeBtn.style.display = 'block';
        
    }
    else{
        left.style.display = 'block';
        closeBtn.style.display = 'none';
        Classification.style.display = 'block';
        
    }

});


});


