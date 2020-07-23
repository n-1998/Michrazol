using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using Dal.Queries;
using Models;

namespace BL
{
    public static partial class Buy
    {
        /// <summary>
        /// adds new tender to database
        /// </summary>
        /// <param name="newTender"></param>
        /// <returns></returns>
        public static Tender addTender(Tender newTender)
        {
            return TenderQueries.addTender(newTender);
        }
        /// <summary>
        /// gets list of suggestion prices and adds it to suggestedPrice table
        /// </summary>
        /// <param name="list"></param>
        public static void addSuggestionPricesToProductList(List<SuggestedPrices> list)
        {
            foreach (var item in list)
            {
                addSuggestedPrice(item);
            }
        }
        /// <summary>
        ///  gets suggestion prices and adds it to suggestedPrice table
        /// </summary>
        /// <param name="suggestedPrices"></param>
        public static void addSuggestedPrice(SuggestedPrices suggestedPrices)
        {
            TenderQueries.addSuggestedPrice(suggestedPrices);
            SuggestedPrices s = new SuggestedPrices()
            {
                SuggestedPrice = TenderQueries.getLowestSuggetPrice(suggestedPrices.TenderId)
            };
            SendEmail.SendLowestPriceUpdates(s);
        }
        /// <summary>
        /// returns list of tenders of specific user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        internal static List<Tender> getUserTenderList(int userId)
        {
            return TenderQueries.getUserTenders(userId);
        }
        /// <summary>
        /// deletes tender from tenders table
        /// </summary>
        /// <param name="tenderId"></param>
        public static void removeTender(int tenderId)
        {
            TenderQueries.removeTender(tenderId);
        }
        /// <summary>
        /// return object of tender by tender id
        /// </summary>
        /// <param name="tenderId"></param>
        /// <returns></returns>
        public static Tender getTenderById(int tenderId)
        {
            return TenderQueries.getTenderById(tenderId);
        }
        /// <summary>
        ///  edit details of save tender
        /// </summary>
        /// <param name="tender"></param>
        public static void EditTender(Tender tender)
        {
            TenderQueries.editTender(tender);
        }
        /// <summary>
        /// Returns a list of products for sale that matches the tender by city filter
        /// </summary>
        /// <param name="productForSalesList"></param>
        /// <param name="cityId"></param>
        /// <returns></returns>
        public static List<ProductForSale> filterSuitableProductsAccordingToCity(List<ProductForSale> productForSalesList, int cityId)
        {
            //אם בחר את כל הערים מחזיר לו את כל הרשימה
            if (cityId == 1)
                return productForSalesList;
            //אם בחר את כל הערים באזור מסוים
            List<ProductForSale> newList = new List<ProductForSale>();
            var cities = SaleQueries.getCitiesList();//רשימת כל הערים בארץ
            Cities selectedCity = cities.FirstOrDefault(x => x.CityId == cityId);//אוביקט של העיר המבוקשת
            if (selectedCity.CityName.Contains("הכל"))
            {
                foreach (var item in productForSalesList)
                {
                    var city = cities.FirstOrDefault(x => x.CityId == item.City);
                    //אם קוד העיר ==לקוד העיר של המוצר או שהעיר של המוצר ==לכל הערים
                    if (city.AreaId == selectedCity.AreaId || city.AreaId == 1)
                        newList.Add(item);
                }
                return newList;
            }
            else
            {
                foreach (var item in productForSalesList)
                {
                    var city = cities.FirstOrDefault(x => x.CityId == item.City);

                    if (item.City == cityId || (city.AreaId == selectedCity.AreaId && city.CityName.Contains("הכל")) || item.City == 1)
                        newList.Add(item);
                }
                return newList;
            }
        }
        /// <summary>
        /// Returns a list of products for sale that matches the tender by status filter
        /// </summary>
        /// <param name="productForSalesList"></param>
        /// <param name="isNew"></param>
        /// <returns></returns>
        public static List<ProductForSale> filterSuitableProductsAccordingToIsNew(List<ProductForSale> productForSalesList, bool isNew)
        {
            if (isNew == false)
                return productForSalesList;
            List<ProductForSale> list = new List<ProductForSale>();
            foreach (var item in productForSalesList)
            {
                if (item.IsNew == isNew)
                    list.Add(item);
            }
            return list;
        }
        /// <summary>
        /// returns list of product for sale that associated to tender
        /// </summary>
        /// <param name="tenderId"></param>
        /// <returns></returns>
        public static List<ProductForSale> getSelectedProductsForTender(int tenderId)
        {
            List<ProductForSale> list = new List<ProductForSale>();
            var suggested = TenderQueries.getSuggestedPrices(tenderId);
            foreach (var item in suggested)
            {
                list.Add(SaleQueries.getProductForSaleById(item.UserProductId));
            }
            return list;
        }
        /// <summary>
        /// save selected products for sale to tender
        /// </summary>
        /// <param name="tenderId"></param>
        /// <param name="productForSalesList"></param>
        public static void saveProductsToTender(int tenderId, List<ProductForSale> productForSalesList)
        {

            List<SuggestedPrices> list = new List<SuggestedPrices>();
            foreach (var item in productForSalesList)
            {
                list.Add(new SuggestedPrices()
                {
                    TenderId = tenderId,
                    UserProductId = item.Id,
                    SuggestedPrice = item.InitialBid,
                    LastModifiedDate = DateTime.Now
                });
            }
            addSuggestionPricesToProductList(list);
            List<Users> users = new List<Users>();
            foreach (var item in productForSalesList)
            {
                users.Add(EnterQueries.getUserById(item.UserId));
            }
            sendEmailToProductsOwners(users, "כעת אתה יכול להציע הצעת מחיר", "נוספת למכרז חדש");
        }
        /// <summary>
        /// removes products for sale from tender
        /// </summary>
        /// <param name="tenderId"></param>
        /// <param name="productForSalesList"></param>
        public static void removeProductsFromTender(int tenderId, List<ProductForSale> productForSalesList)
        {
            TenderQueries.removeProductsFromTender(tenderId, productForSalesList);
        }

