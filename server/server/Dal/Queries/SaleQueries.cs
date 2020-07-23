using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Dal.Queries
{
    public class SaleQueries
    {
        public static Models.ProductForSale addProduct(Models.ProductForSale product)
        {
            try
            {
                var p = Convertors.ProductForSaleConvertor.convert(product);
                Connect.DB.ProductForSale.Add(p);
                Connect.DB.SaveChanges();
                return Convertors.ProductForSaleConvertor.convert(Connect.DB.ProductForSale.AsEnumerable().LastOrDefault());
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        // raise a new exception nesting
                        // the current instance as InnerException
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                throw raise;
            }
        }

        public static List<Models.ProductForSale> getLastSeledProducts()
        {
           return Convertors.ProductForSaleConvertor.convert(Connect.DB.ProductForSale.Where(x => x.SelledToTenderId != null&&x.SelledToTenderId!=0).ToList());
        }

        public static List<Models.Products> getProductList()
        {
            return Convertors.ProductConvertor.convert(Connect.DB.Products.ToList());
        }

        public static List<Models.ProductForSale> getProductForSaleListWithSameProductId(int productId)
        {
            return Convertors.ProductForSaleConvertor.convert(Connect.DB.ProductForSale.Where(x => x.ProductId == productId && (x.SelledToTenderId == 0 || x.SelledToTenderId == null)).ToList());
        }

        public static List<Models.Products> getProductListAcorrdingToCategory(int category)
        {
            List<Entities.Products> p;
            if (category == 0)
                p = Connect.DB.Products.ToList();
            else p = Connect.DB.Products.Where(x => x.CategoryId == category).ToList();
            return Convertors.ProductConvertor.convert(p);
        }

        public static List<Models.Cities> getCitiesList()
        {
            return Convertors.CitiesConvertor.convert(Connect.DB.Cities.ToList());
        }

        public static List<Models.ProductForSale> getUserProductForSale(int userId)
        {
            var p = Convertors.ProductForSaleConvertor.convert(Connect.DB.ProductForSale.Where(x => x.UserId == userId && (x.SelledToTenderId == 0 || x.SelledToTenderId == null)).ToList());
            return p;
        }

        public static List<Models.ProductForSale> getProductForSaleListAccordingToProductType(int productId)
        {
            var list = Connect.DB.ProductForSale.Where(x => x.ProductId == productId && (x.SelledToTenderId == 0 || x.SelledToTenderId == null)).ToList();
            return Convertors.ProductForSaleConvertor.convert(list);
        }
        public static bool isTenderFinished(int tenderId)
        {
            if (Connect.DB.ProductForSale.FirstOrDefault(x => x.SelledToTenderId == tenderId) != null)
                return true;
            return false;
        }
        public static List<Models.Tender> getSuitableTenderByProductId(int productForSaleId)
        {
            var suggestedPrices = Connect.DB.SuggestedPrices.Where(x => x.UserProductId == productForSaleId).Select(x => x.TenderId).ToList();
            List<Entities.Tender> tenderList = new List<Entities.Tender>();
            foreach (var item in suggestedPrices)
            {
                tenderList.Add(Connect.DB.Tender.FirstOrDefault(x => x.Id == item));
            }
            var newList = tenderList;
            foreach (var item in newList)
            {
                if (isTenderFinished(item.Id))
                    tenderList.Remove(item);
            }
            return Convertors.tenderConvertor.convert(tenderList);
        }

        public static void updateUserDetails(Models.Users user)
        {
           var u= Connect.DB.Users.FirstOrDefault(x => x.UserId == user.UserId);
            u.UserId = user.UserId;
            u.FirstName = user.FirstName;
            u.LastName = user.LastName;
            u.Mail = user.Mail;
            u.Password = user.Password;
            u.Tel = user.Tel;
            u.Tz = user.Tz;
            Connect.DB.SaveChanges();
        }

        public static List<Models.ProductForSale> getAllProductForSale()
        {
            var products = Connect.DB.ProductForSale.Where(x=>x.SelledToTenderId==0||x.SelledToTenderId==null).ToList();
            return Convertors.ProductForSaleConvertor.convert(products);
        }

        public static List<Models.CitiesAreas> getAreasList()
        {
            var areas = Connect.DB.CitiesAreas.ToList();
            return Convertors.AreasConvertor.convert(areas);
        }

        public static void saveSuggestPrice(Models.SuggestedPrices suggestedPrices)
        {
            var s = Connect.DB.SuggestedPrices.FirstOrDefault(x => x.TenderId == suggestedPrices.TenderId && x.UserProductId == suggestedPrices.UserProductId);
            s.SuggestedPrice = suggestedPrices.SuggestedPrice;
            s.LastModifiedDate = suggestedPrices.LastModifiedDate;
            Connect.DB.SaveChanges();
        }

        public static List<Models.Cities> getCityListAccordingToArea(int areaId)
        {
           return Convertors.CitiesConvertor.convert(Connect.DB.Cities.Where(x => x.AreaId == areaId).ToList());
        }

        public static List<Models.ProductForSale> getProductForSaleAccordingToCategory(int category)
        {
            List<Entities.ProductForSale> productForSalesList = new List<Entities.ProductForSale>();
            var list = Connect.DB.ProductForSale.Where(x => x.SelledToTenderId == 0 || x.SelledToTenderId == null).ToList();
            var products = Connect.DB.Products.ToList();
            foreach (var item in list)
            {
                var p = products.FirstOrDefault(x => x.ProductId == item.ProductId);
                if (p.CategoryId == category)
                    productForSalesList.Add(item);
            }
            return Convertors.ProductForSaleConvertor.convert(productForSalesList);
        }

        public static List<Models.Products> getProductListWithSameSroductType(int productType)
        {
            var categoryId = Connect.DB.Products.FirstOrDefault(x => x.ProductId == productType).CategoryId;
            return Convertors.ProductConvertor.convert(Connect.DB.Products.Where(x => x.CategoryId == categoryId).ToList());
        }

        public static void editProduct(Models.ProductForSale product)
        {
            var p = Connect.DB.ProductForSale.FirstOrDefault(x => x.Id == product.Id);
            p.ProductId = product.ProductId;
            p.City = product.City;
            p.Description = product.Description;
            p.UserId = product.UserId;
            p.InitialBid = product.InitialBid;
            Connect.DB.SaveChanges();
        }

        public static Models.ProductForSale getProductForSaleById(int productId)
        {
            return Convertors.ProductForSaleConvertor.convert(Connect.DB.ProductForSale.FirstOrDefault(x => x.Id == productId));
        }

        public static void removeProductForSale(int productId)
        {
            Connect.DB.ProductForSale.Remove(Connect.DB.ProductForSale.FirstOrDefault(x => x.Id == productId));
            Connect.DB.SaveChanges();
        }

        public static void saveImage(Models.Images img)
        {
            Connect.DB.Images.Add(Convertors.ImagesConvertor.convert(img));
            Connect.DB.SaveChanges();
        }

        public static List<Models.Categories> getCategoryList()
        {
            return Convertors.CategoriesConvertor.convert(Connect.DB.Categories.ToList());
        }
        public static List<Models.Images> getProductImages(int productId)
        {
            return Convertors.ImagesConvertor.convert(Connect.DB.Images.Where(x => x.ProductId == productId).ToList());
        }
        public static Models.Users getUserById(int userId)
        {
            return Convertors.UserConvertor.convert(Connect.DB.Users.FirstOrDefault(x => x.UserId == userId));
        }
        public static Models.Users getOwnerOfProductForSale(int productId)
        {
            return getUserById(Connect.DB.ProductForSale.FirstOrDefault(x => x.Id == productId).UserId);
        }
    }
}
