using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Convertors
{
    public static class tenderConvertor
    {
        public static Entities.Tender convert(Models.Tender tender)
        {
            return new Entities.Tender() {UserId=tender.UserId,ProductId=tender.ProductId,Description=tender.Description,MaxCost=tender.MaxCost,StartDate=tender.StartDate,EndDate=tender.EndDate,City=tender.City,IsNew=tender.IsNew};
        }

        public static Models.Tender convert(Entities.Tender tender)
        {
            return new Models.Tender() {Id=tender.Id, UserId = tender.UserId, ProductId = tender.ProductId, Description = tender.Description, MaxCost = tender.MaxCost, StartDate = tender.StartDate, EndDate = tender.EndDate, City = tender.City, IsNew = tender.IsNew };
        }
        public static List<Entities.Tender> GetTenderList(List<Models.Tender> tender)
        {
            List<Entities.Tender> t = new List<Entities.Tender>();
            foreach (var item in tender)
            {
                t.Add(convert(item));
            }
            return t;
        }

        public static List<Models.Tender> convert(List<Entities.Tender> tender)
        {
            List<Models.Tender> t = new List<Models.Tender>();
            foreach (var item in tender)
            {
                t.Add(convert(item));
            }
            return t;
        }
    }
}
