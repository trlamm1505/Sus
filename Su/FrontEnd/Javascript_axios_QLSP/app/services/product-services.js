class ProductServices{
    getListProductApi(){
         /**
   * Promise (lời hứa)
   *  - Pending: Thời gian chờ thực hiện lời hứa
   *  - Resolve: Thành công
   *  - Reject : Thất bại
   */
  const promise = axios({
    url: "https://683fd1e35b39a8039a55bd89.mockapi.io/api/Product",
    method: "GET",
  });
    return promise;
    }


    
    deleteProductApi(id){
     const promise = axios({
        url:`https://683fd1e35b39a8039a55bd89.mockapi.io/api/Product/${id}`,
        method:"DELETE",
     });
     return promise;
    }
    
    addProductApi(product){
      const promise = axios({
        url:"https://683fd1e35b39a8039a55bd89.mockapi.io/api/Product",
        method:"POST",
        data: product,
      });
      return promise;
    }
 
    getProductById(id){
      const promise =axios({
        url:`https://683fd1e35b39a8039a55bd89.mockapi.io/api/Product/${id}`,
        method:"GET",
      });
      return promise;
    }

    UpdateProductApi(product){
      const promise= axios({
        url:`https://683fd1e35b39a8039a55bd89.mockapi.io/api/Product/${product.id}`,
        method:"PUT",
        data: product,
      });
      return promise;
    }
}
export default ProductServices