using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Models;
using BL;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class TenderController : ApiController
    {
        [HttpPost]
        [Route("api/Tender/addTender")]
        public HttpResponseMessage addTender(Tender tender)
        {
            return Request.CreateResponse(HttpStatusCode.Created, Buy.addTender(tender));
        }
        [HttpGet]
        [Route("api/Sale/getUserTendersList/{userId}")]
        public HttpResponseMessage getUserTendersList([FromUri] int userId)
        {
            try
            {
                List<Tender> tenderList = new List<Tender>();
                tenderList = Sale.getUserTendersList(userId);
                return Request.CreateResponse(HttpStatusCode.OK, tenderList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpDelete]
        [Route("api/Sale/removeTender/{tenderId}")]
        public HttpResponseMessage deleteProductForSale([FromUri] int tenderId)
        {
            try
            {
                Buy.removeTender(tenderId);
                return Request.CreateResponse(HttpStatusCode.OK, "product for sale removed successfully");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Sale/getTenderById/{tenderId}")]
        public HttpResponseMessage getTenderById([FromUri] int tenderId)
        {
            try
            {
                Tender t = new Tender();
                t = Buy.getTenderById(tenderId);
                return Request.CreateResponse(HttpStatusCode.OK, t);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Tender/getSuitableProductsForChoose/{tenderId}")]
        public HttpResponseMessage getSuitableProductsForChoose([FromUri] int tenderId)
        {
            try
            {
                List<ProductForSale> products = new List<ProductForSale>();
                products = Buy.getSuitableProductsForChoose(tenderId);
                return Request.CreateResponse(HttpStatusCode.OK, products);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Tender/getSelectedProductsForTender/{tenderId}")]
        public HttpResponseMessage getSelectedProductsForTender([FromUri] int tenderId)
        {
            try
            {
                List<ProductForSale> products = new List<ProductForSale>();
                products = Buy.getSelectedProductsForTender(tenderId);
                return Request.CreateResponse(HttpStatusCode.OK, products);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Tender/getManageTenderDetails/{tenderId}")]
        public HttpResponseMessage getManageTenderDetails([FromUri] int tenderId)
        {
            try
            {
                TenderDetails details;
                details = Buy.getManageTenderDetails(tenderId);
                return Request.CreateResponse(HttpStatusCode.OK, details);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/buy/EditTender")]
        public HttpResponseMessage EditTender([FromBody] Tender tender)
        {
            try
            {
                Buy.EditTender(tender);
                return Request.CreateResponse(HttpStatusCode.Created, "dender details saved successfully");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/Tender/addProductsToTender/{tenderId}")]
        public HttpResponseMessage addProductsToTender([FromBody] List<ProductForSale> productForSalesList,[FromUri] int tenderId)
        {
            try
            {
                Buy.saveProductsToTender(tenderId,productForSalesList);
                return Request.CreateResponse(HttpStatusCode.Created,true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/Tender/removeProductsFromTender/{tenderId}")]
        public HttpResponseMessage removeProductsFromTender([FromBody] List<ProductForSale> productForSalesList,[FromUri] int tenderId)
        {
            try
            {
                Buy.removeProductsFromTender(tenderId,productForSalesList);
                return Request.CreateResponse(HttpStatusCode.Created,true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Tender/getLastSeledProducts")]
        public HttpResponseMessage getLastSeledProducts()
        {
            try
            {
                List<ProductForSale> products = new List<ProductForSale>();
                products = Buy.getLastSeledProducts();
                return Request.CreateResponse(HttpStatusCode.OK, products);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/Tender/getLastFinishedTenders")]
        public HttpResponseMessage getLastFinishedTenders([FromBody] List<int> tendersId)
        {
            try
            {
                List<Tender> tenders = new List<Tender>();
                tenders = Buy.getTendersListByIds(tendersId);
                return Request.CreateResponse(HttpStatusCode.OK, tenders);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/Sale/getImagesOfProductsForSaleList")]
        public HttpResponseMessage getImagesOfProductsForSaleList([FromBody] List<int> productsForSaleIds)
        {
            try
            {
                List<Images> Images = new List<Images>();
                Images = Sale.getImagesOfProductsForSaleList(productsForSaleIds);
                return Request.CreateResponse(HttpStatusCode.OK, Images);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Tender/getAllProductsOfTenderByTenderId/{tenderId}")]
        public HttpResponseMessage getAllProductsOfTenderByTenderId([FromUri] int tenderId)
        {
            try
            {
                List<ProductForSale> products = new List<ProductForSale>();
                products = Buy.getAllProductsOfTenderByTenderId(tenderId);
                return Request.CreateResponse(HttpStatusCode.OK, products);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpDelete]
        [Route("api/Tender/removeOneProductsFromTender/{tenderId}/{productId}")]
        public HttpResponseMessage removeOneProductsFromTender([FromUri] int tenderId, [FromUri] int productId)
        {
            try
            {
                BL.Buy.removeOneProductsFromTender(tenderId,productId);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Tender/closeTender/{tenderId}/{productId}")]
        public HttpResponseMessage closeTender([FromUri] int tenderId, [FromUri] int productId)
        {
            try
            {
                BL.Buy.closeTender(tenderId,productId);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Tender/addOneProductForTender/{tenderId}/{productId}")]
        public HttpResponseMessage addOneProductForTender([FromUri] int tenderId, [FromUri] int productId)
        {
            try
            {
                BL.Buy.addOneProductForTender(tenderId,productId);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Tender/addTimeToTender/{tenderId}/{newDate}")]
        public HttpResponseMessage addTimeToTender([FromUri] int tenderId, [FromUri] DateTime newDate)
        {
            try
            {
                BL.Buy.addTimeToTender(tenderId,newDate);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("api/Tender/getAllTenders")]
        public HttpResponseMessage getAllTenders()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK,BL.Buy.getAllTenders());
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
