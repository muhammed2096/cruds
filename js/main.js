let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;


// console.log(title, price, taxes, ads, discount, total, count, category, submit);
// get total

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// create 

let productsData;
if(localStorage.product != null){
    productsData = JSON.parse(localStorage.product)
}else{
    productsData = [];
}




submit.onclick = function(){
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if(title.value != '' && price.value != '' && category.value != '' && productsData.count < 100){
       if(mood === 'create'){
        if(newProduct.count > 1){
        for(let i = 0; i < newProduct.count; i++){
            productsData.push(newProduct);
        }
    }else{ 
         productsData.push(newProduct); 

         }
    }else{
        productsData[tmp] = newProduct;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
       
    } 
     clearData()
    }
    
    
   
    localStorage.setItem('product', JSON.stringify(productsData));
  
    displayProduct()
}

// clear data

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    total.innerHTML = '';
    category.value = '';

}

// display product

function displayProduct(){
        let box = ''; 
        for(let i = 0; i < productsData.length; i++){
            box += `
            <tr>
            <td>${i+1}</td>
            <td>${productsData[i].title}</td>
            <td>${productsData[i].price}</td>
            <td>${productsData[i].taxes}</td>
            <td>${productsData[i].ads}</td>
            <td>${productsData[i].discount}</td>
            <td>${productsData[i].total}</td>
            <td>${productsData[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
            
            `;
        }
        document.getElementById('tbody').innerHTML = box;
        let btnDelete = document.getElementById('deleteAll');
        if(productsData.length > 0){
             btnDelete.innerHTML = `
             <button onclick="deleteAll()">Delete All (${productsData.length})</button>
             `
        }
        getTotal()
}
displayProduct()

// delete product

function deleteProduct(i){
    productsData.splice(i,1);
    localStorage.product = JSON.stringify(productsData);
    displayProduct()
}
function deleteAll(){
    localStorage.clear();
    productsData.splice(0);
    displayProduct()
}

// update product 

function updateProduct(i){
    title.value = productsData[i].title;
    price.value = productsData[i].price;
    taxes.value = productsData[i].taxes;
    ads.value = productsData[i].ads;
    discount.value = productsData[i].discount;
    category.value = productsData[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    }) 
}

// search

let searchMood  = 'title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood  = 'title';
        search.placeholder = 'Search by Title'
    }else{
        searchMood  = 'category';
        search.placeholder = 'Search by Category'
    }
    search.focus()
    search.value = '';
    displayProduct()
}

function searchProduct(value){
    let box = '';
    if(searchMood == 'title'){
       for(let i = 0; i < productsData.length; i++){
        if(productsData[i].title.includes(value.toLowerCase())){
            box += `
            <tr>
            <td>${i+1}</td>
            <td>${productsData[i].title}</td>
            <td>${productsData[i].price}</td>
            <td>${productsData[i].taxes}</td>
            <td>${productsData[i].ads}</td>
            <td>${productsData[i].discount}</td>
            <td>${productsData[i].total}</td>
            <td>${productsData[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
            
            `;
        }
       }
    }else{
        for(let i = 0; i < productsData.length; i++){
            if(productsData[i].category.includes(value.toLowerCase())){
                box += `
                <tr>
                <td>${i+1}</td>
                <td>${productsData[i].title}</td>
                <td>${productsData[i].price}</td>
                <td>${productsData[i].taxes}</td>
                <td>${productsData[i].ads}</td>
                <td>${productsData[i].discount}</td>
                <td>${productsData[i].total}</td>
                <td>${productsData[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>
                
                `;
            }
           }
    }
    document.getElementById('tbody').innerHTML = box;
}