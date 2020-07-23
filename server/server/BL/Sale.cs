using Dal;
using Dal.Queries;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class Sale
    {
        /// <summary>
        /// Add new product for sale
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        public static ProductForSale addProduct(ProductForSale product)
        {
            return SaleQueries.addProduct(product);
        }
        /// <summary>
        /// gets product category, returns list of products in that category
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        public static List<Products> getProductListAccordingToCategory(int category)
        {
            return SaleQueries.getProductListAcorrdingToCategory(category);
        }
        /// <summary>
        /// Returns the entire product list
        /// </summary>
        /// <returns></returns>
        public static List<Products> getProductList()
        {
            return SaleQueries.getProductList();
        }
        /// <summary>
        /// Returns the entire category list
        /// </summary>
        /// <returns></returns>
        public static List<Categories> getCategoriesList()
        {
            return SaleQueries.getCategoryList();
        }
        /// <summary>
        /// Returns the entire cities list
        /// </summary>
        /// <returns></returns>
        public static List<Cities> getCitiesList()
        {
            return SaleQueries.getCitiesList();
        }
        /// <summary>
        /// add image for product for sale
        /// </summary>
        /// <param name="img"></param>
        public static void UploadImage(Images img)
        {
            SaleQueries.saveImage(img);
        }
        /// <summary>
        /// Gets id of user and returns all the tenders belong to him
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static List<Tender> getUserTendersList(int userId)
        {
            return Buy.getUserTenderList(userId);
        }
        /// <summary>
        /// Gets id of user and returns all his product for sale
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static List<ProductForSale> getUserProductForSale(int userId)
        {
            return SaleQueries.getUserProductForSale(userId);
        }
        /// <summary>
        /// gets id of product for sale and removes it from the database
        /// </summary>
        /// <param name="productId"></param>
        public static void removeProductForSale(int productId)
        {
            SaleQueries.removeProductForSale(productId);
        }
        /// <summary>
        /// Retrieve product by id
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        public static ProductForSale getProductForSaleById(int productId)
        {
            return SaleQueries.getProductForSaleById(productId);
        }
        /// <summary>
        /// gets id of product and returns a list of products that belong to same category
        /// </summary>
        /// <param name="productType"></param>
        /// <returns></returns>
        public static List<Products> getProductListAccordingToProductType(int productType)
        {
            return SaleQueries.getProductListWithSameSroductType(productType);
        }
        /// <summary>
        /// returns list of products for sale of specific product
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        public static List<ProductForSale> getProductForSaleListAccordingToProductType(int productId)
        {
            return SaleQueries.getProductForSaleListAccordingToProductType(productId);
        }

        public static List<Cities> getCityListAccordingToArea(int areaId)
        {
            return SaleQueries.getCityListAccordingToArea(areaId);
        }


        /// <summary>
        /// edit details of save product for sale
        /// </summary>
        /// <param name="product"></param>
        public static void EditProduct(ProductForSale product)
        {
            SaleQueries.editProduct(product);
        }
        /// <summary>
        ///gets id of product for sale and returns list of tenders that the product belong to
        /// </summary>
        /// <param name="productForSaleId"></param>
        /// <returns></returns>
        public static List<Tender> getSuitableTenderByProductId(int productForSaleId)
        {
            return SaleQueries.getSuitableTenderByProductId(productForSaleId);
        }
        /// <summary>
        ///Returns the entire product for sale list 
        /// </summary>
        /// <returns></returns>
        public static List<ProductForSale> getAllProductForSale()
        {
            return SaleQueries.getAllProductForSale();
        }
        /// <summary>
        /// Save bid changes
        /// </summary>
        /// <param name="suggestedPrices"></param>
        public static void saveSuggestPrice(SuggestedPrices suggestedPrices)
        {
            SaleQueries.saveSuggestPrice(suggestedPrices);
            SuggestedPrices s = new SuggestedPrices()
            {
                SuggestedPrice = TenderQueries.getLowestSuggetPrice(suggestedPrices.TenderId)
            };
            SendEmail.SendLowestPriceUpdates(s);
        }
        /// <summary>
        /// gets id of product for sale and returns its images
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        public static List<Images> getProductImages(int productId)
        {
            return SaleQueries.getProductImages(productId);
        }
        /// <summary>
        /// Returns the entire Areas list 
        /// </summary>
        /// <returns></returns>
        public static List<CitiesAreas> getAreasList()
        {
            return SaleQueries.getAreasList();
        }

        public static List<Images> getImagesOfProductsForSaleList(List<int> productsForSaleIds)
        {
            List<Images> images = new List<Images>();
            foreach (var item in productsForSaleIds)
            {
                foreach (var item2 in SaleQueries.getProductImages(item))
                {
                    images.Add(item2);
                }

            }
            return images;
        }
    }
}
