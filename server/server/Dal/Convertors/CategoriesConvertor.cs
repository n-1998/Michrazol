using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Convertors
{
    public static class CategoriesConvertor
    {
        public static Entities.Categories convert(Models.Categories category)
        {
            return new Entities.Categories() {CategoryId=category.CategoryId,CategoryName=category.CategoryName};
        }
        public static Models.Categories convert(Entities.Categories category)
        {
            return new Models.Categories() { CategoryId = category.CategoryId, CategoryName = category.CategoryName };
        }
        public static List<Entities.Categories> convert(List<Models.Categories> categoriesList)
        {
            List<Entities.Categories> c = new List<Entities.Categories>();
            foreach (var item in categoriesList)
            {
                c.Add(convert(item));
            }
            return c;
        }
        public static List<Models.Categories> convert(List<Entities.Categories> categoriesList)
        {
            List<Models.Categories> c = new List<Models.Categories>();
            foreach (var item in categoriesList)
            {
                c.Add(convert(item));
            }
            return c;
        }

    }
}
