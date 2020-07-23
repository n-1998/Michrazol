using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using Entities;

namespace Dal.Queries
{
    public static class TenderQueries
    {
        public static Models.Tender addTender(Models.Tender tender)
        {
            try
            {
                Connect.DB.Tender.Add(Convertors.tenderConvertor.convert(tender));
                Connect.DB.SaveChanges();
                return Convertors.tenderConvertor.convert(Connect.DB.Tender.AsEnumerable().Last());
            }
            catch (Exception ex)
            {
                ex.Source = "could not add new tender to datebase";
                return null;
            }

        }

        public static List<Models.Tender> checkEndDateOfTender(DateTime now)
        {
            var tenders = Connect.DB.Tender.Where(x => x.EndDate == now.Date);
            if (tenders != null)
                return Convertors.tenderConvertor.convert(tenders.ToList());
            else return null;
        }

        public static int getSuggestedPricesByTenderAndProductIds(int productId, int? tenderId)
        {
            var y = Connect.DB.SuggestedPrices.FirstOrDefault(x => x.TenderId == tenderId && x.UserProductId == productId);
            return (int)y.SuggestedPrice;
        }

        public static List<Models.ProductForSale> getAllProductsOfTenderByTenderId(int tenderId)
        {
            List<Models.ProductForSale> products = new List<Models.ProductForSale>();
            var suggests = Connect.DB.SuggestedPrices.Where(x => x.TenderId == tenderId);
            foreach (var item in suggests)
            {
                var x = Dal.Queries.SaleQueries.getProductForSaleById(item.UserProductId);
                x.InitialBid = (int)item.SuggestedPrice;
                products.Add(x);
            }
            List<Models.ProductForSale> sortedProducts = products.OrderBy(o => o.InitialBid).ToList();
            return sortedProducts;
        }

        public static void UpdatecloseTender(int tenderId, int productId)
        {
            var product = Connect.DB.ProductForSale.FirstOrDefault(x => x.Id == productId);
            product.SelledToTenderId = tenderId;
            Connect.DB.Tender.FirstOrDefault(x => x.Id == tenderId).LastModifiedDate = DateTime.Now;
            Connect.DB.ProductForSale.FirstOrDefault(x => x.Id == productId).LastModifiedDate = DateTime.Now;
            Connect.DB.SaveChanges();
        }

        public static void removeOneProductsFromTender(int tenderId, int productId)
        {
            Connect.DB.SuggestedPrices.Remove(Connect.DB.SuggestedPrices.FirstOrDefault(x => x.TenderId == tenderId && x.UserProductId == productId));
            Connect.DB.SaveChanges();
        }

        public static void removeTender(int tenderId)
        {
            Connect.DB.Tender.Remove(Connect.DB.Tender.FirstOrDefault(x => x.Id == tenderId));
            Connect.DB.SaveChanges();
        }

        public static void editTender(Models.Tender tender)
        {
            var t = Connect.DB.Tender.FirstOrDefault(x => x.Id == tender.Id);
            t.ProductId = tender.ProductId;
            t.EndDate = tender.EndDate;
            t.MaxCost = tender.MaxCost;
            t.City = tender.City;
            t.Description = tender.Description;
            Connect.DB.SaveChanges();
        }

        public static void addTimeToTender(int tenderId, DateTime newDate)
        {
            Connect.DB.Tender.FirstOrDefault(x => x.Id == tenderId).EndDate=newDate;
            Connect.DB.SaveChanges();
        }

        public static List<Models.Tender> getAllTenders()
        {
            var list=Connect.DB.Tender.ToList();
            for (int i = 0; i < list.Count; i++)
                if (SaleQueries.isTenderFinished(list[i].Id) == true)
                {
                    list.RemoveAt(i);
                    i--;
                }
            return Convertors.tenderConvertor.convert(list);
        }

        public static void addSuggestedPrice(Models.SuggestedPrices suggestedPrices)
        {
            Connect.DB.SuggestedPrices.Add(Convertors.SuggestedPricesConvertor.convert(suggestedPrices));
            Connect.DB.SaveChanges();
        }
        public static void updateSuggestedPrice(Models.SuggestedPrices suggestedPrices)
        {
            var lastSuggest = Connect.DB.SuggestedPrices.FirstOrDefault(x => x.TenderId == suggestedPrices.TenderId && x.UserProductId == suggestedPrices.UserProductId);
            lastSuggest.SuggestedPrice = suggestedPrices.SuggestedPrice;
            lastSuggest.LastModifiedDate = DateTime.Now;
            Connect.DB.SaveChanges();
        }
        public static Models.Tender getTenderById(int tenderId)
        {
            return Convertors.tenderConvertor.convert(Connect.DB.Tender.FirstOrDefault(x => x.Id == tenderId));
        }

        public static List<Models.Tender> getUserTenders(int userId)
        {
            var list = Connect.DB.Tender.Where(x => x.UserId == userId).ToList();
            for (int i = 0; i < list.Count; i++)
                if (SaleQueries.isTenderFinished(list[i].Id) == true)
                {
                    list.RemoveAt(i);
                    i--;
                }
            return Convertors.tenderConvertor.convert(list.ToList());
        }

        public static List<Models.SuggestedPrices> getSuggestedPrices(int tenderId)
        {
            return Convertors.SuggestedPricesConvertor.convert(Connect.DB.SuggestedPrices.Where(x => x.TenderId == tenderId).ToList());
        }

        public static int getSumOfPepoleinTender(int tenderId)
        {
            return Connect.DB.SuggestedPrices.Where(x => x.TenderId == tenderId).Count();
        }

        public static int getLowestSuggetPrice(int tenderId)
        {

            var list = Connect.DB.SuggestedPrices.Where(x => x.TenderId == tenderId);
            if (list.Count() == 0)
                return 0;
            return (int)list.Min(x => x.SuggestedPrice);
        }

        public static void removeProductsFromTender(int tenderId, List<Models.ProductForSale> productForSalesList)
        {
            try
            {
                foreach (var item in productForSalesList)
                {
                    var p = Connect.DB.SuggestedPrices.FirstOrDefault(x => x.TenderId == tenderId && x.UserProductId == item.Id);
                    Connect.DB.SuggestedPrices.Remove(p);

                }
                Connect.DB.SaveChanges();
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }
        public static List<Models.Users> getAllUsersOfTender(int tenderId)
        {
            var list = Connect.DB.SuggestedPrices.Where(x => x.TenderId == tenderId).ToList();
            List<Models.Users> users = new List<Models.Users>();
            foreach (var item in list)
            {
                users.Add(SaleQueries.getOwnerOfProductForSale(item.UserProductId));
            }
            return users;
        }

        public static Models.Users getOwnerOfTender(int tenderId)
        {
            return SaleQueries.getUserById(Connect.DB.Tender.FirstOrDefault(x => x.Id == tenderId).UserId);
        }
    }
}
