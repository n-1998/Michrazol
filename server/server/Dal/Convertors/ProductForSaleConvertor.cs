using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Convertors
{
    public static class ProductForSaleConvertor
    {
        public static Entities.ProductForSale convert(Models.ProductForSale product)
        {
            return new Entities.ProductForSale() { UserId = product.UserId, ProductId = product.ProductId, Description = product.Description, City = product.City, InitialBid = product.InitialBid,IsNew=product.IsNew,InterestedInMessages=product.InterestedInMessages,LastModifiedDate=product.LastModifiedDate,SelledToTenderId=product.SelledToTenderId};
        }

        public static Models.ProductForSale convert(Entities.ProductForSale product)
        {
            return new Models.ProductForSale() {Id=product.Id, UserId = product.UserId, ProductId = product.ProductId, Description = product.Description, City = (int)product.City,InitialBid=product.InitialBid,IsNew=product.IsNew,InterestedInMessages=product.InterestedInMessages,LastModifiedDate=product.LastModifiedDate,SelledToTenderId=product.SelledToTenderId};
        }
        public static List<Entities.ProductForSale> convert(List<Models.ProductForSale> product)
        {
            List<Entities.ProductForSale> p = new List<Entities.ProductForSale>();
            foreach (var item in product)
            {
                p.Add(convert(item));
            }
            return p;
        }

        public static List<Models.ProductForSale> convert(List<Entities.ProductForSale> product)
        {
            List<Models.ProductForSale> p = new List<Models.ProductForSale>();
            foreach (var item in product)
            {
                p.Add(convert(item));
            }
            return p;
        }
    }
}