        /// <summary>
        /// Returns the list of users who are participating in a specific tender
        /// </summary>
        /// <param name="tenderId"></param>
        /// <returns></returns>
        public static List<Users> getAllUsersOfTender(int tenderId)
        {
            return TenderQueries.getAllUsersOfTender(tenderId);
        }
        /// <summary>
        /// gets users list and email message and send to this users email message
        /// </summary>
        /// <param name="users"></param>
        /// <param name="message"></param>
        /// <param name="subject"></param>
        public static void sendEmailToProductsOwners(List<Users> users, string message, string subject)
        {
            foreach (var item in users)
            {
                EmailMessage email = new EmailMessage() { Message = message, Subject = subject, To = item.Mail };
                SendEmail.Send(email);
            }
        }
        /// <summary>
        /// gets id of tender and returns details of that tender 
        /// </summary>
        /// <param name="tenderId"></param>
        /// <returns></returns>
        public static TenderDetails getManageTenderDetails(int tenderId)
        {
            TenderDetails details = new TenderDetails();
            details.TenderId = tenderId;
            details.sumPepole = TenderQueries.getSumOfPepoleinTender(tenderId);
            details.LowestPrice = TenderQueries.getLowestSuggetPrice(tenderId);
            var tender = getTenderById(tenderId);
            DateTime tody = new DateTime();
            tody = DateTime.Now;
            details.DayDiff = (tender.EndDate.Date - tody.Date.Date).Days;
            return details;
        }
        /// <summary>
        /// filter products for sale list according to product category and product type
        /// </summary>
        /// <param name="category"></param>
        /// <param name="productId"></param>
        /// <returns></returns>
        public static List<ProductForSale> filterSuitableProductsAccordingToCategoryAndProductType(int category, int productId)
        {
            if (category == 0)
                return SaleQueries.getAllProductForSale();
            else if (productId == 0)
            {
                return SaleQueries.getProductForSaleAccordingToCategory(category);
            }
            return filterSuitableProductsAccordingToProductType(productId);
        }
        /// <summary>
        /// filter products for sale list according to product type
        /// </summary>
        /// <param name="productType"></param>
        /// <returns></returns>
        public static List<ProductForSale> filterSuitableProductsAccordingToProductType(int productType)
        {
            if (productType == 0)
                return SaleQueries.getAllProductForSale();
            return Sale.getProductForSaleListAccordingToProductType(productType);
        }

