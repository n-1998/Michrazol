using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Models;
using BL;
using System.Web.Http.Cors;
using System.Web;
using System.IO;
using System.Drawing;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class SaleController : ApiController
    {

        [HttpGet]
        [Route("api/Sale/getProductList/{category}")]
        public HttpResponseMessage GetProductList([FromUri] int category)
        {
            try
            {
                List<Products> productList = new List<Products>();
                productList = Sale.getProductListAccordingToCategory(category);
                return Request.CreateResponse(HttpStatusCode.OK, productList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/loadProductList")]
        public HttpResponseMessage LoadProductList()
        {
            try
            {
                List<Products> productList = new List<Products>();
                productList = Sale.getProductList();
                return Request.CreateResponse(HttpStatusCode.OK, productList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/getCategoriesList")]
        public HttpResponseMessage GetCategoriesList()
        {
            List<Categories> categoriesList = new List<Categories>();
            try
            {
                categoriesList = Sale.getCategoriesList();
                return Request.CreateResponse(HttpStatusCode.OK, categoriesList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/getAllProductsForSale")]
        public HttpResponseMessage GetAllProductsForSale()
        {
            List<ProductForSale> productForSaleList = new List<ProductForSale>();
            try
            {
                productForSaleList = Sale.getAllProductForSale();
                return Request.CreateResponse(HttpStatusCode.OK, productForSaleList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/getCitiesList")]
        public HttpResponseMessage GetCitiesList()
        {
            List<Cities> cityList = new List<Cities>();
            try
            {
                cityList = Sale.getCitiesList();
                return Request.CreateResponse(HttpStatusCode.OK, cityList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/getAreasList")]
        public HttpResponseMessage GetAreasList()
        {
            List<CitiesAreas> areas = new List<CitiesAreas>();
            try
            {
                areas = Sale.getAreasList();
                return Request.CreateResponse(HttpStatusCode.OK, areas);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/getCityListAccordingToArea/{areaId}")]
        public HttpResponseMessage getCityListAccordingToArea([FromUri] int areaId)
        {
            List<Cities> cities = new List<Cities>();
            try
            {
                cities = Sale.getCityListAccordingToArea(areaId);
                return Request.CreateResponse(HttpStatusCode.OK, cities);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/sale/addProductForSale")]
        public HttpResponseMessage AddProductForSale([FromBody] ProductForSale product)
        {
            var p = Sale.addProduct(product);
            if (p != null)
            {
                SendEmail.SendProductForSaleUpdates(p);
                return Request.CreateResponse(HttpStatusCode.Created, p);
            }
            return null;
        }

        [HttpPost]
        [Route("api/uploadImage")]
        public HttpResponseMessage UploadImage()
        {
            try
            {

                int id = Convert.ToInt32(HttpContext.Current.Request.Form["id"]);
                if (HttpContext.Current.Request.Files.Count > 0)
                {

                    for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
                    {
                        string originalFileName = HttpContext.Current.Request.Files[i].FileName;
                        string newFileName = Guid.NewGuid().ToString() + Path.GetExtension(originalFileName);
                        Images img = new Images() { ProductId = id, ImgName = originalFileName, ImgGuid = newFileName };
                        Sale.UploadImage(img);
                        string fullPathAndFileName = HttpContext.Current.Server.MapPath("~/Images/" + newFileName);

                        HttpContext.Current.Request.Files[i].SaveAs(fullPathAndFileName);
                    }

                }

                return Request.CreateResponse(HttpStatusCode.Created, id);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/getUserProductForSale/{userId}")]
        public HttpResponseMessage GetUserProductForSale([FromUri] int userId)
        {
            try
            {
                List<ProductForSale> productList = new List<ProductForSale>();
                productList = Sale.getUserProductForSale(userId);
                return Request.CreateResponse(HttpStatusCode.OK, productList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpDelete]
        [Route("api/Sale/removeProductForSale/{productId}")]
        public HttpResponseMessage DeleteProductForSale([FromUri] int productId)
        {
            try
            {
                Sale.removeProductForSale(productId);
                return Request.CreateResponse(HttpStatusCode.OK, "product for sale removed successfully");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/ProductForSale/getProductById/{productId}")]
        public HttpResponseMessage GetProductForSaleById([FromUri] int productId)
        {
            try
            {
                ProductForSale product;
                product = Sale.getProductForSaleById(productId);
                return Request.CreateResponse(HttpStatusCode.OK, product);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/getProductListWithSameProductType/{productType}")]
        public HttpResponseMessage GetProductListWithSameProductType([FromUri] int productType)
        {
            try
            {
                List<Products> productList = new List<Products>();
                productList = Sale.getProductListAccordingToProductType(productType);
                return Request.CreateResponse(HttpStatusCode.OK, productList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/getSuitableTenderByProductId/{productForSaleId}")]
        public HttpResponseMessage GetSuitableTenderByProductId([FromUri] int productForSaleId)
        {
            try
            {
                List<Tender> tenderList = new List<Tender>();
                tenderList = Sale.getSuitableTenderByProductId(productForSaleId);
                return Request.CreateResponse(HttpStatusCode.OK, tenderList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/getImg/{fileName}")]
        public HttpResponseMessage Get([FromUri]string fileName)
        {
            //string x=Path.Combine(Server.MapPath("~/Images/"), fileName);
            string x = System.Web.HttpContext.Current.Server.MapPath("~/Images/" + fileName);
            string y = Url.Content(string.Format("~/Images/" + fileName + ".GPJ"));
            string fullPathAndFileName = HttpContext.Current.Server.MapPath("~/Images/" + fileName + ".JPG");


            byte[] imageBytes = Convert.FromBase64String(fullPathAndFileName);
            MemoryStream ms = new MemoryStream(imageBytes);
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StreamContent(ms);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/png");
            return response;
        }

        [HttpPost]
        [Route("api/sale/saveSuggestPrice")]
        public HttpResponseMessage SaveSuggestPrice([FromBody] SuggestedPrices suggestedPrices)
        {
            Sale.saveSuggestPrice(suggestedPrices);
            return Request.CreateResponse(HttpStatusCode.Created, "saved");
        }
        [HttpGet]
        [Route("api/Sale/getProductForSaleImages/{productId}")]
        public HttpResponseMessage GetProductForSaleImages([FromUri] int productId)
        {
            try
            {
                List<Images> img = new List<Images>();
                img = Sale.getProductImages(productId);
                return Request.CreateResponse(HttpStatusCode.OK, img);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/sale/EditProductForSale")]
        public HttpResponseMessage EditProductForSale([FromBody] ProductForSale product)
        {
            try
            {
                Sale.EditProduct(product);
                return Request.CreateResponse(HttpStatusCode.Created, "product for sale details saved successfully");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/filterProductForSaleList/{category}/{product}/{city}/{isNew}")]
        public HttpResponseMessage FilterProductForSaleList([FromUri]int category, [FromUri]int product, [FromUri] int city,[FromUri] bool isNew)
        {
            try
            {
                List<ProductForSale> productForSalesList = new List<ProductForSale>();
                productForSalesList= Buy.filterProductForSaleList(category, product, city, isNew);
                return Request.CreateResponse(HttpStatusCode.OK, productForSalesList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
