import ProductServices from "./../services/product-services.js";
import Product from "./../models/product.js"; 
const services = new ProductServices();
const getId = (id) => document.getElementById(id);


const getListProduct = () => {
  /**
   * Promise (lời hứa)
   *  - Pending: Thời gian chờ thực hiện lời hứa
   *  - Resolve: Thành công
   *  - Reject : Thất bại
   */
  getId("loader").style.display="block";
  const promise = services.getListProductApi();
  promise
    .then((result) => {
       renderListProduct(result.data);
       getId("loader").style.display="none";
    })
    .catch((error) => {
      getId("loader").style.display="none";
      console.log(error);
    });
};

const renderListProduct = (data) => {
    
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    contentHTML += `
      <tr>
            <td>${i + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
              <img src="./../../assets/img/${product.image}" />
            </td>
            <td>${product.description}</td>  
            <td>
            <button class="btn btn-info" data-toggle="modal"
                data-target="#myModal" onclick="onEditProduct(${product.id})" >Edit</button>
            <button class="btn btn-danger" onclick="onDeleteProduct(${product.id})"> Delete </button>
            </td>
      </tr>
     `;
  }
  getId("tblDanhSachSP").innerHTML = contentHTML;
};

getListProduct();

const onDeleteProduct = (id) => {
const promise = services.deleteProductApi(id);

promise
.then((result) => {
   alert(`Delete Product ${result.data.name} Success`)
   getListProduct();
})
.catch((error) => {
console.log(error);

})

}
window.onDeleteProduct=onDeleteProduct;

getId("btnThemSP").onclick = function () {
  //update title
  document.getElementsByClassName("modal-title")[0].innerHTML="Add Product"


  //create button
 

  const btnAdd = `<button class = "btn btn-success" onclick="onAddProduct()">Add</button>`
  document.getElementsByClassName("modal-footer")[0].innerHTML=btnAdd;

 
}

const getValue = () => {
  const name = getId("TenSP").value;
  const price = getId("GiaSP").value;
  const image = getId("HinhSP").value;
  const desc = getId("MoTa").value;
 
  const product = new Product("",name,price,image,desc);
  return product;
 }
 
 const onAddProduct = () => {
   const product = getValue();
   
   const promise = services.addProductApi(product);
   
   promise
     .then((result) => {
      alert(`Adđ product ${result.data.name} success`)
      document.getElementsByClassName("close")[0].click();
     getListProduct();
     })
     .catch((error) => {
       console.log(error);
     })
   };

   window.onAddProduct=onAddProduct;
 

const onEditProduct = (id) => {
 const promise= services.getProductById(id);

 promise
   .then((result) => {
    const product = result.data;
     getId("TenSP").value=product.name;
     getId("GiaSP").value=product.price;
     getId("HinhSP").value=product.image;
     getId("MoTa").value=product.description;
   })
   .catch((error) => {
    console.log(error);
    
   })

 document.getElementsByClassName("modal-title")[0].innerHTML="Edit Product"
 const btnUpdate = `<button class = "btn btn-success" onclick="onUpdateProduct(${id})">Update</button>`
 document.getElementsByClassName("modal-footer")[0].innerHTML=btnUpdate;
};
window.onEditProduct=onEditProduct;



const onUpdateProduct = (id ) => {
const product =getValue();
product.id=id;
console.log(product);

const promise = services.UpdateProductApi(product);
promise
  .then((result) => {
    alert(`Update ${result.data.name} success`)
    document.getElementsByClassName("close")[0].click();
    getListProduct();
  })
  .catch((error) => {
    console.log(error);
    
  })
}
window.onUpdateProduct=onUpdateProduct;