        /// <summary>
        /// returns a list of product for sale that fits to tender
        /// </summary>
        /// <param name="tenderId"></param>
        /// <returns></returns>
        /// 
        public static List<ProductForSale> removeChoosedProducts(List<ProductForSale> list,int tenderId)
        {
            //var list = Connect.DB.Tender.Where(x => x.UserId == userId).ToList();
            //for (int i = 0; i < list.Count; i++)
            //    if (SaleQueries.isTenderFinished(list[i].Id) == true)
            //    {
            //        list.RemoveAt(i);
            //        i--;
            //    }
            var list2= getAllProductsOfTenderByTenderId(tenderId);
            for (int i = 0; i < list.Count; i++)
            {
                if (list2.FirstOrDefault(x => x.Id == list[i].Id) != null)
                {
                    list.RemoveAt(i);
                    i++;
                }
            }
            return list;
        }
        public static List<ProductForSale> getSuitableProductsForChoose(int tenderId)
        {
            Tender tender = getTenderById(tenderId);
            //כל המוצרים שיש להם אותו קוד מוצר כמו המוצר שמבוקש במכרז
            List<ProductForSale> productForSalesList = filterSuitableProductsAccordingToProductType(tender.ProductId);
            //סינון לפי העיר המבוקשת
            productForSalesList = filterSuitableProductsAccordingToCity(productForSalesList, (int)tender.City);
            //סינון לפי חדש או ישן
            productForSalesList = filterSuitableProductsAccordingToIsNew(productForSalesList, (bool)tender.IsNew);
            productForSalesList = removeChoosedProducts(productForSalesList, tenderId);

            return productForSalesList;
        }
        /// <summary>
        /// filter product for sale list according to given parameters
        /// </summary>
        /// <param name="category"></param>
        /// <param name="product"></param>
        /// <param name="city"></param>
        /// <param name="isNew"></param>
        /// <returns></returns>
        public static List<ProductForSale> filterProductForSaleList(int category, int product, int city, bool isNew)
        {
            List<ProductForSale> productForSalesList = new List<ProductForSale>();
            productForSalesList = filterSuitableProductsAccordingToCategoryAndProductType(category, product);
            productForSalesList = filterSuitableProductsAccordingToCity(productForSalesList, city);
            productForSalesList = filterSuitableProductsAccordingToIsNew(productForSalesList, isNew);
            return productForSalesList;
        }
        public static List<Users> getOwnersOfTenders(List<Tender> tenders)
        {
            List<Users> users = new List<Users>();
            foreach (var item in tenders)
            {
                users.Add(TenderQueries.getOwnerOfTender(item.Id));
            }
            return users;
        }
        public static void SendEmailToTenderOwnerAtTenderEndDate(Users user)
        {
            EmailMessage email = new EmailMessage()
            {
                To = user.Mail,
                Subject = "סיום מכרז",
                Message = @"
<html lang=""en"">
    <head>    
        <meta content=""text/html; charset=utf-8"" http-equiv=""Content-Type"">
        <title>
            Upcoming topics
        </title>
        <style type=""text/css"">
            HTML{background-color: #e8e8e8;}
            .courses-table{font-size: 12px; padding: 3px; border-collapse: collapse; border-spacing: 0;}
            .courses-table .description{color: #505050;}
            .courses-table td{border: 1px solid #D1D1D1; background-color: #F3F3F3; padding: 0 10px;}
            .courses-table th{border: 1px solid #424242; color: #FFFFFF;text-align: left; padding: 0 10px;}
            .green{background-color: #6B9852;}
        </style>
    </head>
    <body>
        <table class=""courses-table"">
            <thead>
                <tr>
                    <th class=""green"">Topic</th>
                    <th class=""green"">Est. # of posts</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class=""description"">Using a Windows service in your project</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td class=""description"">More RabbitMQ in .NET</td>
                    <td>5</td>
                </tr>
            </tbody>
        </table>
    </body>
</html>
"
            };
            SendEmail.Send(email);
        }

        public static void checkEndDateOfTender()
        {
            List<Tender> tenders = new List<Tender>();
            List<Users> users = new List<Users>();
            tenders = TenderQueries.checkEndDateOfTender(DateTime.Now);
            users = getOwnersOfTenders(tenders);
            foreach (var item in users)
            {
                SendEmailToTenderOwnerAtTenderEndDate(item);
            }
        }
    }
}
