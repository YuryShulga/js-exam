let divMainContainer = document.getElementById('taskOutput');
let baseUrl = 'https://fakestoreapi.com/products/';
const dictionary = new Map();
let categorieIdCounter = 1;


$.ajax({
    url: baseUrl + "/categories",
    method: "get",
    dataType: "json",
    success: function(categories){
        categories.forEach(categorie => {
            drawCategorie(categorie);
            
            
        });

        $.ajax({
            url: baseUrl,
            method: "get",
            dataType: "json",
            success: function(products){
                
                products.forEach(product => {
                    drawProduct(product);
                    
                });
                
            }
        
        });
        
    }

});

function drawCategorie(categorie){
    if(dictionary.get(categorie) == undefined){
        dictionary.set(categorie, 'categorie' + categorieIdCounter);
        categorieIdCounter++;
    }

    let divCategorie = document.createElement('div');
    divCategorie.classList.add('divCategorie');
    
    
    let pCategorieTitle = document.createElement('p');
    pCategorieTitle.innerText = 'Категория продуктов: ' + categorie;

    pCategorieTitle.classList.add('commonText');

    

    divCategorie.append(pCategorieTitle);

    let aShowProducts = document.createElement('a');
    aShowProducts.href = '#';
    aShowProducts.innerText = 'Продукты';
    aShowProducts.style.textDecoration = 'none';
    aShowProducts.classList.add('commonText');
    aShowProducts.addEventListener('click', function(){
        if(divProducts.style.display == 'none'){
            divProducts.style.display = 'block';
        }else{
            divProducts.style.display = 'none';
        }
    });
    divCategorie.append(aShowProducts);

    let divProducts = document.createElement('div');
    divProducts.classList.add('divCategorie');
    divProducts.style.display = 'none';
    divProducts.id = dictionary.get(categorie);
    divCategorie.append(divProducts);

    divMainContainer.append(divCategorie);
}

function drawProduct(product){
     let divProduct = document.createElement('div');
     divProduct.classList.add('divProduct');

     let pTitle = document.createElement('p');
     pTitle.classList.add('commonText');
     pTitle.innerText = 'Название: ' + product.title;
     divProduct.append(pTitle);

     let img = document.createElement('img');
     img.src = product.image;
     img.alt = 'изображение продукта';
     divProduct.append(img);

     let pPrice = document.createElement('p');
     pPrice.classList.add('commonText');
     pPrice.innerText = 'Цена: ' + product.price + ' у.е.';
     divProduct.append(pPrice);

     let pRating = document.createElement('p');
     pRating.classList.add('commonText');
     pRating.innerText = 'Рейтинг товара: ' + product.rating.rate + '; количество голосов: ' + product.rating.count;
     divProduct.append(pRating);


     let pDescription = document.createElement('p');
     pDescription.classList.add('commonText');
     pDescription.innerText ='Описание: ' + product.description;
     divProduct.append(pDescription);

     

     document.getElementById(dictionary.get(product.category)).append(divProduct);
}
