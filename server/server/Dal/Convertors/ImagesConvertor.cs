using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Convertors
{
    public static class ImagesConvertor
    {
        public static Entities.Images convert(Models.Images img)
        {
            return new Entities.Images() { ProductId = img.ProductId, ImgName = img.ImgName, ImgGuid = img.ImgGuid };
        }

        public static Models.Images convert(Entities.Images img)
        {
            return new Models.Images() { Id = img.Id, ProductId = img.ProductId, ImgName = img.ImgName, ImgGuid = img.ImgGuid };
        }
        public static List<Entities.Images> convert(List<Models.Images> imgList)
        {
            List<Entities.Images> list = new List<Entities.Images>();
            foreach (var item in imgList)
            {
                list.Add(convert(item));
            }
            return list;
        }

        public static List<Models.Images> convert(List<Entities.Images> imgList)
        {
            List<Models.Images> list = new List<Models.Images>();
            foreach (var item in imgList)
            {
                list.Add(convert(item));
            }
            return list;
        }
    }
}
