using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Convertors
{
    public static class ProductConvertor
    {

        public static Models.Products convert(Entities.Products product)
        {
            return new Models.Products() { ProductId = product.ProductId, ProductName = product.ProductName, CategoryId = product.CategoryId };
        }
        public static Entities.Products convert(Models.Products product)
        {
            return new Entities.Products() { ProductId = product.ProductId, ProductName = product.ProductName, CategoryId = product.CategoryId };
        }
        public static List<Models.Products> convert(List<Entities.Products> list)
        {
            List<Models.Products> productsList = new List<Models.Products>();
            foreach (var item in list)
            {
                productsList.Add(convert(item));
            }
            return productsList;
        }
        public static List<Entities.Products> convert(List<Models.Products> list)
        {
            List<Entities.Products> productsList = new List<Entities.Products>();
            foreach (var item in list)
            {
                productsList.Add(convert(item));
            }
            return productsList;
        }
    }
}
