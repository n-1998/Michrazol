using System;
using System.Collections.Generic;
using System.Linq;
using FluentScheduler;
using Models;

namespace BL
{
    public static partial class Buy
    {
        public class DailyRegistry : Registry
        {
            public DailyRegistry()
            {
                Schedule<DailyTask>().ToRunNow(); // run DailyyTask on a weekly basis           
            }
        }

        public static List<Tender> getTendersListByIds(List<int> tendersId)
        {
            List<Tender> tenders = new List<Tender>();
            foreach (var item in tendersId)
            {
                tenders.Add(Dal.Queries.TenderQueries.getTenderById(item));
            }
            return tenders;
        }

        public static List<ProductForSale> getLastSeledProducts()
        {
            List<ProductForSale> list=Dal.Queries.SaleQueries.getLastSeledProducts();
            foreach (var item in list)
            {
                item.InitialBid = Dal.Queries.TenderQueries.getSuggestedPricesByTenderAndProductIds(item.Id, item.SelledToTenderId);
            }
            List<Models.ProductForSale> sortedProducts = list.OrderBy(o => o.LastModifiedDate).Reverse().ToList();
            return sortedProducts;
        }

        public static List<ProductForSale> getAllProductsOfTenderByTenderId(int tenderId)
        {
            return Dal.Queries.TenderQueries.getAllProductsOfTenderByTenderId(tenderId);
        }

        public static void removeOneProductsFromTender(int tenderId, int productId)
        {
            Dal.Queries.TenderQueries.removeOneProductsFromTender(tenderId, productId);
        }

        public static void sendEmailAtCloseTender(int tenderId, int productId)
        {
            Users TenderOwner = new Users();
            Users ProductOwner = new Users();
            TenderOwner = Dal.Queries.TenderQueries.getOwnerOfTender(tenderId);
            ProductOwner = Dal.Queries.SaleQueries.getOwnerOfProductForSale(productId);
            EmailMessage emailToTenderOwner = new EmailMessage()
            {
                To = TenderOwner.Mail,
                Subject = "סיום מכרז",
                Message = "ברכותינו לרגל סיום המכרז המייל של הקונה :" + ProductOwner.Mail
            };
            SendEmail.Send(emailToTenderOwner);
            EmailMessage emailToProductOwner = new EmailMessage()
            {
                To = TenderOwner.Mail,
                Subject = "סיום מכרז",
                Message = "ברכותינו לרגל סיום המכרז המייל של המוכר :" + TenderOwner.Mail
            };
            SendEmail.Send(emailToProductOwner);
        }
        public static void closeTender(int tenderId, int productId)
        {
            sendEmailAtCloseTender(tenderId, productId);
            Dal.Queries.TenderQueries.UpdatecloseTender(tenderId, productId);
        }

        public static void addOneProductForTender(int tenderId, int productId)
        {
            List<ProductForSale> list = new List<ProductForSale>();
            list.Add(Sale.getProductForSaleById(productId));
            saveProductsToTender(tenderId, list);
            SendEmail.SendChoosedProductUpdate(Sale.getProductForSaleById(productId));
        }

        public static void addTimeToTender(int tenderId, DateTime newDate)
        {
            Dal.Queries.TenderQueries.addTimeToTender(tenderId, newDate);
        }

        public static List<Tender> getAllTenders()
        {
           return Dal.Queries.TenderQueries.getAllTenders();
        }
    }
}
