using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Models;

namespace Dal.Convertors
{
    class SuggestedPricesConvertor
    {
        public static Entities.SuggestedPrices convert(Models.SuggestedPrices suggestedPrices)
        {
            return new Entities.SuggestedPrices() { TenderId = suggestedPrices.TenderId, UserProductId = suggestedPrices.UserProductId, LastModifiedDate = suggestedPrices.LastModifiedDate, SuggestedPrice = suggestedPrices.SuggestedPrice };
        }
        public static Models.SuggestedPrices convert(Entities.SuggestedPrices suggestedPrices)
        {
            return new Models.SuggestedPrices() { TenderId = suggestedPrices.TenderId, UserProductId = suggestedPrices.UserProductId, LastModifiedDate = suggestedPrices.LastModifiedDate, SuggestedPrice = suggestedPrices.SuggestedPrice };
        }
        public static List<Entities.SuggestedPrices> convert(List< Models.SuggestedPrices> suggestedPriceslist)
        {
            List<Entities.SuggestedPrices> list = new List<Entities.SuggestedPrices>();
            foreach (var item in suggestedPriceslist)
            {
                list.Add(convert(item));
            }
            return list;
        }
        public static List<Models.SuggestedPrices> convert(List<Entities.SuggestedPrices> suggestedPriceslist)
        {
            List<Models.SuggestedPrices> list = new List<Models.SuggestedPrices>();
            foreach (var item in suggestedPriceslist)
            {
                list.Add(convert(item));
            }
            return list;
        }
    }
}
